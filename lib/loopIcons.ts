import { getFaviconUrl } from '@/lib/favicon';
import { getPluginBySlug, pluginLogoUrl } from '@/lib/pluginCatalog';
import { getSkillIconUrl, resolveSkillAppDomain } from '@/lib/skillIcon';

export function domainFromUrl(url: string): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
}

export function getInspiredByFaviconUrl(url: string, size = 32): string {
  const domain = domainFromUrl(url);
  return domain ? getFaviconUrl(domain, size) : getFaviconUrl('trooper.so', size);
}

const PLUGIN_SLUG_DOMAINS: Record<string, string> = {
  metaads: 'meta.com',
  anchor_browser: 'google.com',
  'google-analytics': 'google.com',
  'google-calendar': 'calendar.google.com',
  googlesheets: 'docs.google.com',
  gmail: 'gmail.com',
  slack: 'slack.com',
  github: 'github.com',
  hubspot: 'hubspot.com',
  stripe: 'stripe.com',
  notion: 'notion.so',
  linear: 'linear.app',
  figma: 'figma.com',
  zendesk: 'zendesk.com',
  jira: 'atlassian.com',
  salesforce: 'salesforce.com',
};

const LOOP_SKILL_DOMAINS: Record<string, string> = {
  'loop-runner': 'trooper.so',
  'code-change': 'github.com',
  'ci-debugging': 'github.com',
  review: 'github.com',
  testing: 'vitest.dev',
  'browser-qa': 'google.com',
  'research-monitoring': 'perplexity.ai',
  'approval-workflows': 'trooper.so',
  'operations-briefing': 'notion.so',
  'growth-ops': 'meta.com',
  'docs-qa': 'notion.so',
  'customer-ops': 'hubspot.com',
  'sales-ops': 'salesforce.com',
  'content-ops': 'notion.so',
  'security-triage': 'github.com',
  'visual-design-qa': 'figma.com',
};

const SYSTEM_NAME_DOMAINS: Record<string, string> = {
  aws: 'aws.amazon.com',
  kubernetes: 'kubernetes.io',
  k8s: 'kubernetes.io',
  datadog: 'datadoghq.com',
  okta: 'okta.com',
  stripe: 'stripe.com',
  github: 'github.com',
  slack: 'slack.com',
  notion: 'notion.so',
  hubspot: 'hubspot.com',
  salesforce: 'salesforce.com',
  sap: 'sap.com',
  oracle: 'oracle.com',
  wellsky: 'wellsky.com',
  axiscare: 'axiscare.com',
  indeed: 'indeed.com',
  ramp: 'ramp.com',
  brex: 'brex.com',
  deel: 'deel.com',
  rippling: 'rippling.com',
  ashby: 'ashbyhq.com',
  ironclad: 'ironcladapp.com',
  zapier: 'zapier.com',
  vanta: 'vanta.com',
};

export function getLoopPluginIconUrl(pluginId: string, label?: string, size = 64): string {
  const catalog = getPluginBySlug(pluginId);
  if (catalog) return pluginLogoUrl(catalog);
  const hint = PLUGIN_SLUG_DOMAINS[pluginId];
  if (hint) return getFaviconUrl(hint, size);
  const fromLabel = label
    ? resolveSkillAppDomain({ id: pluginId, name: label })
    : resolveSkillAppDomain({ id: pluginId, name: pluginId });
  if (fromLabel) return getFaviconUrl(fromLabel, size);
  return getFaviconUrl('trooper.so', size);
}

export function getLoopSkillIconUrl(skill: { id: string; label: string }, size = 64): string {
  const mapped = LOOP_SKILL_DOMAINS[skill.id];
  if (mapped) return getFaviconUrl(mapped, size);
  return getSkillIconUrl({ id: skill.id, name: skill.label }, size);
}

export function getSystemIconUrl(name: string, size = 64): string {
  const normalized = name.toLowerCase().replace(/[^a-z0-9]+/g, '');
  const domain = SYSTEM_NAME_DOMAINS[normalized]
    || resolveSkillAppDomain({ id: normalized, name });
  return domain ? getFaviconUrl(domain, size) : getFaviconUrl('trooper.so', size);
}
