'use client';

import { Check, Clock, Mail, Plus } from 'lucide-react';
import { DemoFavicon } from '@trooper/demo';
import { VignetteChrome, TrooperMark } from './shared';

const THREADS = [
  {
    name: 'Maya Chen',
    snippet: 'Can we move the demo to Thursday?',
    tag: 'Client',
    tagClass: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    domain: 'linkedin.com',
    gradient: 'from-rose-400 to-violet-500',
  },
  {
    name: 'Noah Patel',
    snippet: 'Loved the changelog — shipping notes?',
    tag: 'New lead',
    tagClass: 'border-sky-200 bg-sky-50 text-sky-800',
    domain: 'x.com',
    gradient: 'from-teal-400 to-emerald-500',
  },
  {
    name: 'Acme Ops',
    snippet: 'Invoice #4412 — need a receipt',
    tag: 'Replied',
    tagClass: 'border-rose-200 bg-rose-50 text-rose-800',
    domain: 'gmail.com',
    gradient: 'from-amber-400 to-orange-500',
    unread: true,
  },
  {
    name: 'Jordan Lee',
    snippet: 'Voice note about the launch week',
    tag: 'In talks',
    tagClass: 'border-violet-200 bg-violet-50 text-violet-800',
    domain: 'whatsapp.com',
    gradient: 'from-sky-400 to-indigo-500',
  },
  {
    name: 'Studio North',
    snippet: 'Story draft ready for your eyes',
    tag: 'Follow up',
    tagClass: 'border-amber-200 bg-amber-50 text-amber-800',
    domain: 'instagram.com',
    gradient: 'from-fuchsia-400 to-pink-500',
  },
] as const;

