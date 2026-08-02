'use client';

import { Hash, Laptop, Play } from 'lucide-react';
import { DemoFavicon, DemoBrowserFrame, demoAssetPath as assetPath, DEMO_MEDIA } from '@trooper/demo';
import { VignetteChrome, TrooperMark, ProviderChip } from './shared';
import { AppDiffCard, AppDocPanel, AppTerminalPanel, type DiffLine } from './productSurfaces';
import {
  CodingHarnessVisual,
  CodingBoardVisual,
  CodingMemoryVisual,
  CodingCanvasVisual,
  CodingRuntimeVisual,
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
  CodingRuntimeVisual,
  MarketingHarnessVisual,
  MarketingBoardVisual,
  MarketingMemoryVisual,
  MarketingCanvasVisual,
  MarketingLaunchVisual,
};

const RECON_DIFF: DiffLine[] = [
  { type: 'hunk', text: '@@ recon · variance flagged' },
  { type: 'ctx', oldLine: 12, newLine: 12, text: ' stripe_payouts.total' },
  { type: 'del', oldLine: 13, newLine: null, text: '  expected: 184200' },
  { type: 'add', oldLine: null, newLine: 13, text: '  expected: 196600  // +$12.4k' },
  { type: 'ctx', oldLine: 14, newLine: 14, text: ' status: needs_review' },
];

function ToolLine({ label, detail, done }: { label: string; detail: string; done?: boolean }) {
  return (
    <div className="flex gap-2 font-mono text-[12px] leading-snug">
      <span className={done ? 'text-trooper' : 'text-amber-600'}>{done ? '✓' : '◉'}</span>
      <span className="font-semibold text-stone-200">{label}</span>
      <span className="text-stone-400">{detail}</span>
    </div>
  );
}

/** Generic pack review used across teams / features / channels. */
export function CanvasBoardVisual() {
  return (
    <VignetteChrome label="mission pack">
      <div className="border-b border-stone-100 px-3.5 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-stone-400">
            Ticket · deliverables
          </span>
          <span className="rounded border border-trooper-200 bg-trooper-50 px-2 py-0.5 text-[10px] font-semibold text-trooper-800">
            Ready for review
          </span>
        </div>
        <h4 className="mt-1 text-[14px] font-semibold text-stone-900">
          Draft, preview, and approve — one pack
        </h4>
      </div>

      <div className="grid flex-1 grid-cols-1 sm:grid-cols-2">
        <div className="border-b border-stone-100 p-3 sm:border-b-0 sm:border-r">
          <AppDocPanel filename="brief.md" badge="draft ✓">
            <p className="mb-2 text-neutral-500"># Mission brief</p>
            <p className="mb-1">- Context loaded from org memory</p>
            <p className="mb-1">- First draft attached to ticket</p>
            <p className="mb-3">- Preview open for staff review</p>
            <p className="text-amber-700">Status: held for approve</p>
          </AppDocPanel>
        </div>
        <div className="flex flex-col bg-stone-950">
          <DemoBrowserFrame
            addressUrl="preview.trooper.so"
            faviconDomain="trooper.so"
            title="Preview"
            compact
          >
            <div className="flex h-[120px] items-center justify-center bg-[#FAF9F6] text-[12px] text-stone-500">
              Preview attached to ticket
            </div>
          </DemoBrowserFrame>
          <div className="flex-1 space-y-1 border-t border-stone-800 px-3 py-2.5 font-mono text-[12px]">
            <ToolLine label="write_file" detail="brief.md" done />
            <ToolLine label="browser_open" detail="preview attached" done />
            <ToolLine label="approve" detail="waiting on you" />
          </div>
        </div>
      </div>
    </VignetteChrome>
  );
}

