import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const server = fs.readFileSync(path.join(root, 'server.ts'), 'utf8');
const brain = fs.readFileSync(path.join(root, 'server/angelaBrain.ts'), 'utf8');
const widget = fs.readFileSync(path.join(root, 'src/components/FreeVoiceAngelaWidget.tsx'), 'utf8');

assert.equal(server.includes("app.post('/api/ai/voice-agent', handleAngelaRequest)"), true, 'voice endpoint must use shared handler');
assert.equal(server.includes("app.post('/api/ai-assistant', handleAngelaRequest)"), true, 'text endpoint must use shared handler');
assert.equal(server.includes('contents'), true, 'shared handler must send conversation contents to the model');
assert.equal(server.includes('responseMimeType: \'application/json\''), true, 'shared handler must request structured output');
assert.equal(server.includes('systemContext'), false, 'client-provided system instructions must not control the server brain');
assert.equal(brain.includes('ANGELA_SYSTEM_PROMPT'), true, 'the master Angela prompt must exist server-side');
assert.equal(brain.includes('retrieveJelKnowledge'), true, 'the JEL knowledge retrieval layer must exist');
assert.equal(brain.includes('sanitizeHistory'), true, 'history must be sanitized before model use');
assert.equal(widget.includes('conversationId'), true, 'widget must keep a conversation id');
assert.equal(widget.includes('history'), true, 'widget must send prior turns');
assert.equal(widget.includes('New chat'), true, 'widget must allow a fresh conversation');

console.log('Angela responsive brain checks passed.');
