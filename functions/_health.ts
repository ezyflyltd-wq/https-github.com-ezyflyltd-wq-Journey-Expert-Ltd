const HEALTH_BODY = JSON.stringify({
  status: 'online',
  service: 'Journey Expert Ltd. (JEL) API Gateway',
  version: '2.5.0-enterprise',
});

export function healthResponse(request: Request): Response {
  const headers = new Headers({
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store, no-cache, must-revalidate',
    pragma: 'no-cache',
    'x-content-type-options': 'nosniff',
    'server-timing': 'health;dur=0',
  });

  return request.method === 'HEAD'
    ? new Response(null, { status: 200, headers })
    : new Response(HEALTH_BODY, { status: 200, headers });
}
