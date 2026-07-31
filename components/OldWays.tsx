'use client';

import { FileText, Check, Loader2, Sparkles, Braces, Database, Box, MessageSquare, ArrowRight } from "lucide-react";
import FeaturePeekStage from './ui/FeaturePeekStage';

/* ─── Trooper pixel character (replaces 🦀 in avatars) ─── */
const TrooperChar = ({ className = "" }: { className?: string }) => (
  <img
    src="/images/trooper-logomark.png"
    alt="Trooper"
    className={`w-full h-full object-contain bg-transparent pixel-render pixel-flicker-slow ${className}`}
  />
);

/* ─── Favicon helper ─── */
/* ─── Shared clean mockup primitives (design-system cards) ─── */
const MockCard = ({
  title,
  meta,
  children,
}: {
  title: React.ReactNode;
  meta?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="w-full overflow-hidden rounded-2xl border border-black/[0.06] bg-white/90 shadow-[0_28px_64px_-28px_rgba(28,25,23,0.35)] ring-1 ring-black/[0.04] backdrop-blur-xl">
    <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 sm:px-5">
      <span className="truncate text-[13px] font-semibold tracking-tight text-slate-900 sm:text-sm">{title}</span>
      {meta ? <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.12em] text-slate-500">{meta}</span> : null}
    </div>
    {children}
  </div>
);

const MockFoot = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-between gap-2 border-t border-slate-100 px-4 py-2.5 sm:px-5">{children}</div>
);

/* ─── Visual 1: AI Org — org chart with Trooper ─── */
const ORG_MANAGERS = [
  { name: 'Research Trooper', role: 'Head of Research', count: 24 },
  { name: 'Dev Trooper', role: 'Head of Engineering', count: 18 },
] as const;

