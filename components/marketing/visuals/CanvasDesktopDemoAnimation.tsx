'use client';

import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import { MessageSquare, StickyNote } from 'lucide-react';
import { DemoCursorGlyph } from '@/components/DemoCursorGlyph';
import type { CanvasWindow } from './CanvasDesktopVisual';

export const CANVAS_DEMO_LOOP_MS = 14_000;
const TITLE_BAR_Y = 15;
const CURSOR_SCALE = 0.68;
const CURSOR_TIP = { x: 6 * CURSOR_SCALE, y: 4 * CURSOR_SCALE };

type Point = { x: number; y: number };
type Layout = Record<string, Point>;

export type DemoCursor = {
  id: string;
  x: number;
  y: number;
  visible: boolean;
  clicking: boolean;
  grabbing?: string;
};

export type DemoPostIt = {
  id: string;
  x: number;
  y: number;
  text: string;
  opacity: number;
  rotate: number;
};

export type DemoComment = {
  id: string;
  x: number;
  y: number;
  author: string;
  text: string;
  opacity: number;
};

export type CanvasDemoFrame = {
  positions: Layout;
  activeId: string;
  draggingIds: string[];
  cursors: DemoCursor[];
  postIts: DemoPostIt[];
  comments: DemoComment[];
};

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpPt(a: Point, b: Point, t: number): Point {
  return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) };
}

function clamp01(t: number) {
  return Math.max(0, Math.min(1, t));
}

function segmentT(elapsed: number, start: number, end: number) {
  if (elapsed <= start) return 0;
  if (elapsed >= end) return 1;
  return easeInOut((elapsed - start) / (end - start));
}

function titleGrab(windowId: string, layout: Layout, windows: CanvasWindow[]): Point {
  const win = windows.find((w) => w.id === windowId);
  const pos = layout[windowId];
  if (!win || !pos) return { x: 0, y: 0 };
  return { x: pos.x + win.w * 0.38, y: pos.y + TITLE_BAR_Y };
}

function cursorAtGrab(grab: Point): Point {
  return { x: grab.x - CURSOR_TIP.x, y: grab.y - CURSOR_TIP.y };
}

function dragLayout(
  from: Layout,
  to: Layout,
  windowIds: string[],
  t: number,
): Layout {
  const next = { ...from };
  for (const id of windowIds) {
    if (from[id] && to[id]) next[id] = lerpPt(from[id], to[id], t);
  }
  return next;
}

/** Slightly staggered — agents just dropped artifacts on the desk */
const INITIAL: Layout = {
  brief: { x: 22, y: 16 },
  preview: { x: 148, y: 28 },
  asset: { x: 52, y: 132 },
  video: { x: 196, y: 108 },
};

/** Top row snapped; bottom row still mid-arrange */
const ORGANIZED_A: Layout = {
  brief: { x: 8, y: 8 },
  preview: { x: 208, y: 12 },
  asset: { x: 36, y: 140 },
  video: { x: 196, y: 108 },
};

/** Final tidy desktop grid */
const ORGANIZED_B: Layout = {
  brief: { x: 8, y: 8 },
  preview: { x: 208, y: 12 },
  asset: { x: 12, y: 148 },
  video: { x: 268, y: 128 },
};

export function staticDemoFrame(windows: CanvasWindow[]): CanvasDemoFrame {
  const positions = { ...ORGANIZED_B };
  const asset = windows.find((w) => w.id === 'asset');
  const video = windows.find((w) => w.id === 'video');
  const assetPos = positions.asset ?? { x: 18, y: 148 };
  const videoPos = positions.video ?? { x: 268, y: 96 };

  return {
    positions,
    activeId: 'preview',
    draggingIds: [],
    cursors: [],
    postIts: asset
      ? [{
        id: 'note-asset',
        x: assetPos.x + asset.w - 78,
        y: assetPos.y + 22,
        text: 'Headline A/B',
        opacity: 1,
        rotate: 0,
      }]
      : [],
    comments: video
      ? [{
        id: 'comment-video',
        x: videoPos.x + video.w - 88,
        y: videoPos.y + 14,
        author: 'Jordan',
        text: 'Trim intro 2s',
        opacity: 1,
      }]
      : [],
  };
}

