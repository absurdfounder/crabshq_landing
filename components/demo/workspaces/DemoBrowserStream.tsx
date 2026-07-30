'use client';

import { useEffect, useRef } from 'react';
import { MousePointer2, Monitor } from 'lucide-react';
import { TROOPER_DEMO as C } from '@/components/demoTheme';
import type { DemoBrowserSession } from '@/components/demoTaskExecution';
import { DUR, EASE_OUT } from '@/lib/demoMotion';

/**
 * Live browser workspace, mirroring the app's `BrowserLiveArtifactPanel.jsx`:
 * the newest captured frame fills the viewport, older frames sit in a
 * filmstrip that auto-follows the latest, and the header carries the page URL,
 * the capture source and what the agent is doing right now.
 */
export function DemoBrowserStream({
  session,
  frameCount,
}: {
  session: DemoBrowserSession;
  /** How many frames have streamed in so far. */
  frameCount: number;
}) {
  const stripRef = useRef<HTMLDivElement>(null);
  const shown = session.frames.slice(0, Math.max(1, frameCount));
  const current = shown[shown.length - 1];

  useEffect(() => {
    const el = stripRef.current;
    if (el) el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
  }, [frameCount]);

  return (
    <div data-demo-target="browser-stream" style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, background: C.card }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '7px 12px',
        borderBottom: `1px solid ${C.border}`, background: '#FAFAF9', flexShrink: 0,
      }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 5, flexShrink: 0,
          borderRadius: 999, border: `1px solid ${C.border}`, background: C.card,
          padding: '2px 8px', fontSize: 10, fontWeight: 600, color: C.textMuted,
        }}>
          <Monitor size={11} strokeWidth={2} />
          {session.source}
        </span>
        <span style={{
          flex: 1, minWidth: 0, fontSize: 11, color: C.textSubtle,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        }}>
          {current?.url || session.domain}
        </span>
        <button type="button" className="demo-hoverable demo-chip" style={{
          display: 'inline-flex', alignItems: 'center', gap: 4, flexShrink: 0,
          height: 24, padding: '0 9px', borderRadius: 7,
          border: `1px solid ${C.border}`, background: C.card,
          fontSize: 10.5, fontWeight: 600, color: C.textMuted, cursor: 'pointer',
        }}>
          <MousePointer2 size={11} strokeWidth={2} />
          Take control
        </button>
      </div>

      {/* Current frame */}
      <div style={{ flex: 1, minHeight: 0, position: 'relative', background: '#F5F5F4', overflow: 'hidden' }}>
        {current && (
          <div
            key={current.id}
            className="demo-enter"
            style={{ position: 'absolute', inset: 0 }}
            dangerouslySetInnerHTML={{ __html: current.svg }}
          />
        )}
        <div style={{
          position: 'absolute', left: 10, bottom: 10, right: 10,
          display: 'flex', alignItems: 'center', gap: 7,
          borderRadius: 8, background: 'rgba(28,25,23,0.82)', backdropFilter: 'blur(4px)',
          padding: '6px 10px', color: '#fafaf9',
        }}>
          <span className="demo-live-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
          <span style={{ fontSize: 11, fontWeight: 500, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {current?.action || 'Waiting for browser activity'}
          </span>
          <span style={{ marginLeft: 'auto', flexShrink: 0, fontSize: 10, color: 'rgba(250,250,249,0.6)', fontVariantNumeric: 'tabular-nums' }}>
            {current?.time}
          </span>
        </div>
      </div>

      {/* Filmstrip — follows the newest capture */}
      <div
        ref={stripRef}
        className="Trooper-scrollbar"
        style={{
          display: 'flex', gap: 6, flexShrink: 0, padding: '8px 10px',
          borderTop: `1px solid ${C.border}`, background: '#FAFAF9', overflowX: 'auto',
        }}
      >
        {shown.map((frame, i) => {
          const active = i === shown.length - 1;
          return (
            <div
              key={frame.id}
              title={frame.action}
              style={{
                width: 74, height: 48, flexShrink: 0, borderRadius: 5, overflow: 'hidden',
                border: `1.5px solid ${active ? C.brand : C.border}`,
                boxShadow: active ? '0 0 0 2px rgba(63,107,0,0.14)' : 'none',
                background: C.card, position: 'relative',
                transition: `border-color ${DUR.hover}ms ${EASE_OUT}, box-shadow ${DUR.hover}ms ${EASE_OUT}`,
              }}
            >
              <div
                style={{ position: 'absolute', inset: 0, transform: 'scale(0.0974)', transformOrigin: 'top left', width: 760, height: 500 }}
                dangerouslySetInnerHTML={{ __html: frame.svg }}
              />
            </div>
          );
        })}
        <span style={{ flexShrink: 0, alignSelf: 'center', paddingLeft: 4, fontSize: 10, color: C.textSubtle, fontVariantNumeric: 'tabular-nums' }}>
          {shown.length}/{session.frames.length}
        </span>
      </div>
    </div>
  );
}
