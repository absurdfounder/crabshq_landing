'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import {
  X, Check, Loader2, Globe, Search, FileText, GitCommit, MessageSquare, Terminal, Wrench,
  ChevronUp, Layers, Download, ArrowUp, ListTodo, Hash, Target, Tag, Code,
} from 'lucide-react';
import { BorderBeam } from 'border-beam';
import { TROOPER_DEMO as C } from './demoTheme';
import type { DemoArtifact, DemoFeedItem, DemoSubtask, DemoTag, DemoToolLog } from './demoTaskExecution';
import { getToolIconName } from './demoTaskExecution';
import { launchScenario } from '../scenarios/launch';
import type { DemoOrg } from '../scenarios/types';
import type { ArtifactReviewState } from '../lib/demoArtifactReview';
import { DemoFavicon } from './DemoFavicon';
import { getToolIconMeta } from '../lib/demoToolFavicon';
import { getProviderDomain } from '../lib/demoProviders';
import { DemoArtifactPanel } from './DemoArtifactPanel';
import { DemoCanvasView } from './DemoCanvasView';
import type { DemoWorkspaceMode } from './demoTaskExecution';
import { DUR, EASE_OUT, usePrefersReducedMotion } from '../lib/demoMotion';
import { DemoOrb, orbStateForTool } from '../lib/demoThinking';
import type { CanvasRect } from '../lib/demoGeometry';
import { DemoBrowserStream } from '../workspaces/DemoBrowserStream';
import { DemoVideoWorkspace } from '../workspaces/DemoVideoWorkspace';
import { DemoDesktopWorkspace } from '../workspaces/DemoDesktopWorkspace';
import { DemoGenerationCard } from '../workspaces/DemoGenerationCard';
import { DemoNodeGraph } from '../workspaces/DemoNodeGraph';
import type {
  DemoBrowserSession, DemoDesktopSession, DemoGenerationJob, DemoVideoProject, DemoWorkflowGraph,
} from './demoTaskExecution';

const WORKSPACE_LABEL: Record<DemoWorkspaceMode, string> = {
  ide: 'IDE',
  canvas: 'Canvas',
  browser: 'Browser',
  video: 'Video',
  desktop: 'Desktop',
  nodes: 'Routine',
};

/** Live generation job passed down from the runner. */
export type DemoGenerationState = {
  job: DemoGenerationJob;
  startedAt: number | null;
  runMs: number;
  done: boolean;
};

/** Matches the modal's `inset: 6` + `margin: 8` offset from the canvas origin. */
const MODAL_INSET = 14;

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
  reasoning?: string;
  tools: DemoToolLog[];
};

