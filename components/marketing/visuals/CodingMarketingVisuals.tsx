'use client';

import type { ReactNode } from 'react';
import {
  Check, Loader2, GitCommit, Terminal, FileText, Shield,
} from 'lucide-react';
import { DemoFavicon } from '@trooper/demo';
import { VignetteChrome, ProviderChip } from './shared';

function ToolRow({
  label, detail, done, running, icon,
}: {
  label: string;
  detail: string;
  done?: boolean;
  running?: boolean;
  icon?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 py-1 text-[10px]">
      {done ? (
        <Check size={11} className="text-trooper shrink-0" />
      ) : running ? (
        <Loader2 size={11} className="animate-spin text-amber-600 shrink-0" />
      ) : (
        <span className="h-2 w-2 rounded-full border border-stone-300 shrink-0" />
      )}
      {icon}
      <span className="font-mono font-semibold text-stone-800">{label}</span>
      <span className="truncate text-stone-400">{detail}</span>
    </div>
  );
}

const HARNESS_LANES = [
  {
    provider: 'Codex',
    agent: 'Leo',
    task: 'src/parser.ts',
    branch: 'fix/parser-null-rows',
    diff: '+5 −1',
    tools: [
      { label: 'exec', detail: 'npm test — repro failure', done: true },
      { label: 'apply_patch', detail: 'filter empty CSV rows', done: true },
      { label: 'exec', detail: 'npm run test:integration', running: true },
    ],
  },
  {
    provider: 'OpenCode',
    agent: 'Leo',
    task: 'etl/dedupe.ts',
    branch: 'fix/etl-dedupe',
    diff: '+3 −0',
    tools: [
      { label: 'apply_patch', detail: 'ignore empty row ids', done: true },
      { label: 'exec', detail: 'dedupe.integration.test', done: true },
    ],
  },
  {
    provider: 'Claude Code',
    agent: 'Ren',
    task: 'tests/parser.test.ts',
    branch: 'fix/parser-null-rows',
    diff: '+12 −0',
    tools: [
      { label: 'write_file', detail: 'empty CSV regression case', done: true },
      { label: 'exec', detail: 'vitest parser.test.ts', running: true },
    ],
  },
];

