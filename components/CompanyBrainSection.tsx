'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

import { TROOPERS } from '@/lib/troopers';
import TrooperAvatar from '@/components/ui/TrooperAvatar';
import KnowledgeOrb from '@/components/gumloop-lab/KnowledgeOrb';
import { DemoFavicon } from '@trooper/demo';
import { useHomeMode } from '@/components/home/HomeModeContext';

/**
 * Company brain bento — knowledge orb, skill-doc grid (focus one at a time),
 * live activity feed.
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
  const { isPersonal } = useHomeMode();

  return (
    <div className="gl-company-brain w-full">
      <div className="mx-auto flex max-w-2xl flex-col items-start text-left sm:items-center sm:text-center">
        <h2 className="h2-section">
          {isPersonal ? 'Complete context on your world' : 'Complete context on your company'}
        </h2>
        <p className="lede mt-3 max-w-lg sm:mx-auto">
          {isPersonal ? (
            <>
              <span className="block">
                Your notes, skills, and live context from every tool you use
              </span>
              <span className="block">connect into one brain Buddy can work from.</span>
            </>
          ) : (
            <>
              <span className="block">
                Your company knowledge, the skills your team runs on, and live context from every tool
              </span>
              <span className="block">connect into one company brain.</span>
            </>
          )}
        </p>
      </div>

      {/* Mobile: shorter knowledge well so the bento doesn’t dominate the scroll. */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-5 lg:grid-cols-2 lg:grid-rows-2 lg:min-h-[40rem]">
        <article className="flex min-w-0 flex-col rounded-md border border-[var(--color-line)] bg-white lg:row-span-2 lg:min-h-0">
          <div className="relative h-[14.5rem] w-full shrink-0 overflow-hidden rounded-t-[inherit] bg-[#f3f3f6] sm:h-[18rem] lg:h-auto lg:min-h-0 lg:flex-1">
            <div className="absolute inset-0 flex items-center justify-center">
              <KnowledgeOrb />
            </div>
          </div>
          <div className="flex shrink-0 flex-col justify-end gap-1.5 p-5 sm:gap-2 sm:p-6">
            <h3 className="font-display text-lg font-medium leading-tight tracking-tight text-ink sm:text-xl">
              Company knowledge
            </h3>
            <p className="text-[14px] leading-relaxed text-ink-muted sm:text-[15px]">
              {isPersonal
                ? 'Connect your notes and shared docs into a centralized, always up-to-date brain Buddy can use.'
                : "Connect your team's shared knowledge into a centralized, always up-to-date brain agents and humans can use."}
            </p>
          </div>
        </article>

        <article className="flex min-w-0 flex-col-reverse rounded-md border border-[var(--color-line)] bg-white sm:flex-row">
          <div className="flex shrink-0 basis-auto flex-col justify-end gap-1.5 p-5 sm:basis-2/5 sm:gap-2 sm:p-6">
            <h3 className="font-display text-lg font-medium leading-tight tracking-tight text-ink sm:text-xl">
              Skills
            </h3>
            <p className="text-[14px] leading-relaxed text-ink-muted sm:text-[15px]">
              {isPersonal
                ? 'Buddy writes playbooks, self-improves, and can run code to complete tasks the exact way you need.'
                : 'Agents write their own playbooks, self-improve, and even run their own code to complete tasks the exact way your team needs.'}
            </p>
          </div>
          <div className="relative min-h-[13rem] min-w-0 flex-1 overflow-hidden rounded-t-[inherit] bg-[#f3f3f6] sm:min-h-[16rem] sm:rounded-t-none sm:rounded-r-[inherit]">
            <SkillsVisual />
          </div>
        </article>

        <article className="flex min-w-0 flex-col-reverse rounded-md border border-[var(--color-line)] bg-white sm:flex-row">
          <div className="flex shrink-0 basis-auto flex-col justify-end gap-1.5 p-5 sm:basis-2/5 sm:gap-2 sm:p-6">
            <h3 className="font-display text-lg font-medium leading-tight tracking-tight text-ink sm:text-xl">
              Live activity
            </h3>
            <p className="text-[14px] leading-relaxed text-ink-muted sm:text-[15px]">
              {isPersonal
                ? 'See what apps and skills you use most, and what Buddy did, when.'
                : 'See what apps and skills your team uses most frequently, and which agents did what, when.'}
            </p>
          </div>
          <div className="relative flex min-h-[13rem] min-w-0 flex-1 items-stretch overflow-hidden rounded-t-[inherit] bg-[#f3f3f6] p-3 sm:min-h-[16rem] sm:rounded-t-none sm:rounded-r-[inherit]">
            <div className="relative min-h-0 w-full overflow-hidden rounded-md bg-white ring-1 ring-black/[0.04]">
              <LiveActivityFeed />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

