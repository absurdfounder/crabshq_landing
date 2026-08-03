'use client';

import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import { DemoCursorGlyph } from './DemoCursorGlyph';
import {
  CURSOR_CLICK_MS, CURSOR_SETTLE_MS, EASE_CURSOR, cursorTravelMs,
} from '../lib/demoMotion';
import { rectInCanvas } from '../lib/demoGeometry';

export type DemoCursorState = {
  x: number;
  y: number;
  visible: boolean;
  clicking: boolean;
  dragging: boolean;
  /** Travel time for the current position change — distance-proportional. */
  travelMs: number;
};

const INITIAL: DemoCursorState = { x: 32, y: 120, visible: false, clicking: false, dragging: false, travelMs: 0 };

/** Idle wander so a dwelling cursor never looks frozen. */
const DRIFT_PX = 1.5;
const DRIFT_PERIOD_MS = 2600;

export type CursorGoOptions = {
  click?: boolean;
  /** Animate a text-selection drag from this selector to the target selector. */
  dragFrom?: string;
  /** Suppress the click ripple — used when the DOM already changed. */
  silent?: boolean;
};

export function useDemoCursor(
  canvasRef: RefObject<HTMLElement | null>,
  { reducedMotion = false }: { reducedMotion?: boolean } = {},
) {
  const [cursor, setCursor] = useState<DemoCursorState>(INITIAL);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const anchor = useRef<{ x: number; y: number } | null>(null);
  const hovered = useRef<Element | null>(null);
  const posRef = useRef<{ x: number; y: number }>({ x: INITIAL.x, y: INITIAL.y });
  /** In-flight goTo resolvers — clearTimers must settle them or the reel hangs. */
  const pendingResolvers = useRef<Array<() => void>>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    const resolvers = pendingResolvers.current.splice(0);
    resolvers.forEach((resolve) => resolve());
  }, []);

  const later = useCallback((fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
    return t;
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  /**
   * Applies the target element's real hover styling as the cursor passes over
   * it. Without this the ghost cursor floats above a completely inert UI.
   */
  const setHover = useCallback((el: Element | null) => {
    if (hovered.current === el) return;
    hovered.current?.removeAttribute('data-demo-hover');
    if (el) el.setAttribute('data-demo-hover', 'true');
    hovered.current = el;
  }, []);

  const resolveTarget = useCallback((
    selector: string,
    anchorMode: 'start' | 'center' | 'end' = 'center',
  ): { x: number; y: number; el: Element } | null => {
    const root = canvasRef.current;
    if (!root) return null;
    const el = root.querySelector(selector);
    if (!el) return null;
    // Canvas coordinates, not screen pixels — the canvas is CSS-scaled.
    const rect = rectInCanvas(root, el);
    const yRatio = anchorMode === 'start' ? 0.28 : anchorMode === 'end' ? 0.72 : 0.42;
    const xRatio = anchorMode === 'start' ? 0.18 : anchorMode === 'end' ? 0.82 : 0.52;
    return { x: rect.x + rect.width * xRatio, y: rect.y + rect.height * yRatio, el };
  }, [canvasRef]);

  const moveTo = useCallback((x: number, y: number, el: Element | null): number => {
    const from = posRef.current;
    const dist = Math.hypot(x - from.x, y - from.y);
    const travelMs = reducedMotion ? 0 : cursorTravelMs(dist);
    posRef.current = { x, y };
    anchor.current = { x, y };
    setCursor((c) => ({ ...c, x, y, visible: true, clicking: false, dragging: false, travelMs }));
    later(() => setHover(el), travelMs);
    return travelMs;
  }, [later, reducedMotion, setHover]);

  const pulseClick = useCallback(() => {
    setCursor((c) => ({ ...c, clicking: true, dragging: false }));
    later(() => setCursor((c) => ({ ...c, clicking: false })), CURSOR_CLICK_MS);
  }, [later]);

  const trackPromise = useCallback((run: (resolve: () => void) => void): Promise<void> => {
    return new Promise((resolve) => {
      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        pendingResolvers.current = pendingResolvers.current.filter((r) => r !== finish);
        resolve();
      };
      pendingResolvers.current.push(finish);
      run(finish);
    });
  }, []);

  /**
   * Moves the cursor and resolves when it has arrived (and clicked, if asked).
   * Callers await this so the state change lands *after* the click, instead of
   * the DOM mutating while the cursor is still crossing the screen.
   */
  const goTo = useCallback((selector: string, options?: CursorGoOptions): Promise<void> => {
    if (options?.dragFrom) {
      const from = resolveTarget(options.dragFrom, 'start');
      const to = resolveTarget(selector, 'end');
      if (!from || !to) return Promise.resolve();
      return trackPromise((resolve) => {
        const travelIn = moveTo(from.x, from.y, from.el);
        later(() => {
          setCursor((c) => ({ ...c, clicking: true }));
          later(() => {
            setCursor((c) => ({ ...c, clicking: false, dragging: true }));
            const travel = reducedMotion ? 0 : cursorTravelMs(Math.hypot(to.x - from.x, to.y - from.y));
            posRef.current = { x: to.x, y: to.y };
            anchor.current = { x: to.x, y: to.y };
            setCursor((c) => ({ ...c, x: to.x, y: to.y, dragging: true, travelMs: travel }));
            later(() => {
              setCursor((c) => ({ ...c, dragging: false }));
              setHover(to.el);
              resolve();
            }, travel);
          }, 90);
        }, travelIn + CURSOR_SETTLE_MS);
      });
    }

    const pt = resolveTarget(selector);
    if (!pt) return Promise.resolve();
    return trackPromise((resolve) => {
      const travelMs = moveTo(pt.x, pt.y, pt.el);
      later(() => {
        if (options?.click && !options.silent) pulseClick();
        resolve();
      }, travelMs + CURSOR_SETTLE_MS);
    });
  }, [later, moveTo, pulseClick, reducedMotion, resolveTarget, setHover, trackPromise]);

  /** Park the pointer out of the way — a hand leaving the mouse to type. */
  const rest = useCallback(() => {
    clearTimers();
    anchor.current = null;
    setHover(null);
    setCursor((c) => ({ ...c, visible: false, clicking: false, dragging: false }));
  }, [clearTimers, setHover]);

  const hide = useCallback(() => {
    clearTimers();
    anchor.current = null;
    setHover(null);
    posRef.current = { x: INITIAL.x, y: INITIAL.y };
    setCursor(INITIAL);
  }, [clearTimers, setHover]);

  // Idle drift — a couple of pixels of sway while the cursor dwells.
  useEffect(() => {
    if (reducedMotion) return;
    let raf = 0;
    const loop = () => {
      const base = anchor.current;
      if (base) {
        const t = (performance.now() % DRIFT_PERIOD_MS) / DRIFT_PERIOD_MS * Math.PI * 2;
        setCursor((c) => {
          if (c.dragging || !c.visible) return c;
          const x = base.x + Math.sin(t) * DRIFT_PX;
          const y = base.y + Math.cos(t * 0.7) * DRIFT_PX;
          if (Math.abs(c.x - x) < 0.05 && Math.abs(c.y - y) < 0.05) return c;
          return { ...c, x, y };
        });
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  return { cursor, goTo, hide, rest, clearTimers };
}

export function DemoClickCursor({ state, dimmed }: { state: DemoCursorState; dimmed?: boolean }) {
  const { x, y, visible, clicking, dragging, travelMs } = state;
  const motion = travelMs > 0
    ? `left ${travelMs}ms ${EASE_CURSOR}, top ${travelMs}ms ${EASE_CURSOR}, opacity 0.3s ease`
    : 'opacity 0.3s ease';

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        left: x,
        top: y,
        zIndex: 200,
        pointerEvents: 'none',
        opacity: visible && !dimmed ? 1 : 0,
        transition: motion,
      }}
    >
      <DemoCursorGlyph clicking={clicking || dragging} />
    </div>
  );
}
