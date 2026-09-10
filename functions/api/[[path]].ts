import { healthResponse } from '../_health';

type PagesContext = {
  request: Request;
  env: Record<string, string | undefined>;
};

const DEFAULT_AI_STUDIO_ORIGIN = 'https://journey-expert-ltd.ai.studio';

function jsonError(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

async function elevenLabsResponse(request: Request, env: Record<string, string | undefined>): Promise<Response> {
  const apiKey = env.ELEVENLABS_API_KEY;
  const voiceId = env.ELEVENLABS_VOICE_ID;
  if (request.method !== 'POST') return jsonError('Method Not Allowed', 405);
  const body = await request.json().catch(() => ({})) as { text?: unknown; language?: unknown };
  const text = typeof body.text === 'string' ? body.text.trim().slice(0, 5000) : '';
  if (!text) return jsonError('Text is required', 400);
  if (!apiKey || !voiceId) {
    return new Response(JSON.stringify({ error: 'ElevenLabs is not configured', configured: false, fallback: 'browser-speech-synthesis' }), {
      status: 503,
      headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
    });
  }
  const upstream = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}`, {
    method: 'POST',
    headers: { accept: 'audio/mpeg', 'content-type': 'application/json', 'xi-api-key': apiKey },
    body: JSON.stringify({
      text,
      model_id: env.ELEVENLABS_MODEL_ID || 'eleven_multilingual_v2',
      output_format: env.ELEVENLABS_OUTPUT_FORMAT || 'mp3_44100_128',
      voice_settings: { stability: 0.48, similarity_boost: 0.78, style: 0.18, use_speaker_boost: true },
    }),
  });
  if (!upstream.ok) return jsonError('ElevenLabs request failed', 502);
  const headers = new Headers(upstream.headers);
  headers.set('cache-control', 'no-store');
  return new Response(upstream.body, { status: upstream.status, headers });
}

export const onRequest = async (context: PagesContext): Promise<Response> => {
  const { request, env } = context;

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'access-control-allow-origin': 'https://journeyexpertltd.com',
        'access-control-allow-methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
        'access-control-allow-headers': 'content-type, authorization',
        'access-control-max-age': '86400',
      },
    });
  }

  const requestUrl = new URL(request.url);

  // Never proxy private portal overview paths to the public AI Studio origin.
  // These endpoints require authenticated, tenant-scoped backend services.
  if (requestUrl.pathname === '/api/b2b/overview' || requestUrl.pathname === '/api/admin/overview') {
    return jsonError('Private portal data service is not configured for public access.', 503);
  }

  if (requestUrl.pathname === '/api/health' || requestUrl.pathname === '/api/healthz') {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
        status: 405,
        headers: {
          allow: 'GET, HEAD',
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store',
        },
      });
    }
    return healthResponse(request);
  }

  if (requestUrl.pathname === '/api/voice/status') {
    return new Response(JSON.stringify({
      provider: 'elevenlabs',
      configured: Boolean(env.ELEVENLABS_API_KEY && env.ELEVENLABS_VOICE_ID),
      fallback: 'browser-speech-synthesis',
    }), { headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });
  }

  if (requestUrl.pathname === '/api/voice/elevenlabs') {
    try {
      return await elevenLabsResponse(request, env);
    } catch {
      return jsonError('ElevenLabs proxy unavailable', 502);
    }
  }

  const origin = (env.AI_STUDIO_ORIGIN || DEFAULT_AI_STUDIO_ORIGIN).replace(/\/$/, '');
  const targetUrl = `${origin}${requestUrl.pathname}${requestUrl.search}`;
  const headers = new Headers(request.headers);

  headers.delete('host');
  headers.set('x-forwarded-host', requestUrl.host);
  headers.set('x-forwarded-proto', requestUrl.protocol.replace(':', ''));

  let body: ArrayBuffer | undefined;
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    body = await request.arrayBuffer();
  }

  try {
    const upstream = await fetch(targetUrl, {
      method: request.method,
      headers,
      body,
      redirect: 'manual',
    });

    const responseHeaders = new Headers(upstream.headers);
    responseHeaders.set('cache-control', 'no-store');
    responseHeaders.set('access-control-allow-origin', 'https://journeyexpertltd.com');

    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: responseHeaders,
    });
  } catch {
    return jsonError('Upstream AI Studio service is unavailable.', 502);
  }
};
