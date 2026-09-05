'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import {
  FileText,
  Check,
  Loader2,
  Search,
  Brain,
  ArrowRight,
  GitBranch,
  Globe,
  Terminal,
  Sparkles,
} from 'lucide-react';
import { MermaidFlowDiagram } from '@/components/loops/MermaidFlowDiagram';
import { WORK_SURFACES } from '@/lib/whereTheyWork';
import { MAC_DMG_URL } from '@/lib/downloadUrls';
import { getTrooper } from '@/lib/troopers';
import { BubbleExchange } from './ui/ChatBubble';
import PixelButton from './ui/PixelButton';
import TrooperMark from './ui/TrooperMark';
import {
  BrowserScene,
  DesktopScene,
  DevicesScene,
} from './where-they-work/WorkSurfaceScenes';
import dynamic from 'next/dynamic';

const VideoEditorCapabilityVisual = dynamic(() => import('./VideoEditorCapabilityVisual'), {
  ssr: false,
  loading: () => <div className="h-[280px] w-full rounded-xl bg-black/[0.04]" aria-hidden />,
});

function VideoEditorVisual({ focused }: { focused: boolean }) {
  return <VideoEditorCapabilityVisual focused={focused} />;
}

/* ─── Shared shell ─── */
function MockShell({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    // Ring on the outer shell; overflow on the inner — pairing them clips the
    // stroke into a half-edge on rounded corners (visible on org/action cards).
    <div
      className={`w-full rounded-xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.06] ${className}`}
    >
      <div className="overflow-hidden rounded-2xl">{children}</div>
    </div>
  );
}

const AGENT_ROSTER = [
  {
    name: 'Jordan',
    role: 'Chief of Staff',
    handle: 'nova' as const,
    kind: 'manager' as const,
  },
  {
    name: 'Aria',
    role: 'Growth',
    handle: 'scout' as const,
    kind: 'specialist' as const,
  },
  {
    name: 'Ren',
    role: 'Product',
    handle: 'wren' as const,
    kind: 'specialist' as const,
  },
  {
    name: 'Leo',
    role: 'Ops',
    handle: 'pip' as const,
    kind: 'specialist' as const,
  },
];

function AgentAv({ handle, size = 36 }: { handle: (typeof AGENT_ROSTER)[number]['handle']; size?: number }) {
  const trooper = getTrooper(handle);
  if (!trooper) return null;
  return <TrooperMark trooper={trooper} size={size} />;
}

/** Advance a staged simulation while the capability row is focused. */
function useSimPhase(focused: boolean, delays: readonly number[]) {
  const finalPhase = delays.length;
  const [phase, setPhase] = useState(finalPhase);
  const delayKey = delays.join(',');

  useEffect(() => {
    if (!focused) {
      setPhase(finalPhase);
      return;
    }
    setPhase(0);
    const timers = delays.map((ms, i) => window.setTimeout(() => setPhase(i + 1), ms));
    return () => timers.forEach(clearTimeout);
    // delays captured via delayKey; finalPhase derived from delays.length
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focused, delayKey, finalPhase]);

  return phase;
}

/* ═══════════════════════════════════════════════════════════════
 * 1. Org — chat asks for a growth team → HQ spins up troopers
 * ═══════════════════════════════════════════════════════════════ */
const ORG_DELAYS = [400, 1100, 1800, 2600] as const;
const ACTION_DELAYS = [500, 1200, 2000, 2800] as const;
const MEMORY_DELAYS = [400, 1400, 2200, 3000] as const;
/** 0 idle → light each workflow node in order */
const WORKFLOW_DELAYS = [400, 900, 1400, 1900, 2400, 2900] as const;
/** 0 idle → 1 Fn → 2 user marks → 3 agent labels → 4 explains */
const SCREEN_CONTEXT_DELAYS = [400, 900, 2100, 2900] as const;

