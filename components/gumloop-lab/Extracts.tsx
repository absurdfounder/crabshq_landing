'use client';

import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';
import { TROOPERS } from '@/lib/troopers';
import TrooperMark from '@/components/ui/TrooperMark';
import { TrooperMarkCarousel } from '@/components/ui/TrooperMarkCarousel';
import PixelButton from '@/components/ui/PixelButton';

/** Gumloop dual CTA — black primary + ring secondary. */
export function GlDualCta({
  primary = { href: 'https://app.trooper.so', label: 'Get started' },
  secondary = { href: '/download', label: 'Download apps' },
}: {
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <Link
        href={primary.href}
        className="inline-flex h-9 items-center rounded-lg bg-neutral-950 px-3.5 text-[14px] font-medium text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
      >
        {primary.label}
      </Link>
      <Link
        href={secondary.href}
        className="inline-flex h-9 items-center rounded-lg bg-white px-[18px] text-[14px] font-medium text-neutral-900 shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_1px_1px_-0.5px_rgba(0,0,0,0.016),0_3px_3px_-1.5px_rgba(0,0,0,0.016)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
      >
        {secondary.label}
      </Link>
    </div>
  );
}

/** Soft grey product well under a hero — Gumloop's calm demo stage. */
export function GlProductWell({
  children,
  className = '',
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-[20px] bg-[#f3f4f6] ${className}`}
      style={{ minHeight: 280 }}
    >
      {children ?? (
        <div className="flex h-full min-h-[280px] items-center justify-center text-[13px] text-neutral-400">
          Product stage
        </div>
      )}
    </div>
  );
}

/** Left-aligned hero with mark carousel + dual CTA + product well. */
export function GlHeroShell() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <TrooperMarkCarousel size={28} className="mb-5" />
      <h2 className="max-w-xl font-display text-[2.5rem] font-medium leading-[1.08] tracking-tight text-neutral-950 sm:text-5xl">
        Build, share, optimize &amp; control agents
      </h2>
      <div className="mt-7">
        <GlDualCta />
      </div>
      <div className="mt-12">
        <GlProductWell />
      </div>
    </div>
  );
}

/** Marks drifting around a headline — Gumloop hero decoration drift. */
export function GlMarkDriftField() {
  const poses = [
    { x: '8%', y: '12%', driftX: '14px', driftY: '-10px', r: '5deg', delay: '0s' },
    { x: '78%', y: '8%', driftX: '-12px', driftY: '14px', r: '-4deg', delay: '0.8s' },
    { x: '12%', y: '68%', driftX: '10px', driftY: '12px', r: '3deg', delay: '1.4s' },
    { x: '82%', y: '62%', driftX: '-16px', driftY: '-8px', r: '6deg', delay: '2s' },
    { x: '48%', y: '78%', driftX: '8px', driftY: '-14px', r: '-3deg', delay: '0.4s' },
  ];

  return (
    <div className="relative mx-auto h-64 max-w-3xl overflow-hidden rounded-[20px] bg-white ring-1 ring-black/5">
      {TROOPERS.map((t, i) => {
        const p = poses[i];
        return (
          <div
            key={t.handle}
            className="gl-mark-drift absolute"
            style={{
              left: p.x,
              top: p.y,
              animationDelay: p.delay,
              ['--gl-drift-x' as string]: p.driftX,
              ['--gl-drift-y' as string]: p.driftY,
              ['--gl-drift-r' as string]: p.r,
            }}
          >
            <TrooperMark trooper={t} size={36} />
          </div>
        );
      })}
      <p className="absolute inset-0 flex items-center justify-center font-display text-2xl tracking-tight text-neutral-900">
        Your agents, in motion
      </p>
    </div>
  );
}

