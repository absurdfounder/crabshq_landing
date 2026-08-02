'use client';

import type { ReactNode } from 'react';
import {
  BookOpen,
  Calendar,
  Check,
  FileText,
  Hash,
  Play,
  Search,
  Sparkles,
} from 'lucide-react';
import { DemoFavicon, DemoBrowserFrame, demoAssetPath as assetPath, DEMO_MEDIA } from '@trooper/demo';
import { VignetteChrome, TrooperMark } from './shared';
import { AppDiffCard, AppDocPanel, type DiffLine } from './productSurfaces';
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

/** Human-readable activity — never snake_case tools or dark terminals. */
function DidList({
  title = 'What happened',
  items,
}: {
  title?: string;
  items: { icon?: ReactNode; label: string; done?: boolean; held?: boolean }[];
}) {
  return (
    <div className="rounded-xl bg-[#FAF9F6] p-3.5 ring-1 ring-stone-200/60">
      <div className="mb-2.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-stone-500">
        <Check size={12} className="text-trooper" />
        {title}
      </div>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item.label} className="flex items-start gap-2.5 text-[13px] leading-snug">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white text-stone-500 ring-1 ring-stone-200/80">
              {item.icon ?? (item.done ? <Check size={12} className="text-trooper" /> : <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />)}
            </span>
            <span className={item.held ? 'font-medium text-amber-800' : 'text-stone-700'}>
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ApproveBar({ label = 'Waiting on your approval' }: { label?: string }) {
  return (
    <div className="flex items-center justify-between border-t border-stone-100 bg-white px-3.5 py-2.5 text-[12px]">
      <span className="text-stone-500">Nothing ships until you say so</span>
      <span className="rounded-lg bg-stone-900 px-3 py-1.5 font-medium text-white">
        {label} →
      </span>
    </div>
  );
}

/** Generic pack review — documents + previews, no tool terminals. */
export function CanvasBoardVisual() {
  return (
    <VignetteChrome label="review pack">
      <div className="border-b border-stone-100 px-3.5 py-3">
        <span className="rounded border border-trooper-200 bg-trooper-50 px-2 py-0.5 text-[10px] font-semibold text-trooper-800">
          Ready for review
        </span>
        <h4 className="mt-2 text-[15px] font-semibold leading-snug text-stone-900">
          4 deliverables ready — review the set before you approve.
        </h4>
        <p className="mt-1.5 text-[13px] leading-relaxed text-stone-600">
          Brief, preview, and notes sit together so you decide once — instead of chasing files.
        </p>
      </div>
      <div className="grid flex-1 grid-cols-1 gap-3 bg-[#FAF9F6] p-3 sm:grid-cols-2">
        <AppDocPanel filename="Brief" badge="draft">
          <p className="mb-2 font-semibold text-neutral-900">Mission brief</p>
          <p className="mb-1">- Context loaded from org memory</p>
          <p className="mb-1">- First draft attached</p>
          <p className="text-amber-700">- Held for your review</p>
        </AppDocPanel>
        <div className="flex flex-col gap-3">
          <div className="overflow-hidden rounded-xl bg-white ring-1 ring-stone-200/70">
            <DemoBrowserFrame
              addressUrl="preview.trooper.so"
              faviconDomain="trooper.so"
              title="Preview"
              compact
            >
              <div className="flex h-[100px] items-center justify-center bg-[#FAF9F6] text-[12px] text-stone-500">
                Preview attached
              </div>
            </DemoBrowserFrame>
          </div>
          <DidList
            items={[
              { label: 'Draft prepared', done: true },
              { label: 'Preview attached', done: true },
              { label: 'Waiting on your approval', held: true },
            ]}
          />
        </div>
      </div>
      <ApproveBar label="Review & approve" />
    </VignetteChrome>
  );
}

export function CampaignPipelineVisual() {
  return (
    <VignetteChrome label="campaign">
      <div className="border-b border-stone-100 px-3.5 py-3">
        <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[9px] font-bold uppercase text-amber-800">
          In progress
        </span>
        <h4 className="mt-2 text-[15px] font-semibold text-stone-900">
          Landing, carousel, and video — moving on one campaign.
        </h4>
      </div>
      <div className="grid grid-cols-4 divide-x divide-stone-100 border-b border-stone-100">
        {[
          { label: 'SEO recon', status: 'done' },
          { label: 'Pillar page', status: 'running' },
          { label: 'Carousel', status: 'running' },
          { label: 'Video cut', status: 'pending' },
        ].map((l) => (
          <div key={l.label} className="px-2.5 py-3">
            <div
              className={`mb-1.5 h-1.5 w-1.5 rounded-full ${
                l.status === 'done'
                  ? 'bg-trooper'
                  : l.status === 'running'
                    ? 'animate-pulse bg-amber-500'
                    : 'bg-stone-300'
              }`}
            />
            <div className="text-[12px] font-medium text-stone-800">{l.label}</div>
          </div>
        ))}
      </div>
      <div className="grid flex-1 grid-cols-3 gap-2 bg-[#FAF9F6] p-3">
        <div className="overflow-hidden rounded-lg ring-1 ring-stone-200/70">
          <DemoBrowserFrame
            src={assetPath('marketing', 'campaign.html')}
            addressUrl="northstar.io/q2"
            faviconDomain="northstar.io"
            compact
          />
        </div>
        <div className="overflow-hidden rounded-lg ring-1 ring-stone-200/70">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={DEMO_MEDIA.linkedinCarousel}
            alt=""
            className="h-full min-h-[100px] w-full object-cover"
          />
        </div>
        <div className="flex items-center justify-center rounded-lg bg-stone-900 ring-1 ring-stone-800">
          <Play size={20} className="text-white" fill="white" />
        </div>
      </div>
    </VignetteChrome>
  );
}

export function SalesPipelineVisual() {
  return (
    <VignetteChrome label="pipeline">
      <div className="border-b border-stone-100 px-3.5 py-3">
        <h4 className="text-[15px] font-semibold text-stone-900">
          Acme Corp moved to Qualified — draft ready for your send.
        </h4>
        <p className="mt-1.5 text-[13px] text-stone-600">
          Research done, outreach written, held until you approve.
        </p>
      </div>
      <div className="grid grid-cols-4 divide-x divide-stone-100 border-b border-stone-100">
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
        <div className="rounded-xl bg-white p-3.5 ring-1 ring-stone-200/70">
          <div className="mb-2 flex items-center gap-2">
            <DemoFavicon domain="linkedin.com" size={16} rounded="sm" />
            <span className="text-[13px] font-semibold text-stone-800">Outreach draft</span>
            <span className="ml-auto rounded border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-800">
              Held
            </span>
          </div>
          <p className="text-[13px] leading-relaxed text-stone-600">
            Personalized hook + demo CTA — waiting on approval before send.
          </p>
        </div>
        <DidList
          items={[
            { icon: <Search size={12} />, label: 'Researched Acme Corp', done: true },
            { icon: <FileText size={12} />, label: 'Drafted outreach', done: true },
            { icon: <Calendar size={12} />, label: 'Held for your approval', held: true },
          ]}
        />
      </div>
      <ApproveBar label="Review & send" />
    </VignetteChrome>
  );
}

export function SlackRoutingVisual() {
  return (
    <VignetteChrome label="slack → ticket">
      <div className="grid flex-1 grid-cols-1 sm:grid-cols-2">
        <div className="border-b border-stone-100 bg-[#f8f5fb] p-3.5 sm:border-b-0 sm:border-r">
          <div className="mb-2 text-[11px] font-bold text-[#611f69]">#sales</div>
          <div className="mb-2 rounded-lg bg-white p-3 shadow-sm">
            <div className="mb-1 text-[12px] font-semibold">Sarah Chen</div>
            <p className="text-[13px] text-stone-700">Can we schedule a Trooper demo this week?</p>
          </div>
          <div className="rounded-lg border border-[#611f69]/15 bg-white/80 px-3 py-2 text-[12px] text-stone-600">
            <span className="font-semibold text-[#611f69]">Jordan</span> · opening a ticket…
          </div>
        </div>
        <div className="flex flex-col bg-white p-3.5">
          <div className="mb-1 text-[11px] font-medium uppercase tracking-wide text-stone-400">
            Ticket #4421
          </div>
          <h4 className="mb-3 text-[15px] font-semibold text-stone-900">Schedule Acme demo</h4>
          <DidList
            items={[
              { label: 'Slack thread kept on the ticket', done: true },
              { label: 'Acme background researched', done: true },
              { label: 'Thursday 2pm hold proposed', held: true },
            ]}
          />
        </div>
      </div>
    </VignetteChrome>
  );
}

export function WhatsAppRoutingVisual() {
  return (
    <VignetteChrome label="whatsapp" className="bg-[#ece5dd]">
      <div className="flex flex-1 flex-col gap-3 p-3.5">
        <div className="ml-auto max-w-[85%] rounded-lg rounded-tr-none bg-[#dcf8c6] px-3 py-2.5 text-[13px] text-stone-800 shadow-sm">
          Login still broken after password reset
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-3.5 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <TrooperMark className="h-4 w-4" />
            <span className="text-[13px] font-semibold">Ticket #881</span>
            <span className="ml-auto rounded bg-amber-50 px-1.5 py-0.5 text-[10px] text-amber-700">
              In progress
            </span>
          </div>
          <DidList
            items={[
              { label: 'Message routed to Leo', done: true },
              { label: 'Billing session reset in progress', held: true },
            ]}
          />
        </div>
      </div>
    </VignetteChrome>
  );
}

export function LegalReviewVisual() {
  return (
    <VignetteChrome label="counsel review">
      <div className="border-b border-stone-100 px-3.5 py-3">
        <span className="rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-[9px] font-bold uppercase text-red-800">
          Approval required
        </span>
        <h4 className="mt-2 text-[15px] font-semibold text-stone-900">
          MSA redline ready — 14 clauses flagged for counsel.
        </h4>
        <p className="mt-1.5 text-[13px] leading-relaxed text-stone-600">
          First-pass summary and redline are drafted. Nothing leaves until you sign off.
        </p>
      </div>
      <div className="grid flex-1 grid-cols-1 gap-3 bg-[#FAF9F6] p-3 sm:grid-cols-2">
        <AppDocPanel filename="MSA redline" badge="14 flags">
          <p className="mb-2 font-semibold text-neutral-900">Review summary</p>
          <p className="mb-1">- 14 clauses vs playbook</p>
          <p className="mb-1">- Redline drafted</p>
          <p className="text-amber-700">- Counsel sign-off before counter</p>
        </AppDocPanel>
        <DidList
          title="What was prepared"
          items={[
            { icon: <BookOpen size={12} />, label: 'Parsed 42-page MSA', done: true },
            { icon: <FileText size={12} />, label: 'Compared against playbook', done: true },
            { icon: <Sparkles size={12} />, label: 'Waiting on counsel approval', held: true },
          ]}
        />
      </div>
      <ApproveBar label="Review & approve" />
    </VignetteChrome>
  );
}

export function OpsRunbookVisual() {
  return (
    <VignetteChrome label="checklist">
      <div className="border-b border-stone-100 px-3.5 py-3">
        <span className="text-[11px] font-medium uppercase tracking-wide text-stone-400">
          Weekly checklist · W24
        </span>
        <h4 className="mt-1.5 text-[15px] font-semibold text-stone-900">
          3 of 4 checks done — one item waiting on you.
        </h4>
      </div>
      <div className="flex-1 space-y-0 bg-white">
        {[
          { label: 'Vendor reconciliation', done: true },
          { label: 'Access review', done: true },
          { label: 'Budget variance report', done: false, blocked: true },
          { label: 'Backup verification', done: true },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 border-b border-stone-50 px-3.5 py-3.5 last:border-0"
          >
            <span
              className={`flex h-5 w-5 items-center justify-center rounded border text-[11px] ${
                item.done ? 'border-trooper bg-trooper-50 text-trooper' : 'border-stone-300'
              }`}
            >
              {item.done ? '✓' : ''}
            </span>
            <span
              className={`flex-1 text-[13px] ${item.blocked ? 'font-medium text-amber-800' : 'text-stone-700'}`}
            >
              {item.label}
            </span>
            {item.blocked ? (
              <span className="text-[11px] font-medium text-amber-700">Needs approval</span>
            ) : (
              <span className="text-[11px] text-stone-400">Done</span>
            )}
          </div>
        ))}
      </div>
      <ApproveBar label="Approve variance" />
    </VignetteChrome>
  );
}

