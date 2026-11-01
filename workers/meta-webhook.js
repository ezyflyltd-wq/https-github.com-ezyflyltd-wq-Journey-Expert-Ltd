// Meta (Messenger, Instagram, WhatsApp) webhook for Angela.
// This webhook is intended only for the approved Journey Expert BD Page, its linked @journeyexpertltd Instagram account, and the approved Journey Expert WhatsApp number. Do not connect additional assets without adding recipient-ID allowlisting and reviewing this code.
//   https://journeyexpertltd.com/api/meta/webhook
//
// Required secrets (Cloudflare Worker -> Settings -> Variables and Secrets):
//   META_VERIFY_TOKEN        any random string; must match the one typed in Meta's webhook setup
//   META_APP_SECRET          Meta app secret; used to verify X-Hub-Signature-256 (fails closed if missing)
// Optional secrets:
//   META_PAGE_ACCESS_TOKEN   Messenger + Instagram replies
//   META_WHATSAPP_TOKEN      WhatsApp Cloud API replies
//   META_AUTO_REPLY          set to "true" only after approval; defaults to no processing/reply
//   META_GRAPH_VERSION       defaults to v23.0
// Optional binding:
//   META_DB                  optional D1 database; message content is stored only when explicitly bound

const DEFAULT_GRAPH_VERSION = 'v23.0';
const MAX_TEXT = 1000;
const MAX_REPLY = 1800; // Messenger/Instagram text limit is 2000 characters
const THROTTLE_WINDOW_SECONDS = 60;
const THROTTLE_MAX_EVENTS = 12;
const RECIPIENT_ALLOWLIST = (value) => new Set(String(value || '').split(',').map((id) => id.trim()).filter(Boolean));

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS meta_message_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_key TEXT NOT NULL UNIQUE,
    channel TEXT NOT NULL,
    sender_id TEXT NOT NULL,
    recipient_id TEXT,
    message_text TEXT,
    language TEXT,
    intent TEXT,
    reply_text TEXT,
    reply_status TEXT,
    handoff_required INTEGER NOT NULL DEFAULT 0,
    handoff_reason TEXT,
    created_at TEXT NOT NULL
  )`,
  'CREATE INDEX IF NOT EXISTS idx_meta_events_sender ON meta_message_events (sender_id, created_at)',
];

let schemaReady = null;

function text(body, status = 200) {
  return new Response(body, { status, headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' } });
}

function hexToBytes(hex) {
  if (typeof hex !== 'string' || hex.length === 0 || hex.length % 2 !== 0 || /[^0-9a-f]/i.test(hex)) return null;
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return out;
}

export async function verifySignature(rawBody, header, appSecret) {
  if (!appSecret || typeof header !== 'string' || !header.startsWith('sha256=')) return false;
  const signature = hexToBytes(header.slice('sha256='.length));
  if (!signature) return false;
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(appSecret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
  return crypto.subtle.verify('HMAC', key, signature, rawBody);
}

// Turns a Meta payload into a flat list of inbound text events.
export function extractEvents(payload) {
  const events = [];
  const object = payload && payload.object;
  const entries = Array.isArray(payload && payload.entry) ? payload.entry : [];
  for (const entry of entries) {
    if (object === 'page' || object === 'instagram') {
      const channel = object === 'page' ? 'messenger' : 'instagram';
      for (const item of Array.isArray(entry.messaging) ? entry.messaging : []) {
        const message = item && item.message;
        if (!message || message.is_echo) continue;
        const senderId = item.sender && item.sender.id;
        if (!senderId) continue;
        events.push({
          channel,
          key: `${channel}:${message.mid || `${senderId}:${item.timestamp || ''}`}`,
          senderId: String(senderId),
          recipientId: item.recipient && item.recipient.id ? String(item.recipient.id) : '',
          text: typeof message.text === 'string' ? message.text.trim().slice(0, MAX_TEXT) : '',
          hasAttachment: Array.isArray(message.attachments) && message.attachments.length > 0,
        });
      }
    } else if (object === 'whatsapp_business_account') {
      for (const change of Array.isArray(entry.changes) ? entry.changes : []) {
        const value = (change && change.value) || {};
        const phoneNumberId = value.metadata && value.metadata.phone_number_id ? String(value.metadata.phone_number_id) : '';
        for (const message of Array.isArray(value.messages) ? value.messages : []) {
          if (!message || !message.from) continue;
          events.push({
            channel: 'whatsapp',
            key: `whatsapp:${message.id || `${message.from}:${message.timestamp || ''}`}`,
            senderId: String(message.from),
            recipientId: phoneNumberId,
            text: message.type === 'text' && message.text && typeof message.text.body === 'string' ? message.text.body.trim().slice(0, MAX_TEXT) : '',
            hasAttachment: message.type !== 'text',
          });
        }
      }
    }
  }
  return events;
}

async function ensureSchema(db) {
  if (!schemaReady) {
    schemaReady = (async () => {
      for (const statement of SCHEMA) await db.prepare(statement).run();
    })().catch((error) => {
      schemaReady = null;
      throw error;
    });
  }
  return schemaReady;
}

// Returns true if this event is new, false if Meta re-delivered one we already handled.
async function claimEvent(db, event) {
  const result = await db
    .prepare('INSERT OR IGNORE INTO meta_message_events (event_key, channel, sender_id, recipient_id, message_text, created_at) VALUES (?, ?, ?, ?, ?, ?)')
    .bind(event.key, event.channel, event.senderId, event.recipientId, event.text, new Date().toISOString())
    .run();
  return Boolean(result && result.meta && result.meta.changes > 0);
}

async function recentHistory(db, event) {
  const { results } = await db
    .prepare("SELECT message_text, reply_text FROM meta_message_events WHERE sender_id = ? AND channel = ? AND event_key != ? AND reply_text IS NOT NULL AND reply_status = 'sent' ORDER BY id DESC LIMIT 4")
    .bind(event.senderId, event.channel, event.key)
    .all();
  const turns = [];
  for (const row of (results || []).reverse()) {
    if (row.message_text) turns.push({ role: 'user', content: row.message_text });
    if (row.reply_text) turns.push({ role: 'assistant', content: row.reply_text });
  }
  return turns;
}

async function isThrottled(db, event) {
  const since = new Date(Date.now() - THROTTLE_WINDOW_SECONDS * 1000).toISOString();
  const row = await db
    .prepare('SELECT COUNT(*) AS n FROM meta_message_events WHERE sender_id = ? AND channel = ? AND created_at >= ?')
    .bind(event.senderId, event.channel, since)
    .first();
  return Boolean(row && row.n > THROTTLE_MAX_EVENTS);
}

async function finishEvent(db, event, outcome) {
  await db
    .prepare('UPDATE meta_message_events SET language = ?, intent = ?, reply_text = ?, reply_status = ?, handoff_required = ?, handoff_reason = ? WHERE event_key = ?')
    .bind(outcome.language || '', outcome.intent || '', outcome.reply || '', outcome.status, outcome.handoffRequired ? 1 : 0, outcome.handoffReason || '', event.key)
    .run();
}

async function sendReply(env, event, reply) {
  const version = env.META_GRAPH_VERSION || DEFAULT_GRAPH_VERSION;
  const body = reply.slice(0, MAX_REPLY);
  let url;
  let token;
  let payload;
  if (event.channel === 'whatsapp') {
    token = env.META_WHATSAPP_TOKEN;
    if (!token || !event.recipientId) return 'skipped_no_token';
    const allowedRecipients = RECIPIENT_ALLOWLIST(env.META_ALLOWED_RECIPIENT_IDS);
    if (!allowedRecipients.has(event.recipientId)) return 'skipped_unapproved_recipient';
    url = `https://graph.facebook.com/${version}/${encodeURIComponent(event.recipientId)}/messages`;
    payload = { messaging_product: 'whatsapp', to: event.senderId, type: 'text', text: { body } };
  } else {
    token = env.META_PAGE_ACCESS_TOKEN;
    if (!token) return 'skipped_no_token';
    const allowedRecipients = RECIPIENT_ALLOWLIST(env.META_ALLOWED_RECIPIENT_IDS);
    if (!event.recipientId || !allowedRecipients.has(event.recipientId)) return 'skipped_unapproved_recipient';
    url = `https://graph.facebook.com/${version}/me/messages`;
    payload = { recipient: { id: event.senderId }, messaging_type: 'RESPONSE', message: { text: body } };
  }
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });
  return response.ok ? 'sent' : `failed_${response.status}`;
}

