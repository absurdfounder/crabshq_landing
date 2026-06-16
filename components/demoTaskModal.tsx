'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import {
  X, Check, Loader2, Globe, Search, FileText, GitCommit, MessageSquare, Terminal, Wrench,
  ChevronUp, Layers, Download, ArrowUp, ListTodo, Hash, Target, Tag,
} from 'lucide-react';
import { TROOPER_DEMO as C } from './demoTheme';
import type { DemoArtifact, DemoFeedItem, DemoSubtask, DemoTag, DemoToolLog } from './demoTaskExecution';
import { getToolIconName } from './demoTaskExecution';
import { launchScenario } from '@/lib/demoScenarios/launch';
import type { DemoOrg } from '@/lib/demoScenarios/types';
import type { ArtifactReviewState } from '@/lib/demoArtifactReview';
import { DemoFavicon } from './DemoFavicon';
import { getToolIconMeta } from '@/lib/demoToolFavicon';
import { getProviderDomain } from '@/lib/demoProviders';
import { DemoArtifactPanel } from './DemoArtifactPanel';
import { DemoCanvasView } from './DemoCanvasView';
import type { DemoWorkspaceMode } from './demoTaskExecution';

const ALL_PEOPLE: Record<string, { img: string; title?: string }> = {
  Vaibhav: { img: 'https://avatars.githubusercontent.com/u/25829699?v=4' },
  Jordan: { img: 'https://i.pravatar.cc/150?u=agent-jordan', title: 'Chief of Staff' },
  Aria: { img: 'https://i.pravatar.cc/150?u=agent-aria', title: 'Research Specialist' },
  Leo: { img: 'https://i.pravatar.cc/150?u=agent-leo', title: 'DevOps' },
  Ren: { img: 'https://i.pravatar.cc/150?u=agent-ren', title: 'Frontend' },
};

function ProviderChip({ provider, size = 14 }: { provider: string; size?: number }) {
  const domain = getProviderDomain(provider);
  if (domain === 'trooper.so') {
    return (
      <img src="/images/trooper-logomark.png" alt="" width={size} height={size} style={{ objectFit: 'contain', imageRendering: 'pixelated' }} />
    );
  }
  if (domain) return <DemoFavicon domain={domain} size={size + 2} rounded="sm" />;
  return null;
}

function ToolIcon({ tool }: { tool: string }) {
  const name = getToolIconName(tool);
  const props = { size: 13, strokeWidth: 1.75, color: '#a8a29e' };
  switch (name) {
    case 'globe': return <Globe {...props} />;
    case 'search': return <Search {...props} />;
    case 'file': return <FileText {...props} />;
    case 'git': return <GitCommit {...props} />;
    case 'message': return <MessageSquare {...props} />;
    case 'terminal': return <Terminal {...props} />;
    default: return <Wrench {...props} />;
  }
}

function Av({ name, size = 24 }: { name: string; size?: number }) {
  const src = ALL_PEOPLE[name]?.img || `https://i.pravatar.cc/150?u=${name}`;
  return <img src={src} alt="" style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />;
}

const TAG_COLORS: Record<DemoTag['type'], { bg: string; border: string; color: string }> = {
  channel: { bg: '#F5F5F4', border: '#E7E5E4', color: '#57534E' },
  goal: { bg: '#f0f5e6', border: '#c4d9a0', color: '#284800' },
  site: { bg: '#FFFBEB', border: '#FDE68A', color: '#92400E' },
  topic: { bg: '#EFF6FF', border: '#BFDBFE', color: '#1E40AF' },
};

export function DemoTagBadge({ tag, size = 'sm' }: { tag: DemoTag; size?: 'sm' | 'xs' }) {
  const palette = TAG_COLORS[tag.type];
  const compact = size === 'xs';
  const iconSize = compact ? 10 : 11;
  const padY = compact ? 1 : 2;
  const padX = compact ? 5 : 7;
  const fontSize = compact ? 9 : 10;

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: compact ? 3 : 4,
      padding: `${padY}px ${padX}px`, borderRadius: 999,
      background: palette.bg, border: `1px solid ${palette.border}`,
      color: palette.color, fontSize, fontWeight: 600, lineHeight: 1.2,
      whiteSpace: 'nowrap', flexShrink: 0,
    }}>
      {tag.type === 'site' && tag.domain ? (
        <DemoFavicon domain={tag.domain} size={iconSize + 2} rounded="sm" />
      ) : tag.type === 'channel' ? (
        <Hash size={iconSize} strokeWidth={2.25} />
      ) : tag.type === 'goal' ? (
        <Target size={iconSize} strokeWidth={2.25} />
      ) : (
        <Tag size={iconSize} strokeWidth={2.25} />
      )}
      {tag.type === 'channel' ? `#${tag.label}` : tag.label}
    </span>
  );
}

