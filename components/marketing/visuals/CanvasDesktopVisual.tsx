'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { Layers, MessageSquarePlus } from 'lucide-react';
import {
  CANVAS_STATUS_BAR_H,
  CANVAS_TITLE_BAR_H,
  desktopQuadLayout,
} from '@/lib/canvasDesktopLayout';
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

export const CANVAS_STAGE_W = 720;
export const CANVAS_STAGE_H = 400;

const MOTION_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

export function layoutCanvasWindows(windows: CanvasWindow[]): CanvasWindow[] {
  const rects = desktopQuadLayout(
    windows.map((w) => w.id),
    CANVAS_STAGE_W,
    CANVAS_STAGE_H,
  );
  return windows.map((win) => {
    const rect = rects[win.id];
    if (!rect) return win;
    return { ...win, x: rect.x, y: rect.y, w: rect.w, h: rect.h };
  });
}

function DesktopWallpaper() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(145deg, #3d4f3a 0%, #5c6b52 18%, #8a9582 42%, #6b7564 68%, #4a5548 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 15%, rgba(255,255,255,0.45) 0%, transparent 42%), radial-gradient(circle at 80% 85%, rgba(0,0,0,0.12) 0%, transparent 50%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(0,0,0,0.35) 0.5px, transparent 0.5px)',
          backgroundSize: '18px 18px',
        }}
      />
    </>
  );
}

function WindowTile({
  win,
  active,
  dragging,
  animateMotion,
  onDragStart,
  onFocus,
}: {
  win: CanvasWindow;
  active: boolean;
  dragging: boolean;
  animateMotion?: boolean;
  onDragStart: (e: React.MouseEvent) => void;
  onFocus: () => void;
}) {
  const bodyH = Math.max(48, win.h - CANVAS_TITLE_BAR_H);

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
        zIndex: active ? 30 : dragging ? 20 : 10,
        borderRadius: 8,
        border: `1px solid ${active ? 'rgba(63,107,0,0.55)' : 'rgba(255,255,255,0.22)'}`,
        background: '#fafaf9',
        boxShadow: active
          ? '0 22px 50px -16px rgba(0,0,0,0.45), 0 0 0 1px rgba(63,107,0,0.2)'
          : dragging
            ? '0 20px 44px -14px rgba(0,0,0,0.4)'
            : '0 12px 32px -8px rgba(0,0,0,0.35), 0 2px 6px rgba(0,0,0,0.15)',
        overflow: 'hidden',
        userSelect: 'none',
        transform: dragging ? 'scale(1.006)' : undefined,
        willChange: animateMotion ? 'left, top, width, height, transform' : undefined,
        transition: animateMotion
          ? `left 0.72s ${MOTION_EASE}, top 0.72s ${MOTION_EASE}, width 0.72s ${MOTION_EASE}, height 0.72s ${MOTION_EASE}, box-shadow 0.25s ease, transform 0.18s ease, border-color 0.25s ease`
          : 'box-shadow 0.2s ease, transform 0.15s ease, border-color 0.2s ease',
      }}
    >
      <div
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDragStart(e);
        }}
        className="flex items-center gap-1.5 border-b border-stone-200/80 bg-gradient-to-b from-[#f5f5f4] to-[#ececea] px-2.5 py-1.5 cursor-grab active:cursor-grabbing"
        style={{ height: CANVAS_TITLE_BAR_H, boxSizing: 'border-box' }}
      >
        <span
          className="shrink-0 rounded-full bg-[#ff5f57]"
          style={{
            width: 9,
            height: 9,
            boxShadow: '15px 0 0 #febc2e, 30px 0 0 #28c840',
          }}
        />
        <span className="ml-8 flex-1 truncate font-mono text-[9px] font-semibold text-stone-600">
          {win.title}
        </span>
        <span className="inline-flex shrink-0 items-center gap-0.5 rounded border border-stone-200/80 bg-white/80 px-1 py-px text-[8px] font-semibold text-stone-400">
          <MessageSquarePlus size={8} strokeWidth={2} />
        </span>
      </div>
      <div
        className={`Trooper-scrollbar overflow-auto ${win.accent ? 'bg-trooper-50/40' : 'bg-white'}`}
        style={{ height: bodyH }}
      >
        {win.body}
      </div>
    </div>
  );
}

