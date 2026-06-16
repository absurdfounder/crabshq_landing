'use client';

import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import { MessageSquare, StickyNote } from 'lucide-react';
import { DemoCursorGlyph } from '@/components/DemoCursorGlyph';
import type { CanvasWindow } from './CanvasDesktopVisual';
import {
  lerpLayouts,
  lerpSizeMap,
  scatterLayout,
  tidyGridLayout,
  wideRowLayout,
  type DesktopSize,
} from '@/lib/canvasDesktopLayout';

export const CANVAS_DEMO_LOOP_MS = 16_000;
const TITLE_BAR_Y = 15;
const CURSOR_SCALE = 0.68;
const CURSOR_TIP = { x: 6 * CURSOR_SCALE, y: 4 * CURSOR_SCALE };

type Point = { x: number; y: number };
type Layout = Record<string, Point>;
type SizeMap = Record<string, DesktopSize>;

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
  sizes: SizeMap;
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

function baseSizes(windows: CanvasWindow[]): SizeMap {
  return Object.fromEntries(windows.map((w) => [w.id, { w: w.w, h: w.h }]));
}

function expandedSizes(windows: CanvasWindow[]): SizeMap {
  const base = baseSizes(windows);
  const out: SizeMap = { ...base };
  for (const win of windows) {
    out[win.id] = {
      w: Math.min(win.w + 18, win.w * 1.12),
      h: Math.min(win.h + 16, win.h * 1.1),
    };
  }
  return out;
}

function buildLayouts(windows: CanvasWindow[], stageW: number, stageH: number) {
  const ids = windows.map((w) => w.id);
  const base = baseSizes(windows);
  const expanded = expandedSizes(windows);

  return {
    ids,
    base,
    expanded,
    scattered: scatterLayout(ids, base, stageW, stageH),
    tidy: tidyGridLayout(ids, base, stageW, stageH),
    wide: wideRowLayout(ids, base, stageW, stageH),
    tidyExpanded: tidyGridLayout(ids, expanded, stageW, stageH),
  };
}

function titleGrab(
  windowId: string,
  layout: Layout,
  sizes: SizeMap,
  windows: CanvasWindow[],
): Point {
  const win = windows.find((w) => w.id === windowId);
  const pos = layout[windowId];
  const size = sizes[windowId];
  if (!win || !pos || !size) return { x: 0, y: 0 };
  return { x: pos.x + size.w * 0.38, y: pos.y + TITLE_BAR_Y };
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
  return lerpLayouts(from, to, windowIds, t, lerp);
}

function resizeLayout(
  from: SizeMap,
  to: SizeMap,
  windowIds: string[],
  t: number,
): SizeMap {
  return lerpSizeMap(from, to, windowIds, t, lerp);
}

export function staticDemoFrame(
  windows: CanvasWindow[],
  stageW: number,
  stageH: number,
): CanvasDemoFrame {
  const { wide, base } = buildLayouts(windows, stageW, stageH);
  const asset = windows.find((w) => w.id === 'asset');
  const video = windows.find((w) => w.id === 'video');
  const assetPos = wide.asset ?? { x: 12, y: 148 };
  const videoPos = wide.video ?? { x: 268, y: 128 };
  const assetSize = base.asset ?? { w: 178, h: 120 };
  const videoSize = base.video ?? { w: 190, h: 124 };

  return {
    positions: wide,
    sizes: base,
    activeId: windows.find((w) => w.id === 'preview')?.id ?? windows[0]?.id ?? '',
    draggingIds: [],
    cursors: [],
    postIts: asset
      ? [{
        id: 'note-asset',
        x: assetPos.x + assetSize.w - 78,
        y: assetPos.y + 22,
        text: 'Headline A/B',
        opacity: 1,
        rotate: -2,
      }]
      : [],
    comments: video
      ? [{
        id: 'comment-video',
        x: videoPos.x + videoSize.w - 88,
        y: videoPos.y + 14,
        author: 'Jordan',
        text: 'Trim intro 2s',
        opacity: 1,
      }]
      : [],
  };
}

