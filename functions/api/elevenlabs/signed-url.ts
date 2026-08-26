const DEFAULT_AGENT_ID = 'agent_4301m0ypmnzzepdvcte0zqg7sfdh';
const ALLOWED_ORIGINS = new Set([
  'https://journeyexpertltd.com',
  'https://www.journeyexpertltd.com',
]);

type PagesContext = {
  request: Request;
  env: Record<string, string | undefined>;
};

type FirebaseLookupResponse = {
  users?: Array<{
    localId?: string;
    email?: string;
    emailVerified?: boolean;
    disabled?: boolean;
  }>;
};

type SignedUrlResponse = {
  signed_url?: string;
};

function json(data: unknown, status = 200, extraHeaders: HeadersInit = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store, no-cache, must-revalidate',
      pragma: 'no-cache',
      'x-content-type-options': 'nosniff',
      ...extraHeaders,
    },
  });
}

function corsHeaders(origin: string | null): HeadersInit {
  if (!origin || !ALLOWED_ORIGINS.has(origin)) return {};
  return {
    'access-control-allow-origin': origin,
    vary: 'Origin',
    'access-control-allow-headers': 'authorization, content-type',
    'access-control-allow-methods': 'GET, OPTIONS',
    'access-control-max-age': '600',
  };
}

function bearerToken(request: Request): string | null {
  const value = request.headers.get('authorization') || '';
  const match = value.match(/^Bearer\s+([^\s]+)$/i);
  return match?.[1] || null;
}

async function verifyFirebaseIdToken(idToken: string, env: PagesContext['env']): Promise<Response | { uid: string }> {
  const firebaseApiKey = env.FIREBASE_WEB_API_KEY;
  if (!firebaseApiKey) return json({ error: 'Authentication service is not configured.' }, 503);

  const lookupResponse = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(firebaseApiKey)}`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ idToken }),
    },
  );

  if (!lookupResponse.ok) return json({ error: 'Authentication required.' }, 401);

  const lookup = await lookupResponse.json() as FirebaseLookupResponse;
  const account = lookup.users?.[0];
  if (!account?.localId || account.disabled) return json({ error: 'User account is not allowed.' }, 403);

  const requireVerifiedEmail = env.REQUIRE_VERIFIED_EMAIL === 'true';
  if (requireVerifiedEmail && account.emailVerified !== true) {
    return json({ error: 'A verified email address is required to start Angela.' }, 403);
  }

  return { uid: account.localId };
}

export const onRequest = async ({ request, env }: PagesContext): Promise<Response> => {
  const origin = request.headers.get('origin');
  const headers = corsHeaders(origin);

  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return json({ error: 'Origin is not allowed.' }, 403);
  }

  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
  if (request.method !== 'GET') return json({ error: 'Method Not Allowed' }, 405, { allow: 'GET, OPTIONS', ...headers });

  const token = bearerToken(request);
  if (!token) return json({ error: 'Authentication required.' }, 401, headers);

  let verified: Response | { uid: string };
  try {
    verified = await verifyFirebaseIdToken(token, env);
  } catch {
    return json({ error: 'Authentication service is unavailable.' }, 503, headers);
  }
  if (verified instanceof Response) {
    for (const [key, value] of Object.entries(headers)) verified.headers.set(key, value);
    return verified;
  }

  const elevenLabsApiKey = env.ELEVENLABS_API_KEY;
  if (!elevenLabsApiKey) return json({ error: 'Voice service is not configured.' }, 503, headers);

  const agentId = env.ELEVENLABS_AGENT_ID || DEFAULT_AGENT_ID;

  let providerResponse: Response;
  try {
    providerResponse = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${encodeURIComponent(agentId)}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'xi-api-key': elevenLabsApiKey,
        },
      },
    );
  } catch {
    return json({ error: 'Voice service is temporarily unavailable.' }, 502, headers);
  }

  if (!providerResponse.ok) {
    if (providerResponse.status === 401 || providerResponse.status === 403) {
      return json({ error: 'Voice service authentication is not configured correctly.' }, 502, headers);
    }
    if (providerResponse.status === 402 || providerResponse.status === 429) {
      return json({ error: 'Voice service usage limit reached.' }, 429, headers);
    }
    return json({ error: 'Voice service could not create a session.' }, 502, headers);
  }

  let body: SignedUrlResponse;
  try {
    body = await providerResponse.json() as SignedUrlResponse;
  } catch {
    return json({ error: 'Voice service returned an invalid session.' }, 502, headers);
  }
  if (!body.signed_url || !body.signed_url.startsWith('wss://')) {
    return json({ error: 'Voice service returned an invalid session.' }, 502, headers);
  }

  // The Firebase UID is intentionally not returned to the browser and is not logged.
  void verified.uid;
  return json({ signedUrl: body.signed_url }, 200, headers);
};
