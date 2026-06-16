#!/usr/bin/env node
/**
 * Sync Trooper marketplace plugins into trooper_landing/public/plugins_catalog.json
 * Source: ../Trooper/server/data/indexes/plugins.json
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const source = path.resolve(__dirname, '../../Trooper/server/data/indexes/plugins.json');
const dest = path.resolve(__dirname, '../public/plugins_catalog.json');

function getSlug(p) {
  if (p.composioSlug) return p.composioSlug;
  return p.id
    .replace(/^composio:/, '')
    .replace(/^openclaw:/, '')
    .replace(/^openclaw-native:/, '')
    .replace(/^planned:/, '');
}

function priority(p) {
  if (p.source === 'codex' || (!p.id.startsWith('planned:') && !p.id.startsWith('composio:') && !p.id.startsWith('openclaw'))) return 0;
  if (p.source === 'openclaw-channel' || p.id.startsWith('openclaw:')) return 1;
  if (p.source === 'composio' || p.id.startsWith('composio:')) return 2;
  if (p.source === 'planned' || p.id.startsWith('planned:')) return 3;
  return 4;
}

const data = JSON.parse(fs.readFileSync(source, 'utf8'));
const bySlug = new Map();

for (const p of data.plugins) {
  const slug = getSlug(p);
  const existing = bySlug.get(slug);
  if (!existing || priority(p) < priority(existing)) bySlug.set(slug, p);
}

const plugins = [...bySlug.entries()]
  .map(([slug, p]) => ({
    slug,
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
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

fs.writeFileSync(
  dest,
  JSON.stringify({ generatedAt: data.generatedAt, count: plugins.length, plugins }, null, 0),
);
console.log(`Synced ${plugins.length} plugins → ${dest}`);
