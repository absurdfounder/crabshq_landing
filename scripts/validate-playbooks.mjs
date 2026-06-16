#!/usr/bin/env node
/**
 * Validate plugin playbook chunks + overrides against plugins_catalog.json.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CATALOG_PATH = path.join(ROOT, 'public/plugins_catalog.json');
const CHUNKS_DIR = path.join(ROOT, 'lib/playbookWorkflowContent/plugins/chunks');
const OVERRIDES_PATH = path.join(ROOT, 'lib/playbookWorkflowContent/plugins/overrides.json');

const VALID_TONES = new Set(['default', 'brand']);
const VALID_KINDS = new Set(['trigger', 'agent', 'integration', 'gate']);
const NODE_IDS = new Set(['t1', 'a1', 'a2', 'i1', 'g1']);

function loadCatalog() {
  const raw = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
  return raw.plugins || raw;
}

function loadOverrides() {
  if (!fs.existsSync(OVERRIDES_PATH)) return {};
  return JSON.parse(fs.readFileSync(OVERRIDES_PATH, 'utf8'));
}

function loadChunks() {
  const map = new Map();
  const files = fs.readdirSync(CHUNKS_DIR).filter((f) => f.endsWith('.json')).sort();
  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(CHUNKS_DIR, file), 'utf8'));
    for (const [slug, content] of Object.entries(data)) {
      map.set(slug, { file, content });
    }
  }
  return { map, files };
}

function validateContent(slug, content, errors) {
  if (!content || typeof content !== 'object') {
    errors.push(`${slug}: missing content object`);
    return;
  }
  if (!Array.isArray(content.headlineLines) || content.headlineLines.length < 1) {
    errors.push(`${slug}: headlineLines required`);
  } else {
    for (const line of content.headlineLines) {
      if (!Array.isArray(line.parts)) {
        errors.push(`${slug}: headline line missing parts`);
        continue;
      }
      for (const part of line.parts) {
        if (typeof part.text !== 'string' || !VALID_TONES.has(part.tone)) {
          errors.push(`${slug}: invalid headline part`);
        }
      }
    }
  }
  if (typeof content.subheading !== 'string' || !content.subheading.length) {
    errors.push(`${slug}: subheading required`);
  }
  if (!Array.isArray(content.playbooks) || content.playbooks.length !== 3) {
    errors.push(`${slug}: expected 3 playbooks, got ${content.playbooks?.length ?? 0}`);
    return;
  }
  for (const pb of content.playbooks) {
    if (!pb.id || !pb.tabLabel) errors.push(`${slug}/${pb.id}: missing id or tabLabel`);
    if (!Array.isArray(pb.nodes) || pb.nodes.length !== 5) {
      errors.push(`${slug}/${pb.id}: expected 5 nodes`);
    } else {
      const ids = new Set(pb.nodes.map((n) => n.id));
      for (const id of NODE_IDS) {
        if (!ids.has(id)) errors.push(`${slug}/${pb.id}: missing node ${id}`);
      }
      for (const node of pb.nodes) {
        if (node.kind && !VALID_KINDS.has(node.kind)) {
          errors.push(`${slug}/${pb.id}: invalid kind ${node.kind}`);
        }
        if (typeof node.label !== 'string') errors.push(`${slug}/${pb.id}: node label required`);
      }
    }
    if (!Array.isArray(pb.edges) || pb.edges.length < 4) {
      errors.push(`${slug}/${pb.id}: edges too few`);
    }
    if (!pb.statusBar || typeof pb.statusBar.label !== 'string') {
      errors.push(`${slug}/${pb.id}: statusBar required`);
    }
  }
}

function pluginNameInContent(name, content) {
  const hay = JSON.stringify(content).toLowerCase();
  return hay.includes(name.toLowerCase());
}

function main() {
  const plugins = loadCatalog();
  const overrides = loadOverrides();
  const { map: chunkMap, files } = loadChunks();
  const errors = [];

  for (const plugin of plugins) {
    const slug = plugin.slug;
    const inChunk = chunkMap.has(slug);
    const inOverride = Object.prototype.hasOwnProperty.call(overrides, slug);
    if (!inChunk && !inOverride) {
      errors.push(`Missing entry for slug: ${slug}`);
      continue;
    }
    const content = inOverride ? overrides[slug] : chunkMap.get(slug).content;
    validateContent(slug, content, errors);

    if (!pluginNameInContent(plugin.name, content)) {
      errors.push(`${slug}: plugin name "${plugin.name}" not found in merged content labels/text`);
    }
  }

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const data = JSON.parse(fs.readFileSync(path.join(CHUNKS_DIR, file), 'utf8'));
    const count = Object.keys(data).length;
    const isLast = i === files.length - 1;
    const min = isLast ? 1 : 100;
    if (count < min || count > 150) {
      errors.push(`Chunk ${file} has ${count} slugs (expected ${min}-150)`);
    }
  }

  const validated = plugins.length;
  if (errors.length) {
    console.error(`Validation FAILED: ${errors.length} error(s) for ${validated} catalog slugs`);
    for (const e of errors.slice(0, 50)) console.error(`  - ${e}`);
    if (errors.length > 50) console.error(`  ... and ${errors.length - 50} more`);
    process.exit(1);
  }

  console.log(`Validation OK: ${validated} slugs across ${files.length} chunk files`);
  console.log(`Overrides: ${Object.keys(overrides).length} priority slugs`);
  console.log('Chunk files:');
  for (const f of files) console.log(`  ${f}`);
}

main();
