'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import {
  FileText,
  Check,
  Loader2,
  Search,
  Brain,
  ArrowRight,
  Globe,
  Terminal,
} from 'lucide-react';
import { WORK_SURFACES } from '@/lib/whereTheyWork';
import { DotMatrixFade } from './ui/FeaturePeekStage';
import { BubbleExchange } from './ui/ChatBubble';
import PixelButton from './ui/PixelButton';
import {
  BrowserScene,
  DesktopScene,
  DevicesScene,
} from './where-they-work/WorkSurfaceScenes';

/* ─── Shared shell ─── */
const MockShell = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={`w-full overflow-hidden rounded-2xl border border-[#E7E5E4] bg-white shadow-[0_24px_56px_-28px_rgba(28,25,23,0.32)] ${className}`}
  >
    {children}
  </div>
);

const AGENT_ROSTER = [
  {
    name: 'Jordan',
    role: 'Chief of Staff',
    img: 'https://i.pravatar.cc/150?u=agent-jordan',
    kind: 'manager' as const,
  },
  {
    name: 'Aria',
    role: 'Growth',
    img: 'https://i.pravatar.cc/150?u=agent-aria',
    kind: 'specialist' as const,
  },
  {
    name: 'Ren',
    role: 'Product',
    img: 'https://i.pravatar.cc/150?u=agent-ren',
    kind: 'specialist' as const,
  },
  {
    name: 'Leo',
    role: 'Ops',
    img: 'https://i.pravatar.cc/150?u=agent-leo',
    kind: 'specialist' as const,
  },
];

