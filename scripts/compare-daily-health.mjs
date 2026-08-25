#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const performancePath = process.env.PERFORMANCE_OUTPUT || 'artifacts/daily-performance.json';
const seoPath = process.env.SEO_OUTPUT || 'artifacts/seo-page-audit.json';
const baselineDir = process.env.BASELINE_DIR || '.monitor-baseline';
const summaryPath = process.env.SUMMARY_OUTPUT || 'artifacts/daily-health-summary.md';
const outputPath = process.env.OUTPUT_PATH || 'artifacts/daily-health-delta.json';

const current = JSON.parse(readFileSync(performancePath, 'utf8'));
const seo = existsSync(seoPath) ? JSON.parse(readFileSync(seoPath, 'utf8')) : null;
const previousPath = `${baselineDir}/daily-performance.json`;
const previous = existsSync(previousPath) ? JSON.parse(readFileSync(previousPath, 'utf8')) : null;
const findings = [];
let alert = 'none';

function raise(level, message) {
  findings.push(message);
  if (level === 'critical' || (level === 'warning' && alert === 'none')) alert = level;
}

for (const [route, result] of Object.entries(current.results)) {
  if (result.failures.some((failure) => failure.includes('HTTP') || failure.includes('network') || failure.includes('valid TTFB'))) {
    raise('critical', `${route}: availability failure — ${result.failures.join('; ')}`);
  }
  if (result.medianTtfbMs !== null && result.medianTtfbMs > current.thresholds.criticalMedianMs) {
    raise('critical', `${route}: median TTFB ${result.medianTtfbMs} ms exceeds ${current.thresholds.criticalMedianMs} ms`);
  } else if (result.medianTtfbMs !== null && result.medianTtfbMs > current.thresholds.warnMedianMs) {
    raise('warning', `${route}: median TTFB ${result.medianTtfbMs} ms exceeds ${current.thresholds.warnMedianMs} ms`);
  }
  if (result.p95TtfbMs !== null && result.p95TtfbMs > current.thresholds.warnP95Ms) {
    raise('warning', `${route}: p95 TTFB ${result.p95TtfbMs} ms exceeds ${current.thresholds.warnP95Ms} ms`);
  }

  const previousResult = previous?.results?.[route];
  if (previousResult) {
    const old = previousResult.cacheStatuses.join(',') || 'none';
    const now = result.cacheStatuses.join(',') || 'none';
    if (old !== now) raise('warning', `${route}: cache status changed from ${old} to ${now}`);
    if (Number.isFinite(previousResult.medianTtfbMs) && Number.isFinite(result.medianTtfbMs)) {
      const delta = ((result.medianTtfbMs - previousResult.medianTtfbMs) / Math.max(previousResult.medianTtfbMs, 1)) * 100;
      if (delta >= 25) raise('warning', `${route}: median TTFB increased ${delta.toFixed(1)}% versus previous baseline`);
    }
  }
}

if (!seo) {
  raise('warning', 'SEO audit output was not produced');
} else {
  if (seo.sitemapStatus !== 200) raise('critical', `sitemap status is ${seo.sitemapStatus}`);
  if (seo.technicalFailures > 0) raise('warning', `${seo.technicalFailures}/${seo.urlCount} technical SEO checks failed`);
}

const delta = {
  checkedAt: current.checkedAt,
  alert,
  findings,
  current,
  previous: previous ? { checkedAt: previous.checkedAt, results: previous.results } : null,
  seo: seo ? {
    sitemapStatus: seo.sitemapStatus,
    urlCount: seo.urlCount,
    technicalFailures: seo.technicalFailures,
  } : null,
};

mkdirSync(summaryPath.split('/').slice(0, -1).join('/') || '.', { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(delta, null, 2)}\n`);
const summary = [
  '# Daily performance and SEO health',
  '',
  `Checked: ${current.checkedAt}`,
  `Alert: **${alert.toUpperCase()}**`,
  '',
  '| Route | Median TTFB | p95 TTFB | Cache status |',
  '|---|---:|---:|---|',
  ...Object.entries(current.results).map(([route, result]) => `| ${route} | ${result.medianTtfbMs ?? 'n/a'} ms | ${result.p95TtfbMs ?? 'n/a'} ms | ${result.cacheStatuses.join(', ') || 'none'} |`),
  '',
  seo ? `SEO: ${seo.technicalFailures}/${seo.urlCount} technical failures; sitemap HTTP ${seo.sitemapStatus}` : 'SEO: audit output unavailable',
  '',
  findings.length ? '## Findings\n\n' + findings.map((item) => `- ${item}`).join('\n') : '## Findings\n\nNo alert conditions detected.',
  '',
].join('\n');
writeFileSync(summaryPath, `${summary}\n`);
console.log(summary);
const output = process.env.GITHUB_OUTPUT;
if (output) writeFileSync(output, `alert=${alert}\nfindings=${findings.length}\n`, { flag: 'a' });
