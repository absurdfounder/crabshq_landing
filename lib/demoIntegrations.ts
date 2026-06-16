import type { DemoToolLog } from '@/components/demoTaskExecution';

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

export function integrationLogo(slug: string): string {
  return `https://logos.composio.dev/api/${slug}`;
}

type IntegrationToolInput = {
  id: string;
  integration: DemoIntegrationKey;
  label: string;
  detail: string;
  agent: string;
  provider?: string;
};

/** Build a demo tool log row that shows a Composio integration logo. */
export function i(input: IntegrationToolInput): Omit<DemoToolLog, 'status'> {
  const meta = DEMO_INTEGRATIONS[input.integration];
  return {
    id: input.id,
    tool: input.label,
    label: input.label,
    detail: input.detail,
    agent: input.agent,
    provider: input.provider,
    integration: meta.slug,
  };
}
