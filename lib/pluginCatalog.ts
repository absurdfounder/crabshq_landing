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