export function CampaignPipelineVisual() {
  return (
    <VignetteChrome label="campaign" className="bg-[#b9b4ab]">
      <div className="border-b border-black/10 bg-white px-3.5 py-2.5">
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[9px] font-bold uppercase text-amber-800">
            In progress
          </span>
          <span className="font-mono text-[10px] text-stone-400">#marketing · Q2</span>
        </div>
        <h4 className="mt-1 text-[14px] font-semibold text-stone-900">Campaign pipeline</h4>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="overflow-hidden rounded-lg bg-stone-950 ring-1 ring-black/30">
          <div className="flex items-center gap-2 border-b border-stone-800 bg-[#2a2a2c] px-3 py-1.5">
            <ProviderChip provider="Claude Code" size={14} />
            <span className="text-[12px] font-medium text-stone-100">Claude Code · pillar page</span>
            <span className="ml-auto text-[10px] text-green-300">working</span>
          </div>
          <div className="space-y-1 px-3 py-2 font-mono text-[12px]">
            <ToolLine label="write_file" detail="landing/campaign.html" done />
            <ToolLine label="browser_open" detail="northstar.io/q2" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="overflow-hidden rounded-lg ring-1 ring-black/20">
            <DemoBrowserFrame
              src={assetPath('marketing', 'campaign.html')}
              addressUrl="northstar.io/q2"
              faviconDomain="northstar.io"
              compact
            />
          </div>
          <div className="overflow-hidden rounded-lg ring-1 ring-black/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={DEMO_MEDIA.linkedinCarousel} alt="" className="h-full min-h-[88px] w-full object-cover" />
          </div>
          <div className="flex items-center justify-center rounded-lg bg-stone-950 ring-1 ring-black/20">
            <Play size={18} className="text-white" fill="white" />
          </div>
        </div>
      </div>
    </VignetteChrome>
  );
}

