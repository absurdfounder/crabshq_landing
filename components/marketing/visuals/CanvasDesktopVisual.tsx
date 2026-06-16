'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { Layers } from 'lucide-react';
import {
  DemoCommentPin,
  DemoCursorsLayer,
  DemoPostItNote,
  useCanvasDesktopDemo,
  useInViewport,
  usePrefersReducedMotion,
} from './CanvasDesktopDemoAnimation';

export type CanvasWindow = {
  id: string;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  body: ReactNode;
  accent?: boolean;
};

export const CANVAS_STAGE_W = 520;
export const CANVAS_STAGE_H = 300;

function WindowTile({
  win,
  active,
  dragging,
  animatePosition,
  onDragStart,
  onFocus,
}: {
  win: CanvasWindow;
  active: boolean;
  dragging: boolean;
  animatePosition?: boolean;
  onDragStart: (e: React.MouseEvent) => void;
  onFocus: () => void;
}) {
  return (
    <div
      role="presentation"
      onMouseDown={onFocus}
      style={{
        position: 'absolute',
        left: win.x,
        top: win.y,
        width: win.w,
        height: win.h,
        zIndex: active ? 30 : 10,
        borderRadius: 10,
        border: `1px solid ${active ? '#3f6b00' : '#e7e5e4'}`,
        background: '#fff',
        boxShadow: active
          ? '0 16px 40px -12px rgba(63,107,0,0.28), 0 4px 12px rgba(28,25,23,0.12)'
          : '0 12px 32px -12px rgba(28,25,23,0.16)',
        overflow: 'hidden',
        userSelect: 'none',
        transform: dragging ? 'scale(1.01)' : undefined,
        transition: animatePosition ? undefined : 'box-shadow 0.2s ease',
      }}
    >
      <div
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDragStart(e);
        }}
        className="flex items-center gap-2 border-b border-stone-100 bg-stone-50 px-2.5 py-1.5 cursor-grab active:cursor-grabbing"
      >
        <span className="h-2 w-2 rounded-full bg-red-400 shadow-[14px_0_0_#fbbf24,28px_0_0_#4ade80]" />
        <span className="ml-6 flex-1 truncate font-mono text-[9px] font-semibold text-stone-500">{win.title}</span>
      </div>
      <div className={`h-[calc(100%-30px)] overflow-hidden ${win.accent ? 'bg-trooper-50/40' : 'bg-white'}`}>
        {win.body}
      </div>
    </div>
  );
}

export function CanvasDesktopVisual({
  windows,
  animated = false,
}: {
  windows: CanvasWindow[];
  animated?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const positionsRef = useRef<Record<string, { x: number; y: number }>>({});
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>(() =>
    Object.fromEntries(windows.map(w => [w.id, { x: w.x, y: w.y }])),
  );
  const [activeId, setActiveId] = useState(windows[0]?.id ?? '');
  const [drag, setDrag] = useState<{ id: string; offsetX: number; offsetY: number } | null>(null);
  const [demoPaused, setDemoPaused] = useState(false);

  const reducedMotion = usePrefersReducedMotion();
  const inViewport = useInViewport(stageRef);
  const demoFrame = useCanvasDesktopDemo({
    windows,
    enabled: animated && inViewport,
    reducedMotion,
    paused: demoPaused || drag != null,
  });

  positionsRef.current = positions;

  const handleDragStart = useCallback((e: React.MouseEvent, id: string) => {
    const pos = animated && !reducedMotion && !demoPaused
      ? (demoFrame.positions[id] ?? positionsRef.current[id])
      : positionsRef.current[id];
    const container = containerRef.current;
    if (!pos || !container) return;
    const rect = container.getBoundingClientRect();
    const contentX = e.clientX - rect.left + container.scrollLeft;
    const contentY = e.clientY - rect.top + container.scrollTop;
    setDemoPaused(true);
    setPositions((prev) => ({ ...prev, [id]: pos }));
    setActiveId(id);
    setDrag({ id, offsetX: contentX - pos.x, offsetY: contentY - pos.y });
  }, [animated, reducedMotion, demoPaused, demoFrame.positions]);

  useEffect(() => {
    if (!drag) return undefined;
    const onMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const contentX = e.clientX - rect.left + container.scrollLeft;
      const contentY = e.clientY - rect.top + container.scrollTop;
      setPositions((prev) => {
        const win = windows.find(w => w.id === drag.id);
        if (!win) return prev;
        const maxX = Math.max(0, CANVAS_STAGE_W - 72);
        const maxY = Math.max(0, CANVAS_STAGE_H - 48);
        const x = Math.max(0, Math.min(maxX, contentX - drag.offsetX));
        const y = Math.max(0, Math.min(maxY, contentY - drag.offsetY));
        return { ...prev, [drag.id]: { x, y } };
      });
    };
    const onUp = () => setDrag(null);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [drag, windows]);

  useEffect(() => {
    if (!demoPaused || drag) return undefined;
    const timer = setTimeout(() => setDemoPaused(false), 2400);
    return () => clearTimeout(timer);
  }, [demoPaused, drag]);

  const useDemoLayout = animated && !reducedMotion && !demoPaused && !drag;
  const resolvedActiveId = useDemoLayout ? demoFrame.activeId : activeId;
  const resolvedDragging = useDemoLayout ? demoFrame.draggingIds : (drag ? [drag.id] : []);

  return (
    <div className="flex h-full min-h-[280px] flex-col bg-[#E7E5E4]">
      <style jsx global>{`
        @keyframes demoCursorRipple {
          from { opacity: 0.85; transform: scale(0.35); }
          to { opacity: 0; transform: scale(2.2); }
        }
      `}</style>
      <div className="flex items-center gap-2 border-b border-stone-200 bg-[#FAFAF9] px-3 py-2">
        <span className="inline-flex items-center gap-1 rounded-md border border-[#c4d9a0] bg-[#f0f5e6] px-2 py-0.5 text-[10px] font-semibold text-[#284800]">
          <Layers size={11} /> Canvas
        </span>
        <span className="text-[10px] text-stone-500">
          {windows.length} artifacts
          {animated && !reducedMotion ? ' · live review demo' : ' · drag to organize'}
        </span>
      </div>
      <div
        ref={containerRef}
        className="relative flex-1 overflow-auto p-3"
        style={{ cursor: drag ? 'grabbing' : 'default' }}
      >
        <div
          ref={stageRef}
          className="relative"
          style={{ width: CANVAS_STAGE_W, height: CANVAS_STAGE_H, minWidth: '100%', minHeight: '100%' }}
        >
          {windows.map((win) => {
            const manualPos = positions[win.id] ?? { x: win.x, y: win.y };
            const demoPos = demoFrame.positions[win.id] ?? manualPos;
            const pos = useDemoLayout ? demoPos : manualPos;
            const isDragging = resolvedDragging.includes(win.id);
            return (
              <WindowTile
                key={win.id}
                win={{ ...win, x: pos.x, y: pos.y }}
                active={resolvedActiveId === win.id}
                dragging={isDragging}
                animatePosition={useDemoLayout}
                onFocus={() => setActiveId(win.id)}
                onDragStart={(e) => handleDragStart(e, win.id)}
              />
            );
          })}
          {useDemoLayout && (
            <>
              {demoFrame.postIts.map((note) => (
                <DemoPostItNote key={note.id} note={note} />
              ))}
              {demoFrame.comments.map((comment) => (
                <DemoCommentPin key={comment.id} comment={comment} />
              ))}
              <DemoCursorsLayer cursors={demoFrame.cursors} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