type Turn = {
  id: string;
  agent: string;
  message?: { text: string; time: string; tags?: DemoTag[] };
  tools: DemoToolLog[];
};

const THREAD_AVATAR = 28;
const THREAD_GAP = 10;

function buildTurns(feed: DemoFeedItem[]): Turn[] {
  const turns: Turn[] = [];
  for (const item of feed) {
    if (item.kind === 'message') {
      turns.push({
        id: `msg-${item.id}`,
        agent: item.sender,
        message: { text: item.text, time: item.time, tags: item.tags },
        tools: [],
      });
      continue;
    }
    const last = turns[turns.length - 1];
    if (last && last.agent === item.agent) {
      last.tools.push(item);
    } else {
      turns.push({ id: `tools-${item.id}`, agent: item.agent, tools: [item] });
    }
  }
  return turns;
}

function ToolTimelineRow({ log, isLast, isLatest }: { log: DemoToolLog; isLast: boolean; isLatest?: boolean }) {
  const running = log.status === 'running';
  const iconMeta = getToolIconMeta(log);

  return (
    <div
      className="demo-thread-tool-row"
      {...(isLatest ? { 'data-demo-target': 'modal-tool-latest' } : {})}
      style={{ display: 'flex', gap: 10, alignItems: 'stretch', minHeight: 34 }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 22, flexShrink: 0 }}>
        <div style={{ width: 1, flex: 1, background: C.border, minHeight: 4 }} />
        <div style={{
          width: 22, height: 22, borderRadius: 6, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: C.card, border: `1px solid ${C.border}`, overflow: 'hidden',
        }}>
          {iconMeta.logoSrc ? (
            <DemoFavicon src={iconMeta.logoSrc} size={14} rounded="sm" alt={log.integration} />
          ) : iconMeta.domain ? (
            <DemoFavicon domain={iconMeta.domain} size={14} rounded="sm" />
          ) : (
            <ToolIcon tool={log.tool} />
          )}
        </div>
        {!isLast && <div style={{ width: 1, flex: 1, background: C.border, minHeight: 4 }} />}
      </div>
      <div style={{
        flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 8,
        paddingBottom: isLast ? 0 : 10, paddingTop: 1,
      }}>
        <span style={{
          fontSize: 11.5, fontWeight: 600, color: C.text, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          flexShrink: 0, lineHeight: 1.3,
        }}>
          {log.label}
        </span>
        {log.detail && (
          <span style={{
            fontSize: 11, color: C.textSubtle, lineHeight: 1.3,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, minWidth: 0,
          }}>
            {log.detail}
          </span>
        )}
        <span style={{
          marginLeft: 'auto', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 18, height: 18, transition: 'opacity 0.25s ease',
        }}>
          {running
            ? <Loader2 size={14} strokeWidth={2.5} className="demo-spin" color={C.brand} />
            : <Check size={14} strokeWidth={2.5} color="#3f6b00" />}
        </span>
      </div>
    </div>
  );
}

