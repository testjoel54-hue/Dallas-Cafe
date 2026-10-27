import { cp, mkdir, rm, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const output = join(root, 'dist');

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const page of ['index.html', 'menu/index.html', 'delivery/index.html', 'contact/index.html']) {
  const target = join(output, page);
  await mkdir(dirname(target), { recursive: true });
  await copyFile(join(root, page), target);
}
await cp(join(root, 'assets'), join(output, 'assets'), { recursive: true });
await copyFile(join(root, 'robots.txt'), join(output, 'robots.txt'));
console.log('Build complete: dist/ (4 pages + optimized assets)');
