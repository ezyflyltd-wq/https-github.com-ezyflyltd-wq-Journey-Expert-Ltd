import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const widgetPath = path.join(root, 'src/components/FreeVoiceAngelaWidget.tsx');
const appPath = path.join(root, 'src/App.tsx');
const widget = fs.readFileSync(widgetPath, 'utf8');
const app = fs.readFileSync(appPath, 'utf8');

assert.equal(widget.includes('getSpeechRecognition'), true, 'the widget must include browser speech recognition');
assert.equal(widget.includes('speechSynthesis'), true, 'the widget must include browser speech synthesis');
assert.equal(widget.includes("fetch('/api/ai-assistant'"), true, 'the widget must use the existing AI endpoint');
assert.equal(widget.includes('This free version does not use ElevenLabs'), true, 'the disclosure must explain the free provider choice');
assert.equal(widget.includes('+8801926400400'), true, 'the human-support phone number must be callable');
assert.equal(widget.includes('fixed bottom-4 right-4'), true, 'the public launcher must be fixed and floating');
assert.equal(widget.includes('Talk to Angela · কথা বলুন'), true, 'the launcher must be customer-visible and bilingual');
assert.equal(app.includes("activePortal === 'main' && isPublicAngelaRoute(location.pathname)"), true, 'the widget must remain limited to approved public routes');
assert.equal(app.includes('FreeVoiceAngelaWidget'), true, 'the app must mount the free voice widget');

console.log('Free Angela voice widget checks passed.');

