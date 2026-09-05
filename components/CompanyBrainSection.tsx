'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

import { TROOPERS } from '@/lib/troopers';
import TrooperMark from '@/components/ui/TrooperMark';
import KnowledgeOrb from '@/components/gumloop-lab/KnowledgeOrb';
import { DemoFavicon } from '@trooper/demo';

/**
 * Gumloop “Complete context on your company” — bento + interactive orb,
 * skills stack with brand cursors, curved live-activity feed.
 */

const ACTIVITY = [
  {
    action: 'Drafted tailored proposal',
    agent: 'Proposal Builder',
    who: 'Katherine Duh',
    when: '2m',
    domain: 'drive.google.com',
    model: 'Claude Sonnet 4.6',
    mark: TROOPERS[0],
  },
  {
    action: 'Reviewed deal against criteria',
    agent: 'Deal Reviewer',
    who: 'Rahul Behal',
    when: '9m',
    domain: 'salesforce.com',
    model: 'GLM-5.2',
    mark: TROOPERS[1],
  },
  {
    action: 'Rolled up pipeline forecast',
    agent: 'Forecast Roll-up',
    who: 'Gonzalo Soto',
    when: '24m',
    domain: 'sheets.google.com',
    model: 'Gemini 3.1 Pro',
    mark: TROOPERS[2],
  },
  {
    action: 'Personalized outbound sequence',
    agent: 'Outbound Prospector',
    who: 'Marcelo Chaman',
    when: '1h',
    domain: 'gmail.com',
    model: 'Claude Haiku 4.5',
    mark: TROOPERS[3],
  },
  {
    action: 'Booked qualified meeting',
    agent: 'Meeting Scheduler',
    who: 'Wasay Ahmed',
    when: '2h',
    domain: 'calendar.google.com',
    model: 'Gemini 3 Flash',
    mark: TROOPERS[4],
  },
  {
    action: 'Logged notes and follow-ups',
    agent: 'Post-call Actioner',
    who: 'Max Brodeur-Urbas',
    when: '4h',
    domain: 'slack.com',
    model: 'Kimi K2.6',
    mark: TROOPERS[1],
  },
  {
    action: 'Prepped brief before call',
    agent: 'Pre-meeting Prepper',
    who: 'Aron Schwartz',
    when: '6h',
    domain: 'notion.so',
    model: 'GPT-5.4 Mini',
    mark: TROOPERS[3],
  },
  {
    action: 'Enriched account in CRM',
    agent: 'Research Enricher',
    who: 'Katherine Duh',
    when: '1d',
    domain: 'hubspot.com',
    model: 'Gemini 3 Flash',
    mark: TROOPERS[2],
  },
] as const;

export default function CompanyBrainSection() {
  return (
    <div className="gl-company-brain w-full">
      <div className="flex flex-col gap-4">
        <h2 className="font-funneldisplay text-3xl leading-tight font-medium tracking-tight text-ink md:text-4xl">
          Complete context on your company
        </h2>
        <p className="max-w-[640px] text-base leading-normal text-ink-muted">
          Your company knowledge, the skills your team runs on, and live context from every tool
          connect into one company brain.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:grid-rows-2 lg:min-h-[40rem]">
        <article className="flex min-h-[32rem] min-w-0 flex-col overflow-hidden rounded-md border border-[var(--color-line)] bg-white lg:row-span-2 lg:min-h-0">
          <div className="relative h-[22rem] w-full shrink-0 overflow-hidden bg-[#f3f3f6] lg:h-auto lg:min-h-0 lg:flex-1">
            <div className="absolute inset-0">
              <KnowledgeOrb />
            </div>
          </div>
          <div className="flex shrink-0 flex-col justify-end gap-2 p-6">
            <h3 className="font-funneldisplay text-xl leading-tight font-medium text-ink">
              Company knowledge
            </h3>
            <p className="text-sm leading-normal text-ink-muted">
              Connect your team&apos;s shared knowledge into a centralized, always up-to-date brain
              agents and humans can use.
            </p>
          </div>
        </article>

        <article className="flex min-w-0 flex-col-reverse overflow-hidden rounded-md border border-[var(--color-line)] bg-white sm:flex-row">
          <div className="flex shrink-0 basis-auto flex-col justify-end gap-2 p-6 sm:basis-2/5">
            <h3 className="font-funneldisplay text-xl leading-tight font-medium text-ink">Skills</h3>
            <p className="text-sm leading-normal text-ink-muted">
              Agents write their own playbooks, self-improve, and even run their own code to
              complete tasks the exact way your team needs.
            </p>
          </div>
          <div className="relative min-h-[14rem] min-w-0 flex-1 overflow-hidden bg-[#f3f3f6]">
            <SkillsVisual />
          </div>
        </article>

        <article className="flex min-w-0 flex-col-reverse overflow-hidden rounded-md border border-[var(--color-line)] bg-white sm:flex-row">
          <div className="flex shrink-0 basis-auto flex-col justify-end gap-2 p-6 sm:basis-2/5">
            <h3 className="font-funneldisplay text-xl leading-tight font-medium text-ink">
              Live activity
            </h3>
            <p className="text-sm leading-normal text-ink-muted">
              See what apps and skills your team uses most frequently, and which agents did what,
              when.
            </p>
          </div>
          <div className="relative min-h-[14rem] min-w-0 flex-1 overflow-hidden bg-[#f3f3f6]">
            <LiveActivityFeed />
          </div>
        </article>
      </div>
    </div>
  );
}

