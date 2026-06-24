import { join } from 'node:path';
import type { OgKind } from '@/lib/og/types';

const PREBUILT_ROOT = 'og/prebuilt';

export function ogPrebuiltUrlPath(kind: OgKind, slug?: string): string {
  if (kind === 'home') return `/${PREBUILT_ROOT}/home.png`;
  if (!slug) {
    throw new Error(`OG slug is required for kind "${kind}"`);
  }
  return `/${PREBUILT_ROOT}/${kind}/${encodeURIComponent(slug)}.png`;
}

export function ogPrebuiltFilePath(kind: OgKind, slug?: string, cwd = process.cwd()): string {
  if (kind === 'home') return join(cwd, 'public', PREBUILT_ROOT, 'home.png');
  if (!slug) {
    throw new Error(`OG slug is required for kind "${kind}"`);
  }
  return join(cwd, 'public', PREBUILT_ROOT, kind, `${encodeURIComponent(slug)}.png`);
}

export const OG_PREBUILT_DIR = PREBUILT_ROOT;