function formatDuration(ms?: number): string | null {
  if (!ms || ms <= 0) return null;
  return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`;
}

/**
 * The app's reasoning block (TaskModal.jsx:1955) — amber, pulsing dot, and a
 * "Show more" past a few lines. Without it the thread is all tool calls and no
 * thinking, which is the part that makes an agent look like it has judgement.
 */
function ReasoningBlock({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > 190;
  const shown = expanded || !isLong ? text : `${text.slice(0, 190).trimEnd()}…`;

  return (
    <div style={{
      margin: '2px 0 8px', padding: '8px 11px', borderRadius: 10,
      border: '1px solid rgba(245,158,11,0.24)', background: 'rgba(255,251,235,0.75)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
        <span style={{ fontSize: 12, lineHeight: 1 }}>🧠</span>
        <span style={{ fontSize: 9.5, fontWeight: 700, color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Reasoning
        </span>
        <span className="demo-pulse" style={{ width: 5, height: 5, borderRadius: '50%', background: '#fbbf24' }} />
      </div>
      <div style={{ fontSize: 12, lineHeight: 1.6, color: 'rgba(120,53,15,0.86)', whiteSpace: 'pre-wrap' }}>{shown}</div>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded(v => !v)}
          style={{ marginTop: 5, border: 'none', background: 'none', padding: 0, cursor: 'pointer', fontSize: 10.5, fontWeight: 600, color: '#d97706' }}
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
}

/** The app's chat artifact block — a page fanning out from behind the card. */
function ThreadArtifactBlock({ name, ext, onOpen }: { name: string; ext?: string; onOpen?: () => void }) {
  const [hover, setHover] = useState(false);
  const isCode = !['md', 'txt', 'pdf', 'doc'].includes(String(ext || '').toLowerCase());

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen?.(); } }}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      style={{
        display: 'flex', width: '100%', maxWidth: 320, margin: '6px 0 2px',
        borderRadius: 10, overflow: 'hidden', cursor: 'pointer', padding: '0 14px',
        border: `1px solid ${hover ? 'rgba(214,211,209,0.9)' : 'rgba(214,211,209,0.4)'}`,
        background: hover ? 'rgba(255,255,255,0.6)' : 'transparent',
        transition: `background-color ${DUR.panel}ms ${EASE_OUT}, border-color ${DUR.panel}ms ${EASE_OUT}`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-end', width: 56, position: 'relative', flexShrink: 0 }}>
        <div style={{
          position: 'absolute', right: 6, width: 40, height: 55,
          borderRadius: '8px 8px 0 0', border: `1px solid ${C.border}`,
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 11,
          background: 'linear-gradient(to bottom, #fff, rgba(255,255,255,0))',
          transform: `translateY(19%) rotate(${hover ? -3.7 : -5.7}deg) scale(${hover ? 1.035 : 1})`,
          transformOrigin: 'bottom center',
          transition: `transform ${DUR.panel}ms ${EASE_OUT}`,
          willChange: 'transform',
        }}>
          {isCode ? <Code size={15} color="#a8a29e" /> : <FileText size={15} color="#a8a29e" />}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '12px 0', minWidth: 0, flex: 1 }}>
        <div style={{ fontSize: 12.5, lineHeight: 1.3, color: C.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
        <div style={{ fontSize: 10.5, color: '#a8a29e' }}>
          {isCode ? 'Code' : 'Document'}<span style={{ opacity: 0.5 }}> · </span>{(ext || 'file').toUpperCase()}
        </div>
      </div>
    </div>
  );
}

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
    if (item.kind === 'reasoning') {
      const open = turns[turns.length - 1];
      // Reasoning belongs to the agent's current turn when it has one, so a
      // thought and the calls it leads to stay under one avatar.
      if (open && open.agent === item.agent && !open.reasoning && !open.tools.length) {
        open.reasoning = item.text;
      } else {
        turns.push({ id: `think-${item.id}`, agent: item.agent, reasoning: item.text, tools: [] });
      }
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

function ToolTimelineRow({ log, isLast, isLatest, onOpenArtifact }: {
  log: DemoToolLog;
  isLast: boolean;
  isLatest?: boolean;
  onOpenArtifact?: (name: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const running = log.status === 'running';
  const iconMeta = getToolIconMeta(log);
  const duration = running ? null : formatDuration(log.durationMs);
  const expandable = !running && Boolean(log.result?.length);

  return (
    <div
      className="demo-thread-tool-row"
      {...(isLatest ? { 'data-demo-target': 'modal-tool-latest' } : {})}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
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
      <div style={{ flex: 1, minWidth: 0, paddingBottom: isLast ? 0 : 10, paddingTop: 1 }}>
        <div
          role={expandable ? 'button' : undefined}
          tabIndex={expandable ? 0 : undefined}
          onClick={expandable ? () => setOpen(v => !v) : undefined}
          onKeyDown={expandable ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(v => !v); } } : undefined}
          style={{
            display: 'flex', alignItems: 'center', gap: 8, minWidth: 0,
            cursor: expandable ? 'pointer' : 'default',
          }}
        >
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
          {/* Elapsed time reveals on hover, as it does in the app. */}
          {duration && (
            <span style={{
              flexShrink: 0, marginLeft: 'auto', fontSize: 10, color: '#a8a29e',
              fontVariantNumeric: 'tabular-nums',
              opacity: hover ? 1 : 0, transition: `opacity ${DUR.panel}ms ${EASE_OUT}`,
            }}>
              {duration}
            </span>
          )}
          {expandable && (
            <ChevronUp
              size={12}
              color="#a8a29e"
              style={{
                flexShrink: 0,
                transform: open ? 'none' : 'rotate(180deg)',
                transition: `transform ${DUR.quick}ms ${EASE_OUT}`,
              }}
            />
          )}
          <span style={{
            marginLeft: duration || expandable ? 0 : 'auto', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20,
          }}>
            {/*
              A running call says what kind of work it is, not just that work is
              happening: browsing sweeps a globe, writing undulates, shelling out
              scrambles and clicks back. One spinner for every tool was the whole
              problem — the row already knows the tool name.
            */}
            {running
              ? <DemoOrb state={orbStateForTool(log.tool, log.label)} tone="light" title={`${log.label} running`} />
              : <Check size={14} strokeWidth={2.5} color="#3f6b00" />}
          </span>
        </div>

        {expandable && (
          <div style={{
            display: 'grid',
            gridTemplateRows: open ? '1fr' : '0fr',
            transition: `grid-template-rows ${DUR.panel}ms ${EASE_OUT}`,
          }}>
            <div style={{ overflow: 'hidden' }}>
              <div style={{
                marginTop: 6, borderRadius: 6, border: `1px solid ${C.borderWarm}`,
                background: 'rgba(250,249,246,0.7)', padding: '6px 9px',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: 10.5, lineHeight: 1.65, color: C.textMuted,
              }}>
                {log.result?.map((line, i) => (
                  <div key={i} style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{line}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {log.wrote && !running && (
          <ThreadArtifactBlock name={log.wrote.name} ext={log.wrote.ext} onOpen={() => onOpenArtifact?.(log.wrote!.name)} />
        )}
      </div>
    </div>
  );
}

function AgentTurn({ turn, latestToolId, onOpenArtifact }: {
  turn: Turn;
  latestToolId?: string | null;
  onOpenArtifact?: (name: string) => void;
}) {
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
            display: 'flex', alignItems: 'center', gap: 6, marginBottom: turn.message || turn.reasoning || turn.tools.length ? 6 : 0,
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
          {turn.reasoning && <ReasoningBlock text={turn.reasoning} />}
          {turn.tools.length > 0 && (
            <div style={{ marginTop: turn.message || turn.reasoning ? 4 : 0 }}>
              {turn.tools.map((log, i) => (
                <ToolTimelineRow
                  key={log.id}
                  log={log}
                  isLast={i === turn.tools.length - 1}
                  isLatest={log.id === latestToolId}
                  onOpenArtifact={onOpenArtifact}
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
  const hasStarted = subtasks.some(s => s.status !== 'pending');

  // Reveal the checklist as soon as work begins, so the visitor watches the
  // steps tick over instead of a collapsed summary counter.
  useEffect(() => {
    if (hasStarted) setOpen(true);
  }, [hasStarted]);

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
        <ChevronUp size={14} color={C.textSubtle} style={{ transform: open ? 'none' : 'rotate(180deg)', transition: `transform ${DUR.quick}ms ${EASE_OUT}` }} />
      </button>
      {/* TaskModal.jsx:1922 — grid-rows 0fr→1fr, so the panel actually expands. */}
      <div style={{
        display: 'grid',
        gridTemplateRows: open ? '1fr' : '0fr',
        transition: `grid-template-rows ${DUR.panel}ms ${EASE_OUT}`,
      }}>
        <div style={{ overflow: 'hidden' }}>
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
        </div>
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
  originRect,
  browserSession,
  browserFrameCount = 0,
  videoProject,
  videoStage = 'storyboard',
  videoPlayhead = 0,
  videoScenesReady = 0,
  desktopSession,
  desktopLines = [],
  desktopActivities = [],
  workflowGraph,
  activeNodeIds = [],
  generationJob,
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
  /** Canvas-space rect of the card this modal was opened from. */
  originRect?: CanvasRect | null;
  browserSession?: DemoBrowserSession;
  browserFrameCount?: number;
  videoProject?: DemoVideoProject;
  videoStage?: 'storyboard' | 'timeline';
  videoPlayhead?: number;
  videoScenesReady?: number;
  desktopSession?: DemoDesktopSession;
  desktopLines?: string[];
  desktopActivities?: string[];
  workflowGraph?: DemoWorkflowGraph;
  activeNodeIds?: string[];
  generationJob?: DemoGenerationState | null;
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
  /**
   * Is an agent producing into the workspace pane right now?
   *
   * Bound to the running *subtask*, not the running tool call. Individual tool
   * calls in the reel resolve in 280–450ms (`launch.ts:203`), and the beam's
   * fade-in alone is 600ms — tying it to tools meant it faded up from zero and
   * was switched off before it ever arrived on screen. A subtask spans many
   * calls and lasts seconds, which is both visible and the truer claim.
   */
  const workRunning = useMemo(
    () => subtasks.some(s => s.status === 'running'),
    [subtasks],
  );
  /**
   * border-beam ships reduced-motion handling for its pulse types only; `line`
   * is in the rotate family, which the README says defers to the consumer. It
   * does — verified: under `prefers-reduced-motion: reduce` the beam layer
   * still animated to 0.3 opacity. So the gate is ours to hold.
   */
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [feed, delivery, artifact]);

  // Keyframes that scale/translate the panel out of the originating card.
  const openFrom = useMemo(() => {
    const name = 'demoModalIn';
    if (!originRect) {
      return {
        name,
        css: `@keyframes ${name} { from { opacity: 0; transform: scale(0.985); } to { opacity: 1; transform: none; } }`,
      };
    }
    return {
      name,
      css: `@keyframes ${name} {
        from { opacity: 0; transform: translate(${Math.round(originRect.x - MODAL_INSET)}px, ${Math.round(originRect.y - MODAL_INSET)}px) scale(0.22); }
        to { opacity: 1; transform: none; }
      }`,
    };
  }, [originRect]);

  // Only offer the workspaces this scenario actually drives, so a plain
  // document task doesn't sprout an empty Video tab.
  const availableModes = useMemo<DemoWorkspaceMode[]>(() => {
    const modes: DemoWorkspaceMode[] = ['ide', 'canvas'];
    if (browserSession) modes.push('browser');
    if (videoProject) modes.push('video');
    if (desktopSession) modes.push('desktop');
    if (workflowGraph) modes.push('nodes');
    return modes;
  }, [browserSession, videoProject, desktopSession, workflowGraph]);

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
      animation: `modalBackdropIn ${DUR.panel}ms ${EASE_OUT} both`,
    }}>
      <div style={{
        position: 'relative', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column',
        margin: 8, borderRadius: 12, border: `1px solid ${C.border}`, background: C.card,
        boxShadow: '0 20px 40px -12px rgba(28,25,23,0.28)',
        overflow: 'hidden',
        // Grows out of the card that was clicked, so opening reads as caused by
        // the click rather than as an unrelated panel fading in.
        animation: `${openFrom.name} ${DUR.panel}ms ${EASE_OUT} both`,
      }}>
        <style>{openFrom.css}</style>
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

                {turns.map((turn) => (
                  <AgentTurn
                    key={turn.id}
                    turn={turn}
                    latestToolId={latestToolId}
                    onOpenArtifact={onSelectArtifact}
                  />
                ))}

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
            {/*
              A light travels the bottom edge of the workspace toolbar while a
              tool is running — the seam between "the agent is producing" and
              the pane the output lands in. The strip is a plain rectangle with
              no shadow, so border-beam's `overflow: hidden` container costs
              nothing here; wrapping a card would have clipped its shadow.
              `line` is pure CSS keyframes, so an idle modal spends no frames.
            */}
            <BorderBeam
              size="line"
              colorVariant="sunset"
              theme="light"
              active={workRunning && !reducedMotion}
              borderRadius={0}
              // The light-theme presets are tuned for white; a warm glow on the
              // app's warm #FAFAF9 chrome needs the extra brightness and
              // saturation to register at all at 1x.
              strength={1}
              brightness={2.1}
              saturation={1.7}
              duration={3.2}
              style={{ flexShrink: 0 }}
            >
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px',
              borderBottom: `1px solid ${C.border}`, background: '#FAFAF9',
            }}>
              <div style={{ display: 'flex', borderRadius: 8, border: `1px solid ${C.border}`, padding: 2, background: '#F5F5F4' }}>
                {availableModes.map(mode => (
                  <button
                    key={mode}
                    type="button"
                    data-demo-target={`modal-workspace-${mode}`}
                    onClick={() => onWorkspaceModeChange?.(mode)}
                    style={{
                      padding: '3px 10px', borderRadius: 6, border: 'none', cursor: 'pointer',
                      fontSize: 11, fontWeight: 600,
                      background: workspaceMode === mode ? C.card : 'transparent',
                      color: workspaceMode === mode ? C.text : C.textSubtle,
                      boxShadow: workspaceMode === mode ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {WORKSPACE_LABEL[mode]}
                  </button>
                ))}
              </div>
              {workspaceMode === 'canvas' && canvasArtifacts.length > 0 && (
                <span style={{ fontSize: 10, color: C.textSubtle }}>{canvasArtifacts.length} open</span>
              )}
            </div>
            </BorderBeam>
            {/* A live generation takes the panel while it runs — the app does
                the same, surfacing the job over whatever was open. */}
            {generationJob ? (
              <DemoGenerationCard
                job={generationJob.job}
                startedAt={generationJob.startedAt}
                runMs={generationJob.runMs}
                done={generationJob.done}
              />
            ) : workspaceMode === 'browser' && browserSession ? (
              <DemoBrowserStream session={browserSession} frameCount={browserFrameCount} />
            ) : workspaceMode === 'video' && videoProject ? (
              <DemoVideoWorkspace
                project={videoProject}
                stage={videoStage}
                playhead={videoPlayhead}
                scenesReady={videoScenesReady}
              />
            ) : workspaceMode === 'desktop' && desktopSession ? (
              <DemoDesktopWorkspace
                session={desktopSession}
                lines={desktopLines}
                activities={desktopActivities}
              />
            ) : workspaceMode === 'nodes' && workflowGraph ? (
              <DemoNodeGraph graph={workflowGraph} activeIds={activeNodeIds} />
            ) : workspaceMode === 'canvas' ? (
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
