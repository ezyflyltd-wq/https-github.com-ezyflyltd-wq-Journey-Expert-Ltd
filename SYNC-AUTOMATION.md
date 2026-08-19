# Automated AI Studio/GitHub Safety Workflow

## What is automated

Every pull request or push to GitHub `main` now runs an automated safety gate before the production type-check and Cloudflare Pages build. The gate detects deleted files, AI Studio checkpoint/SEO artifacts, environment/configuration changes, Firebase and Firestore rule changes, server/runtime changes, dependency changes, workflow changes, and other production-sensitive changes.

A change is blocked automatically when it contains a deleted file, or when it changes a protected file class without an explicit review marker in the commit or pull-request title. The accepted review markers are `[sync-review]` and `[approved-production-change]`.

## What this protects

The gate never writes to Firebase or Firestore and never modifies customer, booking, wallet, payment, finance, authentication, or other runtime data. It protects the repository and deployment path only. The protected `main` branch is the review/source branch. After the guard and validation jobs pass, the workflow promotes the exact validated commit to `release`; Cloudflare Pages production deploys only from `release`.

## Routine AI Studio change

1. In AI Studio, make the intended change and wait for the checkpoint/build result.
2. Before pushing, open the GitHub panel and run **Pull changes to Google AI Studio** if the panel reports changes on both sides.
3. Review the changed-file list. If the list contains an unexpected file, a deletion, `audit-notes.md`, SEO assets, secrets, Firebase/Firestore rules, server files, package files, or workflow files, do not push. Restore/cancel the AI Studio checkpoint and investigate.
4. If the changed files are expected, use **Push changes to GitHub**. Do not push a failed or canceled checkpoint.
5. GitHub Actions runs **Sync safety gate** first. It then runs type-check, the Pages build, and required asset checks.
6. The successful workflow promotes the approved `main` result to `release`, and Cloudflare Pages deploys only from `release`. Verify `https://journeyexpertltd.com/`, `/api/health`, `/robots.txt`, and `/sitemap.xml`.

## Release promotion path

The live Cloudflare Pages project is configured to use the `release` branch for Production. Direct changes to `main` are protected by the required **Sync safety gate** and **Type-check and Pages build** checks. Only the workflow's `promote` job, which runs after both checks succeed on a push to `main`, updates `release`. A failed AI Studio checkpoint therefore cannot reach the live site merely by appearing in GitHub.

## Protected-change review

For a legitimate protected change, create a pull request and put `[sync-review]` in the pull-request title or commit message. The review must explain why each protected file changed and must include build/test evidence. The marker bypasses only the automated block; it does not bypass CI, branch protection, or human review.

## Failed AI Studio checkpoint

Never push a checkpoint that says canceled, failed, unexpected error, or internal error. Use AI Studio Restore/Cancel or pull the known-good GitHub source, then review the changed-file list again. If the source remains divergent, leave it unpushed and use the rollback procedure in `SYNC-TEST-AND-ROLLBACK-GUIDE.md`.

## Important platform boundary

Google's published AI Studio documentation describes GitHub import/export and saving code changes, but does not document a public webhook or background API that can safely press AI Studio's Pull or Push controls. Therefore AI Studio's final Pull/Push action remains an explicit human approval step. The repository safety gate, CI, branch protection, and Cloudflare release verification are automated.
