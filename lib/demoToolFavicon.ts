import type { DemoToolLog } from '@/components/demoTaskExecution';
import { getProviderDomain } from '@/lib/demoProviders';
import { integrationLogo } from '@/lib/demoIntegrations';

export type ToolIconMeta = {
  domain: string | null;
  logoSrc: string | null;
};

/** Resolve favicon domain or integration logo for a tool row. */
export function getToolIconMeta(log: Pick<DemoToolLog, 'tool' | 'detail' | 'faviconDomain' | 'provider' | 'integration'>): ToolIconMeta {
  if (log.integration) {
    return { domain: null, logoSrc: integrationLogo(log.integration) };
  }
  return { domain: getToolFaviconDomain(log), logoSrc: null };
}

/** Resolve a site favicon domain from tool name + detail string. */
export function getToolFaviconDomain(log: Pick<DemoToolLog, 'tool' | 'detail' | 'faviconDomain' | 'provider'>): string | null {
  const providerDomain = getProviderDomain(log.provider);
  if (providerDomain) return providerDomain;
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
