/** Local favicon assets for domains where Google s2 cache is wrong or unavailable. */
export const VIRALHOOKS_FAVICON = '/images/viralhooks-favicon.png';

const CUSTOM_FAVICON_URLS: Record<string, string> = {
  'viralhooks.org': VIRALHOOKS_FAVICON,
};

/** Domains whose Google favicon cache returns wrong/generic icons in the demo UI. */
const BLOCKED_GOOGLE_FAVICON_DOMAINS = new Set(['wonder.gg', 'wonderdesk.ai']);

/** Reliable favicon URLs — same approach as integration pages. Empty string when blocked. */
export function getFaviconUrl(domain: string, size = 64): string {
  const clean = domain.replace(/^https?:\/\//, '').split('/')[0].toLowerCase();
  if (CUSTOM_FAVICON_URLS[clean]) return CUSTOM_FAVICON_URLS[clean];
  if (BLOCKED_GOOGLE_FAVICON_DOMAINS.has(clean)) return VIRALHOOKS_FAVICON;
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(clean)}&sz=${size}`;
}
