/** Reliable favicon URLs — same approach as integration pages. */
export function getFaviconUrl(domain: string, size = 64): string {
  const clean = domain.replace(/^https?:\/\//, '').split('/')[0];
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(clean)}&sz=${size}`;
}
