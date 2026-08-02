'use client';

import { Check, FileText, Loader2, Megaphone, Play, Search } from 'lucide-react';
import { DemoFavicon, DemoBrowserFrame, demoAssetPath as assetPath, DEMO_MEDIA } from '@trooper/demo';
import { VignetteChrome } from './shared';
import { AppDocPanel } from './productSurfaces';

const campaignSrc = assetPath('marketing', 'campaign.html');

function Step({ label, done, running }: { label: string; done?: boolean; running?: boolean }) {
  return (
    <div className="flex items-center gap-2 text-[12px] leading-snug">
      {done ? (
        <Check size={13} className="shrink-0 text-trooper" />
      ) : running ? (
        <Loader2 size={13} className="shrink-0 animate-spin text-amber-600" />
      ) : (
        <span className="h-3 w-3 shrink-0 rounded-full border border-stone-300" />
      )}
      <span className={running ? 'font-medium text-stone-900' : done ? 'text-stone-600' : 'text-stone-400'}>
        {label}
      </span>
    </div>
  );
}

/**
 * Parallel campaign workstreams — landing / creative / SEO.
 * Marketing surfaces only: browser, assets, brief. No coding CLIs.
 */
export function MarketingHarnessVisual() {
  return (
    <VignetteChrome label="campaign">
      <div className="border-b border-stone-100 px-3.5 py-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-stone-400">
            Marketing mission
          </span>
          <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[9px] font-bold uppercase text-amber-800">
            In progress
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded border border-stone-200 bg-stone-50 px-2 py-0.5 text-[11px] text-stone-600">
            <DemoFavicon domain="northstar.io" size={12} rounded="sm" />
            northstar.io/q2
          </span>
        </div>
        <h4 className="mt-1.5 text-[14px] font-semibold text-stone-900">
          Ship the campaign — landing, creative, SEO
        </h4>
        <div className="mt-2 flex -space-x-1.5">
          {['Ren', 'Aria', 'Jordan'].map((name) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={name}
              src={`https://i.pravatar.cc/150?u=agent-${name.toLowerCase()}`}
              alt=""
              className="h-6 w-6 rounded-full object-cover ring-2 ring-white"
            />
          ))}
          <span className="ml-3 self-center text-[11px] text-stone-500">3 agents · in parallel</span>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-1 divide-y divide-stone-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {/* Landing */}
        <div className="flex min-h-0 flex-col bg-white">
          <div className="flex items-center gap-2 border-b border-stone-100 px-3 py-2">
            <Megaphone size={14} className="text-stone-400" />
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-semibold text-stone-900">Landing</div>
              <div className="text-[11px] text-stone-500">Pillar page + CTA</div>
            </div>
            <span className="rounded-full bg-amber-50 px-1.5 py-0.5 text-[9px] font-medium text-amber-800">
              Working
            </span>
          </div>
          <div className="min-h-[100px] flex-1 overflow-hidden border-b border-stone-100">
            <DemoBrowserFrame
              src={campaignSrc}
              addressUrl="northstar.io/q2"
              faviconDomain="northstar.io"
              title="Preview"
              compact
            />
          </div>
          <div className="space-y-1.5 px-3 py-2.5">
            <Step label="Hero and CTA drafted" done />
            <Step label="Live preview open" done />
            <Step label="Meta tags finishing" running />
          </div>
        </div>

        {/* Creative */}
        <div className="flex min-h-0 flex-col bg-white">
          <div className="flex items-center gap-2 border-b border-stone-100 px-3 py-2">
            <Play size={14} className="text-stone-400" />
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-semibold text-stone-900">Creative</div>
              <div className="text-[11px] text-stone-500">Carousel slides</div>
            </div>
            <span className="rounded-full bg-amber-50 px-1.5 py-0.5 text-[9px] font-medium text-amber-800">
              Working
            </span>
          </div>
          <div className="relative min-h-[100px] flex-1 overflow-hidden border-b border-stone-100 bg-stone-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={DEMO_MEDIA.linkedinCarousel}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-900/70 to-transparent px-2.5 pb-2 pt-6">
              <p className="text-[11px] font-medium text-white">Slide 1 of 3</p>
            </div>
          </div>
          <div className="space-y-1.5 px-3 py-2.5">
            <Step label="Slide 1 ready" done />
            <Step label="Slides 2–3 rendering" running />
          </div>
        </div>

        {/* SEO */}
        <div className="flex min-h-0 flex-col bg-white">
          <div className="flex items-center gap-2 border-b border-stone-100 px-3 py-2">
            <Search size={14} className="text-stone-400" />
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-semibold text-stone-900">SEO</div>
              <div className="text-[11px] text-stone-500">Competitor recon</div>
            </div>
            <span className="rounded-full bg-stone-100 px-1.5 py-0.5 text-[9px] font-medium text-stone-600">
              Ready
            </span>
          </div>
          <div className="min-h-[100px] flex-1 space-y-2 border-b border-stone-100 bg-[#FAF9F6] px-3 py-2.5 text-[12px]">
            <div className="rounded-lg bg-white px-2.5 py-2 ring-1 ring-stone-200/70">
              <div className="font-medium text-stone-900">Keyword map</div>
              <div className="mt-0.5 text-stone-500">42 terms · gap brief drafting</div>
            </div>
            <div className="rounded-lg bg-white px-2.5 py-2 ring-1 ring-stone-200/70">
              <div className="font-medium text-stone-900">Competitor audit</div>
              <div className="mt-0.5 text-trooper-700">Landing gaps flagged</div>
            </div>
          </div>
          <div className="space-y-1.5 px-3 py-2.5">
            <Step label="Landing audit done" done />
            <Step label="Keyword map updated" done />
            <Step label="Gap brief drafting" running />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-stone-100 bg-[#FAF9F6] px-3.5 py-2.5 text-[12px]">
        <span className="text-stone-500">One mission · three workstreams</span>
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

export function MarketingLaunchVisual() {
  return (
    <VignetteChrome label="approve">
      <div className="border-b border-stone-100 bg-[#FAF9F6] px-3.5 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-stone-400">
            Publish gate
          </span>
          <span className="rounded border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
            Hold for approve
          </span>
        </div>
        <p className="mt-1 text-[13px] text-stone-600">
          Nothing publishes until you say so.
        </p>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-0 sm:grid-cols-2">
        <div className="border-b border-stone-100 sm:border-b-0 sm:border-r">
          <DemoBrowserFrame
            src={campaignSrc}
            addressUrl="northstar.io/q2"
            faviconDomain="northstar.io"
            title="Landing"
            compact
          />
        </div>
        <div className="flex flex-col gap-2 bg-[#FAF9F6] p-3">
          <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2.5 ring-1 ring-neutral-200/70">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={DEMO_MEDIA.linkedinCarousel} alt="" className="h-12 w-12 rounded object-cover" />
            <div>
              <div className="text-[13px] font-semibold text-stone-900">LinkedIn carousel</div>
              <div className="text-[11px] text-amber-700">3 slides · held</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2.5 ring-1 ring-neutral-200/70">
            <FileText size={18} className="text-stone-400" />
            <div>
              <div className="text-[13px] font-semibold text-stone-900">Nurture sequence</div>
              <div className="text-[11px] text-amber-700">3-part · held</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-stone-900 px-3 py-2.5">
            <Play size={16} className="text-white" fill="white" />
            <div>
              <div className="text-[13px] font-semibold text-stone-100">Social cut</div>
              <div className="text-[11px] text-stone-400">24s · waiting</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-stone-100 px-3.5 py-2.5 text-[12px]">
        <span className="text-stone-500">You approve · then it schedules</span>
        <span className="font-medium text-amber-700">Waiting on review</span>
      </div>
    </VignetteChrome>
  );
}

export function MarketingMemoryVisual() {
  return (
    <VignetteChrome label="brand">
      <div className="border-b border-stone-100 bg-[#FAF9F6] px-3.5 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-stone-400">
            Brand memory
          </span>
          <span className="rounded border border-trooper-200 bg-trooper-50 px-2 py-0.5 text-[10px] font-semibold text-trooper-800">
            Always on
          </span>
        </div>
        <p className="mt-1 text-[13px] text-stone-600">
          Voice, audience, and style — loaded on every campaign.
        </p>
      </div>
      <div className="flex-1 p-3">
        <AppDocPanel filename="Brand guidelines" badge="northstar">
          <p className="mb-3 text-[13px] font-semibold text-neutral-900">Voice</p>
          <p className="mb-1">- Tone: direct, ops-native</p>
          <p className="mb-1">- Avoid: hype and fluff</p>
          <p className="mb-4">- CTA: Book a demo</p>
          <p className="mb-3 text-[13px] font-semibold text-neutral-900">Audience</p>
          <p className="mb-1">- Eng leads and lean teams</p>
          <p className="mb-4">- Pain: tool-switching · Proof: traced tickets</p>
          <p className="mb-3 text-[13px] font-semibold text-neutral-900">Style</p>
          <p>- Color: Trooper green · Social: 1080×1080 carousel</p>
        </AppDocPanel>
      </div>
      <div className="flex items-center justify-between border-t border-stone-100 bg-[#FAF9F6] px-3.5 py-2.5 text-[12px]">
        <span className="text-stone-500">Shared across the marketing team</span>
        <span className="font-medium text-trooper-700">Persisted</span>
      </div>
    </VignetteChrome>
  );
}

export function MarketingBoardVisual() {
  return <MarketingLaunchVisual />;
}

export function MarketingCanvasVisual() {
  return (
    <VignetteChrome label="pack">
      <div className="border-b border-stone-100 px-3.5 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-stone-400">
            Campaign pack
          </span>
          <span className="rounded border border-trooper-200 bg-trooper-50 px-2 py-0.5 text-[10px] font-semibold text-trooper-800">
            Ready for review
          </span>
        </div>
        <h4 className="mt-1 text-[14px] font-semibold text-stone-900">
          See the whole pack before you approve
        </h4>
      </div>

      <div className="flex-1">
        <DemoBrowserFrame
          src={campaignSrc}
          addressUrl="northstar.io/q2"
          faviconDomain="northstar.io"
          title="Landing preview"
          compact
        />
        <div className="grid grid-cols-3 divide-x divide-stone-100 border-t border-stone-100">
          <div className="bg-white p-3 text-[12px] leading-snug text-stone-600">
            <div className="mb-1 font-semibold text-stone-900">Brief</div>
            <p>Landing · carousel · nurture</p>
            <p className="mt-1 text-trooper-700">Awaiting brand review</p>
          </div>
          <div className="bg-white">
            <div className="border-b border-stone-100 px-3 py-1.5 text-[12px] font-semibold text-stone-900">
              Carousel
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={DEMO_MEDIA.linkedinCarousel} alt="" className="h-[80px] w-full object-cover" />
          </div>
          <div className="bg-[#FAF9F6] p-3 text-[12px] leading-snug">
            <div className="mb-1 font-semibold text-stone-900">Schedule</div>
            <p className="text-stone-600">Blog · ready</p>
            <p className="text-stone-600">Email · held</p>
            <p className="mt-1 font-medium text-amber-700">Waiting on approve</p>
          </div>
        </div>
      </div>
    </VignetteChrome>
  );
}
