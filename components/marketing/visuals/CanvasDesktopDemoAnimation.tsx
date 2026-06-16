'use client';

import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import { MessageSquare, StickyNote } from 'lucide-react';
import { DemoCursorGlyph } from '@/components/DemoCursorGlyph';
import type { CanvasWindow } from './CanvasDesktopVisual';
import { CANVAS_STAGE_H, CANVAS_STAGE_W } from './CanvasDesktopVisual';
import {
  desktopQuadLayout,
  lerpLayouts,
  lerpSizeMap,
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
    quad: desktopQuadLayout(ids, stageW, stageH),
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
  const { quad } = buildLayouts(windows, stageW, stageH);
  const asset = windows.find((w) => w.id === 'asset' || w.id === 'carousel');
  const video = windows.find((w) => w.id === 'video' || w.id === 'pr');
  const assetRect = asset ? quad[asset.id] : undefined;
  const videoRect = video ? quad[video.id] : undefined;

  return {
    positions: quad,
    sizes: Object.fromEntries(
      Object.entries(quad).map(([id, rect]) => [id, { w: rect.w, h: rect.h }]),
    ),
    activeId: windows.find((w) => w.id === 'preview')?.id ?? windows[0]?.id ?? '',
    draggingIds: [],
    cursors: [],
    postIts: asset && assetRect
      ? [{
        id: 'note-asset',
        x: assetRect.x + assetRect.w - 78,
        y: assetRect.y + 22,
        text: 'Headline A/B',
        opacity: 1,
        rotate: -2,
      }]
      : [],
    comments: video && videoRect
      ? [{
        id: 'comment-video',
        x: videoRect.x + videoRect.w - 88,
        y: videoRect.y + 14,
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
  const { ids, quad, wide } = buildLayouts(windows, stageW, stageH);

  const secondaryPair = ids.slice(2, 4);
  const focusId = windows.find((w) => w.accent)?.id ?? windows.find((w) => w.id === 'preview')?.id ?? ids[ids.length - 1];

  // Beat 1 — expand focus window for review
  const focusExpand = segmentT(t, 800, 2400);
  const focusRects = quad;
  const focusTarget = focusId && focusRects[focusId]
    ? {
        ...focusRects[focusId],
        w: Math.min(focusRects[focusId].w + 48, CANVAS_STAGE_W * 0.52),
        h: Math.min(focusRects[focusId].h + 36, CANVAS_STAGE_H * 0.55),
        x: Math.max(12, focusRects[focusId].x - 8),
        y: Math.max(12, focusRects[focusId].y - 6),
      }
    : null;

  let positions = { ...Object.fromEntries(Object.entries(quad).map(([id, r]) => [id, { x: r.x, y: r.y }])) };
  let sizes = Object.fromEntries(Object.entries(quad).map(([id, r]) => [id, { w: r.w, h: r.h }]));

  if (focusId && focusTarget && focusExpand > 0) {
    positions[focusId] = {
      x: lerp(quad[focusId]?.x ?? 0, focusTarget.x, focusExpand),
      y: lerp(quad[focusId]?.y ?? 0, focusTarget.y, focusExpand),
    };
    sizes[focusId] = {
      w: lerp(quad[focusId]?.w ?? 180, focusTarget.w, focusExpand),
      h: lerp(quad[focusId]?.h ?? 120, focusTarget.h, focusExpand),
    };
  }

  // Beat 2 — subtle shuffle of secondary pair
  const drag2 = segmentT(t, 4200, 6800);
  if (drag2 > 0 && secondaryPair.length >= 2) {
    const shuffled = dragLayout(
      Object.fromEntries(secondaryPair.map((id) => [id, positions[id]])),
      Object.fromEntries(secondaryPair.map((id) => [id, { x: wide[id]?.x ?? positions[id]?.x ?? 0, y: wide[id]?.y ?? positions[id]?.y ?? 0 }])),
      secondaryPair,
      drag2,
    );
    positions = { ...positions, ...shuffled };
  }

  // Beat 3 — overlays
  const postItOpacity = clamp01(segmentT(t, 2800, 3600));
  const commentOpacity = clamp01(segmentT(t, 4000, 4800));

  // Beat 4 — reset to quad
  const resetT = segmentT(t, 12000, CANVAS_DEMO_LOOP_MS);
  const quadPositions = Object.fromEntries(Object.entries(quad).map(([id, r]) => [id, { x: r.x, y: r.y }]));
  const quadSizes = Object.fromEntries(Object.entries(quad).map(([id, r]) => [id, { w: r.w, h: r.h }]));
  const finalPositions = resetT > 0 ? dragLayout(positions, quadPositions, ids, resetT) : positions;
  const finalSizes = resetT > 0 ? resizeLayout(sizes, quadSizes, ids, resetT) : sizes;

  const assetId = windows.find((w) => w.id === 'asset')?.id
    ?? windows.find((w) => w.id === 'carousel')?.id
    ?? secondaryPair[0];
  const videoId = windows.find((w) => w.id === 'video')?.id
    ?? windows.find((w) => w.id === 'pr')?.id
    ?? secondaryPair[1];

  const focusGrab = focusId ? titleGrab(focusId, finalPositions, finalSizes, windows) : { x: 24, y: 24 };
  const assetGrab = assetId ? titleGrab(assetId, finalPositions, finalSizes, windows) : focusGrab;
  const videoGrab = videoId ? titleGrab(videoId, finalPositions, finalSizes, windows) : focusGrab;

  const cursorAVisible = t >= 350 && t < 11800;
  const cursorBVisible = t >= 900 && t < 11800;
  const fadeOut = clamp01(segmentT(t, 11800, CANVAS_DEMO_LOOP_MS - 400));
  const cursorFade = 1 - fadeOut;
  const overlayFade = 1 - fadeOut;

  let cursorA: DemoCursor = {
    id: 'a',
    x: 24,
    y: 180,
    visible: cursorAVisible,
    clicking: t >= 780 && t < 980,
  };
  let cursorB: DemoCursor = {
    id: 'b',
    x: 420,
    y: 40,
    visible: cursorBVisible,
    clicking: false,
  };

  const draggingIds: string[] = [];

  if (t >= 800 && t < 2400 && focusId) {
    draggingIds.push(focusId);
    cursorA = {
      ...cursorA,
      ...cursorAtGrab(lerpPt(
        titleGrab(focusId, quadPositions, quadSizes, windows),
        titleGrab(focusId, finalPositions, finalSizes, windows),
        focusExpand,
      )),
      grabbing: focusId,
    };
  } else if (t >= 2800 && t < 4200) {
    cursorA = { ...cursorA, ...cursorAtGrab(focusGrab) };
    cursorB = { ...cursorB, ...cursorAtGrab(assetGrab) };
  } else if (t >= 4200 && t < 6800 && assetId && videoId) {
    draggingIds.push(assetId, videoId);
    cursorA = {
      ...cursorA,
      ...cursorAtGrab(lerpPt(
        titleGrab(assetId, quadPositions, quadSizes, windows),
        titleGrab(assetId, finalPositions, finalSizes, windows),
        drag2,
      )),
      grabbing: assetId,
    };
    cursorB = {
      ...cursorB,
      ...cursorAtGrab(lerpPt(
        titleGrab(videoId, quadPositions, quadSizes, windows),
        titleGrab(videoId, finalPositions, finalSizes, windows),
        drag2,
      )),
      grabbing: videoId,
    };
  } else if (t >= 6800 && t < 11800) {
    cursorA = { ...cursorA, ...cursorAtGrab(videoGrab) };
    cursorB = { ...cursorB, ...cursorAtGrab(focusGrab) };
  } else if (t >= 350 && t < 800 && focusId) {
    cursorA = {
      ...cursorA,
      ...cursorAtGrab(lerpPt({ x: 24, y: 180 }, titleGrab(focusId, quadPositions, quadSizes, windows), segmentT(t, 350, 800))),
    };
  }

  const assetPos = assetId ? finalPositions[assetId] : undefined;
  const videoPos = videoId ? finalPositions[videoId] : undefined;
  const assetSize = assetId ? finalSizes[assetId] : undefined;
  const videoSize = videoId ? finalSizes[videoId] : undefined;

  const activeId = draggingIds[draggingIds.length - 1]
    ?? (t >= 4000 && videoId ? videoId
      : t >= 2800 && assetId ? assetId
        : focusId ?? windows[0]?.id ?? '');

  return {
    positions: finalPositions,
    sizes: finalSizes,
    activeId,
    draggingIds,
    cursors: [
      { ...cursorA, visible: cursorAVisible && cursorFade > 0.05 },
      { ...cursorB, visible: cursorBVisible && cursorFade > 0.05 },
    ],
    postIts: assetId && assetPos && assetSize && postItOpacity * overlayFade > 0.02
      ? [{
        id: 'note-asset',
        x: assetPos.x + assetSize.w - 78,
        y: assetPos.y + 22,
        text: 'Headline A/B',
        opacity: postItOpacity * overlayFade,
        rotate: -2,
      }]
      : [],
    comments: videoId && videoPos && videoSize && commentOpacity * overlayFade > 0.02
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
