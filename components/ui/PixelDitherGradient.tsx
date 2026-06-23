'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/** 4×4 Bayer ordered dither — same family as Bento / reference pixel gradient. */
const BAYER_4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
] as const;

/**
 * Reference layout: pale sky top → cream mid → light lime bottom.
 * Trooper tints: cool mist blue, trooper-50/100/200/300 (no dark olive).
 */
const GRADIENT_STOPS: ReadonlyArray<{ at: number; color: string }> = [
  { at: 0, color: '#c8dce8' },
  { at: 0.16, color: '#d8e8f0' },
  { at: 0.32, color: '#eef0dc' },
  { at: 0.46, color: '#f0f5e6' },
  { at: 0.58, color: '#eef2dc' },
  { at: 0.72, color: '#ddebc8' },
  { at: 0.86, color: '#c4d9a0' },
  { at: 1, color: '#b0d080' },
];

/** Logical dither grid — each cell is drawn as a chunky square (reference ~6–8px). */
const GRID_W = 40;
const GRID_H = 80;
const CELL_PX = 8;

function hexToRgb(hex: string) {
  const value = parseInt(hex.slice(1), 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function segmentAt(t: number): [string, string, number] {
  const clamped = Math.min(1, Math.max(0, t));

  for (let index = 0; index < GRADIENT_STOPS.length - 1; index += 1) {
    const start = GRADIENT_STOPS[index];
    const end = GRADIENT_STOPS[index + 1];
    if (clamped <= end.at || index === GRADIENT_STOPS.length - 2) {
      const span = end.at - start.at || 1;
      const local = (clamped - start.at) / span;
      return [start.color, end.color, local];
    }
  }

  const last = GRADIENT_STOPS[GRADIENT_STOPS.length - 1];
  return [last.color, last.color, 0];
}

function paintDither(canvas: HTMLCanvasElement, phase: number, timeMs: number) {
  const ctx = canvas.getContext('2d');
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
    const [colorA, colorB, mix] = segmentAt(gradientT);
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
};

export default function PixelDitherGradient({ className = '' }: PixelDitherGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (reduceMotion) {
      paintDither(canvas, 0, 0);
      return;
    }

    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const phase = Math.sin(elapsed * 0.0005) * 0.06;
      paintDither(canvas, phase, elapsed);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ imageRendering: 'pixelated' }}
    />
  );
}
