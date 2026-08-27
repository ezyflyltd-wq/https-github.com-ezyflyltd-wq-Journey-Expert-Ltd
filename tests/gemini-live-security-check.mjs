import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const endpoint = await readFile(new URL('../functions/api/gemini/live-token.ts', import.meta.url), 'utf8');
const widget = await readFile(new URL('../src/components/GeminiLiveAngelaWidget.tsx', import.meta.url), 'utf8');
const app = await readFile(new URL('../src/App.tsx', import.meta.url), 'utf8');
const python = await readFile(new URL('../examples/gemini_live_ephemeral_token.py', import.meta.url), 'utf8');

assert.match(endpoint, /ALLOWED_ORIGINS/);
assert.match(endpoint, /journeyexpertltd\.com/);
assert.match(endpoint, /GEMINI_API_KEY/);
assert.match(endpoint, /cache-control.*no-store/);
assert.match(endpoint, /uses: 1/);
assert.match(endpoint, /newSessionExpireTime/);
assert.match(endpoint, /bn-BD/);
assert.doesNotMatch(widget, /GEMINI_API_KEY/);
assert.match(widget, /echoCancellation: true/);
assert.match(widget, /noiseSuppression: true/);
assert.match(widget, /autoGainControl: true/);
assert.match(widget, /audio\/pcm;rate=16000/);
assert.match(widget, /BidiGenerateContent\?access_token=/);
assert.match(widget, /interrupted/);
assert.match(app, /VITE_GEMINI_LIVE_ENABLED/);
assert.match(app, /ElevenLabsAngelaWidget/);
assert.match(python, /auth_tokens\.create/);
assert.match(python, /GEMINI_API_KEY/);
assert.doesNotMatch(python, /01718836000/);
console.log('Gemini Live security and integration checks passed');
