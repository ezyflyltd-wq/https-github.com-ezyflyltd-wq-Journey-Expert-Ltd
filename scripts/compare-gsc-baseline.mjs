import { existsSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs';

const currentGscPath = process.env.GSC_OUTPUT || 'artifacts/gsc-indexing-status.json';
const currentSeoPath = process.env.SEO_OUTPUT || 'artifacts/seo-page-audit.json';
const baselineDir = process.env.BASELINE_DIR || '.monitor-baseline';
const baselineGscPath = `${baselineDir}/gsc-indexing-status.json`;
const baselineSeoPath = `${baselineDir}/seo-page-audit.json`;
const deltaPath = process.env.DELTA_OUTPUT || 'artifacts/gsc-indexing-delta.json';
const summaryPath = process.env.SUMMARY_OUTPUT || 'artifacts/gsc-indexing-summary.md';

function readJson(path) {
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, 'utf8'));
}

function normalizeUrl(url) {
  return String(url || '').replace(/\/$/, '');
}

function isIndexedCoverage(value) {
  return /indexed/i.test(String(value || '')) && !/not indexed/i.test(String(value || ''));
}

function countBy(results, predicate) {
  return results.filter(predicate).length;
}

function gscBucket(result) {
  const coverage = String(result.coverageState || '').toLowerCase();
  if (isIndexedCoverage(result.coverageState)) return 'indexed';
  if (coverage.includes('discovered') && coverage.includes('not indexed')) return 'discovered';
  if (coverage.includes('crawled') && coverage.includes('not indexed')) return 'crawledNotIndexed';
  if (result.error || coverage.includes('error') || coverage.includes('blocked')) return 'errors';
  return 'other';
}

function gscSummary(data) {
  const results = Array.isArray(data?.results) ? data.results : [];
  return {
    checkedAt: data?.checkedAt || null,
    siteUrl: data?.siteUrl || null,
    credentialStatus: results.length ? 'available' : 'blocked-or-empty',
    indexed: countBy(results, (item) => gscBucket(item) === 'indexed'),
    discovered: countBy(results, (item) => gscBucket(item) === 'discovered'),
    crawledNotIndexed: countBy(results, (item) => gscBucket(item) === 'crawledNotIndexed'),
    errors: countBy(results, (item) => gscBucket(item) === 'errors' || item.error),
    results,
  };
}

function seoSummary(data) {
  const results = Array.isArray(data?.results) ? data.results : [];
  return {
    checkedAt: data?.checkedAt || null,
    urlCount: Number(data?.urlCount || results.length || 0),
    technicalFailures: Number(data?.technicalFailures || 0),
    results,
  };
}

function resultMap(results) {
  return new Map(results.map((item) => [normalizeUrl(item.url), item]));
}

const currentGsc = gscSummary(readJson(currentGscPath));
const previousGscData = readJson(baselineGscPath);
const previousGsc = previousGscData ? gscSummary(previousGscData) : null;
const currentSeo = seoSummary(readJson(currentSeoPath));
const previousSeoData = readJson(baselineSeoPath);
const previousSeo = previousSeoData ? seoSummary(previousSeoData) : null;

const alerts = [];
if (currentSeo.technicalFailures > 0) {
  alerts.push({ severity: 'critical', code: 'technical-failures', message: `${currentSeo.technicalFailures} sitemap URL(s) failed the technical SEO contract.` });
}

const currentGscMap = resultMap(currentGsc.results);
const previousGscMap = resultMap(previousGsc?.results || []);
for (const [url, current] of currentGscMap) {
  if (current.error) {
    alerts.push({ severity: 'critical', code: 'inspection-error', url, message: current.error });
    continue;
  }
  const robotsAllowed = new Set(['ALLOWED', 'ROBOTS_TXT_STATE_UNSPECIFIED']);
  const indexingAllowed = new Set(['INDEXING_ALLOWED', 'INDEXING_STATE_UNSPECIFIED']);
  if (current.robotsTxtState && !robotsAllowed.has(current.robotsTxtState)) {
    alerts.push({ severity: 'critical', code: 'robots-blocked', url, message: `robotsTxtState=${current.robotsTxtState}` });
  }
  if (current.indexingState && !indexingAllowed.has(current.indexingState)) {
    alerts.push({ severity: 'critical', code: 'indexing-blocked', url, message: `indexingState=${current.indexingState}` });
  }
  if (current.userCanonical && current.googleCanonical && current.userCanonical !== current.googleCanonical) {
    alerts.push({ severity: 'high', code: 'canonical-mismatch', url, message: `user=${current.userCanonical}; google=${current.googleCanonical}` });
  }
  const previous = previousGscMap.get(url);
  if (previous && isIndexedCoverage(previous.coverageState) && !isIndexedCoverage(current.coverageState)) {
    alerts.push({ severity: 'high', code: 'indexed-to-excluded', url, message: `${previous.coverageState} -> ${current.coverageState || 'unknown'}` });
  }
}

