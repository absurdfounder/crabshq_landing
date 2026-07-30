import React from 'react';
import type { Trooper } from '@/lib/troopers';

type TrooperAvatarProps = {
  trooper: Trooper;
  /** Rendered size in px. Inline-in-a-sentence use wants ~26–34. */
  size?: number;
  /** Draw the tinted plate behind the helmet. Off for dense inline runs. */
  plate?: boolean;
  className?: string;
};

/**
 * Pixel-art trooper helmet, tinted per trooper.
 *
 * Drawn as unit rects on a 16×16 grid with `shapeRendering="crispEdges"` so it
 * stays hard-edged at any size — no bitmap assets, a few hundred bytes, and it
 * matches the pixel language already used by PixelButton and the silkscreen
 * kickers. Purely decorative: the name always appears as real text beside it.
 */
export default function TrooperAvatar({
  trooper,
  size = 32,
  plate = true,
  className = '',
}: TrooperAvatarProps) {
  const { accent, accentDark, tint } = trooper;

  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
      className={`shrink-0 ${className}`}
      style={{ display: 'block' }}
    >
      {plate && <rect x="0" y="0" width="16" height="16" fill={tint} />}

      {/* dome */}
      <rect x="5" y="2" width="6" height="1" fill={accent} />
      <rect x="4" y="3" width="8" height="1" fill={accent} />
      <rect x="3" y="4" width="10" height="2" fill={accent} />

      {/* visor */}
      <rect x="4" y="6" width="8" height="3" fill="#1a1a1a" />
      <rect x="5" y="6" width="2" height="1" fill={accent} opacity="0.55" />

      {/* jaw + neck */}
      <rect x="3" y="9" width="10" height="1" fill={accent} />
      <rect x="6" y="10" width="4" height="1" fill={accentDark} />

      {/* shoulders */}
      <rect x="4" y="11" width="8" height="1" fill={accentDark} />
      <rect x="2" y="12" width="12" height="2" fill={accentDark} />
      <rect x="1" y="14" width="14" height="2" fill={accentDark} />
    </svg>
  );
}
