import { execFileSync } from "node:child_process";
import { appendFileSync, writeFileSync } from "node:fs";

const event = process.env.GITHUB_EVENT_NAME ?? "local";
const baseSha = process.env.GITHUB_BASE_SHA;
const beforeSha = process.env.GITHUB_BEFORE;
const headSha = process.env.GITHUB_SHA || "HEAD";

function git(args) {
  return execFileSync("git", args, { encoding: "utf8" }).trim();
}

function changedEntries() {
  let range;
  if (event === "pull_request" && baseSha) range = `${baseSha}...${headSha}`;
  else if (event === "push" && beforeSha && !/^0+$/.test(beforeSha)) range = `${beforeSha}..${headSha}`;
  else range = "HEAD^..HEAD";

  const raw = git(["diff", "--name-status", "-M", range]);
  if (!raw) return [];
  return raw.split("\n").filter(Boolean).map((line) => {
    const [status, ...paths] = line.split("\t");
    return { status, path: paths.at(-1) };
  });
}

const entries = changedEntries();
const files = entries.map((entry) => entry.path);
const deleted = entries.filter((entry) => entry.status.startsWith("D"));
const checkpointArtifacts = new Set([
  "audit-notes.md",
  "public/robots.txt",
  "public/sitemap.xml",
  "public/site.webmanifest",
]);
const sensitivePatterns = [
  /^\.env(?:\.|$)/,
  /(^|\/)firebase-applet-config\.json$/,
  /(^|\/)firebase-blueprint\.json$/,
  /(^|\/)firestore\.rules$/,
  /(^|\/)functions\//,
  /(^|\/)src\/firebase\//,
  /(^|\/)server\.ts$/,
  /(^|\/)package\.json$/,
  /(^|\/)pnpm-lock\.yaml$/,
  /(^|\/)\.github\/workflows\//,
];
const sensitive = files.filter((file) => sensitivePatterns.some((pattern) => pattern.test(file)));
const checkpoint = files.filter((file) => checkpointArtifacts.has(file));
const commitMessages = (process.env.GITHUB_COMMIT_MESSAGE ?? "") + " " + (process.env.GITHUB_HEAD_COMMIT_MESSAGE ?? "");
const approvedMarker = /\[(?:sync-review|approved-production-change)\]/i.test(commitMessages);

const failures = [];
if (deleted.length) failures.push(`Deleted files are blocked: ${deleted.map((entry) => entry.path).join(", ")}`);
if (checkpoint.length && !approvedMarker) {
  failures.push(`AI Studio checkpoint/SEO files require explicit review marker [sync-review] or [approved-production-change]: ${checkpoint.join(", ")}`);
}
if (sensitive.length && !approvedMarker) {
  failures.push(`Production-sensitive files require explicit review marker [sync-review] or [approved-production-change]: ${sensitive.join(", ")}`);
}

const report = [
  "# Automated Sync Guard",
  "",
  `- Event: ${event}`,
  `- Commit: ${headSha}`,
  `- Changed files: ${files.length ? files.join(", ") : "none"}`,
  `- Deleted files: ${deleted.length ? deleted.map((entry) => entry.path).join(", ") : "none"}`,
  `- AI Studio checkpoint/SEO files: ${checkpoint.length ? checkpoint.join(", ") : "none"}`,
  `- Production-sensitive files: ${sensitive.length ? sensitive.join(", ") : "none"}`,
  `- Explicit review marker: ${approvedMarker ? "present" : "absent"}`,
  "",
  failures.length ? "## Decision: BLOCKED" : "## Decision: ALLOWED",
  "",
  ...(failures.length ? failures.map((failure) => `- ${failure}`) : ["No automated safety rule was violated."]),
  "",
  "This guard never writes Firebase/Firestore data and never approves a production-sensitive change by itself.",
  "",
].join("\n");

writeFileSync("sync-guard-report.md", report);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, report);
console.log(report);
if (failures.length) process.exit(1);
