'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import {
  X, Check, Loader2, Globe, Search, FileText, GitCommit, MessageSquare, Terminal, Wrench,
  ChevronUp, Layers, Download, ArrowUp, ListTodo, Hash, Target, Tag,
} from 'lucide-react';
import { TROOPER_DEMO as C } from './demoTheme';
import type { DemoArtifact, DemoFeedItem, DemoSubtask, DemoTag, DemoToolLog } from './demoTaskExecution';
import { getToolIconName, SPOTLIGHT_TASK_TAGS, DEMO_ORG } from './demoTaskExecution';
import { DemoFavicon } from './DemoFavicon';
import { getToolFaviconDomain } from '@/lib/demoToolFavicon';

const ALL_PEOPLE: Record<string, { img: string; title?: string }> = {
  Vaibhav: { img: 'https://avatars.githubusercontent.com/u/25829699?v=4' },
  Jordan: { img: 'https://i.pravatar.cc/150?u=agent-jordan', title: 'Chief of Staff' },
  Aria: { img: 'https://i.pravatar.cc/150?u=agent-aria', title: 'Research Specialist' },
  Leo: { img: 'https://i.pravatar.cc/150?u=agent-leo', title: 'DevOps' },
  Ren: { img: 'https://i.pravatar.cc/150?u=agent-ren', title: 'Frontend' },
};

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
  goal: { bg: '#ECFDF5', border: '#A7F3D0', color: '#065F46' },
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
  agent: string;
  message?: { text: string; time: string; tags?: DemoTag[] };
  tools: DemoToolLog[];
};

function buildTurns(feed: DemoFeedItem[]): Turn[] {
  const turns: Turn[] = [];
  for (const item of feed) {
    if (item.kind === 'message') {
      turns.push({
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
      turns.push({ agent: item.agent, tools: [item] });
    }
  }
  return turns;
}

function ToolTimelineRow({ log, isLast }: { log: DemoToolLog; isLast: boolean }) {
  const running = log.status === 'running';
  const faviconDomain = getToolFaviconDomain(log);

  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'stretch', minHeight: 32 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 18, flexShrink: 0, paddingTop: 2 }}>
        <div style={{ width: 1, flex: 1, background: C.border, minHeight: 6 }} />
        <div style={{
          width: 22, height: 22, borderRadius: 6, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: C.card, border: `1px solid ${C.border}`, overflow: 'hidden',
        }}>
          {faviconDomain ? (
            <DemoFavicon domain={faviconDomain} size={14} rounded="sm" />
          ) : (
            <ToolIcon tool={log.tool} />
          )}
        </div>
        {!isLast && <div style={{ width: 1, flex: 1, background: C.border, minHeight: 6 }} />}
      </div>
      <div style={{
        flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 8,
        paddingBottom: isLast ? 2 : 8, paddingTop: 2,
      }}>
        <span style={{
          fontSize: 11.5, fontWeight: 600, color: C.text, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          flexShrink: 0, lineHeight: 1.2,
        }}>
          {log.label}
        </span>
        {log.detail && (
          <span style={{
            fontSize: 11, color: C.textSubtle, lineHeight: 1.2,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, minWidth: 0,
          }}>
            {log.detail}
          </span>
        )}
        <span style={{ marginLeft: 'auto', flexShrink: 0, display: 'flex', alignItems: 'center', height: 18 }}>
          {running
            ? <Loader2 size={14} strokeWidth={2.5} className="demo-spin" color={C.brand} />
            : <Check size={14} strokeWidth={2.5} color="#10B981" />}
        </span>
      </div>
    </div>
  );
}

function ToolTimeline({ tools }: { tools: DemoToolLog[] }) {
  if (tools.length === 0) return null;
  return (
    <div style={{ marginTop: 8, marginLeft: 0, animation: 'fadeIn 0.2s ease both' }}>
      {tools.map((log, i) => (
        <ToolTimelineRow key={log.id} log={log} isLast={i === tools.length - 1} />
      ))}
    </div>
  );
}

