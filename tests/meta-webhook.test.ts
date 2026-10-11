import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createHmac, webcrypto } from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import { messagesFrom, sendConfiguration, validSignature, eventKey } from '../functions/_meta';
import { onRequest } from '../functions/angela/meta-webhook';
import advancedWorker from '../public/_worker.js';
if (!globalThis.crypto) Object.defineProperty(globalThis, 'crypto', { value: webcrypto });
const secret = 'local-test-secret';
const event = (extras = {}) => ({ object: 'page', entry: [{ id: 'page', messaging: [{ timestamp: Date.now(), sender: { id: 'customer' }, recipient: { id: 'page' }, message: { mid: 'message-1', text: 'Hello', ...extras } }] }] });
const sign = (text: string) => `sha256=${createHmac('sha256', secret).update(text).digest('hex')}`;
test('deployed advanced worker reaches the gated webhook rather than serving HTML', async () => {
  const response = await advancedWorker.fetch(new Request('https://journeyexpertltd.com/angela/meta-webhook'), {});
  assert.equal(response.status, 503); assert.equal(await response.text(), 'Webhook setup incomplete');
  const health = await advancedWorker.fetch(new Request('https://journeyexpertltd.com/angela/health'), {});
  assert.equal(health.status, 200);
});
test('GET verifies token and echoes only the exact challenge', async () => {
  const response = await onRequest({ request: new Request('https://example.test/api/meta/webhook?hub.mode=subscribe&hub.verify_token=test&hub.challenge=12345'), env: { META_VERIFY_TOKEN: 'test' } });
  assert.equal(response.status, 200); assert.equal(await response.text(), '12345');
  assert.equal((await onRequest({ request: new Request('https://example.test/?hub.mode=subscribe&hub.verify_token=wrong&hub.challenge=123'), env: { META_VERIFY_TOKEN: 'test' } })).status, 403);
});
test('raw-body HMAC rejects alterations and malformed signatures', async () => {
  const bytes = new TextEncoder().encode('hello');
  assert.equal(await validSignature(bytes, sign('hello'), secret), true);
  assert.equal(await validSignature(bytes, sign('hello '), secret), false);
  assert.equal(await validSignature(bytes, 'sha256=bad', secret), false);
});
test('accepts only configured assets and excludes echoes, receipts and stale messages', () => {
  assert.equal(messagesFrom(event(), { META_PAGE_ID: 'page' }).length, 1);
  assert.equal(messagesFrom(event(), { META_PAGE_ID: 'other' }).length, 0);
  assert.equal(messagesFrom(event({ is_echo: true }), { META_PAGE_ID: 'page' }).length, 0);
  const stale = event(); stale.entry[0].messaging[0].timestamp = Date.now() - 24 * 3600_000;
  assert.equal(messagesFrom(stale, { META_PAGE_ID: 'page' }).length, 0);
  assert.equal(messagesFrom({ object: 'page', entry: [{ id: 'page', messaging: [{ delivery: { mids: ['x'] } }] }] }, { META_PAGE_ID: 'page' }).length, 0);
});
test('WhatsApp is constrained to the configured WABA and phone ID', () => {
  const payload = { object: 'whatsapp_business_account', entry: [{ id: 'waba', changes: [{ field: 'messages', value: { metadata: { phone_number_id: 'phone' }, messages: [{ id: 'wamid.1', from: '880123', timestamp: String(Math.floor(Date.now()/1000)), type: 'text', text: { body: 'বাংলা' } }] } }] }] };
  assert.equal(messagesFrom(payload, { META_WABA_ID: 'waba', META_WHATSAPP_PHONE_ID: 'phone' })[0].text, 'বাংলা');
  assert.equal(messagesFrom(payload, { META_WABA_ID: 'wrong', META_WHATSAPP_PHONE_ID: 'phone' }).length, 0);
});
test('messaging remains closed until credentials and explicit activation exist', async () => {
  const body = JSON.stringify(event());
  const request = () => new Request('https://example.test/api/meta/webhook', { method: 'POST', headers: { 'X-Hub-Signature-256': sign(body) }, body });
  assert.equal((await onRequest({ request: request(), env: {} })).status, 503);
  assert.equal((await onRequest({ request: request(), env: { META_APP_SECRET: secret, META_PAGE_ID: 'page' } })).status, 503);
  assert.equal((await onRequest({ request: new Request('https://example.test/', { method: 'POST', body }), env: { META_APP_SECRET: secret } })).status, 401);
});
test('send credentials stay in Authorization and IDs are hashed for storage', async () => {
  const message = messagesFrom(event(), { META_PAGE_ID: 'page' })[0];
  const config = sendConfiguration(message, { META_GRAPH_VERSION: 'v26.0', META_PAGE_ACCESS_TOKEN: 'test-token' }, 'Hello');
  assert.equal(config.url.includes('test-token'), false);
  assert.equal(config.options.headers.Authorization, 'Bearer test-token');
  assert.equal(JSON.parse(config.options.body).messaging_type, 'RESPONSE');
  assert.match(await eventKey(message), /^[a-f0-9]{64}$/);
  assert.throws(() => sendConfiguration(message, {}, 'Hello'));
});
test('body size is bounded before parsing', async () => {
  const response = await onRequest({ request: new Request('https://example.test/', { method: 'POST', body: 'x'.repeat(256001) }), env: { META_APP_SECRET: secret } });
  assert.equal(response.status, 413);
});
test('concurrent retries send one response and store no customer content', async t => {
  const db = new DatabaseSync(':memory:');
  db.exec(readFileSync(new URL('../migrations/meta-events.sql', import.meta.url), 'utf8'));
  const binding = { prepare(sql: string) { return { bind(...params: any[]) { return { async first() { return db.prepare(sql).get(...params); }, async run() { return db.prepare(sql).run(...params); } }; } }; } };
  let sends = 0;
  t.mock.method(globalThis, 'fetch', async () => { sends++; return Response.json({ message_id: 'outbound' }); });
  const env = { META_APP_SECRET: secret, META_PAGE_ID: 'page', META_PAGE_ACCESS_TOKEN: 'test', META_GRAPH_VERSION: 'v26.0', META_AUTO_REPLY_ENABLED: 'true', META_EVENTS: binding };
  const body = JSON.stringify(event());
  const deliver = () => onRequest({ request: new Request('https://example.test/', { method: 'POST', headers: { 'X-Hub-Signature-256': sign(body) }, body }), env });
  const responses = await Promise.all([deliver(), deliver()]);
  assert.ok(responses.some(response => response.status === 200));
  assert.equal((await deliver()).status, 200);
  assert.equal(sends, 1);
  const row = db.prepare('SELECT * FROM meta_events').get();
  assert.equal(row?.state, 'sent');
  assert.equal(JSON.stringify(row).includes('customer'), false);
  assert.equal(JSON.stringify(row).includes('Hello'), false);
  db.close();
});
test('uncertain network sends are recorded and are not automatically repeated', async t => {
  const db = new DatabaseSync(':memory:');
  db.exec(readFileSync(new URL('../migrations/meta-events.sql', import.meta.url), 'utf8'));
  const binding = { prepare(sql: string) { return { bind(...params: any[]) { return { async first() { return db.prepare(sql).get(...params); }, async run() { return db.prepare(sql).run(...params); } }; } }; } };
  let sends = 0;
  t.mock.method(globalThis, 'fetch', async () => { sends++; throw new Error('Network timeout'); });
  const env = { META_APP_SECRET: secret, META_PAGE_ID: 'page', META_PAGE_ACCESS_TOKEN: 'test', META_GRAPH_VERSION: 'v26.0', META_AUTO_REPLY_ENABLED: 'true', META_EVENTS: binding };
  const body = JSON.stringify(event());
  const deliver = () => onRequest({ request: new Request('https://example.test/', { method: 'POST', headers: { 'X-Hub-Signature-256': sign(body) }, body }), env });
  assert.equal((await deliver()).status, 200); assert.equal((await deliver()).status, 200);
  assert.equal(sends, 1); assert.equal(db.prepare('SELECT state FROM meta_events').get()?.state, 'uncertain');
  db.close();
});
