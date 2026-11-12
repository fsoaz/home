import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';

const dist = resolve('dist');
const html = await readFile(resolve(dist, 'index.html'), 'utf8');
const assets = [...html.matchAll(/(?:src|href)="([^"]+\.(?:js|css))"/g)].map((match) => match[1]);
if (!assets.some((asset) => asset.endsWith('.js')) || !assets.some((asset) => asset.endsWith('.css'))) {
  throw new Error('Production HTML must reference both JavaScript and CSS assets.');
}
for (const asset of assets) await access(resolve(dist, asset));
await access(resolve(dist, 'francisco-soares-cv.pdf'));
await access(resolve(dist, 'event-horizon.webp'));
const source = (await Promise.all(['src/main.ts', 'src/views.ts'].map((path) => readFile(resolve(path), 'utf8')))).join('\n');
for (const anchor of ['work', 'expertise', 'about', 'contact']) {
  if (!source.includes(`id="${anchor}"`)) throw new Error(`Missing internal anchor: #${anchor}`);
}
for (const destination of ['https://github.com/fsoaz', 'https://www.linkedin.com/in/francisco-soares-b89299427/']) {
  if (!source.includes(destination)) throw new Error(`Missing external destination: ${destination}`);
}
console.log('Production asset, résumé, anchor, and external destination smoke checks passed.');
