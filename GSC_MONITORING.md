# Weekly Google Search Console monitoring

The repository runs a read-only Search Console and technical SEO monitor every Monday at 04:00 UTC through `.github/workflows/weekly-gsc-indexing.yml`. Manual dispatch is also available from the GitHub Actions interface.

The workflow audits every canonical sitemap URL for HTTP status, response type, robots metadata, canonical, title, H1 count, and internal links. When the owner-provided `GSC_SERVICE_ACCOUNT_JSON` secret is present, it also uses the read-only Search Console URL Inspection API for the controlled priority list in `seo/gsc-top-urls.txt`. It never requests indexing and never changes Search Console configuration.

Each run writes `seo-page-audit.json`, `gsc-indexing-status.json` when credentials are available, `gsc-credential-status.json`, `gsc-indexing-delta.json`, and `gsc-indexing-summary.md`. The workflow compares the current run with the prior branch-scoped Actions cache baseline. It raises critical alerts for technical audit failures, confirmed robots/indexing blocks, or inspection errors; high alerts for an indexed-to-excluded transition, canonical mismatch, or sitemap-count change; and medium alerts for a significant internal-link-count drop. High or critical deltas fail the comparison step and open or update one GitHub issue titled `[SEO Monitor] Search Console indexing alert`.

The first successful run after this monitor is enabled establishes the baseline. Later runs compare against the most recent cached baseline. A blocked credential state is reported without attempting an API call. The raw service-account JSON must remain only in the GitHub Actions secret `GSC_SERVICE_ACCOUNT_JSON` and must never be committed, printed, or attached.

## Protected promotion rule

The workflow file is production-sensitive under the repository’s Sync safety policy. Changes must be reviewed through a pull request into `main`, retain the review marker `[sync-review]` or `[approved-production-change]` in the relevant commit message, pass the Sync safety gate and build checks, and only then be promoted by the protected workflow to the `release` branch and Cloudflare Pages. Direct pushes to `release` are prohibited.