/** Eng/security — dark ops console is intentional. */
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
          <span className="text-stone-600">08:16</span> kubectl logs api-gateway
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
        <div className="text-center text-[12px] text-stone-400">becomes</div>
        <div className="mx-auto w-full max-w-sm rounded-xl border border-trooper-200 bg-white p-4 shadow-sm">
          <Hash size={16} className="mx-auto mb-1 text-trooper" />
          <div className="text-center text-[13px] font-bold text-trooper-800">Traced ticket #991</div>
          <div className="mt-3">
            <DidList
              items={[
                { label: 'Conversation kept with the ticket', done: true },
                { label: 'Work opened on the board', done: true },
              ]}
            />
          </div>
        </div>
      </div>
    </VignetteChrome>
  );
}

export function EmailRoutingVisual() {
  return (
    <VignetteChrome label="inbox">
      <div className="border-b border-stone-100 px-3.5 py-3">
        <div className="flex items-center gap-2">
          <DemoFavicon domain="gmail.com" size={16} rounded="sm" />
          <span className="text-[12px] text-stone-500">procurement@enterprise.co</span>
        </div>
        <h4 className="mt-2 text-[15px] font-semibold text-stone-900">
          RFP turned into ticket #772 — draft held for you.
        </h4>
        <div className="mt-1 text-[12px] text-stone-400">Due Friday EOD</div>
      </div>
      <div className="flex-1 space-y-3 bg-[#FAF9F6] p-3">
        <div className="rounded-xl bg-white p-3.5 ring-1 ring-stone-200/70">
          <div className="text-[11px] font-medium uppercase tracking-wide text-stone-400">
            Draft response
          </div>
          <p className="mt-1.5 text-[13px] leading-relaxed text-stone-700">
            Evaluation requirements mapped. Reply drafted and held — nothing sends until you approve.
          </p>
        </div>
        <DidList
          items={[
            { label: 'Email filed as a ticket', done: true },
            { label: 'Evaluator requirements researched', done: true },
            { label: 'Response draft ready for review', held: true },
          ]}
        />
      </div>
      <ApproveBar label="Review draft" />
    </VignetteChrome>
  );
}

