'use client';

import {
  Check, Loader2, FileText, Terminal, Hash, Play,
} from 'lucide-react';
import { DemoFavicon } from '@/components/DemoFavicon';
import { DemoBrowserFrame } from '@/components/DemoBrowserChrome';
import { assetPath, DEMO_MEDIA } from '@/lib/demoScenarioAssets/helpers';
import { VignetteChrome, TrooperMark } from './shared';
import { CanvasDesktopVisual } from './CanvasDesktopVisual';
import {
  CodingHarnessVisual,
  CodingBoardVisual,
  CodingMemoryVisual,
  CodingCanvasVisual,
} from './CodingMarketingVisuals';
import {
  MarketingHarnessVisual,
  MarketingBoardVisual,
  MarketingMemoryVisual,
  MarketingCanvasVisual,
  MarketingLaunchVisual,
} from './MarketingTeamVisuals';

export {
  CodingHarnessVisual,
  CodingBoardVisual,
  CodingMemoryVisual,
  CodingCanvasVisual,
  MarketingHarnessVisual,
  MarketingBoardVisual,
  MarketingMemoryVisual,
  MarketingCanvasVisual,
  MarketingLaunchVisual,
};

function ToolRow({ label, detail, done }: { label: string; detail: string; done?: boolean }) {
  return (
    <div className="flex items-center gap-2 py-1 text-[11px]">
      {done ? <Check size={12} className="text-trooper shrink-0" /> : <Loader2 size={12} className="animate-spin text-[#3f6b00] shrink-0" />}
      <span className="font-mono font-semibold text-stone-800">{label}</span>
      <span className="truncate text-stone-400">{detail}</span>
    </div>
  );
}

function MiniBrowserTile({ url, src, faviconDomain }: { url: string; src?: string; faviconDomain?: string }) {
  return (
    <DemoBrowserFrame
      src={src}
      addressUrl={url}
      faviconDomain={faviconDomain}
      compact
      title={url}
    />
  );
}

function MiniMarkdownBrief() {
  const lines = [
    { t: 'heading', text: 'Q2 Campaign Brief' },
    { t: 'muted', text: 'Theme · parser reliability story' },
    { t: 'body', text: 'Deliverables shipped' },
    { t: 'bullet', text: '· Pillar landing page (live preview)' },
    { t: 'bullet', text: '· LinkedIn carousel — 3 slides' },
    { t: 'bullet', text: '· 30s social video cut + transcript' },
    { t: 'status', text: 'Awaiting brand review' },
  ];
  return (
    <div className="min-h-full overflow-y-auto bg-white p-2.5 text-[8px] leading-relaxed">
      {lines.map((line, i) => (
        <div
          key={i}
          className={
            line.t === 'heading' ? 'mb-1 text-[9px] font-semibold text-stone-800'
              : line.t === 'muted' ? 'mb-1.5 text-stone-400'
                : line.t === 'bullet' ? 'text-stone-600'
                  : line.t === 'status' ? 'mt-2 font-medium text-[#3f6b00]'
                    : 'text-stone-600'
          }
        >
          {line.text}
        </div>
      ))}
    </div>
  );
}

function MiniCarouselTile() {
  return (
    <div className="relative h-full overflow-hidden bg-gradient-to-br from-stone-100 to-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={DEMO_MEDIA.linkedinCarousel}
        alt="LinkedIn carousel slide 1"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-900/75 to-transparent px-2 pb-1.5 pt-4">
        <p className="text-[7px] font-semibold text-white">Slide 1 of 3</p>
        <p className="text-[6px] text-stone-300">LinkedIn carousel</p>
      </div>
    </div>
  );
}

