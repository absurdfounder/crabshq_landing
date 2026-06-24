'use client';

import type { CSSProperties, ReactNode } from 'react';
import PixelDither from './PixelDither';

export type PixelSurfaceStyle = CSSProperties & Record<`--${string}`, string | number>;

type PixelSurfaceProps = {
  children: ReactNode;
  className?: string;
  surfaceStyle?: PixelSurfaceStyle;
  animated?: boolean;
  dither?: boolean;
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
          <PixelDither />
        </div>
      ) : null}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