function AgentAv({ src, size = 36 }: { src: string; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      className="shrink-0 rounded-full object-cover ring-2 ring-white"
      style={{ width: size, height: size }}
    />
  );
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
const TICKET_DELAYS = [450, 1100, 1800, 2600] as const;

function OrgVisual({ focused }: { focused: boolean }) {
  const phase = useSimPhase(focused, ORG_DELAYS);
  // 0 idle, 1 reading ask, 2 Aria online, 3 Ren online, 4 Leo online
  const statuses = [
    phase >= 4 ? 'ready' : phase >= 1 ? 'routing' : 'idle',
    phase >= 2 ? 'online' : phase >= 1 ? 'spinning' : 'queued',
    phase >= 3 ? 'online' : phase >= 2 ? 'spinning' : 'queued',
    phase >= 4 ? 'online' : phase >= 3 ? 'spinning' : 'queued',
  ] as const;

  return (
    <MockShell>
      <div className="border-b border-[#E7E5E4] bg-[#FAFAF9] px-3.5 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[12px] font-semibold text-neutral-900">My Org</span>
          <span className="text-[11px] text-neutral-500">1 manager · 3 specialists</span>
        </div>
        <div
          className={`mt-2 flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[11px] transition-colors ${
            phase >= 1 ? 'bg-[#f0f5e6] text-[#325600] ring-1 ring-[#c4d9a0]' : 'bg-white text-neutral-500 ring-1 ring-[#E7E5E4]'
          }`}
        >
          <span className="truncate">
            {phase >= 1 ? (
              <>
                Ask matched · <span className="font-semibold">growth team</span> for launch
              </>
            ) : (
              'Waiting for instruction…'
            )}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center bg-[#FAFAF9]/40 px-4 py-5">
        {/* Jordan routes the ask */}
        <div className="flex flex-col items-center gap-1">
          <AgentAv src={AGENT_ROSTER[0].img} size={40} />
          <p className="text-[13px] font-semibold text-neutral-900">{AGENT_ROSTER[0].name}</p>
          <p className="text-[11px] text-neutral-500">{AGENT_ROSTER[0].role}</p>
          <span
            className={`mt-0.5 rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${
              statuses[0] === 'routing'
                ? 'bg-amber-100 text-amber-800'
                : statuses[0] === 'ready'
                  ? 'bg-[#f0f5e6] text-[#325600]'
                  : 'bg-[#FEF3C7] text-[#B45309]'
            }`}
          >
            {statuses[0] === 'routing' ? 'Routing' : statuses[0] === 'ready' ? 'Leading' : 'Manager'}
          </span>
        </div>

        <span aria-hidden className="my-2 h-4 w-px bg-[#E7E5E4]" />

        <div className="grid w-full grid-cols-3 gap-2">
          {AGENT_ROSTER.slice(1).map((agent, i) => {
            const st = statuses[i + 1];
            return (
              <div
                key={agent.name}
                className={`flex flex-col items-center rounded-xl border bg-white px-2 py-3 text-center transition-all duration-500 ${
                  st === 'online'
                    ? 'border-[#c4d9a0] shadow-[0_8px_20px_-14px_rgba(63,107,0,0.45)]'
                    : st === 'spinning'
                      ? 'border-amber-200 shadow-sm'
                      : 'border-[#E7E5E4] opacity-55'
                }`}
              >
                <AgentAv src={agent.img} size={34} />
                <p className="mt-1.5 text-[12px] font-semibold text-neutral-900">{agent.name}</p>
                <p className="text-[10px] text-neutral-500">{agent.role}</p>
                <span
                  className={`mt-1.5 inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${
                    st === 'online'
                      ? 'bg-[#f0f5e6] text-[#325600]'
                      : st === 'spinning'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-neutral-100 text-neutral-400'
                  }`}
                >
                  {st === 'spinning' ? (
                    <Loader2 className="size-2.5 animate-spin" strokeWidth={2.5} />
                  ) : st === 'online' ? (
                    <span className="size-1.5 rounded-full bg-[#3f6b00]" />
                  ) : null}
                  {st === 'online' ? 'Online' : st === 'spinning' ? 'Spinning up' : 'Queued'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[#E7E5E4] bg-white px-3.5 py-2 text-[11px]">
        <span className="text-neutral-500">
          {phase >= 4 ? 'Growth pod ready' : 'Assembling team…'}
        </span>
        <span className="font-medium text-[#325600]">
          {Math.min(phase, 3)} / 3 troopers live
        </span>
      </div>
    </MockShell>
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
 * 4. Ticket — chat asks why deploy broke → live audit trace
 * ═══════════════════════════════════════════════════════════════ */
function TicketVisual({ focused }: { focused: boolean }) {
  const phase = useSimPhase(focused, TICKET_DELAYS);
  const steps = [
    { fn: 'run_tests()', detail: '12 passed', status: 'passed' as const },
    { fn: 'deploy_to_staging()', detail: 'staging green', status: 'passed' as const },
    { fn: 'smoke_test()', detail: 'pricing page 200', status: 'passed' as const },
    {
      fn: 'deploy_to_production()',
      detail: phase >= 4 ? 'env: STRIPE_KEY missing' : 'rolling out…',
      status: (phase >= 4 ? 'failed' : 'running') as 'failed' | 'running' | 'passed',
    },
  ];

  return (
    <MockShell>
      <div className="border-b border-[#E7E5E4] bg-[#FAFAF9] px-3.5 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-[13px] font-semibold text-neutral-900">
            Ticket #1042 · Deploy pricing page
          </p>
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${
              phase >= 4
                ? 'bg-red-50 text-red-700 ring-red-200'
                : 'bg-amber-50 text-amber-800 ring-amber-200'
            }`}
          >
            {phase >= 4 ? 'Failed' : 'Tracing'}
          </span>
        </div>
        <p className="mt-1 text-[11px] text-neutral-500">
          {phase >= 1 ? (
            <>
              Investigating · <span className="font-medium text-neutral-700">why did the deploy break?</span>
            </>
          ) : (
            'Opening audit log…'
          )}
        </p>
      </div>

      <ul className="px-3 py-3">
        {steps.map((t, i) => {
          const revealed = phase >= i + 1;
          const isCurrent = phase === i + 1 || (phase >= 4 && i === 3);
          const failed = t.status === 'failed';
          const running = t.status === 'running' && revealed;
          return (
            <li
              key={t.fn}
              className={`flex items-start gap-2.5 rounded-xl px-2 py-2 transition-all ${
                !revealed ? 'opacity-30' : ''
              } ${isCurrent && failed ? 'bg-red-50/80 ring-1 ring-red-100' : ''} ${
                isCurrent && running ? 'bg-amber-50/70 ring-1 ring-amber-100' : ''
              }`}
            >
              <div className="relative flex w-5 shrink-0 flex-col items-center self-stretch">
                {i < steps.length - 1 ? (
                  <span
                    aria-hidden
                    className={`absolute left-1/2 top-4 bottom-[-6px] w-px -translate-x-1/2 ${
                      revealed && !failed && t.status === 'passed' ? 'bg-[#c4d9a0]' : 'bg-[#E7E5E4]'
                    }`}
                  />
                ) : null}
                {failed ? (
                  <span className="relative z-10 mt-1.5 size-3.5 rounded-full bg-red-500 ring-2 ring-red-100" />
                ) : running ? (
                  <span className="relative z-10 mt-1.5 flex size-3.5 items-center justify-center">
                    <span className="absolute size-3.5 animate-ping rounded-full bg-amber-400/50" />
                    <span className="relative size-2.5 rounded-full bg-amber-500 ring-2 ring-amber-100" />
                  </span>
                ) : (
                  <span className="relative z-10 mt-1.5 flex size-3.5 items-center justify-center rounded-full bg-[#3f6b00] text-white">
                    <Check className="size-2.5" strokeWidth={3} />
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="font-mono text-[12px] font-medium text-neutral-800">{t.fn}</p>
                <p className={`text-[11px] ${failed ? 'font-medium text-red-700' : 'text-neutral-500'}`}>
                  {revealed ? t.detail : '—'}
                </p>
              </div>
              <span
                className={`mt-0.5 shrink-0 rounded-md px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] ${
                  failed
                    ? 'bg-red-100 text-red-700'
                    : running
                      ? 'bg-amber-100 text-amber-800'
                      : revealed
                        ? 'bg-[#f0f5e6] text-[#325600]'
                        : 'bg-neutral-100 text-neutral-400'
                }`}
              >
                {failed ? 'Failed' : running ? 'Running' : revealed ? 'Passed' : '—'}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center justify-between border-t border-[#E7E5E4] bg-[#FAFAF9]/60 px-3.5 py-2 text-[11px]">
        <span className="font-medium uppercase tracking-[0.1em] text-neutral-400">Audit log</span>
        <span className="font-medium text-[#325600]">
          {phase >= 4 ? 'Root cause found · 47 events' : '47 events · tracing…'}
        </span>
      </div>
    </MockShell>
  );
}

/**
 * The window's "screen" for smaller card mocks — padded canvas + max-width so
 * org/ticket/etc. visuals stay consistent. Full product screens (browser /
 * desktop / devices) render flush under the traffic-light bar instead.
 */
const PixelFramedVisual = ({ children }: { children: ReactNode }) => (
  <div className="relative flex min-h-[300px] flex-col overflow-hidden sm:min-h-[340px] lg:min-h-[400px]">
    <div className="absolute inset-0 bg-gradient-to-br from-canvas via-canvas to-slate-100/50" />
    <DotMatrixFade />
    <div className="relative z-10 flex flex-1 items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-[min(100%,27rem)]">{children}</div>
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
    reply: 'on it — spinning up 3 troopers',
    window: 'Agents — My Org',
    title: 'AI organizations, not',
    highlight: 'single-purpose agents.',
    description:
      'Trooper lets you create AI organizations made up of multiple AI employees. Each organization works together on tasks, shares context, and coordinates execution — similar to how real teams operate.',
    Visual: OrgVisual,
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
    tag: 'Ticket system',
    ask: 'trooper, why did the deploy break?',
    reply: 'tracing every step',
    window: 'Ticket #1042',
    title: 'Every conversation traced.',
    highlight: 'Every decision explained.',
    description:
      'You communicate with agents through tickets. Every instruction, every response, every tool call and decision is recorded with full tracing. Nothing happens in the dark.',
    Visual: TicketVisual,
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
 * Capability rows (orgs, action, memory, tickets, then desktop / browser /
 * devices): typed ask → green reply, product frame beside. One scroll-focus
 * dims every other row — including where agents run.
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
              <div className="overflow-hidden rounded-xl bg-white shadow-[0_28px_56px_-24px_rgba(26,26,26,0.4)] ring-1 ring-black/10">
                <div className="relative flex items-center gap-1.5 border-b border-black/5 bg-neutral-50 px-3 py-2">
                  <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="size-2.5 rounded-full bg-[#febc2e]" />
                  <span className="size-2.5 rounded-full bg-[#28c840]" />
                  <span className="pointer-events-none absolute inset-x-0 text-center text-[11px] font-medium text-neutral-500">
                    {card.window}
                  </span>
                </div>
                {card.screen ? (
                  <div className="overflow-hidden">
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
