import type { OgKind } from '@/lib/og/types';

const ORIGIN = 'https://trooper.so';

const HUB_PATHS: Record<string, string> = {
  loops: '/loops',
  plugins: '/plugin',
  integration: '/integration',
  channels: '/channels',
  'use-cases': '/use-cases',
  industries: '/industries',
  alternatives: '/alternatives',
  showcase: '/showcase',
};

export function resolveOgPageUrl(kind: OgKind, slug?: string): string {
  if (kind === 'home') return ORIGIN;
  if (kind === 'hub' && slug) return `${ORIGIN}${HUB_PATHS[slug] || `/${slug}`}`;
  if (kind === 'page' && slug) return `${ORIGIN}/${slug}`;
  if (kind === 'loop' && slug) return `${ORIGIN}/loops/${slug}`;
  if (kind === 'skill' && slug) return `${ORIGIN}/skill/${slug}`;
  if (kind === 'team' && slug) return `${ORIGIN}/teams/${slug}`;
  if (kind === 'feature' && slug) return `${ORIGIN}/features/${slug}`;
  if (kind === 'plugin' && slug) return `${ORIGIN}/plugin/${slug}`;
  if (kind === 'use-case' && slug) return `${ORIGIN}/use-cases/${slug}`;
  if (kind === 'alternative' && slug) return `${ORIGIN}/alternatives/${slug}`;
  if (kind === 'channel' && slug) return `${ORIGIN}/channels/${slug}`;
  if (kind === 'industry' && slug) return `${ORIGIN}/industries/${slug}`;
  if (kind === 'compare' && slug) return `${ORIGIN}/compare-against/${slug}`;
  if (kind === 'showcase' && slug) return `${ORIGIN}/showcase/${slug}`;
  if (kind === 'legacy-integration' && slug) return `${ORIGIN}/integration/${slug}`;
  return ORIGIN;
}

/** Display URL without scheme — e.g. trooper.so/loops */
export function formatOgDisplayUrl(pageUrl: string): string {
  return pageUrl.replace(/^https?:\/\//, '');
}
