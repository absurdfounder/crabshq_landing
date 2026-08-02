'use client';

import {
  Check, Loader2, Megaphone, Palette, Play, Users, Target, FileText,
} from 'lucide-react';
import { DemoFavicon } from '@trooper/demo';
import { DemoBrowserFrame } from '@trooper/demo';
import { demoAssetPath as assetPath, DEMO_MEDIA } from '@trooper/demo';
import { VignetteChrome, ProviderChip } from './shared';

const campaignSrc = assetPath('marketing', 'campaign.html');

const CAMPAIGN_LANES = [
  {
    provider: 'Claude Code',
    agent: 'Ren',
    channel: 'Landing',
    summary: 'Pillar page + CTA',
    steps: [
      { label: 'Hero and CTA drafted', done: true },
      { label: 'Live preview open', done: true },
      { label: 'Meta tags finishing', running: true },
    ],
  },
  {
    provider: 'Codex',
    agent: 'Ren',
    channel: 'Creative',
    summary: 'Carousel slides',
    steps: [
      { label: 'Slide 1 ready', done: true },
      { label: 'Slides 2–3 rendering', running: true },
    ],
  },
  {
    provider: 'Trooper',
    agent: 'Aria',
    channel: 'SEO',
    summary: 'Competitor recon',
    steps: [
      { label: 'Landing audit done', done: true },
      { label: 'Keyword map updated', done: true },
      { label: 'Gap brief drafting', running: true },
    ],
  },
];

const APPROVE_CHANNELS = [
  { name: 'Blog', status: 'done' as const, detail: 'Pillar draft ready' },
  { name: 'LinkedIn', status: 'ready' as const, detail: 'Carousel queued' },
  { name: 'Email', status: 'ready' as const, detail: 'Nurture sequence held' },
  { name: 'Social video', status: 'pending' as const, detail: 'Waiting on approval' },
];

const MEMORY_CARDS = [
  {
    title: 'Voice',
    icon: Megaphone,
    lines: [
      { k: 'Tone', v: 'Direct, ops-native' },
      { k: 'Avoid', v: 'Hype and fluff' },
      { k: 'CTA', v: 'Book a demo' },
    ],
  },
  {
    title: 'Audience',
    icon: Users,
    lines: [
      { k: 'Who', v: 'Eng leads, lean teams' },
      { k: 'Pain', v: 'Tool-switching' },
      { k: 'Proof', v: 'Traced tickets' },
    ],
  },
  {
    title: 'Competitors',
    icon: Target,
    lines: [
      { k: 'Gap', v: 'Multi-agent canvas' },
      { k: 'Price', v: 'BYOA vs seats' },
      { k: 'Last', v: 'Q2 SEO recon' },
    ],
  },
  {
    title: 'Style',
    icon: Palette,
    lines: [
      { k: 'Color', v: 'Trooper green' },
      { k: 'Type', v: 'Funnel Display' },
      { k: 'Social', v: '1080×1080 carousel' },
    ],
  },
];

function StepRow({ label, done, running }: { label: string; done?: boolean; running?: boolean }) {
  return (
    <div className="flex items-center gap-2 py-1 text-[11px] leading-snug">
      {done ? (
        <Check size={12} className="shrink-0 text-trooper" />
      ) : running ? (
        <Loader2 size={12} className="shrink-0 animate-spin text-amber-600" />
      ) : (
        <span className="h-2.5 w-2.5 shrink-0 rounded-full border border-stone-300" />
      )}
      <span className={done ? 'text-stone-700' : running ? 'font-medium text-stone-900' : 'text-stone-400'}>
        {label}
      </span>
    </div>
  );
}

