import { healthResponse } from '../_health';

type PagesContext = {
  request: Request;
  env: Record<string, string | undefined>;
};

const DEFAULT_AI_STUDIO_ORIGIN = 'https://journey-expert-ltd.ai.studio';
const ELEVENLABS_API_BASE = 'https://api.elevenlabs.io/v1/text-to-speech';
const PRIVATE_PATHS = new Set([
  '/api/b2b/overview',
  '/api/admin/overview',
  '/api/corporate/overview',
]);

function jsonResponse(body: unknown, status = 200, request?: Request): Response {
  const origin = request?.headers.get('origin');
  const allowedOrigin = origin === 'https://journeyexpertltd.com' ? origin : 'https://journeyexpertltd.com';
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'access-control-allow-origin': allowedOrigin,
      'access-control-allow-headers': 'Content-Type, Authorization',
      'access-control-allow-methods': 'GET,POST,OPTIONS',
      'x-content-type-options': 'nosniff',
    },
  });
}

function jsonError(message: string, status: number, request?: Request, extra: Record<string, unknown> = {}): Response {
  return jsonResponse({ error: message, ...extra }, status, request);
}

function elevenLabsConfigured(env: Record<string, string | undefined>): boolean {
  return Boolean(env.ELEVENLABS_API_KEY && env.ELEVENLABS_VOICE_ID);
}

function handleVoiceStatus(request: Request, env: Record<string, string | undefined>): Response {
  return jsonResponse({
    provider: 'elevenlabs',
    configured: elevenLabsConfigured(env),
    fallback: 'browser-speech-synthesis',
    voiceId: env.ELEVENLABS_VOICE_ID ? 'configured' : 'not-configured',
  }, 200, request);
}

async function handleElevenLabs(request: Request, env: Record<string, string | undefined>): Promise<Response> {
  if (request.method !== 'POST') return jsonError('Method Not Allowed', 405, request, { allow: 'POST' });
  if (!elevenLabsConfigured(env)) {
    return jsonError('ElevenLabs is not configured; use browser speech fallback.', 503, request, {
      configured: false,
      fallback: 'browser-speech-synthesis',
    });
  }

  let payload: { text?: unknown; language?: unknown };
  try {
    payload = await request.json() as { text?: unknown; language?: unknown };
  } catch {
    return jsonError('Request body must be valid JSON.', 400, request);
  }

  const text = typeof payload.text === 'string' ? payload.text.trim().slice(0, 5000) : '';
  const language = payload.language === 'bn' ? 'bn' : 'en';
  if (!text) return jsonError('Text is required.', 400, request);

  const voiceId = env.ELEVENLABS_VOICE_ID as string;
  const modelId = env.ELEVENLABS_MODEL_ID || 'eleven_multilingual_v2';
  const outputFormat = env.ELEVENLABS_OUTPUT_FORMAT || 'mp3_44100_128';

  try {
    const upstream = await fetch(`${ELEVENLABS_API_BASE}/${encodeURIComponent(voiceId)}?output_format=${encodeURIComponent(outputFormat)}`, {
      method: 'POST',
      headers: {
        accept: 'audio/mpeg',
        'content-type': 'application/json',
        'xi-api-key': env.ELEVENLABS_API_KEY as string,
      },
      body: JSON.stringify({
        text,
        model_id: modelId,
        language_code: language,
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      }),
    });

    if (!upstream.ok) {
      return jsonError('ElevenLabs request failed; use browser speech fallback.', 502, request, {
        configured: true,
        fallback: 'browser-speech-synthesis',
      });
    }

    const headers = new Headers(upstream.headers);
    headers.set('cache-control', 'no-store');
    headers.set('x-content-type-options', 'nosniff');
    headers.set('access-control-allow-origin', 'https://journeyexpertltd.com');
    return new Response(upstream.body, { status: 200, headers });
  } catch {
    return jsonError('ElevenLabs service is unavailable; use browser speech fallback.', 502, request, {
      configured: true,
      fallback: 'browser-speech-synthesis',
    });
  }
}

export const onRequest = async (context: PagesContext): Promise<Response> => {
  const { request, env } = context;
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'access-control-allow-origin': 'https://journeyexpertltd.com',
        'access-control-allow-methods': 'GET,POST,OPTIONS',
        'access-control-allow-headers': 'content-type, authorization',
        'access-control-max-age': '86400',
      },
    });
  }

  const requestUrl = new URL(request.url);
  const pathname = requestUrl.pathname;

  if (pathname === '/api/voice/status') {
    if (request.method !== 'GET' && request.method !== 'HEAD') return jsonError('Method Not Allowed', 405, request, { allow: 'GET, HEAD' });
    return handleVoiceStatus(request, env);
  }
  if (pathname === '/api/voice/elevenlabs') return handleElevenLabs(request, env);

  if (PRIVATE_PATHS.has(pathname)) {
    return jsonError('Private tenant-scoped data service is not configured for public access.', 503, request, {
      status: 'not_configured',
      action: 'configure_authenticated_server_service',
    });
  }

  if (pathname === '/api/health' || pathname === '/api/healthz') {
    if (request.method !== 'GET' && request.method !== 'HEAD') return jsonError('Method Not Allowed', 405, request, { allow: 'GET, HEAD' });
    return healthResponse(request);
  }

  const origin = (env.AI_STUDIO_ORIGIN || DEFAULT_AI_STUDIO_ORIGIN).replace(/\/$/, '');
  const targetUrl = `${origin}${pathname}${requestUrl.search}`;
  const headers = new Headers(request.headers);
  headers.delete('host');
  headers.set('x-forwarded-host', requestUrl.host);
  headers.set('x-forwarded-proto', requestUrl.protocol.replace(':', ''));
  let body: ArrayBuffer | undefined;
  if (request.method !== 'GET' && request.method !== 'HEAD') body = await request.arrayBuffer();

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
    return jsonError('Upstream AI Studio service is unavailable.', 502, request);
  }
};
