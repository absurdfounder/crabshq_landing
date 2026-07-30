'use client';

import { useEffect, useRef, useState } from 'react';
import { Activity, Laptop, Plus, Terminal } from 'lucide-react';
import { TROOPER_DEMO as C } from '@/components/demoTheme';
import type { DemoDesktopSession } from '@/components/demoTaskExecution';
import { DUR, EASE_OUT } from '@/lib/demoMotion';

/**
 * Agent desktop, mirroring `AgentDesktopWorkspace.jsx`: the machine's GUI on
 * top, an Activities | Terminal strip underneath. Device status uses the
 * palette from `DevicesPage.jsx`.
 */

const STATUS_TONE = {
  online: { bg: '#ecfdf5', border: '#a7f3d0', color: '#047857', label: 'Online' },
  busy: { bg: '#fffbeb', border: '#fde68a', color: '#b45309', label: 'Busy' },
  idle: { bg: '#f5f5f4', border: '#e7e5e4', color: '#57534E', label: 'Idle' },
} as const;

export function DemoDesktopWorkspace({
  session,
  lines,
  activities,
}: {
  session: DemoDesktopSession;
  /** Terminal output streamed so far. */
  lines: string[];
  activities: string[];
}) {
  const [tab, setTab] = useState<'activities' | 'terminal'>('terminal');
  const termRef = useRef<HTMLDivElement>(null);
  const tone = STATUS_TONE[session.status];

  useEffect(() => {
    const el = termRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  return (
    <div data-demo-target="desktop-workspace" style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, background: '#0c0c0c' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, height: 36, flexShrink: 0,
        padding: '0 11px', borderBottom: '1px solid rgba(255,255,255,0.08)', background: '#161616',
      }}>
        <Laptop size={13} color="#a1a1aa" strokeWidth={2} />
        <span style={{ fontSize: 11.5, fontWeight: 600, color: '#f4f4f5' }}>{session.deviceName}</span>
        <span style={{ fontSize: 10.5, color: '#71717a' }}>{session.os}</span>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 4, marginLeft: 'auto',
          borderRadius: 999, padding: '2px 8px', fontSize: 10, fontWeight: 600,
          background: tone.bg, border: `1px solid ${tone.border}`, color: tone.color,
        }}>
          <span className={session.status === 'busy' ? 'demo-live-dot' : undefined}
            style={{ width: 5, height: 5, borderRadius: '50%', background: tone.color }} />
          {tone.label}
        </span>
      </div>

      {/* GUI — what the agent is looking at on the machine */}
      <div style={{ flex: 1, minHeight: 0, position: 'relative', background: '#1a1a1e', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }} dangerouslySetInnerHTML={{ __html: session.screenSvg }} />
        <span style={{
          position: 'absolute', left: 10, top: 10, borderRadius: 6,
          background: 'rgba(0,0,0,0.66)', padding: '3px 8px',
          fontSize: 10, fontWeight: 600, color: '#e4e4e7',
        }}>
          {session.appName}
        </span>
      </div>

      {/* Activities | Terminal */}
      <div style={{ flexShrink: 0, height: 168, display: 'flex', flexDirection: 'column', borderTop: '1px solid rgba(255,255,255,0.08)', background: '#0f0f0f' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, height: 30, flexShrink: 0, padding: '0 8px', background: '#161616' }}>
          {([
            ['activities', Activity, 'Activities'],
            ['terminal', Terminal, 'Terminal 1'],
          ] as const).map(([id, Icon, label]) => {
            const on = tab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5, height: 22, padding: '0 9px',
                  borderRadius: 5, border: 'none', cursor: 'pointer',
                  background: on ? 'rgba(255,255,255,0.09)' : 'transparent',
                  color: on ? '#f4f4f5' : '#71717a', fontSize: 10.5, fontWeight: 600,
                  transition: `background-color ${DUR.hover}ms ${EASE_OUT}, color ${DUR.hover}ms ${EASE_OUT}`,
                }}
              >
                <Icon size={11} strokeWidth={2} />
                {label}
              </button>
            );
          })}
          <button type="button" style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 20, height: 20, borderRadius: 5, border: 'none', background: 'transparent',
            color: '#52525b', cursor: 'pointer',
          }}>
            <Plus size={12} strokeWidth={2} />
          </button>
        </div>

        {tab === 'terminal' ? (
          <div
            ref={termRef}
            className="Trooper-scrollbar"
            style={{
              flex: 1, minHeight: 0, overflowY: 'auto', padding: '8px 11px',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              fontSize: 10.5, lineHeight: 1.7, color: '#d4d4d8',
            }}
          >
            {lines.map((line, i) => (
              <div key={i} style={{
                whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                color: line.startsWith('$') ? '#7ee787' : line.includes('error') || line.includes('failed') ? '#ff7b72' : '#d4d4d8',
              }}>
                {line}
              </div>
            ))}
            <span style={{ display: 'inline-block', width: 7, height: 13, background: '#7ee787', verticalAlign: 'text-bottom' }} className="demo-blink" />
          </div>
        ) : (
          <div className="Trooper-scrollbar" style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '6px 10px' }}>
            {(activities.length ? activities : session.activities.map(a => a.label)).map((label, i) => (
              <div key={i} className="demo-enter" style={{
                display: 'flex', alignItems: 'center', gap: 7, padding: '5px 0',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.brand, flexShrink: 0 }} />
                <span style={{ fontSize: 10.5, color: '#d4d4d8' }}>{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
