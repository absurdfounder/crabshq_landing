'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const BAYER_4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
] as const;

/** Lime banner tones — matches Ferndesk promo / pixel-surface strips. */
const BANNER_STOPS: ReadonlyArray<{ at: number; color: string }> = [
  { at: 0, color: '#a8d060' },
  { at: 0.35, color: '#8cc352' },
  { at: 0.65, color: '#72b833' },
  { at: 1, color: '#6ba82e' },
];

const GRID = 16;
const CELL_PX = 4;
const CANVAS_PX = GRID * CELL_PX;

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

function paintDither(canvas: HTMLCanvasElement, phase: number, timeMs: number) {
  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) return;

  if (canvas.width !== CANVAS_PX) canvas.width = CANVAS_PX;
  if (canvas.height !== CANVAS_PX) canvas.height = CANVAS_PX;

  const image = ctx.createImageData(CANVAS_PX, CANVAS_PX);
  const { data } = image;
  const bayerShiftX = Math.floor(timeMs * 0.004) % 4;
  const bayerShiftY = Math.floor(timeMs * 0.003) % 4;

  for (let gy = 0; gy < GRID; gy += 1) {
    const gradientT = Math.min(1, Math.max(0, gy / (GRID - 1) + phase));
    const [colorA, colorB, mix] = segmentAt(gradientT, BANNER_STOPS);
    const rgbA = hexToRgb(colorA);
    const rgbB = hexToRgb(colorB);

    for (let gx = 0; gx < GRID; gx += 1) {
      const threshold = BAYER_4[(gy + bayerShiftY) % 4][(gx + bayerShiftX) % 4] / 16;
      const rgb = threshold < mix ? rgbB : rgbA;
      const px = gx * CELL_PX;
      const py = gy * CELL_PX;

      for (let dy = 0; dy < CELL_PX; dy += 1) {
        for (let dx = 0; dx < CELL_PX; dx += 1) {
          const offset = ((py + dy) * CANVAS_PX + (px + dx)) * 4;
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

type PixelDitherProps = {
  className?: string;
};

/** Animated 80×80 bayer dither canvas — scales to fill its container. */
export default function PixelDither({ className = '' }: PixelDitherProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    paintDither(canvas, 0, 0);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduceMotion) return;

    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const phase = Math.sin(elapsed * 0.0005) * 0.04;
      paintDither(canvas, phase, elapsed);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={`pixel-dither ${className}`}
      width={CANVAS_PX}
      height={CANVAS_PX}
      aria-hidden
    />
  );
}