function AgentTurn({ turn }: { turn: Turn }) {
  const person = ALL_PEOPLE[turn.agent];
  return (
    <div style={{ marginBottom: 20, animation: 'fadeIn 0.25s ease both' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <Av name={turn.agent} size={28} />
        <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{turn.agent}</span>
        {person?.title && (
          <span style={{ fontSize: 10, color: C.textSubtle, padding: '1px 6px', borderRadius: 4, background: C.bg, border: `1px solid ${C.borderWarm}` }}>
            {person.title}
          </span>
        )}
        {turn.message && (
          <span style={{ fontSize: 10, color: C.textSubtle, marginLeft: 'auto' }}>{turn.message.time}</span>
        )}
      </div>
      <div style={{ paddingLeft: 36 }}>
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
        <ToolTimeline tools={turn.tools} />
      </div>
    </div>
  );
}

function DeliveryCard({ name, active, onClick }: { name: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'flex', width: '100%', maxWidth: 360, textAlign: 'left', cursor: 'pointer',
        borderRadius: 10, border: `1px solid ${active ? C.brand : C.border}`,
        background: active ? '#F0FDF9' : C.card,
        padding: '10px 12px', marginTop: 6, animation: 'fadeIn 0.25s ease both',
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
    <div style={{
      marginBottom: 8, borderRadius: 12, border: `1px solid ${C.border}`,
      background: C.card, boxShadow: '0 1px 2px rgba(0,0,0,0.03)', overflow: 'hidden',
    }}>
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
              <div key={s.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '4px 0' }}>
                <div style={{ marginTop: 2, flexShrink: 0 }}>
                  {isDone ? <Check size={14} strokeWidth={2.5} color="#15803D" />
                    : isRunning ? <Loader2 size={14} className="demo-spin" color="#B45309" />
                      : <div style={{ width: 14, height: 14, borderRadius: 3, border: `1.5px solid ${C.border}` }} />}
                </div>
                <span style={{
                  fontSize: 12, lineHeight: 1.45, flex: 1,
                  color: isDone ? C.textSubtle : isRunning ? C.text : C.textMuted,
                  fontWeight: isRunning ? 600 : 400,
                  textDecoration: isDone ? 'line-through' : 'none',
                }}>
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ArtifactPanel({ artifact }: { artifact: DemoArtifact | null }) {
  if (!artifact) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center', background: C.card }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: '#F5F5F4', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
          <FileText size={20} strokeWidth={1.75} color={C.textSubtle} />
        </div>
        <p style={{ fontSize: 13, fontWeight: 600, color: C.text, margin: 0 }}>No files yet</p>
        <p style={{ fontSize: 11, color: C.textSubtle, marginTop: 6, maxWidth: 200, lineHeight: 1.5 }}>
          Files and previews appear here as agents work.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minWidth: 0, background: C.card }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px',
        borderBottom: `1px solid ${C.border}`, background: '#FAFAF9', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', borderRadius: 8, border: `1px solid ${C.border}`, padding: 2, background: '#F5F5F4' }}>
          <span style={{
            display: 'flex', alignItems: 'center', gap: 4, padding: '3px 9px', borderRadius: 6,
            fontSize: 11, fontWeight: 600, background: C.card, color: C.text,
          }}>
            <Layers size={12} strokeWidth={1.75} /> IDE
          </span>
        </div>
        <span style={{ flex: 1, fontSize: 11, fontWeight: 500, color: C.textMuted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {artifact.name}
        </span>
        <button type="button" style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 6, border: `1px solid ${C.border}`, background: C.card, fontSize: 10, color: C.textMuted, cursor: 'pointer' }}>
          <Download size={11} strokeWidth={1.75} /> Download
        </button>
      </div>
      <div className="Trooper-scrollbar" style={{ flex: 1, overflow: 'auto', padding: 14 }}>
        <pre style={{
          margin: 0, fontSize: 11.5, lineHeight: 1.6, color: C.text,
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', whiteSpace: 'pre-wrap',
        }}>
          {artifact.content}
        </pre>
      </div>
    </div>
  );
}

function LiveRunStrip({ agent, toolLabel, toolLog }: { agent: string; toolLabel?: string; toolLog?: DemoToolLog }) {
  const faviconDomain = toolLog ? getToolFaviconDomain(toolLog) : null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', animation: 'fadeIn 0.2s ease both' }}>
      <Av name={agent} size={24} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
        {faviconDomain && <DemoFavicon domain={faviconDomain} size={16} rounded="sm" />}
        <Loader2 size={14} className="demo-spin" color={C.brand} />
        <span style={{ fontSize: 12, color: C.textMuted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {toolLabel ? `Running ${toolLabel}…` : 'Thinking…'}
        </span>
      </div>
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
  delivery,
  statusCol,
  onClose,
  onSelectArtifact,
}: {
  open: boolean;
  taskTitle: string;
  assignee: string;
  subtasks: DemoSubtask[];
  feed: DemoFeedItem[];
  artifact: DemoArtifact | null;
  delivery: string | null;
  statusCol?: 'in_progress' | 'review' | 'done';
  onClose?: () => void;
  onSelectArtifact?: (name: string) => void;
}) {
  const threadRef = useRef<HTMLDivElement>(null);
  const turns = useMemo(() => buildTurns(feed), [feed]);
  const hasRunningTool = feed.some(item => item.kind === 'tool' && item.status === 'running');
  const runningTool = [...feed].reverse().find(item => item.kind === 'tool' && item.status === 'running') as DemoToolLog | undefined;
  const runningAgent = runningTool?.agent || turns[turns.length - 1]?.agent || assignee;

  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [feed, delivery, artifact]);

  const statusLabel = statusCol === 'review' ? 'Human review' : statusCol === 'done' ? 'Completed' : 'In progress';
  const statusBg = statusCol === 'review' ? '#FFFBEB' : statusCol === 'done' ? '#ECFDF5' : '#FFFBEB';
  const statusColor = statusCol === 'review' ? '#78350F' : statusCol === 'done' ? '#065F46' : '#B45309';

  if (!open) return null;

  return (
    <div style={{
      position: 'absolute', inset: 6, zIndex: 30,
      display: 'flex', flexDirection: 'column',
      background: 'rgba(28,25,23,0.4)', backdropFilter: 'blur(3px)',
      borderRadius: 10,
    }}>
      <div style={{
        position: 'relative', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column',
        margin: 8, borderRadius: 12, border: `1px solid ${C.border}`, background: C.card,
        boxShadow: '0 20px 40px -12px rgba(28,25,23,0.28)',
        overflow: 'hidden', animation: 'cardIn 0.3s ease both',
      }}>
        <button
          type="button"
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
            <div ref={threadRef} className="Trooper-scrollbar" style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
              <div style={{ padding: '14px 18px 8px', maxWidth: 480, margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap', marginBottom: 8 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: statusColor, background: statusBg, padding: '2px 7px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: 0.4 }}>
                    {statusLabel}
                  </span>
                  {SPOTLIGHT_TASK_TAGS.map(tag => (
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

                {turns.map((turn, i) => <AgentTurn key={`${turn.agent}-${i}`} turn={turn} />)}

                {delivery && (
                  <div style={{ marginBottom: 12, animation: 'fadeIn 0.25s ease both' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                      <Av name="Jordan" size={28} />
                      <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Jordan</span>
                    </div>
                    <div style={{ paddingLeft: 36 }}>
                      <DeliveryCard
                        name={delivery}
                        active={artifact?.name === delivery}
                        onClick={() => onSelectArtifact?.(delivery)}
                      />
                    </div>
                  </div>
                )}

                {hasRunningTool && (
                  <div style={{ paddingLeft: 4 }}>
                    <LiveRunStrip agent={runningAgent} toolLabel={runningTool?.label} toolLog={runningTool} />
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
                    <DemoTagBadge tag={{ label: DEMO_ORG.name.toLowerCase(), type: 'site', domain: DEMO_ORG.domain }} size="xs" />
                    <DemoTagBadge tag={{ label: 'product-launch', type: 'channel' }} size="xs" />
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

          {/* Right: artifact panel — always shown */}
          <div style={{ flex: '1 1 46%', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <ArtifactPanel artifact={artifact} />
          </div>
        </div>
      </div>
    </div>
  );
}
