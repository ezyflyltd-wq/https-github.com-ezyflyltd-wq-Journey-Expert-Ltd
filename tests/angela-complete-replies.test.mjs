import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import worker from '../public/_worker.js';

const nativeFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = nativeFetch; });
const ask = async (message, language) => (await worker.fetch(new Request('https://journeyexpertltd.com/angela/chat', {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message, language }),
}), { GEMINI_API_KEY: 'test-only' })).json();

test('service and contact answers stay complete without using model quota', async () => {
  globalThis.fetch = async () => { assert.fail('Stable service information must not consume model quota'); };
  for (const [message, language] of [
    ['What services does JEL provide and what is your hotline?', 'en'],
    ['তুমি কি বাংলা বলতে পারো? তোমাদের সব সেবা ও ফোন নম্বর বলো।', 'bn'],
  ]) {
    const data = await ask(message, language);
    assert.equal(data.language, language);
    assert.equal(data.mode, 'verified');
    assert.match(data.reply, /Hajj/);
    assert.match(data.reply, /Study Abroad/);
    assert.match(data.reply, /01926400400/);
  }
});

test('token-truncated model output is never presented as a complete answer', async () => {
  let providerCalls = 0;
  globalThis.fetch = async (url, options) => {
    if (!String(url).includes('generativelanguage.googleapis.com')) {
      return Response.json({ mode: 'ai_unavailable' }, { status: 503 });
    }
    providerCalls++;
    const config = JSON.parse(options.body).generationConfig;
    assert.ok(config.maxOutputTokens >= 768);
    return Response.json({ candidates: [{ finishReason: 'MAX_TOKENS', content: { parts: [{ text: 'মালয়েশিয়া ট্যুরিস্ট ভিসার জন্য' }] } }] });
  };
  const data = await ask('ami Malaysia tourist visa niye jante chai', 'bn');
  assert.equal(providerCalls, 1);
  assert.equal(data.mode, 'ai_unavailable');
  assert.match(data.reply, /01926400400/);
  assert.notEqual(data.reply, 'মালয়েশিয়া ট্যুরিস্ট ভিসার জন্য');
});
