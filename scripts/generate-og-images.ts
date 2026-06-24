/**
 * Pre-render all Trooper OG/social images to public/og/prebuilt/.
 * Run: npm run generate:og
 */
import { access, mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { listAllOgImageTargets, type OgImageTarget } from '../lib/og/catalog';
import { renderOgImageBuffer } from '../lib/og/generateImage';
import { ogPrebuiltFilePath, ogPrebuiltUrlPath } from '../lib/og/prebuilt';

const CONCURRENCY = 8;

function parseArgs(argv: string[]) {
  const force = argv.includes('--force');
  const onlyHome = argv.includes('--home');
  const kindsArg = argv.find((arg) => arg.startsWith('--kinds='));
  const kinds = kindsArg
    ? new Set(kindsArg.slice('--kinds='.length).split(',').map((k) => k.trim()).filter(Boolean))
    : null;

  return { force, onlyHome, kinds };
}

async function fileExists(path: string) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function writeTarget(target: OgImageTarget, force: boolean) {
  const filePath = ogPrebuiltFilePath(target.kind, target.slug);
  if (!force && (await fileExists(filePath))) {
    return 'skipped' as const;
  }

  const buffer = await renderOgImageBuffer(target);
  if (!buffer) {
    return 'missing' as const;
  }

  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, buffer);
  return 'written' as const;
}

async function runPool<T>(items: T[], worker: (item: T) => Promise<void>, concurrency: number) {
  let index = 0;
  const runners = Array.from({ length: concurrency }, async () => {
    while (index < items.length) {
      const current = items[index++];
      await worker(current);
    }
  });
  await Promise.all(runners);
}

async function main() {
  const { force, onlyHome, kinds } = parseArgs(process.argv.slice(2));
  const started = Date.now();

  let targets = await listAllOgImageTargets();
  if (onlyHome) {
    targets = targets.filter((target) => target.kind === 'home');
  } else if (kinds) {
    targets = targets.filter((target) => kinds.has(target.kind));
  }

  const totals = { written: 0, skipped: 0, missing: 0, failed: 0 };
  let done = 0;

  console.log(`[og] generating ${targets.length} image(s) (concurrency ${CONCURRENCY}, force=${force})`);

  await runPool(
    targets,
    async (target) => {
      const label =
        target.slug === undefined
          ? target.kind
          : `${target.kind}/${target.slug}`;

      try {
        const result = await writeTarget(target, force);
        totals[result] += 1;
        done += 1;
        if (result === 'written' || done % 50 === 0 || done === targets.length) {
          console.log(
            `[og] ${done}/${targets.length} ${result} ${label} → ${ogPrebuiltUrlPath(target.kind, target.slug)}`,
          );
        }
      } catch (error) {
        totals.failed += 1;
        done += 1;
        console.error(`[og] failed ${label}`, error);
      }
    },
    CONCURRENCY,
  );

  const manifest = {
    generatedAt: new Date().toISOString(),
    count: targets.length,
    totals,
    samples: targets.slice(0, 5).map((target) => ogPrebuiltUrlPath(target.kind, target.slug)),
  };

  const manifestPath = join(process.cwd(), 'public/og/prebuilt/manifest.json');
  await mkdir(dirname(manifestPath), { recursive: true });
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  const seconds = ((Date.now() - started) / 1000).toFixed(1);
  console.log(`[og] done in ${seconds}s`, totals);

  if (totals.failed > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error('[og] fatal', error);
  process.exit(1);
});
