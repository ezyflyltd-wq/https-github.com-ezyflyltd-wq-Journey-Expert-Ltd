import { build } from 'esbuild';
import { readFile, writeFile } from 'node:fs/promises';
const start = '// BEGIN GENERATED META WEBHOOK\n';
const end = '// END GENERATED META WEBHOOK\n';
const bundle = await build({ entryPoints: ['functions/angela/meta-webhook.ts'], bundle: true, write: false, format: 'iife', globalName: 'JELMetaWebhook', platform: 'browser', target: 'es2022', minify: true });
const filename = 'public/_worker.js';
let worker = await readFile(filename, 'utf8');
const from = worker.indexOf(start);
if (from >= 0) {
  const to = worker.indexOf(end, from);
  if (to < 0) throw new Error('Missing generated webhook end marker');
  worker = worker.slice(0, from) + worker.slice(to + end.length);
}
await writeFile(filename, start + bundle.outputFiles[0].text + end + worker);
