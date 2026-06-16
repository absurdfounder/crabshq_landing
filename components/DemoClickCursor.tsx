'use client';

import { useCallback, useRef, useState, type RefObject } from 'react';
import { DemoCursorGlyph } from '@/components/DemoCursorGlyph';

export type DemoCursorState = {
  x: number;
  y: number;
  visible: boolean;
  clicking: boolean;
};

export const DEMO_CURSOR_SLIDE_MS = 720;
const CLICK_MS = 320;

const INITIAL: DemoCursorState = { x: 32, y: 120, visible: false, clicking: false };

export function useDemoCursor(canvasRef: RefObject<HTMLElement | null>) {
  const [cursor, setCursor] = useState<DemoCursorState>(INITIAL);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pulseClick = useCallback(() => {
    if (clickTimer.current) clearTimeout(clickTimer.current);
    setCursor((c) => ({ ...c, clicking: true }));
    clickTimer.current = setTimeout(() => {
      setCursor((c) => ({ ...c, clicking: false }));
    }, CLICK_MS);
  }, []);

  const resolveTarget = useCallback((selector: string): { x: number; y: number } | null => {
    const root = canvasRef.current;
    if (!root) return null;
    const el = root.querySelector(selector);
    if (!el) return null;
    const rootRect = root.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    return {
      x: rect.left - rootRect.left + rect.width * 0.52,
      y: rect.top - rootRect.top + rect.height * 0.42,
    };
  }, [canvasRef]);

  const goTo = useCallback((selector: string, options?: { click?: boolean }) => {
    const pt = resolveTarget(selector);
    if (!pt) return;
    setCursor((c) => ({ ...c, x: pt.x, y: pt.y, visible: true, clicking: false }));
    if (options?.click) {
      setTimeout(() => pulseClick(), DEMO_CURSOR_SLIDE_MS);
    }
  }, [resolveTarget, pulseClick]);

  const hide = useCallback(() => {
    if (clickTimer.current) clearTimeout(clickTimer.current);
    setCursor(INITIAL);
  }, []);

  return { cursor, goTo, hide };
}

export function DemoClickCursor({ state }: { state: DemoCursorState }) {
  const { x, y, visible, clicking } = state;

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        left: x,
        top: y,
        zIndex: 200,
        pointerEvents: 'none',
        opacity: visible ? 1 : 0,
        transition: `left ${DEMO_CURSOR_SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1), top ${DEMO_CURSOR_SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease`,
      }}
    >
      <DemoCursorGlyph clicking={clicking} />
    </div>
  );
}
