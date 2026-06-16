'use client';

import { Layers } from 'lucide-react';
import { TROOPER_DEMO as C } from './demoTheme';
import type { DemoArtifact } from './demoTaskExecution';
import { DemoArtifactPanel } from './DemoArtifactPanel';

const OFFSETS = [
  { x: 12, y: 8, z: 4 },
  { x: 36, y: 28, z: 3 },
  { x: 60, y: 48, z: 2 },
  { x: 84, y: 68, z: 1 },
];

export function DemoCanvasView({
  artifacts,
  activeName,
  onSelect,
}: {
  artifacts: DemoArtifact[];
  activeName?: string | null;
  onSelect?: (artifact: DemoArtifact) => void;
}) {
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

  const tiles = artifacts.slice(0, 4);

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
        <span style={{ fontSize: 11, color: C.textSubtle }}>{tiles.length} artifacts</span>
      </div>
      <div className="Trooper-scrollbar" style={{ flex: 1, position: 'relative', overflow: 'auto', minHeight: 280 }}>
        <div style={{ position: 'relative', minWidth: 420, minHeight: 340, padding: 12 }}>
          {tiles.map((artifact, i) => {
            const pos = OFFSETS[i] ?? OFFSETS[OFFSETS.length - 1];
            const active = activeName === artifact.name;
            return (
              <button
                key={artifact.name}
                type="button"
                onClick={() => onSelect?.(artifact)}
                style={{
                  position: 'absolute',
                  left: pos.x,
                  top: pos.y,
                  zIndex: pos.z + (active ? 10 : 0),
                  width: 280,
                  height: 200,
                  borderRadius: 10,
                  border: `1px solid ${active ? C.brand : C.border}`,
                  background: C.card,
                  boxShadow: active
                    ? '0 16px 40px -12px rgba(63,107,0,0.35), 0 4px 12px rgba(28,25,23,0.12)'
                    : '0 12px 32px -12px rgba(28,25,23,0.18)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: 0,
                  transform: active ? 'scale(1.02)' : 'none',
                  transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                }}
              >
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px',
                  borderBottom: `1px solid ${C.border}`, background: '#FAFAF9',
                }}>
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
                <div style={{ height: 168, overflow: 'hidden', pointerEvents: 'none' }}>
                  <div style={{ transform: 'scale(0.72)', transformOrigin: 'top left', width: '138%', height: '138%' }}>
                    <DemoArtifactPanel artifact={artifact} compact />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
