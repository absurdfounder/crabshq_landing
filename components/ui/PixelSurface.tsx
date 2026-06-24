'use client';

import type { CSSProperties, ReactNode } from 'react';
import PixelDither, { BANNER_DITHER_STOPS, HERO_DITHER_STOPS } from './PixelDither';

export type PixelSurfaceStyle = CSSProperties & Record<`--${string}`, string | number>;

export { BANNER_DITHER_STOPS, HERO_DITHER_STOPS };

type PixelSurfaceProps = {
  children: ReactNode;
  className?: string;
  surfaceStyle?: PixelSurfaceStyle;
  animated?: boolean;
  dither?: boolean;
  ditherStops?: ReadonlyArray<{ at: number; color: string }>;
  ditherOrientation?: 'vertical' | 'horizontal';
};

/**
 * Ferndesk-style pixel landscape background.
 * Static SVG tile layer + optional animated dither canvas overlay.
 */
export default function PixelSurface({
  children,
  className = '',
  surfaceStyle,
  animated = false,
  dither = true,
  ditherStops = BANNER_DITHER_STOPS,
  ditherOrientation = 'vertical',
}: PixelSurfaceProps) {
  return (
    <div
      className={`pixel-surface relative overflow-hidden ${animated ? 'pixel-surface--animated' : ''} ${className}`}
      style={surfaceStyle}
    >
      {animated ? (
        <div className="pixel-surface__clouds pointer-events-none absolute inset-0" aria-hidden />
      ) : null}

      {dither ? (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <PixelDither stops={ditherStops} orientation={ditherOrientation} />
        </div>
      ) : null}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
