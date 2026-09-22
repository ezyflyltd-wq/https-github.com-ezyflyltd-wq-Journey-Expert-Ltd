type Context = { request: Request; env: Record<string, string | undefined> };

const json = (body: unknown, status = 200) => Response.json(body, {
  status,
  headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' },
});

export async function onRequest({ request, env }: Context): Promise<Response> {
  if (request.method !== 'POST') return new Response(null, { status: 405, headers: { Allow: 'POST' } });
  const url = new URL(request.url);
  const origin = request.headers.get('origin');
  if (origin && origin !== url.origin) return json({ error: 'origin_not_allowed' }, 403);

  const key = env.GEMINI_API_KEY?.trim();
  if (!key) return json({ error: 'live_voice_not_configured' }, 503);

  const expireTime = new Date(Date.now() + 5 * 60 * 1000).toISOString();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);

  try {
    const upstream = await fetch('https://generativelanguage.googleapis.com/v1beta/auth_tokens', {
      method: 'POST',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify({
        uses: 1,
        expireTime,
        liveConnectConstraints: {
          model: 'models/gemini-3.8-live',
          config: { sessionResumption: {}, responseModalities: ['AUDIO'] },
        },
      }),
    });

    if (!upstream.ok) {
      return json({
        error: upstream.status === 429 ? 'live_voice_quota_exceeded' : 'live_voice_unavailable',
        providerStatus: upstream.status,
      }, upstream.status === 429 ? 429 : 424);
    }

    const data: any = await upstream.json();
    const ephemeral = typeof data?.name === 'string' ? data.name : '';
    if (!ephemeral) return json({ error: 'live_voice_unavailable' }, 424);
    return json({ token: ephemeral, model: 'gemini-3.8-live', expiresAt: expireTime });
  } catch {
    return json({ error: controller.signal.aborted ? 'live_voice_timeout' : 'live_voice_unavailable' }, 503);
  } finally {
    clearTimeout(timer);
  }
}