/** Cursor that hops + click-squashes over a row of marks. */
export function GlCursorDecoration() {
  return (
    <div className="relative mx-auto flex h-28 max-w-md items-center justify-center gap-3 rounded-[20px] bg-white px-8 ring-1 ring-black/5">
      {TROOPERS.slice(0, 4).map((t) => (
        <div key={t.handle} className="gl-mark-float">
          <TrooperMark trooper={t} size={32} />
        </div>
      ))}
      <div
        className="gl-cursor-hop pointer-events-none absolute left-1/2 top-1/2"
        style={{ ['--gl-cursor-dir' as string]: '1' }}
        aria-hidden
      >
        <div className="gl-cursor-click origin-top-left">
          <svg width="18" height="18" viewBox="0 0 24 24" className="drop-shadow-sm">
            <path
              d="M4.2 3.4 Q4 2.6 4.8 2.9 L20.3 9.8 Q21.1 10.2 20.2 10.7 L13.6 12.6 L11.1 19 Q10.7 19.9 10.3 19.1 Z"
              fill="#1a1a1a"
              stroke="#fff"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

/** Orbiting satellite marks around a center trooper. */
export function GlOrbitRing() {
  const sats = TROOPERS.slice(1);
  return (
    <div className="relative mx-auto size-64">
      <div className="gl-orbit-appear absolute inset-0 flex items-center justify-center">
        <TrooperMark trooper={TROOPERS[0]} size={48} />
      </div>
      <div className="gl-orbit-spin absolute inset-4 rounded-full border border-dashed border-neutral-200">
        {sats.map((t, i) => {
          const angle = (i / sats.length) * Math.PI * 2 - Math.PI / 2;
          const r = 96;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          return (
            <div
              key={t.handle}
              className="gl-orbit-counter absolute left-1/2 top-1/2"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
            >
              <TrooperMark trooper={t} size={28} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Feature list with a traversing cursor — “experts build agents”. */
export function GlExpertsSplit() {
  const items = [
    { title: 'App triggers', body: 'Kick a loop from Slack, mail, or a webhook.' },
    { title: 'Recurring tasks', body: 'Morning briefs and Friday ship checks on a clock.' },
    { title: '300+ connectors', body: 'Reach the stack your team already lives in.' },
  ];

  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:items-center">
      <div>
        <h3 className="font-display text-3xl tracking-tight text-neutral-950 sm:text-4xl">
          Let your experts
          <br />
          build the agents
        </h3>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-neutral-500">
          Understanding a task is the only prerequisite. The people who already know the work
          write the loop — no learning curve.
        </p>
        <div className="mt-6">
          <GlDualCta
            primary={{ href: '/loops', label: 'Explore loops' }}
            secondary={{ href: '/self-host', label: 'Read docs' }}
          />
        </div>
      </div>
      <div className="relative rounded-2xl bg-white p-5 ring-1 ring-black/5">
        <ul className="space-y-[20px]">
          {items.map((item) => (
            <li key={item.title} className="pl-8">
              <p className="text-[15px] font-medium text-neutral-900">{item.title}</p>
              <p className="mt-0.5 text-[13px] text-neutral-500">{item.body}</p>
            </li>
          ))}
        </ul>
        <div
          className="gl-skills-traverse pointer-events-none absolute left-4 top-6"
          aria-hidden
        >
          <svg width="14" height="14" viewBox="0 0 24 24">
            <path
              d="M4.2 3.4 Q4 2.6 4.8 2.9 L20.3 9.8 Q21.1 10.2 20.2 10.7 L13.6 12.6 L11.1 19 Q10.7 19.9 10.3 19.1 Z"
              fill="#3f6b00"
              stroke="#fff"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function GlOptimizeCards() {
  const cards = [
    {
      title: 'Open-source by default',
      body: 'Run on models you choose. No lock-in, full control over where agents run.',
    },
    {
      title: 'Self-improving agents',
      body: 'Loops reflect on their own runs and tighten without a rebuild.',
    },
    {
      title: 'Evals built in',
      body: 'Measure quality, catch regressions, ship improvements with confidence.',
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <h3 className="font-display text-3xl tracking-tight text-neutral-950">Optimize your agents</h3>
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {cards.map((c) => (
          <div key={c.title} className="space-y-2">
            <h4 className="text-[15px] font-medium text-neutral-900">{c.title}</h4>
            <p className="text-[14px] leading-relaxed text-neutral-500">{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function GlEnterpriseDark() {
  const tiles = [
    { title: 'Usage monitoring', body: 'Budgets and quotas before spend surprises you.' },
    { title: 'Audit logging', body: 'Every action traced — who, what, when.' },
    { title: 'Self-host / VPC', body: 'Keep data on machines you already own.' },
  ];

  return (
    <div className="bg-[#14170f] px-5 py-16 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        <h3 className="font-display text-3xl tracking-tight sm:text-4xl">Enterprise-grade controls</h3>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {tiles.map((t) => (
            <div key={t.title} className="rounded-xl bg-white/[0.04] p-5 ring-1 ring-white/10">
              <h4 className="text-[15px] font-medium">{t.title}</h4>
              <p className="mt-2 text-[14px] leading-relaxed text-white/55">{t.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function GlTrustStrip() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-400">
        In agents, they trust
      </p>
      <p className="mt-6 max-w-2xl font-display text-3xl leading-snug tracking-tight text-neutral-900 sm:text-4xl">
        “Troopers cut prep from forty-five minutes to under five — and the deals got larger.”
      </p>
      <p className="mt-8 text-[2.5rem] font-medium tracking-tight text-neutral-950">$1.5M+</p>
      <p className="text-[14px] text-neutral-500">Additional ARR attributed in 3 months</p>
    </div>
  );
}

export function GlShippedLog() {
  const items = [
    { title: 'Subagents run in the background', date: 'Sep 2, 2026' },
    { title: 'Smarter inbox drafts', date: 'Sep 2, 2026' },
    { title: 'Webhook triggers for loops', date: 'Aug 27, 2026' },
    { title: 'Custom domains for artifacts', date: 'Aug 25, 2026' },
  ];

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <h3 className="font-display text-3xl tracking-tight text-neutral-950">Recently shipped</h3>
      <ul className="mt-8 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
        {items.map((item) => (
          <li key={item.title} className="flex items-baseline justify-between gap-4 py-4">
            <span className="text-[15px] font-medium text-neutral-900">{item.title}</span>
            <span className="shrink-0 font-mono text-[11px] text-neutral-400">{item.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Preferred final CTA — centered “Build your team of agents” (sitewide newsletter). */
export function GlFinalCta() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <div className="rounded-2xl border border-slate-200/80 bg-[#f6f7f8] px-6 py-14 text-center sm:px-10 sm:py-16">
        <TrooperMarkCarousel size={28} className="mx-auto mb-6 justify-center" />
        <h3 className="font-funneldisplay text-3xl leading-tight tracking-tight text-slate-950 sm:text-4xl">
          Build your team of agents
        </h3>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-slate-500 sm:text-base">
          Create AI agents that understand your business, work across your tools, and take work from
          idea to outcome.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href="https://app.trooper.so?ref=lab-cta"
            className="inline-flex h-11 items-center rounded-lg bg-neutral-950 px-5 text-[14px] font-medium text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Explore agents
          </Link>
        </div>
      </div>
    </div>
  );
}

/** Old Trooper horizontal band — kept for side-by-side comparison. */
export function GlGumloopCenteredCta() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <div className="border border-slate-200 bg-canvas px-6 py-10 sm:px-10 sm:py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-xl">
            <h3 className="font-funneldisplay text-2xl leading-tight tracking-tight text-slate-900 sm:text-3xl md:text-[2rem]">
              Try Trooper now.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Stand up AI units that write code, manage tasks, and connect to 3,000+ tools — without
              the overhead of hiring.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:gap-4">
            <PixelButton
              href="https://app.trooper.so?ref=lab-cta"
              external
              size="lg"
              tone="brand"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Get Started
            </PixelButton>
            <PixelButton
              href="https://github.com/Trooper-AI/trooper-core/releases/download/macos-latest/Trooper.dmg"
              external
              size="lg"
              variant="outline"
              tone="dark"
              icon={<Download className="h-4 w-4" />}
            >
              Download Mac App
            </PixelButton>
          </div>
        </div>
      </div>
    </div>
  );
}
