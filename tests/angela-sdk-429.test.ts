import assert from 'node:assert/strict';
import { AngelaSessionError, fetchAngelaSignedUrl } from '../src/lib/angelaSession';
import { friendlyAngelaMessage } from '../src/lib/angelaMessages';

const validSignedUrl = 'wss://api.elevenlabs.io/v1/convai/conversation?conversation_signature=test';

type FakeFetch = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

async function expectAngelaError(
  fetchImpl: FakeFetch,
  expectedKind: AngelaSessionError['kind'],
  expectedStatus: number,
) {
  await assert.rejects(
    () => fetchAngelaSignedUrl('firebase-id-token-for-test', fetchImpl),
    (error: unknown) => {
      assert.ok(error instanceof AngelaSessionError);
      assert.equal(error.kind, expectedKind);
      assert.equal(error.status, expectedStatus);
      return true;
    },
  );
}

await expectAngelaError(
  async () => new Response(JSON.stringify({ error: 'Voice service usage limit reached.' }), {
    status: 429,
    headers: { 'content-type': 'application/json' },
  }),
  'quota',
  429,
);

assert.match(
  friendlyAngelaMessage('quota'),
  /temporarily unavailable.*current usage limit/i,
);
assert.doesNotMatch(friendlyAngelaMessage('quota'), /9,984|10,000|api.?key|token/i);

await expectAngelaError(
  async () => new Response(JSON.stringify({ error: 'Authentication required.' }), {
    status: 401,
    headers: { 'content-type': 'application/json' },
  }),
  'auth',
  401,
);

await expectAngelaError(
  async () => new Response(JSON.stringify({ error: 'Upstream failed.' }), {
    status: 502,
    headers: { 'content-type': 'application/json' },
  }),
  'provider',
  502,
);

const signedUrl = await fetchAngelaSignedUrl(
  'firebase-id-token-for-test',
  async (input, init) => {
    assert.equal(String(input), '/api/elevenlabs/signed-url');
    assert.equal(init?.method, 'GET');
    assert.equal((init?.headers as Record<string, string>).authorization, 'Bearer firebase-id-token-for-test');
    return new Response(JSON.stringify({ signedUrl: validSignedUrl }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  },
);
assert.equal(signedUrl, validSignedUrl);

console.log('Angela SDK 429 regression: PASS');
