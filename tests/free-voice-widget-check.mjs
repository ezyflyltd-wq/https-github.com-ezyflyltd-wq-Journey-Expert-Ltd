import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const widgetPath = path.join(root, 'src/components/FreeVoiceAngelaWidget.tsx');
const appPath = path.join(root, 'src/App.tsx');
const widget = fs.readFileSync(widgetPath, 'utf8');
const app = fs.readFileSync(appPath, 'utf8');
const server = fs.readFileSync(path.join(root, 'server.ts'), 'utf8');

assert.equal(widget.includes('getSpeechRecognition'), true, 'the widget must include browser speech recognition');
assert.equal(widget.includes('speechSynthesis'), true, 'the widget must include browser speech synthesis');
assert.equal(widget.includes("fetch('/api/ai-assistant'"), true, 'the widget must use the verified live Angela endpoint');
assert.equal(widget.includes('This free version does not use ElevenLabs'), true, 'the disclosure must explain the free provider choice');
assert.equal(widget.includes("fetch('/api/voice/elevenlabs'"), false, 'the free widget must not call ElevenLabs');
assert.equal(widget.includes("fetch('/api/voice/status'"), false, 'the free widget must not probe a paid voice provider');
assert.equal(widget.includes("useState<'en' | 'bn'>('bn')"), true, 'Angela must offer only explicit Bangla and English modes');
assert.equal(widget.includes("setLanguage('auto')"), false, 'Angela must not expose Auto mode');
assert.equal(widget.includes("setLanguage('hi')"), false, 'Angela must not expose Hindi mode');
assert.equal(widget.includes("fetch('https://journeyexpertbd.com/angela/main-speech'"), true, 'Angela must use the verified cross-site Gemini female TTS endpoint');
assert.equal(server.includes("app.post('/api/voice/gemini'"), true, 'the AI Studio server must expose Gemini female TTS');
assert.equal(widget.includes('Voice output: Angela female'), true, 'Angela UI must state the female-only voice policy');
assert.equal(widget.includes('Use the same server-rendered Angela female voice on desktop and mobile.'), true, 'server female TTS must be the cross-device primary path');
assert.equal(widget.includes('+8801926400400'), true, 'the human-support phone number must be callable');
assert.equal(widget.includes('fixed bottom-4 right-4'), true, 'the public launcher must be fixed and floating');
assert.equal(widget.includes('Talk to Angela · কথা বলুন'), true, 'the launcher must be customer-visible and bilingual');
assert.equal(app.includes("activePortal === 'main' && isPublicAngelaRoute(location.pathname)"), true, 'the widget must remain limited to approved public routes');
assert.equal(app.includes('FreeVoiceAngelaWidget'), true, 'the app must mount the free voice widget');
assert.equal(server.includes("app.post('/api/voice/elevenlabs'"), true, 'the server must expose the ElevenLabs proxy');
assert.equal(server.includes("app.get('/api/voice/status'"), true, 'the server must expose voice provider status');
assert.equal(server.includes("'xi-api-key': apiKey"), true, 'the ElevenLabs key must be sent server-side');

console.log('Free Angela voice widget checks passed.');

const pagesWorker = fs.readFileSync('public/_worker.js', 'utf8');
assert.equal(pagesWorker.includes("'/api/ai/voice-agent'"), true, 'Pages Worker must expose Angela chat');
assert.equal(pagesWorker.includes("'/api/voice/gemini'"), true, 'Pages Worker must expose female TTS');
assert.equal(pagesWorker.includes("languages: ['bn', 'en']"), true, 'Pages Worker health must declare only Bangla and English');
