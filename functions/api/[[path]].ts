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
