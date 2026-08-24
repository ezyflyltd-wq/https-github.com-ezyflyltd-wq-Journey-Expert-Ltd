import { mkdir, writeFile } from 'node:fs/promises';

const siteUrl = (process.env.SEO_SITE_URL || 'https://journeyexpertltd.com').replace(/\/$/, '');
const sitemapUrl = `${siteUrl}/sitemap.xml`;
const outputPath = process.env.SEO_AUDIT_OUTPUT || 'artifacts/seo-page-audit.json';
const concurrency = Math.max(1, Number(process.env.SEO_AUDIT_CONCURRENCY || 4));

function absoluteUrl(value) {
  return new URL(value, siteUrl).toString();
}

function extractFirst(html, expression) {
  return html.match(expression)?.[1]?.trim() || null;
}

function extractAttribute(html, expression) {
  return html.match(expression)?.[1]?.trim() || null;
}

function unique(values) {
  return [...new Set(values)];
}

async function fetchText(url) {
  const started = performance.now();
  const response = await fetch(url, {
    headers: { accept: 'text/html,application/xml,text/plain;q=0.9,*/*;q=0.1' },
    redirect: 'manual',
  });
  const body = await response.text();
  return {
    url,
    status: response.status,
    contentType: response.headers.get('content-type') || '',
    location: response.headers.get('location'),
    elapsedMs: Number((performance.now() - started).toFixed(1)),
    body,
  };
}

const sitemapResponse = await fetchText(sitemapUrl);
if (sitemapResponse.status !== 200) {
  throw new Error(`Sitemap returned HTTP ${sitemapResponse.status}: ${sitemapUrl}`);
}

const urls = unique([...sitemapResponse.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim()));
if (urls.length === 0) throw new Error('Sitemap contained no <loc> URLs');

const results = [];
let cursor = 0;
async function worker() {
  while (cursor < urls.length) {
    const index = cursor++;
    const url = urls[index];
    try {
      const response = await fetchText(url);
      const robots = extractAttribute(response.body, /<meta\s+name=["']robots["']\s+content=["']([^"']+)["'][^>]*>/i);
      const canonical = extractAttribute(response.body, /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["'][^>]*>/i);
      const title = extractFirst(response.body, /<title>([^<]*)<\/title>/i);
      const h1Count = [...response.body.matchAll(/<h1(?:\s[^>]*)?>/gi)].length;
      const internalLinks = unique([...response.body.matchAll(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi)]
        .map((match) => match[1])
        .filter((href) => href.startsWith('/') && !href.startsWith('//')));
      const normalizedCanonical = canonical ? absoluteUrl(canonical).replace(/\/$/, '') : null;
      const normalizedUrl = absoluteUrl(url).replace(/\/$/, '');
      const indexable = response.status === 200 &&
        response.contentType.includes('text/html') &&
        (!robots || !/noindex/i.test(robots)) &&
        Boolean(title) &&
        h1Count === 1 &&
        normalizedCanonical === normalizedUrl;
      results[index] = {
        url,
        status: response.status,
        contentType: response.contentType,
        location: response.location,
        elapsedMs: response.elapsedMs,
        robots,
        canonical,
        title,
        h1Count,
        internalLinkCount: internalLinks.length,
        internalLinks,
        indexable,
        issues: [
          ...(response.status !== 200 ? [`HTTP ${response.status}`] : []),
          ...(response.contentType && !response.contentType.includes('text/html') ? ['not HTML'] : []),
          ...(!robots || !/noindex/i.test(robots) ? [] : ['noindex']),
          ...(!title ? ['missing title'] : []),
          ...(h1Count !== 1 ? [`expected 1 H1, found ${h1Count}`] : []),
          ...(normalizedCanonical !== normalizedUrl ? ['canonical mismatch or missing'] : []),
          ...(internalLinks.length === 0 ? ['no internal links'] : []),
        ],
      };
    } catch (error) {
      results[index] = {
        url,
        status: null,
        contentType: null,
        location: null,
        elapsedMs: null,
        robots: null,
        canonical: null,
        title: null,
        h1Count: 0,
        internalLinkCount: 0,
        internalLinks: [],
        indexable: false,
        issues: [error instanceof Error ? error.message : String(error)],
      };
    }
  }
}

await Promise.all(Array.from({ length: Math.min(concurrency, urls.length) }, worker));
const summary = {
  checkedAt: new Date().toISOString(),
  siteUrl,
  sitemapUrl,
  sitemapStatus: sitemapResponse.status,
  sitemapContentType: sitemapResponse.contentType,
  urlCount: results.length,
  indexableTechnicalChecks: results.filter((result) => result.indexable).length,
  technicalFailures: results.filter((result) => !result.indexable).length,
  results,
};
await mkdir(outputPath.split('/').slice(0, -1).join('/') || '.', { recursive: true });
await writeFile(outputPath, JSON.stringify(summary, null, 2) + '\n', 'utf8');
console.log(JSON.stringify({ ...summary, results: results.map(({ internalLinks, ...result }) => result) }, null, 2));
if (summary.technicalFailures > 0 && process.env.SEO_AUDIT_STRICT === '1') process.exitCode = 1;
