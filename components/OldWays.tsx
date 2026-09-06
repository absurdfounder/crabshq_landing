'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import {
  Check,
  Loader2,
  Search,
  Brain,
  ArrowRight,
  GitBranch,
  Globe2,
  FileCode2,
  PenLine,
  Rocket,
  CircleCheck,
  Sparkles,
} from 'lucide-react';
import { WORK_SURFACES } from '@/lib/whereTheyWork';
import { MAC_DMG_URL } from '@/lib/downloadUrls';
import { getTrooper } from '@/lib/troopers';
import { BubbleExchange } from './ui/ChatBubble';
import PixelButton from './ui/PixelButton';
import TrooperAvatar from './ui/TrooperAvatar';
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
    // Soft-crop like Gumloop: flush white product surface, bottom dissolve.
    <div
      className={`relative h-[380px] w-full overflow-hidden bg-white sm:h-[420px] lg:h-[460px] ${className}`}
    >
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-10 bg-gradient-to-b from-transparent to-white"
      />
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
  {
    name: 'Rex',
    role: 'Calls',
    handle: 'rex' as const,
    kind: 'specialist' as const,
  },
];

function AgentAv({
  handle,
  size = 36,
  live = false,
  animation = 'idle',
}: {
  handle: (typeof AGENT_ROSTER)[number]['handle'];
  size?: number;
  /** Procedural animation — only for the focused agent face. */
  live?: boolean;
  animation?: string;
}) {
  const trooper = getTrooper(handle);
  if (!trooper) return null;
  return <TrooperAvatar trooper={trooper} size={size} live={live} animation={animation} />;
}

/** Advance a staged simulation while the capability row is focused. */
function useSimPhase(focused: boolean, delays: readonly number[], resetKey = '') {
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
  }, [focused, delayKey, finalPhase, resetKey]);

  return phase;
}

/* ═══════════════════════════════════════════════════════════════
 * 1. Org — chat asks for a growth team → HQ spins up troopers
 * ═══════════════════════════════════════════════════════════════ */
const ORG_DELAYS = [400, 1100, 1800, 2600] as const;
const ACTION_DELAYS = [700, 1500, 2400, 3300] as const;
const MEMORY_DELAYS = [400, 1400, 2200, 3000] as const;
/** 0 idle → light each workflow node in order */
const WORKFLOW_DELAYS = [400, 900, 1400, 1900, 2400, 2900] as const;
/** 0 idle → 1 Fn → 2 user marks → 3 agent labels → 4 explains */
const SCREEN_CONTEXT_DELAYS = [400, 900, 2100, 2900] as const;

/** Gumloop-style agent browser: Sales / Support / Data / Meetings / Calls. */
type OrgAgentTab = 'Sales' | 'Support' | 'Data' | 'Meetings' | 'Calls';

type OrgAgentPage = {
  id: OrgAgentTab;
  handle: (typeof AGENT_ROSTER)[number]['handle'];
  title: string;
  blurb: string;
  model: string;
  askWho: string;
  ask: string;
  steps: [string, string, string];
  resultTitle: string;
  columns: string[];
  rows: string[][];
};

