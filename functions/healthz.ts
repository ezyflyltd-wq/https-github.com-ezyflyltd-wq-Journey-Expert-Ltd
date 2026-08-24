import { healthResponse } from './_health';

export const onRequest = async ({ request }: { request: Request }): Promise<Response> => {
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
};
