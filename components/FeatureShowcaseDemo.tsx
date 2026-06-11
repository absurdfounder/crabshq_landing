'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Home, ListTodo, Target, Clock, HardDrive, Users, Laptop, Brain, Shapes, Settings,
  Plus, LayoutGrid, Columns3, List,
} from 'lucide-react';
import { TROOPER_DEMO as C, KANBAN_COLUMNS, type DemoColumnId } from './demoTheme';
import { DemoMainPage } from './demoPages';
import { DemoTaskModal } from './demoTaskModal';
import { ACTION_TASK_SNAPSHOT, TICKET_TASK_SNAPSHOT } from './featureShowcaseSnapshots';

export type FeatureShowcaseVariant =
  | 'agents'
  | 'skills'
  | 'memory'
  | 'goals'
  | 'routines'
  | 'tasks'
  | 'task-modal-action'
  | 'task-modal-ticket';

type PageId = 'home' | 'tasks' | 'goals' | 'routines' | 'files' | 'agents' | 'devices' | 'memory' | 'skills' | 'settings';

const FEATURE_CANVAS_W = 900;
const FEATURE_CHROME_H = 36;
const FEATURE_APP_H = 500;
const FEATURE_CANVAS_H = FEATURE_APP_H + FEATURE_CHROME_H;
const FEATURE_RAIL_W = 48;
const FEATURE_NAV_W = 188;
const FEATURE_KANBAN_COL_W = 148;

const MENU_NAV: { label: string; icon: typeof Home; id: PageId }[] = [
  { label: 'Home', icon: Home, id: 'home' },
  { label: 'Tasks', icon: ListTodo, id: 'tasks' },
  { label: 'Goals', icon: Target, id: 'goals' },
  { label: 'Routines', icon: Clock, id: 'routines' },
  { label: 'Files', icon: HardDrive, id: 'files' },
  { label: 'Agents', icon: Users, id: 'agents' },
  { label: 'Devices', icon: Laptop, id: 'devices' },
  { label: 'Memory', icon: Brain, id: 'memory' },
  { label: 'Skills & Plugins', icon: Shapes, id: 'skills' },
  { label: 'Settings', icon: Settings, id: 'settings' },
];

const VARIANT_PAGE: Record<FeatureShowcaseVariant, PageId> = {
  agents: 'agents',
  skills: 'skills',
  memory: 'memory',
  goals: 'goals',
  routines: 'routines',
  tasks: 'tasks',
  'task-modal-action': 'tasks',
  'task-modal-ticket': 'tasks',
};

const STATIC_KANBAN: Record<DemoColumnId, { id: number; title: string; tags: string[] }[]> = {
  inbox: [
    { id: 1, title: 'SEO Optimization for Wonder', tags: ['seo', 'launch'] },
    { id: 2, title: 'Create branded swag kit', tags: ['branding'] },
  ],
  in_progress: [
    { id: 3, title: 'Improve website UX', tags: ['ux'] },
    { id: 4, title: 'Social media strategy', tags: ['social'] },
  ],
  review: [
    { id: 5, title: 'Landing page mockup', tags: ['design'] },
  ],
  done: [
    { id: 6, title: 'Capture website screenshots', tags: ['visual'] },
  ],
};