function OrgNode({
  name,
  role,
  count,
  compact = false,
}: {
  name: string;
  role: string;
  count?: number;
  compact?: boolean;
}) {
  return (
    <div className="flex w-[148px] flex-col items-center">
      <div
        className={`relative z-10 -mb-2.5 flex items-center justify-center overflow-hidden rounded-full border-2 border-white bg-white shadow-sm ${
          compact ? 'h-10 w-10 p-1' : 'h-11 w-11 p-1'
        }`}
      >
        <TrooperChar />
      </div>
      <div className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-center shadow-sm">
        <p className={`font-semibold leading-tight text-slate-900 ${compact ? 'text-[11px]' : 'text-[12px]'}`}>
          {name}
        </p>
        <p className="mt-0.5 text-[10px] leading-snug text-slate-400">{role}</p>
      </div>
      {count != null ? (
        <div className="mt-1.5 flex items-center gap-1 rounded border border-slate-200 bg-white px-2 py-0.5 shadow-sm">
          <span className="text-[10px] font-semibold tabular-nums text-slate-700">{count}</span>
          <svg className="h-2.5 w-2.5 text-slate-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      ) : null}
    </div>
  );
}

const OrgVisual = () => (
  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-white px-6 py-4">
    <OrgNode name="Trooper Prime" role="CEO, Founder" />
    <span className="mt-1.5 rounded bg-slate-900 px-2.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-white">
      +44 reports
    </span>

    <svg className="my-1 h-5 w-[248px] shrink-0" viewBox="0 0 248 20" aria-hidden>
      <path d="M124 0 V7 M62 7 H186 M62 7 V20 M186 7 V20" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />
    </svg>

    <div className="flex items-start justify-center gap-10">
      {ORG_MANAGERS.map((mgr) => (
        <OrgNode key={mgr.name} name={mgr.name} role={mgr.role} count={mgr.count} compact />
      ))}
    </div>

    <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-400">2 leaders · 44 reports</p>
  </div>
);

/* ─── Visual 3: Action — live tool-run log ─── */
const ActionVisual = () => {
  const rows = [
    { t: '14:55', a: 'browser.open', d: 'wonder.so', running: false },
    { t: '14:56', a: 'read_file', d: 'index.html', running: false },
    { t: '14:57', a: 'apply_patch', d: 'meta · og:image', running: false },
    { t: '14:58', a: 'deploy', d: 'vercel · prod', running: true },
  ];
  return (
    <MockCard title="Task · SEO optimization" meta="#product-launch">
      <ul className="px-2 py-2 sm:px-3">
        {rows.map((r) => (
          <li
            key={r.t}
            className={`grid grid-cols-[40px_1fr_auto] items-center gap-3 rounded-xl px-3 py-2.5 font-mono text-[11px] ${r.running ? 'bg-trooper-50/70' : ''}`}
          >
            <span className="tabular-nums text-slate-400">{r.t}</span>
            <span className="truncate text-slate-700">
              {r.a} <span className="text-slate-400">{r.d}</span>
            </span>
            {r.running ? (
              <Loader2 className="size-3.5 animate-spin text-trooper" strokeWidth={2.5} />
            ) : (
              <Check className="size-3.5 text-trooper" strokeWidth={2.5} />
            )}
          </li>
        ))}
      </ul>
      <MockFoot>
        <span className="font-mono text-[10px] text-slate-500">3 / 6 subtasks</span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-trooper-700">
          <FileText className="size-3" strokeWidth={2} />
          index.html
        </span>
      </MockFoot>
    </MockCard>
  );
};

/* ─── Visual 4: Memory — system pipeline + knowledge graph ─── */
const MemoryStep = ({
  num,
  label,
  title,
  icon,
  tone,
}: {
  num: string;
  label: string;
  title: string;
  icon: React.ReactNode;
  tone: 'blue' | 'green' | 'violet';
}) => {
  const tones = {
    blue: 'border-blue-100 bg-blue-50/70',
    green: 'border-trooper-100 bg-trooper-50/70',
    violet: 'border-violet-100 bg-violet-50/70',
  } as const;
  const iconTones = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-trooper-100 text-trooper-700',
    violet: 'bg-violet-100 text-violet-600',
  } as const;
  return (
    <div className={`flex items-center gap-2.5 rounded-lg border px-2.5 py-2 ${tones[tone]}`}>
      <span className={`inline-flex size-7 shrink-0 items-center justify-center rounded-md ${iconTones[tone]}`}>
        {icon}
      </span>
      <div className="min-w-0">
        <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-slate-400">
          {num} / {label}
        </p>
        <p className="truncate text-[12px] font-semibold text-slate-800">{title}</p>
      </div>
    </div>
  );
};

const MemoryGraph = () => (
  <div className="relative h-[112px] w-full">
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 112" fill="none" aria-hidden>
      <g stroke="#cbd5e1" strokeWidth="1">
        <line x1="92" y1="56" x2="40" y2="34" />
        <line x1="92" y1="56" x2="36" y2="78" />
        <line x1="92" y1="56" x2="150" y2="30" />
        <line x1="92" y1="56" x2="158" y2="74" />
        <line x1="150" y1="30" x2="158" y2="74" />
      </g>
    </svg>
    {/* center entity */}
    <span className="absolute left-[40%] top-[42%] h-5 w-9 rounded bg-blue-200 ring-1 ring-blue-300" />
    {/* satellites */}
    <span className="absolute left-[10%] top-[24%] h-4 w-8 rounded bg-trooper-200 ring-1 ring-trooper-300" />
    <span className="absolute left-[9%] top-[64%] h-4 w-8 rounded bg-trooper-200 ring-1 ring-trooper-300" />
    <span className="absolute left-[70%] top-[20%] h-4 w-8 rounded bg-blue-200 ring-1 ring-blue-300" />
    <span className="absolute left-[74%] top-[60%] h-4 w-8 rounded bg-violet-200 ring-1 ring-violet-300" />
  </div>
);

const MemoryVisual = () => (
  <div className="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_24px_48px_-16px_rgba(28,25,23,0.18),0_8px_16px_-8px_rgba(28,25,23,0.08)]">
    {/* Conversation metadata */}
    <div className="border-b border-slate-100 px-3.5 py-3 sm:px-4">
      <div className="flex items-center gap-2">
        <span className="inline-flex size-6 items-center justify-center rounded-md bg-slate-100 text-slate-500">
          <Braces className="size-3.5" strokeWidth={2} />
        </span>
        <span className="text-[12px] font-semibold text-slate-800">Conversation metadata</span>
      </div>
      <div className="mt-2 font-mono text-[10px] leading-relaxed text-slate-500">
        <span className="text-slate-400">containerTag:</span> <span className="text-blue-600">organizationID</span>{' · '}
        <span className="text-slate-400">userId:</span> <span className="text-violet-600">&quot;xyz&quot;</span>
      </div>
    </div>

    {/* Pipeline + graph */}
    <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 px-3.5 py-3 sm:grid-cols-[1.5fr_1fr] sm:px-4">
      {/* Memory system */}
      <div className="flex flex-col gap-2 rounded-lg border border-slate-200/70 bg-slate-50/40 p-2.5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-slate-400">Memory system</span>
          <span className="inline-flex items-center gap-1 rounded-sm bg-white px-1.5 py-0.5 font-mono text-[8px] text-slate-400 ring-1 ring-slate-200">
            <MessageSquare className="size-2.5" strokeWidth={2} />
            prompt
          </span>
        </div>
        <MemoryStep num="01" label="Static context" title="Context prepared" tone="blue" icon={<Box className="size-3.5" strokeWidth={2} />} />
        <MemoryStep num="02" label="Dynamic context" title="Memories from graph" tone="green" icon={<Database className="size-3.5" strokeWidth={2} />} />
        <MemoryStep num="03" label="Final prompt" title="Prompt construction" tone="violet" icon={<Sparkles className="size-3.5" strokeWidth={2} />} />
      </div>

      {/* Memory graph */}
      <div className="flex flex-col rounded-lg border border-slate-200/70 bg-white p-2.5">
        <span className="mb-1 font-mono text-[8px] uppercase tracking-[0.16em] text-slate-400">Memory graph</span>
        <MemoryGraph />
        <div className="mt-1 flex flex-wrap gap-x-2.5 gap-y-1 border-t border-slate-100 pt-1.5">
          <span className="inline-flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.1em] text-slate-500">
            <span className="size-2 rounded-sm bg-blue-200 ring-1 ring-blue-300" />Entities
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.1em] text-slate-500">
            <span className="size-2 rounded-sm bg-trooper-200 ring-1 ring-trooper-300" />Memories
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.1em] text-slate-500">
            <span className="size-2 rounded-sm bg-violet-200 ring-1 ring-violet-300" />Contexts
          </span>
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="flex items-center justify-between gap-2 border-t border-slate-100 bg-trooper-50/50 px-3.5 py-2 sm:px-4">
      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-slate-500">
        <ArrowRight className="size-3 text-trooper-600" strokeWidth={2} />
        Relevant memories injected every turn
      </span>
      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-trooper-700">
        <Check className="size-3 text-trooper-600" strokeWidth={2.5} />
        Persists
      </span>
    </div>
  </div>
);

