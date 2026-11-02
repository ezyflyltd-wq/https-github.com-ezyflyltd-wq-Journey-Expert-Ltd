import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import test from 'node:test';
import worker from '../workers/angela-worker.js';
import { extractEvents } from '../workers/meta-webhook.js';

const URL_BASE = 'https://journeyexpertltd.com/api/meta/webhook';
const SECRET = 'test-app-secret';

function sign(body) {
  return 'sha256=' + createHmac('sha256', SECRET).update(body).digest('hex');
}

function makeCtx() {
  const pending = [];
  return { waitUntil: (p) => pending.push(p), settle: () => Promise.all(pending) };
}

function messengerPayload(text, mid = 'm_1') {
  return {
    object: 'page',
    entry: [{ messaging: [{ sender: { id: 'user1' }, recipient: { id: 'page1' }, timestamp: 1, message: { mid, text } }] }],
  };
}

// Minimal in-memory D1 stand-in covering only the statements the webhook issues.
function fakeDb() {
  const rows = new Map();
  const db = {
    rows,
    prepare(sql) {
      let args = [];
      const stmt = {
        bind: (...a) => { args = a; return stmt; },
        async run() {
          if (sql.startsWith('INSERT OR IGNORE')) {
            if (rows.has(args[0])) return { meta: { changes: 0 } };
            rows.set(args[0], { event_key: args[0], channel: args[1], sender_id: args[2], message_text: args[4] });
            return { meta: { changes: 1 } };
          }
          if (sql.startsWith('UPDATE')) {
            const row = rows.get(args[6]);
            Object.assign(row, { language: args[0], intent: args[1], reply_text: args[2], reply_status: args[3], handoff_required: args[4] });
          }
          return { meta: { changes: 0 } };
        },
        async first() { return { n: 0 }; },
        async all() { return { results: [] }; },
      };
      return stmt;
    },
  };
  return db;
}

function withFetch(handler, run) {
  const original = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url, init) => { calls.push({ url: String(url), init }); return handler(String(url), init); };
  return run(calls).finally(() => { globalThis.fetch = original; });
}

test('GET verification echoes the challenge only with the right token', async () => {
  const env = { META_VERIFY_TOKEN: 'verify-me' };
  const ok = await worker.fetch(new Request(`${URL_BASE}?hub.mode=subscribe&hub.verify_token=verify-me&hub.challenge=12345`), env, makeCtx());
  assert.equal(ok.status, 200);
  assert.equal(await ok.text(), '12345');
  const bad = await worker.fetch(new Request(`${URL_BASE}?hub.mode=subscribe&hub.verify_token=nope&hub.challenge=12345`), env, makeCtx());
  assert.equal(bad.status, 403);
  const unset = await worker.fetch(new Request(`${URL_BASE}?hub.mode=subscribe&hub.verify_token=&hub.challenge=1`), {}, makeCtx());
  assert.equal(unset.status, 403);
});

test('POST without a valid signature is rejected, and fails closed with no app secret', async () => {
  const body = JSON.stringify(messengerPayload('hello'));
  const noSig = await worker.fetch(new Request(URL_BASE, { method: 'POST', body }), { META_APP_SECRET: SECRET }, makeCtx());
  assert.equal(noSig.status, 401);
  const wrong = await worker.fetch(new Request(URL_BASE, { method: 'POST', body, headers: { 'x-hub-signature-256': 'sha256=' + '0'.repeat(64) } }), { META_APP_SECRET: SECRET }, makeCtx());
  assert.equal(wrong.status, 401);
  const noSecret = await worker.fetch(new Request(URL_BASE, { method: 'POST', body, headers: { 'x-hub-signature-256': sign(body) } }), {}, makeCtx());
  assert.equal(noSecret.status, 401);
});

test('signed Messenger message is stored, answered once, and re-delivery is ignored', async () => {
  const db = fakeDb();
  const env = { META_APP_SECRET: SECRET, META_PAGE_ACCESS_TOKEN: 'page-token', META_DB: db }; // no GEMINI key -> verified fallback reply
  await withFetch(async () => new Response('{}', { status: 200 }), async (calls) => {
    for (let i = 0; i < 2; i++) {
      const body = JSON.stringify(messengerPayload('Do you help with Hajj and Umrah?'));
      const ctx = makeCtx();
      const response = await worker.fetch(new Request(URL_BASE, { method: 'POST', body, headers: { 'x-hub-signature-256': sign(body) } }), env, ctx);
      assert.equal(response.status, 200);
      await ctx.settle();
    }
    const sends = calls.filter((c) => c.url.includes('graph.facebook.com') && c.url.endsWith('/me/messages'));
    assert.equal(sends.length, 1, 'duplicate delivery must not send a second reply');
    const sent = JSON.parse(sends[0].init.body);
    assert.equal(sent.recipient.id, 'user1');
    assert.match(sent.message.text, /Hajj/i);
    assert.equal(sends[0].init.headers.authorization, 'Bearer page-token');
  });
  const stored = db.rows.get('messenger:m_1');
  assert.equal(stored.reply_status, 'sent');
  assert.equal(stored.intent, 'hajj_umrah');
});