/** Parallel campaign lanes — one mission, three workstreams. */
export function MarketingHarnessVisual() {
  return (
    <VignetteChrome label="Campaign · parallel work">
      <div className="border-b border-stone-100 bg-white px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="mb-1.5 flex items-center gap-2">
              <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-stone-400">
                Marketing mission
              </span>
              <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                In progress
              </span>
            </div>
            <h4 className="truncate text-[13px] font-semibold leading-snug text-stone-900 sm:text-sm">
              Ship the campaign — landing, creative, SEO
            </h4>
          </div>
          <div className="flex shrink-0 -space-x-1.5">
            {['Ren', 'Aria', 'Jordan'].map((name) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={name}
                src={`https://i.pravatar.cc/150?u=agent-${name.toLowerCase()}`}
                alt=""
                className="h-6 w-6 rounded-full object-cover ring-2 ring-white"
              />
            ))}
          </div>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-stone-500">
          <span className="inline-flex items-center gap-1.5 rounded border border-stone-200 bg-stone-50 px-2 py-0.5">
            <DemoFavicon domain="northstar.io" size={12} rounded="sm" />
            northstar.io/q2
          </span>
          <span>3 agents · working in parallel</span>
        </div>
      </div>

      <div className="grid min-h-[220px] grid-cols-3 divide-x divide-stone-100 bg-white">
        {CAMPAIGN_LANES.map((lane, idx) => (
          <div key={lane.channel} className={`flex flex-col ${idx === 0 ? 'bg-trooper-50/25' : ''}`}>
            <div className="flex items-center gap-2 border-b border-stone-100 bg-stone-50/80 px-3 py-2.5">
              <ProviderChip provider={lane.provider} size={16} />
              <div className="min-w-0">
                <div className="truncate text-[12px] font-semibold text-stone-900">{lane.channel}</div>
                <div className="truncate text-[11px] text-stone-500">{lane.summary}</div>
              </div>
            </div>
            <div className="flex-1 space-y-0.5 px-3 py-2.5">
              {lane.steps.map((s) => (
                <StepRow key={s.label} label={s.label} done={s.done} running={s.running} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-stone-100 bg-[#FAF9F6] px-4 py-2.5 text-[11px]">
        <span className="text-stone-500">5 of 7 steps done</span>
        <span className="inline-flex items-center gap-1.5 font-medium text-trooper-700">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-trooper opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-trooper" />
          </span>
          Live
        </span>
      </div>
    </VignetteChrome>
  );
}

/** Approve before publish — channel checklist, not file windows. */
export function MarketingLaunchVisual() {
  return (
    <VignetteChrome label="Publish · approval gate">
      <div className="border-b border-stone-100 bg-[#FAF9F6] px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-stone-400">
            Channels · one mission
          </span>
          <span className="rounded border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
            Hold for approve
          </span>
        </div>
        <p className="mt-1.5 text-[12px] leading-relaxed text-stone-600">
          Blog, social, email, and video are ready — nothing publishes until you say so.
        </p>
      </div>
      <div className="min-h-[220px] space-y-2 bg-white p-4">
        {APPROVE_CHANNELS.map((ch) => (
          <div
            key={ch.name}
            className="flex items-center gap-3 rounded-lg border border-stone-100 px-3.5 py-3"
          >
            <div
              className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                ch.status === 'done'
                  ? 'bg-trooper'
                  : ch.status === 'ready'
                    ? 'bg-amber-500'
                    : 'bg-stone-300'
              }`}
            />
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-semibold text-stone-900">{ch.name}</div>
              <div className="truncate text-[11px] text-stone-500">{ch.detail}</div>
            </div>
            <span className="shrink-0 text-[11px] font-medium text-stone-400">
              {ch.status === 'done' ? 'Done' : ch.status === 'ready' ? 'Ready' : 'Held'}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-stone-100 bg-white px-4 py-2.5 text-[11px]">
        <span className="text-stone-500">You approve · then it schedules</span>
        <span className="font-medium text-amber-700">Waiting on review</span>
      </div>
    </VignetteChrome>
  );
}

/** Brand memory — human category cards, no file paths. */
export function MarketingMemoryVisual() {
  return (
    <VignetteChrome label="Brand · memory">
      <div className="border-b border-stone-100 bg-[#FAF9F6] px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-stone-400">
            Loaded on every campaign
          </span>
          <span className="rounded border border-trooper-200 bg-trooper-50 px-2 py-0.5 text-[10px] font-semibold text-trooper-800">
            Persisted
          </span>
        </div>
        <p className="mt-1.5 text-[12px] leading-relaxed text-stone-600">
          Voice, audience, competitors, and style — no re-briefing each time.
        </p>
      </div>
      <div className="grid min-h-[240px] grid-cols-2 gap-px bg-stone-100">
        {MEMORY_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="flex flex-col bg-white p-3.5">
              <div className="mb-2.5 flex items-center gap-2 border-b border-stone-50 pb-2">
                <Icon size={14} className="shrink-0 text-stone-400" />
                <span className="text-[13px] font-semibold text-stone-900">{card.title}</span>
              </div>
              <div className="flex-1 space-y-1.5">
                {card.lines.map((line) => (
                  <div key={line.k} className="flex gap-2 text-[11px] leading-snug">
                    <span className="w-16 shrink-0 text-stone-400">{line.k}</span>
                    <span className="truncate text-stone-800">{line.v}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between border-t border-stone-100 bg-white px-4 py-2.5 text-[11px]">
        <span className="text-stone-500">Shared across the marketing team</span>
        <span className="font-medium text-trooper-700">Always on</span>
      </div>
    </VignetteChrome>
  );
}

/** Board row = approve-before-publish checklist. */
export function MarketingBoardVisual() {
  return <MarketingLaunchVisual />;
}

/** Pack review — hero preview + labeled thumbs, not 2×2 file windows. */
export function MarketingCanvasVisual() {
  return (
    <VignetteChrome label="Review · campaign pack">
      <div className="border-b border-stone-100 bg-white px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-stone-400">
            Deliverables
          </span>
          <span className="rounded border border-trooper-200 bg-trooper-50 px-2 py-0.5 text-[10px] font-semibold text-trooper-800">
            Ready for review
          </span>
        </div>
        <h4 className="mt-1.5 text-[13px] font-semibold text-stone-900 sm:text-sm">
          See the whole pack before you approve
        </h4>
      </div>

      <div className="bg-white p-4">
        <div className="overflow-hidden rounded-lg border border-stone-200 shadow-sm">
          <DemoBrowserFrame
            src={campaignSrc}
            addressUrl="northstar.io/q2"
            faviconDomain="northstar.io"
            title="Landing preview"
          />
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="overflow-hidden rounded-lg border border-stone-200 bg-stone-50">
            <div className="border-b border-stone-100 px-2.5 py-1.5 text-[11px] font-semibold text-stone-800">
              Brief
            </div>
            <div className="space-y-1 p-2.5 text-[11px] leading-snug text-stone-600">
              <p className="font-medium text-stone-800">Campaign brief</p>
              <p>Landing · carousel · nurture</p>
              <p className="text-trooper-700">Awaiting brand review</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-stone-200">
            <div className="border-b border-stone-100 px-2.5 py-1.5 text-[11px] font-semibold text-stone-800">
              Carousel
            </div>
            <div className="relative h-[72px] overflow-hidden bg-stone-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={DEMO_MEDIA.linkedinCarousel}
                alt=""
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-900/70 to-transparent px-2 pb-1.5 pt-3">
                <p className="text-[10px] font-medium text-white">3 slides</p>
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-stone-200 bg-white">
            <div className="border-b border-stone-100 px-2.5 py-1.5 text-[11px] font-semibold text-stone-800">
              Email
            </div>
            <div className="space-y-1 p-2.5 text-[11px] leading-snug text-stone-600">
              <p className="font-medium text-stone-800">Nurture sequence</p>
              <p>3-part launch → proof → CTA</p>
              <p className="rounded border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-800">
                Held for sign-off
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-stone-100 bg-[#FAF9F6] px-4 py-2.5 text-[11px]">
        <span className="inline-flex items-center gap-1.5 text-stone-500">
          <FileText size={12} className="text-stone-400" />
          4 deliverables
        </span>
        <span className="inline-flex items-center gap-1.5 font-medium text-stone-600">
          <Play size={11} className="text-stone-400" />
          Ready for brand review
        </span>
      </div>
    </VignetteChrome>
  );
}
