# Journey Expert Ltd. Audit Findings

Date: 2026-09-01

## Verified public state

- Live production domain: https://journeyexpertltd.com/ loads a premium React/Vite-style travel and global mobility site.
- Live homepage exposes Home, Flights, Hotels, Visa, Study Abroad, Portals, Start Your Journey, Ask JEL AI, sign-in, flight search, and a free Angela voice assistant entry point.
- Live page title observed: `Journey Expert Ltd. | AI Travel, Visa & Global Mobility`.
- AI Studio URL https://journey-expert-ltd.ai.studio/ was publicly reachable but remained on `Loading Journey Expert…` during the browser check; runtime completion was not verified.
- GitHub repository is public, has one `main` branch, 71 commits, and latest visible commit `a391bca` from Aug 30, 2026, titled `[approved-production-change] Make Angela conversational and context-aware`.
- Browser session was not authenticated to GitHub (page showed Sign in / Sign up), so no remote mutation was performed.

## Prior Codex findings supplied by the user

- The previous audit reported that Angela fell back to generic contact guidance because the production AI request failed.
- The reported backend failure was `generateWithGemini` in the Cloudflare Worker, with an unreliable model identifier `gemini-3.6-flash` and a production secret/configuration mismatch.
- The prior audit reported that the live Worker, AI Studio app, and GitHub code were not synchronized.
- Search Console had `journeyexpertbd.com` but not `journeyexpertltd.com`.

## Repository observations

- Repository contains React/Vite frontend, Express backend, Firebase integration, server/angelaBrain.ts, public static SEO route documents, tests, and GitHub workflows.
- `server.ts` initializes `GoogleGenAI` only when `GEMINI_API_KEY` exists; otherwise it returns a fallback Angela response.
- `server.ts` currently calls Gemini with model string `gemini-3.6-flash` and JSON response mode.
- Angela supports text and browser speech recognition/TTS in the frontend, with fallback handling.
- Existing workflows include Angela validation, production guard, daily performance/SEO monitoring, and weekly Search Console indexing checks.
- `.env.example` is present; no local status changes were observed after cloning.
- Dependency installation passed the lockfile supply-chain policy but was blocked from running package build scripts by pnpm's ignored-build policy; full build/test baseline is therefore pending local dependency approval or a clean CI environment.

## Immediate blockers

1. No verified authenticated GitHub write session.
2. No verified Cloudflare dashboard/API write session.
3. No verified Google AI Studio/Gemini project write access.
4. No verified Google Search Console owner access.
5. The user's Bengali request mentions `janiExpert.mp3.com`, while the supplied master instruction and existing production system use `journeyexpertltd.com`; the intended canonical domain must be confirmed before any DNS or production switch.

## Safety status

No destructive change, DNS change, production deployment, Search Console change, or remote repository mutation has been performed during this audit.