function OrgVisual({ focused }: { focused: boolean }) {
  const phase = useSimPhase(focused, ORG_DELAYS);
  // 0 idle, 1 reading ask, 2 Aria online, 3 Ren online, 4 Leo online
  const statuses = [
    phase >= 4 ? 'ready' : phase >= 1 ? 'routing' : 'idle',
    phase >= 2 ? 'online' : phase >= 1 ? 'spinning' : 'queued',
    phase >= 3 ? 'online' : phase >= 2 ? 'spinning' : 'queued',
    phase >= 4 ? 'online' : phase >= 3 ? 'spinning' : 'queued',
  ] as const;

  const statusLabel = (st: (typeof statuses)[number]) => {
    if (st === 'online' || st === 'ready') return 'Online';
    if (st === 'spinning' || st === 'routing') return 'Spinning up';
    return 'Queued';
  };

  const tabs = ['Growth', 'Sales', 'Support', 'Ops', 'Research'] as const;

  return (
    // Product surface — one pane, like Gumloop’s agent panel (sidebar + chat + table).
    // No nested MockShell/cards: the outer window chrome is enough.
    <div className="flex min-h-[360px] bg-white sm:min-h-[400px]">
      <aside className="hidden w-[76px] shrink-0 flex-col gap-0.5 border-r border-black/[0.06] bg-[#f7f7f8] p-2 sm:flex">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`rounded-lg px-1.5 py-2.5 text-center text-[10px] font-medium transition-colors ${
              tab === 'Growth'
                ? 'bg-white text-neutral-900 shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.06]'
                : 'text-neutral-400'
            }`}
          >
            {tab === 'Growth' ? (
              <span className="mx-auto mb-1 flex size-6 items-center justify-center">
                <AgentAv handle="nova" size={22} />
              </span>
            ) : (
              <span className="mx-auto mb-1 block size-1.5 rounded-full bg-neutral-300" />
            )}
            {tab}
          </div>
        ))}
      </aside>

      <div className="min-w-0 flex-1 px-4 py-4 sm:px-5 sm:py-5">
        <div className="flex items-start gap-3">
          <AgentAv handle="nova" size={36} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
              <p className="text-[15px] font-semibold tracking-tight text-neutral-950">Growth Org</p>
              <p className="text-[11px] text-neutral-400">1 manager · 3 specialists</p>
            </div>
            <p className="mt-0.5 text-[12px] leading-snug text-neutral-500">
              Coordinates launch work across growth, product, and ops.
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-600">
                <Sparkles className="size-2.5 text-amber-500" strokeWidth={2} aria-hidden />
                Claude 4.5 Sonnet
              </span>
              <div className="flex -space-x-1.5">
                {AGENT_ROSTER.slice(0, 4).map((a) => (
                  <span
                    key={a.name}
                    className="inline-flex rounded-full ring-2 ring-white"
                    title={a.name}
                  >
                    <AgentAv handle={a.handle} size={18} />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div className="rounded-xl bg-[#f4f4f5] px-3.5 py-2.5">
            <p className="text-[11px] font-medium text-neutral-500">You</p>
            <p className="mt-0.5 text-[13px] leading-snug text-neutral-800">
              I need a growth team on this launch — stand one up.
            </p>
          </div>

          <div className="space-y-1.5 pl-0.5 text-[12px] text-neutral-600">
            <p
              className={`flex items-center gap-2 transition-opacity ${
                phase >= 1 ? 'opacity-100' : 'opacity-35'
              }`}
            >
              {phase >= 1 && phase < 4 ? (
                <Loader2 className="size-3 shrink-0 animate-spin text-neutral-400" strokeWidth={2.25} />
              ) : (
                <span
                  className={`size-1.5 shrink-0 rounded-full ${
                    phase >= 4 ? 'bg-[#325600]' : 'bg-neutral-300'
                  }`}
                />
              )}
              Matching specialists to launch brief
            </p>
            <p
              className={`flex items-center gap-2 transition-opacity ${
                phase >= 2 ? 'opacity-100' : 'opacity-35'
              }`}
            >
              <span
                className={`size-1.5 shrink-0 rounded-full ${
                  phase >= 2 ? 'bg-[#325600]' : 'bg-neutral-300'
                }`}
              />
              Spinning up Aria, Ren, Leo
            </p>
            <p
              className={`flex items-center gap-2 transition-opacity ${
                phase >= 4 ? 'opacity-100' : 'opacity-35'
              }`}
            >
              <span
                className={`size-1.5 shrink-0 rounded-full ${
                  phase >= 4 ? 'bg-[#325600]' : 'bg-neutral-300'
                }`}
              />
              Growth pod ready — 3 / 3 live
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-black/[0.06]">
            <div className="border-b border-black/[0.06] bg-[#fafafa] px-3 py-2">
              <p className="text-[11px] font-semibold text-neutral-700">Team roster</p>
            </div>
            <table className="w-full text-left text-[12px]">
              <thead>
                <tr className="border-b border-black/[0.05] text-[10px] font-medium uppercase tracking-wide text-neutral-400">
                  <th className="px-3 py-2 font-medium">Agent</th>
                  <th className="hidden px-3 py-2 font-medium sm:table-cell">Role</th>
                  <th className="px-3 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-neutral-700">
                {AGENT_ROSTER.map((agent, i) => {
                  const st = statuses[i];
                  const live = st === 'online' || st === 'ready';
                  const busy = st === 'spinning' || st === 'routing';
                  return (
                    <tr
                      key={agent.name}
                      className={`border-b border-black/[0.04] last:border-0 transition-opacity duration-500 ${
                        live || busy ? 'opacity-100' : 'opacity-45'
                      }`}
                    >
                      <td className="px-3 py-2.5">
                        <span className="inline-flex items-center gap-2">
                          <AgentAv handle={agent.handle} size={22} />
                          <span className="font-medium text-neutral-900">{agent.name}</span>
                        </span>
                      </td>
                      <td className="hidden px-3 py-2.5 text-neutral-500 sm:table-cell">
                        {agent.role}
                      </td>
                      <td className="px-3 py-2.5">
                        <span className="inline-flex items-center gap-1.5 text-[11px]">
                          {busy ? (
                            <Loader2
                              className="size-3 animate-spin text-neutral-400"
                              strokeWidth={2.25}
                            />
                          ) : (
                            <span
                              className={`size-1.5 rounded-full ${
                                live ? 'bg-[#325600]' : 'bg-neutral-300'
                              }`}
                            />
                          )}
                          <span className={live ? 'text-[#325600]' : 'text-neutral-500'}>
                            {statusLabel(st)}
                          </span>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
 * 2. Action — chat asks to ship og-image → live tool timeline
 * ═══════════════════════════════════════════════════════════════ */
function ActionVisual({ focused }: { focused: boolean }) {
  const phase = useSimPhase(focused, ACTION_DELAYS);
  const rows = [
    { tool: 'browser.open', detail: 'wonder.so', icon: Globe },
    { tool: 'read_file', detail: 'index.html', icon: FileText },
    { tool: 'apply_patch', detail: 'meta · og:image', icon: Terminal },
    { tool: 'deploy', detail: 'vercel · prod', icon: Terminal },
  ];

  return (
    <MockShell>
      <div className="flex items-center justify-between gap-2 border-b border-[#E7E5E4] bg-[#FAFAF9] px-3.5 py-2.5">
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold text-neutral-900">
            Ship og-image fix to prod
          </p>
          <p className="mt-0.5 text-[11px] text-neutral-500">From chat · Aria · #product-launch</p>
        </div>
        <span className="shrink-0 rounded-full bg-[#f0f5e6] px-2 py-0.5 text-[10px] font-semibold text-[#325600] ring-1 ring-[#c4d9a0]">
          {phase >= 4 ? 'Done' : 'Running'}
        </span>
      </div>

      <ul className="space-y-0 px-3 py-3">
        {rows.map((r, i) => {
          const done = phase >= 4 || phase > i + 1;
          const running = phase < 4 && phase === i + 1;
          const pending = phase < i + 1;
          const Icon = r.icon;
          return (
            <li
              key={r.tool}
              className={`flex items-stretch gap-2.5 rounded-xl px-2 py-2 transition-colors ${
                running ? 'bg-[#f0f5e6]' : ''
              } ${pending ? 'opacity-40' : ''}`}
            >
              <div className="flex w-6 shrink-0 flex-col items-center">
                <span
                  className={`flex size-[22px] items-center justify-center rounded-md border bg-white ${
                    done
                      ? 'border-[#c4d9a0] text-[#3f6b00]'
                      : running
                        ? 'border-amber-200 text-amber-700'
                        : 'border-[#E7E5E4] text-neutral-400'
                  }`}
                >
                  {done ? (
                    <Check className="size-3" strokeWidth={3} />
                  ) : (
                    <Icon className="size-3" strokeWidth={2} />
                  )}
                </span>
                {i < rows.length - 1 ? (
                  <span
                    aria-hidden
                    className={`mt-1 w-px flex-1 min-h-[10px] ${done ? 'bg-[#c4d9a0]' : 'bg-[#E7E5E4]'}`}
                  />
                ) : null}
              </div>
              <div className="min-w-0 flex-1 pt-0.5 pb-1">
                <p className="font-mono text-[12px] font-medium text-neutral-800">{r.tool}</p>
                <p className="truncate text-[11px] text-neutral-500">{r.detail}</p>
              </div>
              {running ? (
                <Loader2 className="mt-1 size-3.5 shrink-0 animate-spin text-[#3f6b00]" strokeWidth={2.5} />
              ) : done ? (
                <span className="mt-1 text-[10px] font-medium text-[#325600]">ok</span>
              ) : null}
            </li>
          );
        })}
      </ul>

      <div className="flex items-center justify-between border-t border-[#E7E5E4] bg-[#FAFAF9]/60 px-3.5 py-2 text-[11px]">
        <span className="text-neutral-500">
          <span className="font-semibold text-neutral-700">{Math.min(phase, 3)}</span> / 4 tools
        </span>
        <span className="inline-flex items-center gap-1.5 font-medium text-[#325600]">
          <FileText className="size-3" strokeWidth={2} />
          index.html
        </span>
      </div>
    </MockShell>
  );
}

/* ═══════════════════════════════════════════════════════════════
 * 3. Memory — chat asks about refunds → search → graph → inject
 * ═══════════════════════════════════════════════════════════════ */
const MEMORY_ROWS = [
  {
    title: 'Refund policy — Jan decision',
    category: 'Operations',
    updated: '12d ago',
    hit: true,
    snippet: 'Full refund within 14 days if unused…',
  },
  {
    title: 'Q3 refund SLA memo',
    category: 'Finance',
    updated: '1mo ago',
    hit: true,
    snippet: 'Support may approve under $50 without…',
  },
  {
    title: 'Brand voice guidelines',
    category: 'Marketing',
    updated: '1w ago',
    hit: false,
    snippet: '',
  },
  {
    title: 'Wonder launch playbook',
    category: 'Operations',
    updated: '2d ago',
    hit: false,
    snippet: '',
  },
] as const;

const GRAPH_NODES = [
  { id: 'org', label: 'Org', kind: 'entity' as const, x: 50, y: 50, hit: false },
  { id: 'refunds', label: 'Refunds', kind: 'memory' as const, x: 18, y: 28, hit: true },
  { id: 'policy', label: 'Q3 policy', kind: 'memory' as const, x: 22, y: 72, hit: true },
  { id: 'vanta', label: 'Vanta', kind: 'entity' as const, x: 78, y: 24, hit: false },
  { id: 'thread', label: 'This chat', kind: 'context' as const, x: 76, y: 70, hit: true },
];

function MemoryVisual({ focused }: { focused: boolean }) {
  const phase = useSimPhase(focused, MEMORY_DELAYS);
  // 0 idle, 1 typing query, 2 hits filtered, 3 graph lit, 4 injected
  const queryFull = 'refunds last month';
  const [typedLen, setTypedLen] = useState(queryFull.length);

  useEffect(() => {
    if (!focused) {
      setTypedLen(queryFull.length);
      return;
    }
    if (phase === 0) {
      setTypedLen(0);
      return;
    }
    if (phase >= 2) {
      setTypedLen(queryFull.length);
      return;
    }
    // phase 1 — type the query
    setTypedLen(0);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTypedLen(i);
      if (i >= queryFull.length) window.clearInterval(id);
    }, 45);
    return () => window.clearInterval(id);
  }, [focused, phase, queryFull.length]);

  const query = queryFull.slice(0, typedLen);
  const showHits = phase >= 2;
  const graphLit = phase >= 3;
  const injected = phase >= 4;

  const listRows = showHits ? MEMORY_ROWS.filter((m) => m.hit) : MEMORY_ROWS.slice(0, 3);

  return (
    <MockShell>
      {/* Tabs — Adaptive Memory active, Knowledge Graph secondary */}
      <div className="flex gap-1 border-b border-[#E7E5E4] bg-[#F5F5F4]/80 px-2 py-1.5">
        {['Adaptive Memory', 'Knowledge Graph'].map((tab, i) => (
          <span
            key={tab}
            className={`rounded-xl px-2.5 py-1.5 text-[11px] font-medium ${
              (i === 0 && phase < 3) || (i === 1 && phase >= 3)
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-500'
            }`}
          >
            {tab}
          </span>
        ))}
      </div>

      <div className="px-3 py-3">
        {/* Search driven by the chat ask */}
        <div className="relative mb-2.5">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-neutral-400" />
          <div className="flex h-9 items-center rounded-lg border border-[#E7E5E4] bg-white pl-8 pr-2.5 text-[12px]">
            <span className={query ? 'text-neutral-800' : 'text-neutral-400'}>
              {query || 'Search memories…'}
            </span>
            {phase === 1 ? (
              <span className="ml-0.5 inline-block h-3.5 w-px animate-pulse bg-neutral-800" />
            ) : null}
          </div>
        </div>

        {phase < 3 ? (
          /* Memory list — filters to refund hits */
          <div className="overflow-hidden rounded-xl border border-[#F5F5F4]">
            {listRows.map((m, i) => {
              const isHit = showHits && m.hit;
              return (
                <div
                  key={m.title}
                  className={`flex items-start gap-2.5 px-3 py-2.5 transition-colors ${
                    i ? 'border-t border-[#F5F5F4]' : ''
                  } ${isHit ? 'bg-[#f0f5e6]/70' : ''}`}
                >
                  <Brain
                    className={`mt-0.5 size-3.5 shrink-0 ${isHit ? 'text-[#3f6b00]' : 'text-neutral-400'}`}
                    strokeWidth={2}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-[12px] font-medium text-neutral-900">{m.title}</p>
                      {isHit ? (
                        <span className="shrink-0 rounded bg-[#3f6b00] px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide text-white">
                          Hit
                        </span>
                      ) : null}
                    </div>
                    <p className="text-[11px] text-neutral-400">
                      {m.category} · {m.updated}
                    </p>
                    {isHit && m.snippet ? (
                      <p className="mt-0.5 truncate text-[11px] text-neutral-600">{m.snippet}</p>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Knowledge graph — matching nodes light up */
          <div className="rounded-xl border border-[#E7E5E4] bg-[#FAFAF9]/50 p-2.5">
            <div className="relative h-[132px] w-full">
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                fill="none"
                aria-hidden
                preserveAspectRatio="none"
              >
                <g stroke="#D6D3D1" strokeWidth="0.9" strokeLinecap="round">
                  <line x1="50" y1="50" x2="18" y2="28" />
                  <line x1="50" y1="50" x2="22" y2="72" />
                  <line x1="50" y1="50" x2="78" y2="24" />
                  <line x1="18" y1="28" x2="76" y2="70" />
                  <line x1="22" y1="72" x2="76" y2="70" />
                </g>
                {graphLit ? (
                  <g stroke="#3f6b00" strokeWidth="1.2" strokeLinecap="round" opacity="0.55">
                    <line x1="18" y1="28" x2="76" y2="70" />
                    <line x1="22" y1="72" x2="76" y2="70" />
                    <line x1="18" y1="28" x2="22" y2="72" />
                  </g>
                ) : null}
              </svg>
              {GRAPH_NODES.map((n) => {
                const lit = graphLit && n.hit;
                const kindCls =
                  n.kind === 'memory'
                    ? lit
                      ? 'bg-[#f0f5e6] text-[#325600] ring-[#3f6b00]/40'
                      : 'bg-[#f0f5e6]/70 text-[#325600]/80 ring-[#c4d9a0]'
                    : n.kind === 'entity'
                      ? 'bg-sky-50 text-sky-800 ring-sky-200/80'
                      : lit
                        ? 'bg-neutral-800 text-white ring-neutral-800'
                        : 'bg-neutral-100 text-neutral-700 ring-neutral-200';
                return (
                  <span
                    key={n.id}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-md px-1.5 py-0.5 text-[10px] font-semibold tracking-tight shadow-sm ring-1 transition-all duration-500 ${kindCls} ${
                      lit ? 'scale-105 shadow-[0_0_0_3px_rgba(63,107,0,0.12)]' : ''
                    }`}
                    style={{ left: `${n.x}%`, top: `${n.y}%` }}
                  >
                    {n.label}
                  </span>
                );
              })}
            </div>
            <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 border-t border-[#E7E5E4] pt-1.5">
              <span className="inline-flex items-center gap-1 text-[9px] font-medium uppercase tracking-[0.08em] text-neutral-500">
                <span className="size-2 rounded-sm bg-sky-200 ring-1 ring-sky-300" />
                Entities
              </span>
              <span className="inline-flex items-center gap-1 text-[9px] font-medium uppercase tracking-[0.08em] text-neutral-500">
                <span className="size-2 rounded-sm bg-[#c4d9a0] ring-1 ring-[#3f6b00]/30" />
                Memories
              </span>
              <span className="inline-flex items-center gap-1 text-[9px] font-medium uppercase tracking-[0.08em] text-neutral-500">
                <span className="size-2 rounded-sm bg-neutral-300 ring-1 ring-neutral-400" />
                Context
              </span>
            </div>
          </div>
        )}
      </div>

      <div
        className={`flex items-center justify-between gap-2 border-t px-3.5 py-2 text-[11px] transition-colors ${
          injected
            ? 'border-[#c4d9a0] bg-[#f0f5e6]/80 text-[#325600]'
            : 'border-[#E7E5E4] bg-[#FAFAF9]/60 text-neutral-500'
        }`}
      >
        <span className="inline-flex items-center gap-1.5">
          <ArrowRight className="size-3" strokeWidth={2} />
          {injected
            ? '2 memories injected into this turn'
            : showHits
              ? 'Selecting relevant memories…'
              : 'Searching company memory…'}
        </span>
        {injected ? (
          <span className="inline-flex items-center gap-1 font-semibold">
            <Check className="size-3" strokeWidth={2.5} />
            Ready
          </span>
        ) : null}
      </div>
    </MockShell>
  );
}

/* ═══════════════════════════════════════════════════════════════
 * 4. Workflows — chat asks to run a playbook → Mermaid graph lights up
 * ═══════════════════════════════════════════════════════════════ */
const WORKFLOW_NODE_IDS = ['n1', 'n2', 'n3', 'n4', 'n5', 'n6'] as const;

const REFUND_MERMAID = `flowchart TD
  n1(["Refund requested"])
  n2{"Amount over $200?"}
  n3["Collect evidence"]
  n4["Apply refund SOP"]
  n5["Human review gate"]
  n6(["Issue refund"])
  n1 --> n2
  n2 -->|yes| n3
  n3 --> n4
  n4 --> n5
  n5 --> n6`;

const WORKFLOW_MERMAID_CSS = `
.workflow-mermaid .node { transition: opacity 280ms ease; }
.workflow-mermaid .node[data-state="idle"] { opacity: 0.38; }
.workflow-mermaid .node[data-state="done"] { opacity: 1; }
.workflow-mermaid .node[data-state="running"] { opacity: 1; }
.workflow-mermaid .node[data-state="done"] rect,
.workflow-mermaid .node[data-state="done"] polygon,
.workflow-mermaid .node[data-state="done"] path,
.workflow-mermaid .node[data-state="done"] circle {
  fill: #f0f5e6 !important;
  stroke: #3f6b00 !important;
  stroke-width: 1.75px !important;
}
.workflow-mermaid .node[data-state="running"] rect,
.workflow-mermaid .node[data-state="running"] polygon,
.workflow-mermaid .node[data-state="running"] path,
.workflow-mermaid .node[data-state="running"] circle {
  fill: #eef6dc !important;
  stroke: #3f6b00 !important;
  stroke-width: 2.5px !important;
  filter: drop-shadow(0 0 0 3px rgba(63, 107, 0, 0.16));
}
.workflow-mermaid .node label,
.workflow-mermaid .node .label,
.workflow-mermaid .node span {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
  font-size: 12px !important;
}
.workflow-mermaid .edgePath path {
  stroke: #a8a29e !important;
  stroke-width: 1.5px !important;
}
.workflow-mermaid .edgeLabel {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
  font-size: 11px !important;
  color: #57534e !important;
}
.workflow-mermaid .marker {
  fill: #a8a29e !important;
  stroke: #a8a29e !important;
}
`;

function WorkflowVisual({ focused }: { focused: boolean }) {
  const phase = useSimPhase(focused, WORKFLOW_DELAYS);
  const activeIds = WORKFLOW_NODE_IDS.slice(0, phase);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [svgReady, setSvgReady] = useState(0);
  const handleRender = useCallback(() => setSvgReady((n) => n + 1), []);

  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;

    const runningId =
      activeIds.length > 0 && activeIds.length < WORKFLOW_NODE_IDS.length
        ? activeIds[activeIds.length - 1]
        : null;
    const done = new Set<string>(
      runningId ? activeIds.slice(0, -1) : activeIds,
    );

    root.querySelectorAll<SVGGElement>('g.node').forEach((node) => {
      const id = node.id.match(/^flowchart-([^-]+)-/)?.[1];
      if (!id) return;
      if (runningId && id === runningId) node.dataset.state = 'running';
      else if (done.has(id)) node.dataset.state = 'done';
      else node.dataset.state = 'idle';
    });
  }, [activeIds, svgReady]);

  return (
    <MockShell className="flex h-[300px] flex-col sm:h-[320px] lg:h-[340px]">
      <style dangerouslySetInnerHTML={{ __html: WORKFLOW_MERMAID_CSS }} />
      <div className="flex shrink-0 items-center gap-2 border-b border-[#E7E5E4] bg-[#FAFAF9] px-3 py-2.5">
        <GitBranch size={13} className="text-neutral-400" strokeWidth={2} />
        <span className="text-[12px] font-semibold text-neutral-800">Refund playbook</span>
        <span className="ml-auto font-mono text-[10px] tabular-nums text-neutral-400">
          {activeIds.length}/{WORKFLOW_NODE_IDS.length} steps
        </span>
      </div>
      <div
        ref={wrapRef}
        className="workflow-mermaid flex min-h-0 flex-1 items-center justify-center overflow-auto bg-[#FAFAF9] px-2 py-3"
      >
        <MermaidFlowDiagram
          source={REFUND_MERMAID}
          className="min-h-0 w-full [&_svg]:max-h-[260px]"
          onRender={handleRender}
        />
      </div>
    </MockShell>
  );
}

/* ═══════════════════════════════════════════════════════════════
 * 5. Screen context — Fn → user marks biology diagram → agent explains
 * ═══════════════════════════════════════════════════════════════ */
const SC_LABEL_TITLE = 'deltoid';
const SC_LABEL_BODY = 'lifts & rotates the arm at the shoulder';

function ScreenContextVisual({ focused }: { focused: boolean }) {
  const phase = useSimPhase(focused, SCREEN_CONTEXT_DELAYS);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [typedTitle, setTypedTitle] = useState('');
  const [typedBody, setTypedBody] = useState('');

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const effective = reduceMotion ? SCREEN_CONTEXT_DELAYS.length : phase;
  const fnDown = effective >= 1;
  const userMarking = effective >= 2;
  const agentMarked = effective >= 3;

  // Type the agent tooltip once the green mark lands.
  useEffect(() => {
    let titleTimer: number | undefined;
    let bodyTimer: number | undefined;

    if (!agentMarked) {
      setTypedTitle('');
      setTypedBody('');
      return;
    }

    if (reduceMotion) {
      setTypedTitle(SC_LABEL_TITLE);
      setTypedBody(SC_LABEL_BODY);
      return;
    }

    setTypedTitle('');
    setTypedBody('');
    let i = 0;
    titleTimer = window.setInterval(() => {
      i += 1;
      setTypedTitle(SC_LABEL_TITLE.slice(0, i));
      if (i >= SC_LABEL_TITLE.length) {
        window.clearInterval(titleTimer);
        let j = 0;
        bodyTimer = window.setInterval(() => {
          j += 1;
          setTypedBody(SC_LABEL_BODY.slice(0, j));
          if (j >= SC_LABEL_BODY.length) window.clearInterval(bodyTimer);
        }, 18);
      }
    }, 48);

    return () => {
      if (titleTimer) window.clearInterval(titleTimer);
      if (bodyTimer) window.clearInterval(bodyTimer);
    };
  }, [agentMarked, reduceMotion]);

  return (
    <div className="relative flex h-[22rem] w-full flex-col overflow-visible sm:h-[26rem]">
      <div
        className="absolute inset-0 overflow-hidden rounded-b-xl bg-[#b9c9a8]"
        style={{
          backgroundImage: `
            linear-gradient(180deg, rgba(210,222,190,0.85) 0%, rgba(170,190,150,0.4) 55%, rgba(120,150,100,0.55) 100%),
            radial-gradient(circle at 1px 1px, rgba(40,56,24,0.1) 1px, transparent 0)
          `,
          backgroundSize: 'auto, 16px 16px',
        }}
        aria-hidden
      />

      <div className="relative z-[1] flex min-h-0 flex-1 items-center justify-center overflow-visible p-3 sm:p-4 sm:pr-10">
        {/* Preview chrome — overflow visible so the agent tooltip can float out */}
        <div className="relative w-full max-w-[22rem] overflow-visible sm:max-w-[24rem]">
          <div className="overflow-hidden rounded-[12px] bg-white shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_18px_48px_-16px_rgba(26,26,26,0.45)] ring-1 ring-black/10">
            <div className="relative flex items-center gap-1.5 border-b border-black/5 bg-neutral-50 px-3 py-2">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
              <span className="pointer-events-none absolute inset-x-0 text-center text-[11px] font-medium text-neutral-500">
                Preview — shoulder anatomy
              </span>
            </div>

            <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/screen-context/shoulder-anatomy.png"
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center grayscale"
                draggable={false}
              />

              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 400 300"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden
              >
                {/* User mark — fades out the moment the agent takes over */}
                <path
                  className={`sc-user-lasso ${
                    userMarking && !agentMarked ? 'sc-user-lasso--draw' : ''
                  } ${agentMarked ? 'sc-user-lasso--out' : ''}`}
                  d="M168 78 C198 52, 248 48, 278 72 C302 92, 308 128, 292 158 C274 186, 232 198, 198 188 C168 178, 148 148, 152 112 C154 96, 158 86, 168 78 Z"
                  fill="rgba(244,63,94,0.07)"
                  stroke="#f43f5e"
                  strokeWidth="2.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength={100}
                />
                <ellipse
                  className={`sc-agent-mark ${agentMarked ? 'sc-agent-mark--on' : ''}`}
                  cx="228"
                  cy="118"
                  rx="52"
                  ry="48"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="2.25"
                  strokeDasharray="5 3.5"
                  pathLength={100}
                />
              </svg>

              <div
                className={`sc-cursor pointer-events-none absolute z-10 ${
                  userMarking && !agentMarked ? 'sc-cursor--mark' : ''
                } ${agentMarked ? 'sc-cursor--hide' : ''}`}
                aria-hidden
              >
                <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
                  <path
                    d="M1 1.2L1 17.4L5.2 13.6L8.4 20.2L11.2 18.9L8 12.4L13.6 12.4L1 1.2Z"
                    fill="#111"
                    stroke="#fff"
                    strokeWidth="1.1"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="absolute inset-x-0 bottom-2.5 z-20 flex justify-center px-3">
                <div
                  className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1.5 text-[11px] font-medium shadow-md ring-1 backdrop-blur-md transition-colors duration-300 ${
                    fnDown
                      ? 'bg-neutral-900/90 text-white ring-white/10'
                      : 'bg-white/90 text-neutral-700 ring-black/10'
                  }`}
                >
                  <kbd
                    className={`inline-flex h-5 min-w-[1.65rem] items-center justify-center rounded-[5px] px-1 font-mono text-[10px] font-bold tracking-wide ring-1 transition-colors ${
                      fnDown
                        ? 'bg-fern-500 text-white ring-fern-400 shadow-[0_0_0_3px_rgba(122,168,36,0.35)]'
                        : 'bg-neutral-100 text-neutral-800 ring-neutral-200'
                    }`}
                  >
                    Fn
                  </kbd>
                  <span>
                    {!fnDown
                      ? 'Click Fn to mark on screen'
                      : userMarking && !agentMarked
                        ? 'Outline what you want explained…'
                        : agentMarked
                          ? 'Trooper marked it for you'
                          : 'Marking mode on'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Agent tooltip — outside Preview overflow so it can float over the desktop */}
          <div
            className={`pointer-events-none absolute z-30 w-[10.5rem] transition-all duration-300 ease-out sm:w-[11.5rem] ${
              agentMarked
                ? 'translate-x-0 opacity-100'
                : 'translate-x-1 opacity-0'
            }`}
            style={{ left: '72%', top: '22%' }}
          >
            <div className="relative">
              <span className="absolute -left-1.5 top-3 h-0 w-0 border-y-[6px] border-r-[7px] border-y-transparent border-r-[#16a34a]" />
              <div className="rounded-[8px] bg-[#16a34a] px-2.5 py-1.5 text-white shadow-[0_10px_28px_-10px_rgba(22,163,74,0.65)] ring-1 ring-black/10">
                <p className="min-h-[11px] text-[11px] font-semibold leading-none tracking-tight">
                  {typedTitle}
                  {agentMarked && typedTitle.length < SC_LABEL_TITLE.length ? (
                    <span className="ml-0.5 inline-block h-[0.9em] w-[1.5px] animate-pulse bg-white/80 align-[-1px]" />
                  ) : null}
                </p>
                <p className="mt-1 min-h-[2.4em] text-[10px] leading-snug text-white/90">
                  {typedBody}
                  {agentMarked &&
                  typedTitle.length >= SC_LABEL_TITLE.length &&
                  typedBody.length < SC_LABEL_BODY.length ? (
                    <span className="ml-0.5 inline-block h-[0.9em] w-[1.5px] animate-pulse bg-white/70 align-[-1px]" />
                  ) : null}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .sc-user-lasso {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .sc-user-lasso--draw {
          opacity: 1;
          animation: scUserLasso 1.15s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .sc-user-lasso--out {
          stroke-dashoffset: 0;
          opacity: 0 !important;
          animation: none;
          transition: opacity 0.28s ease;
        }
        @keyframes scUserLasso {
          to { stroke-dashoffset: 0; }
        }
        .sc-agent-mark {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          opacity: 0;
        }
        .sc-agent-mark--on {
          opacity: 1;
          animation: scAgentMark 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes scAgentMark {
          to { stroke-dashoffset: 0; }
        }
        .sc-cursor {
          left: 36%;
          top: 42%;
          opacity: 0;
        }
        .sc-cursor--mark {
          opacity: 1;
          animation: scMarkPath 1.15s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .sc-cursor--hide {
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        @keyframes scMarkPath {
          0%   { left: 40%; top: 28%; }
          20%  { left: 58%; top: 18%; }
          45%  { left: 70%; top: 36%; }
          70%  { left: 58%; top: 58%; }
          100% { left: 42%; top: 48%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sc-user-lasso--draw, .sc-agent-mark--on, .sc-cursor--mark { animation: none !important; }
          .sc-user-lasso--draw { stroke-dashoffset: 0; opacity: 1; }
          .sc-user-lasso--out { opacity: 0 !important; }
          .sc-agent-mark--on { stroke-dashoffset: 0; opacity: 1; }
          .sc-cursor--mark { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/**
 * Soft product stage for smaller card mocks — calm wash, no decorative
 * matrix fade. Full product screens render flush under the traffic-light bar.
 */
const PixelFramedVisual = ({ children }: { children: ReactNode }) => (
  <div className="relative flex min-h-[320px] flex-col overflow-hidden bg-[#f3f4f6] sm:min-h-[360px] lg:min-h-[400px]">
    <div className="relative z-10 flex flex-1 items-center justify-center p-3 sm:p-4 lg:p-5">
      <div className="w-full max-w-[min(100%,32rem)]">{children}</div>
    </div>
  </div>
);

/* ─── Cards ─── */
type CapabilityCard = {
  tag: string;
  ask: string;
  reply: string;
  window: string;
  title: string;
  highlight?: string;
  description: string;
  Visual: (props: { focused: boolean }) => JSX.Element | null;
  /** Full-bleed product screen — no padded canvas around the mock. */
  screen?: boolean;
  /** Let tooltips / marks float outside the window chrome. */
  overflowVisible?: boolean;
  meta?: string;
  cta?: { label: string; href: string; external?: boolean };
  secondary?: { label: string; href: string };
  ctaIcon?: { src: string; invert?: boolean };
};

const WORK_SCENE: Record<(typeof WORK_SURFACES)[number]['id'], () => JSX.Element | null> = {
  desktop: DesktopScene,
  browser: BrowserScene,
  devices: DevicesScene,
};

const cards: CapabilityCard[] = [
  {
    tag: 'AI organizations',
    ask: 'trooper, I need a growth team on this launch',
    reply: 'on it. spinning up 3 troopers',
    window: 'Agents — Growth Org',
    title: 'AI organizations, not',
    highlight: 'single-purpose agents.',
    description:
      'Trooper lets you create AI organizations made up of multiple AI employees. Each organization works together on tasks, shares context, and coordinates execution — similar to how real teams operate.',
    Visual: OrgVisual,
    // Full-bleed product panel (sidebar + chat + roster) — no nested stage toy.
    screen: true,
  },
  {
    tag: 'Action, not answers',
    ask: 'trooper, ship the og-image fix to prod',
    reply: 'on it!',
    window: 'Task run — wonder.so',
    title: 'AI that takes',
    highlight: 'action, not just questions.',
    description:
      'Instead of replying with suggestions, AI employees create issues, update files, send emails, take screenshots, post updates, and complete real tasks from start to finish.',
    Visual: ActionVisual,
  },
  {
    tag: 'Infinite memory',
    ask: 'trooper, what did we decide on refunds last month?',
    reply: 'pulling it from memory',
    window: 'Memory — Adaptive Memory',
    title: 'Persistent memory across',
    highlight: 'tasks, projects, and time.',
    description:
      'AI employees remember past work, decisions, preferences, and project context. Every task builds on previous knowledge, so work gets faster and more accurate over time.',
    Visual: MemoryVisual,
  },
  {
    tag: 'Workflows',
    ask: 'trooper, run the refund playbook for Acme',
    reply: 'on it. following the SOP',
    window: 'Workflow — Refund playbook',
    title: 'Workflows you define.',
    highlight: 'Reliable decisions, every time.',
    description:
      'Create SOPs as workflows agents follow end to end — triggers, checks, AI steps, and human gates. The same playbook every time, so work stays consistent and nothing happens off-script.',
    Visual: WorkflowVisual,
  },
  {
    tag: 'Screen context',
    ask: "trooper, what's this muscle called?",
    reply: 'deltoid. it lifts your arm',
    window: 'Screen — studio-mac',
    title: 'Use your screen as context.',
    highlight: 'Hold Fn. Mark. Ask.',
    description:
      'Hold Fn and outline anything on your Mac — a diagram, an error, a design. Troopers see what you mark and explain it. No screenshots to upload.',
    Visual: ScreenContextVisual,
    screen: true,
    overflowVisible: true,
    meta: 'macOS 12+ · Hold Fn to mark on screen',
    cta: { label: 'Download for Mac', href: MAC_DMG_URL, external: true },
    ctaIcon: { src: '/images/platforms/apple.svg', invert: true },
  },
  {
    tag: 'Video editor',
    ask: 'trooper, cut the fillers and pull the highlights',
    reply: 'on it. opening the editor',
    window: 'Editor — Demo Project',
    title: 'AI video editor,',
    highlight: 'not a timeline grind.',
    description:
      'Ask Troopers to remove fillers, find highlights, generate motion graphics, and score the cut. The timeline updates while you watch — same workflow as chatting your edit.',
    Visual: VideoEditorVisual,
    screen: true,
    meta: 'Cuts · motion graphics · score',
    cta: { label: 'Get started free', href: 'https://app.trooper.so?ref=video-editor', external: true },
  },
  // Desktop / browser / devices — same rhythm as the rows above, not a second section.
  ...WORK_SURFACES.map((surface) => {
    const Scene = WORK_SCENE[surface.id];
    return {
      tag: surface.id,
      ask: surface.ask,
      reply: surface.reply,
      window: surface.window,
      title: surface.title,
      highlight: surface.highlight,
      description: surface.body,
      meta: surface.meta,
      cta: surface.cta,
      secondary: surface.secondary,
      ctaIcon: surface.ctaIcon,
      screen: true,
      Visual: () => <Scene />,
    };
  }),
];

/**
 * Capability rows (orgs, action, memory, workflows, screen context, video
 * editor, then desktop / browser / devices): typed ask → green reply,
 * product frame beside. One scroll-focus dims every other row.
 */
export default function OldWays() {
  const rowRefs = useRef<Array<HTMLElement | null>>([]);
  const activeRef = useRef(-1);
  // -1: nothing measured yet; -2: reduced motion (all rows stay fully on).
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktopMq = window.matchMedia('(min-width: 1024px)');
    let raf = 0;

    /** Tall stacked cards: score near the reading band, not geometric center. */
    const focusY = (r: DOMRect, desktop: boolean) =>
      desktop ? r.top + r.height / 2 : r.top + Math.min(160, r.height * 0.22);

    const distance = (el: HTMLElement, band: number, desktop: boolean) =>
      Math.abs(focusY(el.getBoundingClientRect(), desktop) - band);

    const update = () => {
      raf = 0;
      if (reduceMq.matches) {
        activeRef.current = -2;
        setActive(-2);
        return;
      }

      const desktop = desktopMq.matches;
      // Mobile reading line sits higher — bubbles live at the top of each row.
      const band = window.innerHeight * (desktop ? 0.5 : 0.34);
      let best = -1;
      let bestD = Infinity;

      rowRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = distance(el, band, desktop);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });

      // Hysteresis so focus doesn't chatter while scrolling tall mobile rows.
      const prev = activeRef.current;
      let next = best;
      if (prev >= 0 && prev !== best) {
        const prevEl = rowRefs.current[prev];
        if (prevEl) {
          const prevD = distance(prevEl, band, desktop);
          const slack = desktop ? 56 : 96;
          if (prevD < bestD + slack) next = prev;
        }
      }

      if (next !== prev) {
        activeRef.current = next;
        setActive(next);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    reduceMq.addEventListener('change', onScroll);
    desktopMq.addEventListener('change', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      reduceMq.removeEventListener('change', onScroll);
      desktopMq.removeEventListener('change', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="flex flex-col gap-12 sm:gap-16 lg:gap-24">
      {cards.map((card, i) => {
        const visualFirst = i % 2 === 1;
        const dimmed = active >= 0 && i !== active;
        const focused = active === i || active === -2;
        const Visual = card.Visual;
        return (
          <article
            key={card.tag}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            className={[
              'grid min-w-0 items-center gap-6 transition-[opacity,filter,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:grid-cols-2 lg:gap-12',
              // Soft fade on mobile (no blur); desktop keeps the stronger stage light.
              dimmed
                ? 'opacity-[0.38] max-lg:opacity-[0.48] lg:scale-[0.985] lg:opacity-40 lg:blur-[1.5px]'
                : 'opacity-100',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <div
              className={`flex min-w-0 flex-col lg:max-w-md lg:justify-self-center ${
                visualFirst ? 'lg:order-2' : ''
              }`}
            >
              <BubbleExchange ask={card.ask} reply={card.reply} focused={focused} />

              <h3 className="mt-6 font-funneldisplay text-xl font-medium leading-snug tracking-tight text-balance text-ink sm:text-2xl lg:text-[1.75rem] lg:leading-[1.2]">
                {card.title}{' '}
                {card.highlight ? <span className="text-ink-muted">{card.highlight}</span> : null}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted sm:mt-4 sm:text-[15px] sm:leading-7">
                {card.description}
              </p>

              {card.meta ? (
                <p className="mt-3 text-sm text-neutral-500">{card.meta}</p>
              ) : null}

              {card.cta ? (
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <PixelButton
                    href={card.cta.href}
                    external={card.cta.external}
                    size="sm"
                    tone="dark"
                    icon={
                      card.ctaIcon ? undefined : <ArrowRight className="h-3.5 w-3.5" />
                    }
                  >
                    {card.ctaIcon ? (
                      <span className="inline-flex items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={card.ctaIcon.src}
                          alt=""
                          aria-hidden
                          className={`h-4 w-4 object-contain ${
                            card.ctaIcon.invert ? 'brightness-0 invert' : ''
                          }`}
                        />
                        {card.cta.label}
                      </span>
                    ) : (
                      card.cta.label
                    )}
                  </PixelButton>
                  {card.secondary ? (
                    <Link href={card.secondary.href} className="group link-mono">
                      <span>{card.secondary.label}</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  ) : null}
                </div>
              ) : null}
            </div>

            <div className={`min-w-0 ${visualFirst ? 'lg:order-1' : ''}`}>
              <div
                className={`rounded-2xl bg-white shadow-[0_20px_48px_-28px_rgba(26,26,26,0.35)] ring-1 ring-black/[0.08] ${
                  card.overflowVisible ? 'overflow-visible' : 'overflow-hidden'
                }`}
              >
                <div className="relative flex items-center gap-1.5 overflow-hidden rounded-t-2xl border-b border-black/[0.05] bg-[#fafafa] px-3 py-2">
                  <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="size-2.5 rounded-full bg-[#febc2e]" />
                  <span className="size-2.5 rounded-full bg-[#28c840]" />
                  <span className="pointer-events-none absolute inset-x-0 text-center text-[11px] font-medium text-neutral-400">
                    {card.window}
                  </span>
                </div>
                {card.screen ? (
                  <div
                    className={
                      card.overflowVisible
                        ? 'overflow-visible rounded-b-xl'
                        : 'overflow-hidden'
                    }
                  >
                    <Visual focused={focused} />
                  </div>
                ) : (
                  <PixelFramedVisual>
                    <Visual focused={focused} />
                  </PixelFramedVisual>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
