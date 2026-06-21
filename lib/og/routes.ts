import type { OgKind } from '@/lib/og/types';

const VALID_KINDS = new Set<OgKind>([
  'home',
  'team',
  'feature',
  'plugin',
  'use-case',
  'alternative',
  'channel',
  'hub',
  'page',
  'loop',
  'skill',
  'compare',
  'showcase',
  'legacy-integration',
]);

const ASYNC_KINDS = new Set<OgKind>(['skill', 'compare', 'showcase', 'legacy-integration']);

export function ogImagePath(kind: OgKind, slug?: string): string {
  if (kind === 'home') return '/og/img/home';
  if (!slug) {
    throw new Error(`OG slug is required for kind "${kind}"`);
  }
  return `/og/img/${kind}/${encodeURIComponent(slug)}`;
}

export function parseOgImageSegments(segments: string[] = []): { kind: OgKind; slug?: string } | null {
  if (!segments.length) return null;

  if (segments.length === 1 && segments[0] === 'home') {
    return { kind: 'home' };
  }

  const [kind, ...rest] = segments;
  if (!VALID_KINDS.has(kind as OgKind) || kind === 'home') return null;

  const slug = rest.map((part) => decodeURIComponent(part)).join('/');
  if (!slug) return null;

  return { kind: kind as OgKind, slug };
}

export function isAsyncOgKind(kind: OgKind): boolean {
  return ASYNC_KINDS.has(kind);
}

export { VALID_KINDS, ASYNC_KINDS };
