import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const widget = fs.readFileSync(path.join(root, 'src/components/NativeAngelaWidget.tsx'), 'utf8');
const app = fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8');
const headers = fs.readFileSync(path.join(root, 'public/_headers'), 'utf8');

assert.equal(widget.includes('SpeechRecognition'), true, 'native speech recognition must be used');
assert.equal(widget.includes('speechSynthesis'), true, 'native speech synthesis must be used');
assert.equal(widget.includes("fetch('/api/ai-assistant'"), true, 'voice text must use the existing same-origin AI endpoint');
assert.equal(widget.includes('hasConsent'), true, 'voice must be gated by consent');
assert.equal(widget.includes('Do not share passport, bank, card, payment, OTP, password'), true, 'sensitive-data warning must be visible');
assert.equal(widget.includes('+880 1926-400400'), true, 'human-support phone must be visible');
assert.equal(widget.includes('isPublicNativeAngelaRoute'), true, 'public route gate must exist');
assert.equal(app.includes('<NativeAngelaWidget />'), true, 'native widget must be mounted in App');
assert.equal(app.includes('ElevenLabsAngelaWidget'), false, 'old ElevenLabs widget must not be mounted');
assert.equal(headers.includes('microphone=(self)'), true, 'Cloudflare headers must permit same-origin microphone access');

console.log('Native Angela widget checks passed.');
