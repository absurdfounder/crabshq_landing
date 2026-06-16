'use client';

import { useCallback, useRef, useState, type RefObject } from 'react';

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
      <div
        style={{
          transform: clicking ? 'scale(0.9) translateY(1px)' : 'scale(1)',
          transition: 'transform 0.14s cubic-bezier(0.22, 1, 0.36, 1)',
          transformOrigin: '2px 2px',
        }}
      >
        <svg
          width="26"
          height="30"
          viewBox="0 0 26 30"
          fill="none"
          style={{ display: 'block', filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.28))' }}
        >
          <path
            d="M6 4 L6 24 L11 19 L14.5 26.5 L17.5 25 L14 18 L20.5 17 Z"
            fill="#3f6b00"
            stroke="#ffffff"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {clicking && (
        <span
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 22,
            height: 22,
            borderRadius: '50%',
            border: '2px solid rgba(63,107,0,0.85)',
            animation: 'demoCursorRipple 0.42s cubic-bezier(0.22, 1, 0.36, 1) forwards',
          }}
        />
      )}
    </div>
  );
}