/* ─── [03] Multi-agent harness — ticket + parallel provider lanes ─── */
export function CodingHarnessVisual() {
  return (
    <VignetteChrome label="trooper · ticket #1 · harness">
      <div className="border-b border-stone-100 bg-white px-3 py-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[9px] uppercase tracking-widest text-stone-400">ENG · parser hotfix</span>
              <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide text-amber-800">
                In progress
              </span>
            </div>
            <h4 className="font-semibold text-[13px] text-stone-900 leading-snug truncate">
              Fix invoice parser null rows
            </h4>
          </div>
          <div className="flex -space-x-1.5 shrink-0">
            {['Leo', 'Ren', 'Jordan'].map((name) => (
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
          <span className="inline-flex items-center gap-1 rounded border border-stone-200 bg-stone-50 px-1.5 py-0.5 text-[8px] font-mono text-stone-600">
            <DemoFavicon domain="github.com" size={10} rounded="sm" />
            acme-billing
          </span>
          <span className="font-mono text-[8px] text-stone-400">3 harnesses · BYOA</span>
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x divide-stone-100 bg-white min-h-[220px]">
        {HARNESS_LANES.map((lane, idx) => (
          <div key={lane.provider} className={`flex flex-col ${idx === 0 ? 'bg-trooper-50/20' : ''}`}>
            <div className="flex items-center gap-1.5 border-b border-stone-100 px-2 py-2 bg-stone-50/80">
              <ProviderChip provider={lane.provider} size={14} />
              <div className="min-w-0 flex-1">
                <div className="text-[9px] font-bold text-stone-800 truncate">{lane.provider}</div>
                <div className="text-[8px] text-stone-400 truncate">{lane.agent} · {lane.branch}</div>
              </div>
              <span className="font-mono text-[8px] text-trooper-700 shrink-0">{lane.diff}</span>
            </div>
            <div className="flex-1 p-2">
              <div className="mb-1.5 font-mono text-[9px] font-semibold text-stone-800 truncate">{lane.task}</div>
              <div className="rounded-lg border border-stone-100 bg-[#FAF9F6] p-1.5 space-y-0.5">
                {lane.tools.map((t) => (
                  <ToolRow
                    key={`${t.label}-${t.detail}`}
                    label={t.label}
                    detail={t.detail}
                    done={t.done}
                    running={t.running}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-stone-100 bg-[#FAF9F6] px-3 py-2">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] text-stone-500">Subtasks 4/6</span>
          <span className="hidden sm:inline font-mono text-[9px] text-stone-400">·</span>
          <span className="hidden sm:inline font-mono text-[9px] text-stone-500">
            <GitCommit size={9} className="inline mr-0.5" />
            PR #418 queued
          </span>
        </div>
        <span className="inline-flex items-center gap-1 font-mono text-[9px] text-trooper-700">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-trooper opacity-60 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-trooper" />
          </span>
          Live trace
        </span>
      </div>
    </VignetteChrome>
  );
}

/* ─── [04] PR review checklist — single panel, not Canvas 2×2 ─── */
export function CodingBoardVisual() {
  const items = [
    { title: 'Diffs', detail: 'parser.ts + etl/dedupe.ts', status: 'done' as const, meta: '+8 −1' },
    { title: 'CI', detail: '13 tests passed', status: 'done' as const, meta: 'Green' },
    { title: 'PR body', detail: 'Summary and merge notes', status: 'ready' as const, meta: '#418' },
    { title: 'Merge', detail: 'Waiting on human approval', status: 'pending' as const, meta: 'Held' },
  ];

  return (
    <VignetteChrome label="Review · before merge">
      <div className="border-b border-stone-100 bg-white px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-stone-400">
            Pull request
          </span>
          <span className="rounded border border-trooper-200 bg-trooper-50 px-2 py-0.5 text-[10px] font-semibold text-trooper-800">
            Ready for review
          </span>
        </div>
        <h4 className="mt-1.5 text-[13px] font-semibold text-stone-900 sm:text-sm">
          Diffs, tests, and PR — together before you merge
        </h4>
      </div>
      <div className="min-h-[220px] space-y-2 bg-white p-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-3 rounded-lg border border-stone-100 px-3.5 py-3"
          >
            <div
              className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                item.status === 'done'
                  ? 'bg-trooper'
                  : item.status === 'ready'
                    ? 'bg-amber-500'
                    : 'bg-stone-300'
              }`}
            />
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-semibold text-stone-900">{item.title}</div>
              <div className="truncate text-[11px] text-stone-500">{item.detail}</div>
            </div>
            <span className="shrink-0 text-[11px] font-medium text-stone-500">{item.meta}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-stone-100 bg-[#FAF9F6] px-4 py-2.5 text-[11px]">
        <span className="inline-flex items-center gap-1.5 text-stone-500">
          <GitCommit size={12} className="text-stone-400" />
          PR #418
        </span>
        <span className="font-medium text-amber-700">Staff merges</span>
      </div>
    </VignetteChrome>
  );
}

/* ─── [05] Org memory — human category cards ─── */
export function CodingMemoryVisual() {
  const cards = [
    {
      title: 'Branch rules',
      icon: <FileText size={14} className="shrink-0 text-stone-400" />,
      lines: [
        { k: 'Default', v: 'main — no direct pushes' },
        { k: 'Reviewer', v: 'Parser owners first' },
        { k: 'Tests', v: 'Unit + integration' },
      ],
    },
    {
      title: 'Lint',
      icon: <Terminal size={14} className="shrink-0 text-stone-400" />,
      lines: [
        { k: 'Console', v: 'Error in src/' },
        { k: 'Imports', v: 'Ordered · autofix' },
        { k: 'TS', v: 'Strict mode' },
      ],
    },
    {
      title: 'Owners',
      icon: <Shield size={14} className="shrink-0 text-stone-400" />,
      lines: [
        { k: 'Parser', v: 'Engineering leads' },
        { k: 'ETL', v: 'Data owners' },
        { k: 'Default', v: 'Engineering' },
      ],
    },
    {
      title: 'Merge gates',
      icon: <Check size={14} className="shrink-0 text-trooper" />,
      lines: [
        { k: 'CI', v: 'Must be green' },
        { k: 'Approvals', v: '1 human required' },
        { k: 'Checkout', v: 'One agent per branch' },
      ],
    },
  ];

  return (
    <VignetteChrome label="Coding · memory">
      <div className="border-b border-stone-100 bg-[#FAF9F6] px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-stone-400">
            Loaded on every coding mission
          </span>
          <span className="rounded border border-trooper-200 bg-trooper-50 px-2 py-0.5 text-[10px] font-semibold text-trooper-800">
            Persisted
          </span>
        </div>
        <p className="mt-1.5 text-[12px] leading-relaxed text-stone-600">
          Branch rules, lint, owners, and merge gates — same standards on every agent.
        </p>
      </div>
      <div className="grid min-h-[240px] grid-cols-2 gap-px bg-stone-100">
        {cards.map((card) => (
          <div key={card.title} className="flex flex-col bg-white p-3.5">
            <div className="mb-2.5 flex items-center gap-2 border-b border-stone-50 pb-2">
              {card.icon}
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
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-stone-100 bg-white px-4 py-2.5 text-[11px]">
        <span className="text-stone-500">Shared across coding agents</span>
        <span className="font-medium text-trooper-700">Always on</span>
      </div>
    </VignetteChrome>
  );
}

/* ─── [06] Merge pack — readable review summary ─── */
export function CodingCanvasVisual() {
  return (
    <VignetteChrome label="Review · merge pack">
      <div className="border-b border-stone-100 bg-white px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-stone-400">
            Merge pack
          </span>
          <span className="rounded border border-trooper-200 bg-trooper-50 px-2 py-0.5 text-[10px] font-semibold text-trooper-800">
            CI green
          </span>
        </div>
        <h4 className="mt-1.5 text-[13px] font-semibold text-stone-900 sm:text-sm">
          Everything you need before merge — one view
        </h4>
      </div>
      <div className="grid min-h-[220px] grid-cols-2 gap-2 bg-white p-4">
        <div className="rounded-lg border border-stone-200 p-3">
          <div className="mb-2 text-[12px] font-semibold text-stone-900">Changes</div>
          <div className="space-y-1.5 text-[11px] text-stone-600">
            <p className="flex justify-between gap-2">
              <span>parser.ts</span>
              <span className="font-medium text-emerald-700">+5 −1</span>
            </p>
            <p className="flex justify-between gap-2">
              <span>etl/dedupe.ts</span>
              <span className="font-medium text-emerald-700">+3</span>
            </p>
          </div>
        </div>
        <div className="rounded-lg border border-stone-200 bg-stone-950 p-3 font-mono text-[11px] leading-relaxed text-stone-300">
          <div className="mb-2 text-[10px] uppercase tracking-wide text-stone-500">CI</div>
          <p className="text-green-400">✓ 13 tests passed</p>
          <p className="mt-1 text-emerald-400">Ready for PR #418</p>
        </div>
        <div className="col-span-2 rounded-lg border border-stone-200 p-3">
          <div className="mb-1.5 text-[12px] font-semibold text-stone-900">PR summary</div>
          <p className="text-[11px] leading-relaxed text-stone-600">
            Harden invoice parser empty-line handling and ETL dedupe guards. Integration suite green — awaiting staff merge.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-stone-100 bg-[#FAF9F6] px-4 py-2.5 text-[11px]">
        <span className="text-stone-500">Diffs · CI · PR body</span>
        <span className="font-medium text-amber-700">Approve to merge</span>
      </div>
    </VignetteChrome>
  );
}
