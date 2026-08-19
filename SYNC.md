# Journey Expert Ltd. Source Synchronization Runbook

**Status:** Active  
**Canonical repository:** [Journey Expert Ltd. GitHub repository](https://github.com/ezyflyltd-wq/https-github.com-ezyflyltd-wq-Journey-Expert-Ltd)  
**Connected app:** [Google AI Studio Journey Expert Ltd.](https://aistudio.google.com/apps/550a58ac-363d-43b2-814a-e67baa0ac380?showPreview=true&showAssistant=true&project=gen-lang-client-0385966464)  
**Production site:** [https://journeyexpertltd.com/](https://journeyexpertltd.com/)

## 1. What is synchronized

Google AI Studio and GitHub are now connected to the same repository and the same `main` branch. The AI Studio GitHub panel has confirmed that the two sources are currently in sync after a successful Pull followed by Push operation.

The synchronized boundary is the **source tree**: React/TypeScript code, server code, configuration templates, Pages Functions, SEO assets, and documentation. Cloudflare Pages consumes the reviewed GitHub `main` branch and publishes the website. The AI Studio runtime remains the upstream service used by the Pages Functions API proxy.

The following are deliberately outside the source-sync boundary and must not be overwritten by a code pull or push:

| Data or secret | Owner of truth | Why it is protected |
|---|---|---|
| Firebase Authentication users and sessions | Firebase project | Runtime identity data is not stored in Git |
| Firestore documents and security-rule-protected records | Firestore | Application data must survive source changes |
| Cloudflare environment variables and secrets | Cloudflare Pages settings | Secrets must not be committed to the repository |
| AI Studio project configuration, model quota, and app history | Google AI Studio | Platform metadata is not application source data |
| Search Console property and DNS verification | Google Search Console/Cloudflare DNS | Verification is infrastructure state, not source code |
| Rollback refs | GitHub tags and backup branches | Recovery points are immutable references |

## 2. Source-of-truth model

GitHub `main` is the canonical integration and deployment branch. AI Studio is an approved editing surface connected to that branch. Cloudflare Pages is a deployment consumer, not a second source repository.

AI Studio’s visible integration provides **manual Pull and Push controls**, not an always-on conflict-free bidirectional replication service. Therefore, “change anywhere and everything changes” is implemented as a controlled workflow rather than blind simultaneous editing. A change made in AI Studio must be pulled into the shared state and pushed to GitHub; a change made in GitHub must be checked in AI Studio and pulled before further AI Studio editing. Cloudflare then deploys the reviewed `main` branch.

## 3. Safe change procedure

### Change made in Google AI Studio

First stop any other editor and open the AI Studio GitHub panel. If the panel reports changes on both sides, do not push immediately. Create or confirm a GitHub backup ref, then select **Pull changes to Google AI Studio**. After the pull completes, review the AI Studio file list and build result. Select **Push changes to GitHub** only after the source tree is coherent. GitHub CI must pass before the change is treated as deployable.

### Change made in GitHub

Commit the change to a pull request or the protected `main` workflow. After CI passes and the change is merged, open AI Studio’s GitHub panel and select **Pull changes to Google AI Studio**. Confirm that AI Studio reports the sources are in sync before editing there again.

### Change made in the local clone

Use a feature branch, run `pnpm run lint` and `pnpm run build:pages`, open a pull request, and merge only after CI passes. Never force-push `main`. After merge, use the AI Studio Pull control before making additional AI Studio edits.

## 4. Conflict policy

A status such as **There are changes in both Google AI Studio and GitHub** means the sources have diverged. It is not a success state. Do not use a blind overwrite. The safe sequence is:

1. Preserve the current GitHub `main` state with an annotated tag and backup branch.
2. Pull GitHub into AI Studio so the AI Studio snapshot includes the latest production changes.
3. Inspect the resulting file list, AI Studio build result, and any conflict message.
4. Push only when AI Studio reports the merged state is ready and the resulting source has been reviewed.
5. Run repository CI and verify the live deployment.
6. If the result is wrong, revert `main` to the backup ref through a reviewed revert or rollback pull request; do not delete Firebase/Firestore data.

The backup created during this synchronization is:

```text
Tag:    pre-sync-20260819-101355
Branch: backup/pre-sync-20260819-101355
Commit: 7e4d1127f2b3f877e79b9eb266cd088332eba6da
```

## 5. Deployment gates

Every source change must pass the repository workflow in `.github/workflows/production-guard.yml`. The guard installs dependencies, runs the TypeScript compiler, builds the Cloudflare Pages output, and checks that `robots.txt`, `sitemap.xml`, `_headers`, `_redirects`, and the Pages Functions proxy are present.

Cloudflare Pages is allowed to deploy only the validated `main` branch. Production variables, including `AI_STUDIO_ORIGIN`, remain in Cloudflare and are not copied into GitHub. A successful source sync does not by itself prove that an upstream AI model, GDS provider, hotel provider, payment gateway, or database is available; those are separate runtime checks.

## 6. Data-preservation rules

Source synchronization must never run database migrations, delete Firestore collections, overwrite user records, reset Firebase Authentication, rotate Cloudflare secrets, or alter DNS. Any future schema migration must be a separately reviewed, backward-compatible operation with a backup and a rollback plan.

Mock or simulated data must not be silently promoted to live transactional data. Before enabling a booking, payment, wallet, visa-document, or commission flow, the appropriate server-side provider, database transaction, authorization, audit log, and webhook verification must exist.

## 7. Post-change verification

After a successful push, verify all of the following:

| Check | Expected result |
|---|---|
| AI Studio GitHub panel | GitHub and Google AI Studio are currently in sync |
| GitHub `main` | New commit exists; no unintended files changed |
| CI | Type-check and Pages build succeed |
| Cloudflare Pages | Deployment for the new commit is successful |
| Apex website | `https://journeyexpertltd.com/` returns the new build |
| API proxy | `/api/health` returns JSON through the canonical origin |
| SEO | `/robots.txt` and `/sitemap.xml` return HTTP 200 |
| Runtime data | Firebase/Firestore records and user access remain intact |
| Rollback | Backup tag/branch remains available until post-release verification completes |

## 8. What “one place changes everything” means in practice

A single approved change can now propagate through the full path: AI Studio or GitHub source edit → synchronized GitHub `main` → CI guard → Cloudflare Pages deployment → `journeyexpertltd.com`. The workflow intentionally requires a Pull/Push action when the edit originates in AI Studio because the current AI Studio integration does not offer background bidirectional replication.

This design is safer than allowing concurrent, invisible writes. It prevents a later AI Studio snapshot from silently removing Cloudflare Functions, SEO files, environment documentation, or security configuration and protects runtime data by keeping it outside the source-tree synchronization boundary.

## References

[1]: https://aistudio.google.com/apps/550a58ac-363d-43b2-814a-e67baa0ac380?showPreview=true&showAssistant=true&project=gen-lang-client-0385966464 "Google AI Studio Journey Expert Ltd. app"

[2]: https://github.com/ezyflyltd-wq/https-github.com-ezyflyltd-wq-Journey-Expert-Ltd "Journey Expert Ltd. GitHub repository"

[3]: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches "GitHub protected branches documentation"

[4]: https://developers.cloudflare.com/pages/configuration/git-integration/ "Cloudflare Pages Git integration documentation"

## 9. Latest verified release

The synchronization guard was added in commit `439b66c67a3d3ff1e28276d2ba8c944cd9e39330`. Its GitHub Actions run completed with `success`. The protected `main` branch has administrator enforcement enabled, force-push disabled, and deletion disabled. The AI Studio panel subsequently reported that GitHub and Google AI Studio are currently in sync.

Post-release probes returned HTTP 200 for the apex site, `www` site, `/api/health`, `/robots.txt`, and `/sitemap.xml`. The pre-sync rollback tag and backup branch remain available.
