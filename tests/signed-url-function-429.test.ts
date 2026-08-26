import assert from 'node:assert/strict';
import { onRequest } from '../functions/api/elevenlabs/signed-url';

const originalFetch = globalThis.fetch;

try {
  const calls: Array<{ url: string; headers: Headers }> = [];
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    calls.push({ url, headers: new Headers(init?.headers) });

    if (url.startsWith('https://identitytoolkit.googleapis.com/')) {
      return new Response(JSON.stringify({ users: [{ localId: 'firebase-user-1', disabled: false }] }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    }

    assert.match(url, /^https:\/\/api\.elevenlabs\.io\/v1\/convai\/conversation\/get-signed-url/);
    assert.equal(new Headers(init?.headers).get('xi-api-key'), 'test-provider-key');
    return new Response(JSON.stringify({ error: 'provider quota exhausted; do not expose this detail' }), {
      status: 429,
      headers: { 'content-type': 'application/json' },
    });
  }) as typeof fetch;

  const response = await onRequest({
    request: new Request('https://journeyexpertltd.com/api/elevenlabs/signed-url', {
      method: 'GET',
      headers: {
        authorization: 'Bearer firebase-id-token-for-test',
        origin: 'https://journeyexpertltd.com',
      },
    }),
    env: {
      FIREBASE_WEB_API_KEY: 'test-firebase-key',
      ELEVENLABS_API_KEY: 'test-provider-key',
    },
  });

  assert.equal(response.status, 429);
  assert.equal(response.headers.get('access-control-allow-origin'), 'https://journeyexpertltd.com');
  const body = await response.json() as { error?: string; signedUrl?: string };
  assert.equal(body.error, 'Voice service usage limit reached.');
  assert.equal(body.signedUrl, undefined);
  assert.doesNotMatch(JSON.stringify(body), /test-provider-key|provider quota exhausted|firebase-id-token/i);
  assert.equal(calls.length, 2);

  console.log('Signed URL endpoint 429 regression: PASS');
} finally {
  globalThis.fetch = originalFetch;
}
