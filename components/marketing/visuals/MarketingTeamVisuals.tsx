'use client';

import { FileText, Play } from 'lucide-react';
import { DemoFavicon } from '@trooper/demo';
import { DemoBrowserFrame } from '@trooper/demo';
import { demoAssetPath as assetPath, DEMO_MEDIA } from '@trooper/demo';
import { VignetteChrome } from './shared';
import {
  AcpCliPane,
  AppDocPanel,
  AppTerminalPanel,
  type AcpToolLine,
} from './productSurfaces';

const campaignSrc = assetPath('marketing', 'campaign.html');

const CAMPAIGN_LANES: {
  provider: string;
  status: 'working' | 'ready';
  branch: string;
  file: string;
  diff: string;
  highlight?: boolean;
  tools: AcpToolLine[];
}[] = [
  {
    provider: 'Claude Code',
    status: 'working',
    branch: 'campaign/q2-pillar',
    file: 'landing/campaign.html',
    diff: '+48 −6',
    highlight: true,
    tools: [
      { label: 'write_file', detail: 'hero + CTA draft', done: true },
      { label: 'browser_open', detail: 'northstar.io/q2 preview', done: true },
      { label: 'apply_patch', detail: 'meta tags + og:image', running: true },
    ],
  },
  {
    provider: 'Codex',
    status: 'working',
    branch: 'campaign/q2-creative',
    file: 'creative/linkedin-carousel.png',
    diff: '+3 slides',
    tools: [
      { label: 'generate_image', detail: 'slide 1 ready', done: true },
      { label: 'generate_image', detail: 'slides 2–3 rendering', running: true },
    ],
  },
  {
    provider: 'Trooper',
    status: 'ready',
    branch: 'campaign/q2-seo',
    file: 'seo/gap-brief.md',
    diff: 'audit ✓',
    tools: [
      { label: 'browser_navigate', detail: 'competitor landing audit', done: true },
      { label: 'write_file', detail: 'keyword map updated', done: true },
      { label: 'write_file', detail: 'gap brief drafting', running: true },
    ],
  },
];

