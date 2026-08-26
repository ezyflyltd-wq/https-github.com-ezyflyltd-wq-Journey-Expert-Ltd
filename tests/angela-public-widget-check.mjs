import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const widget = fs.readFileSync(path.join(root, 'src/components/ElevenLabsAngelaWidget.tsx'), 'utf8');
const app = fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8');
const signedUrl = fs.readFileSync(path.join(root, 'functions/api/elevenlabs/signed-url.ts'), 'utf8');

const currentAgentId = 'agent_4301m0ypmnzzepdvcte0zqg7sfdh';
const oldAgentId = 'agent_5301m0w4hsxqeh29b7qe1cje6tzd';

assert.equal(widget.includes(currentAgentId), true, 'private widget must identify the current agent');
assert.equal(signedUrl.includes(currentAgentId), true, 'signed-url function must target the current agent by default');
assert.equal(widget.includes(oldAgentId), false, 'old agent ID must not remain in the private widget');
assert.equal(signedUrl.includes(oldAgentId), false, 'old agent ID must not remain in the signed-url endpoint');
assert.equal(widget.includes('Before you talk with Anjela'), true, 'private widget must preserve the disclosure gate');
assert.equal(widget.includes('hasAcceptedDisclosure'), true, 'private widget must gate the SDK provider on disclosure acceptance');
assert.equal(widget.includes('recorded, stored, viewed, and shared with ElevenLabs'), true, 'English disclosure must explain recording and sharing');
assert.equal(widget.includes('রেকর্ড'), true, 'Bengali disclosure must explain recording');
assert.equal(widget.includes('Do not share passport, bank, payment, or other sensitive documents'), true, 'sensitive-data warning must remain visible');
assert.equal(widget.includes('+880 1926-400400'), true, 'human-support phone number must remain visible');
assert.equal(widget.includes('https://elevenlabs.io/docs/eleven-agents/legal/disclosure-requirement'), true, 'official disclosure guidance must remain linked');
assert.equal(widget.includes('useAuth'), true, 'private widget must use Firebase authentication');
assert.equal(widget.includes('fetchAngelaSignedUrl'), true, 'private widget must obtain a signed URL before starting a session');
assert.equal(widget.includes('ConversationProvider'), true, 'private widget must use the ElevenLabs React SDK provider');
assert.equal(widget.includes('elevenlabs-convai'), false, 'private widget must not retain the public custom-element embed');
assert.equal(app.includes("activePortal === 'main' && ("), true, 'private widget must remain mounted only from the main portal');
assert.equal(app.includes('<AngelaPrivateSdkMount pathname={location.pathname} />'), true, 'private widget mount must receive the current pathname');
assert.equal(signedUrl.includes('no-store, no-cache, must-revalidate'), true, 'signed-url endpoint must be non-cacheable');
assert.equal(signedUrl.includes('https://journeyexpertltd.com'), true, 'signed-url endpoint must allow the canonical origin');
assert.equal(signedUrl.includes('https://www.journeyexpertltd.com'), true, 'signed-url endpoint must allow the www origin');

console.log('Private Angela widget checks passed.');
