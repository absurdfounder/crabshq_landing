/**
 * Optimized Trooper helmet logomark — WebP at multiple sizes for sharp
 * small/large displays without shipping the full 512px asset everywhere.
 */
export const TROOPER_LOGOMARK = {
  /** Default display asset (512). Prefer this for Next/Image and large UI. */
  webp: '/images/trooper-logomark.webp',
  /** PNG fallback for OG / crawlers that still prefer PNG. */
  png: '/images/trooper-logomark.png',
  w64: '/images/trooper-logomark-64.webp',
  w128: '/images/trooper-logomark-128.webp',
  w256: '/images/trooper-logomark-256.webp',
} as const;

/** Responsive srcset for plain <img> tags. */
export const TROOPER_LOGOMARK_SRCSET =
  `${TROOPER_LOGOMARK.w64} 64w, ${TROOPER_LOGOMARK.w128} 128w, ${TROOPER_LOGOMARK.w256} 256w, ${TROOPER_LOGOMARK.webp} 512w`;

/** Pick the smallest WebP that covers a CSS pixel size at 2× DPR. */
export function trooperLogomarkForSize(cssPx: number): string {
  const need = cssPx * 2;
  if (need <= 64) return TROOPER_LOGOMARK.w64;
  if (need <= 128) return TROOPER_LOGOMARK.w128;
  if (need <= 256) return TROOPER_LOGOMARK.w256;
  return TROOPER_LOGOMARK.webp;
}
