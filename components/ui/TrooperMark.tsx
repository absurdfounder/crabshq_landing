'use client';

import {
  CAST_ASSET_REV,
  CAST_COLORS,
  CAST_POSE,
  CAST_SHAPE_META,
  type CastHandle,
} from '@/lib/avatars/castColors';
import { TROOPERS, type Trooper } from '@/lib/troopers';

type TrooperMarkProps = {
  trooper: Trooper;
  /** Rendered size in px. */
  size?: number;
  className?: string;
};

/** Bust browser + CDN cache when colors, pose, OR silhouette changes. */
function castSrc(handle: string) {
  if (!(handle in CAST_COLORS)) return null;
  const c = CAST_COLORS[handle as CastHandle];
  const pose = CAST_POSE[handle as CastHandle] ?? 'neutral';
  const shape = CAST_SHAPE_META[handle as CastHandle] ?? '';
  const v = `${CAST_ASSET_REV}-${c.body.slice(1)}-${pose}-${shape}`.replace(/[^a-z0-9-]+/gi, '');
  return `/images/cast/${handle}.svg?v=${v}`;
}

/**
 * Static cast snapshot — SVG exported from the character builder
 * (`npm run characters:export`). Not the old identity blobs.
 */
export default function TrooperMark({
  trooper,
  size = 28,
  className = '',
}: TrooperMarkProps) {
  const src = castSrc(trooper.handle);

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- static cast SVG snapshot
      <img
        src={src}
        alt=""
        width={size}
        height={size}
        draggable={false}
        className={`block shrink-0 object-contain ${className}`}
        style={{ width: size, height: size }}
        aria-hidden
      />
    );
  }

  // Unknown handle — soft circle in accent, never the old blob silhouettes.
  const fill =
    (trooper.handle in CAST_COLORS
      ? CAST_COLORS[trooper.handle as CastHandle].body
      : trooper.accent) || '#737373';
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      className={`block shrink-0 ${className}`}
      aria-hidden
    >
      <circle cx="20" cy="20" r="18" fill={fill} />
      <circle cx="14" cy="17" r="2.2" fill="#1c1917" />
      <circle cx="26" cy="17" r="2.2" fill="#1c1917" />
    </svg>
  );
}

export function TrooperMarkRow({
  size = 28,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`} aria-hidden>
      {TROOPERS.map((t) => (
        <TrooperMark key={t.handle} trooper={t} size={size} />
      ))}
    </div>
  );
}
