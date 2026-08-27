type PagesContext = {
  request: Request;
  env: Record<string, string | undefined>;
};

const ALLOWED_ORIGINS = new Set([
  'https://journeyexpertltd.com',
  'https://www.journeyexpertltd.com',
]);
const MODEL = 'gemini-3.1-flash-live-preview';

function json(data: unknown, status = 200, origin?: string): Response {
  const headers = new Headers({
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
  });
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers.set('access-control-allow-origin', origin);
    headers.set('vary', 'Origin');
  }
  return new Response(JSON.stringify(data), { status, headers });
}

export const onRequest = async (context: PagesContext): Promise<Response> => {
  const { request, env } = context;
  const origin = request.headers.get('origin') || '';

  if (request.method === 'OPTIONS') {
    if (!ALLOWED_ORIGINS.has(origin)) return json({ error: 'Origin is not allowed' }, 403);
    const response = json(null, 204, origin);
    response.headers.set('access-control-allow-methods', 'POST, OPTIONS');
    response.headers.set('access-control-allow-headers', 'content-type');
    response.headers.set('access-control-max-age', '86400');
    return response;
  }

  if (!ALLOWED_ORIGINS.has(origin)) return json({ error: 'Origin is not allowed' }, 403);
  if (request.method !== 'POST') {
    const response = json({ error: 'Method Not Allowed' }, 405, origin);
    response.headers.set('allow', 'POST, OPTIONS');
    return response;
  }

  const apiKey = env.GEMINI_API_KEY;
  if (!apiKey) return json({ error: 'Gemini Live is not configured' }, 503, origin);

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
      return json({ error: 'Gemini Live token service rejected the request' }, 502, origin);
    }

    const payload = (await upstream.json()) as { name?: unknown };
    if (typeof payload.name !== 'string' || !payload.name.startsWith('auth_tokens/')) {
      return json({ error: 'Gemini Live returned an invalid token response' }, 502, origin);
    }

    return json({ token: payload.name, model: MODEL, expiresAt: expireTime }, 200, origin);
  } catch {
    return json({ error: 'Gemini Live token service is unavailable' }, 502, origin);
  }
};