const ORG_AGENT_PAGES: OrgAgentPage[] = [
  {
    id: 'Sales',
    handle: 'nova',
    title: 'CRM Agent',
    blurb: 'Keeps pipeline current and flags deals that need attention.',
    model: 'Claude 4.5 Sonnet',
    askWho: 'Marcelo',
    ask: "How's our Q1 pipeline looking? Anything at risk?",
    steps: [
      'Fetching Q1 open opportunities',
      'Cross-referencing HubSpot deals',
      'Building pipeline summary',
    ],
    resultTitle: 'Q1 Pipeline Summary',
    columns: ['Deal', 'Account', 'Stage', 'Amount', 'Close', 'Prob', 'Owner'],
    rows: [
      ['Enterprise renewal', 'Vantage', 'Negotiation', '$142,000', 'Mar 28', '70%', 'Maya'],
      ['Platform expansion', 'Torchlight', 'Proposal', '$86,500', 'Apr 12', '55%', 'Jon'],
      ['New logo', 'Northwind', 'Discovery', '$48,000', 'May 02', '35%', 'Ava'],
      ['Upsell seats', 'Meridian', 'Closed Won', '$22,400', 'Mar 04', '100%', 'Maya'],
      ['Pilot → annual', 'Orion', 'Qualification', '$61,000', 'Apr 30', '40%', 'Jon'],
    ],
  },
  {
    id: 'Support',
    handle: 'scout',
    title: 'Support Agent',
    blurb: 'Triages tickets, files bugs, and drafts customer replies.',
    model: 'GPT-5',
    askWho: 'Sam',
    ask: 'Meridian Corp is reporting a broken CSV export — can you create a bug ticket?',
    steps: [
      'Searching related tickets',
      'Drafting BUG-4192',
      'Logging customer impact',
    ],
    resultTitle: 'BUG-4192 — Broken CSV Export',
    columns: ['Field', 'Value'],
    rows: [
      ['Priority', 'High'],
      ['Type', 'Bug'],
      ['Customer', 'Meridian Corp'],
      ['Tags', 'csv-export · export'],
      ['Status', 'Open · assigned to Eng'],
    ],
  },
  {
    id: 'Data',
    handle: 'wren',
    title: 'Data Analysis Agent',
    blurb: 'Answers questions from your warehouse with charts and funnels.',
    model: 'Gemini 3 Flash',
    askWho: 'Omid',
    ask: 'Where are we losing people in the onboarding flow?',
    steps: [
      'Querying available event types',
      'Building onboarding funnel query',
      'Building onboarding funnel chart',
    ],
    resultTitle: 'Onboarding funnel',
    columns: ['Step', 'Users', 'Drop-off'],
    rows: [
      ['Signed Up', '4,820', '—'],
      ['Completed Profile', '3,940', '18%'],
      ['Viewed Dashboard', '3,105', '21%'],
      ['Attempted Integration', '1,673', '46%'],
      ['Completed Integration', '1,054', '37%'],
    ],
  },
  {
    id: 'Meetings',
    handle: 'pip',
    title: 'Meeting Prep Agent',
    blurb: 'Researches attendees and builds briefs before every call.',
    model: 'Claude 4.5 Sonnet',
    askWho: 'Aron',
    ask: 'Research the other attendees for my upcoming meeting.',
    steps: [
      'Pulling calendar invite',
      'Enriching attendee profiles',
      'Writing discovery brief',
    ],
    resultTitle: 'Meeting Prep: Discovery — Orion',
    columns: ['Attendee', 'Role', 'Signal'],
    rows: [
      ['Tess Holloway', 'VP Eng', 'Left Salesforce recently'],
      ['Ryan Park', 'CTO', '12+ SaaS clients'],
      ['Priya Shah', 'Ops', 'Owns procurement'],
      ['You', 'AE', 'Host'],
    ],
  },
  {
    id: 'Calls',
    handle: 'rex',
    title: 'Call Analysis Agent',
    blurb: 'Scores calls, extracts objections, and queues follow-ups.',
    model: 'Kimi K2.6',
    askWho: 'Maya',
    ask: 'Summarize yesterday’s discovery call and list the objections.',
    steps: [
      'Transcribing call recording',
      'Tagging objections',
      'Drafting follow-up email',
    ],
    resultTitle: 'Call scorecard',
    columns: ['Moment', 'Speaker', 'Note'],
    rows: [
      ['02:14', 'Prospect', 'Budget frozen until Q3'],
      ['08:40', 'You', 'ROI vs contractor cost'],
      ['14:02', 'Prospect', 'Needs SSO + audit log'],
      ['19:55', 'You', 'Booked technical deep-dive'],
    ],
  },
];

