'use client';

import { useMemo, useState, useEffect } from 'react';
import {
  X, Check, Loader2, Globe, Search, FileText, GitCommit, MessageSquare, Terminal, Wrench,
  ChevronDown, ChevronUp, Layers, Download, ArrowUp,
} from 'lucide-react';
import { TROOPER_DEMO as C } from './demoTheme';
import type { DemoFeedItem, DemoSubtask, DemoToolLog } from './demoTaskExecution';
import { getToolIconName } from './demoTaskExecution';

const ALL_PEOPLE: Record<string, { img: string; title?: string }> = {
  Vaibhav: { img: 'https://avatars.githubusercontent.com/u/25829699?v=4' },
  Jordan: { img: 'https://i.pravatar.cc/150?u=agent-jordan', title: 'Chief of Staff' },
  Aria: { img: 'https://i.pravatar.cc/150?u=agent-aria', title: 'Research Specialist' },
  Leo: { img: 'https://i.pravatar.cc/150?u=agent-leo', title: 'DevOps' },
  Ren: { img: 'https://i.pravatar.cc/150?u=agent-ren', title: 'Frontend' },
};

const DELIVERY_PREVIEW = `# Wonder SEO Launch Report

## Executive summary
Wonder.gg is ready for Product Hunt launch with updated meta, OG tags, and a keyword map aligned to gaming discovery terms.

## Keyword clusters
- **Launch day**: indie game launch, wonder.gg, product hunt games
- **Discovery**: cozy games, narrative adventure, steam alternative

## Changes shipped
- Homepage \`title\` + \`description\` optimized
- OG image updated for social previews
- \`sitemap.xml\` entries for new game pages

## Competitor baseline
Compared against 4 launch peers — Wonder now ranks on-page parity for title length and schema coverage.
`;