export function frameAt(
  elapsedMs: number,
  windows: CanvasWindow[],
  stageW: number,
  stageH: number,
): CanvasDemoFrame {
  const t = elapsedMs % CANVAS_DEMO_LOOP_MS;
  const { ids, base, expanded, scattered, tidy, wide } = buildLayouts(windows, stageW, stageH);

  const primaryPair = ids.slice(0, 2);
  const secondaryPair = ids.slice(2, 4);

  // Beat 1 — dual drag (first two windows)
  const drag1 = segmentT(t, 900, 3400);
  const positions1 = dragLayout(scattered, tidy, primaryPair, drag1);
  const sizes1 = resizeLayout(base, expanded, primaryPair, segmentT(t, 1200, 2800));

  // Beat 2 — post-it on carousel / asset window
  const postItOpacity = clamp01(segmentT(t, 3600, 4300));

  // Beat 3 — comment on video
  const commentOpacity = clamp01(segmentT(t, 4800, 5500));

  // Beat 4 — rearrange bottom row + resize preview/browser
  const drag2 = segmentT(t, 5800, 8600);
  const positions2 = dragLayout(tidy, wide, secondaryPair.length ? secondaryPair : ids.slice(-2), drag2);
  const previewId = windows.find((w) => w.id === 'preview')?.id ?? primaryPair[1];
  const resizeBeat = segmentT(t, 6200, 7600);
  const sizes2 = previewId
    ? resizeLayout(sizes1, expanded, [previewId], resizeBeat)
    : sizes1;

  let positions = drag2 > 0 ? { ...positions1, ...positions2 } : positions1;
  let sizes = sizes2;

  // Beat 5 — brief expansion for reading
  const briefId = windows.find((w) => w.id === 'brief')?.id;
  if (briefId) {
    const readExpand = segmentT(t, 3800, 5200);
    sizes = resizeLayout(sizes, expanded, [briefId], readExpand);
  }

  // Beat 6 — fade overlays + reset loop
  const fadeOut = clamp01(segmentT(t, 11800, 13200));
  const resetT = segmentT(t, 13200, CANVAS_DEMO_LOOP_MS);
  const finalPositions = resetT > 0
    ? dragLayout(wide, scattered, ids, resetT)
    : positions;
  const finalSizes = resetT > 0
    ? resizeLayout(sizes, base, ids, resetT)
    : sizes;

  const briefGrab = briefId ? titleGrab(briefId, finalPositions, finalSizes, windows) : { x: 24, y: 24 };
  const previewGrab = titleGrab(previewId ?? primaryPair[0], finalPositions, finalSizes, windows);
  const assetId = windows.find((w) => w.id === 'asset')?.id ?? secondaryPair[0];
  const videoId = windows.find((w) => w.id === 'video')?.id ?? secondaryPair[1];
  const assetGrab = assetId ? titleGrab(assetId, wide, base, windows) : briefGrab;
  const videoGrab = videoId ? titleGrab(videoId, wide, base, windows) : previewGrab;

  const cursorAVisible = t >= 350 && t < 11800;
  const cursorBVisible = (t >= 1100 && t < 3400) || (t >= 5800 && t < 11800);

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

  if (t >= 900 && t < 3400 && primaryPair.length >= 2) {
    draggingIds.push(primaryPair[0], primaryPair[1]);
    cursorA = {
      ...cursorA,
      ...cursorAtGrab(lerpPt(
        titleGrab(primaryPair[0], scattered, base, windows),
        titleGrab(primaryPair[0], tidy, expanded, windows),
        drag1,
      )),
      grabbing: primaryPair[0],
      clicking: false,
    };
    cursorB = {
      ...cursorB,
      ...cursorAtGrab(lerpPt(
        titleGrab(primaryPair[1], scattered, base, windows),
        titleGrab(primaryPair[1], tidy, expanded, windows),
        drag1,
      )),
      grabbing: primaryPair[1],
      clicking: false,
    };
  } else if (t >= 3400 && t < 5800) {
    cursorA = { ...cursorA, ...cursorAtGrab(briefGrab) };
    cursorB = { ...cursorB, ...cursorAtGrab(previewGrab) };
  } else if (t >= 5800 && t < 8600 && assetId && videoId) {
    draggingIds.push(assetId, videoId);
    cursorA = {
      ...cursorA,
      ...cursorAtGrab(lerpPt(
        titleGrab(assetId, tidy, base, windows),
        titleGrab(assetId, wide, base, windows),
        drag2,
      )),
      grabbing: assetId,
    };
    cursorB = {
      ...cursorB,
      ...cursorAtGrab(lerpPt(
        titleGrab(videoId, tidy, base, windows),
        titleGrab(videoId, wide, base, windows),
        drag2,
      )),
      grabbing: videoId,
    };
  } else if (t >= 8600 && t < 11800) {
    cursorA = { ...cursorA, ...cursorAtGrab(assetGrab) };
    cursorB = { ...cursorB, ...cursorAtGrab(videoGrab) };
  } else if (t >= 350 && t < 900 && primaryPair[0]) {
    const approach = segmentT(t, 350, 900);
    cursorA = {
      ...cursorA,
      ...cursorAtGrab(lerpPt(
        { x: 24, y: 180 },
        titleGrab(primaryPair[0], scattered, base, windows),
        approach,
      )),
    };
  } else if (t >= 1100 && t < 1480 && primaryPair[1]) {
    const approach = segmentT(t, 1100, 1480);
    cursorB = {
      ...cursorB,
      ...cursorAtGrab(lerpPt(
        { x: 420, y: 40 },
        titleGrab(primaryPair[1], scattered, base, windows),
        approach,
      )),
    };
  }

  const overlayFade = 1 - fadeOut;
  const cursorFade = 1 - fadeOut;

  const assetWin = assetId ? windows.find((w) => w.id === assetId) : undefined;
  const videoWin = videoId ? windows.find((w) => w.id === videoId) : undefined;
  const assetPos = assetId ? (finalPositions[assetId] ?? wide[assetId]) : undefined;
  const videoPos = videoId ? (finalPositions[videoId] ?? wide[videoId]) : undefined;
  const assetSize = assetId ? (finalSizes[assetId] ?? base[assetId]) : undefined;
  const videoSize = videoId ? (finalSizes[videoId] ?? base[videoId]) : undefined;

  const activeId = draggingIds[draggingIds.length - 1]
    ?? (t >= 4800 && videoId ? videoId
      : t >= 3600 && assetId ? assetId
        : t >= 900 && primaryPair[1] ? primaryPair[1]
          : primaryPair[0] ?? windows[0]?.id ?? '');

  return {
    positions: finalPositions,
    sizes: finalSizes,
    activeId,
    draggingIds,
    cursors: [
      { ...cursorA, visible: cursorAVisible && cursorFade > 0.05, x: cursorA.x, y: cursorA.y },
      { ...cursorB, visible: cursorBVisible && cursorFade > 0.05, x: cursorB.x, y: cursorB.y },
    ],
    postIts: assetWin && assetPos && assetSize && postItOpacity * overlayFade > 0.02
      ? [{
        id: 'note-asset',
        x: assetPos.x + assetSize.w - 78,
        y: assetPos.y + 22,
        text: 'Headline A/B',
        opacity: postItOpacity * overlayFade,
        rotate: -2,
      }]
      : [],
    comments: videoWin && videoPos && videoSize && commentOpacity * overlayFade > 0.02
      ? [{
        id: 'comment-video',
        x: videoPos.x + videoSize.w - 88,
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
  stageW,
  stageH,
  enabled,
  reducedMotion,
  paused,
}: {
  windows: CanvasWindow[];
  stageW: number;
  stageH: number;
  enabled: boolean;
  reducedMotion: boolean;
  paused: boolean;
}) {
  const [frame, setFrame] = useState<CanvasDemoFrame>(() =>
    reducedMotion ? staticDemoFrame(windows, stageW, stageH) : frameAt(0, windows, stageW, stageH),
  );
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const tick = useCallback((now: number) => {
    if (startRef.current == null) startRef.current = now;
    const elapsed = now - startRef.current;
    setFrame(frameAt(elapsed, windows, stageW, stageH));
    rafRef.current = requestAnimationFrame(tick);
  }, [windows, stageW, stageH]);

  useEffect(() => {
    if (!enabled || reducedMotion || paused) {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      startRef.current = null;
      setFrame(reducedMotion ? staticDemoFrame(windows, stageW, stageH) : frameAt(0, windows, stageW, stageH));
      return undefined;
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, reducedMotion, paused, tick, windows, stageW, stageH]);

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
