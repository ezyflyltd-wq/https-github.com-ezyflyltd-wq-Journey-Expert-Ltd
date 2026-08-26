import assert from 'node:assert/strict';
import { onRequest } from '../functions/api/elevenlabs/signed-url';

type Scenario =
  | 'firebase-ok'
  | 'firebase-fail'
  | 'firebase-disabled'
  | 'firebase-unverified'
  | 'provider-401'
  | 'provider-402'
  | 'provider-429'
  | 'provider-500'
  | 'provider-network'
  | 'provider-invalid-json'
  | 'provider-invalid-url'
  | 'provider-success';

const TEST_TOKEN = 'firebase-id-token-test-only';
const TEST_PROVIDER_KEY = 'provider-key-test-only';
const TEST_FIREBASE_KEY = 'firebase-web-key-test-only';
const CURRENT_AGENT_ID = 'agent_4301m0ypmnzzepdvcte0zqg7sfdh';
const ALLOWED_ORIGIN = 'https://journeyexpertltd.com';

function request(origin: string | undefined, token = TEST_TOKEN, method = 'GET') {
  const headers = new Headers();
  if (origin !== undefined) headers.set('origin', origin);
  if (token) headers.set('authorization', `Bearer ${token}`);
  return new Request('https://journeyexpertltd.com/api/elevenlabs/signed-url', { method, headers });
}

async function invoke(scenario: Scenario, options: { origin?: string; requireVerified?: boolean; token?: string; method?: string } = {}) {
  const calls: Array<{ url: string; headers: Headers }> = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    calls.push({ url, headers: new Headers(init?.headers) });

    if (url.startsWith('https://identitytoolkit.googleapis.com/')) {
      if (scenario === 'firebase-fail') return new Response('{}', { status: 401 });
      if (scenario === 'firebase-disabled') {
        return new Response(JSON.stringify({ users: [{ localId: 'uid-disabled', disabled: true }] }), { status: 200 });
      }
      if (scenario === 'firebase-unverified') {
        return new Response(JSON.stringify({ users: [{ localId: 'uid-unverified', disabled: false, emailVerified: false }] }), { status: 200 });
      }
      return new Response(JSON.stringify({ users: [{ localId: 'uid-test', disabled: false, emailVerified: true }] }), { status: 200 });
    }

    assert.match(url, /^https:\/\/api\.elevenlabs\.io\/v1\/convai\/conversation\/get-signed-url\?agent_id=/);
    assert.equal(new Headers(init?.headers).get('xi-api-key'), TEST_PROVIDER_KEY);
    assert.ok(url.includes(CURRENT_AGENT_ID));

    if (scenario === 'provider-network') throw new Error('network failure test');
    if (scenario === 'provider-401') return new Response('{}', { status: 401 });
    if (scenario === 'provider-402') return new Response('{}', { status: 402 });
    if (scenario === 'provider-429') return new Response('{}', { status: 429 });
    if (scenario === 'provider-500') return new Response('{}', { status: 500 });
    if (scenario === 'provider-invalid-json') return new Response('not json', { status: 200 });
    if (scenario === 'provider-invalid-url') return new Response(JSON.stringify({ signed_url: 'https://not-a-websocket.example/session' }), { status: 200 });
    return new Response(JSON.stringify({ signed_url: 'wss://api.elevenlabs.io/v1/convai/conversation?conversation_signature=test-only' }), { status: 200 });
  }) as typeof fetch;

  try {
    return {
      response: await onRequest({
        request: request(options.origin ?? ALLOWED_ORIGIN, options.token ?? TEST_TOKEN, options.method ?? 'GET'),
        env: {
          FIREBASE_WEB_API_KEY: TEST_FIREBASE_KEY,
          ELEVENLABS_API_KEY: TEST_PROVIDER_KEY,
          REQUIRE_VERIFIED_EMAIL: options.requireVerified === false ? 'false' : 'true',
        },
      }),
      calls,
    };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

const options = await invoke('firebase-ok', { method: 'OPTIONS' });
assert.equal(options.response.status, 204);
assert.equal(options.response.headers.get('access-control-allow-origin'), ALLOWED_ORIGIN);
assert.equal(options.calls.length, 0);

const badOrigin = await invoke('firebase-ok', { origin: 'https://evil.example' });
assert.equal(badOrigin.response.status, 403);
assert.equal(badOrigin.response.headers.get('access-control-allow-origin'), null);
assert.equal(badOrigin.calls.length, 0);

const noToken = await invoke('firebase-ok', { token: '' });
assert.equal(noToken.response.status, 401);
assert.equal(noToken.calls.length, 0);

const wrongMethod = await invoke('firebase-ok', { method: 'POST' });
assert.equal(wrongMethod.response.status, 405);
assert.equal(wrongMethod.response.headers.get('allow'), 'GET, OPTIONS');
assert.equal(wrongMethod.calls.length, 0);

const missingFirebase = await onRequest({
  request: request(ALLOWED_ORIGIN),
  env: { ELEVENLABS_API_KEY: TEST_PROVIDER_KEY, REQUIRE_VERIFIED_EMAIL: 'true' },
});
assert.equal(missingFirebase.status, 503);

for (const scenario of ['firebase-fail', 'firebase-disabled', 'firebase-unverified'] as const) {
  const result = await invoke(scenario, { requireVerified: true });
  assert.equal(result.response.status, scenario === 'firebase-fail' ? 401 : 403);
  assert.equal(result.calls.length, 1);
}

const providerCases: Array<[Scenario, number]> = [
  ['provider-401', 502],
  ['provider-402', 429],
  ['provider-429', 429],
  ['provider-500', 502],
  ['provider-network', 502],
  ['provider-invalid-json', 502],
  ['provider-invalid-url', 502],
];
for (const [scenario, expectedStatus] of providerCases) {
  const result = await invoke(scenario);
  assert.equal(result.response.status, expectedStatus, scenario);
  const body = await result.response.text();
  assert.doesNotMatch(body, /provider-key-test-only|firebase-id-token-test-only|conversation_signature=test-only/i, scenario);
}

const success = await invoke('provider-success');
assert.equal(success.response.status, 200);
assert.equal(success.calls.length, 2);
assert.equal(success.response.headers.get('cache-control'), 'no-store, no-cache, must-revalidate');
const successBody = await success.response.json() as { signedUrl?: string };
assert.match(successBody.signedUrl ?? '', /^wss:\/\//);

const unauthenticatedProvider = await onRequest({
  request: request(ALLOWED_ORIGIN),
  env: { FIREBASE_WEB_API_KEY: TEST_FIREBASE_KEY },
});
assert.equal(unauthenticatedProvider.status, 401);

console.log('Angela signed-url security/error suite: PASS');