function BrandCursor({ color, label }: { color: string; label?: string }) {
  return (
    <span className="pointer-events-none inline-flex items-start">
      <svg width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden>
        <path
          d="M1 1.5 L1 14.5 L4.2 11.6 L6.4 16.8 L8.6 15.9 L6.3 10.6 L10.8 10.6 Z"
          fill={color}
          stroke="white"
          strokeWidth="1"
        />
      </svg>
      {label ? (
        <span
          className="mt-3 -ml-0.5 rounded-full px-2 py-0.5 text-[9px] font-semibold whitespace-nowrap text-white shadow-sm"
          style={{ backgroundColor: color }}
        >
          {label}
        </span>
      ) : null}
    </span>
  );
}

function SkillsVisual() {
  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden p-5">
      <div
        aria-hidden
        className="absolute left-[18%] top-[18%] h-[58%] w-[54%] rotate-[-6deg] rounded-xl bg-white/40 shadow-sm ring-1 ring-black/[0.04]"
      />
      <div
        aria-hidden
        className="absolute left-[28%] top-[22%] h-[58%] w-[54%] rotate-[4deg] rounded-xl bg-white/55 shadow-sm ring-1 ring-black/[0.04]"
      />

      <div className="relative z-[1] w-full max-w-[240px]">
        <div className="overflow-hidden rounded-xl bg-white p-3.5 shadow-md ring-1 ring-black/5">
          <p className="text-[12px] font-semibold text-ink">Salesforce Architect</p>
          <p className="mt-0.5 text-[10px] text-ink-faint">Updated just now</p>
          <div className="mt-3 space-y-1.5">
            <div className="h-1.5 w-4/5 rounded-full bg-neutral-100" />
            <div className="h-1.5 w-3/5 rounded-full bg-neutral-100" />
            <div className="h-1.5 w-2/3 rounded-full bg-neutral-100" />
          </div>
        </div>

        <div className="gl-mark-float absolute -left-3 -top-3 z-[2] flex items-center gap-1">
          <span
            className="rounded-full px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm"
            style={{ backgroundColor: '#9810FA' }}
          >
            CRM Agent
          </span>
          <BrandCursor color="#9810FA" />
        </div>

        <div
          className="gl-mark-float absolute -right-6 top-8 z-[3]"
          style={{ animationDelay: '0.35s' }}
        >
          <BrandCursor color="#FE9A00" label="Salesforce Architect" />
        </div>

        <div
          className="gl-mark-float absolute -bottom-2 left-2 z-[2] flex items-center gap-1"
          style={{ animationDelay: '0.7s' }}
        >
          <span
            className="rounded-full px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm"
            style={{ backgroundColor: '#FB3C98' }}
          >
            Call Analysis Agent
          </span>
          <BrandCursor color="#FB3C98" />
        </div>
      </div>
    </div>
  );
}

function LiveActivityFeed() {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const controls = animate(0, -ACTIVITY.length * 64, {
      duration: ACTIVITY.length * 3.4,
      ease: 'linear',
      repeat: Infinity,
      onUpdate: (v) => setOffset(v),
    });
    return () => controls.stop();
  }, [inView, reduce]);

  const rows = [...ACTIVITY, ...ACTIVITY];

  return (
    <div ref={ref} className="relative size-full min-h-[14rem] overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-8 bg-gradient-to-b from-[#f3f3f6] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-10 bg-gradient-to-t from-[#f3f3f6] to-transparent" />
      {rows.map((row, index) => (
        <ActivityRow key={`${row.action}-${index}`} entry={row} index={index} y={offset} />
      ))}
    </div>
  );
}

function ActivityRow({
  entry,
  index,
  y,
}: {
  entry: (typeof ACTIVITY)[number];
  index: number;
  y: number;
}) {
  const accent = index % 4 === 1 ? '#16a34a' : index % 4 === 2 ? '#FE9A00' : null;
  const mid = 64 * index + y + 28;
  const x = Math.max(0, Math.min(28, ((mid - 120) / 180) ** 2 * 18));

  return (
    <div
      className="absolute inset-x-0 pr-2 pl-1"
      style={{ top: 64 * index, transform: `translate3d(${x}px, ${y}px, 0)` }}
    >
      <div
        style={{
          height: 56,
          borderLeftColor: accent ?? 'transparent',
          backgroundColor: accent ? `${accent}0A` : '#fff',
        }}
        className="flex shrink-0 flex-col justify-center gap-1 rounded-md border-l-2 px-3 shadow-sm ring-1 ring-black/[0.04]"
      >
        <div className="flex items-center justify-between gap-2">
          <span className="flex min-w-0 items-center gap-1.5">
            <DemoFavicon domain={entry.domain} size={12} />
            <span className="min-w-0 truncate text-xs font-medium text-ink">{entry.action}</span>
          </span>
          <span className="flex shrink-0 items-center gap-1 text-[10px] text-ink-muted">
            <TrooperMark trooper={entry.mark} size={12} />
            <span className="max-w-[7rem] truncate">{entry.agent}</span>
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 text-[10px] text-ink-muted">
          <span className="flex min-w-0 items-center gap-1.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.pravatar.cc/40?u=${encodeURIComponent(entry.who)}`}
              alt=""
              width={14}
              height={14}
              className="size-3.5 rounded-sm object-cover"
            />
            <span className="truncate tabular-nums">
              {entry.who} · {entry.when}
            </span>
          </span>
          <span className="shrink-0 tabular-nums">{entry.model}</span>
        </div>
      </div>
    </div>
  );
}
