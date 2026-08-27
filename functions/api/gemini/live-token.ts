type PagesContext = {
  request: Request;
  env: Record<string, string | undefined>;
};

const ALLOWED_ORIGINS = new Set([
  'https://journeyexpertltd.com',
  'https://www.journeyexpertltd.com',
]);
const LOCAL_ORIGINS = new Set(['http://localhost:8788', 'http://127.0.0.1:8788']);
const MODEL = 'gemini-3.1-flash-live-preview';

function isAllowedOrigin(origin: string, env: Record<string, string | undefined>): boolean {
  return ALLOWED_ORIGINS.has(origin) || (env.GEMINI_ALLOW_LOCAL_DEV === 'true' && LOCAL_ORIGINS.has(origin));
}

function json(data: unknown, status = 200, origin?: string, env?: Record<string, string | undefined>): Response {
  const headers = new Headers({
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
  });
  if (origin && env && isAllowedOrigin(origin, env)) {
    headers.set('access-control-allow-origin', origin);
    headers.set('vary', 'Origin');
  }
  return new Response(status === 204 ? null : JSON.stringify(data), { status, headers });
}

export const onRequest = async (context: PagesContext): Promise<Response> => {
  const { request, env } = context;
  const origin = request.headers.get('origin') || '';

  if (request.method === 'OPTIONS') {
    if (!isAllowedOrigin(origin, env)) return json({ error: 'Origin is not allowed' }, 403, origin, env);
    const response = json(null, 204, origin, env);
    response.headers.set('access-control-allow-methods', 'POST, OPTIONS');
    response.headers.set('access-control-allow-headers', 'content-type');
    response.headers.set('access-control-max-age', '86400');
    return response;
  }

  if (!isAllowedOrigin(origin, env)) return json({ error: 'Origin is not allowed' }, 403, origin, env);
  if (request.method !== 'POST') {
    const response = json({ error: 'Method Not Allowed' }, 405, origin, env);
    response.headers.set('allow', 'POST, OPTIONS');
    return response;
  }

  const apiKey = env.GEMINI_API_KEY;
  if (!apiKey) return json({ error: 'Gemini Live is not configured' }, 503, origin, env);

  const now = new Date();
  const expireTime = new Date(now.getTime() + 30 * 60 * 1000).toISOString();
  const newSessionExpireTime = new Date(now.getTime() + 60 * 1000).toISOString();

  try {
    const upstream = await fetch('https://generativelanguage.googleapis.com/v1beta/auth_tokens', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        uses: 1,
        expireTime,
        newSessionExpireTime,
        liveConnectConstraints: {
          model: `models/${MODEL}`,
          config: {
            sessionResumption: {},
            responseModalities: ['AUDIO'],
            inputAudioTranscription: {
              languageCodes: ['bn-BD', 'en-US'],
              mode: 'SMART',
              customVocabulary: [
                'Angela',
                'Anjela',
                'Journey Expert Ltd.',
                'Dhaka',
                'visa',
                'ভিসা',
                'ঢাকা',
              ],
            },
            outputAudioTranscription: {},
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: 'Kore' },
              },
            },
          },
        },
      }),
    });

    if (!upstream.ok) {
      return json({ error: 'Gemini Live token service rejected the request' }, 502, origin, env);
    }

    const payload = (await upstream.json()) as { name?: unknown };
    if (typeof payload.name !== 'string' || !payload.name.startsWith('auth_tokens/')) {
      return json({ error: 'Gemini Live returned an invalid token response' }, 502, origin, env);
    }

    return json({ token: payload.name, model: MODEL, expiresAt: expireTime }, 200, origin, env);
  } catch {
    return json({ error: 'Gemini Live token service is unavailable' }, 502, origin, env);
  }
};
