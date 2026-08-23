import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const assetsDir = process.argv[2] ?? 'dist/assets';
const maxEntryBytes = Number(process.env.MAX_ENTRY_BYTES ?? 1_050_000);
const files = await readdir(assetsDir);
const entries = [];

for (const file of files) {
  if (!file.endsWith('.js')) continue;
  const path = join(assetsDir, file);
  const source = await readFile(path, 'utf8');
  if (/createRoot|AppRouter|RouteMetadata|Journey Expert/.test(source)) {
    entries.push({ file, bytes: Buffer.byteLength(source) });
  }
}

if (entries.length === 0) {
  throw new Error(`No likely entry JavaScript bundle found in ${assetsDir}`);
}

const largest = entries.sort((a, b) => b.bytes - a.bytes)[0];
console.log(`Largest likely entry: ${largest.file} (${largest.bytes} bytes)`);
console.log(`Entry budget: ${maxEntryBytes} bytes`);

if (largest.bytes > maxEntryBytes) {
  console.error(`Entry bundle exceeds ${maxEntryBytes} bytes`);
  process.exit(1);
}
