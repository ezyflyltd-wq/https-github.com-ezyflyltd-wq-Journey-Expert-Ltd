import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const widgetPath = path.join(root, 'src/components/FreeVoiceAngelaWidget.tsx');
const appPath = path.join(root, 'src/App.tsx');
const widget = fs.readFileSync(widgetPath, 'utf8');
const app = fs.readFileSync(appPath, 'utf8');
const server = fs.readFileSync(path.join(root, 'server.ts'), 'utf8');
const pagesChat = fs.readFileSync(path.join(root, 'functions/angela/chat.ts'), 'utf8');
const pagesSpeech = fs.readFileSync(path.join(root, 'functions/angela/speech.ts'), 'utf8');
const pagesLiveToken = fs.readFileSync(path.join(root, 'functions/angela/live-token.ts'), 'utf8');

assert.equal(widget.includes('getSpeechRecognition'), true, 'the widget must include browser speech recognition');
assert.equal(widget.includes('speechSynthesis'), true, 'the widget must include browser speech synthesis');
assert.equal(widget.includes("fetch('/angela/chat'"), true, 'the widget must use the Worker-independent Pages Angela brain');
assert.equal(widget.includes('unknown browser default voice is never substituted'), true, 'the disclosure must explain the verified female-only voice policy');
assert.equal(widget.includes("fetch('/api/voice/elevenlabs'"), false, 'the free widget must not call ElevenLabs');
assert.equal(widget.includes("fetch('/api/voice/status'"), false, 'the free widget must not probe a paid voice provider');
assert.equal(widget.includes("useState<'en' | 'bn'>('bn')"), true, 'Angela must offer only explicit Bangla and English modes');
assert.equal(widget.includes("setLanguage('auto')"), false, 'Angela must not expose Auto mode');
assert.equal(widget.includes("setLanguage('hi')"), false, 'Angela must not expose Hindi mode');
assert.equal(widget.includes("fetch('/angela/speech'"), true, 'Angela must use the Worker-independent same-origin female TTS route');
assert.equal(server.includes("app.post('/api/voice/gemini'"), true, 'the AI Studio server must expose Gemini female TTS');
assert.equal(widget.includes('Voice output: Angela female'), true, 'Angela UI must state the female-only voice policy');
assert.equal(widget.includes('Use the same server-rendered Angela female voice on desktop and mobile.'), true, 'server female TTS must be the cross-device primary path');
assert.equal(widget.includes('+8801926400400'), true, 'the human-support phone number must be callable');
assert.equal(widget.includes('bottom-[max(0.75rem,env(safe-area-inset-bottom))]'), true, 'the public launcher must respect mobile safe areas');
assert.equal(widget.includes('Talk to Angela · কথা বলুন'), true, 'the launcher must be customer-visible and bilingual');
assert.equal(app.includes("activePortal === 'main' && isPublicAngelaRoute(location.pathname)"), true, 'the widget must remain limited to approved public routes');
assert.equal(app.includes('FreeVoiceAngelaWidget'), true, 'the app must mount the free voice widget');
assert.equal(server.includes("app.post('/api/voice/elevenlabs'"), true, 'the server must expose the ElevenLabs proxy');
assert.equal(server.includes("app.get('/api/voice/status'"), true, 'the server must expose voice provider status');
assert.equal(server.includes("'xi-api-key': apiKey"), true, 'the ElevenLabs key must be sent server-side');

console.log('Free Angela voice widget checks passed.');

const pagesWorker = fs.readFileSync('public/_worker.js', 'utf8');
const worker = fs.readFileSync('workers/angela-worker.js', 'utf8');
assert.equal(pagesWorker.includes("'/api/ai/voice-agent'"), true, 'Pages Worker must expose Angela chat');
assert.equal(pagesWorker.includes("'/api/voice/gemini'"), true, 'Pages Worker must expose female TTS');
assert.equal(pagesWorker.includes("languages: ['bn', 'en']"), true, 'Pages Worker health must declare only Bangla and English');

assert.equal(widget.includes('BANGLA_WELCOME'), true, 'Angela must greet visitors in Bangla by default');
assert.equal(widget.includes('audioContextRef'), true, 'Angela must unlock reliable audio playback across mobile and desktop');

assert.equal(widget.includes("jel:open-angela"), true, 'site AI triggers must open the canonical Angela widget');
assert.equal(widget.includes("recognitionRef.current = null"), true, 'speech recognition sessions must be released between turns');
assert.equal(app.includes('AIAssistantModal'), false, 'the site must not mount a second competing AI assistant modal');

assert.equal(pagesWorker.includes("const model = 'gemini-3.8-flash'"), true, 'Pages Angela brain must be locked to Gemini 3.8 Flash');
assert.equal(pagesWorker.includes("GOOGLE_SEARCH_GROUNDING === 'true'"), true, 'Pages Angela must support opt-in Google Search grounding');
assert.equal(widget.includes('verified female voice is temporarily unavailable'), true, 'voice failure must degrade to text instead of an unknown OS voice');

const liveVoice = fs.readFileSync(path.join(root, 'src/lib/angelaLiveVoice.ts'), 'utf8');
assert.equal(widget.includes('fetchAngelaLiveFemaleSpeech'), true, 'corporate Angela must use verified Gemini Live female fallback');
assert.equal(liveVoice.includes("voiceName: 'Aoede'"), true, 'Live fallback must use Aoede female voice');
assert.equal(liveVoice.includes('/angela/live-token'), true, 'Live fallback must use Worker-independent same-origin token route');
assert.equal(pagesWorker.includes("action === 'live-token'"), true, 'Pages Worker must expose Live token action on canonical route');

assert.equal(pagesWorker.includes("action === 'speech'"), true, 'Pages Worker must multiplex verified female speech on the canonical Angela endpoint');

assert.equal(worker.includes('sample_rate: 24000'), false, 'standalone Worker must use current TTS schema');
assert.equal(worker.includes('liveConnectConstraints'), true, 'standalone Worker must constrain Gemini Live tokens');

assert.equal(pagesChat.includes("'gemini-3.8-flash'"), true, 'Pages-native Angela chat must use Gemini 3.8 Flash');
assert.equal(pagesChat.includes('VERIFIED JEL SOURCE OF TRUTH'), true, 'Pages-native Angela chat must prioritize verified JEL knowledge');
assert.equal(pagesSpeech.includes("'gemini-2.5-flash-preview-tts'"), true, 'female TTS must include the Gemini 2.5 Flash fallback');
assert.equal(pagesSpeech.includes("'gemini-2.5-pro-preview-tts'"), true, 'female TTS must include the Gemini 2.5 Pro fallback');
assert.equal(pagesLiveToken.includes('bidiGenerateContentSetup'), true, 'Live token REST request must use the native Bidi setup field');