async function handleEvent(event, env, brain) {
  const db = env.META_DB || null;
  if (db) {
    await ensureSchema(db);
    if (!(await claimEvent(db, event))) return; // duplicate delivery
    if (await isThrottled(db, event)) {
      await finishEvent(db, event, { status: 'throttled' });
      return;
    }
  }

  // With auto-replies disabled, only an explicitly configured D1 binding may retain the event.
  // Do not send message content to Angela/Gemini or to a handoff destination in this default mode.
  if (env.META_AUTO_REPLY !== 'true') return;

  const language = brain.languageOf(event.text || '', undefined);
  let outcome;

  if (!event.text) {
    outcome = {
      language,
      intent: 'non_text_message',
      reply: language === 'bn'
        ? 'আপনার বার্তার জন্য ধন্যবাদ। অনুগ্রহ করে লিখে জানান কীভাবে সাহায্য করতে পারি, অথবা আমাদের একজন কনসালট্যান্ট শিগগির যোগাযোগ করবেন।'
        : 'Thank you for your message. Please type how we can help, or one of our consultants will follow up with you shortly.',
      handoffRequired: event.hasAttachment,
      handoffReason: event.hasAttachment ? 'Customer sent an attachment or non-text message.' : '',
    };
  } else {
    const urgent = brain.safetyIntent(event.text);
    if (urgent) {
      outcome = { language, intent: urgent, reply: brain.safetyReply(urgent, language), handoffRequired: false, handoffReason: '' };
    } else {
      const history = db ? await recentHistory(db, event).catch(() => []) : [];
      const answer = await brain.ask(event.text, language, history);
      outcome = {
        language,
        intent: answer.intent,
        reply: answer.reply,
        handoffRequired: answer.handoffRequired === true,
        handoffReason: answer.handoffReason || '',
        lead: answer.lead,
      };
    }
  }

  let status = 'not_sent';
  if (env.META_AUTO_REPLY === 'true' && outcome.reply) {
    try {
      status = await sendReply(env, event, outcome.reply);
    } catch (error) {
      status = 'failed_network';
      console.error('Meta reply failed', event.channel, error && error.message);
    }
  }

  if (db) await finishEvent(db, event, { ...outcome, status });
  if (outcome.handoffRequired) {
    await brain.handoff({
      event: 'angela.meta_handoff',
      createdAt: new Date().toISOString(),
      channel: event.channel,
      senderId: event.senderId,
      message: event.text,
      reply: outcome.reply,
      intent: outcome.intent,
      handoffReason: outcome.handoffReason,
      lead: outcome.lead || {},
      replyStatus: status,
      status: 'NEW',
    });
  }
}

