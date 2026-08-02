'use client';

import { FileText, Play } from 'lucide-react';
import { DemoFavicon, DemoBrowserFrame, demoAssetPath as assetPath, DEMO_MEDIA } from '@trooper/demo';
import { VignetteChrome } from './shared';
import {
  AcpCliWindow,
  AppDocPanel,
} from './productSurfaces';

const campaignSrc = assetPath('marketing', 'campaign.html');

function ShellOk({ children }: { children: string }) {
  return <div className="text-green-400">✓ {children}</div>;
}
function ShellRun({ children }: { children: string }) {
  return (
    <div className="text-amber-300">
      {children}
      <span className="animate-pulse">▌</span>
    </div>
  );
}
function ShellCmd({ children }: { children: string }) {
  return <div className="text-stone-100">$ {children}</div>;
}

/** Parallel campaign — full CLI windows, not skinny columns. */
export function MarketingHarnessVisual() {
  return (
    <VignetteChrome label="campaign" className="bg-[#b9b4ab]">
      <div className="border-b border-black/10 bg-white px-3.5 py-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">
            Marketing · Q2
          </span>
          <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[9px] font-bold uppercase text-amber-800">
            In progress
          </span>
          <span className="ml-auto inline-flex items-center gap-1 font-mono text-[10px] text-stone-500">
            <DemoFavicon domain="northstar.io" size={12} rounded="sm" />
            northstar.io/q2
          </span>
        </div>
        <h4 className="mt-1 text-[14px] font-semibold text-stone-900">
          Ship the campaign — landing, creative, SEO
        </h4>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-3">
        <AcpCliWindow
          provider="Claude Code"
          status="working"
          cwd="campaign/q2-pillar · landing/campaign.html  +48 −6"
          lines={
            <>
              <ShellCmd>claude — acp</ShellCmd>
              <ShellOk>write_file  hero + CTA draft</ShellOk>
              <ShellOk>browser_open  northstar.io/q2 preview</ShellOk>
              <ShellRun>apply_patch  meta tags + og:image</ShellRun>
            </>
          }
        />
        <AcpCliWindow
          provider="Codex"
          status="working"
          cwd="campaign/q2-creative · linkedin-carousel.png"
          lines={
            <>
              <ShellCmd>codex — acp</ShellCmd>
              <ShellOk>generate_image  slide 1 ready</ShellOk>
              <ShellRun>generate_image  slides 2–3 rendering</ShellRun>
            </>
          }
        />
      </div>

      <div className="flex items-center justify-between border-t border-black/10 bg-[#FAF9F6] px-3.5 py-2 text-[11px]">
        <span className="text-stone-500">One mission · coding CLIs on campaign work</span>
        <span className="font-medium text-trooper-700">Live tool traces</span>
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
              <div className="font-mono text-[12px] font-medium text-stone-900">linkedin-carousel.png</div>
              <div className="text-[11px] text-amber-700">Ready · held</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2.5 ring-1 ring-neutral-200/70">
            <FileText size={18} className="text-stone-400" />
            <div>
              <div className="font-mono text-[12px] font-medium text-stone-900">nurture-seq.md</div>
              <div className="text-[11px] text-amber-700">3-part · held</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-stone-950 px-3 py-2.5">
            <Play size={16} className="text-white" fill="white" />
            <div>
              <div className="font-mono text-[12px] font-medium text-stone-200">social-cut.mp4</div>
              <div className="text-[11px] text-stone-500">24s · waiting</div>
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
    <VignetteChrome label="BRAND.md">
      <div className="border-b border-stone-100 bg-[#FAF9F6] px-3.5 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-stone-400">
            Brand memory
          </span>
          <span className="rounded border border-trooper-200 bg-trooper-50 px-2 py-0.5 text-[10px] font-semibold text-trooper-800">
            Injected
          </span>
        </div>
      </div>
      <div className="flex-1 p-3">
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
          <p>- Color: Trooper green · Social: 1080×1080 carousel</p>
        </AppDocPanel>
      </div>
      <div className="flex items-center justify-between border-t border-stone-100 bg-[#FAF9F6] px-3.5 py-2.5 text-[12px]">
        <span className="text-stone-500">Loaded for Claude · Codex</span>
        <span className="font-medium text-trooper-700">Always on</span>
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

      <div className="flex-1 space-y-0">
        <DemoBrowserFrame
          src={campaignSrc}
          addressUrl="northstar.io/q2"
          faviconDomain="northstar.io"
          title="Landing preview"
          compact
        />
        <div className="grid grid-cols-3 divide-x divide-stone-100 border-t border-stone-100">
          <div className="bg-white p-3 font-mono text-[11px] leading-snug text-stone-600">
            <div className="mb-1 font-medium text-stone-900">brief.md</div>
            <p>Landing · carousel · nurture</p>
            <p className="mt-1 text-trooper-700">Awaiting review</p>
          </div>
          <div className="bg-white">
            <div className="border-b border-stone-100 px-3 py-1.5 font-mono text-[11px] font-medium">
              carousel.png
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={DEMO_MEDIA.linkedinCarousel} alt="" className="h-[72px] w-full object-cover" />
          </div>
          <div className="bg-stone-950 p-3 font-mono text-[11px] text-stone-300">
            <p className="text-stone-500">$ publish --dry-run</p>
            <p className="mt-1 text-amber-400">blog · ready</p>
            <p className="text-amber-400">email · held</p>
            <p className="mt-1 text-stone-400">Waiting ▌</p>
          </div>
        </div>
      </div>
    </VignetteChrome>
  );
}
