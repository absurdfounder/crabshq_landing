'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Layers } from 'lucide-react';
import { TROOPER_DEMO as C } from './demoTheme';
import type { DemoArtifact } from './demoTaskExecution';
import { DemoArtifactPanel } from './DemoArtifactPanel';

const STAGE_W = 720;
const STAGE_H = 420;
const DEFAULT_W = 300;
const DEFAULT_H = 210;

type TilePos = { x: number; y: number; w: number; h: number };

function defaultPos(i: number): TilePos {
  return {
    x: 18 + i * 34,
    y: 14 + i * 26,
    w: DEFAULT_W,
    h: DEFAULT_H,
  };
}

export function DemoCanvasView({
  artifacts,
  activeName,
  onSelect,
}: {
  artifacts: DemoArtifact[];
  activeName?: string | null;
  onSelect?: (artifact: DemoArtifact) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const positionsRef = useRef<Record<string, TilePos>>({});
  const dragRef = useRef<{ key: string; offsetX: number; offsetY: number } | null>(null);

  const [positions, setPositions] = useState<Record<string, TilePos>>({});
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [drag, setDrag] = useState<{ key: string; offsetX: number; offsetY: number } | null>(null);

  positionsRef.current = positions;
  dragRef.current = drag;

  const tiles = artifacts.slice(0, 4);

  useEffect(() => {
    if (dragRef.current) return;
    setPositions((prev) => {
      const next = { ...prev };
      const live = new Set<string>();
      tiles.forEach((artifact, i) => {
        const key = artifact.name;
        live.add(key);
        if (!next[key]) next[key] = defaultPos(i);
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

  const handleDragStart = useCallback((e: React.MouseEvent, artifact: DemoArtifact) => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();

    const key = artifact.name;
    const pos = positionsRef.current[key] ?? defaultPos(0);
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const contentX = e.clientX - rect.left + container.scrollLeft;
    const contentY = e.clientY - rect.top + container.scrollTop;

    setActiveKey(key);
    onSelect?.(artifact);
    setDrag({ key, offsetX: contentX - pos.x, offsetY: contentY - pos.y });
  }, [onSelect]);

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
        const maxY = Math.max(0, STAGE_H - 56);
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
        <span style={{ fontSize: 11, color: C.textSubtle }}>{tiles.length} artifacts · drag to arrange</span>
      </div>
      <div
        ref={containerRef}
        className="Trooper-scrollbar"
        style={{ flex: 1, position: 'relative', overflow: 'auto', minHeight: 280, cursor: drag ? 'grabbing' : 'default' }}
      >
        <div style={{ position: 'relative', width: STAGE_W, height: STAGE_H, minWidth: '100%', minHeight: '100%' }}>
          {tiles.map((artifact, i) => {
            const key = artifact.name;
            const pos = positions[key] ?? defaultPos(i);
            const active = activeKey === key || activeName === artifact.name;
            const dragging = drag?.key === key;

            return (
              <div
                key={key}
                role="button"
                tabIndex={0}
                onMouseDown={() => {
                  setActiveKey(key);
                  onSelect?.(artifact);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveKey(key);
                    onSelect?.(artifact);
                  }
                }}
                style={{
                  position: 'absolute',
                  left: pos.x,
                  top: pos.y,
                  width: pos.w,
                  height: pos.h,
                  zIndex: active ? 30 : 10 + i,
                  borderRadius: 10,
                  border: `1px solid ${active ? C.brand : C.border}`,
                  background: C.card,
                  boxShadow: active
                    ? '0 16px 40px -12px rgba(63,107,0,0.35), 0 4px 12px rgba(28,25,23,0.12)'
                    : '0 12px 32px -12px rgba(28,25,23,0.18)',
                  overflow: 'hidden',
                  textAlign: 'left',
                  padding: 0,
                  transform: dragging ? 'scale(1.01)' : 'none',
                  transition: dragging ? 'none' : 'box-shadow 0.2s ease, transform 0.2s ease',
                  userSelect: 'none',
                }}
              >
                <div
                  onMouseDown={(e) => handleDragStart(e, artifact)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px',
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
                </div>
                <div style={{ height: pos.h - 34, overflow: 'hidden', pointerEvents: 'none' }}>
                  <div style={{ transform: 'scale(0.72)', transformOrigin: 'top left', width: '138%', height: '138%' }}>
                    <DemoArtifactPanel artifact={artifact} compact />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
