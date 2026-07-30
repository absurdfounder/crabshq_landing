/**
 * Favicon resolution for demo surfaces.
 *
 * The landing site has its own `lib/favicon.ts` used by footers, icon grids and
 * integration pages. This is the demo's copy so the package doesn't reach back
 * into its host — the two are allowed to diverge, since this one only ever
 * resolves icons for fictional demo orgs.
 */

/** Overridable so a host can serve demo assets from wherever it likes. */
let assetBase = '/images';

export function setDemoAssetBase(base: string) {
  assetBase = base.replace(/\/$/, '');
}

export const VIRALHOOKS_FAVICON = '/images/viralhooks-favicon.png';

/** Domains whose Google favicon cache returns wrong or generic icons. */
const BLOCKED_GOOGLE_FAVICON_DOMAINS = new Set(['wonder.gg', 'wonderdesk.ai']);

const CUSTOM_FAVICON_URLS: Record<string, string> = {
  'viralhooks.org': VIRALHOOKS_FAVICON,
};

export function getFaviconUrl(domain: string, size = 64): string {
  const clean = domain.replace(/^https?:\/\//, '').split('/')[0].toLowerCase();
  if (CUSTOM_FAVICON_URLS[clean]) return CUSTOM_FAVICON_URLS[clean];
  if (BLOCKED_GOOGLE_FAVICON_DOMAINS.has(clean)) return `${assetBase}/viralhooks-favicon.png`;
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(clean)}&sz=${size}`;
}
