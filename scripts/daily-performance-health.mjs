#!/usr/bin/env node
import { mkdir, writeFile } from 'node:fs/promises';
import { performance } from 'node:perf_hooks';

const baseUrl = (process.env.BASE_URL || 'https://journeyexpertltd.com').replace(/\/$/, '');
const outputPath = process.env.PERFORMANCE_OUTPUT || 'artifacts/daily-performance.json';
const sampleCount = Number(process.env.PERFORMANCE_SAMPLES || '5');
const warnMedianMs = Number(process.env.PERFORMANCE_WARN_MEDIAN_MS || '500');
const warnP95Ms = Number(process.env.PERFORMANCE_WARN_P95_MS || '1200');
const criticalMedianMs = Number(process.env.PERFORMANCE_CRITICAL_MEDIAN_MS || '2000');
const routes = ['/', '/visa'];

function percentile(values, p) {
  const sorted = [...values].sort((a, b) => a - b);
  if (!sorted.length) return null;
  return sorted[Math.min(sorted.length - 1, Math.ceil(p * sorted.length) - 1)];
}

async function measure(url) {
  const started = performance.now();
  try {
    const response = await fetch(url, { redirect: 'manual' });
    const headersAt = performance.now();
    const body = await response.arrayBuffer();
    const ended = performance.now();
    return {
      url,
      status: response.status,
      location: response.headers.get('location'),
      contentType: response.headers.get('content-type'),
      cacheStatus: response.headers.get('cf-cache-status'),
      cacheControl: response.headers.get('cache-control'),
      ttfbMs: Number((headersAt - started).toFixed(1)),
      totalMs: Number((ended - started).toFixed(1)),
      bytes: body.byteLength,
    };
  } catch (error) {
    return {
      url,
      status: null,
      location: null,
      contentType: null,
      cacheStatus: null,
      cacheControl: null,
      ttfbMs: null,
      totalMs: Number((performance.now() - started).toFixed(1)),
      bytes: 0,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

const results = {};
for (const route of routes) {
  const url = `${baseUrl}${route}`;
  const warmup = await measure(url);
  const samples = [];
  for (let i = 0; i < sampleCount; i += 1) samples.push(await measure(url));
  const valid = samples.filter((sample) => Number.isFinite(sample.ttfbMs));
  const ttfbs = valid.map((sample) => sample.ttfbMs);
  const medianMs = percentile(ttfbs, 0.5);
  const p95Ms = percentile(ttfbs, 0.95);
  const statuses = [...new Set(samples.map((sample) => sample.status))];
  const cacheStatuses = [...new Set(samples.map((sample) => sample.cacheStatus).filter(Boolean))];
  const failures = [];
  if (warmup.status !== 200) failures.push(`warmup HTTP ${warmup.status ?? 'network error'}`);
  if (samples.some((sample) => sample.status !== 200)) failures.push('one or more samples were not HTTP 200');
  if (samples.some((sample) => sample.location)) failures.push('canonical route redirected');
  if (medianMs === null) failures.push('no valid TTFB samples');
  else if (medianMs >= criticalMedianMs) failures.push(`critical median TTFB ${medianMs}ms`);
  else if (medianMs > warnMedianMs) failures.push(`median TTFB ${medianMs}ms above warning threshold`);
  if (p95Ms !== null && p95Ms > warnP95Ms) failures.push(`p95 TTFB ${p95Ms}ms above warning threshold`);

  results[route] = {
    url,
    warmup,
    samples,
    medianTtfbMs: medianMs,
    p95TtfbMs: p95Ms,
    statuses,
    cacheStatuses,
    failures,
  };
}

const allFailures = Object.values(results).flatMap((result) => result.failures.map((failure) => `${result.url}: ${failure}`));
const hasCritical = Object.values(results).some((result) => result.failures.some((failure) => failure.startsWith('critical') || failure.includes('HTTP') || failure.includes('network') || failure.includes('not HTTP')));
const output = {
  checkedAt: new Date().toISOString(),
  baseUrl,
  sampleCount,
  thresholds: { warnMedianMs, warnP95Ms, criticalMedianMs },
  status: hasCritical ? 'critical' : allFailures.length ? 'warning' : 'pass',
  results,
  failures: allFailures,
};
await mkdir(outputPath.split('/').slice(0, -1).join('/') || '.', { recursive: true });
await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`);
await writeFile(outputPath.replace(/\.json$/, '.md'), [
  '# Daily production performance health',
  '',
  `Checked: ${output.checkedAt}`,
  `Base URL: ${baseUrl}`,
  `Status: **${output.status.toUpperCase()}**`,
  '',
  '| Route | Median TTFB | p95 TTFB | HTTP statuses | Cache statuses |',
  '|---|---:|---:|---|---|',
  ...Object.entries(results).map(([route, result]) => `| ${route} | ${result.medianTtfbMs ?? 'n/a'} ms | ${result.p95TtfbMs ?? 'n/a'} ms | ${result.statuses.join(', ')} | ${result.cacheStatuses.join(', ') || 'none'} |`),
  '',
  allFailures.length ? '## Findings\n\n' + allFailures.map((failure) => `- ${failure}`).join('\n') : '## Findings\n\nNo performance failures detected.',
  '',
].join('\n'));
console.log(JSON.stringify(output, null, 2));