export function DesignPipelineVisual() {
  return (
    <VignetteChrome label="design">
      <div className="border-b border-stone-100 px-3.5 py-3">
        <span className="rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-[9px] font-bold uppercase text-violet-800">
          In review
        </span>
        <h4 className="mt-2 text-[15px] font-semibold text-stone-900">
          Brand refresh pack — exports ready for handoff.
        </h4>
        <p className="mt-1.5 text-[13px] text-stone-600">
          Hero, carousel, and token updates gathered for review.
        </p>
      </div>
      <div className="flex flex-1 flex-col gap-3 bg-[#FAF9F6] p-3">
        <div className="grid grid-cols-3 gap-2">
          <div className="flex h-24 items-end rounded-xl bg-gradient-to-br from-violet-100 to-white p-2.5 text-[12px] font-semibold text-stone-700 ring-1 ring-stone-200/70">
            Hero mockup
          </div>
          <div className="overflow-hidden rounded-xl ring-1 ring-stone-200/70">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={DEMO_MEDIA.linkedinCarousel} alt="" className="h-24 w-full object-cover" />
          </div>
          <div className="flex h-24 items-center justify-center rounded-xl bg-emerald-50 text-[12px] font-semibold text-emerald-800 ring-1 ring-stone-200/70">
            Brand tokens
          </div>
        </div>
        <DidList
          items={[
            { label: 'Figma frames audited', done: true },
            { label: 'Asset export bundled', done: true },
            { label: 'Token changes flagged for review', held: true },
          ]}
        />
      </div>
      <ApproveBar label="Review assets" />
    </VignetteChrome>
  );
}

