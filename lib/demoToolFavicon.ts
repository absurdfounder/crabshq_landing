import type { DemoToolLog } from '@/components/demoTaskExecution';

/** Resolve a site favicon domain from tool name + detail string. */
export function getToolFaviconDomain(log: Pick<DemoToolLog, 'tool' | 'detail' | 'faviconDomain'>): string | null {
  if (log.faviconDomain) return log.faviconDomain;

  const detail = log.detail ?? '';
  const lower = detail.toLowerCase();

  const urlMatch = detail.match(/https?:\/\/(?:www\.)?([^/\s]+)/i);
  if (urlMatch) return urlMatch[1];

  if (lower.includes('wonder.gg') || /\bwonder\b/.test(lower)) return 'wonder.gg';
  if (lower.includes('github.com') || lower.includes('github') || log.tool.includes('git')) return 'github.com';
  if (lower.includes('product hunt') || lower.includes('producthunt')) return 'producthunt.com';
  if (lower.includes('google.com') || (log.tool.includes('search') && lower.includes('google'))) return 'google.com';

  if (log.tool.includes('browser') && lower.includes('http')) {
    try {
      const fake = lower.startsWith('http') ? lower : `https://${lower}`;
      return new URL(fake).hostname.replace(/^www\./, '');
    } catch {
      return null;
    }
  }

  if (log.tool.includes('search') && lower.includes('wonder')) return 'wonder.gg';
  if (log.tool.includes('search')) return 'google.com';

  return null;
}