function AgentTurn({ turn, latestToolId }: { turn: Turn; latestToolId?: string | null }) {
  const person = ALL_PEOPLE[turn.agent];
  const harnessProvider = turn.tools.find(t => t.provider)?.provider;
  return (
    <div className="demo-thread-turn" style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', gap: THREAD_GAP, alignItems: 'flex-start' }}>
        <div style={{ flexShrink: 0, paddingTop: 1 }}>
          <Av name={turn.agent} size={THREAD_AVATAR} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6, marginBottom: turn.message || turn.tools.length ? 6 : 0,
            minHeight: THREAD_AVATAR, flexWrap: 'wrap',
          }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: C.text, lineHeight: 1.2 }}>{turn.agent}</span>
            {harnessProvider && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 600,
                color: C.textMuted, padding: '2px 7px', borderRadius: 999,
                background: C.bg, border: `1px solid ${C.border}`,
              }}>
                <ProviderChip provider={harnessProvider} size={12} />
                {harnessProvider}
              </span>
            )}
            {person?.title && (
              <span style={{
                fontSize: 10, color: C.textSubtle, padding: '1px 6px', borderRadius: 4,
                background: C.bg, border: `1px solid ${C.borderWarm}`, lineHeight: 1.3,
              }}>
                {person.title}
              </span>
            )}
            {turn.message && (
              <span style={{ fontSize: 10, color: C.textSubtle, marginLeft: 'auto', flexShrink: 0 }}>
                {turn.message.time}
              </span>
            )}
          </div>
          {turn.message && (
            <>
              <p style={{ fontSize: 13, lineHeight: 1.65, color: C.text, margin: '0 0 6px' }}>{turn.message.text}</p>
              {turn.message.tags && turn.message.tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 4 }}>
                  {turn.message.tags.map(tag => (
                    <DemoTagBadge key={`${tag.type}-${tag.label}`} tag={tag} size="xs" />
                  ))}
                </div>
              )}
            </>
          )}
          {turn.tools.length > 0 && (
            <div style={{ marginTop: turn.message ? 4 : 0 }}>
              {turn.tools.map((log, i) => (
                <ToolTimelineRow
                  key={log.id}
                  log={log}
                  isLast={i === turn.tools.length - 1}
                  isLatest={log.id === latestToolId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DeliveryCard({ name, active, onClick }: { name: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      data-demo-target="modal-delivery"
      onClick={onClick}
      style={{
        display: 'flex', width: '100%', maxWidth: 360, textAlign: 'left', cursor: 'pointer',
        borderRadius: 10, border: `1px solid ${active ? C.brand : C.border}`,
        background: active ? '#f0f5e6' : C.card,
        padding: '10px 12px', marginTop: 6,
      }}
    >
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', width: '100%' }}>
        <div style={{
          width: 36, height: 44, borderRadius: '6px 6px 0 0', border: `1px solid ${C.border}`,
          background: 'linear-gradient(to bottom, white, transparent)',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 8, flexShrink: 0,
        }}>
          <FileText size={16} strokeWidth={1.75} color={C.textSubtle} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
          <div style={{ fontSize: 10, color: C.textSubtle, marginTop: 2 }}>Jordan · Document · MD</div>
        </div>
      </div>
    </button>
  );
}

function ComposerTodoAccordion({ subtasks }: { subtasks: DemoSubtask[] }) {
  const [open, setOpen] = useState(false);
  const done = subtasks.filter(s => s.status === 'done').length;
  const total = subtasks.length;
  const running = subtasks.find(s => s.status === 'running');
  const allDone = done === total;

  return (
    <div
      data-demo-target="modal-subtasks"
      style={{
        marginBottom: 8, borderRadius: 12, border: `1px solid ${C.border}`,
        background: C.card, boxShadow: '0 1px 2px rgba(0,0,0,0.03)', overflow: 'hidden',
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 14px', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <div style={{
          width: 32, height: 32, borderRadius: 8, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: allDone ? '#FEF2F2' : running ? '#FFFBEB' : '#F5F5F4',
          border: allDone ? '1px solid #FECACA' : running ? '1px solid #FDE68A' : `1px solid ${C.border}`,
          color: allDone ? '#B91C1C' : running ? '#B45309' : C.textSubtle,
        }}>
          <ListTodo size={15} strokeWidth={1.75} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>
            {done}/{total} tasks
          </div>
          <div style={{ fontSize: 11, color: C.textSubtle, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {running ? running.title : allDone ? 'All steps complete' : 'Task checklist'}
          </div>
        </div>
        <ChevronUp size={14} color={C.textSubtle} style={{ transform: open ? 'none' : 'rotate(180deg)', transition: 'transform 0.2s' }} />
      </button>
      {open && (
        <div style={{ borderTop: `1px solid ${C.border}`, padding: '8px 14px 10px' }}>
          {subtasks.map(s => {
            const isDone = s.status === 'done';
            const isRunning = s.status === 'running';
            return (
              <div key={s.id} data-demo-subtask-id={s.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '4px 0' }}>
                <div style={{ marginTop: 2, flexShrink: 0 }}>
                  {isDone ? <Check size={14} strokeWidth={2.5} color="#325600" />
                    : isRunning ? <Loader2 size={14} className="demo-spin" color="#B45309" />
                      : <div style={{ width: 14, height: 14, borderRadius: 3, border: `1.5px solid ${C.border}` }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{
                    fontSize: 12, lineHeight: 1.45, display: 'block',
                    color: isDone ? C.textSubtle : isRunning ? C.text : C.textMuted,
                    fontWeight: isRunning ? 600 : 400,
                    textDecoration: isDone ? 'line-through' : 'none',
                  }}>
                    {s.title}
                  </span>
                  {s.provider && (
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 3,
                      fontSize: 10, fontWeight: 600, color: C.textSubtle,
                    }}>
                      <ProviderChip provider={s.provider} size={11} />
                      {s.provider}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function DemoTaskModal({
  open,
  taskTitle,
  assignee,
  subtasks,
  feed,
  artifact,
  canvasArtifacts = [],
  workspaceMode = 'ide',
  onWorkspaceModeChange,
  delivery,
  statusCol,
  taskTags = launchScenario.spotlightTaskTags,
  org = launchScenario.org,
  onClose,
  onSelectArtifact,
  artifactReview,
  hasSavedArtifactReview,
  canvasReview,
  canvasTileComments,
}: {
  open: boolean;
  taskTitle: string;
  assignee: string;
  subtasks: DemoSubtask[];
  feed: DemoFeedItem[];
  artifact: DemoArtifact | null;
  canvasArtifacts?: DemoArtifact[];
  workspaceMode?: DemoWorkspaceMode;
  onWorkspaceModeChange?: (mode: DemoWorkspaceMode) => void;
  delivery: string | null;
  statusCol?: 'in_progress' | 'review' | 'done';
  taskTags?: DemoTag[];
  org?: DemoOrg;
  onClose?: () => void;
  onSelectArtifact?: (name: string) => void;
  artifactReview?: ArtifactReviewState | null;
  hasSavedArtifactReview?: boolean;
  canvasReview?: (ArtifactReviewState & { artifactName: string }) | null;
  canvasTileComments?: Record<string, string>;
}) {
  const threadRef = useRef<HTMLDivElement>(null);
  const turns = useMemo(() => buildTurns(feed), [feed]);
  const latestToolId = useMemo(() => {
    for (let i = feed.length - 1; i >= 0; i--) {
      const item = feed[i];
      if (item.kind === 'tool') return item.id;
    }
    return null;
  }, [feed]);

  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [feed, delivery, artifact]);

  const statusLabel = statusCol === 'review' ? 'Human review' : statusCol === 'done' ? 'Completed' : 'In progress';
  const statusBg = statusCol === 'review' ? '#FFFBEB' : statusCol === 'done' ? '#f0f5e6' : '#FFFBEB';
  const statusColor = statusCol === 'review' ? '#78350F' : statusCol === 'done' ? '#284800' : '#B45309';

  if (!open) return null;

  return (
    <div style={{
      position: 'absolute', inset: 6, zIndex: 30,
      display: 'flex', flexDirection: 'column',
      background: 'rgba(28,25,23,0.4)', backdropFilter: 'blur(3px)',
      borderRadius: 10,
      animation: 'modalBackdropIn 0.35s cubic-bezier(0.22, 1, 0.36, 1) both',
    }}>
      <div style={{
        position: 'relative', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column',
        margin: 8, borderRadius: 12, border: `1px solid ${C.border}`, background: C.card,
        boxShadow: '0 20px 40px -12px rgba(28,25,23,0.28)',
        overflow: 'hidden', animation: 'modalIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) both',
      }}>
        <button
          type="button"
          data-demo-target="modal-close"
          onClick={onClose}
          style={{
            position: 'absolute', top: 18, right: 18, zIndex: 5,
            width: 30, height: 30, borderRadius: 9, border: `1px solid ${C.border}`,
            background: C.card, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.textMuted,
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}
        >
          <X size={14} strokeWidth={2} />
        </button>

        {/* Split body — always visible */}
        <div style={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>
          {/* Left: thread */}
          <div style={{ flex: '0 0 54%', minWidth: 0, display: 'flex', flexDirection: 'column', borderRight: `1px solid ${C.border}` }}>
            <div ref={threadRef} data-demo-target="modal-thread" className="Trooper-scrollbar" style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
              <div style={{ padding: '14px 18px 8px', maxWidth: 480, margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap', marginBottom: 8 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: statusColor, background: statusBg, padding: '2px 7px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: 0.4 }}>
                    {statusLabel}
                  </span>
                  {taskTags.map(tag => (
                    <DemoTagBadge key={`${tag.type}-${tag.label}`} tag={tag} size="xs" />
                  ))}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: C.text, margin: '0 0 8px', lineHeight: 1.3, letterSpacing: '-0.02em', paddingRight: 28 }}>
                  {taskTitle}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14, fontSize: 11, color: C.textMuted }}>
                  <Av name={assignee} size={18} />
                  Assigned to <strong style={{ color: C.text }}>{assignee}</strong>
                </div>

                {turns.map((turn) => <AgentTurn key={turn.id} turn={turn} latestToolId={latestToolId} />)}

                {delivery && (
                  <div className="demo-thread-turn" style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', gap: THREAD_GAP, alignItems: 'flex-start' }}>
                      <div style={{ flexShrink: 0, paddingTop: 1 }}>
                        <Av name="Jordan" size={THREAD_AVATAR} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, minHeight: THREAD_AVATAR,
                        }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Jordan</span>
                        </div>
                        <DeliveryCard
                          name={delivery}
                          active={artifact?.name === delivery}
                          onClick={() => onSelectArtifact?.(delivery)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {turns.length === 0 && !delivery && (
                  <p style={{ fontSize: 12, color: C.textSubtle, textAlign: 'center', padding: 20 }}>Agents coordinating…</p>
                )}
                <div style={{ height: 8 }} />
              </div>
            </div>

            {/* Composer + checklist */}
            <div style={{ flexShrink: 0, borderTop: `1px solid ${C.borderWarm}`, background: C.card, padding: '8px 14px 10px' }}>
              <div style={{ maxWidth: 480, margin: '0 auto' }}>
                <ComposerTodoAccordion subtasks={subtasks} />
                <div style={{
                  borderRadius: 12, border: `1px solid ${C.border}`, background: C.card,
                  padding: '8px 10px 6px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
                    <DemoTagBadge tag={{ label: org.name.toLowerCase(), type: 'site', domain: org.domain }} size="xs" />
                    {taskTags[0]?.type === 'channel' && (
                      <DemoTagBadge tag={taskTags[0]} size="xs" />
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: C.textSubtle, minHeight: 24, padding: '2px 4px' }}>
                    Do anything with AI…
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: '50%', background: '#F5F5F4',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.textSubtle,
                    }}>
                      <ArrowUp size={13} strokeWidth={2.25} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: IDE or Canvas workspace */}
          <div data-demo-target="modal-workspace" style={{ flex: '1 1 46%', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px',
              borderBottom: `1px solid ${C.border}`, background: '#FAFAF9', flexShrink: 0,
            }}>
              <div style={{ display: 'flex', borderRadius: 8, border: `1px solid ${C.border}`, padding: 2, background: '#F5F5F4' }}>
                {(['ide', 'canvas'] as const).map(mode => (
                  <button
                    key={mode}
                    type="button"
                    data-demo-target={mode === 'ide' ? 'modal-workspace-ide' : 'modal-workspace-canvas'}
                    onClick={() => onWorkspaceModeChange?.(mode)}
                    style={{
                      padding: '3px 10px', borderRadius: 6, border: 'none', cursor: 'pointer',
                      fontSize: 11, fontWeight: 600, textTransform: 'capitalize',
                      background: workspaceMode === mode ? C.card : 'transparent',
                      color: workspaceMode === mode ? C.text : C.textSubtle,
                      boxShadow: workspaceMode === mode ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                    }}
                  >
                    {mode === 'ide' ? 'IDE' : 'Canvas'}
                  </button>
                ))}
              </div>
              {workspaceMode === 'canvas' && canvasArtifacts.length > 0 && (
                <span style={{ fontSize: 10, color: C.textSubtle }}>{canvasArtifacts.length} open</span>
              )}
            </div>
            {workspaceMode === 'canvas' ? (
              <DemoCanvasView
                artifacts={canvasArtifacts}
                activeName={artifact?.name}
                onSelect={(a) => onSelectArtifact?.(a.name)}
                tileComments={canvasTileComments}
                canvasReview={canvasReview}
              />
            ) : (
              <DemoArtifactPanel
                artifact={artifact}
                review={artifactReview}
                hasSavedReview={hasSavedArtifactReview}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
