import type { PlaybookWorkflowContent } from '@/lib/playbookWorkflow';

import { PLUGIN_PLAYBOOK_SLUG_INDEX } from './slugIndex';

export const PLUGIN_PLAYBOOK_CHUNK_FILES = [
  'plugins-chunk-01--21risk-to-biorender.json',
  'plugins-chunk-02-bitbucket-to-cody.json',
  'plugins-chunk-03-cogedim-to-expofp.json',
  'plugins-chunk-04-extracta-ai-to-hyperframes.json',
  'plugins-chunk-05-hyperise-to-mixmax.json',
  'plugins-chunk-06-mixpanel-to-polygon-io.json',
  'plugins-chunk-07-postalytics-to-sendspark.json',
  'plugins-chunk-08-sensibo-to-tiktok.json',
  'plugins-chunk-09-timecamp-to-zotero.json',
] as const;

export type PluginPlaybookChunkFile = (typeof PLUGIN_PLAYBOOK_CHUNK_FILES)[number];

const chunkCache = new Map<PluginPlaybookChunkFile, Record<string, PlaybookWorkflowContent>>();

const slugToChunk = new Map<string, PluginPlaybookChunkFile>(
  PLUGIN_PLAYBOOK_SLUG_INDEX.map(({ slug, chunk }) => [slug, chunk as PluginPlaybookChunkFile]),
);

export async function loadPluginPlaybookChunk(
  file: PluginPlaybookChunkFile,
): Promise<Record<string, PlaybookWorkflowContent>> {
  const cached = chunkCache.get(file);
  if (cached) return cached;
  const mod = await import(`./chunks/${file}`);
  const data = (mod.default ?? mod) as Record<string, PlaybookWorkflowContent>;
  chunkCache.set(file, data);
  return data;
}

let overridesPromise: Promise<Record<string, PlaybookWorkflowContent>> | null = null;

async function loadOverrides(): Promise<Record<string, PlaybookWorkflowContent>> {
  if (!overridesPromise) {
    overridesPromise = import('./overrides.json').then((m) => (m.default ?? m) as Record<string, PlaybookWorkflowContent>);
  }
  return overridesPromise;
}

export async function loadPluginPlaybookWorkflow(
  slug: string,
): Promise<PlaybookWorkflowContent | null> {
  const overrides = await loadOverrides();
  if (overrides[slug]) return overrides[slug];
  const chunkFile = slugToChunk.get(slug);
  if (!chunkFile) return null;
  const chunk = await loadPluginPlaybookChunk(chunkFile);
  return chunk[slug] ?? null;
}
