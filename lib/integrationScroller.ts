import {
  getAllPlugins,
  getPluginBySlug,
  pluginLogoUrl,
  pluginPagePath,
  PRIORITY_INTEGRATION_SLUGS,
} from '@/lib/pluginCatalog';

/**
 * The four fields the scroller actually renders.
 *
 * Deliberately slim, and deliberately a separate type from PluginCatalogItem:
 * the catalog is 1,057 entries and must never reach the browser. The client
 * component imports this type with `import type`, which is erased at compile
 * time, so neither this module nor public/plugins_catalog.json enters the
 * client graph. 36 tiles ≈ 4 KB of props. Same pattern as getLoopRailItems.
 */
export type IntegrationTile = {
  slug: string;
  name: string;
  logo: string;
  href: string;
};

/**
 * Names a reader recognises, in a deliberate order.
 *
 * Every slug below is verified present, installable and icon-bearing in
 * plugins_catalog.json. The order interleaves categories — comms, code, CRM,
 * design, data — so a glance at any part of the rail says "it covers my
 * stack" rather than "it covers one thing well".
 *
 * This list exists because the obvious implementation (priority slugs, then
 * backfill from getAllPlugins()) fills the rail alphabetically: 21risk, 2chat,
 * Ably, Abstract, AbuseIPDB, Abyssale, Accredible… That is a wall of names
 * nobody recognises, which is the same "too much, unfocused" problem this
 * whole pass is removing.
 */
const FEATURED_SLUGS = [
  'github', 'gmail', 'slack', 'notion', 'linear', 'figma',
  'hubspot', 'stripe', 'salesforce', 'googlesheets', 'jira', 'airtable',
  'zendesk', 'shopify', 'discord', 'intercom', 'asana', 'googledocs',
  'linkedin', 'trello', 'gitlab', 'sentry', 'calendly', 'dropbox',
  'clickup', 'openai', 'supabase', 'vercel', 'zoom', 'mailchimp',
  'confluence', 'posthog', 'canva', 'telegram', 'whatsapp', 'quickbooks',
  'datadog', 'segment', 'miro', 'typeform', 'pipedrive', 'cloudflare',
] as const;

/**
 * Featured names first, then the priority slugs, then any installable
 * icon-bearing plugin to fill.
 *
 * Filtering on `iconUrl` matters: pluginLogoUrl falls back to a generic
 * favicon when a plugin has no icon, and a rail of identical grey globes is
 * worse than a shorter rail.
 */
export function getIntegrationTiles(limit = 36): IntegrationTile[] {
  const picked: IntegrationTile[] = [];
  const seen = new Set<string>();

  const push = (plugin: ReturnType<typeof getPluginBySlug>) => {
    if (!plugin || seen.has(plugin.slug) || picked.length >= limit) return;
    if (!plugin.iconUrl) return;
    seen.add(plugin.slug);
    picked.push({
      slug: plugin.slug,
      name: plugin.name,
      logo: pluginLogoUrl(plugin),
      href: pluginPagePath(plugin.slug),
    });
  };

  for (const slug of FEATURED_SLUGS) push(getPluginBySlug(slug));
  for (const slug of PRIORITY_INTEGRATION_SLUGS) push(getPluginBySlug(slug));

  for (const plugin of getAllPlugins()) {
    if (picked.length >= limit) break;
    if (!plugin.installable || !plugin.iconUrl) continue;
    push(plugin);
  }

  return picked;
}