test('medical emergencies get the safety reply, never a generated answer', async () => {
  const env = { META_APP_SECRET: SECRET, META_PAGE_ACCESS_TOKEN: 'page-token', GEMINI_API_KEY: 'should-not-be-used' };
  await withFetch(async () => new Response('{}', { status: 200 }), async (calls) => {
    const body = JSON.stringify(messengerPayload('I have severe chest pain', 'm_2'));
    const ctx = makeCtx();
    await worker.fetch(new Request(URL_BASE, { method: 'POST', body, headers: { 'x-hub-signature-256': sign(body) } }), env, ctx);
    await ctx.settle();
    assert.equal(calls.some((c) => c.url.includes('generativelanguage.googleapis.com')), false);
    const sent = JSON.parse(calls.find((c) => c.url.endsWith('/me/messages')).init.body);
    assert.match(sent.message.text, /999/);
  });
});

test('META_AUTO_REPLY=false stores but never replies', async () => {
  const env = { META_APP_SECRET: SECRET, META_PAGE_ACCESS_TOKEN: 'page-token', META_AUTO_REPLY: 'false' };
  await withFetch(async () => new Response('{}'), async (calls) => {
    const body = JSON.stringify(messengerPayload('visa help', 'm_3'));
    const ctx = makeCtx();
    await worker.fetch(new Request(URL_BASE, { method: 'POST', body, headers: { 'x-hub-signature-256': sign(body) } }), env, ctx);
    await ctx.settle();
    assert.equal(calls.length, 0);
  });
});

test('extractEvents handles WhatsApp, Instagram, echoes and attachments', () => {
  const whatsapp = extractEvents({
    object: 'whatsapp_business_account',
    entry: [{ changes: [{ value: { metadata: { phone_number_id: 'PN1' }, messages: [{ from: '8801700000000', id: 'wamid.1', type: 'text', text: { body: 'টিকিট লাগবে' } }, { from: '8801700000000', id: 'wamid.2', type: 'image' }] } }] }],
  });
  assert.deepEqual(whatsapp.map((e) => [e.channel, e.recipientId, e.text, e.hasAttachment]), [
    ['whatsapp', 'PN1', 'টিকিট লাগবে', false],
    ['whatsapp', 'PN1', '', true],
  ]);
  const instagram = extractEvents({
    object: 'instagram',
    entry: [{ messaging: [{ sender: { id: 'ig1' }, recipient: { id: 'ig2' }, message: { mid: 'i1', text: 'hi' } }, { sender: { id: 'ig2' }, recipient: { id: 'ig1' }, message: { mid: 'i2', text: 'echo', is_echo: true } }] }],
  });
  assert.equal(instagram.length, 1);
  assert.equal(instagram[0].channel, 'instagram');
  assert.deepEqual(extractEvents({ object: 'unknown', entry: [{}] }), []);
});

test('WhatsApp reply goes to the phone-number endpoint from the payload', async () => {
  const env = { META_APP_SECRET: SECRET, META_WHATSAPP_TOKEN: 'wa-token' };
  await withFetch(async () => new Response('{}', { status: 200 }), async (calls) => {
    const body = JSON.stringify({
      object: 'whatsapp_business_account',
      entry: [{ changes: [{ value: { metadata: { phone_number_id: 'PN1' }, messages: [{ from: '8801700000000', id: 'wamid.9', type: 'text', text: { body: 'hajj' } }] } }] }],
    });
    const ctx = makeCtx();
    await worker.fetch(new Request(URL_BASE, { method: 'POST', body, headers: { 'x-hub-signature-256': sign(body) } }), env, ctx);
    await ctx.settle();
    const send = calls.find((c) => c.url.endsWith('/PN1/messages'));
    assert.ok(send, 'WhatsApp reply must target /{phone_number_id}/messages');
    const sent = JSON.parse(send.init.body);
    assert.equal(sent.to, '8801700000000');
    assert.equal(sent.messaging_product, 'whatsapp');
  });
});