export function SalesPipelineVisual() {
  return (
    <VignetteChrome label="pipeline">
      <div className="border-b border-stone-100 px-3.5 py-2.5">
        <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-stone-400">
          Sales board
        </span>
        <h4 className="mt-1 text-[14px] font-semibold text-stone-900">Acme Corp — outreach</h4>
      </div>
      <div className="grid flex-1 grid-cols-4 divide-x divide-stone-100 border-b border-stone-100">
        {[
          { n: 'Inbound', c: 3 },
          { n: 'Qualified', c: 2, active: true },
          { n: 'Demo', c: 1 },
          { n: 'Close', c: 0 },
        ].map((s) => (
          <div key={s.n} className={`px-2.5 py-3 ${s.active ? 'bg-trooper-50' : 'bg-white'}`}>
            <div className="text-[10px] font-semibold text-stone-500">{s.n}</div>
            <div className="mt-1 text-2xl font-semibold tabular-nums text-stone-900">{s.c}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 space-y-3 bg-[#FAF9F6] p-3">
        <div className="rounded-lg bg-white p-3 ring-1 ring-neutral-200/70">
          <div className="mb-2 flex items-center gap-2">
            <DemoFavicon domain="linkedin.com" size={16} rounded="sm" />
            <span className="text-[13px] font-semibold text-stone-800">Outreach draft</span>
            <span className="ml-auto rounded border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-800">
              Held
            </span>
          </div>
          <p className="text-[12px] leading-relaxed text-stone-600">
            Personalized hook + demo CTA — waiting on approval before send.
          </p>
        </div>
        <AppTerminalPanel title="tools">
          <ToolLine label="linkedin_research" detail="Acme Corp" done />
          <ToolLine label="write_file" detail="outreach-draft.md" done />
          <ToolLine label="approve" detail="before send" />
        </AppTerminalPanel>
      </div>
    </VignetteChrome>
  );
}

export function SlackRoutingVisual() {
  return (
    <VignetteChrome label="slack → ticket">
      <div className="grid flex-1 grid-cols-1 sm:grid-cols-2">
        <div className="border-b border-stone-100 bg-[#f8f5fb] p-3 sm:border-b-0 sm:border-r">
          <div className="mb-2 text-[11px] font-bold text-[#611f69]">#sales</div>
          <div className="mb-2 rounded-lg bg-white p-3 shadow-sm">
            <div className="mb-1 text-[12px] font-semibold">Sarah Chen</div>
            <p className="text-[13px] text-stone-700">Can we schedule a Trooper demo this week?</p>
          </div>
          <div className="rounded-lg border border-[#611f69]/15 bg-white/80 px-3 py-2 text-[12px] text-stone-600">
            <span className="font-semibold text-[#611f69]">Jordan</span> · creating ticket…
          </div>
        </div>
        <div className="flex flex-col bg-white p-3">
          <div className="mb-1 font-mono text-[10px] uppercase text-stone-400">Ticket #4421</div>
          <h4 className="mb-3 text-[14px] font-semibold text-stone-900">Schedule Acme demo</h4>
          <div className="flex-1 rounded-lg bg-stone-950 px-3 py-2.5 font-mono text-[12px]">
            <ToolLine label="slack_read" detail="#sales thread preserved" done />
            <ToolLine label="web_search" detail="Acme Corp research" done />
            <ToolLine label="calendar_hold" detail="Thursday 2pm" />
          </div>
        </div>
      </div>
    </VignetteChrome>
  );
}

export function WhatsAppRoutingVisual() {
  return (
    <VignetteChrome label="whatsapp" className="bg-[#ece5dd]">
      <div className="flex flex-1 flex-col gap-3 p-3">
        <div className="ml-auto max-w-[85%] rounded-lg rounded-tr-none bg-[#dcf8c6] px-3 py-2.5 text-[13px] text-stone-800 shadow-sm">
          Login still broken after password reset
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-3 shadow-sm">
          <div className="mb-2 flex items-center gap-2">
            <TrooperMark className="h-4 w-4" />
            <span className="text-[12px] font-semibold">Ticket #881</span>
            <span className="ml-auto rounded bg-amber-50 px-1.5 py-0.5 text-[10px] text-amber-700">
              In progress
            </span>
          </div>
          <div className="rounded-lg bg-stone-950 px-3 py-2.5 font-mono text-[12px]">
            <ToolLine label="whatsapp_read" detail="routed to Leo" done />
            <ToolLine label="exec" detail="reset billing session" />
          </div>
        </div>
      </div>
    </VignetteChrome>
  );
}

export function LegalReviewVisual() {
  return (
    <VignetteChrome label="approval">
      <div className="border-b border-stone-100 px-3.5 py-2.5">
        <span className="rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-[9px] font-bold uppercase text-red-800">
          Approval required
        </span>
        <h4 className="mt-2 text-[14px] font-semibold text-stone-900">MSA redline · held for counsel</h4>
      </div>
      <div className="grid flex-1 grid-cols-1 sm:grid-cols-2">
        <div className="border-b border-stone-100 p-3 sm:border-b-0 sm:border-r">
          <AppDocPanel filename="legal/msa-redline.md" badge="14 flags">
            <p className="mb-2 text-neutral-500"># MSA review</p>
            <p className="mb-1">- 14 clauses flagged vs playbook</p>
            <p className="mb-1">- Redline drafted</p>
            <p className="text-amber-700">- Counsel sign-off before counter</p>
          </AppDocPanel>
        </div>
        <div className="bg-stone-950 p-3 font-mono text-[12px]">
          <ToolLine label="parse_pdf" detail="MSA · 42 pages" done />
          <ToolLine label="playbook_diff" detail="14 clauses" done />
          <ToolLine label="approve" detail="counsel required" />
        </div>
      </div>
    </VignetteChrome>
  );
}

export function OpsRunbookVisual() {
  return (
    <VignetteChrome label="runbook">
      <div className="border-b border-stone-100 px-3.5 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">
          Weekly checklist · W24
        </span>
        <h4 className="mt-1 text-[14px] font-semibold text-stone-900">Ops runbook in progress</h4>
      </div>
      <div className="grid flex-1 grid-cols-1 sm:grid-cols-2">
        <div className="space-y-0 border-b border-stone-100 sm:border-b-0 sm:border-r">
          {[
            { label: 'Vendor reconciliation', done: true },
            { label: 'Access review', done: true },
            { label: 'Budget variance report', done: false, blocked: true },
            { label: 'Backup verification', done: true },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 border-b border-stone-50 px-3.5 py-3 last:border-0"
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded border text-[11px] ${
                  item.done ? 'border-trooper bg-trooper-50 text-trooper' : 'border-stone-300'
                }`}
              >
                {item.done ? '✓' : ''}
              </span>
              <span className={`flex-1 text-[13px] ${item.blocked ? 'font-medium text-amber-800' : 'text-stone-700'}`}>
                {item.label}
              </span>
              {item.blocked ? <span className="text-[11px] text-amber-700">Needs approval</span> : null}
            </div>
          ))}
        </div>
        <AppTerminalPanel title="routine · exec" className="!rounded-none !ring-0">
          <p className="text-stone-500">$ trooper routine run weekly-ops</p>
          <p className="mt-2 text-green-400">✓ vendor recon</p>
          <p className="text-green-400">✓ access review</p>
          <p className="text-amber-300">◯ budget variance — held ▌</p>
        </AppTerminalPanel>
      </div>
    </VignetteChrome>
  );
}

export function EngineeringIncidentVisual() {
  return (
    <VignetteChrome label="incident" className="bg-stone-950">
      <div className="border-b border-stone-800 px-3.5 py-2.5">
        <div className="text-[13px] font-semibold text-red-400">p99 spike · /api/v2</div>
        <div className="mt-0.5 font-mono text-[11px] text-stone-500">incident #442 · Leo responding</div>
      </div>
      <div className="flex-1 space-y-1.5 px-3.5 py-3 font-mono text-[13px] leading-relaxed text-stone-400">
        <div>
          <span className="text-stone-600">08:12</span> alert fired
        </div>
        <div>
          <span className="text-stone-600">08:14</span> Leo · pool exhaustion
        </div>
        <div>
          <span className="text-stone-600">08:16</span> $ kubectl logs api-gateway
        </div>
        <div className="text-green-400">
          <span className="text-stone-600">08:18</span> rollback v2.3.1 ✓
        </div>
        <div className="mt-4 rounded border border-stone-800 bg-stone-900 px-3 py-2 text-stone-300">
          Postmortem draft attached · human review
        </div>
      </div>
    </VignetteChrome>
  );
}

export function MessagingRoutingVisual() {
  return (
    <VignetteChrome label="channels">
      <div className="flex flex-1 flex-col items-stretch justify-center gap-4 bg-[#FAF9F6] p-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {['Telegram', 'Discord', 'Signal', 'iMessage'].map((ch) => (
            <span
              key={ch}
              className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-[12px] font-medium text-stone-700"
            >
              {ch}
            </span>
          ))}
        </div>
        <div className="text-center text-[12px] text-stone-400">↓ routed into</div>
        <div className="mx-auto w-full max-w-xs rounded-xl border border-trooper-200 bg-white p-4 text-center shadow-sm">
          <Hash size={16} className="mx-auto mb-1 text-trooper" />
          <div className="text-[13px] font-bold text-trooper-800">Traced ticket</div>
          <div className="mt-2 rounded-lg bg-stone-950 px-3 py-2 text-left font-mono text-[11px]">
            <ToolLine label="channel_read" detail="thread preserved" done />
            <ToolLine label="create_ticket" detail="#991" done />
          </div>
        </div>
      </div>
    </VignetteChrome>
  );
}

export function EmailRoutingVisual() {
  return (
    <VignetteChrome label="inbox">
      <div className="border-b border-stone-100 px-3.5 py-2.5">
        <div className="flex items-center gap-2">
          <DemoFavicon domain="gmail.com" size={16} rounded="sm" />
          <span className="text-[12px] text-stone-500">procurement@enterprise.co</span>
        </div>
        <h4 className="mt-1 text-[14px] font-semibold text-stone-900">
          RFP — AI ops platform evaluation
        </h4>
        <div className="mt-0.5 text-[11px] text-stone-400">Due Friday EOD</div>
      </div>
      <div className="flex-1 bg-stone-950 p-3 font-mono text-[12px]">
        <ToolLine label="email_parse" detail="structured ticket #772" done />
        <ToolLine label="web_search" detail="evaluator requirements" done />
        <ToolLine label="write_file" detail="draft response" />
      </div>
    </VignetteChrome>
  );
}

export function DesignPipelineVisual() {
  return (
    <VignetteChrome label="design" className="bg-[#b9b4ab]">
      <div className="border-b border-black/10 bg-white px-3.5 py-2.5">
        <span className="rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-[9px] font-bold uppercase text-violet-800">
          In review
        </span>
        <h4 className="mt-1 text-[14px] font-semibold text-stone-900">Brand refresh · asset pack</h4>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="overflow-hidden rounded-lg bg-stone-950 ring-1 ring-black/30">
          <div className="flex items-center gap-2 border-b border-stone-800 bg-[#2a2a2c] px-3 py-1.5">
            <ProviderChip provider="Codex" size={14} />
            <span className="text-[12px] font-medium text-stone-100">Codex · Figma export</span>
          </div>
          <div className="space-y-1 px-3 py-2 font-mono text-[12px]">
            <ToolLine label="figma_export" detail="hero + carousel" done />
            <ToolLine label="token_diff" detail="brand tokens" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex h-20 items-end rounded-lg bg-gradient-to-br from-violet-100 to-white p-2 text-[11px] font-semibold text-stone-700 ring-1 ring-black/10">
            Hero mockup
          </div>
          <div className="overflow-hidden rounded-lg ring-1 ring-black/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={DEMO_MEDIA.linkedinCarousel} alt="" className="h-20 w-full object-cover" />
          </div>
          <div className="flex h-20 items-center justify-center rounded-lg bg-emerald-50 font-mono text-[11px] text-emerald-700 ring-1 ring-black/10">
            + token.diff
          </div>
        </div>
      </div>
    </VignetteChrome>
  );
}

export function SupportQueueVisual() {
  return (
    <VignetteChrome label="support">
      <div className="border-b border-stone-100 px-3.5 py-2.5">
        <div className="flex items-center gap-2">
          <span className="rounded border border-red-200 bg-red-50 px-2 py-0.5 text-[9px] font-bold uppercase text-red-800">
            P1
          </span>
          <span className="font-mono text-[11px] text-stone-400">#4421 · login failure</span>
        </div>
        <h4 className="mt-1 text-[14px] font-semibold text-stone-900">Zendesk · reply held for approve</h4>
      </div>
      <div className="grid flex-1 grid-cols-1 sm:grid-cols-2">
        <div className="space-y-2 border-b border-stone-100 p-3 sm:border-b-0 sm:border-r">
          {['Classified · billing session', 'KB match · reset guide', 'Reply draft · held'].map(
            (line, i) => (
              <div key={line} className="flex items-center gap-2 rounded-lg border border-stone-100 px-3 py-2.5">
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                    i < 2 ? 'bg-trooper-50 text-trooper' : 'bg-amber-50 text-amber-800'
                  }`}
                >
                  {i + 1}
                </span>
                <span className="text-[13px] text-stone-700">{line}</span>
              </div>
            ),
          )}
        </div>
        <div className="bg-stone-950 p-3 font-mono text-[12px]">
          <ToolLine label="zendesk_read" detail="thread preserved" done />
          <ToolLine label="notion_search" detail="KB: password reset" done />
          <ToolLine label="write_file" detail="reply-draft.md" />
        </div>
      </div>
    </VignetteChrome>
  );
}

export function FinanceCloseVisual() {
  return (
    <VignetteChrome label="close">
      <div className="border-b border-stone-100 px-3.5 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">
          Close · June 2026
        </span>
        <h4 className="mt-1 text-[14px] font-semibold text-stone-900">Month-end recon</h4>
      </div>
      <div className="grid flex-1 grid-cols-1 sm:grid-cols-2">
        <div className="border-b border-stone-100 p-3 sm:border-b-0 sm:border-r">
          <AppDiffCard path="recon-variance.diff" additions={1} deletions={1} lines={RECON_DIFF} />
        </div>
        <AppTerminalPanel title="qbo · stripe" className="!rounded-none !ring-0">
          <p className="text-stone-500">$ trooper finance close</p>
          <p className="mt-2 text-green-400">✓ QuickBooks ledger pull</p>
          <p className="text-green-400">✓ variance report</p>
          <p className="text-amber-300">◯ recon +$12.4k — approve ▌</p>
        </AppTerminalPanel>
      </div>
    </VignetteChrome>
  );
}

export function BdPipelineVisual() {
  return (
    <VignetteChrome label="partners">
      <div className="border-b border-stone-100 px-3.5 py-2.5">
        <h4 className="text-[14px] font-semibold text-stone-900">Stripe Connect — intro draft</h4>
      </div>
      <div className="grid flex-1 grid-cols-3 divide-x divide-stone-100 border-b border-stone-100">
        {[
          { n: 'Research', c: 4 },
          { n: 'Brief', c: 2, active: true },
          { n: 'Outreach', c: 1 },
        ].map((s) => (
          <div key={s.n} className={`px-3 py-3 ${s.active ? 'bg-trooper-50' : ''}`}>
            <div className="text-[10px] font-semibold text-stone-500">{s.n}</div>
            <div className="mt-1 text-2xl font-semibold tabular-nums">{s.c}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 space-y-3 bg-[#FAF9F6] p-3">
        <div className="rounded-lg bg-white p-3 ring-1 ring-neutral-200/70">
          <div className="mb-2 flex items-center gap-2">
            <DemoFavicon domain="stripe.com" size={16} rounded="sm" />
            <span className="text-[13px] font-semibold">Partner brief</span>
            <span className="ml-auto text-[10px] font-medium text-amber-700">Held</span>
          </div>
          <p className="text-[12px] text-stone-600">Mutual intro email — waiting on approval.</p>
        </div>
        <AppTerminalPanel title="bd tools">
          <ToolLine label="web_research" detail="Stripe Connect" done />
          <ToolLine label="write_file" detail="intro-draft.md" done />
          <ToolLine label="approve" detail="before send" />
        </AppTerminalPanel>
      </div>
    </VignetteChrome>
  );
}

export function ResearchIntelVisual() {
  return (
    <VignetteChrome label="intel">
      <div className="border-b border-stone-100 px-3.5 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">
          Q2 · agent ops landscape
        </span>
        <h4 className="mt-1 text-[14px] font-semibold text-stone-900">Competitive matrix</h4>
      </div>
      <div className="border-b border-stone-100">
        <div className="grid grid-cols-4 gap-px bg-stone-100 text-[12px]">
          {['Vendor', 'Multi-agent', 'Canvas', 'Price'].map((h) => (
            <div key={h} className="bg-stone-50 px-2.5 py-2 font-semibold text-stone-600">
              {h}
            </div>
          ))}
          {['Competitor A', 'Partial', 'No', '$89'].map((c) => (
            <div key={c} className="bg-white px-2.5 py-2 text-stone-700">
              {c}
            </div>
          ))}
          {['Trooper', 'Yes', 'Yes', 'BYOA'].map((c) => (
            <div key={c} className="bg-trooper-50 px-2.5 py-2 font-medium text-trooper-800">
              {c}
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 bg-stone-950 p-3 font-mono text-[12px]">
        <ToolLine label="browser_navigate" detail="competitor pricing" done />
        <ToolLine label="notion_write" detail="intel-brief.md" done />
        <ToolLine label="airtable_update" detail="competitive matrix" />
      </div>
    </VignetteChrome>
  );
}

export function SecurityAuditVisual() {
  return (
    <VignetteChrome label="audit" className="bg-stone-950">
      <div className="border-b border-stone-800 px-3.5 py-2.5">
        <div className="text-[13px] font-semibold text-amber-400">CVE-2026-1842 · api-gateway</div>
        <div className="mt-0.5 font-mono text-[11px] text-stone-500">audit run · production</div>
      </div>
      <div className="flex-1 space-y-1.5 px-3.5 py-3 font-mono text-[13px] leading-relaxed text-stone-400">
        <div>
          <span className="text-stone-600">09:12</span> WARN TLS 1.1 enabled
        </div>
        <div>
          <span className="text-stone-600">09:14</span> Leo · patch v2.1.1 available
        </div>
        <div>
          <span className="text-stone-600">09:16</span> $ aws_audit production
        </div>
        <div className="text-green-400">
          <span className="text-stone-600">09:18</span> rollback complete ✓
        </div>
        <div className="mt-4 rounded border border-stone-800 bg-stone-900 px-3 py-2 text-stone-300">
          findings.md + gateway-patch.diff attached
        </div>
      </div>
    </VignetteChrome>
  );
}

export function PrCommsVisual() {
  return (
    <VignetteChrome label="comms">
      <div className="border-b border-stone-100 px-3.5 py-2.5">
        <span className="rounded-full border border-fuchsia-200 bg-fuchsia-50 px-2 py-0.5 text-[9px] font-bold uppercase text-fuchsia-800">
          Embargo
        </span>
        <h4 className="mt-2 text-[14px] font-semibold text-stone-900">Series A announcement pack</h4>
      </div>
      <div className="grid flex-1 grid-cols-1 sm:grid-cols-2">
        <div className="border-b border-stone-100 p-3 sm:border-b-0 sm:border-r">
          <AppDocPanel filename="pr/announcement.md" badge="draft">
            <p className="mb-2 text-neutral-500"># Press release</p>
            <p className="mb-1">- Release drafted</p>
            <p className="mb-1">- Media list tier A/B updated</p>
            <p className="text-amber-700">- CEO quote · pending approval</p>
          </AppDocPanel>
        </div>
        <div className="bg-stone-950 p-3 font-mono text-[12px]">
          <ToolLine label="write_file" detail="press-release.md" done />
          <ToolLine label="sheets_update" detail="media list" done />
          <ToolLine label="approve" detail="CEO quote" />
        </div>
      </div>
    </VignetteChrome>
  );
}

export function GrowthExperimentsVisual() {
  return (
    <VignetteChrome label="experiment">
      <div className="border-b border-stone-100 px-3.5 py-2.5">
        <div className="flex items-center gap-2">
          <span className="rounded border border-amber-200 bg-amber-50 px-2 py-0.5 text-[9px] font-bold uppercase text-amber-800">
            Winner: Variant B
          </span>
          <span className="text-[12px] text-stone-500">+38% signup lift</span>
        </div>
      </div>
      <div className="grid grid-cols-2 divide-x divide-stone-100 border-b border-stone-100">
        <div className="px-4 py-4">
          <div className="text-[11px] text-stone-500">Control</div>
          <div className="text-3xl font-semibold tabular-nums text-stone-900">4.2%</div>
        </div>
        <div className="bg-trooper-50 px-4 py-4">
          <div className="text-[11px] text-trooper-700">Variant B</div>
          <div className="text-3xl font-semibold tabular-nums text-trooper-900">5.8%</div>
        </div>
      </div>
      <div className="flex-1 bg-stone-950 p-3 font-mono text-[12px]">
        <ToolLine label="sheets_read" detail="funnel metrics" done />
        <ToolLine label="notion_write" detail="experiment-doc.md" done />
        <ToolLine label="write_file" detail="rollout-checklist.md" />
      </div>
    </VignetteChrome>
  );
}

export function BrowserSerpVisual() {
  return (
    <VignetteChrome label="browser" className="bg-[#b9b4ab]">
      <div className="border-b border-black/10 bg-white px-3.5 py-2.5">
        <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-stone-400">
          Browser on demand
        </span>
        <h4 className="mt-1 text-[14px] font-semibold text-stone-900">Live session · SERP capture</h4>
      </div>
      <div className="flex flex-1 flex-col gap-0 p-3">
        <div className="overflow-hidden rounded-lg shadow-md ring-1 ring-black/25">
          <DemoBrowserFrame
            addressUrl="google.com/search?q=ai+ops+platform+pricing"
            faviconDomain="google.com"
            title="SERP"
            compact
          >
            <div className="h-[140px] space-y-2 overflow-hidden bg-white p-3 text-[12px]">
              <p className="text-[11px] text-stone-400">About 2,400,000 results</p>
              <div>
                <p className="text-[13px] font-medium text-blue-700">Competitor A — Pricing</p>
                <p className="text-[11px] text-stone-500">$89/seat · multi-agent: partial</p>
              </div>
              <div>
                <p className="text-[13px] font-medium text-blue-700">Trooper — BYOA harness</p>
                <p className="text-[11px] text-stone-500">Your keys · traced tickets</p>
              </div>
            </div>
          </DemoBrowserFrame>
        </div>
        <div className="mt-2 rounded-lg bg-stone-950 px-3 py-2.5 font-mono text-[12px]">
          <ToolLine label="browser_navigate" detail="SERP snapshot captured" done />
          <ToolLine label="browser_snapshot" detail="competitor pricing extracted" done />
          <ToolLine label="write_file" detail="research-notes.md" />
        </div>
      </div>
    </VignetteChrome>
  );
}

export function LaunchOpsVisual() {
  return (
    <VignetteChrome label="launch" className="bg-[#b9b4ab]">
      <div className="border-b border-black/10 bg-white px-3.5 py-2.5">
        <span className="rounded-full border border-pink-200 bg-pink-50 px-2 py-0.5 text-[9px] font-bold uppercase text-pink-800">
          Multi-agent
        </span>
        <h4 className="mt-1 text-[14px] font-semibold text-stone-900">Wonder PH launch</h4>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="grid grid-cols-3 gap-2">
          {['Product Hunt', 'Press wire', 'Social cut'].map((lane) => (
            <div key={lane} className="rounded-lg bg-white px-2 py-2.5 text-center ring-1 ring-black/10">
              <div className="text-[12px] font-medium text-stone-800">{lane}</div>
              <div className="mt-1 text-[11px] text-trooper">In progress</div>
            </div>
          ))}
        </div>
        <div className="overflow-hidden rounded-lg bg-stone-950 ring-1 ring-black/30">
          <div className="flex items-center gap-2 border-b border-stone-800 bg-[#2a2a2c] px-3 py-1.5">
            <Laptop size={14} className="text-stone-400" />
            <span className="text-[12px] font-medium text-stone-100">Browser + desktop attached</span>
          </div>
          <div className="space-y-1 px-3 py-2.5 font-mono text-[12px]">
            <ToolLine label="producthunt_submit" detail="listing queued" done />
            <ToolLine label="browser_navigate" detail="PH preview captured" done />
            <ToolLine label="slack_post" detail="#launch coordination" />
          </div>
        </div>
      </div>
    </VignetteChrome>
  );
}
