import type { DemoToolLog } from '../components/demoTaskExecution';

/** Composio integration slugs — matches trooper.so/integration catalog */
export const DEMO_INTEGRATIONS = {
  slack: { slug: 'slack', name: 'Slack' },
  github: { slug: 'github', name: 'GitHub' },
  linear: { slug: 'linear', name: 'Linear' },
  hubspot: { slug: 'hubspot', name: 'HubSpot' },
  notion: { slug: 'notion', name: 'Notion' },
  figma: { slug: 'figma', name: 'Figma' },
  googlecalendar: { slug: 'googlecalendar', name: 'Google Calendar' },
  gmail: { slug: 'gmail', name: 'Gmail' },
  linkedin: { slug: 'linkedin', name: 'LinkedIn' },
  stripe: { slug: 'stripe', name: 'Stripe' },
  shopify: { slug: 'shopify', name: 'Shopify' },
  airtable: { slug: 'airtable', name: 'Airtable' },
  jira: { slug: 'jira', name: 'Jira' },
  zendesk: { slug: 'zendesk', name: 'Zendesk' },
  intercom: { slug: 'intercom', name: 'Intercom' },
  aws: { slug: 'aws', name: 'AWS' },
  quickbooks: { slug: 'quickbooks', name: 'QuickBooks' },
  producthunt: { slug: 'producthunt', name: 'Product Hunt' },
  googlesheets: { slug: 'googlesheets', name: 'Google Sheets' },
  whatsapp: { slug: 'whatsapp', name: 'WhatsApp' },
} as const;

export type DemoIntegrationKey = keyof typeof DEMO_INTEGRATIONS;

/** Public site for Google/DuckDuckGo favicons — more reliable than Composio logos. */
export const INTEGRATION_DOMAINS: Record<DemoIntegrationKey, string> = {
  slack: 'slack.com',
  github: 'github.com',
  linear: 'linear.app',
  hubspot: 'hubspot.com',
  notion: 'notion.so',
  figma: 'figma.com',
  googlecalendar: 'calendar.google.com',
  gmail: 'gmail.com',
  linkedin: 'linkedin.com',
  stripe: 'stripe.com',
  shopify: 'shopify.com',
  airtable: 'airtable.com',
  jira: 'atlassian.com',
  zendesk: 'zendesk.com',
  intercom: 'intercom.com',
  aws: 'aws.amazon.com',
  quickbooks: 'quickbooks.intuit.com',
  producthunt: 'producthunt.com',
  googlesheets: 'sheets.google.com',
  whatsapp: 'whatsapp.com',
};

export function integrationLogo(slug: string): string {
  return `https://logos.composio.dev/api/${slug}`;
}

/** `producthunt_search` → "Search · Product Hunt" */
export function humanizeToolLabel(label: string, integration?: DemoIntegrationKey | string | null): string {
  const key = integration && integration in DEMO_INTEGRATIONS
    ? (integration as DemoIntegrationKey)
    : null;
  const meta = key ? DEMO_INTEGRATIONS[key] : null;
  let rest = label;
  if (meta) {
    const prefixes = [meta.slug, meta.slug.replace(/^google/, ''), 'sheets', 'gmail'];
    for (const p of prefixes) {
      if (p && rest.toLowerCase().startsWith(p.toLowerCase())) {
        rest = rest.slice(p.length).replace(/^_/, '');
        break;
      }
    }
  }
  rest = rest.replace(/_/g, ' ').trim();
  if (!rest) return meta?.name ?? label;
  const action = rest.replace(/\b\w/g, (c) => c.toUpperCase());
  return meta ? `${action} · ${meta.name}` : action;
}

type IntegrationToolInput = {
  id: string;
  integration: DemoIntegrationKey;
  label: string;
  detail: string;
  agent: string;
  provider?: string;
} & Pick<DemoToolLog, 'durationMs' | 'result' | 'wrote'>;

/** Build a demo tool log row that shows a Composio integration logo. */
export function i(input: IntegrationToolInput): Omit<DemoToolLog, 'status'> {
  const meta = DEMO_INTEGRATIONS[input.integration];
  return {
    id: input.id,
    tool: input.label,
    // Keep the slug on the log; UI humanizes via `humanizeToolLabel(tool)`.
    label: input.label,
    detail: input.detail,
    agent: input.agent,
    provider: input.provider,
    integration: meta.slug,
    durationMs: input.durationMs,
    result: input.result,
    wrote: input.wrote,
  };
}
