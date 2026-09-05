'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

import { TROOPERS } from '@/lib/troopers';
import TrooperMark from '@/components/ui/TrooperMark';
import KnowledgeOrb from '@/components/gumloop-lab/KnowledgeOrb';
import { DemoFavicon } from '@trooper/demo';

/**
 * Complete context / company brain — Gumloop bento layout + interactive orb,
 * skills stack, and curved live-activity feed. Trooper marks replace Gumloop
 * agent glyphs; structure and motion match the reference.
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

const SKILL_AGENTS = [
  { name: 'CRM Agent', accent: TROOPERS[1].accent, top: 8, left: 8 },
  { name: 'Salesforce Architecture Agent', accent: TROOPERS[2].accent, top: 48, left: 28 },
  { name: 'Call Analysis Agent', accent: TROOPERS[4].accent, top: 88, left: 12 },
] as const;

export default function CompanyBrainSection() {
  return (
    <div className="gl-company-brain">
      <div className="flex flex-col gap-4">
        <h2 className="font-funneldisplay text-3xl leading-tight font-medium tracking-tight text-ink md:text-4xl">
          Complete context on your company
        </h2>
        <p className="max-w-[640px] text-base leading-normal text-ink-muted">
          Your company knowledge, the skills your team runs on, and live context from every tool
          connect into one company brain.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:grid-rows-2 lg:min-h-[35rem]">
        {/* Company knowledge — tall left */}
        <article className="min-w-0 overflow-hidden rounded-md border border-[var(--color-line)] bg-[#f7f7f5] lg:row-span-2">
          <div className="relative min-h-80 min-w-0 flex-1 overflow-hidden">
            <KnowledgeOrb />
          </div>
          <div className="border-t border-[var(--color-line)] bg-white px-6 py-5">
            <h3 className="text-[16px] font-semibold text-ink">Company knowledge</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
              Connect your team&apos;s shared knowledge into a centralized, always up-to-date brain
              agents and humans can use.
            </p>
          </div>
        </article>

        {/* Skills */}
        <article className="flex min-w-0 flex-col justify-between gap-4 overflow-hidden rounded-md border border-[var(--color-line)] bg-[#f7f7f5] p-6 sm:flex-row sm:items-center">
          <div className="min-w-0 flex-1">
            <h3 className="text-[16px] font-semibold text-ink">Skills</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
              Agents write their own playbooks, self-improve, and even run their own code to
              complete tasks the exact way your team needs.
            </p>
          </div>
          <SkillsVisual />
        </article>

        {/* Live activity */}
        <article className="min-w-0 overflow-hidden rounded-md border border-[var(--color-line)] bg-[#f7f7f5] p-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="min-w-0 flex-1">
              <h3 className="text-[16px] font-semibold text-ink">Live activity</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
                See what apps and skills your team uses most frequently, and which agents did what,
                when.
              </p>
            </div>
            <LiveActivityFeed />
          </div>
        </article>
      </div>
    </div>
  );
}

function SkillsVisual() {
  return (
    <div className="relative h-36 w-full shrink-0 sm:w-48">
      <div className="absolute inset-x-4 top-2 overflow-hidden rounded-md bg-white p-3 shadow-sm ring-1 ring-black/5">
        <p className="text-[11px] font-medium text-ink">Salesforce Architecture</p>
        <p className="mt-0.5 text-[9px] text-ink-faint">Updated just now</p>
        <p className="mt-2 font-mono text-[9px] leading-relaxed text-ink-muted">
          <span className="text-ink-faint"># Reading SKILL.md</span>
          <br />
          - Map objects and ownership.
          <br />- Capture integration contracts.
        </p>
      </div>
      {SKILL_AGENTS.map((agent) => (
        <div
          key={agent.name}
          className="gl-mark-float absolute rounded-full px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm"
          style={{ backgroundColor: agent.accent, top: agent.top, left: agent.left }}
        >
          {agent.name.replace(' Agent', '')}
        </div>
      ))}
      <div className="gl-mark-float absolute right-2 top-4">
        <Sparkles className="size-4 text-[#FE9A00]" aria-hidden />
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
      duration: ACTIVITY.length * 3.2,
      ease: 'linear',
      repeat: Infinity,
      onUpdate: (v) => setOffset(v),
    });
    return () => controls.stop();
  }, [inView, reduce]);

  const rows = [...ACTIVITY, ...ACTIVITY];

  return (
    <div ref={ref} className="relative h-[14.5rem] min-w-0 flex-1 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-8 bg-gradient-to-b from-[#f7f7f5] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-8 bg-gradient-to-t from-[#f7f7f5] to-transparent" />
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
  // Curve rows along a large circle — same trick as Gumloop’s feed.
  const x = 360 - Math.sqrt(Math.max(0, 129600 - (64 * index + y + 28 - 124) ** 2));

  return (
    <div
      className="absolute inset-x-0 pl-1"
      style={{ top: 64 * index, transform: `translate3d(${Number.isFinite(x) ? x : 0}px, ${y}px, 0)` }}
    >
      <div
        style={{ height: 56 }}
        className="flex shrink-0 flex-col justify-center gap-1.5 rounded-md rounded-r-none bg-white px-3 shadow-sm ring-1 ring-black/[0.04]"
      >
        <div className="flex items-center justify-between gap-1.5">
          <span className="flex min-w-0 items-center gap-1.5">
            <DemoFavicon domain={entry.domain} size={12} />
            <span className="min-w-0 truncate text-xs font-medium text-ink">{entry.action}</span>
          </span>
          <span className="flex shrink-0 items-center gap-1 text-xs text-ink-muted">
            <TrooperMark trooper={entry.mark} size={12} />
            {entry.agent}
          </span>
        </div>
        <div className="flex items-center justify-between gap-1.5 text-xs text-ink-muted">
          <span className="min-w-0 truncate tabular-nums">
            {entry.who} · {entry.when}
          </span>
          <span className="shrink-0 tabular-nums">{entry.model}</span>
        </div>
      </div>
    </div>
  );
}
