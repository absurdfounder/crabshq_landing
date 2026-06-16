'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Layers, MessageSquarePlus } from 'lucide-react';
import { TROOPER_DEMO as C } from './demoTheme';
import type { DemoArtifact } from './demoTaskExecution';
import { DemoArtifactTilePreview } from './DemoArtifactPanel';
import { DemoCanvasReviewLayer } from './DemoReviewOverlay';
import type { ArtifactReviewState } from '@/lib/demoArtifactReview';
import {
  CANVAS_STATUS_BAR_H,
  CANVAS_TITLE_BAR_H,
  scatterLayout,
  tidyGridLayout,
  wideRowLayout,
  lerpLayouts,
  lerpSizeMap,
  type DesktopSize,
} from '@/lib/canvasDesktopLayout';
import { useInViewport, usePrefersReducedMotion } from './marketing/visuals/CanvasDesktopDemoAnimation';

const STAGE_W = 720;
const STAGE_H = 440;
const MOTION_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const AMBIENT_LOOP_MS = 14_000;

type TilePos = { x: number; y: number; w: number; h: number };

type CanvasReviewState = ArtifactReviewState & { artifactName: string };

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function segmentT(elapsed: number, start: number, end: number) {
  if (elapsed <= start) return 0;
  if (elapsed >= end) return 1;
  return easeInOut((elapsed - start) / (end - start));
}

function inferKind(artifact: DemoArtifact): string {
  if (artifact.kind) return artifact.kind;
  const ext = artifact.ext ?? artifact.name.split('.').pop() ?? '';
  if (ext === 'html' || ext === 'htm') return 'html';
  if (['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'].includes(ext)) return 'image';
  if (['mp4', 'mov', 'webm'].includes(ext)) return 'video';
  if (ext === 'md') return 'markdown';
  if (ext === 'diff') return 'diff';
  if (ext === 'log') return 'log';
  return 'code';
}

function inferTileSize(artifact: DemoArtifact): DesktopSize {
  const kind = inferKind(artifact);
  switch (kind) {
    case 'diff':
      return { w: 340, h: 248 };
    case 'html':
      return { w: 360, h: 268 };
    case 'markdown':
      return { w: 288, h: 212 };
    case 'video':
      return { w: 320, h: 228 };
    case 'image':
      return { w: 300, h: 220 };
    case 'log':
      return { w: 300, h: 168 };
    default:
      return { w: 300, h: 220 };
  }
}

function expandedTileSize(size: DesktopSize): DesktopSize {
  return {
    w: Math.min(size.w + 24, STAGE_W * 0.52),
    h: Math.min(size.h + 20, STAGE_H * 0.58),
  };
}

function autoTileLayout(tiles: DemoArtifact[]): Record<string, TilePos> {
  const ids = tiles.map((a) => a.name);
  const sizes = Object.fromEntries(tiles.map((a) => [a.name, inferTileSize(a)]));
  const scattered = scatterLayout(ids, sizes, STAGE_W, STAGE_H);
  const positions: Record<string, TilePos> = {};
  tiles.forEach((artifact) => {
    const size = sizes[artifact.name];
    const pos = scattered[artifact.name] ?? { x: 16, y: 16 };
    positions[artifact.name] = { ...pos, ...size };
  });
  return positions;
}

function ambientMotionFrame(
  elapsedMs: number,
  tiles: DemoArtifact[],
): { positions: Record<string, { x: number; y: number }>; sizes: Record<string, DesktopSize>; activeKey: string } {
  const ids = tiles.map((a) => a.name);
  const base = Object.fromEntries(tiles.map((a) => [a.name, inferTileSize(a)]));
  const expanded = Object.fromEntries(
    tiles.map((a) => [a.name, expandedTileSize(inferTileSize(a))]),
  );
  const scattered = scatterLayout(ids, base, STAGE_W, STAGE_H);
  const tidy = tidyGridLayout(ids, base, STAGE_W, STAGE_H);
  const wide = wideRowLayout(ids, base, STAGE_W, STAGE_H);

  const t = elapsedMs % AMBIENT_LOOP_MS;
  const primary = ids.slice(0, 2);
  const secondary = ids.slice(2);

  const drag1 = segmentT(t, 800, 3200);
  const drag2 = segmentT(t, 5200, 7800);
  const resetT = segmentT(t, 11200, AMBIENT_LOOP_MS);

  let positions = dragLayout(scattered, tidy, ids, drag1);
  if (drag2 > 0 && secondary.length) {
    positions = { ...positions, ...dragLayout(tidy, wide, secondary, drag2) };
  }

  let sizes = lerpSizeMap(base, expanded, primary, segmentT(t, 1400, 2800), lerp);
  if (ids[2]) {
    sizes = lerpSizeMap(sizes, expanded, [ids[2]], segmentT(t, 5400, 6800), lerp);
  }

  if (resetT > 0) {
    positions = dragLayout(wide, scattered, ids, resetT);
    sizes = lerpSizeMap(sizes, base, ids, resetT, lerp);
  }

  const activeKey = t >= 5200 && ids[2]
    ? ids[2]
    : t >= 1400 && primary[1]
      ? primary[1]
      : primary[0] ?? ids[0] ?? '';

  return { positions, sizes, activeKey };
}

