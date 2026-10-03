import { test } from 'node:test';
import assert from 'node:assert/strict';
import { onRequest } from '../functions/angela/speech.ts';
import worker from '../public/_worker.js';
import apiWorker from '../workers/angela-worker.js';

const env = { GEMINI_API_KEY: 'test-only' };
const wav = Buffer.alloc(48);
wav.write('RIFF'); wav.writeUInt32LE(40, 4); wav.write('WAVE', 8);
wav.write('fmt ', 12); wav.writeUInt32LE(16, 16); wav.writeUInt16LE(1, 20); wav.writeUInt16LE(1, 22);
wav.writeUInt32LE(24000, 24); wav.writeUInt32LE(48000, 28); wav.writeUInt16LE(2, 32); wav.writeUInt16LE(16, 34);
wav.write('data', 36); wav.writeUInt32LE(4, 40);
for (const [name, run] of [
  ['Pages Function', request => onRequest({ request, env })],
  ['Pages Worker', request => worker.fetch(request, env, {})],
  ['API Worker', request => apiWorker.fetch(new Request('https://journeyexpertltd.com/api/voice/gemini', request), env, {})],
]) {
  test(name + ' preserves WAV bytes and sends only the transcript for both languages', async () => {
    const original = globalThis.fetch;
    try {
      for (const text of ['আমি অ্যাঞ্জেলা।', 'I am Angela.']) {
        globalThis.fetch = async (url, options) => {
          const body = JSON.parse(options.body);
          if (name === 'Pages Worker') {
            assert.equal(url, 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash-lite-tts:generateContent');
            assert.equal(body.contents[0].parts[0].text, text);
            assert.equal(body.generationConfig.speechConfig.voiceConfig.voice, 'Aoede');
            return Response.json({ candidates: [{ content: { parts: [{ inlineData: { mimeType: 'audio/wav', data: wav.toString('base64') } }] } }] });
          }
          assert.equal(url, 'https://generativelanguage.googleapis.com/v1beta/interactions');
          assert.equal(body.input[0].content[0].text, text);
          assert.equal(body.generation_config.speech_config[0].voice, 'Aoede');
          return Response.json({ steps: [{ type: 'model_output', content: [{ type: 'audio', mime_type: 'audio/wav', data: wav.toString('base64') }] }] });
        };
        const result = await run(new Request('https://journeyexpertltd.com/angela/speech', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) }));
        assert.equal(result.status, 200);
        assert.deepEqual(Buffer.from(await result.arrayBuffer()), wav);
      }
    } finally { globalThis.fetch = original; }
  });
}