export function SupportQueueVisual() {
  return (
    <VignetteChrome label="support">
      <div className="border-b border-stone-100 px-3.5 py-3">
        <div className="flex items-center gap-2">
          <span className="rounded border border-red-200 bg-red-50 px-2 py-0.5 text-[9px] font-bold uppercase text-red-800">
            P1
          </span>
          <span className="text-[12px] text-stone-400">#4421 · login failure</span>
        </div>
        <h4 className="mt-2 text-[15px] font-semibold text-stone-900">
          Reply drafted from the knowledge base — held for a human send.
        </h4>
      </div>
      <div className="grid flex-1 grid-cols-1 gap-3 bg-[#FAF9F6] p-3 sm:grid-cols-2">
        <div className="space-y-2">
          {['Classified as billing session', 'Matched reset guide in KB', 'Reply draft held'].map(
            (line, i) => (
              <div
                key={line}
                className="flex items-center gap-2 rounded-xl border border-stone-100 bg-white px-3 py-2.5"
              >
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
        <DidList
          items={[
            { label: 'Zendesk thread preserved', done: true },
            { label: 'KB article matched', done: true },
            { label: 'Waiting on agent to send', held: true },
          ]}
        />
      </div>
      <ApproveBar label="Review & send" />
    </VignetteChrome>
  );
}

export function FinanceCloseVisual() {
  return (
    <VignetteChrome label="close">
      <div className="border-b border-stone-100 px-3.5 py-3">
        <span className="text-[11px] font-medium uppercase tracking-wide text-stone-400">
          Close · June 2026
        </span>
        <h4 className="mt-1.5 text-[15px] font-semibold text-stone-900">
          +$12.4k variance flagged — ready for controller review.
        </h4>
        <p className="mt-1.5 text-[13px] text-stone-600">
          Ledger pull and variance notes prepared. Nothing posts until you approve.
        </p>
      </div>
      <div className="grid flex-1 grid-cols-1 gap-3 bg-[#FAF9F6] p-3 sm:grid-cols-2">
        <AppDiffCard path="recon-variance.diff" additions={1} deletions={1} lines={RECON_DIFF} />
        <DidList
          title="Close progress"
          items={[
            { label: 'QuickBooks ledger pulled', done: true },
            { label: 'Variance report written', done: true },
            { label: 'Held for controller sign-off', held: true },
          ]}
        />
      </div>
      <ApproveBar label="Review & sign off" />
    </VignetteChrome>
  );
}

export function BdPipelineVisual() {
  return (
    <VignetteChrome label="partners">
      <div className="border-b border-stone-100 px-3.5 py-3">
        <h4 className="text-[15px] font-semibold text-stone-900">
          Stripe Connect intro draft — ready when you are.
        </h4>
        <p className="mt-1.5 text-[13px] text-stone-600">
          Partner brief and mutual intro written. Outreach waits on your approval.
        </p>
      </div>
      <div className="grid grid-cols-3 divide-x divide-stone-100 border-b border-stone-100">
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
        <div className="rounded-xl bg-white p-3.5 ring-1 ring-stone-200/70">
          <div className="mb-2 flex items-center gap-2">
            <DemoFavicon domain="stripe.com" size={16} rounded="sm" />
            <span className="text-[13px] font-semibold">Partner brief</span>
            <span className="ml-auto text-[10px] font-medium text-amber-700">Held</span>
          </div>
          <p className="text-[13px] text-stone-600">Mutual intro email — waiting on approval.</p>
        </div>
        <DidList
          items={[
            { label: 'Partner research compiled', done: true },
            { label: 'Intro draft written', done: true },
            { label: 'Held before send', held: true },
          ]}
        />
      </div>
      <ApproveBar label="Review & send" />
    </VignetteChrome>
  );
}

export function ResearchIntelVisual() {
  return (
    <VignetteChrome label="intel">
      <div className="border-b border-stone-100 px-3.5 py-3">
        <span className="text-[11px] font-medium uppercase tracking-wide text-stone-400">
          Q2 · agent ops landscape
        </span>
        <h4 className="mt-1.5 text-[15px] font-semibold text-stone-900">
          Competitive matrix ready for leadership review.
        </h4>
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
      <div className="bg-[#FAF9F6] p-3">
        <DidList
          items={[
            { label: 'Competitor pricing captured', done: true },
            { label: 'Intel brief drafted', done: true },
            { label: 'Matrix updated for review', done: true },
          ]}
        />
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
          <span className="text-stone-600">09:16</span> aws_audit production
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
      <div className="border-b border-stone-100 px-3.5 py-3">
        <span className="rounded-full border border-fuchsia-200 bg-fuchsia-50 px-2 py-0.5 text-[9px] font-bold uppercase text-fuchsia-800">
          Embargo
        </span>
        <h4 className="mt-2 text-[15px] font-semibold text-stone-900">
          Series A announcement pack — draft ready for your edit.
        </h4>
      </div>
      <div className="grid flex-1 grid-cols-1 gap-3 bg-[#FAF9F6] p-3 sm:grid-cols-2">
        <AppDocPanel filename="Press release" badge="draft">
          <p className="mb-2 font-semibold text-neutral-900">Announcement</p>
          <p className="mb-1">- Release drafted</p>
          <p className="mb-1">- Media list tier A/B updated</p>
          <p className="text-amber-700">- CEO quote pending approval</p>
        </AppDocPanel>
        <DidList
          items={[
            { label: 'Press release drafted', done: true },
            { label: 'Media list updated', done: true },
            { label: 'CEO quote waiting on you', held: true },
          ]}
        />
      </div>
      <ApproveBar label="Review & edit" />
    </VignetteChrome>
  );
}

export function GrowthExperimentsVisual() {
  return (
    <VignetteChrome label="experiment">
      <div className="border-b border-stone-100 px-3.5 py-3">
        <div className="flex items-center gap-2">
          <span className="rounded border border-amber-200 bg-amber-50 px-2 py-0.5 text-[9px] font-bold uppercase text-amber-800">
            Winner: Variant B
          </span>
          <span className="text-[12px] text-stone-500">+38% signup lift</span>
        </div>
        <h4 className="mt-2 text-[15px] font-semibold text-stone-900">
          Experiment documented — rollout checklist ready.
        </h4>
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
      <div className="bg-[#FAF9F6] p-3">
        <DidList
          items={[
            { label: 'Funnel metrics pulled', done: true },
            { label: 'Experiment write-up drafted', done: true },
            { label: 'Rollout checklist prepared', done: true },
          ]}
        />
      </div>
    </VignetteChrome>
  );
}

export function BrowserSerpVisual() {
  return (
    <VignetteChrome label="research">
      <div className="border-b border-stone-100 px-3.5 py-3">
        <h4 className="text-[15px] font-semibold text-stone-900">
          Live pages captured — pricing and claims ready to cite.
        </h4>
        <p className="mt-1.5 text-[13px] text-stone-600">
          Sources stay attached so the brief is evidence, not guesswork.
        </p>
      </div>
      <div className="flex flex-1 flex-col gap-3 bg-[#FAF9F6] p-3">
        <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-stone-200/70">
          <DemoBrowserFrame
            addressUrl="google.com/search?q=ai+ops+platform+pricing"
            faviconDomain="google.com"
            title="Search"
            compact
          >
            <div className="h-[120px] space-y-2 overflow-hidden bg-white p-3 text-[12px]">
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
        <DidList
          items={[
            { label: 'Search results captured', done: true },
            { label: 'Competitor pricing extracted', done: true },
            { label: 'Notes attached to the brief', done: true },
          ]}
        />
      </div>
    </VignetteChrome>
  );
}

export function LaunchOpsVisual() {
  return (
    <VignetteChrome label="launch">
      <div className="border-b border-stone-100 px-3.5 py-3">
        <span className="rounded-full border border-pink-200 bg-pink-50 px-2 py-0.5 text-[9px] font-bold uppercase text-pink-800">
          Multi-stream
        </span>
        <h4 className="mt-2 text-[15px] font-semibold text-stone-900">
          Launch day workstreams — Product Hunt, press, and social together.
        </h4>
      </div>
      <div className="flex flex-1 flex-col gap-3 bg-[#FAF9F6] p-3">
        <div className="grid grid-cols-3 gap-2">
          {['Product Hunt', 'Press wire', 'Social cut'].map((lane) => (
            <div
              key={lane}
              className="rounded-xl bg-white px-2 py-3 text-center ring-1 ring-stone-200/70"
            >
              <div className="text-[12px] font-medium text-stone-800">{lane}</div>
              <div className="mt-1 text-[11px] text-trooper">In progress</div>
            </div>
          ))}
        </div>
        <DidList
          items={[
            { label: 'PH listing queued', done: true },
            { label: 'Preview captured for review', done: true },
            { label: 'Launch channel updated', done: true },
          ]}
        />
      </div>
    </VignetteChrome>
  );
}