function dragLayout(
  from: Record<string, { x: number; y: number }>,
  to: Record<string, { x: number; y: number }>,
  windowIds: string[],
  t: number,
) {
  return lerpLayouts(from, to, windowIds, t, lerp);
}

function DesktopWorkspaceBg() {
  return (
    <>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(155deg, #c8c4c0 0%, #e7e5e4 28%, #d6d3d1 55%, #cbc8c4 100%)',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.28,
          backgroundImage: 'radial-gradient(circle at center, rgba(87,83,78,0.22) 0.6px, transparent 0.6px)',
          backgroundSize: '14px 14px',
        }}
      />
    </>
  );
}

export function DemoCanvasView({
  artifacts,
  activeName,
  onSelect,
  tileComments = {},
  canvasReview,
}: {
  artifacts: DemoArtifact[];
  activeName?: string | null;
  onSelect?: (artifact: DemoArtifact) => void;
  tileComments?: Record<string, string>;
  canvasReview?: CanvasReviewState | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const positionsRef = useRef<Record<string, TilePos>>({});
  const dragRef = useRef<{ key: string; offsetX: number; offsetY: number } | null>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  const [positions, setPositions] = useState<Record<string, TilePos>>({});
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [drag, setDrag] = useState<{ key: string; offsetX: number; offsetY: number } | null>(null);
  const [ambientFrame, setAmbientFrame] = useState<{
    positions: Record<string, { x: number; y: number }>;
    sizes: Record<string, DesktopSize>;
    activeKey: string;
  } | null>(null);

  const reducedMotion = usePrefersReducedMotion();
  const inViewport = useInViewport(stageRef);

  positionsRef.current = positions;
  dragRef.current = drag;

  const tiles = artifacts.slice(0, 4);
  const reviewActive = Boolean(canvasReview && canvasReview.phase !== 'idle');
  const ambientEnabled = inViewport && !reducedMotion && !drag && !reviewActive;

  useEffect(() => {
    if (dragRef.current) return;
    setPositions((prev) => {
      const next = { ...prev };
      const live = new Set<string>();
      tiles.forEach((artifact) => {
        const key = artifact.name;
        live.add(key);
        if (!next[key]) next[key] = autoTileLayout(tiles)[key] ?? { ...inferTileSize(artifact), x: 16, y: 16 };
      });
      for (const key of Object.keys(next)) {
        if (!live.has(key)) delete next[key];
      }
      return next;
    });
  }, [tiles]);

  useEffect(() => {
    if (activeName) setActiveKey(activeName);
  }, [activeName]);

  useEffect(() => {
    if (!ambientEnabled || tiles.length === 0) {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      startRef.current = null;
      setAmbientFrame(null);
      return undefined;
    }

    const tick = (now: number) => {
      if (startRef.current == null) startRef.current = now;
      setAmbientFrame(ambientMotionFrame(now - startRef.current, tiles));
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [ambientEnabled, tiles]);

  const handleDragStart = useCallback((e: React.MouseEvent, artifact: DemoArtifact) => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();

    const key = artifact.name;
    const ambientPos = ambientFrame?.positions[key];
    const ambientSize = ambientFrame?.sizes[key];
    const stored = positionsRef.current[key] ?? autoTileLayout([artifact])[key] ?? { ...inferTileSize(artifact), x: 16, y: 16 };
    const pos = ambientPos && ambientSize
      ? { ...stored, x: ambientPos.x, y: ambientPos.y, w: ambientSize.w, h: ambientSize.h }
      : stored;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const contentX = e.clientX - rect.left + container.scrollLeft;
    const contentY = e.clientY - rect.top + container.scrollTop;

    setActiveKey(key);
    onSelect?.(artifact);
    setPositions((prev) => ({ ...prev, [key]: pos }));
    setDrag({ key, offsetX: contentX - pos.x, offsetY: contentY - pos.y });
  }, [ambientFrame, onSelect]);

  useEffect(() => {
    if (!drag) return undefined;

    const onMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const contentX = e.clientX - rect.left + container.scrollLeft;
      const contentY = e.clientY - rect.top + container.scrollTop;

      setPositions((prev) => {
        const pos = prev[drag.key];
        if (!pos) return prev;
        const maxX = Math.max(0, STAGE_W - 80);
        const maxY = Math.max(0, STAGE_H - CANVAS_STATUS_BAR_H - 48);
        const x = Math.max(0, Math.min(maxX, contentX - drag.offsetX));
        const y = Math.max(0, Math.min(maxY, contentY - drag.offsetY));
        return { ...prev, [drag.key]: { ...pos, x, y } };
      });
    };

    const onUp = () => setDrag(null);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [drag]);

  if (artifacts.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'center', padding: 24, background: '#F5F5F4' }}>
        <Layers size={28} strokeWidth={1.5} color={C.textSubtle} />
        <p style={{ fontSize: 12, fontWeight: 600, color: C.text, margin: '10px 0 4px' }}>Canvas</p>
        <p style={{ fontSize: 11, color: C.textSubtle, maxWidth: 220, textAlign: 'center', lineHeight: 1.5 }}>
          Multiple deliverables appear here as agents finish parallel work.
        </p>
      </div>
    );
  }

  const useAmbient = ambientEnabled && ambientFrame != null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minWidth: 0, background: '#E7E5E4' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px',
        borderBottom: `1px solid ${C.border}`, background: '#FAFAF9', flexShrink: 0,
      }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 9px', borderRadius: 6,
          fontSize: 11, fontWeight: 600, background: '#f0f5e6', color: '#284800', border: '1px solid #c4d9a0',
        }}>
          <Layers size={12} strokeWidth={1.75} /> Canvas
        </span>
        <span style={{ fontSize: 11, color: C.textSubtle }}>
          {tiles.length} artifacts · {useAmbient ? 'live workspace' : 'drag to arrange'}
        </span>
      </div>
      <div
        ref={containerRef}
        data-demo-target="canvas-stage"
        className="Trooper-scrollbar"
        style={{ flex: 1, position: 'relative', overflow: 'auto', minHeight: 280, cursor: drag ? 'grabbing' : 'default' }}
      >
        <div
          ref={stageRef}
          style={{
            position: 'relative',
            width: STAGE_W,
            height: STAGE_H,
            minWidth: '100%',
            minHeight: '100%',
            borderRadius: 8,
            overflow: 'hidden',
            border: '1px solid rgba(120,113,108,0.35)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35)',
          }}
        >
          <DesktopWorkspaceBg />
          {tiles.map((artifact, i) => {
            const key = artifact.name;
            const stored = positions[key] ?? autoTileLayout(tiles)[key] ?? { ...inferTileSize(artifact), x: 16, y: 16 };
            const ambientPos = useAmbient ? ambientFrame.positions[key] : null;
            const ambientSize = useAmbient ? ambientFrame.sizes[key] : null;
            const pos = ambientPos && ambientSize && !drag
              ? { x: ambientPos.x, y: ambientPos.y, w: ambientSize.w, h: ambientSize.h }
              : stored;
            const active = useAmbient
              ? (activeKey === key || activeName === artifact.name || ambientFrame.activeKey === key)
              : (activeKey === key || activeName === artifact.name);
            const dragging = drag?.key === key;
            const comment = tileComments[key];
            const isReviewTile = canvasReview?.artifactName === key;
            const reviewActiveOnTile = isReviewTile && canvasReview!.phase !== 'idle';
            const selectedLines = reviewActiveOnTile ? canvasReview!.selectedLines : [];
            const showHighlight = reviewActiveOnTile || Boolean(comment);
            const bodyH = Math.max(56, pos.h - CANVAS_TITLE_BAR_H);

            return (
              <div
                key={key}
                data-demo-target="canvas-tile"
                data-artifact-name={artifact.name}
                role="button"
                tabIndex={0}
                onMouseDown={() => setActiveKey(key)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setActiveKey(key);
                }}
                style={{
                  position: 'absolute',
                  left: pos.x,
                  top: pos.y,
                  width: pos.w,
                  height: pos.h,
                  zIndex: active ? 30 : dragging ? 20 : 10 + i,
                  borderRadius: 10,
                  border: `1px solid ${active || showHighlight ? C.brand : C.border}`,
                  background: C.card,
                  boxShadow: active || showHighlight
                    ? '0 16px 40px -12px rgba(63,107,0,0.35), 0 4px 12px rgba(28,25,23,0.12)'
                    : '0 12px 32px -12px rgba(28,25,23,0.18)',
                  overflow: 'hidden',
                  textAlign: 'left',
                  padding: 0,
                  transform: dragging ? 'scale(1.01)' : 'none',
                  willChange: useAmbient ? 'left, top, width, height, transform' : undefined,
                  transition: useAmbient
                    ? `left 0.72s ${MOTION_EASE}, top 0.72s ${MOTION_EASE}, width 0.72s ${MOTION_EASE}, height 0.72s ${MOTION_EASE}, box-shadow 0.2s ease, transform 0.18s ease, border-color 0.2s ease`
                    : dragging
                      ? 'none'
                      : 'box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease',
                  userSelect: 'none',
                }}
              >
                <div
                  onMouseDown={(e) => handleDragStart(e, artifact)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px',
                    height: CANVAS_TITLE_BAR_H, boxSizing: 'border-box',
                    borderBottom: `1px solid ${C.border}`, background: '#FAFAF9',
                    cursor: dragging ? 'grabbing' : 'grab',
                  }}
                >
                  <span style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: '#ff5f57', boxShadow: '16px 0 0 #febc2e, 32px 0 0 #28c840',
                  }} />
                  <span style={{
                    flex: 1, fontSize: 10, fontWeight: 600, color: C.textMuted,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginLeft: 28,
                  }}>
                    {artifact.name}
                  </span>
                  <button
                    type="button"
                    data-demo-target="canvas-comment-btn"
                    data-artifact-name={artifact.name}
                    onMouseDown={(e) => e.stopPropagation()}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 3, padding: '2px 6px',
                      borderRadius: 5, border: `1px solid ${comment ? C.brand : C.border}`,
                      background: comment ? '#f0f5e6' : C.card,
                      fontSize: 9, fontWeight: 600, color: comment ? '#284800' : C.textSubtle,
                      cursor: 'pointer', flexShrink: 0,
                    }}
                  >
                    <MessageSquarePlus size={10} strokeWidth={2} />
                    {comment ? '1' : '+'}
                  </button>
                </div>
                <div
                  className="Trooper-scrollbar"
                  style={{
                    height: bodyH,
                    overflow: 'auto',
                    pointerEvents: reviewActiveOnTile ? 'auto' : 'none',
                    position: 'relative',
                  }}
                >
                  {!reviewActiveOnTile && <DemoArtifactTilePreview artifact={artifact} canvasTile />}
                  {reviewActiveOnTile && (
                    <>
                      <DemoArtifactTilePreview artifact={artifact} canvasTile />
                      <DemoCanvasReviewLayer
                        content={artifact.content}
                        selectedLines={selectedLines}
                        showComposer={canvasReview!.phase === 'composing'}
                        draftText={canvasReview!.draftText}
                      />
                      {selectedLines[0] !== undefined && (
                        <span
                          aria-hidden
                          data-demo-target="canvas-tile-review-start"
                          data-artifact-name={artifact.name}
                          style={{ position: 'absolute', left: 8, bottom: 48, width: 1, height: 1 }}
                        />
                      )}
                      {selectedLines.length > 0 && (
                        <span
                          aria-hidden
                          data-demo-target="canvas-tile-review-end"
                          data-artifact-name={artifact.name}
                          style={{ position: 'absolute', left: '70%', bottom: canvasReview!.phase === 'composing' ? 72 : 20, width: 1, height: 1 }}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: CANVAS_STATUS_BAR_H,
              zIndex: 5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 10px',
              borderTop: '1px solid rgba(120,113,108,0.25)',
              background: 'linear-gradient(180deg, rgba(41,37,36,0.88) 0%, rgba(28,25,23,0.94) 100%)',
            }}
          >
            <span style={{ fontSize: 9, fontWeight: 500, color: '#a8a29e' }}>Canvas workspace</span>
            <span style={{ fontSize: 9, color: '#78716c' }}>{tiles.length} artifacts · organized</span>
          </div>
        </div>
      </div>
    </div>
  );
}
