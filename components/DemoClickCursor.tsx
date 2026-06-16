'use client';

import { useCallback, useRef, useState, type RefObject } from 'react';
import { DemoCursorGlyph } from '@/components/DemoCursorGlyph';

export type DemoCursorState = {
  x: number;
  y: number;
  visible: boolean;
  clicking: boolean;
  dragging: boolean;
};

export const DEMO_CURSOR_SLIDE_MS = 720;
const CLICK_MS = 320;

const INITIAL: DemoCursorState = { x: 32, y: 120, visible: false, clicking: false, dragging: false };

export type CursorGoOptions = {
  click?: boolean;
  /** Animate a text-selection drag from this selector to the target selector */
  dragFrom?: string;
};

export function useDemoCursor(canvasRef: RefObject<HTMLElement | null>) {
  const [cursor, setCursor] = useState<DemoCursorState>(INITIAL);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pulseClick = useCallback(() => {
    if (clickTimer.current) clearTimeout(clickTimer.current);
    setCursor((c) => ({ ...c, clicking: true, dragging: false }));
    clickTimer.current = setTimeout(() => {
      setCursor((c) => ({ ...c, clicking: false }));
    }, CLICK_MS);
  }, []);

  const resolveTarget = useCallback((selector: string, anchor: 'start' | 'center' | 'end' = 'center'): { x: number; y: number } | null => {
    const root = canvasRef.current;
    if (!root) return null;
    const el = root.querySelector(selector);
    if (!el) return null;
    const rootRect = root.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    const yRatio = anchor === 'start' ? 0.28 : anchor === 'end' ? 0.72 : 0.42;
    const xRatio = anchor === 'start' ? 0.18 : anchor === 'end' ? 0.82 : 0.52;
    return {
      x: rect.left - rootRect.left + rect.width * xRatio,
      y: rect.top - rootRect.top + rect.height * yRatio,
    };
  }, [canvasRef]);

  const goTo = useCallback((selector: string, options?: CursorGoOptions) => {
    if (options?.dragFrom) {
      const from = resolveTarget(options.dragFrom, 'start');
      const to = resolveTarget(selector, 'end');
      if (!from || !to) return;
      setCursor((c) => ({ ...c, x: from.x, y: from.y, visible: true, clicking: true, dragging: false }));
      setTimeout(() => {
        setCursor((c) => ({ ...c, clicking: false, dragging: true }));
        setTimeout(() => {
          setCursor((c) => ({ ...c, x: to.x, y: to.y, dragging: true }));
          setTimeout(() => {
            setCursor((c) => ({ ...c, dragging: false }));
          }, DEMO_CURSOR_SLIDE_MS);
        }, 90);
      }, DEMO_CURSOR_SLIDE_MS);
      return;
    }

    const pt = resolveTarget(selector);
    if (!pt) return;
    setCursor((c) => ({ ...c, x: pt.x, y: pt.y, visible: true, clicking: false, dragging: false }));
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
  const { x, y, visible, clicking, dragging } = state;

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
        transition: dragging
          ? `left ${DEMO_CURSOR_SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1), top ${DEMO_CURSOR_SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease`
          : `left ${DEMO_CURSOR_SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1), top ${DEMO_CURSOR_SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease`,
      }}
    >
      <DemoCursorGlyph clicking={clicking || dragging} />
    </div>
  );
}