if (previousSeo && currentSeo.urlCount !== previousSeo.urlCount) {
  alerts.push({ severity: 'high', code: 'sitemap-count-change', message: `${previousSeo.urlCount} -> ${currentSeo.urlCount} sitemap URLs.` });
}
if (previousSeo) {
  const previousSeoMap = resultMap(previousSeo.results);
  for (const [url, current] of resultMap(currentSeo.results)) {
    const previous = previousSeoMap.get(url);
    if (!previous || !Number.isFinite(previous.internalLinkCount) || !Number.isFinite(current.internalLinkCount)) continue;
    if (previous.internalLinkCount >= 5 && current.internalLinkCount < previous.internalLinkCount * 0.8) {
      alerts.push({ severity: 'medium', code: 'internal-link-drop', url, message: `${previous.internalLinkCount} -> ${current.internalLinkCount} internal links.` });
    }
  }
}

const severityRank = { critical: 3, high: 2, medium: 1, info: 0 };
const highestSeverity = alerts.reduce((highest, alert) => severityRank[alert.severity] > severityRank[highest] ? alert.severity : highest, 'info');
const alertLevel = alerts.length ? highestSeverity : 'none';
const baselineState = previousGsc ? 'compared' : 'initial-baseline';

const delta = {
  generatedAt: new Date().toISOString(),
  baselineState,
  alertLevel,
  alerts,
  current: {
    sitemap: { urlCount: currentSeo.urlCount, technicalFailures: currentSeo.technicalFailures },
    gsc: {
      credentialStatus: currentGsc.credentialStatus,
      indexed: currentGsc.indexed,
      discovered: currentGsc.discovered,
      crawledNotIndexed: currentGsc.crawledNotIndexed,
      errors: currentGsc.errors,
    },
  },
  previous: previousGsc || previousSeo ? {
    sitemap: previousSeo ? { urlCount: previousSeo.urlCount, technicalFailures: previousSeo.technicalFailures } : null,
    gsc: previousGsc ? {
      indexed: previousGsc.indexed,
      discovered: previousGsc.discovered,
      crawledNotIndexed: previousGsc.crawledNotIndexed,
      errors: previousGsc.errors,
    } : null,
  } : null,
};

mkdirSync('artifacts', { recursive: true });
writeFileSync(deltaPath, `${JSON.stringify(delta, null, 2)}\n`);

const alertRows = alerts.length
  ? alerts.map((alert) => `| ${alert.severity.toUpperCase()} | ${alert.code} | ${alert.url || ''} | ${alert.message.replaceAll('|', '\\|')} |`).join('\n')
  : '| NONE | No alert |  | No actionable delta detected. |';
const summary = `# Weekly Google Search Console and SEO monitor\n\n- Generated: ${delta.generatedAt}\n- Baseline: ${baselineState}\n- Alert level: **${alertLevel.toUpperCase()}**\n- Technical sitemap URLs: ${currentSeo.urlCount}\n- Technical failures: ${currentSeo.technicalFailures}\n- GSC credential/result state: ${currentGsc.credentialStatus}\n- GSC indexed: ${currentGsc.indexed}\n- GSC discovered – currently not indexed: ${currentGsc.discovered}\n- GSC crawled – currently not indexed: ${currentGsc.crawledNotIndexed}\n- GSC errors: ${currentGsc.errors}\n\n## Alerts\n\n| Severity | Code | URL | Message |\n|---|---|---|---|\n${alertRows}\n\nThis monitor is read-only with respect to Google Search Console. It does not request indexing or change Search Console settings.\n`;
writeFileSync(summaryPath, summary);

const githubOutput = process.env.GITHUB_OUTPUT;
if (githubOutput) writeFileSync(githubOutput, `alert=${alertLevel}\nalerts=${alerts.length}\n`, { flag: 'a' });

console.log(JSON.stringify(delta, null, 2));
if (alertLevel === 'critical' || alertLevel === 'high') process.exitCode = 1;
