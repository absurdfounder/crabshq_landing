'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/** 4×4 Bayer matrix for ordered dithering (matches classic pixel-gradient look). */
const BAYER_4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
] as const;

/** Trooper palette — warm cream top → olive green bottom (reference layout). */
const GRADIENT_STOPS: ReadonlyArray<{ at: number; color: string }> = [
  { at: 0, color: '#FAF9F6' },
  { at: 0.18, color: '#f0f5e6' },
  { at: 0.34, color: '#ddebc8' },
  { at: 0.5, color: '#ddebc8' },
  { at: 0.66, color: '#c4d9a0' },
  { at: 0.82, color: '#9db866' },
  { at: 1, color: '#6d9220' },
];

const CANVAS_W = 96;
const CANVAS_H = 192;

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

  if (canvas.width !== CANVAS_W) canvas.width = CANVAS_W;
  if (canvas.height !== CANVAS_H) canvas.height = CANVAS_H;

  const image = ctx.createImageData(CANVAS_W, CANVAS_H);
  const { data } = image;
  const bayerShiftX = Math.floor(timeMs * 0.007) % 4;
  const bayerShiftY = Math.floor(timeMs * 0.005) % 4;

  for (let y = 0; y < CANVAS_H; y += 1) {
    const gradientT = Math.min(1, Math.max(0, y / (CANVAS_H - 1) + phase));
    const [colorA, colorB, mix] = segmentAt(gradientT);
    const rgbA = hexToRgb(colorA);
    const rgbB = hexToRgb(colorB);

    for (let x = 0; x < CANVAS_W; x += 1) {
      const threshold = BAYER_4[(y + bayerShiftY) % 4][(x + bayerShiftX) % 4] / 16;
      const rgb = threshold < mix ? rgbB : rgbA;
      const offset = (y * CANVAS_W + x) * 4;
      data[offset] = rgb.r;
      data[offset + 1] = rgb.g;
      data[offset + 2] = rgb.b;
      data[offset + 3] = 255;
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
      const phase = Math.sin(elapsed * 0.00065) * 0.09;
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