function ToolIcon({ tool }: { tool: string }) {
  const name = getToolIconName(tool);
  const props = { size: 14, strokeWidth: 1.75, color: '#78716c' };
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

type ThreadBlock = {
  agent: string;
  message?: { text: string; time: string };
  tools: DemoToolLog[];
};

function buildThreadBlocks(feed: DemoFeedItem[]): ThreadBlock[] {
  const blocks: ThreadBlock[] = [];
  for (const item of feed) {
    if (item.kind === 'message') {
      blocks.push({ agent: item.sender, message: { text: item.text, time: item.time }, tools: [] });
      continue;
    }
    const last = blocks[blocks.length - 1];
    if (last && last.agent === item.agent && !last.message) {
      last.tools.push(item);
    } else if (last && last.agent === item.agent) {
      last.tools.push(item);
    } else {
      blocks.push({ agent: item.agent, tools: [item] });
    }
  }
  return blocks;
}

function InlineToolTimeline({ tools }: { tools: DemoToolLog[] }) {
  if (tools.length === 0) return null;
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{
        borderRadius: 12,
        border: `1px solid ${C.border}`,
        background: '#FAFAF9',
        overflow: 'hidden',
      }}>
        {tools.map((log, i) => {
          const running = log.status === 'running';
          return (
            <div
              key={log.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 12px',
                borderTop: i > 0 ? `1px solid ${C.borderWarm}` : undefined,
                animation: 'fadeIn 0.2s ease both',
              }}
            >
              <div style={{
                width: 26, height: 26, borderRadius: 8, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: C.card, border: `1px solid ${C.border}`,
              }}>
                <ToolIcon tool={log.tool} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{log.label}</span>
                  {log.detail && (
                    <span style={{
                      fontSize: 11, color: C.textSubtle, fontFamily: 'ui-monospace, monospace',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 220,
                    }}>
                      {log.detail}
                    </span>
                  )}
                </div>
              </div>
              {running
                ? <Loader2 size={14} strokeWidth={2.5} className="demo-spin" color={C.brand} />
                : <Check size={14} strokeWidth={2.5} color="#10B981" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DeliveryCard({ name, onOpen }: { name: string; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      style={{
        display: 'flex', width: '100%', textAlign: 'left', cursor: 'pointer',
        borderRadius: 10, border: `1px solid ${C.border}`, background: C.card,
        padding: '12px 14px', marginTop: 8, transition: 'border-color 0.15s',
        animation: 'fadeIn 0.25s ease both',
      }}
    >
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', width: '100%' }}>
        <div style={{ position: 'relative', width: 52, height: 56, flexShrink: 0 }}>
          <div style={{
            position: 'absolute', right: 0, bottom: 0, width: 44, height: 58,
            borderRadius: '8px 8px 0 0', border: `1px solid ${C.border}`, background: 'linear-gradient(to bottom, white, transparent)',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 10,
            transform: 'rotate(-0.08rad)',
          }}>
            <FileText size={18} strokeWidth={1.75} color={C.textSubtle} />
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 0, paddingTop: 2 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
          <div style={{ fontSize: 11, color: C.textSubtle, marginTop: 2 }}>Jordan · Document · MD</div>
        </div>
      </div>
    </button>
  );
}

function TodoAccordion({ subtasks }: { subtasks: DemoSubtask[] }) {
  const [open, setOpen] = useState(true);
  const done = subtasks.filter(s => s.status === 'done').length;
  const running = subtasks.find(s => s.status === 'running');
  return (
    <div style={{ marginBottom: 8, borderRadius: 12, border: `1px solid ${C.border}`, background: '#FAFAF9', overflow: 'hidden' }}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '8px 12px', border: 'none', background: 'transparent', cursor: 'pointer',
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 600, color: C.textMuted }}>
          Task checklist · {done}/{subtasks.length}
          {running && <span style={{ marginLeft: 8, color: '#B45309', fontWeight: 600 }}>{running.title.slice(0, 28)}…</span>}
        </span>
        {open ? <ChevronUp size={14} color={C.textSubtle} /> : <ChevronDown size={14} color={C.textSubtle} />}
      </button>
      {open && (
        <div style={{ borderTop: `1px solid ${C.borderWarm}`, padding: '4px 12px 10px' }}>
          {subtasks.map(s => {
            const isDone = s.status === 'done';
            const isRunning = s.status === 'running';
            return (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0' }}>
                <div style={{
                  width: 16, height: 16, borderRadius: 4, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: isDone ? C.brand : isRunning ? '#FFFBEB' : C.card,
                  border: isDone ? 'none' : isRunning ? '1px solid #FDE68A' : `1px solid ${C.border}`,
                  color: isDone ? 'white' : 'transparent',
                }}>
                  {isDone ? <Check size={10} strokeWidth={3} /> : isRunning ? <Loader2 size={10} className="demo-spin" color="#B45309" /> : null}
                </div>
                <span style={{
                  fontSize: 11, flex: 1, minWidth: 0,
                  color: isDone ? C.textSubtle : C.text,
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

function ArtifactPanel({ fileName, onClose }: { fileName: string; onClose?: () => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minWidth: 0, background: C.card }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px',
        borderBottom: `1px solid ${C.border}`, background: '#FAFAF9', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', borderRadius: 8, border: `1px solid ${C.border}`, padding: 2, background: '#F5F5F4' }}>
          <span style={{
            display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 6,
            fontSize: 11, fontWeight: 600, background: C.card, color: C.text, boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
          }}>
            <Layers size={12} strokeWidth={1.75} /> IDE
          </span>
        </div>
        <span style={{ flex: 1, fontSize: 11, fontWeight: 500, color: C.textMuted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {fileName}
        </span>
        <button type="button" style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', borderRadius: 6, border: `1px solid ${C.border}`, background: C.card, fontSize: 11, color: C.textMuted, cursor: 'pointer' }}>
          <Download size={12} strokeWidth={1.75} /> Download
        </button>
        {onClose && (
          <button type="button" onClick={onClose} style={{ width: 28, height: 28, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.textMuted }}>
            <X size={14} strokeWidth={2} />
          </button>
        )}
      </div>
      <div className="Trooper-scrollbar" style={{ flex: 1, overflow: 'auto', padding: 16 }}>
        <pre style={{
          margin: 0, fontSize: 12, lineHeight: 1.65, color: C.text,
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', whiteSpace: 'pre-wrap',
        }}>
          {DELIVERY_PREVIEW}
        </pre>
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
  delivery,
  statusCol,
  onClose,
}: {
  open: boolean;
  taskTitle: string;
  assignee: string;
  subtasks: DemoSubtask[];
  feed: DemoFeedItem[];
  delivery: string | null;
  statusCol?: 'in_progress' | 'review' | 'done';
  onClose?: () => void;
}) {
  const [artifactDismissed, setArtifactDismissed] = useState(false);
  const threadBlocks = useMemo(() => buildThreadBlocks(feed), [feed]);
  const showArtifactPanel = Boolean(delivery) && !artifactDismissed;

  useEffect(() => {
    if (delivery) setArtifactDismissed(false);
  }, [delivery]);
  const statusLabel = statusCol === 'review' ? 'Human review' : statusCol === 'done' ? 'Completed' : 'In progress';
  const statusBg = statusCol === 'review' ? '#FFFBEB' : statusCol === 'done' ? '#ECFDF5' : '#FFFBEB';
  const statusColor = statusCol === 'review' ? '#78350F' : statusCol === 'done' ? '#065F46' : '#B45309';

  if (!open) return null;

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(28,25,23,0.35)', backdropFilter: 'blur(2px)', padding: 12,
    }}>
      <div style={{
        width: '100%',
        maxWidth: showArtifactPanel ? 920 : 640,
        maxHeight: '94%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 14,
        border: `1px solid ${C.border}`,
        background: C.card,
        boxShadow: '0 24px 48px -12px rgba(28,25,23,0.25)',
        animation: 'cardIn 0.35s ease both',
        overflow: 'hidden',
        transition: 'max-width 0.35s ease',
      }}>
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute', top: 10, right: 10, zIndex: 2,
            width: 32, height: 32, borderRadius: 10, border: `1px solid ${C.border}`,
            background: C.card, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.textMuted,
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}
        >
          <X size={15} strokeWidth={2} />
        </button>

        <div style={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>
          {/* Left — Slack-like thread */}
          <div style={{
            flex: showArtifactPanel ? '0 0 52%' : 1,
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            borderRight: showArtifactPanel ? `1px solid ${C.border}` : undefined,
          }}>
            {/* Title header (in scroll area like real app) */}
            <div className="Trooper-scrollbar" style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
              <div style={{ padding: '16px 20px 12px', maxWidth: 520, margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: statusColor, background: statusBg, padding: '2px 8px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: 0.4 }}>
                    {statusLabel}
                  </span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: C.textMuted, background: C.bg, padding: '2px 8px', borderRadius: 999 }}>#product-launch</span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: C.text, margin: 0, lineHeight: 1.35, letterSpacing: '-0.02em' }}>{taskTitle}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, marginBottom: 16 }}>
                  <Av name={assignee} size={20} />
                  <span style={{ fontSize: 12, color: C.textMuted }}>
                    Assigned to <strong style={{ color: C.text }}>{assignee}</strong>
                  </span>
                </div>

                {/* Thread */}
                {threadBlocks.map((block, i) => (
                  <div key={`${block.agent}-${i}`} style={{ marginBottom: 20, animation: 'fadeIn 0.25s ease both' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <Av name={block.agent} size={28} />
                      <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{block.agent}</span>
                      {block.message && (
                        <span style={{ fontSize: 10, color: C.textSubtle, marginLeft: 'auto' }}>{block.message.time}</span>
                      )}
                    </div>
                    <div style={{ paddingLeft: 36 }}>
                      {block.message && (
                        <p style={{ fontSize: 13, lineHeight: 1.7, color: C.text, margin: 0 }}>{block.message.text}</p>
                      )}
                      <InlineToolTimeline tools={block.tools} />
                    </div>
                  </div>
                ))}

                {delivery && (
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <Av name="Jordan" size={28} />
                      <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Jordan</span>
                    </div>
                    <div style={{ paddingLeft: 36 }}>
                      <DeliveryCard name={delivery} onOpen={() => setArtifactDismissed(false)} />
                    </div>
                  </div>
                )}

                {threadBlocks.length === 0 && !delivery && (
                  <p style={{ fontSize: 12, color: C.textSubtle, textAlign: 'center', padding: 24 }}>Agents coordinating…</p>
                )}
              </div>
            </div>

            {/* Composer footer */}
            <div style={{ flexShrink: 0, borderTop: `1px solid ${C.borderWarm}`, background: C.card, padding: '10px 16px 12px' }}>
              <div style={{ maxWidth: 520, margin: '0 auto' }}>
                <TodoAccordion subtasks={subtasks} />
                <div style={{
                  borderRadius: 14, border: `1px solid ${C.border}`, background: C.card,
                  padding: '10px 12px 8px', boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                }}>
                  <div style={{ fontSize: 13, color: C.textSubtle, minHeight: 36, padding: '2px 4px' }}>
                    Do anything with AI…
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: 4 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%', background: '#F5F5F4',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.textSubtle,
                    }}>
                      <ArrowUp size={14} strokeWidth={2.25} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — artifact panel */}
          {showArtifactPanel && delivery && (
            <div style={{ flex: '1 1 48%', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <ArtifactPanel fileName={delivery} onClose={() => setArtifactDismissed(true)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
