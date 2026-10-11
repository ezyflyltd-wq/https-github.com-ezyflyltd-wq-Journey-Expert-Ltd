import { onRequest as angela } from './chat';
import { eventKey, messagesFrom, result, sendConfiguration, validSignature, type MetaEnv } from '../_meta';

type Context = { request: Request; env: MetaEnv };

export async function onRequest({ request, env }: Context): Promise<Response> {
  if (request.method === 'GET') {
    const params = new URL(request.url).searchParams;
    if (!env.META_VERIFY_TOKEN) return result(503, 'Webhook setup incomplete');
    if (params.get('hub.mode') !== 'subscribe' || params.get('hub.verify_token') !== env.META_VERIFY_TOKEN || !params.has('hub.challenge')) return result(403, 'Forbidden');
    return result(200, params.get('hub.challenge')!);
  }
  if (request.method !== 'POST') return result(405, 'Method not allowed');
  if (!env.META_APP_SECRET) return result(503, 'Webhook setup incomplete');
  // Bound streamed bodies before signature verification; do not trust Content-Length.
  const reader = request.body?.getReader();
  if (!reader) return result(400, 'Missing body');
  const chunks: Uint8Array[] = [];
  let length = 0;
  while (true) {
    const part = await reader.read();
    if (part.done) break;
    length += part.value.length;
    if (length > 256_000) { await reader.cancel(); return result(413, 'Payload too large'); }
    chunks.push(part.value);
  }
  const raw = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { raw.set(chunk, offset); offset += chunk.length; }
  if (!await validSignature(raw, request.headers.get('X-Hub-Signature-256'), env.META_APP_SECRET)) return result(401, 'Invalid signature');
  let payload: any;
  try { payload = JSON.parse(new TextDecoder().decode(raw)); } catch { return result(400, 'Invalid JSON'); }
  const messages = messagesFrom(payload, env);
  if (messages.length > 50) return result(413, 'Too many messages');
  if (!messages.length) return result(200, 'EVENT_RECEIVED');
  if (env.META_AUTO_REPLY_ENABLED !== 'true' || !env.META_EVENTS) return result(503, 'Messaging activation pending');
  try {
    // Validate all channel credentials before acknowledging any delivery.
    for (const message of messages) sendConfiguration(message, env, '');
    for (const message of messages) {
      const key = await eventKey(message);
      const claim = crypto.randomUUID();
      const now = Date.now();
      const claimed = await env.META_EVENTS.prepare(`INSERT INTO meta_events (event_key, state, claim, updated_at) VALUES (?, 'processing', ?, ?) ON CONFLICT(event_key) DO UPDATE SET claim=excluded.claim, updated_at=excluded.updated_at WHERE meta_events.state='processing' AND meta_events.updated_at < ? RETURNING event_key`).bind(key, claim, now, now - 120_000).first();
      if (!claimed) {
        const previous = await env.META_EVENTS.prepare('SELECT state FROM meta_events WHERE event_key=?').bind(key).first();
        if (previous?.state === 'processing') return result(503, 'Processing delivery');
        continue; // Sent or uncertain sends are never repeated automatically.
      }
      let reply: string;
      try {
        const response = await angela({ request: new Request('https://journeyexpertltd.com/angela/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: message.text }) }), env });
        const answer = await response.json() as { reply?: string };
        if (!response.ok || !answer.reply?.trim()) throw new Error('No answer');
        reply = answer.reply;
      } catch {
        await env.META_EVENTS.prepare("DELETE FROM meta_events WHERE event_key=? AND claim=? AND state='processing'").bind(key, claim).run();
        return result(503, 'Reply unavailable');
      }
      const changed = await env.META_EVENTS.prepare("UPDATE meta_events SET state='sending', updated_at=? WHERE event_key=? AND claim=? AND state='processing' RETURNING event_key").bind(Date.now(), key, claim).first();
      if (!changed) return result(503, 'Delivery claim expired');
      // Never retry ambiguous network results: Meta may have accepted the first send.
      let state = 'uncertain';
      try {
        const outbound = sendConfiguration(message, env, reply);
        const sent = await fetch(outbound.url, { ...outbound.options, signal: AbortSignal.timeout(8000) });
        const response = await sent.json() as { message_id?: string; messages?: { id?: string }[] };
        if (sent.ok && (response.message_id || response.messages?.[0]?.id)) state = 'sent';
      } catch { /* No secrets, customer content, or Graph errors are logged. */ }
      await env.META_EVENTS.prepare('UPDATE meta_events SET state=?, updated_at=? WHERE event_key=? AND claim=?').bind(state, Date.now(), key, claim).run();
    }
    await env.META_EVENTS.prepare('DELETE FROM meta_events WHERE updated_at < ?').bind(Date.now() - 30 * 86400_000).run();
    return result(200, 'EVENT_RECEIVED');
  } catch {
    return result(503, 'Delivery temporarily unavailable');
  }
}
