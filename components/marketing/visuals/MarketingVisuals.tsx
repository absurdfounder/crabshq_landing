'use client';

import {
  Check, Loader2, FileText, Terminal, Hash, Play, Image as ImageIcon,
} from 'lucide-react';
import { DemoFavicon } from '@/components/DemoFavicon';
import { VignetteChrome, ProviderChip, TrooperMark } from './shared';

function ToolRow({ label, detail, done }: { label: string; detail: string; done?: boolean }) {
  return (
    <div className="flex items-center gap-2 py-1 text-[11px]">
      {done ? <Check size={12} className="text-trooper shrink-0" /> : <Loader2 size={12} className="animate-spin text-[#3f6b00] shrink-0" />}
      <span className="font-mono font-semibold text-stone-800">{label}</span>
      <span className="truncate text-stone-400">{detail}</span>
    </div>
  );
}

/* ─── Coding: multi-agent harness with provider logos ─── */
export function CodingHarnessVisual() {
  const lanes = [
    { provider: 'Codex', agent: 'Leo', task: 'parser.ts patch', tools: ['apply_patch', 'exec tests'] },
    { provider: 'Claude Code', agent: 'Ren', task: 'status.html', tools: ['write_file', 'preview'] },
    { provider: 'OpenCode', agent: 'Leo', task: 'etl/dedupe.ts', tools: ['apply_patch'] },
  ];

  return (
    <VignetteChrome label="trooper · harness">
      <div className="grid grid-cols-3 divide-x divide-stone-100 bg-white min-h-[280px]">
        {lanes.map((lane) => (
          <div key={lane.provider} className="flex flex-col">
            <div className="flex items-center gap-2 border-b border-stone-100 px-2.5 py-2 bg-stone-50/80">
              <ProviderChip provider={lane.provider} size={14} />
              <span className="text-[10px] font-bold text-stone-700 truncate">{lane.provider}</span>
            </div>
            <div className="flex-1 p-2.5">
              <div className="text-[10px] font-semibold text-stone-800 mb-1">{lane.task}</div>
              <div className="text-[9px] text-stone-400 mb-2">{lane.agent} · in progress</div>
              <div className="rounded-lg border border-stone-100 bg-[#FAF9F6] p-2 space-y-0.5">
                {lane.tools.map((t) => (
                  <ToolRow key={t} label={t} detail="traced" done={t.includes('exec') || t.includes('preview')} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-stone-100 bg-[#FAF9F6] px-3 py-2">
        <span className="font-mono text-[10px] text-stone-500">3 agents · your subscriptions</span>
        <span className="font-mono text-[10px] text-trooper-700">Live diffs</span>
      </div>
    </VignetteChrome>
  );
}

/* ─── Coding: artifact stack — diff, page, image, video ─── */
export function CodingBoardVisual() {
  return (
    <VignetteChrome label="trooper · artifacts">
      <div className="grid grid-cols-2 gap-0 min-h-[280px]">
        <div className="border-r border-stone-100 p-3 bg-stone-900">
          <div className="font-mono text-[9px] text-green-400 mb-2">parser.ts.diff</div>
          <div className="font-mono text-[9px] leading-relaxed text-stone-400 space-y-0.5">
            <div className="text-red-400/80">- .map(line =&gt; line.trim());</div>
            <div className="text-green-400/90">+ .filter(Boolean);</div>
            <div className="text-stone-500">  return rows.map(parseRow);</div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex-1 p-2 border-b border-stone-100 bg-gradient-to-br from-[#3f6b00] to-[#1c1917] text-white p-3">
            <div className="text-[9px] uppercase tracking-widest opacity-70">Live preview</div>
            <div className="text-sm font-bold mt-1">Parser hotfix</div>
            <div className="grid grid-cols-3 gap-1 mt-3">
              {['24 tests', '3 agents', 'PR #418'].map((s) => (
                <div key={s} className="rounded bg-white/10 px-1.5 py-1 text-[8px] text-center">{s}</div>
              ))}
            </div>
          </div>
          <div className="flex gap-2 p-2 bg-white">
            <div className="flex-1 rounded border border-stone-200 p-1.5 flex flex-col items-center justify-center bg-stone-50">
              <ImageIcon size={14} className="text-stone-400 mb-1" />
              <span className="text-[8px] text-stone-500">OG image</span>
            </div>
            <div className="flex-1 rounded border border-stone-200 p-1.5 flex flex-col items-center justify-center bg-stone-900">
              <Play size={14} className="text-white mb-1" fill="white" />
              <span className="text-[8px] text-stone-400">32s clip</span>
            </div>
          </div>
        </div>
      </div>
    </VignetteChrome>
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
          {['Landing', 'Carousel', 'Video'].map((a) => (
            <div key={a} className="rounded border border-dashed border-stone-200 py-3 text-center text-[9px] font-mono uppercase text-stone-400">{a}</div>
          ))}
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
