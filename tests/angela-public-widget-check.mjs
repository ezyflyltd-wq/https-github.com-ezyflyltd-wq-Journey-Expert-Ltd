import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const widgetPath = path.join(root, 'src/components/FreeVoiceAngelaWidget.tsx');
const appPath = path.join(root, 'src/App.tsx');
const widget = fs.readFileSync(widgetPath, 'utf8');
const app = fs.readFileSync(appPath, 'utf8');

assert.equal(app.includes('FreeVoiceAngelaWidget'), true, 'the app must mount the free assistant');
assert.equal(app.includes('ElevenLabsAngelaWidget'), false, 'the app must not mount the retired paid widget');
assert.equal(widget.includes('hasAcceptedDisclosure'), true, 'the widget must gate conversation on disclosure acceptance');
assert.equal(widget.includes('AI assistant, not a human'), true, 'the disclosure must identify the assistant as AI');
assert.equal(widget.includes('Gemini endpoint'), true, 'the disclosure must name the voice processing destination');
assert.equal(widget.includes('রেকর্ডিং'), true, 'the Bengali disclosure must explain recording');
assert.equal(widget.includes('Do not share passport, bank, payment, password'), true, 'the sensitive-data warning must be visible');
assert.equal(widget.includes('tel:+8801926400400'), true, 'the human-support phone number must be callable');
assert.equal(widget.includes('Talk to Angela · কথা বলুন'), true, 'the launcher must be bilingual');
assert.equal(widget.includes('sessionStorage'), true, 'consent must remain session-scoped');
assert.equal(widget.includes('onClick={openFirstTimeAssistant}'), true, 'the launcher must open the disclosure');
assert.equal(app.includes("activePortal === 'main' && isPublicAngelaRoute(location.pathname)"), true, 'the widget must remain limited to approved public routes');

console.log('Public Angela widget checks passed.');
