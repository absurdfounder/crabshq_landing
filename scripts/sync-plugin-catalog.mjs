#!/usr/bin/env node
/**
 * Sync Trooper marketplace plugins into trooper_landing/public/plugins_catalog.json
 * Source: ../Trooper/server/data/indexes/plugins.json
 *
 * Every app plugin gets a unique landing slug (1057 entries). When multiple app
 * plugins share a display slug (e.g. codex github vs planned:github), the highest-
 * priority source keeps the clean slug; others get a source suffix.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const source = path.resolve(__dirname, '../../Trooper/server/data/indexes/plugins.json');
const dest = path.resolve(__dirname, '../public/plugins_catalog.json');

const SOURCE_SUFFIX = {
  'openclaw-channel': 'openclaw',
  composio: 'composio',
  planned: 'planned',
  'template-reference': 'template',
  'openclaw-native': 'native',
};

function baseSlug(p) {
  if (p.id.startsWith('openclaw:')) return p.id.slice('openclaw:'.length);
  if (p.id.startsWith('openclaw-native:')) return p.id.slice('openclaw-native:'.length);
  if (p.id.startsWith('planned:')) return p.id.slice('planned:'.length);
  if (p.id.startsWith('composio:')) return p.composioSlug || p.id.slice('composio:'.length);
  return p.id;
}

function priority(p) {
  if (
    p.source === 'codex'
    || (!p.id.startsWith('planned:') && !p.id.startsWith('composio:') && !p.id.startsWith('openclaw'))
  ) {
    return 0;
  }
  if (p.source === 'openclaw-channel' || p.id.startsWith('openclaw:')) return 1;
  if (p.source === 'composio' || p.id.startsWith('composio:')) return 2;
  if (p.source === 'planned' || p.id.startsWith('planned:')) return 3;
  return 4;
}

function assignSlugs(plugins) {
  const groups = new Map();
  for (const p of plugins) {
    const base = baseSlug(p);
    if (!groups.has(base)) groups.set(base, []);
    groups.get(base).push(p);
  }

  const slugById = new Map();
  for (const [base, items] of groups) {
    if (items.length === 1) {
      slugById.set(items[0].id, base);
      continue;
    }

    items.sort((a, b) => priority(a) - priority(b));
    const used = new Set();
    slugById.set(items[0].id, base);
    used.add(base);

    for (let i = 1; i < items.length; i++) {
      const p = items[i];
      const suffix = SOURCE_SUFFIX[p.source] || String(p.source || 'alt').replace(/[^a-z0-9]+/g, '-');
      let candidate = `${base}-${suffix}`;
      let n = 2;
      while (used.has(candidate)) {
        candidate = `${base}-${suffix}-${n++}`;
      }
      slugById.set(p.id, candidate);
      used.add(candidate);
    }
  }

  return slugById;
}

const data = JSON.parse(fs.readFileSync(source, 'utf8'));
const slugById = assignSlugs(data.plugins);

const plugins = data.plugins
  .map((p) => ({
    slug: slugById.get(p.id),
    id: p.id,
    name: p.name,
    description: (p.longDescription || p.description || '').slice(0, 500),
    shortDescription: (p.description || '').slice(0, 200),
    category: p.category || 'Integrations',
    source: p.source || 'unknown',
    composioSlug: p.composioSlug || null,
    iconUrl: p.iconUrl || (p.composioSlug ? `https://logos.composio.dev/api/${p.composioSlug}` : null),
    domain: p.domain || null,
    homepage: p.homepage || null,
    status: p.status || null,
    installable: Boolean(p.installable),
    connectionMode: p.connectionMode || null,
    connectionLabel: p.connectionLabel || null,
    authType: p.authType || null,
    builtIn: Boolean(p.builtIn),
    plannedId: p.plannedId || null,
    openclawChannelId: p.openclawChannelId || null,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

if (plugins.length !== data.plugins.length) {
  console.error(`Plugin count mismatch: source=${data.plugins.length} output=${plugins.length}`);
  process.exit(1);
}

const uniqueSlugs = new Set(plugins.map((p) => p.slug));
if (uniqueSlugs.size !== plugins.length) {
  console.error(`Duplicate slugs detected: ${plugins.length - uniqueSlugs.size} collisions`);
  process.exit(1);
}

fs.writeFileSync(
  dest,
  JSON.stringify({ generatedAt: data.generatedAt, count: plugins.length, plugins }, null, 0),
);
console.log(`Synced ${plugins.length} plugins (${uniqueSlugs.size} unique slugs) → ${dest}`);
