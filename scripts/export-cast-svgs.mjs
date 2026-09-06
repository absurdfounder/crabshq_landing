/**
 * Export static cast SVGs from Bible Strong avatar definitions.
 *
 * Soft / Disney-ish silhouettes from the lab library + built-in `mickey` type.
 * No Sunee (sun), no Freddy (bear ears), no pointy cone/diamond/cursor.
 *
 *   npm run characters:export
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderAvatarDefinition, validateAvatarDefinition } from '@bible-strong/avatar-core';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public/images/cast');
const libraryPath = join(
  root,
  'vendor/bible-strong-avatar-lab/src/features/studio/defaultStudioDocument.json',
);

/** Soft jelly bodies + dark-gray eyes for contrast on pastel fills. */
export const CAST_COLORS = {
  rex: { body: '#6bcf8e', eyes: '#3f3f46' },
  nova: { body: '#7ebef0', eyes: '#3f3f46' },
  scout: { body: '#f0b45c', eyes: '#3f3f46' },
  pip: { body: '#b49aef', eyes: '#3f3f46' },
  wren: { body: '#f0a0bc', eyes: '#3f3f46' },
};

/** Signature freeze-frame — different glance / tilt each. */
const CAST_POSE = {
  rex: 'small-attentive',
  nova: 'curious-left',
  scout: 'playful-right',
  pip: 'downward-gaze',
  wren: 'upward-side-glance',
};

/**
 * Cast bodies.
 * - `library`: named preset from defaultStudioDocument (Cloudee, Kirby, Cubee, …)
 * - `body`: inline primary + nodes (real Mickey surface type — not Freddy)
 */
const CAST_SHAPE = {
  // Soft rounded cube (Cubee)
  rex: { library: 'Cubee' },
  // Built-in Mickey head + ear ellipses (NOT the Freddy bear preset)
  nova: {
    body: {
      primary: { type: 'mickey', width: 220, height: 210, depth: 145, roundness: 1 },
      nodes: [],
    },
  },
  // Cloud (Cloudee)
  scout: { library: 'Cloudee' },
  // Soft cylinder
  pip: {
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
  },
  // Kirby feet bumps — soft sphere, not pointy
  wren: { library: 'Kirby' },
};

/** Bump when silhouettes change so TrooperMark cache-busts even if colors stay put. */
const CAST_ASSET_REV = 'mickey-cloud-v2';

const HANDLES = Object.keys(CAST_COLORS);

function escapeXml(value) {
  return value.replace(/[&<>"]/g, (ch) => {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
    return map[ch] ?? ch;
  });
}

function pathEl(d, fill, opacity = 1) {
  if (!d) return '';
  const op = opacity === 1 ? '' : ` opacity="${opacity}"`;
  return `<path d="${escapeXml(d)}" fill="${fill}"${op}/>`;
}

/** Schema only allows surface / position / rotation on nodes. */
function sanitizeBody(body) {
  return {
    primary: { ...body.primary },
    nodes: (body.nodes ?? []).map((node) => ({
      surface: { ...node.surface },
      position: [...node.position],
      rotation: [...node.rotation],
    })),
  };
}

function serializeSnapshot(handle, scene, colors) {
  const clipId = `cast-${handle}-clip`;
  const glossId = `cast-${handle}-gloss`;
  const backs = scene.geometry.backPaths.filter(Boolean);
  const fronts = scene.geometry.frontPaths.filter(Boolean);
  const leftOp = scene.geometry.leftVisible ? 1 : 0;
  const rightOp = scene.geometry.rightVisible ? 1 : 0;

  const body = [
    ...backs.map((d) => pathEl(d, colors.body)),
    pathEl(scene.geometry.headPath, colors.body),
    `<ellipse cx="-42" cy="-58" rx="54" ry="42" fill="url(#${glossId})" pointer-events="none"/>`,
    `<g clip-path="url(#${clipId})">${pathEl(scene.geometry.leftPath, colors.eyes, leftOp)}${pathEl(scene.geometry.rightPath, colors.eyes, rightOp)}</g>`,
    ...fronts.map((d) => pathEl(d, colors.body)),
  ].join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-150 -150 300 300" width="300" height="300" role="img" aria-label="${handle}">
  <defs>
    <clipPath id="${clipId}"><path d="${escapeXml(scene.geometry.headPath)}"/></clipPath>
    <radialGradient id="${glossId}" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.5"/>
      <stop offset="55%" stop-color="#ffffff" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  ${body}
</svg>
`;
}

const library = JSON.parse(readFileSync(libraryPath, 'utf8'));
const byName = new Map(library.library.avatars.map((a) => [a.name, a]));

mkdirSync(outDir, { recursive: true });

const shapeMeta = {};

for (const handle of HANDLES) {
  const defPath = join(root, `lib/avatars/${handle}.avatar.json`);
  const def = JSON.parse(readFileSync(defPath, 'utf8'));
  const colors = CAST_COLORS[handle];
  const pose = CAST_POSE[handle];
  const shape = CAST_SHAPE[handle];

  let body;
  let label;
  if (shape.library) {
    const preset = byName.get(shape.library);
    if (!preset) throw new Error(`Missing library preset: ${shape.library}`);
    body = sanitizeBody(preset.body);
    label = shape.library;
  } else {
    body = sanitizeBody(shape.body);
    label = body.primary.type;
  }

  def.colors = { body: colors.body, eyes: colors.eyes };
  def.body = body;
  shapeMeta[handle] = `${label}:${body.primary.type}:${body.nodes.length}`;

  if (!def.expressions[pose]) {
    throw new Error(`${handle}: missing expression '${pose}'`);
  }

  const check = validateAvatarDefinition(def);
  if (!check.ok) {
    throw new Error(
      `${handle}: invalid definition — ${JSON.stringify(check.errors?.[0] ?? check)}`,
    );
  }

  writeFileSync(defPath, `${JSON.stringify(def, null, 2)}\n`);

  const scene = renderAvatarDefinition(def, pose);
  scene.colors = colors;
  writeFileSync(join(outDir, `${handle}.svg`), serializeSnapshot(handle, scene, colors));
  console.log(
    `wrote ${handle}.svg  ${label} (${body.primary.type}+${body.nodes.length}nodes)  ${pose}  eyes=${colors.eyes}`,
  );
}

writeFileSync(
  join(root, 'lib/avatars/castColors.ts'),
  `/** Paper-friendly cast fills — kept in sync by scripts/export-cast-svgs.mjs */
export const CAST_COLORS = ${JSON.stringify(CAST_COLORS, null, 2)} as const
export const CAST_POSE = ${JSON.stringify(CAST_POSE, null, 2)} as const
/** Silhouette fingerprint — changes when body shapes change (not just colors). */
export const CAST_SHAPE_META = ${JSON.stringify(shapeMeta, null, 2)} as const
export const CAST_ASSET_REV = ${JSON.stringify(CAST_ASSET_REV)} as const
export type CastHandle = keyof typeof CAST_COLORS
`,
);

console.log('updated lib/avatars/*.avatar.json + castColors.ts');
