import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker from '../public/_worker.js';
import { onRequest } from '../functions/angela/chat.ts';

test('Both Pages handlers answer all directory categories without provider calls', async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async () => { throw new Error('Directory must not use AI quota'); };
  try {
    for (const handler of [request => worker.fetch(request, { GEMINI_API_KEY: 'test' }), request => onRequest({ request, env: { GEMINI_API_KEY: 'test' } })]) {
      for (const [message, language] of [['তোমাদের সব সার্ভিস, ব্র্যান্ড এবং ফোন নম্বর বলো।', 'bn'], ['List your services, brands and phone number.', 'en']]) {
        const response = await handler(new Request('https://journeyexpertltd.com/angela/chat', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message, language }),
        }));
        assert.equal(response.status, 200);
        const data = await response.json();
        assert.equal(data.primaryIntent, 'company_directory');
        for (const text of ['JEL Study Abroad', 'Craft Bangla', '01926400400']) assert.ok(data.reply.includes(text));
        assert.match(data.reply, /air ticketing/i);
        assert.equal(data.language, language);
      }
    }
  } finally { globalThis.fetch = original; }
});
