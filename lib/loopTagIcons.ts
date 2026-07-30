/**
 * Which loop tags are worth rendering as pills.
 *
 * The catalog's `tags` field is mostly taxonomy, not tools: across 119 loops
 * `b2b` appears 65 times, alongside `operations`, `finance`, `infrastructure`
 * and a malformed `engineering,-product-and-design`. Only about eight tag
 * instances name an actual product. Rendering the rest as pills would put a
 * wall of meaningless words on every card — the same noise problem this whole
 * pass exists to remove.
 *
 * So this is an allowlist, not a lookup with a fallback: a tag becomes a pill
 * only if it names something a reader recognises. Everything else is dropped.
 */
const TOOL_DOMAINS: Record<string, { label: string; domain: string }> = {
  github: { label: 'GitHub', domain: 'github.com' },
  gitlab: { label: 'GitLab', domain: 'gitlab.com' },
  stripe: { label: 'Stripe', domain: 'stripe.com' },
  figma: { label: 'Figma', domain: 'figma.com' },
  playwright: { label: 'Playwright', domain: 'playwright.dev' },
  cypress: { label: 'Cypress', domain: 'cypress.io' },
  notion: { label: 'Notion', domain: 'notion.so' },
  slack: { label: 'Slack', domain: 'slack.com' },
  linear: { label: 'Linear', domain: 'linear.app' },
  sentry: { label: 'Sentry', domain: 'sentry.io' },
  vercel: { label: 'Vercel', domain: 'vercel.com' },
  shopify: { label: 'Shopify', domain: 'shopify.com' },
  hubspot: { label: 'HubSpot', domain: 'hubspot.com' },
  intercom: { label: 'Intercom', domain: 'intercom.com' },
  jira: { label: 'Jira', domain: 'atlassian.com' },
  gmail: { label: 'Gmail', domain: 'gmail.com' },
  airtable: { label: 'Airtable', domain: 'airtable.com' },
  datadog: { label: 'Datadog', domain: 'datadoghq.com' },
};

export type LoopTag = {
  label: string;
  /** Matches DemoTag's shape so the demo's pill renders it unchanged. */
  type: 'goal' | 'site' | 'topic';
  domain?: string;
};

/** Allowlisted tool tags only, in catalog order. */
export function toolTagsFor(tags: readonly string[] | undefined, limit = 3): LoopTag[] {
  if (!tags?.length) return [];
  const out: LoopTag[] = [];
  const seen = new Set<string>();
  for (const raw of tags) {
    const hit = TOOL_DOMAINS[raw.trim().toLowerCase()];
    if (!hit || seen.has(hit.domain)) continue;
    seen.add(hit.domain);
    out.push({ label: hit.label, type: 'site', domain: hit.domain });
    if (out.length >= limit) break;
  }
  return out;
}