function OrgVisual({ focused }: { focused: boolean }) {
  const [tab, setTab] = useState<OrgAgentTab>('Sales');
  const phase = useSimPhase(focused, ORG_DELAYS, tab);
  const page = ORG_AGENT_PAGES.find((p) => p.id === tab) ?? ORG_AGENT_PAGES[0];
  const visibleCols = page.columns;

  return (
    // Soft-crop panel like Gumloop: overflow clipped, bottom + right fades.
    <div className="relative h-[380px] overflow-hidden bg-white sm:h-[420px] lg:h-[460px]">
      <div className="flex h-full min-h-0">
        <aside className="flex w-[68px] shrink-0 flex-col items-stretch gap-1 overflow-hidden border-r border-black/[0.06] bg-[#f6f7f8] p-1.5 sm:w-[72px]">
          {ORG_AGENT_PAGES.map((p) => {
            const active = p.id === tab;
            return (
              <button
                key={p.id}
                type="button"
                aria-label={`Preview ${p.title}`}
                aria-pressed={active}
                onClick={() => setTab(p.id)}
                className={`flex flex-col items-center gap-1 rounded-lg px-1 py-2 text-center transition-colors ${
                  active
                    ? 'bg-white text-ink shadow-[0_1px_2px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.06]'
                    : 'text-neutral-400 hover:bg-white/70 hover:text-neutral-600'
                }`}
              >
                <span className="flex size-10 items-center justify-center overflow-visible">
                  <AgentAv handle={p.handle} size={active ? 32 : 28} />
                </span>
                <span className="text-[10px] font-medium leading-none">{p.id}</span>
              </button>
            );
          })}
        </aside>

        <div className="min-w-0 flex-1 overflow-hidden px-4 py-4 sm:px-5 sm:py-5">
          <div className="flex items-start gap-3">
            <AgentAv handle={page.handle} size={44} live={focused} animation="listening" />
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-semibold tracking-tight text-ink">{page.title}</p>
              <p className="mt-0.5 text-[12px] leading-snug text-neutral-500">{page.blurb}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-600">
                  <Sparkles className="size-2.5 text-neutral-400" strokeWidth={2} aria-hidden />
                  {page.model}
                </span>
                <div className="flex -space-x-2">
                  {ORG_AGENT_PAGES.slice(0, 4).map((p) => (
                    <span key={p.id} className="inline-flex overflow-visible">
                      <AgentAv handle={p.handle} size={26} />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="rounded-xl bg-[#f4f4f5] px-3.5 py-2.5">
              <p className="text-[11px] font-medium text-neutral-500">{page.askWho}</p>
              <p className="mt-0.5 text-[13px] leading-snug text-neutral-800">{page.ask}</p>
            </div>

            <div className="space-y-1.5 pl-0.5 text-[12px] text-neutral-600">
              {page.steps.map((step, i) => {
                const on = phase >= i + 1;
                const spinning = focused && phase === i + 1 && phase < 4;
                return (
                  <p
                    key={step}
                    className={`flex items-center gap-2 transition-opacity ${
                      on ? 'opacity-100' : 'opacity-35'
                    }`}
                  >
                    {spinning ? (
                      <Loader2
                        className="size-3 shrink-0 animate-spin text-neutral-400"
                        strokeWidth={2.25}
                      />
                    ) : (
                      <span
                        className={`size-1.5 shrink-0 rounded-full ${
                          on ? 'bg-ok' : 'bg-neutral-300'
                        }`}
                      />
                    )}
                    {step}
                  </p>
                );
              })}
            </div>

            <div className="rounded-xl border border-black/[0.06] bg-white">
              <div className="border-b border-black/[0.06] px-3 py-2">
                <p className="text-[12px] font-semibold text-neutral-800">{page.resultTitle}</p>
              </div>
              {/* Right-edge mask fade — same trick as Gumloop table scroller */}
              <div
                className="overflow-x-auto pb-10 pr-1"
                style={{
                  maskImage:
                    'linear-gradient(to right, #000 0%, #000 calc(100% - 14px), transparent 100%)',
                  WebkitMaskImage:
                    'linear-gradient(to right, #000 0%, #000 calc(100% - 14px), transparent 100%)',
                }}
              >
                <table className="w-full min-w-[36rem] text-left text-[11px]">
                  <thead>
                    <tr className="border-b border-black/[0.05] text-[10px] font-medium text-neutral-400">
                      {visibleCols.map((c) => (
                        <th key={c} className="whitespace-nowrap px-3 py-2 font-medium">
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-neutral-700">
                    {page.rows.map((row, ri) => (
                      <tr key={ri} className="border-b border-black/[0.04] last:border-0">
                        {visibleCols.map((_, ci) => (
                          <td key={ci} className="whitespace-nowrap px-3 py-2">
                            {row[ci] || '—'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade into white — Gumloop: h-8 gradient to white */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-10 bg-gradient-to-b from-transparent to-white"
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
 * 2. Action — chat asks to ship og-image → live tool timeline
 * ═══════════════════════════════════════════════════════════════ */
function ActionVisual({ focused }: { focused: boolean }) {
  const phase = useSimPhase(focused, ACTION_DELAYS);
  const rows = [
    { tool: 'browser.open', detail: 'wonder.so', icon: Globe2 },
    { tool: 'read_file', detail: 'index.html', icon: FileCode2 },
    { tool: 'apply_patch', detail: 'meta · og:image', icon: PenLine },
    { tool: 'deploy', detail: 'vercel · prod', icon: Rocket },
  ];
  const doneCount = phase >= rows.length ? rows.length : Math.max(0, phase - 1);
  const allDone = phase >= rows.length;

  return (
    <MockShell className="flex flex-col">
      <div className="flex items-start justify-between gap-3 border-b border-black/[0.06] px-4 py-3.5 sm:px-5">
        <div className="min-w-0">
          <p className="truncate text-[14px] font-semibold tracking-tight text-ink">
            Ship og-image fix to prod
          </p>
          <p className="mt-1 text-[11px] text-neutral-500">
            From chat · <span className="text-neutral-700">Aria</span>
            <span className="mx-1.5 text-neutral-300">·</span>
            <span className="font-mono text-neutral-500">#product-launch</span>
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide ${
            allDone ? 'ow-badge-in bg-ok-50 text-ok-700 ring-1 ring-ok-200' : 'bg-neutral-100 text-neutral-600 ring-1 ring-black/[0.06]'
          }`}
        >
          {allDone ? 'Done' : 'Running'}
        </span>
      </div>

      <ul className="flex-1 px-3 py-4 sm:px-4">
        {rows.map((r, i) => {
          const done = allDone || phase > i + 1;
          const running = !allDone && phase === i + 1;
          const pending = phase < i + 1;
          const Icon = r.icon;
          return (
            <li
              key={r.tool}
              className={`ow-row-in relative flex items-stretch gap-3 px-2 py-1 ${
                pending ? 'opacity-35' : ''
              }`}
              style={{ animationDelay: focused ? `${i * 70}ms` : '0ms' }}
            >
              {/* Timeline rail */}
              <div className="relative flex w-7 shrink-0 flex-col items-center">
                <span
                  className={`relative z-[1] mt-0.5 flex size-7 items-center justify-center rounded-lg border bg-white transition-colors duration-300 ${
                    done
                      ? 'border-ok-200 text-ok-700'
                      : running
                        ? 'ow-pulse-ring border-ok-200 text-ok-700'
                        : 'border-black/[0.08] text-neutral-400'
                  }`}
                >
                  {done ? (
                    <CircleCheck className="ow-check-pop size-4" strokeWidth={2.25} />
                  ) : running ? (
                    <Loader2 className="size-3.5 animate-spin" strokeWidth={2.5} />
                  ) : (
                    <Icon className="size-3.5" strokeWidth={2} />
                  )}
                </span>
                {i < rows.length - 1 ? (
                  <span
                    aria-hidden
                    className={`mt-1 w-px flex-1 min-h-[18px] transition-colors duration-500 ${
                      done ? 'bg-ok-200' : 'bg-neutral-200'
                    }`}
                  />
                ) : null}
              </div>

              <div
                className={`min-w-0 flex-1 rounded-xl px-3 py-2 transition-colors duration-300 ${
                  running ? 'bg-ok-50/90' : 'bg-transparent'
                }`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-mono text-[12.5px] font-medium tracking-tight text-ink">
                    {r.tool}
                  </p>
                  {done ? (
                    <span className="ow-badge-in text-[10px] font-semibold uppercase tracking-wider text-ok-700">
                      ok
                    </span>
                  ) : running ? (
                    <span className="text-[10px] font-medium uppercase tracking-wider text-ok-700/80">
                      live
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-300">
                      wait
                    </span>
                  )}
                </div>
                <p className="mt-0.5 truncate text-[11px] text-neutral-500">{r.detail}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center justify-between border-t border-black/[0.06] px-4 py-2.5 text-[11px] sm:px-5">
        <span className="text-neutral-500">
          <span className="font-semibold tabular-nums text-ink">{doneCount}</span>
          <span className="text-neutral-400"> / {rows.length} tools</span>
        </span>
        <span className="inline-flex items-center gap-1.5 font-medium text-neutral-600">
          <FileCode2 className="size-3.5 text-ok-600" strokeWidth={2} />
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
  const [tab, setTab] = useState<'memory' | 'graph'>('memory');
  // Once the user picks a tab, stop the sim from yanking them around.
  const [userLocked, setUserLocked] = useState(false);
  // 0 idle, 1 typing query, 2 hits filtered, 3 graph lit, 4 injected
  const queryFull = 'refunds last month';
  const [typedLen, setTypedLen] = useState(queryFull.length);

  useEffect(() => {
    if (!focused) {
      setTypedLen(queryFull.length);
      setUserLocked(false);
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
    setTypedLen(0);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTypedLen(i);
      if (i >= queryFull.length) window.clearInterval(id);
    }, 45);
    return () => window.clearInterval(id);
  }, [focused, phase, queryFull.length]);

  // Auto-follow the sim unless the user has taken the tabs.
  useEffect(() => {
    if (userLocked) return;
    if (phase >= 3) setTab('graph');
    else if (phase < 3) setTab('memory');
  }, [phase, userLocked]);

  const pickTab = (id: 'memory' | 'graph') => {
    setUserLocked(true);
    setTab(id);
  };

  const query = queryFull.slice(0, typedLen);
  const showHits = phase >= 2;
  const graphLit = phase >= 3 || tab === 'graph';
  const injected = phase >= 4;
  const listRows = showHits ? MEMORY_ROWS.filter((m) => m.hit) : MEMORY_ROWS.slice(0, 3);
  const showGraph = tab === 'graph';

  return (
    <MockShell className="flex flex-col">
      <div className="flex gap-1 border-b border-black/[0.06] px-2 py-2 sm:px-3">
        {(
          [
            { id: 'memory' as const, label: 'Adaptive Memory' },
            { id: 'graph' as const, label: 'Knowledge Graph' },
          ] as const
        ).map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => pickTab(t.id)}
              className={`rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-colors ${
                active
                  ? 'bg-white text-ink shadow-[0_1px_2px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.08]'
                  : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-3 py-3 sm:px-4">
        <div className="relative mb-3 shrink-0">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-neutral-400" />
          <div className="flex h-9 items-center rounded-xl border border-black/[0.08] bg-[#fafafa] pl-9 pr-3 text-[12px]">
            <span className={query ? 'text-neutral-800' : 'text-neutral-400'}>
              {query || 'Search memories…'}
            </span>
            {phase === 1 ? (
              <span className="ml-0.5 inline-block h-3.5 w-px animate-pulse bg-neutral-800" />
            ) : null}
          </div>
        </div>

        {!showGraph ? (
          <div className="overflow-hidden rounded-xl border border-black/[0.06]">
            {listRows.map((m, i) => {
              const isHit = showHits && m.hit;
              return (
                <div
                  key={m.title}
                  className={`flex items-start gap-2.5 px-3 py-2.5 transition-colors ${
                    i ? 'border-t border-black/[0.04]' : ''
                  } ${isHit ? 'ow-hit-flash bg-ok-50/70' : 'bg-white'}`}
                >
                  <Brain
                    className={`mt-0.5 size-3.5 shrink-0 ${
                      isHit ? 'text-ok-700' : 'text-neutral-400'
                    }`}
                    strokeWidth={2}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-[12px] font-medium text-ink">{m.title}</p>
                      {isHit ? (
                        <span className="ow-badge-in shrink-0 rounded bg-ok-700 px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide text-white">
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
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-black/[0.06] bg-[#fafafa]">
            <svg
              className="mx-auto h-full min-h-[180px] w-full max-w-md flex-1"
              viewBox="0 0 320 200"
              fill="none"
              aria-hidden
            >
              {/* Base edges */}
              <g stroke="#e5e5e5" strokeWidth="1.25" strokeLinecap="round">
                <line x1="160" y1="100" x2="64" y2="48" />
                <line x1="160" y1="100" x2="72" y2="156" />
                <line x1="160" y1="100" x2="256" y2="44" />
                <line x1="64" y1="48" x2="248" y2="152" />
                <line x1="72" y1="156" x2="248" y2="152" />
              </g>
              {/* Hit edges — draw on once lit */}
              <g
                stroke="#16a34a"
                strokeWidth="1.75"
                strokeLinecap="round"
                className={graphLit ? 'ow-graph-edge-on' : 'ow-graph-edge-off'}
              >
                <line x1="64" y1="48" x2="248" y2="152" />
                <line x1="72" y1="156" x2="248" y2="152" />
                <line x1="64" y1="48" x2="72" y2="156" />
                <line x1="160" y1="100" x2="64" y2="48" />
                <line x1="160" y1="100" x2="72" y2="156" />
              </g>
              {GRAPH_NODES.map((n) => {
                const lit = graphLit && n.hit;
                const cx = (n.x / 100) * 320;
                const cy = (n.y / 100) * 200;
                const fill =
                  n.kind === 'context' && lit
                    ? '#171717'
                    : n.kind === 'memory' && lit
                      ? '#f0fdf4'
                      : '#ffffff';
                const stroke =
                  n.kind === 'memory' && lit
                    ? '#16a34a'
                    : n.kind === 'context' && lit
                      ? '#171717'
                      : '#e5e5e5';
                const text =
                  n.kind === 'context' && lit ? '#ffffff' : lit ? '#166534' : '#525252';
                return (
                  <g key={n.id} className={lit ? 'ow-graph-node-on' : undefined}>
                    <rect
                      x={cx - 36}
                      y={cy - 12}
                      width="72"
                      height="24"
                      rx="6"
                      fill={fill}
                      stroke={stroke}
                      strokeWidth="1.25"
                    />
                    <text
                      x={cx}
                      y={cy + 4}
                      textAnchor="middle"
                      fill={text}
                      style={{ fontSize: '10px', fontWeight: 600 }}
                    >
                      {n.label}
                    </text>
                  </g>
                );
              })}
            </svg>
            <div className="flex flex-wrap gap-x-3 gap-y-1 border-t border-black/[0.05] px-3 py-2">
              <span className="inline-flex items-center gap-1 text-[9px] font-medium uppercase tracking-[0.08em] text-neutral-500">
                <span className="size-2 rounded-sm bg-white ring-1 ring-black/15" />
                Entities
              </span>
              <span className="inline-flex items-center gap-1 text-[9px] font-medium uppercase tracking-[0.08em] text-neutral-500">
                <span className="size-2 rounded-sm bg-ok-200 ring-1 ring-ok-300" />
                Memories
              </span>
              <span className="inline-flex items-center gap-1 text-[9px] font-medium uppercase tracking-[0.08em] text-neutral-500">
                <span className="size-2 rounded-sm bg-ink ring-1 ring-ink" />
                Context
              </span>
            </div>
          </div>
        )}
      </div>

      <div
        className={`flex items-center justify-between gap-2 border-t px-4 py-2.5 text-[11px] sm:px-5 ${
          injected
            ? 'border-ok-200 bg-ok-50/80 text-ok-800'
            : 'border-black/[0.06] text-neutral-500'
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
 * 4. Workflows — custom SOP timeline (no brittle Mermaid graph)
 * ═══════════════════════════════════════════════════════════════ */
const WORKFLOW_STEPS = [
  { id: 'n1', label: 'Refund requested', kind: 'start' as const },
  { id: 'n2', label: 'Amount over $200?', kind: 'gate' as const },
  { id: 'n3', label: 'Collect evidence', kind: 'step' as const },
  { id: 'n4', label: 'Apply refund SOP', kind: 'step' as const },
  { id: 'n5', label: 'Human review gate', kind: 'gate' as const },
  { id: 'n6', label: 'Issue refund', kind: 'end' as const },
] as const;

function WorkflowVisual({ focused }: { focused: boolean }) {
  const phase = useSimPhase(focused, WORKFLOW_DELAYS);
  const doneCount = Math.min(phase, WORKFLOW_STEPS.length);
  const allDone = doneCount >= WORKFLOW_STEPS.length;
  const running =
    doneCount > 0 && doneCount < WORKFLOW_STEPS.length ? doneCount - 1 : -1;

  return (
    <MockShell className="flex flex-col">
      <div className="flex shrink-0 items-center gap-2 border-b border-black/[0.06] px-4 py-3 sm:px-5">
        <GitBranch size={13} className="text-neutral-400" strokeWidth={2} />
        <span className="text-[13px] font-semibold tracking-tight text-ink">
          Refund playbook
        </span>
        <span
          className={`ml-auto inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold tabular-nums ${
            allDone
              ? 'bg-ok-50 text-ok-800 ring-1 ring-ok-200'
              : running >= 0
                ? 'bg-neutral-100 text-neutral-600 ring-1 ring-black/[0.06]'
                : 'text-neutral-400'
          }`}
        >
          {allDone ? (
            <Check className="size-2.5" strokeWidth={2.5} />
          ) : running >= 0 ? (
            <Loader2 className="size-2.5 animate-spin" strokeWidth={2.5} />
          ) : null}
          {doneCount}/{WORKFLOW_STEPS.length} steps
        </span>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden px-4 py-4 sm:px-5">
        <div className="relative mx-auto max-w-sm space-y-0">
          {WORKFLOW_STEPS.map((step, i) => {
            const isDone = i < doneCount && !(i === running);
            const isRunning = i === running;
            const isIdle = i >= doneCount;
            return (
              <div key={step.id} className="relative flex gap-3 pb-3 last:pb-0">
                {i < WORKFLOW_STEPS.length - 1 ? (
                  <span
                    aria-hidden
                    className={`absolute left-[11px] top-7 h-[calc(100%-12px)] w-px ${
                      isDone || isRunning ? 'bg-ok-300' : 'bg-neutral-200'
                    }`}
                  />
                ) : null}
                <span
                  className={`relative z-[1] mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full ring-1 transition-colors ${
                    isDone
                      ? 'bg-ok-600 text-white ring-ok-600'
                      : isRunning
                        ? 'bg-white text-ok-700 ring-ok-400 ow-pulse-ring'
                        : 'bg-white text-neutral-300 ring-neutral-200'
                  }`}
                >
                  {isDone ? (
                    <Check className="size-3" strokeWidth={2.5} />
                  ) : isRunning ? (
                    <Loader2 className="size-3 animate-spin" strokeWidth={2.5} />
                  ) : (
                    <span className="size-1.5 rounded-full bg-current" />
                  )}
                </span>
                <div
                  className={`min-w-0 flex-1 rounded-xl px-3 py-2 ring-1 transition-colors ${
                    isDone
                      ? 'bg-ok-50/60 ring-ok-200'
                      : isRunning
                        ? 'bg-white ring-black/[0.08] shadow-sm'
                        : 'bg-white/60 ring-black/[0.04] opacity-50'
                  }`}
                >
                  <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-neutral-400">
                    {step.kind === 'gate' ? 'Decision' : step.kind === 'start' || step.kind === 'end' ? 'Event' : 'Action'}
                  </p>
                  <p className="mt-0.5 text-[13px] font-medium tracking-tight text-ink">
                    {step.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className={`flex items-center justify-between gap-2 border-t px-4 py-2.5 text-[11px] sm:px-5 ${
          allDone
            ? 'border-ok-200 bg-ok-50/80 text-ok-800'
            : 'border-black/[0.06] text-neutral-500'
        }`}
      >
        <span>
          {allDone
            ? 'Playbook complete — refund issued'
            : running >= 0
              ? 'Following the SOP…'
              : 'Waiting to start'}
        </span>
        {allDone ? (
          <span className="inline-flex items-center gap-1 font-semibold">
            <Check className="size-3" strokeWidth={2.5} />
            Done
          </span>
        ) : null}
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
      {/* Cool canvas stage — monochrome like Gumloop product frames, not olive wash */}
      <div
        className="absolute inset-0 overflow-hidden bg-[#f3f4f6]"
        style={{
          backgroundImage: `
            linear-gradient(180deg, #fafafa 0%, #f3f4f6 55%, #e8eaed 100%),
            radial-gradient(circle at 1px 1px, rgba(0,0,0,0.06) 1px, transparent 0)
          `,
          backgroundSize: 'auto, 16px 16px',
        }}
        aria-hidden
      />

      <div className="relative z-[1] flex min-h-0 flex-1 items-center justify-center overflow-visible p-3 sm:p-4 sm:pr-10">
        {/* Preview chrome — overflow visible so the agent tooltip can float out */}
        <div className="relative w-full max-w-[22rem] overflow-visible sm:max-w-[24rem]">
          <div className="overflow-hidden rounded-[14px] bg-white shadow-[0_20px_48px_-20px_rgba(0,0,0,0.28)] ring-1 ring-black/[0.08]">
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
                  stroke="#b87a28"
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
                        ? 'bg-ink text-white ring-ink shadow-[0_0_0_3px_rgba(23,23,23,0.18)]'
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

          {/* Agent tooltip — Clippy-style character + label */}
          <div
            className={`pointer-events-none absolute z-30 flex w-[12.5rem] items-start gap-1.5 transition-all duration-300 ease-out sm:w-[13.5rem] ${
              agentMarked
                ? 'translate-x-0 opacity-100'
                : 'translate-x-1 opacity-0'
            }`}
            style={{ left: '68%', top: '18%' }}
          >
            <span className="mt-1 shrink-0 drop-shadow-[0_8px_18px_rgba(0,0,0,0.18)]">
              <AgentAv handle="scout" size={40} live={agentMarked} animation="curious" />
            </span>
            <div className="relative min-w-0 flex-1">
              <span className="absolute -left-1.5 top-3 h-0 w-0 border-y-[6px] border-r-[7px] border-y-transparent border-r-[#b87a28]" />
              <div className="rounded-[8px] bg-[#b87a28] px-2.5 py-1.5 text-white shadow-[0_10px_28px_-10px_rgba(184,122,40,0.55)] ring-1 ring-black/10">
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
 * matrix fade. Full product screens render flush in the soft-crop panel.
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
  /** Cast handle for the Clippy-style reply character. */
  agentHandle?: 'rex' | 'nova' | 'scout' | 'pip' | 'wren';
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
    agentHandle: 'nova',
    window: 'Agents',
    title: 'AI organizations, not',
    highlight: 'single-purpose agents.',
    description:
      'Trooper lets you create AI organizations made up of multiple AI employees. Each organization works together on tasks, shares context, and coordinates execution — similar to how real teams operate.',
    Visual: OrgVisual,
    // Full-bleed agent browser (Sales / Support / Data / Meetings / Calls).
    screen: true,
  },
  {
    tag: 'Action, not answers',
    ask: 'trooper, ship the og-image fix to prod',
    reply: 'on it!',
    agentHandle: 'rex',
    window: 'Task run — wonder.so',
    title: 'AI that takes',
    highlight: 'action, not just questions.',
    description:
      'Instead of replying with suggestions, AI employees create issues, update files, send emails, take screenshots, post updates, and complete real tasks from start to finish.',
    Visual: ActionVisual,
    screen: true,
  },
  {
    tag: 'Infinite memory',
    ask: 'trooper, what did we decide on refunds last month?',
    reply: 'pulling it from memory',
    agentHandle: 'pip',
    window: 'Memory — Adaptive Memory',
    title: 'Persistent memory across',
    highlight: 'tasks, projects, and time.',
    description:
      'AI employees remember past work, decisions, preferences, and project context. Every task builds on previous knowledge, so work gets faster and more accurate over time.',
    Visual: MemoryVisual,
    screen: true,
  },
  {
    tag: 'Workflows',
    ask: 'trooper, run the refund playbook for Acme',
    reply: 'on it. following the SOP',
    agentHandle: 'wren',
    window: 'Workflow — Refund playbook',
    title: 'Workflows you define.',
    highlight: 'Reliable decisions, every time.',
    description:
      'Create SOPs as workflows agents follow end to end — triggers, checks, AI steps, and human gates. The same playbook every time, so work stays consistent and nothing happens off-script.',
    Visual: WorkflowVisual,
    screen: true,
  },
  {
    tag: 'Screen context',
    ask: "trooper, what's this muscle called?",
    reply: 'deltoid. it lifts your arm',
    agentHandle: 'scout',
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
    agentHandle: 'wren',
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
  ...WORK_SURFACES.map((surface, i) => {
    const Scene = WORK_SCENE[surface.id];
    const handles = ['scout', 'nova', 'pip'] as const;
    return {
      tag: surface.id,
      ask: surface.ask,
      reply: surface.reply,
      agentHandle: handles[i % handles.length],
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
    <div className="flex flex-col gap-16 sm:gap-20 lg:gap-28">
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
                ? 'opacity-[0.45] max-lg:opacity-[0.55] lg:opacity-[0.42]'
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
              <BubbleExchange
                ask={card.ask}
                reply={card.reply}
                focused={focused}
                agent={card.agentHandle ? getTrooper(card.agentHandle) ?? null : null}
              />

              <h3 className="mt-7 font-funneldisplay text-xl font-medium leading-[1.15] tracking-tight text-balance text-ink sm:text-2xl lg:text-[1.75rem] lg:leading-[1.15]">
                {card.title}{' '}
                {card.highlight ? <span className="text-ink-muted">{card.highlight}</span> : null}
              </h3>
              <p className="mt-3.5 max-w-md text-[15px] leading-relaxed text-ink-muted sm:mt-4 sm:text-base sm:leading-7">
                {card.description}
              </p>

              {card.meta ? (
                <p className="type-meta mt-3">{card.meta}</p>
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
              {/* Gumloop soft-crop: flush product panel, no traffic-light toy chrome */}
              <div
                className={`ow-product-panel ${
                  card.overflowVisible ? 'overflow-visible' : 'overflow-hidden'
                }`}
              >
                {card.screen ? (
                  <Visual focused={focused} />
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
