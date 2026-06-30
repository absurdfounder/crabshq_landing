import { ogPrebuiltUrlPath } from '@/lib/og/prebuilt';
import type { OgKind } from '@/lib/og/types';

const VALID_KINDS = new Set<OgKind>([
  'home',
  'team',
  'feature',
  'plugin',
  'use-case',
  'alternative',
  'channel',
  'industry',
  'hub',
  'page',
  'loop',
  'skill',
  'compare',
  'showcase',
  'legacy-integration',
]);

const ASYNC_KINDS = new Set<OgKind>(['skill', 'compare', 'showcase', 'legacy-integration']);

/** Large catalogs stay on /og/img/* (server render). Everything else is prebuilt PNG. */
const DYNAMIC_OG_KINDS = new Set<OgKind>(['plugin', 'skill']);

export const PREBUILD_OG_KINDS = Array.from(VALID_KINDS).filter((kind) => !DYNAMIC_OG_KINDS.has(kind));

export function ogDynamicImagePath(kind: OgKind, slug: string): string {
  return `/og/img/${kind}/${encodeURIComponent(slug)}`;
}

export function ogImagePath(kind: OgKind, slug?: string): string {
  if (kind === 'home') return ogPrebuiltUrlPath('home');
  if (!slug) {
    throw new Error(`OG slug is required for kind "${kind}"`);
  }
  if (DYNAMIC_OG_KINDS.has(kind)) {
    return ogDynamicImagePath(kind, slug);
  }
  return ogPrebuiltUrlPath(kind, slug);
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