export async function handleMetaWebhook(request, env, ctx, brain) {
  if (request.method === 'GET') {
    const url = new URL(request.url);
    const expected = env.META_VERIFY_TOKEN;
    if (expected && url.searchParams.get('hub.mode') === 'subscribe' && url.searchParams.get('hub.verify_token') === expected) {
      return text(url.searchParams.get('hub.challenge') || '');
    }
    return text('Forbidden', 403);
  }
  if (request.method !== 'POST') return text('Method not allowed', 405);

  const raw = await request.arrayBuffer();
  if (raw.byteLength > 256 * 1024) return text('Payload too large', 413);
  if (!(await verifySignature(raw, request.headers.get('x-hub-signature-256'), env.META_APP_SECRET))) {
    return text('Invalid signature', 401);
  }

  let payload;
  try {
    payload = JSON.parse(new TextDecoder().decode(raw));
  } catch {
    return text('Invalid JSON', 400);
  }

  const events = extractEvents(payload);
  // Acknowledge immediately; Meta retries if we are slow. Process in the background.
  ctx.waitUntil(
    (async () => {
      for (const event of events) {
        try {
          await handleEvent(event, env, brain);
        } catch (error) {
          console.error('Meta event failed', event.channel, error && error.message);
        }
      }
    })(),
  );
  return text('EVENT_RECEIVED');
}
