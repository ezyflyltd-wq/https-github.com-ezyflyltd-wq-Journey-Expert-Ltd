# Audit notes

## AI Studio reference
The supplied Google AI Studio app is `Journey Expert Ltd.` and its preview renders the responsive Journey Expert landing page with the 3D globe experience. The page exposes Preview, Code, and Publish controls. The visible app description says the project uses React, TypeScript, Vite, Express, Firebase, Firestore, Firebase Authentication, Google Gemini SDK, and many simulated enterprise modules. No publish action has been executed.

## Repository baseline
The GitHub repository is public and its main branch contains a React/Vite frontend, a large Express `server.ts`, Firebase configuration, Firestore rules, and many architecture documents. `pnpm run lint` and `pnpm run build` pass locally after dependency build scripts are approved.

## Confirmed deployment blockers / risks
1. `server.ts` hardcodes `const PORT = 3000`; production hosting should use `process.env.PORT` with a numeric fallback.
2. The server serves `dist` in production and falls back to `dist/index.html`; this matches Vite output.
3. `/api/b2b/overview` returns hard-coded `jel_live_...` API distribution keys and the frontend renders them in `AgentPortal.tsx`.
4. `/api/customer/360-overview` returns a named customer record with email and phone; this must not be public demo output.
5. `/api/security/overview` returns concrete source IPs in simulated SOC alerts.
6. Many API responses are clearly mocked/demo data despite production-sounding claims; deployment should label or sanitize these responses rather than imply live integrations.
7. `firebase-applet-config.json` contains a client Firebase API key. This is normally a public client identifier, but Firestore rules and auth configuration remain the security boundary.
8. `firestore.rules` has a global deny default and scoped signed-in access rules; this is a strong baseline, but the admin email allowlist in rules should be reviewed before real production use.
9. `.env.example` documents `GEMINI_API_KEY` and `APP_URL`; `.env*` files are ignored except `.env.example`.

## Build evidence
- TypeScript type-check: PASS.
- Vite frontend build: PASS.
- Express bundle: PASS.
- Vite warns that the main JavaScript chunk is about 2.5 MB uncompressed, which is a performance optimization item rather than a build failure.

## Domain and authentication access findings
- The user confirmed the sole production domain must be `journeyexpertltd.com`; `journeyexpertbd.com` must not be used.
- Cloudflare previously exposed the `journeyexpertltd.com` zone and showed it as active on the Free plan with no Workers connected; the DNS section caused the session to return to login, so DNS records are not yet verified.
- Firebase Console is reachable under the Google account but currently blocks project settings behind a required Google MFA/2-Step Verification setup. Authorized-domain and provider settings have not yet been changed.
- No DNS record or publish action has been performed.