function ShowcaseScaleFrame({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      setScale(w >= FEATURE_CANVAS_W ? 1 : Math.max(0.55, w / FEATURE_CANVAS_W));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  const scaledW = FEATURE_CANVAS_W * scale;
  const scaledH = FEATURE_CANVAS_H * scale;

  return (
    <div ref={containerRef} className="w-full h-full min-h-[280px] flex items-center justify-center">
      <div style={{ width: scaledW, height: scaledH, position: 'relative', flexShrink: 0 }}>
        <div
          style={{
            width: FEATURE_CANVAS_W,
            height: FEATURE_CANVAS_H,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function ShowcaseSidebar({ activePage }: { activePage: PageId }) {
  return (
    <div style={{ display: 'flex', height: '100%', flexShrink: 0 }}>
      <div style={{
        width: FEATURE_RAIL_W, minWidth: FEATURE_RAIL_W, borderRight: `1px solid ${C.border}`,
        background: C.bg, display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'space-between', padding: '6px 0',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <img src="/images/trooper-logomark.png" alt="" style={{ width: 28, height: 28, objectFit: 'contain', imageRendering: 'pixelated' }} />
          <div style={{ width: 24, height: 1, background: 'rgba(231,229,228,0.9)' }} />
          <div style={{
            width: 36, height: 36, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: C.card, boxShadow: '0 1px 3px rgba(28,25,23,0.08)', padding: 3,
          }}>
            <img src="/images/trooper-logomark.png" alt="" style={{ width: 24, height: 24, objectFit: 'contain', imageRendering: 'pixelated' }} />
          </div>
          <div style={{
            width: 36, height: 36, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(245,245,244,0.7)', color: C.textSubtle,
          }}>
            <Plus size={14} strokeWidth={1.5} />
          </div>
        </div>
        <img
          src="https://avatars.githubusercontent.com/u/25829699?v=4"
          alt=""
          style={{ width: 36, height: 36, borderRadius: 14, objectFit: 'cover' }}
        />
      </div>

      <div style={{
        width: FEATURE_NAV_W, minWidth: FEATURE_NAV_W, borderRight: `1px solid ${C.border}`,
        background: C.bg, display: 'flex', flexDirection: 'column', padding: '8px 6px', overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', gap: 4, marginBottom: 10, padding: '0 2px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 5, height: 28, padding: '0 8px',
            borderRadius: 14, background: C.card, boxShadow: '0 1px 3px rgba(28,25,23,0.06)',
            fontSize: 12, fontWeight: 600, color: C.text,
          }}>
            <LayoutGrid size={14} strokeWidth={1.35} /> Menu
          </div>
        </div>
        <div className="Trooper-scrollbar" style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
          {MENU_NAV.map((item) => {
            const Icon = item.icon;
            const active = activePage === item.id;
            return (
              <div
                key={item.id}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '6px 8px', borderRadius: 14, marginBottom: 1,
                  background: active ? C.card : 'transparent',
                  boxShadow: active ? '0 1px 3px rgba(28,25,23,0.06)' : 'none',
                }}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: active ? C.brandLight : 'rgba(237,235,233,0.8)',
                  color: active ? '#292524' : C.textMuted,
                }}>
                  <Icon size={14} strokeWidth={1.35} />
                </div>
                <span style={{
                  fontSize: 12, fontWeight: active ? 600 : 500,
                  color: active ? C.text : '#44403c',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ShowcaseKanban() {
  return (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', background: C.bg, overflow: 'hidden' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px',
        borderBottom: `1px solid ${C.border}`, background: C.cardWarm, flexShrink: 0,
      }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Tasks</span>
        <div style={{ display: 'inline-flex', gap: 2, marginLeft: 8 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 4, height: 26, padding: '0 8px',
            borderRadius: 6, fontSize: 10, fontWeight: 500, color: C.text, background: C.card,
            border: `1px solid ${C.border}`,
          }}>
            <Columns3 size={12} strokeWidth={1.5} /> Columns
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 4, height: 26, padding: '0 8px',
            borderRadius: 6, fontSize: 10, fontWeight: 500, color: C.textMuted,
          }}>
            <List size={12} strokeWidth={1.5} /> List
          </div>
        </div>
      </div>
      <div className="Trooper-scrollbar" style={{ display: 'flex', gap: 8, flex: 1, overflowX: 'auto', overflowY: 'hidden', padding: 10, minHeight: 0 }}>
        {(Object.keys(KANBAN_COLUMNS) as DemoColumnId[]).map((colKey) => {
          const col = KANBAN_COLUMNS[colKey];
          const tasks = STATIC_KANBAN[colKey];
          return (
            <div key={colKey} style={{ width: FEATURE_KANBAN_COL_W, minWidth: FEATURE_KANBAN_COL_W, flexShrink: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '6px 10px', borderRadius: 8, marginBottom: 4, background: col.headerBg, color: col.headerText,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 14 }}>{col.emoji}</span>
                  <span style={{ fontSize: 11, fontWeight: 600 }}>{col.label}</span>
                </div>
                <span style={{ fontSize: 10, fontWeight: 600, padding: '1px 5px', borderRadius: 999, background: 'rgba(255,255,255,0.6)' }}>{tasks.length}</span>
              </div>
              <div style={{ flex: 1, overflowY: 'auto', borderRadius: 8, padding: 6, background: col.bodyBg }}>
                {tasks.map((t) => (
                  <div key={t.id} style={{
                    background: C.card, borderRadius: 8, border: `1px solid ${C.border}`,
                    padding: '8px 9px', marginBottom: 5,
                    boxShadow: '0 1px 2px rgba(28,25,23,0.04)',
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: C.text, lineHeight: 1.4, marginBottom: 6 }}>{t.title}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                      {t.tags.map((tag) => (
                        <span key={tag} style={{
                          fontSize: 9, fontWeight: 500, color: C.textMuted, background: C.bg,
                          border: `1px solid ${C.border}`, padding: '1px 6px', borderRadius: 999,
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ShowcaseAppWindow({ variant }: { variant: FeatureShowcaseVariant }) {
  const activePage = VARIANT_PAGE[variant];
  const isTaskModal = variant === 'task-modal-action' || variant === 'task-modal-ticket';
  const snapshot = variant === 'task-modal-ticket' ? TICKET_TASK_SNAPSHOT : ACTION_TASK_SNAPSHOT;

  return (
    <div
      className="Trooper-demo-feature"
      style={{
        width: FEATURE_CANVAS_W, height: FEATURE_CANVAS_H, borderRadius: C.radius, overflow: 'hidden',
        border: `1px solid ${C.border}`, background: C.bg,
        boxShadow: '0 16px 32px -12px rgba(28,25,23,0.16), 0 4px 8px -4px rgba(28,25,23,0.08)',
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        fontSize: 13,
      }}
    >
      <style>{`
        .Trooper-demo-feature .Trooper-scrollbar::-webkit-scrollbar{width:4px;height:4px}
        .Trooper-demo-feature .Trooper-scrollbar::-webkit-scrollbar-track{background:rgba(231,229,228,0.35);border-radius:4px}
        .Trooper-demo-feature .Trooper-scrollbar::-webkit-scrollbar-thumb{background:${C.textSubtle};border-radius:4px}
        .Trooper-demo-feature *{box-sizing:border-box}
      `}</style>

      <div style={{
        display: 'flex', alignItems: 'center', height: FEATURE_CHROME_H, padding: '0 12px',
        background: C.cardWarm, borderBottom: `1px solid ${C.border}`, gap: 10,
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
        </div>
        <span style={{ fontSize: 11, fontWeight: 500, color: C.textMuted, letterSpacing: '-0.01em' }}>Trooper</span>
      </div>

      <div style={{ display: 'flex', height: FEATURE_APP_H, position: 'relative' }}>
        <ShowcaseSidebar activePage={activePage} />
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
          {isTaskModal ? (
            <>
              <ShowcaseKanban />
              <DemoTaskModal
                open
                taskTitle={snapshot.taskTitle}
                assignee={snapshot.assignee}
                subtasks={snapshot.subtasks}
                feed={snapshot.feed}
                artifact={snapshot.artifact}
                delivery={snapshot.delivery}
                statusCol={snapshot.statusCol}
              />
            </>
          ) : activePage === 'tasks' ? (
            <ShowcaseKanban />
          ) : (
            <DemoMainPage pageId={activePage} />
          )}
        </div>
      </div>
    </div>
  );
}

export function FeatureShowcaseDemo({ variant, className = '' }: { variant: FeatureShowcaseVariant; className?: string }) {
  return (
    <div className={`flex flex-1 flex-col items-center justify-center w-full h-full min-h-[320px] ${className}`}>
      <ShowcaseScaleFrame>
        <ShowcaseAppWindow variant={variant} />
      </ShowcaseScaleFrame>
    </div>
  );
}
