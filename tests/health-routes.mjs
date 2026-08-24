const base = (process.env.BASE_URL || 'https://journeyexpertltd.com').replace(/\/$/, '');
const endpoints = ['/api/health', '/api/healthz', '/healthz'];
const results = [];

for (const path of endpoints) {
  const started = performance.now();
  try {
    const response = await fetch(`${base}${path}`, {
      headers: { accept: 'application/json' },
    });
    const elapsedMs = performance.now() - started;
    const type = response.headers.get('content-type') || '';
    const cacheControl = response.headers.get('cache-control') || '';
    const body = await response.text();
    let payload = null;
    let jsonError = null;

    try {
      payload = JSON.parse(body);
    } catch (error) {
      jsonError = error instanceof Error ? error.message : String(error);
    }

    const passed =
      response.status === 200 &&
      type.includes('application/json') &&
      payload?.status === 'online' &&
      cacheControl.includes('no-store');

    const result = {
      base,
      path,
      status: response.status,
      contentType: type,
      cacheControl,
      statusValue: payload?.status ?? null,
      jsonError,
      elapsedMs: Number(elapsedMs.toFixed(1)),
      passed,
    };
    results.push(result);
    console.log(JSON.stringify(result));
  } catch (error) {
    const result = {
      base,
      path,
      status: null,
      contentType: null,
      cacheControl: null,
      statusValue: null,
      jsonError: error instanceof Error ? error.message : String(error),
      elapsedMs: Number((performance.now() - started).toFixed(1)),
      passed: false,
    };
    results.push(result);
    console.log(JSON.stringify(result));
  }
}

const failed = results.filter((result) => !result.passed);
if (failed.length > 0) {
  console.error(`FAIL: ${failed.length}/${results.length} health endpoints failed the JSON health contract`);
  process.exitCode = 1;
} else {
  console.log(`PASS: ${results.length} health endpoints returned JSON online responses`);
}