function MiniVideoTile() {
  return (
    <div className="relative h-full overflow-hidden bg-stone-900">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={DEMO_MEDIA.socialVideoPoster}
        alt="Social video poster"
        className="absolute inset-0 h-full w-full object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-stone-950/20" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/40 bg-white/15 backdrop-blur-sm">
          <Play size={11} className="ml-0.5 text-white" fill="white" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-stone-950/60 px-2 py-1">
        <span className="font-mono text-[6px] text-stone-300">00:00 / 00:30</span>
        <span className="text-[6px] font-medium text-stone-400">social-cut.mp4</span>
      </div>
    </div>
  );
}

export function CanvasBoardVisual() {
  const campaignSrc = assetPath('marketing', 'campaign.html');
  return (
    <CanvasDesktopVisual
      animated
      windows={[
        {
          id: 'brief',
          title: 'content/q2-campaign-brief.md',
          x: 22,
          y: 16,
          w: 182,
          h: 148,
          body: <MiniMarkdownBrief />,
        },
        {
          id: 'preview',
          title: 'landing/campaign.html',
          x: 148,
          y: 28,
          w: 224,
          h: 142,
          body: <MiniBrowserTile url="northstar.io/q2" src={campaignSrc} faviconDomain="northstar.io" />,
        },
        {
          id: 'asset',
          title: 'creative/linkedin-carousel.png',
          x: 52,
          y: 132,
          w: 178,
          h: 124,
          body: <MiniCarouselTile />,
        },
        {
          id: 'video',
          title: 'video/social-cut.mp4',
          x: 196,
          y: 108,
          w: 192,
          h: 128,
          accent: true,
          body: <MiniVideoTile />,
        },
      ]}
    />
  );
}

