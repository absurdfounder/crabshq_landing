/**
 * Generate slim ready-made character presets from the Avatar Lab library.
 *
 *   npm run characters:presets
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const libraryPath = join(
  root,
  'vendor/bible-strong-avatar-lab/src/features/studio/defaultStudioDocument.json',
);
const outPath = join(root, 'lib/avatars/characterPresets.json');

const CATEGORY = {
  Strobi: 'soft',
  Freddy: 'character',
  Citrus: 'character',
  Nova: 'simple',
  'Grok bot': 'simple',
  Sunee: 'character',
  Kirby: 'soft',
  Cloudee: 'soft',
  Cubee: 'soft',
  Onee: 'character',
};

const DISPLAY = {
  Nova: {
    id: 'capsule',
    name: 'Capsule',
    blurb: 'Soft pill body — clean and friendly.',
  },
  'Grok bot': {
    id: 'grok',
    name: 'Grok',
    blurb: 'Minimal dark sphere with a bold presence.',
  },
};

const BLURBS = {
  Strobi: 'Friendly sphere — the simplest soft face.',
  Freddy: 'Bear-eared cube character from the library.',
  Citrus: 'Pointed cone with soft morph — citrusy silhouette.',
  Sunee: 'Sunburst character with radiating blobs.',
  Kirby: 'Round body with soft feet bumps.',
  Cloudee: 'Puffy cloud silhouette made of soft spheres.',
  Cubee: 'Soft rounded cube — jelly block energy.',
  Onee: 'Cone character with a playful tilt.',
};

const DEFAULT_EYES = {
  widthLeft: 20,
  widthRight: 20,
  heightLeft: 50,
  heightRight: 50,
  spacing: 35,
  positionXLeft: 0,
  positionXRight: 0,
  positionYLeft: -7,
  positionYRight: -7,
  leftAngle: 0,
  rightAngle: 0,
};

const doc = JSON.parse(readFileSync(libraryPath, 'utf8'));

const presets = doc.library.avatars.map((a) => {
  const override = DISPLAY[a.name] || {};
  const id =
    override.id ||
    a.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  return {
    id,
    name: override.name || a.name,
    blurb: override.blurb || BLURBS[a.name] || `${a.name} silhouette from the character library.`,
    category: CATEGORY[a.name] || 'soft',
    body: a.body,
    eyes: a.eyes,
    defaultColors: a.colors,
  };
});

presets.unshift({
  id: 'mickey',
  name: 'Mickey',
  blurb: 'Classic soft head with ear ellipses — the Disney-ish silhouette.',
  category: 'soft',
  body: {
    primary: { type: 'mickey', width: 220, height: 210, depth: 145, roundness: 1 },
    nodes: [],
  },
  eyes: { ...DEFAULT_EYES },
  defaultColors: { body: '#7ebef0', eyes: '#3f3f46' },
});

presets.push({
  id: 'cylinder',
  name: 'Cylinder',
  blurb: 'Soft upright cylinder — great for utility agents.',
  category: 'simple',
  body: {
    primary: {
      type: 'cylinder',
      width: 220,
      height: 235,
      depth: 200,
      roundness: 0.9,
      morphRoundness: 0.35,
    },
    nodes: [],
  },
  eyes: { ...DEFAULT_EYES },
  defaultColors: { body: '#b49aef', eyes: '#3f3f46' },
});

writeFileSync(outPath, `${JSON.stringify({ version: 1, presets }, null, 2)}\n`);
console.log(`Wrote ${presets.length} presets → ${outPath}`);