export function CanvasDesktopVisual({
  windows: rawWindows,
  animated = false,
}: {
  windows: CanvasWindow[];
  animated?: boolean;
}) {
  const windows = layoutCanvasWindows(rawWindows);
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const positionsRef = useRef<Record<string, { x: number; y: number }>>({});
  const [scale, setScale] = useState(1);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>(() =>
    Object.fromEntries(windows.map((w) => [w.id, { x: w.x, y: w.y }])),
  );
  const [activeId, setActiveId] = useState(windows[0]?.id ?? '');
  const [drag, setDrag] = useState<{ id: string; offsetX: number; offsetY: number } | null>(null);
  const [demoPaused, setDemoPaused] = useState(false);

  const reducedMotion = usePrefersReducedMotion();
  const inViewport = useInViewport(stageRef);
  const demoFrame = useCanvasDesktopDemo({
    windows,
    stageW: CANVAS_STAGE_W,
    stageH: CANVAS_STAGE_H,
    enabled: animated && inViewport,
    reducedMotion,
    paused: demoPaused || drag != null,
  });

  positionsRef.current = positions;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;
    const update = () => {
      const w = el.clientWidth;
      setScale(Math.min(1, w / CANVAS_STAGE_W));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleDragStart = useCallback(
    (e: React.MouseEvent, id: string) => {
      const pos =
        animated && !reducedMotion && !demoPaused
          ? (demoFrame.positions[id] ?? positionsRef.current[id])
          : positionsRef.current[id];
      const container = containerRef.current;
      if (!pos || !container) return;
      const rect = container.getBoundingClientRect();
      const contentX = (e.clientX - rect.left) / scale;
      const contentY = (e.clientY - rect.top) / scale;
      setDemoPaused(true);
      setPositions((prev) => ({ ...prev, [id]: pos }));
      setActiveId(id);
      setDrag({ id, offsetX: contentX - pos.x, offsetY: contentY - pos.y });
    },
    [animated, reducedMotion, demoPaused, demoFrame.positions, scale],
  );

  useEffect(() => {
    if (!drag) return undefined;
    const onMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const contentX = (e.clientX - rect.left) / scale;
      const contentY = (e.clientY - rect.top) / scale;
      setPositions((prev) => {
        const win = windows.find((w) => w.id === drag.id);
        if (!win) return prev;
        const maxX = Math.max(0, CANVAS_STAGE_W - 72);
        const maxY = Math.max(0, CANVAS_STAGE_H - CANVAS_STATUS_BAR_H - 48);
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
  }, [drag, windows, scale]);

  useEffect(() => {
    if (!demoPaused || drag) return undefined;
    const timer = setTimeout(() => setDemoPaused(false), 2400);
    return () => clearTimeout(timer);
  }, [demoPaused, drag]);

  const useDemoLayout = animated && !reducedMotion && !demoPaused && !drag;
  const resolvedActiveId = useDemoLayout ? demoFrame.activeId : activeId;
  const resolvedDragging = useDemoLayout ? demoFrame.draggingIds : drag ? [drag.id] : [];

  return (
    <div className="flex h-full min-h-[340px] flex-col bg-[#1a1918]">
      <style jsx global>{`
        @keyframes demoCursorRipple {
          from { opacity: 0.85; transform: scale(0.35); }
          to { opacity: 0; transform: scale(2.2); }
        }
      `}</style>
      <div className="flex h-8 shrink-0 items-center justify-between border-b border-black/40 bg-gradient-to-b from-[#3a3938] to-[#252422] px-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="inline-flex shrink-0 items-center gap-1 rounded border border-[#4a6b2a]/60 bg-[#2d3d1c] px-2 py-0.5 text-[10px] font-semibold text-[#b8d4a0]">
            <Layers size={11} /> Canvas
          </span>
          <span className="truncate font-mono text-[10px] text-stone-400">
            {windows.length} artifacts
            {animated && !reducedMotion ? ' · live review' : ' · desktop workspace'}
          </span>
        </div>
        {animated && !reducedMotion && (
          <span className="hidden shrink-0 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9px] font-medium text-stone-400 sm:inline">
            Review mode
          </span>
        )}
      </div>
      <div
        ref={containerRef}
        className="relative flex-1 overflow-hidden bg-[#1a1918]"
        style={{ cursor: drag ? 'grabbing' : 'default' }}
      >
        <div
          style={{
            width: CANVAS_STAGE_W * scale,
            height: CANVAS_STAGE_H * scale,
            margin: '0 auto',
          }}
        >
          <div
            ref={stageRef}
            className="relative origin-top-left overflow-hidden"
            style={{
              width: CANVAS_STAGE_W,
              height: CANVAS_STAGE_H,
              transform: `scale(${scale})`,
            }}
          >
            <DesktopWallpaper />
            {windows.map((win) => {
              const manualPos = positions[win.id] ?? { x: win.x, y: win.y };
              const demoPos = demoFrame.positions[win.id] ?? manualPos;
              const demoSize = demoFrame.sizes[win.id] ?? { w: win.w, h: win.h };
              const pos = useDemoLayout ? demoPos : manualPos;
              const size = useDemoLayout ? demoSize : { w: win.w, h: win.h };
              const isDragging = resolvedDragging.includes(win.id);
              return (
                <WindowTile
                  key={win.id}
                  win={{ ...win, x: pos.x, y: pos.y, w: size.w, h: size.h }}
                  active={resolvedActiveId === win.id}
                  dragging={isDragging}
                  animateMotion={useDemoLayout}
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
            <div
              className="pointer-events-none absolute bottom-0 left-0 right-0 z-[40] flex items-center justify-between border-t border-white/10 px-3 backdrop-blur-sm"
              style={{
                height: CANVAS_STATUS_BAR_H,
                background: 'linear-gradient(180deg, rgba(28,25,23,0.82) 0%, rgba(15,14,13,0.94) 100%)',
              }}
            >
              <span className="text-[8px] font-medium text-stone-400">Canvas workspace</span>
              <span className="text-[8px] text-stone-500">{windows.length} artifacts · organized</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
