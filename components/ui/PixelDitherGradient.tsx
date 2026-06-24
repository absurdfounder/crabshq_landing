'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const BAYER_4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
] as const;

/** Hero band — sky → cream → lime. */
const HERO_GRADIENT_STOPS: ReadonlyArray<{ at: number; color: string }> = [
  { at: 0, color: '#9ec0d8' },
  { at: 0.2, color: '#b8d4e8' },
  { at: 0.36, color: '#e4e8cc' },
  { at: 0.5, color: '#ebe8d0' },
  { at: 0.64, color: '#d8e8b0' },
  { at: 0.8, color: '#b8d878' },
  { at: 1, color: '#98c858' },
];

/** Feature panels — warm cream → sage (no sky-blue band). */
const WARM_GRADIENT_STOPS: ReadonlyArray<{ at: number; color: string }> = [
  { at: 0, color: '#f0efe6' },
  { at: 0.3, color: '#ebe8d0' },
  { at: 0.55, color: '#dce8b8' },
  { at: 0.78, color: '#c4d890' },
  { at: 1, color: '#a8c868' },
];

const VARIANTS = {
  hero: {
    stops: HERO_GRADIENT_STOPS,
    fallback: 'linear-gradient(180deg, #9ec0d8 0%, #ebe8d0 48%, #98c858 100%)',
  },
  warm: {
    stops: WARM_GRADIENT_STOPS,
    fallback: 'linear-gradient(180deg, #f0efe6 0%, #ebe8d0 42%, #a8c868 100%)',
  },
} as const;

const GRID_W = 200;
const GRID_H = 80;
const CELL_PX = 4;

function hexToRgb(hex: string) {
  const value = parseInt(hex.slice(1), 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function segmentAt(
  t: number,
  stops: ReadonlyArray<{ at: number; color: string }>,
): [string, string, number] {
  const clamped = Math.min(1, Math.max(0, t));

  for (let index = 0; index < stops.length - 1; index += 1) {
    const start = stops[index];
    const end = stops[index + 1];
    if (clamped <= end.at || index === stops.length - 2) {
      const span = end.at - start.at || 1;
      const local = (clamped - start.at) / span;
      return [start.color, end.color, local];
    }
  }

  const last = stops[stops.length - 1];
  return [last.color, last.color, 0];
}

function paintDither(
  canvas: HTMLCanvasElement,
  phase: number,
  timeMs: number,
  stops: ReadonlyArray<{ at: number; color: string }>,
) {
  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) return;

  const width = GRID_W * CELL_PX;
  const height = GRID_H * CELL_PX;
  if (canvas.width !== width) canvas.width = width;
  if (canvas.height !== height) canvas.height = height;

  const image = ctx.createImageData(width, height);
  const { data } = image;
  const bayerShiftX = Math.floor(timeMs * 0.004) % 4;
  const bayerShiftY = Math.floor(timeMs * 0.003) % 4;

  for (let gy = 0; gy < GRID_H; gy += 1) {
    const gradientT = Math.min(1, Math.max(0, gy / (GRID_H - 1) + phase));
    const [colorA, colorB, mix] = segmentAt(gradientT, stops);
    const rgbA = hexToRgb(colorA);
    const rgbB = hexToRgb(colorB);

    for (let gx = 0; gx < GRID_W; gx += 1) {
      const threshold = BAYER_4[(gy + bayerShiftY) % 4][(gx + bayerShiftX) % 4] / 16;
      const rgb = threshold < mix ? rgbB : rgbA;
      const px = gx * CELL_PX;
      const py = gy * CELL_PX;

      for (let dy = 0; dy < CELL_PX; dy += 1) {
        for (let dx = 0; dx < CELL_PX; dx += 1) {
          const offset = ((py + dy) * width + (px + dx)) * 4;
          data[offset] = rgb.r;
          data[offset + 1] = rgb.g;
          data[offset + 2] = rgb.b;
          data[offset + 3] = 255;
        }
      }
    }
  }

  ctx.putImageData(image, 0, 0);
}

type PixelDitherGradientProps = {
  className?: string;
  variant?: keyof typeof VARIANTS;
};

export default function PixelDitherGradient({
  className = '',
  variant = 'hero',
}: PixelDitherGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();
  const { stops, fallback } = VARIANTS[variant];

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    paintDither(canvas, 0, 0, stops);
  }, [stops]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduceMotion) return;

    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const phase = Math.sin(elapsed * 0.0005) * 0.04;
      paintDither(canvas, phase, elapsed, stops);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion, stops]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
      style={{ background: fallback }}
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        style={{
          imageRendering: 'pixelated',
          objectFit: 'cover',
        }}
      />
    </div>
  );
}
