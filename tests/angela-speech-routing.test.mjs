import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { fetchAngelaSpeech } from '../src/lib/angelaAudio.ts';

const nativeFetch = globalThis.fetch;
const nativeWindow = globalThis.window;
afterEach(() => {
  globalThis.fetch = nativeFetch;
  if (nativeWindow === undefined) delete globalThis.window;
  else globalThis.window = nativeWindow;
});

test('TTS requests use the configured Angela API Gateway and validate audio', async () => {
  const requests = [];
  const bytes = new Uint8Array(1200);
  bytes.set(new TextEncoder().encode('RIFF'), 0);
  bytes.set(new TextEncoder().encode('WAVE'), 8);
  globalThis.window = { setTimeout, clearTimeout };
  globalThis.fetch = async (url) => {
    requests.push(String(url));
    return new Response(bytes, { status: 200, headers: { 'content-type': 'audio/wav' } });
  };

  const blob = await fetchAngelaSpeech('This is an English voice test.', new AbortController().signal);
  assert.equal(blob.type, 'audio/wav');
  assert.deepEqual(requests, ['/api/ai/voice-agent?action=speech']);
});

test('Live voice tokens use the same configured Angela API Gateway', () => {
  const sourcePath = fileURLToPath(new URL('../src/lib/angelaAudio.ts', import.meta.url));
  const source = readFileSync(sourcePath, 'utf8');
  assert.match(source, /fetch\('\/api\/ai\/voice-agent\?action=live-token'/);
  assert.match(source, /fetch\('\/api\/ai\/voice-agent\?action=speech'/);
});
