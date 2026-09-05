'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

import { TROOPERS } from '@/lib/troopers';
import TrooperMark from '@/components/ui/TrooperMark';

const ease = [0.22, 1, 0.36, 1] as const;

const DATASETS = [
  {
    id: 'wiki',
    label: 'Wiki',
    color: '#FB3C98',
    sources: ['Notion', 'Confluence', 'Drive'],
    blurb: 'Policies, launch notes, and brand voice — always current.',
  },
  {
    id: 'crm',
    label: 'CRM',
    color: '#03A2FE',
    sources: ['HubSpot', 'Salesforce', 'Attio'],
    blurb: 'Deals, accounts, and activity the sales org already trusts.',
  },
  {
    id: 'code',
    label: 'Code',
    color: '#FE9A00',
    sources: ['GitHub', 'Linear', 'Sentry'],
    blurb: 'Repos, issues, and incidents troopers can act on.',
  },
  {
    id: 'finance',
    label: 'Finance',
    color: '#16a34a',
    sources: ['Stripe', 'QuickBooks', 'Sheets'],
    blurb: 'Ledger, payouts, and close checklists without copy-paste.',
  },
] as const;

const ACTIVITY = [
  {
    title: 'Booked qualified meeting',
    who: 'Scout',
    when: '2h',
    tag: 'Meeting Scheduler',
    model: 'Claude Sonnet',
    mark: TROOPERS[2],
  },
  {
    title: 'Logged notes and follow-ups',
    who: 'Nova',
    when: '4h',
    tag: 'Post-call Actioner',
    model: 'GPT-4o Mini',
    mark: TROOPERS[1],
  },
  {
    title: 'Prepped brief before call',
    who: 'Pip',
    when: '6h',
    tag: 'Pre-meeting Prepper',
    model: 'Claude Haiku',
    mark: TROOPERS[3],
  },
] as const;

/**
 * Gumloop-inspired company brain — interactive dataset orb + skills + activity.
 * Adapted for Trooper: ink hierarchy, Trooper marks, clickable data layers.
 */
export default function CompanyBrainSection() {
  const [active, setActive] = useState<(typeof DATASETS)[number]['id']>('wiki');
  const dataset = DATASETS.find((d) => d.id === active) ?? DATASETS[0];

  return (
    <div>
      <motion.div
        className="max-w-3xl"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
        viewport={{ once: true, margin: '-40px' }}
      >
        <h2 className="h2-section">Complete context on your company</h2>
        <p className="lede">
          Wiki, CRM, code, and finance connect into one brain troopers and humans use —
          click a layer to see what feeds it.
        </p>
      </motion.div>

      <div className="mt-10 grid gap-px border border-[var(--color-line)] bg-[var(--color-line)] lg:grid-cols-2 lg:grid-rows-2">
        {/* Interactive knowledge orb */}
        <article className="relative overflow-hidden bg-canvas-section p-6 sm:p-8 lg:row-span-2">
          <div className="relative mx-auto mb-8 flex h-64 max-w-sm items-center justify-center">
            <div className="absolute inset-6 rounded-full border border-dashed border-black/[0.08]" />
            <div className="absolute inset-12 rounded-full border border-dashed border-black/[0.06]" />
            <svg className="absolute inset-0 size-full" viewBox="0 0 320 320" aria-hidden>
              {DATASETS.map((d, i) => (
                <path
                  key={d.id}
                  d={
                    i === 0
                      ? 'M40 160 C80 40, 240 40, 280 160'
                      : i === 1
                        ? 'M50 220 C120 280, 220 280, 270 200'
                        : i === 2
                          ? 'M60 100 C140 180, 200 60, 260 140'
                          : 'M48 180 C100 60, 220 260, 272 120'
                  }
                  fill="none"
                  stroke={d.color}
                  strokeWidth={active === d.id ? 2.25 : 1.25}
                  opacity={active === d.id ? 0.75 : 0.28}
                  className="gl-trace-dash transition-[stroke-width,opacity] duration-300"
                  style={{ animationDelay: `${i * 0.25}s` }}
                />
              ))}
            </svg>

            <div className="relative z-[1] flex flex-col items-center gap-3">
              <div className="flex flex-wrap justify-center gap-1.5">
                {DATASETS.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setActive(d.id)}
                    className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition-all ${
                      active === d.id
                        ? 'bg-ink text-white shadow-sm'
                        : 'bg-white text-ink-muted ring-1 ring-black/[0.06] hover:text-ink'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-1.5">
                {dataset.sources.map((name) => (
                  <span
                    key={name}
                    className="rounded-md bg-white px-2 py-1 text-[11px] font-medium text-ink ring-1 ring-black/[0.06]"
                    style={{ boxShadow: `inset 0 -2px 0 ${dataset.color}33` }}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <h3 className="text-[16px] font-semibold tracking-tight text-ink">Company knowledge</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">{dataset.blurb}</p>
        </article>

        {/* Skills */}
        <article className="flex flex-col justify-between gap-4 bg-canvas-section p-6 sm:flex-row sm:items-center sm:p-7">
          <div className="min-w-0 flex-1">
            <h3 className="text-[16px] font-semibold tracking-tight text-ink">Skills</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
              Troopers write their own playbooks, self-improve, and run code the way your team
              already works.
            </p>
          </div>
          <div className="relative h-28 w-full shrink-0 sm:w-44">
            <div
              className="absolute left-2 top-2 rounded-full px-2.5 py-1 text-[10px] font-semibold text-white"
              style={{ backgroundColor: TROOPERS[1].accent }}
            >
              CRM Agent
            </div>
            <div className="absolute left-6 top-10 rounded-xl bg-white px-3 py-2 ring-1 ring-black/[0.06]">
              <p className="text-[11px] font-medium text-ink">Salesforce Architect</p>
              <p className="text-[9px] text-ink-faint">Updated just now</p>
            </div>
            <div
              className="absolute bottom-2 right-2 rounded-full px-2.5 py-1 text-[10px] font-semibold text-white"
              style={{ backgroundColor: TROOPERS[4].accent }}
            >
              Call Analysis
            </div>
            <div className="gl-mark-float absolute right-8 top-6">
              <Sparkles className="size-4 text-[#FE9A00]" aria-hidden />
            </div>
          </div>
        </article>

        {/* Live activity */}
        <article className="overflow-hidden bg-canvas-section p-6 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="min-w-0 flex-1">
              <h3 className="text-[16px] font-semibold tracking-tight text-ink">Live activity</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
                See which apps and skills get used, and which trooper did what, when.
              </p>
            </div>
            <ul className="min-w-0 flex-1 space-y-2">
              {ACTIVITY.map((row) => (
                <li
                  key={row.title}
                  className="flex items-start gap-2.5 rounded-xl bg-white px-2.5 py-2 ring-1 ring-black/[0.06]"
                >
                  <TrooperMark trooper={row.mark} size={22} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12px] font-medium text-ink">{row.title}</p>
                    <p className="truncate text-[10px] text-ink-faint">
                      {row.who} · {row.when}
                    </p>
                    <p className="mt-0.5 truncate text-[10px] text-ink-muted">
                      {row.tag} / {row.model}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}
