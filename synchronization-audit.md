# Synchronization Audit Findings

Date: 19 August 2026

## Current source and deployment state

The GitHub repository `ezyflyltd-wq/https-github.com-ezyflyltd-wq-Journey-Expert-Ltd` is public, uses `main` as its default branch, has no branch protection, and has no GitHub Actions workflows. Cloudflare Pages is connected to this repository and deploys from `main`.

Google AI Studio is connected to the same repository and the same `main` branch. In the AI Studio GitHub tab, the application explicitly reports: **There are changes in both Google AI Studio and GitHub**. The UI exposes two manual operations: **Pull changes to Google AI Studio** and **Push changes to GitHub**. It does not expose an always-on bidirectional synchronization switch or an automatic conflict resolver.

The AI Studio action history shows an app-side responsive/3D layout edit and a checkpoint, while the GitHub branch contains the later production/SEO/Cloudflare commits. Because both sides report changes, neither a blind pull nor a blind push is safe: a blind pull may discard AI Studio edits, and a blind push may overwrite the production/deployment changes in GitHub.

## Required safe model

The durable model must use GitHub `main` as the canonical integration branch, with a protected backup/tag before any AI Studio push. AI Studio remains an approved editing surface, but its changes must be pushed through the AI Studio GitHub integration and then reviewed in GitHub before production deployment. GitHub changes must be pulled into AI Studio using the AI Studio Pull control after the GitHub branch is stable. Cloudflare remains an automatic deployment consumer of the reviewed GitHub branch.

A truly automatic, conflict-free two-way sync cannot be guaranteed by the visible AI Studio integration because the product exposes manual Pull and Push controls only. The implementation must therefore add branch protection, CI validation, an explicit sync runbook, backup/rollback references, and a no-blind-overwrite policy. Existing Firebase/Firestore runtime data is external to the Git tree and must not be changed by source synchronization.