/** Parallel campaign — ACP CLI panes with tool traces. */
export function MarketingHarnessVisual() {
  return (
    <VignetteChrome label="Campaign · ACP harness">
      <div className="border-b border-stone-100 bg-white px-3 py-2.5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="mb-1 flex items-center gap-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-stone-400">
                Marketing · Q2
              </span>
              <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide text-amber-800">
                In progress
              </span>
            </div>
            <h4 className="truncate text-[13px] font-semibold leading-snug text-stone-900">
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
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded border border-stone-200 bg-stone-50 px-1.5 py-0.5 font-mono text-[8px] text-stone-600">
            <DemoFavicon domain="northstar.io" size={10} rounded="sm" />
            northstar.io/q2
          </span>
          <span className="font-mono text-[8px] text-stone-400">
            Claude Code · Codex · Trooper
          </span>
        </div>
      </div>

      <div className="grid min-h-[240px] grid-cols-3 divide-x divide-stone-200 bg-white">
        {CAMPAIGN_LANES.map((lane) => (
          <AcpCliPane key={lane.provider} {...lane} />
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-stone-100 bg-[#FAF9F6] px-3 py-2">
        <span className="font-mono text-[9px] text-stone-500">
          One mission · three CLIs
        </span>
        <span className="inline-flex items-center gap-1 font-mono text-[9px] text-trooper-700">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-trooper opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-trooper" />
          </span>
          Live tool traces
        </span>
      </div>
    </VignetteChrome>
  );
}

/** Approve gate — artifact strip + hold, not abstract status dots. */
export function MarketingLaunchVisual() {
  return (
    <VignetteChrome label="Publish · approval gate">
      <div className="border-b border-stone-100 bg-[#FAF9F6] px-3 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-stone-400">
            Channels · one mission
          </span>
          <span className="rounded border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
            Hold for approve
          </span>
        </div>
        <p className="mt-1.5 text-[12px] leading-relaxed text-stone-600">
          Blog, social, email, and video are staged — nothing publishes until you say so.
        </p>
      </div>

      <div className="grid min-h-[220px] grid-cols-2 gap-2 bg-white p-3">
        <div className="overflow-hidden rounded-lg ring-1 ring-neutral-200/55">
          <DemoBrowserFrame
            src={campaignSrc}
            addressUrl="northstar.io/q2"
            faviconDomain="northstar.io"
            title="Landing"
            compact
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-1 items-center gap-2 overflow-hidden rounded-lg bg-white px-2.5 py-2 ring-1 ring-neutral-200/55">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={DEMO_MEDIA.linkedinCarousel}
              alt=""
              className="h-10 w-10 shrink-0 rounded object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="truncate font-mono text-[11px] font-medium text-stone-900">
                linkedin-carousel.png
              </div>
              <div className="text-[10px] text-amber-700">Ready · held</div>
            </div>
          </div>
          <div className="flex flex-1 items-center gap-2 overflow-hidden rounded-lg bg-white px-2.5 py-2 ring-1 ring-neutral-200/55">
            <FileText size={16} className="shrink-0 text-stone-400" />
            <div className="min-w-0 flex-1">
              <div className="truncate font-mono text-[11px] font-medium text-stone-900">
                nurture-seq.md
              </div>
              <div className="text-[10px] text-amber-700">3-part · held</div>
            </div>
          </div>
          <div className="flex flex-1 items-center gap-2 overflow-hidden rounded-lg bg-stone-950 px-2.5 py-2 ring-1 ring-stone-800">
            <Play size={14} className="shrink-0 text-white" fill="white" />
            <div className="min-w-0 flex-1">
              <div className="truncate font-mono text-[11px] font-medium text-stone-200">
                social-cut.mp4
              </div>
              <div className="text-[10px] text-stone-500">24s · waiting</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-stone-100 bg-white px-3 py-2.5 text-[11px]">
        <span className="text-stone-500">You approve · then it schedules</span>
        <span className="font-medium text-amber-700">Waiting on review</span>
      </div>
    </VignetteChrome>
  );
}

/** Brand memory — BRAND.md document panel, not a 2×2 settings grid. */
export function MarketingMemoryVisual() {
  return (
    <VignetteChrome label="Brand · memory">
      <div className="border-b border-stone-100 bg-[#FAF9F6] px-3 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-stone-400">
            Org context for every campaign
          </span>
          <span className="rounded border border-trooper-200 bg-trooper-50 px-2 py-0.5 text-[10px] font-semibold text-trooper-800">
            Injected
          </span>
        </div>
        <p className="mt-1.5 text-[12px] leading-relaxed text-stone-600">
          Voice, audience, and style load into Claude Code and Codex on every marketing mission.
        </p>
      </div>

      <div className="bg-white p-3">
        <AppDocPanel filename="BRAND.md" badge="northstar">
          <p className="mb-2 text-neutral-500"># Brand memory</p>
          <p className="mb-3 text-neutral-800">## Voice</p>
          <p className="mb-1">- Tone: direct, ops-native</p>
          <p className="mb-1">- Avoid: hype and fluff</p>
          <p className="mb-3">- CTA: Book a demo</p>
          <p className="mb-3 text-neutral-800">## Audience</p>
          <p className="mb-1">- Eng leads and lean teams</p>
          <p className="mb-3">- Pain: tool-switching · Proof: traced tickets</p>
          <p className="mb-3 text-neutral-800">## Style</p>
          <p className="mb-1">- Color: Trooper green · Type: Funnel Display</p>
          <p>- Social: 1080×1080 carousel</p>
        </AppDocPanel>
      </div>

      <div className="flex items-center justify-between border-t border-stone-100 bg-[#FAF9F6] px-3 py-2.5 text-[11px]">
        <span className="text-stone-500">Loaded for Claude · Codex</span>
        <span className="font-medium text-trooper-700">Always on</span>
      </div>
    </VignetteChrome>
  );
}

/** Board row = approve-before-publish. */
export function MarketingBoardVisual() {
  return <MarketingLaunchVisual />;
}

/** Pack review — browser + artifact thumbs at DiffViewer density. */
export function MarketingCanvasVisual() {
  return (
    <VignetteChrome label="Review · campaign pack">
      <div className="border-b border-stone-100 bg-white px-3 py-2.5">
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

      <div className="space-y-3 bg-[#FAF9F6] p-3">
        <div className="overflow-hidden rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.02)] ring-1 ring-neutral-200/55">
          <DemoBrowserFrame
            src={campaignSrc}
            addressUrl="northstar.io/q2"
            faviconDomain="northstar.io"
            title="Landing preview"
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="overflow-hidden rounded-lg bg-white ring-1 ring-neutral-200/55">
            <div className="border-b border-neutral-100 px-2.5 py-1.5 font-mono text-[11px] font-medium text-stone-800">
              brief.md
            </div>
            <div className="space-y-1 p-2.5 font-mono text-[11px] leading-snug text-stone-600">
              <p className="font-medium text-stone-800">Campaign brief</p>
              <p>Landing · carousel · nurture</p>
              <p className="text-trooper-700">Awaiting brand review</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg bg-white ring-1 ring-neutral-200/55">
            <div className="border-b border-neutral-100 px-2.5 py-1.5 font-mono text-[11px] font-medium text-stone-800">
              carousel.png
            </div>
            <div className="relative h-[72px] overflow-hidden bg-stone-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={DEMO_MEDIA.linkedinCarousel}
                alt=""
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-900/70 to-transparent px-2 pb-1.5 pt-3">
                <p className="font-mono text-[10px] font-medium text-white">3 slides</p>
              </div>
            </div>
          </div>
          <AppTerminalPanel title="schedule · held" className="!rounded-lg">
            <p className="text-stone-500">$ publish --dry-run</p>
            <p className="mt-1 text-amber-400">blog · ready</p>
            <p className="text-amber-400">email · held</p>
            <p className="mt-1 text-stone-400">Waiting on approve ▌</p>
          </AppTerminalPanel>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-stone-100 bg-white px-3 py-2.5 text-[11px]">
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