/** Unified CRM inbox — every channel in one place, no terminals. */
export function InboxUnifiedVisual() {
  return (
    <VignetteChrome label="powerful inbox">
      <div className="flex items-center gap-1 border-b border-stone-100 px-3 py-2.5">
        {['All', 'Leads', 'Clients', 'Follow-ups'].map((tab, i) => (
          <span
            key={tab}
            className={`rounded-lg px-2.5 py-1 text-[12px] font-medium ${
              i === 0 ? 'bg-stone-900 text-white' : 'text-stone-500'
            }`}
          >
            {tab}
          </span>
        ))}
        <span className="ml-auto rounded-lg bg-stone-50 px-2.5 py-1 text-[11px] text-stone-400 ring-1 ring-stone-200/70">
          Search
        </span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col bg-[#FAF9F6]">
        {THREADS.map((t) => (
          <div
            key={t.name}
            className="flex items-center gap-3 border-b border-stone-100/80 bg-white px-3.5 py-3"
          >
            <div className="relative shrink-0">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${t.gradient} text-[12px] font-semibold text-white`}
              >
                {t.name
                  .split(' ')
                  .map((p) => p[0])
                  .join('')
                  .slice(0, 2)}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white ring-1 ring-stone-200">
                <DemoFavicon domain={t.domain} size={10} rounded="sm" />
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate text-[13px] font-semibold text-stone-900">{t.name}</span>
                {'unread' in t && t.unread ? (
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                ) : null}
              </div>
              <p className="truncate text-[12px] text-stone-500">{t.snippet}</p>
            </div>
            <span
              className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${t.tagClass}`}
            >
              {t.tag}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 border-t border-stone-100 bg-white px-3.5 py-2.5 text-[12px] text-stone-500">
        <TrooperMark className="h-3.5 w-3.5" />
        <span>LinkedIn · Gmail · WhatsApp · Instagram · X — one inbox</span>
      </div>
    </VignetteChrome>
  );
}

/** Digest / outreach composer — agents draft, you schedule. */
export function InboxComposeVisual() {
  return (
    <VignetteChrome label="compose">
      <div className="flex items-center justify-between gap-3 border-b border-stone-100 px-3.5 py-3">
        <div className="flex min-w-0 items-center gap-2 text-[13px]">
          <span className="text-stone-400">← Inbox</span>
          <span className="text-stone-300">/</span>
          <span className="truncate font-semibold text-stone-900">Weekly digest</span>
          <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-stone-500">
            Draft
          </span>
        </div>
        <span className="shrink-0 rounded-full bg-stone-900 px-3 py-1.5 text-[12px] font-medium text-white">
          Schedule →
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 bg-[#FAF9F6] p-3">
        <div className="rounded-xl bg-white p-3.5 ring-1 ring-stone-200/70">
          <div className="text-[11px] font-medium text-stone-400">Subject line</div>
          <div className="mt-1 text-[15px] font-semibold text-stone-900">
            Your weekly digest is here
          </div>
        </div>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl bg-white ring-1 ring-stone-200/70">
          <div className="flex items-center gap-1 border-b border-stone-100 px-3 py-2 text-[12px] text-stone-500">
            <span className="px-2 py-1">Paragraph ⌄</span>
            <span className="mx-1 h-4 w-px bg-stone-200" />
            <span className="px-2 font-bold">B</span>
            <span className="px-2 italic">I</span>
            <span className="px-2 underline">U</span>
            <span className="mx-1 h-4 w-px bg-stone-200" />
            <span className="font-mono text-[11px] text-trooper">{'{}'}</span>
          </div>
          <div className="space-y-3 p-4 text-[14px] leading-relaxed text-stone-700">
            <p>
              Hey{' '}
              <span className="rounded bg-trooper-50 px-1.5 py-0.5 font-mono text-[12px] text-trooper-800">
                {'{{contact.first_name}}'}
              </span>
              ,
            </p>
            <p>
              Three things worth your time this week — short, clear, and ready for your customers.
            </p>
            <p className="text-stone-400">Keep writing here…</p>
          </div>
        </div>
      </div>
    </VignetteChrome>
  );
}

/** Smart campaign — new post → newsletter queued. */
export function InboxCampaignVisual() {
  return (
    <VignetteChrome label="campaign">
      <div className="flex items-center gap-3 border-b border-stone-100 px-3.5 py-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-trooper-50 text-trooper">
          <Mail size={16} strokeWidth={2} />
        </span>
        <div className="min-w-0">
          <div className="text-[14px] font-semibold text-stone-900">Smart Campaign</div>
          <div className="text-[12px] text-stone-500">Connected to your blog & changelog</div>
        </div>
        <span className="ml-auto rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
          Active
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 bg-[#FAF9F6] p-3">
        <div className="flex items-stretch gap-2.5">
          <div className="flex-1 rounded-xl bg-white p-3 ring-1 ring-stone-200/70">
            <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-stone-400">
              New post detected
            </div>
            <div className="text-[13px] font-semibold leading-snug text-stone-900">
              5 ways to grow your list
            </div>
          </div>
          <div className="flex items-center text-stone-300">→</div>
          <div className="flex-1 rounded-xl border border-trooper-200 bg-trooper-50/60 p-3">
            <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-trooper-800">
              Newsletter ready
            </div>
            <div className="text-[13px] font-semibold leading-snug text-stone-900">
              Scheduled for Fri, 9:00 AM
            </div>
          </div>
        </div>
        <div className="mt-auto flex items-center gap-2 rounded-xl bg-white px-3.5 py-3 text-[13px] text-stone-600 ring-1 ring-stone-200/70">
          <TrooperMark className="h-4 w-4 shrink-0" />
          <span>Trooper wrote & queued this for your audience automatically.</span>
        </div>
      </div>
    </VignetteChrome>
  );
}

/** Simple vertical automation — welcome / drip / follow-up. */
export function InboxAutomationsVisual() {
  const steps = [
    {
      label: 'New subscriber joins',
      icon: <Plus size={13} strokeWidth={2.5} />,
      tone: 'bg-emerald-50 text-emerald-700',
      ring: 'ring-stone-200/70',
    },
    {
      label: 'Wait 1 day',
      icon: <Clock size={13} strokeWidth={2} />,
      tone: 'bg-amber-50 text-amber-700',
      ring: 'ring-stone-200/70',
    },
    {
      label: 'Send welcome email',
      icon: <Mail size={13} strokeWidth={2} />,
      tone: 'bg-trooper-50 text-trooper-800',
      ring: 'ring-trooper-200',
    },
  ] as const;

  return (
    <VignetteChrome label="automations">
      <div className="border-b border-stone-100 px-3.5 py-3">
        <h4 className="text-[15px] font-semibold text-stone-900">Unlimited automations</h4>
        <p className="mt-1 text-[13px] leading-relaxed text-stone-600">
          Welcome series, changelog digests, and follow-ups — set once, agents keep them running.
        </p>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-0 bg-[#FAF9F6] px-4 py-5">
        {steps.map((step, i) => (
          <div key={step.label} className="flex w-full max-w-[260px] flex-col items-center">
            <div
              className={`flex w-full items-center gap-2.5 rounded-xl bg-white px-3.5 py-3 shadow-sm ring-1 ${step.ring}`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${step.tone}`}
              >
                {step.icon}
              </span>
              <span className="text-[13px] font-semibold text-stone-800">{step.label}</span>
              {i === steps.length - 1 ? (
                <Check size={14} className="ml-auto text-trooper" strokeWidth={2.5} />
              ) : null}
            </div>
            {i < steps.length - 1 ? (
              <div className="h-4 w-0.5 bg-stone-200" aria-hidden />
            ) : null}
          </div>
        ))}
      </div>
    </VignetteChrome>
  );
}
