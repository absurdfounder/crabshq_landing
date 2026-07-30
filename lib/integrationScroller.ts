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
 * The nine priority integrations first, then real installable ones to fill.
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
    seen.add(plugin.slug);
    picked.push({
      slug: plugin.slug,
      name: plugin.name,
      logo: pluginLogoUrl(plugin),
      href: pluginPagePath(plugin.slug),
    });
  };

  for (const slug of PRIORITY_INTEGRATION_SLUGS) push(getPluginBySlug(slug));

  for (const plugin of getAllPlugins()) {
    if (picked.length >= limit) break;
    if (!plugin.installable || !plugin.iconUrl) continue;
    push(plugin);
  }

  return picked;
}