const SKILL_DOCS = [
  {
    title: 'Salesforce Architect',
    meta: 'Updated just now',
    agent: 'CRM Agent',
    color: '#9810FA',
    lines: [88, 62, 74],
  },
  {
    title: 'Deal Review Rubric',
    meta: 'Updated 9m ago',
    agent: 'Deal Reviewer',
    color: '#03A2FE',
    lines: [76, 54, 68],
  },
  {
    title: 'Outbound Sequences',
    meta: 'Updated 1h ago',
    agent: 'Prospector',
    color: '#FE9A00',
    lines: [82, 48, 70],
  },
  {
    title: 'Call Analysis',
    meta: 'Updated 2h ago',
    agent: 'Call Analyst',
    color: '#FB3C98',
    lines: [70, 58, 64],
  },
  {
    title: 'Meeting Prep Brief',
    meta: 'Updated 6h ago',
    agent: 'Scheduler',
    color: '#11AC4B',
    lines: [84, 52, 72],
  },
  {
    title: 'Pipeline Forecast',
    meta: 'Updated 1d ago',
    agent: 'Forecast',
    color: '#191b1d',
    lines: [78, 60, 66],
  },
] as const;

function BrandCursor({ color }: { color: string }) {
  return (
    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden>
      <path
        d="M1 1.5 L1 14.5 L4.2 11.6 L6.4 16.8 L8.6 15.9 L6.3 10.6 L10.8 10.6 Z"
        fill={color}
        stroke="white"
        strokeWidth="1"
      />
    </svg>
  );
}

function SkillsVisual() {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const [focus, setFocus] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = window.setInterval(() => {
      setFocus((i) => (i + 1) % SKILL_DOCS.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  return (
    <div ref={ref} className="relative flex size-full items-center justify-center overflow-hidden p-3 sm:p-4">
      <div className="grid w-full max-w-[300px] grid-cols-2 gap-2">
        {SKILL_DOCS.map((doc, i) => {
          const on = i === focus;
          return (
            <div
              key={doc.title}
              className={`relative flex flex-col overflow-hidden rounded-[7px] bg-white transition-[transform,box-shadow,opacity] duration-500 ease-out ${
                on
                  ? 'z-[2] scale-[1.06] opacity-100 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.28)] ring-1 ring-black/10'
                  : 'scale-100 opacity-40 shadow-none ring-1 ring-black/[0.06]'
              }`}
            >
              {/* Doc chrome — reads as a file, not a pill */}
              <div className="flex items-center gap-1 border-b border-black/[0.05] bg-[#fafafa] px-2 py-1">
                <span
                  className="size-1.5 shrink-0 rounded-[1px]"
                  style={{ backgroundColor: doc.color }}
                  aria-hidden
                />
                <span className="truncate font-mono text-[7px] tracking-tight text-ink-faint">
                  SKILL.md
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-1.5 p-2">
                <div>
                  <p className="truncate text-[10px] font-semibold leading-tight text-ink">{doc.title}</p>
                  <p className="mt-0.5 truncate text-[8px] leading-none text-ink-faint">{doc.meta}</p>
                </div>
                <div className="space-y-1">
                  {doc.lines.map((w, li) => (
                    <div
                      key={li}
                      className="h-[3px] rounded-full bg-neutral-100"
                      style={{ width: `${w}%` }}
                    />
                  ))}
                </div>
              </div>
              {on ? (
                <div className="pointer-events-none absolute -right-0.5 -top-0.5 z-[3] flex items-start drop-shadow-sm">
                  <BrandCursor color={doc.color} />
                  <span
                    className="mt-3 -ml-0.5 rounded-full px-1.5 py-0.5 text-[8px] font-semibold whitespace-nowrap text-white"
                    style={{ backgroundColor: doc.color }}
                  >
                    {doc.agent}
                  </span>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const ROW_H = 52;

function LiveActivityFeed() {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const controls = animate(0, -ACTIVITY.length * ROW_H, {
      duration: ACTIVITY.length * 3.4,
      ease: 'linear',
      repeat: Infinity,
      onUpdate: (v) => setOffset(v),
    });
    return () => controls.stop();
  }, [inView, reduce]);

  const rows = [...ACTIVITY, ...ACTIVITY];

  return (
    <div ref={ref} className="relative size-full min-h-[14rem] overflow-hidden px-3 py-2">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-8 bg-gradient-to-b from-white to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-10 bg-gradient-to-t from-white to-transparent" />
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
  return (
    <div
      className="absolute inset-x-3"
      style={{ top: ROW_H * index + 8, transform: `translate3d(0, ${y}px, 0)` }}
    >
      <div className="flex h-10 flex-col justify-center gap-0.5 border-b border-black/[0.04]">
        <div className="flex items-center justify-between gap-2">
          <span className="flex min-w-0 items-center gap-1.5">
            <DemoFavicon domain={entry.domain} size={12} />
            <span className="min-w-0 truncate text-[11px] font-medium text-ink">{entry.action}</span>
          </span>
          <span className="flex shrink-0 items-center gap-1 text-[9px] text-ink-muted">
            <TrooperAvatar trooper={entry.mark} size={18} />
            <span className="max-w-[6.5rem] truncate">{entry.agent}</span>
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 text-[9px] text-ink-muted">
          <span className="flex min-w-0 items-center gap-1.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.pravatar.cc/40?u=${encodeURIComponent(entry.who)}`}
              alt=""
              width={12}
              height={12}
              className="size-3 rounded-sm object-cover"
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
