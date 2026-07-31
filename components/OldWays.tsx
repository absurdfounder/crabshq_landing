'use client';

import { useEffect, useRef, useState } from 'react';
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
    ask: 'trooper, I need a growth team on this launch',
    reply: 'on it — spinning up 3 troopers',
    window: 'Trooper HQ — org chart',
    title: 'AI organizations, not',
    highlight: 'single-purpose agents.',
    description:
      'Trooper lets you create AI organizations made up of multiple AI employees. Each organization works together on tasks, shares context, and coordinates execution — similar to how real teams operate.',
    visual: <OrgVisual key="org" />,
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
    visual: <ActionVisual key="act" />,
  },
  {
    tag: 'Infinite memory',
    ask: 'trooper, what did we decide on refunds last month?',
    reply: 'pulling it from memory',
    window: 'Memory graph',
    title: 'Persistent memory across',
    highlight: 'tasks, projects, and time.',
    description:
      'AI employees remember past work, decisions, preferences, and project context. Every task builds on previous knowledge, so work gets faster and more accurate over time.',
    visual: <MemoryVisual key="mem" />,
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
    visual: <TicketVisual key="ticket" />,
  },
];

/* ─── Main ─── */

/**
 * Capability rows in the reference site's "feat" idiom: each capability opens
 * with a spoken ask (waveform + chat bubble), the agent picks it up, and the
 * work happens in a mac window beside the copy — sides alternate per row.
 *
 * Focus-on-scroll: the row whose centre is nearest the viewport centre is in
 * focus; the others dim, blur slightly and step back, so the reader always
 * knows which capability the page is talking about. Driven by one passive
 * rAF-throttled scroll listener updating a single index — no per-row
 * observers, no layout thrash (getBoundingClientRect only inside the rAF).
 * Under prefers-reduced-motion nothing dims and nothing moves.
 */
export default function OldWays() {
  const rowRefs = useRef<Array<HTMLElement | null>>([]);
  // -1: nothing measured yet (no row dimmed); -2: reduced motion, dimming off.
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActive(-2);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight / 2;
      let best = -1;
      let bestD = Infinity;
      rowRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="flex flex-col gap-12 sm:gap-16 lg:gap-24">
      {cards.map((card, i) => {
        const visualFirst = i % 2 === 1;
        const dimmed = active >= 0 && i !== active;
        return (
          <article
            key={card.tag}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            className={[
              'grid min-w-0 items-center gap-6 transition-[opacity,filter,transform] duration-500 ease-out lg:grid-cols-2 lg:gap-12',
              dimmed ? 'scale-[0.985] opacity-40 blur-[1.5px]' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <div
              className={`flex min-w-0 flex-col lg:max-w-md lg:justify-self-center ${
                visualFirst ? 'lg:order-2' : ''
              }`}
            >
              {/* The ask: a spoken request, then the agent picking it up. */}
              <span className="flex h-6 items-end gap-[3px] text-neutral-300" aria-hidden>
                {[10, 16, 8, 20, 12, 22, 9, 15, 18, 8, 13, 6].map((h, j) => (
                  <i key={j} className="w-[3px] rounded-full bg-current" style={{ height: h }} />
                ))}
              </span>
              <div className="mt-3 flex flex-col items-start gap-2.5">
                <p className="rounded-2xl rounded-bl-md bg-gradient-to-b from-[#dbe9ff] to-[#aecdff] px-4 py-2.5 text-[15px] font-medium leading-snug text-[#1c2f66] shadow-xs ring-1 ring-black/5">
                  {card.ask}
                </p>
                <p className="ml-8 rounded-2xl rounded-tl-md bg-gradient-to-b from-trooper-50 to-trooper-100 px-3.5 py-2 text-sm font-medium text-trooper-800 shadow-xs ring-1 ring-black/5">
                  {card.reply}
                </p>
              </div>

              <h3 className="mt-6 font-funneldisplay text-xl font-medium leading-snug tracking-tight text-balance text-ink sm:text-2xl lg:text-[1.75rem] lg:leading-[1.2]">
                {card.title}{' '}
                {card.highlight ? <span className="text-ink-muted">{card.highlight}</span> : null}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted sm:mt-4 sm:text-[15px] sm:leading-7">
                {card.description}
              </p>
            </div>

            {/* The agent doing the work, in its own window. */}
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
                <PixelFramedVisual>{card.visual}</PixelFramedVisual>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