export function frameAt(elapsedMs: number, windows: CanvasWindow[]): CanvasDemoFrame {
  const t = elapsedMs % CANVAS_DEMO_LOOP_MS;

  // Beat 1 — dual cursor drag (brief + preview)
  const drag1 = segmentT(t, 900, 3400);
  const positions1 = dragLayout(INITIAL, ORGANIZED_A, ['brief', 'preview'], drag1);

  // Beat 2 — post-it on carousel
  const postItOpacity = clamp01(segmentT(t, 3600, 4300));

  // Beat 3 — comment on video
  const commentOpacity = clamp01(segmentT(t, 4800, 5500));

  // Beat 4 — rearrange asset + video
  const drag2 = segmentT(t, 5800, 8600);
  const positions2 = dragLayout(ORGANIZED_A, ORGANIZED_B, ['asset', 'video'], drag2);
  const positions = drag2 > 0 ? { ...positions1, ...positions2 } : positions1;

  // Beat 5 — fade overlays + cursors before reset
  const fadeOut = clamp01(segmentT(t, 10800, 12200));
  const resetT = segmentT(t, 12200, CANVAS_DEMO_LOOP_MS);
  const finalPositions = resetT > 0
    ? dragLayout(ORGANIZED_B, INITIAL, ['brief', 'preview', 'asset', 'video'], resetT)
    : positions;

  const briefGrab = titleGrab('brief', finalPositions, windows);
  const previewGrab = titleGrab('preview', finalPositions, windows);
  const assetGrab = titleGrab('asset', finalPositions, windows);
  const videoGrab = titleGrab('video', finalPositions, windows);

  const cursorAVisible = t >= 350 && t < 11200;
  const cursorBVisible = (t >= 1100 && t < 3400) || (t >= 5800 && t < 11200);

  let cursorA: DemoCursor = {
    id: 'a',
    x: 24,
    y: 180,
    visible: cursorAVisible,
    clicking: t >= 780 && t < 980,
    grabbing: undefined,
  };
  let cursorB: DemoCursor = {
    id: 'b',
    x: 420,
    y: 40,
    visible: cursorBVisible,
    clicking: t >= 1480 && t < 1680,
    grabbing: undefined,
  };

  const draggingIds: string[] = [];

  if (t >= 900 && t < 3400) {
    draggingIds.push('brief', 'preview');
    cursorA = {
      ...cursorA,
      ...cursorAtGrab(lerpPt(titleGrab('brief', INITIAL, windows), briefGrab, drag1)),
      grabbing: 'brief',
      clicking: false,
    };
    cursorB = {
      ...cursorB,
      ...cursorAtGrab(lerpPt(titleGrab('preview', INITIAL, windows), previewGrab, drag1)),
      grabbing: 'preview',
      clicking: false,
    };
  } else if (t >= 3400 && t < 5800) {
    cursorA = { ...cursorA, ...cursorAtGrab(briefGrab) };
    cursorB = { ...cursorB, ...cursorAtGrab(previewGrab) };
  } else if (t >= 5800 && t < 8600) {
    draggingIds.push('asset', 'video');
    cursorA = {
      ...cursorA,
      ...cursorAtGrab(lerpPt(titleGrab('asset', ORGANIZED_A, windows), assetGrab, drag2)),
      grabbing: 'asset',
    };
    cursorB = {
      ...cursorB,
      ...cursorAtGrab(lerpPt(titleGrab('video', ORGANIZED_A, windows), videoGrab, drag2)),
      grabbing: 'video',
    };
  } else if (t >= 8600 && t < 11200) {
    cursorA = { ...cursorA, ...cursorAtGrab(assetGrab) };
    cursorB = { ...cursorB, ...cursorAtGrab(videoGrab) };
  } else if (t >= 350 && t < 900) {
    const approach = segmentT(t, 350, 900);
    cursorA = {
      ...cursorA,
      ...cursorAtGrab(lerpPt({ x: 24, y: 180 }, titleGrab('brief', INITIAL, windows), approach)),
    };
  } else if (t >= 1100 && t < 1480) {
    const approach = segmentT(t, 1100, 1480);
    cursorB = {
      ...cursorB,
      ...cursorAtGrab(lerpPt({ x: 420, y: 40 }, titleGrab('preview', INITIAL, windows), approach)),
    };
  }

  const overlayFade = 1 - fadeOut;
  const cursorFade = 1 - fadeOut;

  const assetWin = windows.find((w) => w.id === 'asset');
  const videoWin = windows.find((w) => w.id === 'video');
  const assetPos = finalPositions.asset ?? ORGANIZED_B.asset;
  const videoPos = finalPositions.video ?? ORGANIZED_B.video;

  const activeId = draggingIds[draggingIds.length - 1]
    ?? (t >= 4800 ? 'video' : t >= 3600 ? 'asset' : t >= 900 ? 'preview' : 'brief');

  return {
    positions: finalPositions,
    activeId,
    draggingIds,
    cursors: [
      { ...cursorA, visible: cursorAVisible && cursorFade > 0.05, x: cursorA.x, y: cursorA.y },
      { ...cursorB, visible: cursorBVisible && cursorFade > 0.05, x: cursorB.x, y: cursorB.y },
    ],
    postIts: assetWin && postItOpacity * overlayFade > 0.02
      ? [{
        id: 'note-asset',
        x: assetPos.x + assetWin.w - 78,
        y: assetPos.y + 22,
        text: 'Headline A/B',
        opacity: postItOpacity * overlayFade,
        rotate: 0,
      }]
      : [],
    comments: videoWin && commentOpacity * overlayFade > 0.02
      ? [{
        id: 'comment-video',
        x: videoPos.x + videoWin.w - 88,
        y: videoPos.y + 14,
        author: 'Jordan',
        text: 'Trim intro 2s',
        opacity: commentOpacity * overlayFade,
      }]
      : [],
  };
}

