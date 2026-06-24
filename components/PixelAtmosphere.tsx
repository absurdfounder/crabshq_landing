'use client';

import type { ReactNode } from 'react';

type PixelAtmosphereProps = {
  children: ReactNode;
  className?: string;
  /** Pixel grid + scanline overlay */
  flicker?: boolean;
  /** Pixel forest / camo wash behind content */
  camo?: boolean;
};

/**
 * Army pixel wrapper — optional camo wash + flickering pixel grid overlay.
 */
export function PixelAtmosphere({
  children,
  className = '',
  flicker = true,
  camo = false,
}: PixelAtmosphereProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {camo && (
        <div
          className="pointer-events-none absolute inset-0 z-0 pixel-camo-wash"
          aria-hidden
        />
      )}
      {flicker && (
        <div
          className="pointer-events-none absolute inset-0 z-[1] pixel-flicker-grid"
          aria-hidden
        />
      )}
      <div className="relative z-[2]">{children}</div>
    </div>
  );
}

/** Live ops status — `● DEPLOYED` */
export function ArmyStatusBadge({
  label = 'Deployed',
  className = '',
}: {
  label?: string;
  className?: string;
}) {
  return (
    <span className={`army-status-badge ${className}`}>
      <span className="army-status-badge__dot" aria-hidden />
      {label}
    </span>
  );
}
/** Inline mission tag — `[05] WEEKS-LONG RUNS` army briefing style */
export function PixelMissionTag({
  index,
  label,
  className = '',
}: {
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <span className={`army-mission-tag ${className}`}>
      <span className="text-ink-faint">[{index}]</span>
      <span className="army-mission-tag__sep" aria-hidden />
      {label}
    </span>
  );
}
