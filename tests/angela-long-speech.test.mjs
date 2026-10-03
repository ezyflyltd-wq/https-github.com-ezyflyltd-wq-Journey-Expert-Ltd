import { test } from 'node:test';
import assert from 'node:assert/strict';
import { setTimeout as delay } from 'node:timers/promises';
import { onRequest } from '../functions/angela/speech.ts';
import worker from '../public/_worker.js';

for (const target of ['function', 'worker']) {
test(target + ': full-answer speech survives the old greeting-sized timeout without failover', async () => {
  const original = globalThis.fetch;
  let calls = 0;
  const wav = new Uint8Array(1044);
  wav.set(Buffer.from('RIFF'), 0);
  wav.set(Buffer.from('WAVE'), 8);
  try {
    globalThis.fetch = async (_url, options) => {
      calls++;
      await delay(8000, undefined, { signal: options.signal });
      const data = Buffer.from(wav).toString('base64');
      return Response.json(target === 'function' ? { output: [{ type: 'audio', data }] } : { candidates: [{ content: { parts: [{ inlineData: { data, mimeType: 'audio/wav' } }] } }] });
    };
    const context = {
      request: new Request('https://example.pages.dev/angela/speech', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: 'জার্নি এক্সপার্টের সার্ভিস সম্পর্কে বিস্তারিত বলছি। '.repeat(8) })
      }), env: { GEMINI_API_KEY: 'test-only' }
    };
    const response = target === 'function' ? await onRequest(context) : await worker.fetch(context.request, context.env, {});
    assert.equal(response.status, 200);
    assert.equal(calls, 1, 'do not restart valid generation or consume shared quota');
    assert.equal(response.headers.get('x-angela-voice'), 'Aoede');
  } finally { globalThis.fetch = original; }
});

}