/* ─── Visual 7: Ticket System — single polished ticket with live trace ─── */
const TicketVisual = () => {
  const steps = [
    { fn: 'run_tests()', status: 'passed', running: false },
    { fn: 'deploy_to_staging()', status: 'passed', running: false },
    { fn: 'smoke_test()', status: 'passed', running: false },
    { fn: 'deploy_to_production()', status: 'running', running: true },
  ];

  return (
    <MockCard title="Ticket #1042 · Deploy pricing page" meta={`${steps.length} steps`}>
      <ul className="px-2 py-2 sm:px-3">
        {steps.map((t) => (
          <li
            key={t.fn}
            className={`grid grid-cols-[16px_1fr_auto] items-center gap-3 rounded-xl px-3 py-2.5 font-mono text-[11px] ${t.running ? 'bg-amber-50/70' : ''}`}
          >
            {t.running ? (
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-amber-500" />
              </span>
            ) : (
              <span className="inline-flex size-2 rounded-full bg-trooper" />
            )}
            <span className="truncate text-slate-700">{t.fn}</span>
            <span className={`text-[8px] uppercase tracking-[0.2em] ${t.running ? 'text-amber-600' : 'text-trooper-600'}`}>{t.status}</span>
          </li>
        ))}
      </ul>
      <MockFoot>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">Audit log</span>
        <span className="font-mono text-[10px] text-trooper-700">47 events · fully traced</span>
      </MockFoot>
    </MockCard>
  );
};


