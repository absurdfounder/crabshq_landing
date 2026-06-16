import catalogData from '@/public/plugins_catalog.json';

export type PluginCatalogItem = {
  slug: string;
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  category: string;
  source: string;
  composioSlug: string | null;
  iconUrl: string | null;
  domain: string | null;
  homepage: string | null;
  status: string | null;
  installable: boolean;
  connectionMode: string | null;
  connectionLabel: string | null;
  authType: string | null;
  builtIn: boolean;
  plannedId: string | null;
  openclawChannelId: string | null;
};

const plugins = catalogData.plugins as PluginCatalogItem[];
const bySlug = new Map(plugins.map((p) => [p.slug, p]));

export const PLUGIN_CATALOG_COUNT = catalogData.count;
export const PLUGIN_CATALOG_GENERATED_AT = catalogData.generatedAt;

export function getAllPlugins(): PluginCatalogItem[] {
  return plugins;
}

export function getPluginBySlug(slug: string): PluginCatalogItem | undefined {
  return bySlug.get(slug);
}

export function allPluginSlugs(): string[] {
  return plugins.map((p) => p.slug);
}

export const PLUGIN_PAGE_SLUG_PREFIX = 'ai_agent_for_';

/** Map catalog plugin id/slug (e.g. "gmail") to public page slug (e.g. "ai_agent_for_gmail"). */
export function pluginToPageSlug(pluginSlug: string): string {
  return `${PLUGIN_PAGE_SLUG_PREFIX}${pluginSlug}`;
}

/** Reverse map: page slug → catalog plugin slug, or undefined if invalid. */
export function pageSlugToPluginSlug(pageSlug: string): string | undefined {
  if (!pageSlug.startsWith(PLUGIN_PAGE_SLUG_PREFIX)) return undefined;
  const pluginSlug = pageSlug.slice(PLUGIN_PAGE_SLUG_PREFIX.length);
  return bySlug.has(pluginSlug) ? pluginSlug : undefined;
}

export function allPluginPageSlugs(): string[] {
  return plugins.map((p) => pluginToPageSlug(p.slug));
}

export function pluginPagePath(pluginSlug: string): string {
  return `/plugin/${pluginToPageSlug(pluginSlug)}`;
}

export function pluginLogoUrl(plugin: PluginCatalogItem): string {
  if (plugin.iconUrl) return plugin.iconUrl;
  if (plugin.composioSlug) return `https://logos.composio.dev/api/${plugin.composioSlug}`;
  if (plugin.domain) return `https://www.google.com/s2/favicons?domain=${plugin.domain}&sz=128`;
  return 'https://www.google.com/s2/favicons?domain=trooper.so&sz=128';
}

export const PRIORITY_INTEGRATION_SLUGS = [
  'hubspot',
  'gmail',
  'github',
  'slack',
  'googlesheets',
  'linkedin',
  'notion',
  'linear',
  'stripe',
] as const;
