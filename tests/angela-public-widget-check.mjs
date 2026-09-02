import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const widgetPath = path.join(root, 'src/components/ElevenLabsAngelaWidget.tsx');
const appPath = path.join(root, 'src/App.tsx');
const widget = fs.readFileSync(widgetPath, 'utf8');
const app = fs.readFileSync(appPath, 'utf8');

const newAgentId = 'agent_4301m0ypmnzzepdvcte0zqg7sfdh';
const oldAgentId = 'agent_5301m0w4hsxqeh29b7qe1cje6tzd';

assert.equal(widget.includes(newAgentId), true, 'the widget must use the new ElevenLabs agent ID');
assert.equal(widget.includes(oldAgentId), false, 'the old ElevenLabs agent ID must not remain in the production widget');
assert.equal(widget.includes('hasAcceptedDisclosure'), true, 'the widget must gate rendering on disclosure acceptance');
assert.equal(widget.includes('recorded, stored, viewed, and shared with ElevenLabs'), true, 'the English disclosure must explain recording and sharing');
assert.equal(widget.includes('রেকর্ড'), true, 'the Bengali disclosure must explain recording');
assert.equal(widget.includes('Do not share passport, bank, payment, or other sensitive documents'), true, 'the sensitive-data warning must be visible');
assert.equal(widget.includes('+880 1926-400400'), true, 'the human-support phone number must be visible');
assert.equal(widget.includes('tel:+8801926400400'), true, 'the human-support phone number must be callable');
assert.equal(widget.includes('https://elevenlabs.io/docs/eleven-agents/legal/disclosure-requirement'), true, 'the official disclosure guidance must be linked');
assert.equal(widget.includes('agent-id={ANGELA_AGENT_ID}'), true, 'the custom element must receive the new agent constant');
assert.equal(widget.includes('fixed bottom-4 right-4'), true, 'the public launcher must be fixed and floating');
assert.equal(widget.includes('Talk to Anjela · কথা বলুন'), true, 'the floating launcher must be customer-visible and bilingual');
assert.equal(widget.includes('sessionStorage'), true, 'consent state may persist only for the current browser session');
assert.equal(widget.includes('onClick={() => setIsDisclosureOpen(true)}'), true, 'the floating launcher must open the disclosure before widget loading');
assert.equal(app.includes("activePortal === 'main' && isPublicAngelaRoute(location.pathname)"), true, 'the widget must remain limited to approved public routes');

console.log('Public Angela widget checks passed.');