const PixelFramedVisual = ({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) => (
  <FeaturePeekStage framed={false} wide={wide}>{children}</FeaturePeekStage>
);
/* ─── Cards ─── */

/**
 * Four capabilities, not eleven.
 *
 * This was eleven full-width cards plus two satellite sections — ~740 words
 * and ~24 boxes, all rendered at once, each numbered [01]–[11] by a kicker
 * nested *inside* the section shell's own number. Two numbering systems on
 * screen at once is a large part of why the page was hard to read.
 *
 * What survives is the narrative: they work as a team, they act, they
 * remember, and you can audit all of it. Integrations moved to the
 * "works with everything" section, which has the real catalog behind it.
 */
const cards = [
  {
    tag: 'AI organizations',
    title: 'AI organizations, not',
    highlight: 'single-purpose agents.',
    description:
      'Trooper lets you create AI organizations made up of multiple AI employees. Each organization works together on tasks, shares context, and coordinates execution — similar to how real teams operate.',
    visual: <OrgVisual key="org" />,
  },
  {
    tag: 'Action, not answers',
    title: 'AI that takes',
    highlight: 'action, not just questions.',
    description:
      'Instead of replying with suggestions, AI employees create issues, update files, send emails, take screenshots, post updates, and complete real tasks from start to finish.',
    visual: <ActionVisual key="act" />,
  },
  {
    tag: 'Infinite memory',
    title: 'Persistent memory across',
    highlight: 'tasks, projects, and time.',
    description:
      'AI employees remember past work, decisions, preferences, and project context. Every task builds on previous knowledge, so work gets faster and more accurate over time.',
    visual: <MemoryVisual key="mem" />,
  },
  {
    tag: 'Ticket system',
    title: 'Every conversation traced.',
    highlight: 'Every decision explained.',
    description:
      'You communicate with agents through tickets. Every instruction, every response, every tool call and decision is recorded with full tracing. Nothing happens in the dark.',
    visual: <TicketVisual key="ticket" />,
  },
];

/* ─── Main ─── */

/**
 * The stacking-card deck this used to render never actually ran: every card
 * sits under an `overflow-x-hidden` ancestor, which creates a scroll container
 * and silently disables `position: sticky` on descendants. The rAF/transform
 * machinery driving it was dead code, so rather than revive a scroll-jacking
 * animation nobody has ever seen, the cards are plain.
 *
 * Padding and measure belong to the SectionShell wrapping this — the old
 * `px-4 sm:px-6 lg:px-8` applied a second gutter inside the shell's own, so
 * this copy sat narrower than every other section from `lg` up.
 */
export default function OldWays() {
  return (
    // See HowItWorksSteps for why the `gap-px` hairline table is gone.
    // Seven full-width 2-ups sharing edges inside one outer rectangle was the
    // longest such run on the page.
    <div className="grid grid-cols-1 gap-4">
      {cards.map((card) => (
        <article key={card.tag} className="min-w-0 overflow-hidden rounded-2xl bg-white shadow-xs ring-1 ring-black/5">
          <div className="grid min-w-0 lg:grid-cols-2 lg:items-stretch">
            <div className="flex flex-col justify-center px-5 py-8 sm:px-7 sm:py-10 md:px-9 md:py-12">
              <span className="kicker-sm">
                {card.tag}
              </span>
              <h3 className="mt-4 font-funneldisplay text-xl font-medium leading-snug tracking-tight text-balance text-ink sm:mt-5 sm:text-2xl lg:text-[1.75rem] lg:leading-[1.2]">
                {card.title}{' '}
                {card.highlight ? <span className="text-ink-muted">{card.highlight}</span> : null}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted sm:mt-4 sm:text-[15px] sm:leading-7">
                {card.description}
              </p>
            </div>

            <div className="relative min-w-0 min-h-[260px] border-t border-neutral-200 sm:min-h-[300px] lg:min-h-[340px] lg:border-l lg:border-t-0">
              <PixelFramedVisual>{card.visual}</PixelFramedVisual>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
