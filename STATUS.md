# Journey Expert LTD — STATUS

Last updated: 2026-10-06
Phase: 2 trust/indexing/security pass substantially complete

## DONE
- Production domain confirmed: https://journeyexpertltd.com and www alias.
- Cloudflare Free Website + Pages production branch release confirmed.
- Angela voice/chat production implementation retained.
- Meta Pixel ID 1294635368719190 configured in production and preview.
- Meta PageView / WhatsApp Contact / social outbound tracking hooks implemented.
- Meta tracking now requires explicit analytics consent.
- Cookie consent banner added with Accept/Decline choices and Cookie Policy link.
- Gemini API key migrated from plain_text to Cloudflare secret_text in production and preview.
- Owner-confirmed Trade / Travel Agency / Civil Aviation Licence No. 102 published.
- Office address retained as owner-confirmed.
- Facebook/Instagram/YouTube/WhatsApp website links retained; Instagram journeyexpertltd verified publicly.
- Privacy, Terms, Refund/Cancellation and Cookie Policy pages created.
- Legal links added to footer.
- Sitemap cleaned to public customer-facing routes only; stale changefreq removed; lastmod updated to 2026-10-06.
- Obsolete meta keywords removed from route metadata.
- HSTS, nosniff, frame protection, referrer policy, microphone self-only Permissions-Policy and CSP Report-Only added/updated.
- Unsupported public claims about direct GDS connections, lowest-fare guarantees, scholarship/rebooking guarantees and unverified payment integrations reduced/sanitized.
- Build regression from CookieConsent JSX was found from Cloudflare logs, corrected, and production build returned to SUCCESS.

## NEXT
- Replace SVG/default social preview artwork with a dedicated 1200x630 raster OG asset.
- Finish HTTP-level 404 strategy without breaking valid SPA routes.
- Continue deeper content quality pass across remaining service/product views and remove mock/demo claims from public routes.
- Run browser/device QA for Angela, forms, cookie consent and responsive layout.
- Verify Meta Events Manager receives consented PageView and Contact events.
- Search Console/Bing/indexing checks.
- Security/dependency/secret-history audit and CI hardening.

## OWNER MUST DO
- Have Privacy/Terms/Refund/Cookie wording reviewed by qualified Bangladeshi legal counsel.
- Do not paste passwords, OTPs or API secrets into chat.
- Meta/Instagram account-level permissions remain owner-controlled.

## RISKS / BLOCKERS
- Full browser/device matrix not yet proven.
- HTTP 404 change is deliberately not merged until preview behavior is fully proven.
- Some deeper enterprise/demo screens may still contain mock metrics or roadmap features and require continued cleanup.
