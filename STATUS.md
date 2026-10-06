# Journey Expert LTD — STATUS

Last updated: 2026-10-06
Phase: 1 Discovery complete; Phase 2 next

## DONE
- Confirmed production site: https://journeyexpertltd.com
- Confirmed Cloudflare Free Website zone active.
- Confirmed Cloudflare Pages project: journey-expert-ltd-main.
- Confirmed production branch: release.
- Confirmed production deployment success for Meta Business tracking hooks.
- Confirmed Angela voice/chat implementation exists in production code.
- Confirmed social footer integration and prefilled Business WhatsApp inquiry flow exist.
- Confirmed sitemap currently contains 25 URLs with stale 2026-08-19 lastmod values and internal/product-workspace style URLs.
- Confirmed robots.txt allows all and points to sitemap.
- Confirmed route metadata has explicit noindex for several internal workspaces, but sitemap still exposes other internal/product URLs.
- Confirmed default Open Graph image is logo.svg in RouteMetadata.
- Confirmed unknown routes receive noindex metadata in React, but HTTP-level 404 behavior is not yet proven.

## NEXT
Phase 2:
1. Create public Privacy, Terms, Refund/Cancellation, Cookie, About and Contact routes.
2. Implement real HTTP 404 handling for unknown routes.
3. Clean sitemap to indexable public routes only and update real lastmod.
4. Remove stale/fake changefreq usage.
5. Replace SVG social preview image with 1200x630 raster OG asset.
6. Remove meta keywords and tighten titles/descriptions.
7. Add/verify canonical, hreflang, schema and redirects.
8. Check security headers and secrets hygiene.

## BLOCKERS / UNVERIFIED
- JavaScript-on browser visual QA not available in this chat tool session.
- Search Console state not re-verified in this phase.
- Meta Pixel ID is not configured; tracking hooks are inert until owner supplies/configures the correct Pixel ID.
- Facebook/Instagram account-level automation requires owner Meta login/permissions.
- Legal wording requires owner/legal review.
- Licence/accreditation details must not be invented.

## OWNER TASKS
- Provide/verify legal entity fields and licence/accreditation numbers, or keep placeholders.
- Connect Facebook Page + Instagram Business account to the chosen social management tool/Meta Business Suite.
- Provide Meta Pixel ID when ready.
