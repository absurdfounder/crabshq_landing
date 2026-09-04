'use client';

import { useState } from 'react';
import {
  Calendar,
  FileText,
  GraduationCap,
  Image as ImageIcon,
  Infinity as InfinityIcon,
  Plug,
  Sparkles,
  Zap,
} from 'lucide-react';
import { TROOPERS } from '@/lib/troopers';
import TrooperMark from '@/components/ui/TrooperMark';
import { GlDualCta } from './Extracts';

/**
 * Richer Gumloop homepage section extracts — closer to the live product
 * visuals (experts split, company brain bento, collaborate tabs, optimize
 * cards with graphics, enterprise monitoring). Still lab-only.
 */

const EXPERT_FEATURES = [
  { icon: Zap, label: 'App triggers' },
  { icon: Calendar, label: 'Recurring tasks' },
  { icon: Plug, label: '300+ Connectors' },
  { icon: GraduationCap, label: 'Skills' },
  { icon: FileText, label: 'Artifact building' },
  { icon: ImageIcon, label: 'Image generation' },
  { icon: InfinityIcon, label: 'Self-improvement' },
] as const;

/** “Let your experts build the agents” — copy left, agent product panel right. */
export function GlExpertsBuildSection() {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:items-start lg:gap-14">
      <div>
        <p className="text-[13px] text-neutral-400">Build →</p>
        <h3 className="mt-3 font-display text-3xl tracking-tight text-neutral-950 sm:text-4xl">
          Let your experts
          <br />
          build the agents
        </h3>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-neutral-500">
          Understanding a task is the only prerequisite to automating it. Let your team who already
          understand the problem build the necessary agents. No learning curve involved.
        </p>
        <div className="mt-6">
          <GlDualCta
            primary={{ href: '/loops', label: 'Explore agents' }}
            secondary={{ href: '/self-host', label: 'Read docs' }}
          />
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3">
          {EXPERT_FEATURES.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2 text-[13px] text-neutral-600">
              <Icon className="size-3.5 shrink-0 text-neutral-400" strokeWidth={1.75} aria-hidden />
              {label}
            </li>
          ))}
        </ul>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_24px_56px_-28px_rgba(26,26,26,0.28)] ring-1 ring-black/[0.07]">
        <div className="flex min-h-[420px]">
          <aside className="hidden w-[88px] shrink-0 flex-col gap-1 border-r border-[var(--color-line)] bg-neutral-50 p-2 sm:flex">
            {['Sales', 'Support', 'Data', 'Meetings', 'Calls'].map((tab) => (
              <div
                key={tab}
                className={`rounded-lg px-2 py-2 text-center text-[10px] font-medium ${
                  tab === 'Data' ? 'bg-white text-[#03A2FE] shadow-xs ring-1 ring-black/5' : 'text-neutral-500'
                }`}
              >
                {tab}
              </div>
            ))}
          </aside>
          <div className="min-w-0 flex-1 p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <TrooperMark trooper={TROOPERS[1]} size={36} />
              <div>
                <p className="text-[15px] font-semibold text-neutral-900">Data Analysis Agent</p>
                <p className="mt-0.5 text-[12px] text-neutral-500">
                  A reasoning agent that answers questions from your data warehouse.
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-600">
                    GPT-5
                  </span>
                  <span className="text-[10px] text-neutral-400">Drive · Sheets · +6</span>
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div className="rounded-xl bg-neutral-50 px-3 py-2.5">
                <p className="text-[11px] font-medium text-neutral-500">Omid</p>
                <p className="mt-0.5 text-[13px] text-neutral-800">
                  Where are we losing people in the onboarding flow?
                </p>
              </div>
              <div className="space-y-1.5 pl-1 text-[12px] text-neutral-600">
                <p className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-[#03A2FE]" /> Querying available event types
                </p>
                <p className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-[#03A2FE]" /> Building onboarding funnel query
                </p>
                <p className="flex items-center gap-2 text-neutral-400">
                  <span className="size-1.5 rounded-full bg-neutral-300" /> Building onboarding funnel chart
                </p>
              </div>
              <div className="rounded-xl border border-[var(--color-line)] bg-white p-3 text-[12px] leading-relaxed text-neutral-700">
                <p>
                  <span className="font-semibold text-neutral-900">Biggest drop-off:</span> Dashboard →
                  Attempted Integration — 46% of users (1,432 people).
                </p>
                <p className="mt-2">
                  <span className="font-semibold text-neutral-900">Secondary:</span> Attempted → Completed
                  Integration — 37% fail to finish.
                </p>
              </div>
              <table className="w-full text-left text-[11px]">
                <thead className="text-neutral-400">
                  <tr>
                    <th className="pb-1 font-medium">Step</th>
                    <th className="pb-1 font-medium">Users</th>
                    <th className="pb-1 font-medium">Drop-off</th>
                  </tr>
                </thead>
                <tbody className="text-neutral-700">
                  <tr>
                    <td className="py-0.5">Signed Up</td>
                    <td>4,820</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td className="py-0.5">Completed Profile</td>
                    <td>3,940</td>
                    <td>18%</td>
                  </tr>
                  <tr>
                    <td className="py-0.5">Viewed Dashboard</td>
                    <td>3,105</td>
                    <td>21%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** “Complete context on your company” — bento: knowledge / skills / live activity. */
export function GlCompanyBrainBento() {
  const activity = [
    {
      title: 'Booked qualified meeting',
      who: 'Wasay Ahmed',
      when: '2h',
      tag: 'Meeting Scheduler',
      model: 'Gemini 3 Flash',
      mark: TROOPERS[2],
    },
    {
      title: 'Logged notes and follow-ups',
      who: 'Max Brodeur-Urbas',
      when: '4h',
      tag: 'Post-call Actioner',
      model: 'Kimi K2.6',
      mark: TROOPERS[3],
    },
    {
      title: 'Prepped brief before call',
      who: 'Aron Schwartz',
      when: '6h',
      tag: 'Pre-meeting Prepper',
      model: 'GPT-4o Mini',
      mark: TROOPERS[4],
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <h3 className="font-display text-3xl tracking-tight text-neutral-950 sm:text-4xl">
        Complete context on your company
      </h3>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-neutral-500">
        Your company knowledge, the skills your team runs on, and live context from every tool
        connect into one company brain.
      </p>

      <div className="mt-10 grid gap-4 lg:grid-cols-2 lg:grid-rows-2">
        {/* Company knowledge — tall left */}
        <article className="relative overflow-hidden rounded-2xl bg-neutral-50 p-6 ring-1 ring-black/5 lg:row-span-2">
          <div className="relative mx-auto mb-8 flex h-56 max-w-sm items-center justify-center">
            <div className="absolute inset-8 rounded-full border border-dashed border-neutral-200" />
            <svg className="absolute inset-0 size-full" viewBox="0 0 320 320" aria-hidden>
              <path
                d="M40 160 C80 40, 240 40, 280 160"
                fill="none"
                stroke="#FB3C98"
                strokeWidth="1.5"
                opacity="0.55"
                className="gl-trace-dash"
              />
              <path
                d="M50 220 C120 280, 220 280, 270 200"
                fill="none"
                stroke="#03A2FE"
                strokeWidth="1.5"
                opacity="0.55"
                className="gl-trace-dash"
                style={{ animationDelay: '0.3s' }}
              />
              <path
                d="M60 100 C140 180, 200 60, 260 140"
                fill="none"
                stroke="#FE9A00"
                strokeWidth="1.5"
                opacity="0.45"
                className="gl-trace-dash"
                style={{ animationDelay: '0.6s' }}
              />
            </svg>
            <div className="relative z-[1] flex flex-wrap justify-center gap-2">
              {['Notion', 'Drive', 'Sheets', 'HubSpot', 'GitHub'].map((name) => (
                <span
                  key={name}
                  className="rounded-lg bg-white px-2.5 py-1.5 text-[11px] font-medium text-neutral-700 shadow-xs ring-1 ring-black/5"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
          <h4 className="text-[16px] font-semibold text-neutral-900">Company knowledge</h4>
          <p className="mt-2 text-[14px] leading-relaxed text-neutral-500">
            Connect your team’s shared knowledge into a centralized, always up-to-date brain agents
            and humans can use.
          </p>
        </article>

        {/* Skills */}
        <article className="flex flex-col justify-between gap-4 overflow-hidden rounded-2xl bg-neutral-50 p-6 ring-1 ring-black/5 sm:flex-row sm:items-center">
          <div className="min-w-0 flex-1">
            <h4 className="text-[16px] font-semibold text-neutral-900">Skills</h4>
            <p className="mt-2 text-[14px] leading-relaxed text-neutral-500">
              Agents write their own playbooks, self-improve, and even run their own code to complete
              tasks the exact way your team needs.
            </p>
          </div>
          <div className="relative h-28 w-full shrink-0 sm:w-44">
            <div
              className="absolute left-2 top-2 rounded-full px-2.5 py-1 text-[10px] font-semibold text-white"
              style={{ backgroundColor: TROOPERS[3].accent }}
            >
              CRM Agent
            </div>
            <div className="absolute left-6 top-10 rounded-xl bg-white px-3 py-2 shadow-xs ring-1 ring-black/5">
              <p className="text-[11px] font-medium text-neutral-800">Salesforce Architect</p>
              <p className="text-[9px] text-neutral-400">Updated just now</p>
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
        <article className="overflow-hidden rounded-2xl bg-neutral-50 p-6 ring-1 ring-black/5">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="min-w-0 flex-1">
              <h4 className="text-[16px] font-semibold text-neutral-900">Live activity</h4>
              <p className="mt-2 text-[14px] leading-relaxed text-neutral-500">
                See what apps and skills your team uses most frequently, and which agents did what,
                when.
              </p>
            </div>
            <ul className="min-w-0 flex-1 space-y-2.5">
              {activity.map((row) => (
                <li
                  key={row.title}
                  className="flex items-start gap-2.5 rounded-xl bg-white px-2.5 py-2 ring-1 ring-black/5"
                >
                  <TrooperMark trooper={row.mark} size={22} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12px] font-medium text-neutral-800">{row.title}</p>
                    <p className="truncate text-[10px] text-neutral-400">
                      {row.who} · {row.when}
                    </p>
                    <p className="mt-0.5 truncate text-[10px] text-neutral-500">
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

const CHANNELS = [
  {
    id: 'slack',
    name: 'Slack',
    blurb: '@mention an agent in any channel or thread',
    color: '#4A154B',
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    blurb: 'Bring agents into your chats and channels',
    color: '#6264A7',
  },
  {
    id: 'gmail',
    name: 'Gmail',
    blurb: 'Let agents draft and triage right in your inbox',
    color: '#EA4335',
  },
] as const;

/** “Meet your team where they work” — channel picker + mock shell. */
export function GlCollaborateSection() {
  const [active, setActive] = useState<(typeof CHANNELS)[number]['id']>('slack');
  const channel = CHANNELS.find((c) => c.id === active)!;

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
      <div className="overflow-hidden rounded-2xl shadow-[0_24px_56px_-28px_rgba(26,26,26,0.32)] ring-1 ring-black/10">
        <div className="flex items-center gap-2 px-3 py-2" style={{ backgroundColor: channel.color }}>
          <span className="size-2.5 rounded-full bg-white/25" />
          <span className="size-2.5 rounded-full bg-white/25" />
          <span className="size-2.5 rounded-full bg-white/25" />
          <span className="ml-3 flex-1 rounded-md bg-black/20 px-2 py-1 text-[10px] text-white/70">
            Search Trooper
          </span>
        </div>
        <div className="grid min-h-[300px] bg-white sm:grid-cols-[140px_1fr]">
          <aside className="hidden border-r border-[var(--color-line)] bg-neutral-50 p-3 text-[11px] text-neutral-500 sm:block">
            <p className="font-semibold text-neutral-700">Channels</p>
            <p className="mt-2">#data-analysis</p>
            <p className="mt-1">#sales-discussion</p>
            <p className="mt-1">#pipeline-reviews</p>
          </aside>
          <div className="p-4">
            <p className="text-[13px] font-semibold text-neutral-900">#data-analysis</p>
            <div className="mt-4 space-y-4">
              {[
                { who: 'Max', text: '@Databot Compare this month’s sales to the same month last year' },
                { who: 'Gabriela', text: '@Databot Who are the top 3 most active users at Mostco?' },
                { who: 'Marcelo', text: '@Databot Where are we losing people in the onboarding flow?' },
              ].map((m) => (
                <div key={m.who}>
                  <p className="text-[11px] font-semibold text-neutral-800">{m.who}</p>
                  <p className="mt-0.5 text-[12px] text-neutral-600">{m.text}</p>
                  <p className="mt-1 text-[10px] text-neutral-400">3 replies</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <p className="text-[13px] text-neutral-400">Collaborate</p>
        <h3 className="mt-2 font-display text-3xl tracking-tight text-neutral-950 sm:text-4xl">
          Meet your team
          <br />
          where they work
        </h3>
        <ul className="mt-8 space-y-2">
          {CHANNELS.map((c) => {
            const on = c.id === active;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => setActive(c.id)}
                  className={`flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors ${
                    on ? 'bg-neutral-100 ring-1 ring-black/5' : 'hover:bg-neutral-50'
                  }`}
                >
                  <span
                    className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold text-white"
                    style={{ backgroundColor: c.color }}
                  >
                    {c.name[0]}
                  </span>
                  <span>
                    <span className="block text-[14px] font-semibold text-neutral-900">{c.name}</span>
                    {on ? (
                      <span className="mt-0.5 block text-[12px] text-neutral-500">{c.blurb}</span>
                    ) : null}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/** Optimize cards with visual wells — cost / reflect loop / evals flag. */
export function GlOptimizeVisualCards() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <p className="text-[13px] text-neutral-400">Optimize</p>
      <h3 className="mt-2 font-display text-3xl tracking-tight text-neutral-950 sm:text-4xl">
        Optimize Your Agents
      </h3>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {/* Cost */}
        <article className="flex flex-col overflow-hidden rounded-2xl bg-neutral-50 ring-1 ring-black/5">
          <div className="relative flex h-44 items-center justify-center p-4">
            <div className="absolute inset-6 rounded-full border border-dashed border-neutral-200" />
            <div className="relative z-[1] text-center">
              <p className="text-[11px] text-neutral-400">Cost reduction per task</p>
              <p className="mt-1 text-3xl font-semibold tracking-tight text-neutral-900">−78%</p>
              <p className="mt-1 text-[12px]">
                <span className="text-neutral-400 line-through">$0.42</span>{' '}
                <span className="font-semibold text-[#11AC4B]">$0.092</span>
              </p>
            </div>
          </div>
          <div className="border-t border-[var(--color-line)] bg-white p-5">
            <h4 className="text-[15px] font-semibold text-neutral-900">Open-source by default</h4>
            <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-500">
              Run on open-source models and pay a fraction of the cost, with no lock-in and full
              control over where your agents run.
            </p>
          </div>
        </article>

        {/* Reflect loop */}
        <article className="flex flex-col overflow-hidden rounded-2xl bg-neutral-50 ring-1 ring-black/5">
          <div className="relative flex h-44 items-center justify-center">
            <div className="gl-orbit-spin absolute size-28 rounded-full border border-neutral-200" />
            <div className="gl-orbit-spin absolute size-36 rounded-full border border-dashed border-neutral-200/80" />
            <div
              className="relative z-[1] flex size-14 items-center justify-center rounded-full text-white shadow-md"
              style={{ backgroundColor: TROOPERS[3].accent }}
            >
              <TrooperMark trooper={TROOPERS[3]} size={28} />
            </div>
            <span className="absolute top-6 text-[10px] font-medium text-neutral-500">Execute</span>
            <span className="absolute bottom-8 right-10 text-[10px] font-medium text-neutral-500">
              Reflect
            </span>
            <span className="absolute bottom-8 left-10 text-[10px] font-medium text-neutral-500">
              Learn
            </span>
          </div>
          <div className="border-t border-[var(--color-line)] bg-white p-5">
            <h4 className="text-[15px] font-semibold text-neutral-900">Self-improving agents</h4>
            <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-500">
              Agents reflect on their own runs and improve over time, tuning themselves without
              manual intervention.
            </p>
          </div>
        </article>

        {/* Evals */}
        <article className="flex flex-col overflow-hidden rounded-2xl bg-neutral-50 ring-1 ring-black/5">
          <div className="relative flex h-44 items-start justify-end bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:16px_16px] p-5">
            <div className="max-w-[200px] rounded-xl bg-white p-3 shadow-md ring-1 ring-black/5">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
                Flag
              </p>
              <p className="mt-1 text-[12px] leading-snug text-neutral-700">
                Voice &amp; tone passes fell to{' '}
                <span className="font-semibold" style={{ color: TROOPERS[3].accent }}>
                  38 of 46 tasks
                </span>{' '}
                after the latest prompt update.
              </p>
            </div>
          </div>
          <div className="border-t border-[var(--color-line)] bg-white p-5">
            <h4 className="text-[15px] font-semibold text-neutral-900">Evals built in</h4>
            <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-500">
              Built-in evals let you measure quality, catch regressions, and ship improvements with
              confidence.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}

/** Enterprise dark — usage chart + audit + VPC + control strip. */
export function GlEnterpriseDashboard() {
  const controls = [
    { title: 'Roles and permissions', body: 'Scoped access to connectors, secrets, and agents.' },
    { title: 'SAML SSO and SCIM', body: 'Okta, Google, Microsoft — identity in one place.' },
    { title: 'AI model restrictions', body: 'Allow or block models per team or workspace.' },
    { title: 'SOC 2 Type II', body: 'Independently audited and compliant.' },
    { title: 'GDPR', body: 'Zero Data Retention agreements for third-party models.' },
  ];

  return (
    <div className="bg-[#121212] px-5 py-16 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <h3 className="font-display text-3xl tracking-tight sm:text-4xl">Enterprise-grade controls</h3>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <article className="rounded-2xl bg-[#1a1a1a] p-5 ring-1 ring-white/10 lg:col-span-2">
            <div className="flex flex-wrap gap-6 text-[12px] text-white/60">
              <span>
                Credits used: <strong className="text-white">48.6k</strong>
              </span>
              <span>
                Spend: <strong className="text-white">US$243.00</strong>
              </span>
              <span>
                Budget used: <strong className="text-white">86%</strong>
              </span>
            </div>
            <svg viewBox="0 0 480 160" className="mt-6 w-full" aria-hidden>
              <line x1="0" y1="40" x2="480" y2="40" stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4" />
              <text x="8" y="36" fill="rgba(255,255,255,0.35)" fontSize="10">
                Budget
              </text>
              <path
                d="M0 120 C80 110, 120 100, 160 95 S240 90, 280 70 S360 50, 400 35 S460 20, 480 18"
                fill="none"
                stroke="#FB3C98"
                strokeWidth="2"
              />
              <path
                d="M0 130 C100 125, 200 118, 300 112 S420 105, 480 100"
                fill="none"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="1.5"
              />
              <circle cx="360" cy="48" r="4" fill="#FB3C98" />
              <rect x="280" y="8" width="140" height="28" rx="6" fill="#2a2a2a" />
              <text x="290" y="26" fill="#FB3C98" fontSize="10">
                At Risk: Projected overrun
              </text>
            </svg>
            <h4 className="mt-4 text-[15px] font-semibold">Usage monitoring</h4>
            <p className="mt-1 text-[13px] text-white/50">
              Track organization-wide credit usage in real time. Implement budget and quota controls
              to avoid surprises.
            </p>
          </article>

          <div className="flex flex-col gap-4">
            <article className="flex-1 rounded-2xl bg-[#1a1a1a] p-5 ring-1 ring-white/10">
              <h4 className="text-[15px] font-semibold">Audit logging</h4>
              <p className="mt-1 text-[13px] text-white/50">
                Capture detailed audit trails for actions across the organization.
              </p>
              <ul className="mt-4 space-y-2 text-[12px] text-white/70">
                <li className="flex items-center gap-2">
                  <span className="size-1.5 animate-pulse rounded-full bg-[#11AC4B]" /> Capturing…
                </li>
                <li>Rahul invited a new workspace member</li>
                <li>Max created the Data Analyst agent</li>
                <li>Wasay exported the audit log</li>
              </ul>
            </article>
            <article className="rounded-2xl bg-[#1a1a1a] p-5 ring-1 ring-white/10">
              <h4 className="text-[15px] font-semibold">VPC deployments</h4>
              <p className="mt-1 text-[13px] text-white/50">
                Deploy inside your own AWS, Azure, or Google Cloud environment.
              </p>
              <div className="mt-3 flex gap-2 text-[11px] font-medium text-white/80">
                <span className="rounded-md bg-white/10 px-2 py-1">AWS</span>
                <span className="rounded-md bg-white/10 px-2 py-1">Azure</span>
                <span className="rounded-md bg-white/10 px-2 py-1">GCP</span>
              </div>
            </article>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {controls.map((c) => (
            <div key={c.title} className="rounded-xl bg-[#1a1a1a] p-4 ring-1 ring-white/10">
              <h5 className="text-[13px] font-semibold">{c.title}</h5>
              <p className="mt-1 text-[11px] leading-relaxed text-white/45">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

