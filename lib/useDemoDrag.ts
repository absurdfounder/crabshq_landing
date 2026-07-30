'use client';

import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import type { DemoColumnId } from '@/components/demoTheme';
import type { DemoKanbanTask } from '@/lib/demoScenarios/types';
import { DRAG, cursorTravelMs } from '@/lib/demoMotion';
import { pointInCanvas, rectInCanvas, type CanvasPoint } from '@/lib/demoGeometry';

/**
 * Card drag choreography shared by the script and the visitor.
 *
 * The reel used to move cards by flipping `task.col`, so a card vanished from
 * one column and reappeared in another. Here a card lifts, flies under the
 * pointer with the destination column lit up, and settles — the same three
 * beats the real board produces through dnd-kit's `DragOverlay`.
 */

export type DemoDragState = {
  task: DemoKanbanTask;
  x: number;
  y: number;
  width: number;
  /** Transition time for the current position change; 0 while pointer-tracked. */
  animateMs: number;
};

const COLUMN_IDS: DemoColumnId[] = ['inbox', 'in_progress', 'review', 'done'];

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useDemoDrag({
  canvasRef,
  reducedMotion,
  onDrop,
}: {
  canvasRef: RefObject<HTMLElement | null>;
  reducedMotion: boolean;
  onDrop: (taskId: number, col: DemoColumnId) => void;
}) {
  const [drag, setDrag] = useState<DemoDragState | null>(null);
  const [overCol, setOverCol] = useState<DemoColumnId | null>(null);
  const userDragRef = useRef<{ task: DemoKanbanTask; grabX: number; grabY: number; width: number } | null>(null);
  const cancelled = useRef(false);

  // Reset on mount, not just on unmount: StrictMode's mount/unmount/mount cycle
  // would otherwise leave the flag latched and abort every drag mid-flight.
  useEffect(() => {
    cancelled.current = false;
    return () => { cancelled.current = true; };
  }, []);

  const cardRect = useCallback((taskId: number) => {
    const root = canvasRef.current;
    if (!root) return null;
    const el = root.querySelector(`[data-demo-target="task-card"][data-task-id="${taskId}"]`);
    return el ? rectInCanvas(root, el) : null;
  }, [canvasRef]);

  /** Where a card dropped into `col` should come to rest — after the last card. */
  const dropPoint = useCallback((col: DemoColumnId, width: number, height: number): CanvasPoint | null => {
    const root = canvasRef.current;
    if (!root) return null;
    const body = root.querySelector(`[data-demo-target="kanban-body-${col}"]`);
    if (!body) return null;
    const bodyRect = rectInCanvas(root, body);
    const cards = body.querySelectorAll('[data-demo-target="task-card"]');
    const last = cards[cards.length - 1];
    const y = last
      ? Math.min(rectInCanvas(root, last).y + rectInCanvas(root, last).height + 6, bodyRect.y + bodyRect.height - height - 8)
      : bodyRect.y + 8;
    return { x: bodyRect.x + 8, y: Math.max(bodyRect.y + 8, y) };
  }, [canvasRef]);

  /** Which column body sits under a canvas point. */
  const columnAt = useCallback((point: CanvasPoint): DemoColumnId | null => {
    const root = canvasRef.current;
    if (!root) return null;
    for (const col of COLUMN_IDS) {
      const body = root.querySelector(`[data-demo-target="kanban-body-${col}"]`);
      if (!body) continue;
      const r = rectInCanvas(root, body);
      if (point.x >= r.x && point.x <= r.x + r.width && point.y >= r.y && point.y <= r.y + r.height) return col;
    }
    return null;
  }, [canvasRef]);

  /**
   * Scripted move: lift → travel → settle. Resolves once the card has landed,
   * so the step runner can sequence the next beat behind it.
   */
  const runScriptedMove = useCallback(async (task: DemoKanbanTask, col: DemoColumnId) => {
    const from = cardRect(task.id);
    if (reducedMotion || !from) {
      onDrop(task.id, col);
      return;
    }

    setDrag({ task, x: from.x, y: from.y, width: from.width, animateMs: 0 });
    await wait(DRAG.lift);
    if (cancelled.current) return;

    const to = dropPoint(col, from.width, from.height);
    const travel = to
      ? Math.max(DRAG.minTravel, cursorTravelMs(Math.hypot(to.x - from.x, to.y - from.y)))
      : DRAG.minTravel;

    setOverCol(col);
    setDrag((d) => (d ? { ...d, x: to?.x ?? d.x, y: to?.y ?? d.y, animateMs: travel } : d));
    await wait(travel);
    if (cancelled.current) return;

    onDrop(task.id, col);
    setOverCol(null);
    // Hold the overlay one frame past the state change so the real card is
    // painted underneath before the lifted copy disappears.
    requestAnimationFrame(() => requestAnimationFrame(() => setDrag(null)));
    await wait(DRAG.settle);
  }, [cardRect, dropPoint, onDrop, reducedMotion]);

  /** Visitor-initiated drag — same overlay, driven by their pointer. */
  const startUserDrag = useCallback((task: DemoKanbanTask, event: { clientX: number; clientY: number }) => {
    const root = canvasRef.current;
    const from = cardRect(task.id);
    if (!root || !from) return;
    const grab = pointInCanvas(root, event.clientX, event.clientY);
    userDragRef.current = { task, grabX: grab.x - from.x, grabY: grab.y - from.y, width: from.width };
  }, [canvasRef, cardRect]);

  useEffect(() => {
    const root = canvasRef.current;
    if (!root) return;

    let moved = false;

    const onMove = (e: PointerEvent) => {
      const pending = userDragRef.current;
      if (!pending) return;
      const point = pointInCanvas(root, e.clientX, e.clientY);
      const x = point.x - pending.grabX;
      const y = point.y - pending.grabY;
      if (!moved) {
        const start = cardRect(pending.task.id);
        // Same 5px threshold the app uses to tell a click from a drag.
        if (start && Math.hypot(x - start.x, y - start.y) < 5) return;
        moved = true;
      }
      setDrag({ task: pending.task, x, y, width: pending.width, animateMs: 0 });
      setOverCol(columnAt(point));
    };

    const onUp = (e: PointerEvent) => {
      const pending = userDragRef.current;
      userDragRef.current = null;
      if (!pending || !moved) { moved = false; return; }
      moved = false;
      const col = columnAt(pointInCanvas(root, e.clientX, e.clientY));
      if (col && col !== pending.task.col) onDrop(pending.task.id, col);
      setOverCol(null);
      requestAnimationFrame(() => setDrag(null));
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [canvasRef, cardRect, columnAt, onDrop]);

  const reset = useCallback(() => {
    userDragRef.current = null;
    setDrag(null);
    setOverCol(null);
  }, []);

  return { drag, overCol, runScriptedMove, startUserDrag, reset };
}