export function DemoPostItNote({ note }: { note: DemoPostIt }) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        left: note.x,
        top: note.y,
        zIndex: 45,
        maxWidth: 76,
        padding: '5px 7px',
        borderRadius: 8,
        border: '1px solid #e7e5e4',
        background: '#fff',
        boxShadow: '0 8px 20px -6px rgba(28,25,23,0.18)',
        transform: note.rotate ? `rotate(${note.rotate}deg)` : undefined,
        opacity: note.opacity,
        pointerEvents: 'none',
        transition: 'opacity 0.35s ease',
      }}
    >
      <div className="mb-0.5 flex items-center gap-1">
        <StickyNote size={8} strokeWidth={2} className="text-[#3f6b00]" />
        <span className="text-[7px] font-semibold text-stone-500">Review note</span>
      </div>
      <p className="text-[7px] leading-snug text-stone-700">{note.text}</p>
    </div>
  );
}

export function DemoCommentPin({ comment }: { comment: DemoComment }) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        left: comment.x,
        top: comment.y,
        zIndex: 46,
        maxWidth: 84,
        opacity: comment.opacity,
        pointerEvents: 'none',
        transition: 'opacity 0.35s ease',
        borderRadius: 8,
        border: '1px solid #e7e5e4',
        background: '#fff',
        boxShadow: '0 8px 22px -8px rgba(28,25,23,0.2)',
        padding: '5px 7px',
      }}
    >
      <div className="mb-0.5 flex items-center gap-1">
        <MessageSquare size={8} strokeWidth={2} className="text-[#3f6b00]" />
        <span className="text-[7px] font-semibold text-stone-500">{comment.author}</span>
      </div>
      <p className="text-[7px] leading-snug text-stone-700">{comment.text}</p>
    </div>
  );
}

export function DemoCursorsLayer({ cursors }: { cursors: DemoCursor[] }) {
  return (
    <>
      {cursors.map((c) => (
        c.visible ? (
          <div
            key={c.id}
            aria-hidden
            style={{
              position: 'absolute',
              left: c.x,
              top: c.y,
              zIndex: c.grabbing ? 55 : 50,
              pointerEvents: 'none',
              opacity: c.grabbing ? 1 : 0.92,
            }}
          >
            <DemoCursorGlyph clicking={c.clicking} scale={CURSOR_SCALE} softShadow />
          </div>
        ) : null
      ))}
    </>
  );
}

export function useCanvasDesktopDemo({
  windows,
  enabled,
  reducedMotion,
  paused,
}: {
  windows: CanvasWindow[];
  enabled: boolean;
  reducedMotion: boolean;
  paused: boolean;
}) {
  const [frame, setFrame] = useState<CanvasDemoFrame>(() =>
    reducedMotion ? staticDemoFrame(windows) : frameAt(0, windows),
  );
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const tick = useCallback((now: number) => {
    if (startRef.current == null) startRef.current = now;
    const elapsed = now - startRef.current;
    setFrame(frameAt(elapsed, windows));
    rafRef.current = requestAnimationFrame(tick);
  }, [windows]);

  useEffect(() => {
    if (!enabled || reducedMotion || paused) {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      startRef.current = null;
      setFrame(reducedMotion ? staticDemoFrame(windows) : frameAt(0, windows));
      return undefined;
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, reducedMotion, paused, tick, windows]);

  return frame;
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return reduced;
}

export function useInViewport(ref: RefObject<Element | null>, rootMargin = '0px') {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15, rootMargin },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, rootMargin]);

  return visible;
}
