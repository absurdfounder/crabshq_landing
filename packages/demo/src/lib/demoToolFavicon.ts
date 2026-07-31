import type { DemoToolLog } from '../components/demoTaskExecution';
import { getProviderDomain } from './demoProviders';
import {
  DEMO_INTEGRATIONS,
  INTEGRATION_DOMAINS,
  type DemoIntegrationKey,
} from './demoIntegrations';

export type ToolIconMeta = {
  domain: string | null;
  logoSrc: string | null;
};

/** Resolve favicon domain for a tool row — prefer real site icons over slug logos. */
export function getToolIconMeta(log: Pick<DemoToolLog, 'tool' | 'detail' | 'faviconDomain' | 'provider' | 'integration'>): ToolIconMeta {
  if (log.integration && log.integration in DEMO_INTEGRATIONS) {
    const key = log.integration as DemoIntegrationKey;
    return { domain: INTEGRATION_DOMAINS[key], logoSrc: null };
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

  if (lower.includes('wonderdesk.ai') || /\bwonder\b/.test(lower)) return 'wonderdesk.ai';
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

  if (log.tool.includes('search') && lower.includes('wonder')) return 'wonderdesk.ai';
  if (log.tool.includes('search')) return 'google.com';

  return null;
}