export function CampaignPipelineVisual() {
  const lanes = [
    { label: 'SEO recon', agent: 'Aria', status: 'done' },
    { label: 'Pillar page', agent: 'Ren', status: 'running' },
    { label: 'Carousel', agent: 'Ren', status: 'running' },
    { label: 'Video cut', agent: 'Aria', status: 'pending' },
  ];
  return (
    <VignetteChrome label="trooper · campaign">
      <div className="p-4 bg-white min-h-[280px]">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[9px] font-bold uppercase tracking-wide text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">In progress</span>
          <span className="text-[10px] text-stone-400">#marketing · Q2</span>
        </div>
        <div className="space-y-2">
          {lanes.map((l) => (
            <div key={l.label} className="flex items-center gap-3 rounded-lg border border-stone-100 px-3 py-2.5">
              <div className={`h-2 w-2 rounded-full ${l.status === 'done' ? 'bg-trooper' : l.status === 'running' ? 'bg-amber-500 animate-pulse' : 'bg-stone-300'}`} />
              <span className="text-[12px] font-medium text-stone-800 flex-1">{l.label}</span>
              <span className="text-[10px] text-stone-400">{l.agent}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded border border-stone-200 overflow-hidden h-14">
            <MiniBrowserTile url="northstar.io/q2" src={assetPath('marketing', 'campaign.html')} faviconDomain="northstar.io" />
          </div>
          <div className="rounded border border-stone-200 overflow-hidden bg-gradient-to-br from-[#f0f5e6] to-white p-2 text-[8px] font-semibold text-stone-700">Carousel PNG</div>
          <div className="rounded border border-stone-200 overflow-hidden bg-stone-900 flex items-center justify-center p-2">
            <Play size={12} className="text-white" fill="white" />
          </div>
        </div>
      </div>
    </VignetteChrome>
  );
}

export function SalesPipelineVisual() {
  return (
    <VignetteChrome label="trooper · pipeline">
      <div className="p-4 bg-[#FAF9F6] min-h-[280px]">
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[
            { n: 'Inbound', c: 3 },
            { n: 'Qualified', c: 2, active: true },
            { n: 'Demo', c: 1 },
            { n: 'Close', c: 0 },
          ].map((s) => (
            <div key={s.n} className={`rounded-lg border p-2 ${s.active ? 'border-trooper bg-trooper-50' : 'border-stone-200 bg-white'}`}>
              <div className="text-[9px] font-semibold text-stone-500">{s.n}</div>
              <div className="text-xl font-semibold tabular-nums text-stone-900 mt-1">{s.c}</div>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-3">
          <div className="flex items-center gap-2 mb-2">
            <DemoFavicon domain="linkedin.com" size={16} rounded="sm" />
            <span className="text-[11px] font-semibold text-stone-800">Acme Corp — outreach draft</span>
          </div>
          <p className="text-[10px] text-stone-500 leading-relaxed">Personalized hook + demo CTA — held for approval before send.</p>
        </div>
      </div>
    </VignetteChrome>
  );
}

export function SlackRoutingVisual() {
  return (
    <VignetteChrome label="slack · #sales → ticket">
      <div className="flex min-h-[280px]">
        <div className="w-[45%] border-r border-stone-100 bg-[#f8f5fb] p-3">
          <div className="text-[10px] font-bold text-[#611f69] mb-2">#sales</div>
          <div className="rounded-lg bg-white p-2.5 shadow-sm mb-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="h-6 w-6 rounded bg-stone-200" />
              <span className="text-[11px] font-semibold">Sarah Chen</span>
            </div>
            <p className="text-[11px] text-stone-600">Can we schedule a Trooper demo this week?</p>
          </div>
          <div className="rounded-lg bg-white/80 p-2 text-[10px] text-stone-500 border border-[#611f69]/10">
            <span className="font-semibold text-[#611f69]">Jordan</span> · creating ticket…
          </div>
        </div>
        <div className="flex-1 p-3 bg-white">
          <div className="font-mono text-[9px] uppercase text-stone-400 mb-2">Ticket #4421</div>
          <h4 className="text-[13px] font-semibold text-stone-900 mb-3">Schedule Acme demo</h4>
          <div className="space-y-1.5">
            <ToolRow label="slack_read" detail="#sales thread preserved" done />
            <ToolRow label="web_search" detail="Acme Corp research" done />
            <ToolRow label="calendar_hold" detail="Thursday 2pm" />
          </div>
        </div>
      </div>
    </VignetteChrome>
  );
}

export function WhatsAppRoutingVisual() {
  return (
    <VignetteChrome label="whatsapp · support">
      <div className="min-h-[280px] bg-[#ece5dd] p-3 flex flex-col">
        <div className="ml-auto max-w-[80%] rounded-lg rounded-tr-none bg-[#dcf8c6] px-3 py-2 text-[11px] text-stone-800 shadow-sm">
          Login still broken after password reset
        </div>
        <div className="mt-3 rounded-xl border border-stone-200 bg-white p-3 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <TrooperMark className="h-4 w-4" />
            <span className="text-[11px] font-semibold">Ticket #881</span>
            <span className="text-[9px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded ml-auto">In progress</span>
          </div>
          <ToolRow label="whatsapp_read" detail="routed to Leo" done />
          <ToolRow label="exec" detail="reset billing session" />
        </div>
      </div>
    </VignetteChrome>
  );
}

export function LegalReviewVisual() {
  return (
    <VignetteChrome label="trooper · human review">
      <div className="p-4 min-h-[280px] bg-white">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[9px] font-bold uppercase text-red-800 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">Approval required</span>
        </div>
        {['MSA parsed · 14 clauses flagged', 'Redline drafted vs playbook', 'Counsel sign-off before counter'].map((line, i) => (
          <div key={line} className="flex items-start gap-3 border border-stone-100 rounded-lg px-3 py-2.5 mb-2">
            <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${i < 2 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>{i + 1}</span>
            <span className="text-[11px] text-stone-700 leading-relaxed">{line}</span>
          </div>
        ))}
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-stone-100 bg-stone-50 px-3 py-2">
          <FileText size={14} className="text-stone-400" />
          <span className="text-[10px] font-medium text-stone-600">legal/msa-redline.md</span>
        </div>
      </div>
    </VignetteChrome>
  );
}

export function OpsRunbookVisual() {
  const items = [
    { label: 'Vendor reconciliation', done: true },
    { label: 'Access review', done: true },
    { label: 'Budget variance report', done: false, blocked: true },
    { label: 'Backup verification', done: true },
  ];
  return (
    <VignetteChrome label="trooper · runbook">
      <div className="p-4 min-h-[280px] bg-white">
        <div className="font-mono text-[10px] uppercase tracking-widest text-stone-400 mb-3">Weekly checklist · W24</div>
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3 py-2 border-b border-stone-50 last:border-0">
            <span className={`flex h-4 w-4 items-center justify-center rounded border text-[10px] ${item.done ? 'border-trooper bg-trooper-50 text-trooper' : 'border-stone-300'}`}>
              {item.done ? '✓' : ''}
            </span>
            <span className={`text-[11px] flex-1 ${item.blocked ? 'text-amber-800 font-medium' : 'text-stone-700'}`}>{item.label}</span>
            {item.blocked && <span className="text-[9px] text-amber-700">Needs approval</span>}
          </div>
        ))}
      </div>
    </VignetteChrome>
  );
}

export function EngineeringIncidentVisual() {
  return (
    <VignetteChrome label="trooper · incident #442">
      <div className="min-h-[280px] bg-stone-950 p-4 font-mono text-[10px] leading-relaxed">
        <div className="text-red-400 mb-3">p99 spike · /api/v2</div>
        <div className="space-y-1 text-stone-400">
          <div><span className="text-stone-500">08:12</span> alert fired</div>
          <div><span className="text-stone-500">08:14</span> Leo · pool exhaustion</div>
          <div><span className="text-stone-500">08:16</span> <Terminal size={10} className="inline mr-1" />kubectl logs</div>
          <div className="text-green-400"><span className="text-stone-500">08:18</span> rollback v2.3.1 ✓</div>
        </div>
        <div className="mt-4 rounded border border-stone-800 bg-stone-900 p-2 text-stone-300">
          Postmortem draft attached · human review
        </div>
      </div>
    </VignetteChrome>
  );
}

export function MessagingRoutingVisual() {
  return (
    <VignetteChrome label="trooper · any channel">
      <div className="flex min-h-[280px] items-center justify-center gap-3 p-4 bg-[#FAF9F6]">
        {['Telegram', 'Discord', 'Signal'].map((ch) => (
          <div key={ch} className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-[10px] font-medium text-stone-600">{ch}</div>
        ))}
        <span className="text-stone-300">→</span>
        <div className="rounded-lg border border-trooper-200 bg-trooper-50 px-4 py-3 text-center">
          <Hash size={14} className="mx-auto text-trooper mb-1" />
          <div className="text-[10px] font-bold text-trooper-800">Traced ticket</div>
        </div>
      </div>
    </VignetteChrome>
  );
}

export function EmailRoutingVisual() {
  return (
    <VignetteChrome label="trooper · inbox">
      <div className="p-4 min-h-[280px] bg-white">
        <div className="rounded-lg border border-stone-200 p-3 mb-3">
          <div className="flex items-center gap-2 mb-1">
            <DemoFavicon domain="gmail.com" size={16} rounded="sm" />
            <span className="text-[10px] text-stone-500">procurement@enterprise.co</span>
          </div>
          <div className="text-[13px] font-semibold text-stone-900">RFP — AI ops platform evaluation</div>
          <div className="text-[10px] text-stone-400 mt-1">Due Friday EOD</div>
        </div>
        <div className="rounded-lg border border-stone-100 bg-stone-50 p-3 space-y-1">
          <ToolRow label="email_parse" detail="structured ticket #772" done />
          <ToolRow label="web_search" detail="evaluator requirements" done />
          <ToolRow label="write_file" detail="draft response" />
        </div>
      </div>
    </VignetteChrome>
  );
}

export function DesignPipelineVisual() {
  const lanes = [
    { label: 'Figma frame audit', agent: 'Ren', status: 'done' },
    { label: 'Asset export bundle', agent: 'Ren', status: 'running' },
    { label: 'Brand token diff', agent: 'Aria', status: 'running' },
    { label: 'Checklist review', agent: 'Jordan', status: 'pending' },
  ];
  return (
    <VignetteChrome label="trooper · brand refresh">
      <div className="p-4 bg-white min-h-[280px]">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[9px] font-bold uppercase tracking-wide text-purple-800 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">In review</span>
          <span className="text-[10px] text-stone-400">#design · Q2 refresh</span>
        </div>
        <div className="space-y-2">
          {lanes.map((l) => (
            <div key={l.label} className="flex items-center gap-3 rounded-lg border border-stone-100 px-3 py-2.5">
              <div className={`h-2 w-2 rounded-full ${l.status === 'done' ? 'bg-trooper' : l.status === 'running' ? 'bg-purple-500 animate-pulse' : 'bg-stone-300'}`} />
              <span className="text-[12px] font-medium text-stone-800 flex-1">{l.label}</span>
              <span className="text-[10px] text-stone-400">{l.agent}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded border border-stone-200 overflow-hidden h-14 bg-gradient-to-br from-purple-50 to-white p-2 text-[8px] font-semibold text-stone-700">Hero mockup</div>
          <div className="rounded border border-stone-200 overflow-hidden h-14 bg-gradient-to-br from-[#f0f5e6] to-white p-2 text-[8px] font-semibold text-stone-700">Carousel PNG</div>
          <div className="rounded border border-stone-200 overflow-hidden h-14 font-mono text-[7px] p-1.5 text-emerald-700 bg-emerald-50">+ token diff</div>
        </div>
      </div>
    </VignetteChrome>
  );
}

export function SupportQueueVisual() {
  return (
    <VignetteChrome label="zendesk · P1 queue">
      <div className="p-4 min-h-[280px] bg-white">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[9px] font-bold uppercase text-red-800 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">P1</span>
          <span className="text-[10px] text-stone-400">Ticket #4421 · login failure</span>
        </div>
        <div className="space-y-2 mb-3">
          {['Classified · billing session', 'KB match · reset guide', 'Reply draft · held for approval'].map((line, i) => (
            <div key={line} className="flex items-center gap-2 rounded-lg border border-stone-100 px-3 py-2">
              <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${i < 2 ? 'bg-trooper-50 text-trooper' : 'bg-amber-50 text-amber-800'}`}>{i + 1}</span>
              <span className="text-[11px] text-stone-700">{line}</span>
            </div>
          ))}
        </div>
        <ToolRow label="zendesk_read" detail="thread preserved" done />
        <ToolRow label="notion_search" detail="KB: password reset" done />
        <ToolRow label="write_file" detail="reply-draft.md" />
      </div>
    </VignetteChrome>
  );
}

export function FinanceCloseVisual() {
  const items = [
    { label: 'QuickBooks ledger pull', done: true },
    { label: 'Variance report', done: true },
    { label: 'Reconciliation diff', done: false, blocked: true },
    { label: 'Close checklist sign-off', done: false },
  ];
  return (
    <VignetteChrome label="trooper · month-end">
      <div className="p-4 min-h-[280px] bg-white">
        <div className="font-mono text-[10px] uppercase tracking-widest text-stone-400 mb-3">Close · June 2026</div>
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3 py-2 border-b border-stone-50 last:border-0">
            <span className={`flex h-4 w-4 items-center justify-center rounded border text-[10px] ${item.done ? 'border-trooper bg-trooper-50 text-trooper' : 'border-stone-300'}`}>
              {item.done ? '✓' : ''}
            </span>
            <span className={`text-[11px] flex-1 ${item.blocked ? 'text-amber-800 font-medium' : 'text-stone-700'}`}>{item.label}</span>
            {item.blocked && <span className="text-[9px] text-amber-700">Needs approval</span>}
          </div>
        ))}
        <div className="mt-3 rounded border border-stone-100 bg-stone-50 px-3 py-2 font-mono text-[9px] text-stone-600">
          recon-variance.diff · +$12.4k flagged
        </div>
      </div>
    </VignetteChrome>
  );
}

export function BdPipelineVisual() {
  return (
    <VignetteChrome label="trooper · partnerships">
      <div className="p-4 bg-[#FAF9F6] min-h-[280px]">
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { n: 'Research', c: 4 },
            { n: 'Brief', c: 2, active: true },
            { n: 'Outreach', c: 1 },
          ].map((s) => (
            <div key={s.n} className={`rounded-lg border p-2 ${s.active ? 'border-trooper bg-trooper-50' : 'border-stone-200 bg-white'}`}>
              <div className="text-[9px] font-semibold text-stone-500">{s.n}</div>
              <div className="text-xl font-semibold tabular-nums text-stone-900 mt-1">{s.c}</div>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-3">
          <div className="flex items-center gap-2 mb-2">
            <DemoFavicon domain="stripe.com" size={16} rounded="sm" />
            <span className="text-[11px] font-semibold text-stone-800">Stripe Connect — intro draft</span>
          </div>
          <p className="text-[10px] text-stone-500 leading-relaxed">Partner brief + mutual intro email — held for approval.</p>
        </div>
      </div>
    </VignetteChrome>
  );
}

export function ResearchIntelVisual() {
  return (
    <VignetteChrome label="trooper · competitive intel">
      <div className="p-4 min-h-[280px] bg-white">
        <div className="font-mono text-[10px] uppercase tracking-widest text-stone-400 mb-3">Q2 · agent ops landscape</div>
        <div className="rounded-lg border border-stone-200 overflow-hidden mb-3">
          <div className="grid grid-cols-4 gap-px bg-stone-100 text-[9px]">
            {['Vendor', 'Multi-agent', 'Canvas', 'Price'].map((h) => (
              <div key={h} className="bg-stone-50 px-2 py-1.5 font-semibold text-stone-600">{h}</div>
            ))}
            {['Competitor A', 'Partial', 'No', '$89'].map((c) => (
              <div key={c} className="bg-white px-2 py-1.5 text-stone-700">{c}</div>
            ))}
            {['Trooper', 'Yes', 'Yes', 'BYOA'].map((c) => (
              <div key={c} className="bg-trooper-50 px-2 py-1.5 font-medium text-trooper-800">{c}</div>
            ))}
          </div>
        </div>
        <ToolRow label="notion_search" detail="source notes compiled" done />
        <ToolRow label="airtable_update" detail="competitive matrix" done />
        <ToolRow label="notion_write" detail="intel-brief.md" />
      </div>
    </VignetteChrome>
  );
}

export function SecurityAuditVisual() {
  return (
    <VignetteChrome label="trooper · audit run">
      <div className="min-h-[280px] bg-stone-950 p-4 font-mono text-[10px] leading-relaxed">
        <div className="text-amber-400 mb-3">CVE-2026-1842 · api-gateway</div>
        <div className="space-y-1 text-stone-400">
          <div><span className="text-stone-500">09:12</span> WARN TLS 1.1 enabled</div>
          <div><span className="text-stone-500">09:14</span> Leo · patch v2.1.1 available</div>
          <div><span className="text-stone-500">09:16</span> <Terminal size={10} className="inline mr-1" />aws_audit production</div>
          <div className="text-green-400"><span className="text-stone-500">09:18</span> rollback complete ✓</div>
        </div>
        <div className="mt-4 rounded border border-stone-800 bg-stone-900 p-2 text-stone-300">
          findings.md + gateway-patch.diff on Canvas
        </div>
      </div>
    </VignetteChrome>
  );
}

export function PrCommsVisual() {
  return (
    <VignetteChrome label="trooper · series A comms">
      <div className="p-4 min-h-[280px] bg-white">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[9px] font-bold uppercase text-fuchsia-800 bg-fuchsia-50 px-2 py-0.5 rounded-full border border-fuchsia-200">Embargo</span>
        </div>
        {['Press release drafted', 'Media list tier A/B updated', 'CEO quote · pending approval'].map((line, i) => (
          <div key={line} className="flex items-start gap-3 border border-stone-100 rounded-lg px-3 py-2.5 mb-2">
            <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${i < 2 ? 'bg-trooper-50 text-trooper' : 'bg-amber-100 text-amber-800'}`}>{i + 1}</span>
            <span className="text-[11px] text-stone-700 leading-relaxed">{line}</span>
          </div>
        ))}
        <div className="mt-2 flex items-center gap-2 rounded-lg border border-stone-100 bg-stone-50 px-3 py-2">
          <FileText size={14} className="text-stone-400" />
          <span className="text-[10px] font-medium text-stone-600">pr/announcement-checklist.md</span>
        </div>
      </div>
    </VignetteChrome>
  );
}

export function GrowthExperimentsVisual() {
  return (
    <VignetteChrome label="trooper · A/B experiment">
      <div className="p-4 min-h-[280px] bg-white">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[9px] font-bold uppercase text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">Winner: Variant B</span>
          <span className="text-[10px] text-stone-400">+38% signup lift</span>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="rounded-lg border border-stone-200 p-3">
            <div className="text-[9px] text-stone-500">Control</div>
            <div className="text-2xl font-semibold tabular-nums text-stone-900">4.2%</div>
          </div>
          <div className="rounded-lg border border-trooper bg-trooper-50 p-3">
            <div className="text-[9px] text-trooper-700">Variant B</div>
            <div className="text-2xl font-semibold tabular-nums text-trooper-900">5.8%</div>
          </div>
        </div>
        <ToolRow label="sheets_read" detail="funnel metrics pulled" done />
        <ToolRow label="notion_write" detail="experiment-doc.md" done />
        <ToolRow label="write_file" detail="rollout-checklist.md" />
      </div>
    </VignetteChrome>
  );
}

export function BrowserSerpVisual() {
  return (
    <VignetteChrome label="trooper · browser_navigate">
      <div className="p-3 min-h-[280px] bg-[#FAF9F6]">
        <div className="rounded-lg border border-stone-200 overflow-hidden mb-3 h-32">
          <MiniBrowserTile url="google.com/search?q=..." src={undefined} />
        </div>
        <ToolRow label="browser_navigate" detail="SERP snapshot captured" done />
        <ToolRow label="browser_snapshot" detail="competitor pricing extracted" done />
        <ToolRow label="write_file" detail="research-notes.md" />
      </div>
    </VignetteChrome>
  );
}

export function LaunchOpsVisual() {
  return (
    <VignetteChrome label="trooper · org launch">
      <div className="p-4 min-h-[280px] bg-white">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[9px] font-bold uppercase text-pink-800 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-200">Multi-agent</span>
          <span className="text-[10px] text-stone-400">Wonder PH launch</span>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {['Product Hunt', 'Press wire', 'Social cut'].map((lane) => (
            <div key={lane} className="rounded-lg border border-stone-100 px-2 py-2 text-center">
              <div className="text-[10px] font-medium text-stone-800">{lane}</div>
              <div className="text-[9px] text-trooper mt-1">In progress</div>
            </div>
          ))}
        </div>
        <ToolRow label="producthunt_submit" detail="launch listing queued" done />
        <ToolRow label="browser_navigate" detail="PH preview captured" done />
        <ToolRow label="slack_post" detail="#launch coordination" />
      </div>
    </VignetteChrome>
  );
}
