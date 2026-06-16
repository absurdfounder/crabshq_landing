'use client';

import type { ReactNode } from 'react';
import {
  Check, Loader2, GitCommit, Terminal, FileText, Shield,
} from 'lucide-react';
import { DemoFavicon } from '@/components/DemoFavicon';
import { VignetteChrome, ProviderChip } from './shared';
import { CanvasDesktopVisual } from './CanvasDesktopVisual';

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

const PARSER_DIFF_LINES = [
  { ln: 12, type: 'del' as const, text: '  const rows = raw.split(\'\\n\').map(line => line.trim());' },
  { ln: 13, type: 'add' as const, text: '  const rows = raw.split(\'\\n\')' },
  { ln: 14, type: 'add' as const, text: '    .map(line => line.trim())' },
  { ln: 15, type: 'add' as const, text: '    .filter(Boolean);' },
  { ln: 16, type: 'ctx' as const, text: '  return rows.map(parseRow).filter(Boolean);' },
];

const DEDUPE_DIFF_LINES = [
  { ln: 44, type: 'add' as const, text: '    if (!row.id?.trim()) return false;' },
  { ln: 45, type: 'ctx' as const, text: '    const key = `${row.id}:${row.batchId}`;' },
  { ln: 46, type: 'ctx' as const, text: '    if (seen.has(key)) return false;' },
];

const CI_LOG_LINES = [
  { text: '$ npm run test:integration', muted: true },
  { text: '', muted: true },
  { text: ' ✓ parser.integration.test.ts (8 tests) 2.1s', ok: true },
  { text: ' ✓ etl/dedupe.integration.test.ts (5 tests) 1.4s', ok: true },
  { text: '', muted: true },
  { text: ' Test Files  2 passed (2)', ok: true },
  { text: '      Tests  13 passed (13)', ok: true },
  { text: '', muted: true },
  { text: ' CI · green · ready for PR #418', highlight: true },
];

function DiffTile({ file, adds, dels, lines }: {
  file: string;
  adds: number;
  dels: number;
  lines: typeof PARSER_DIFF_LINES;
}) {
  return (
    <div className="flex min-h-full flex-col bg-white text-[8px] leading-snug">
      <div className="flex shrink-0 items-center gap-1 border-b border-stone-100 px-2 py-1.5 bg-stone-50">
        <span className="font-mono font-semibold text-stone-700 truncate flex-1">{file}</span>
        <span className="rounded bg-emerald-50 px-1 text-emerald-700 font-semibold">+{adds}</span>
        <span className="rounded bg-red-50 px-1 text-red-600 font-semibold">−{dels}</span>
      </div>
      <div className="font-mono min-h-0 flex-1 overflow-y-auto px-0.5 py-1">
        {lines.map((line) => (
          <div
            key={`${line.ln}-${line.text.slice(0, 12)}`}
            className={
              line.type === 'del' ? 'flex bg-red-50/60'
                : line.type === 'add' ? 'flex bg-emerald-50/70'
                  : 'flex'
            }
          >
            <span className="w-5 shrink-0 text-right text-stone-400 px-0.5 tabular-nums">{line.ln}</span>
            <span className={`w-3 text-center shrink-0 ${line.type === 'del' ? 'text-red-500' : line.type === 'add' ? 'text-emerald-600' : 'text-transparent'}`}>
              {line.type === 'del' ? '−' : line.type === 'add' ? '+' : ' '}
            </span>
            <span className={`break-all ${line.type === 'del' ? 'text-red-800/80' : line.type === 'add' ? 'text-emerald-800' : 'text-stone-500'}`}>
              {line.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CiLogTile() {
  return (
    <div className="min-h-full bg-stone-950 p-2 font-mono text-[7px] leading-relaxed">
      {CI_LOG_LINES.map((line, i) => (
        <div
          key={i}
          className={
            line.highlight ? 'text-emerald-400 font-semibold mt-1'
              : line.ok ? 'text-green-400'
                : line.muted ? 'text-stone-600'
                  : 'text-stone-300'
          }
        >
          {line.text || '\u00A0'}
        </div>
      ))}
    </div>
  );
}

function PrBodyTile() {
  const sections = [
    { t: 'h1', text: 'PR #418 — fix(parser): skip empty invoice rows' },
    { t: 'h2', text: 'Summary' },
    { t: 'p', text: 'Production CSVs include blank lines that caused the invoice parser to drop valid rows.' },
    { t: 'h2', text: 'Changes' },
    { t: 'li', text: 'src/parser.ts — filter empty rows after trim' },
    { t: 'li', text: 'etl/dedupe.ts — ignore rows with empty ids' },
    { t: 'li', text: 'tests/parser.test.ts — empty-row regression' },
    { t: 'gate', text: 'Awaiting merge approval from @Vaibhav' },
  ];
  return (
    <div className="h-full overflow-hidden bg-white p-2 text-[7px] leading-snug">
      {sections.map((s, i) => (
        <div
          key={i}
          className={
            s.t === 'h1' ? 'mb-1 font-semibold text-stone-900 text-[8px]'
              : s.t === 'h2' ? 'mt-1 mb-0.5 font-semibold text-stone-700'
                : s.t === 'li' ? 'pl-2 text-stone-600 before:content-["·_"]'
                  : s.t === 'gate' ? 'mt-2 rounded border border-amber-200 bg-amber-50 px-1.5 py-1 font-medium text-amber-800'
                    : 'text-stone-600'
          }
        >
          {s.text}
        </div>
      ))}
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

/* ─── [04] Ticket Canvas — stacked diffs, CI, PR (static) ─── */
export function CodingBoardVisual() {
  return (
    <CanvasDesktopVisual
      windows={[
        {
          id: 'parser',
          title: 'src/parser.ts.diff',
          x: 8,
          y: 8,
          w: 198,
          h: 128,
          body: <DiffTile file="src/parser.ts" adds={5} dels={1} lines={PARSER_DIFF_LINES} />,
        },
        {
          id: 'dedupe',
          title: 'etl/dedupe.ts.diff',
          x: 168,
          y: 24,
          w: 178,
          h: 108,
          body: <DiffTile file="etl/dedupe.ts" adds={3} dels={0} lines={DEDUPE_DIFF_LINES} />,
        },
        {
          id: 'ci',
          title: 'logs/ci-integration.log',
          x: 28,
          y: 118,
          w: 200,
          h: 112,
          body: <CiLogTile />,
        },
        {
          id: 'pr',
          title: 'pull-requests/418-body.md',
          x: 196,
          y: 132,
          w: 220,
          h: 118,
          accent: true,
          body: <PrBodyTile />,
        },
      ]}
    />
  );
}

/* ─── [05] Org memory — conventions loaded per mission ─── */
export function CodingMemoryVisual() {
  const memoryFiles = [
    {
      path: 'AGENTS.md',
      icon: <FileText size={11} className="text-stone-400 shrink-0" />,
      lines: [
        { k: 'default_branch', v: 'main — no direct pushes' },
        { k: 'reviewer', v: '@Vaibhav on parser/*' },
        { k: 'test_cmd', v: 'npm test && npm run test:integration' },
      ],
    },
    {
      path: '.eslintrc.cjs',
      icon: <Terminal size={11} className="text-stone-400 shrink-0" />,
      lines: [
        { k: 'no-console', v: 'error in src/' },
        { k: 'import/order', v: 'enforced · autofix on save' },
        { k: '@typescript-eslint', v: 'strict mode' },
      ],
    },
    {
      path: 'CODEOWNERS',
      icon: <Shield size={11} className="text-stone-400 shrink-0" />,
      lines: [
        { k: 'src/parser/*', v: '@Leo @engineering' },
        { k: 'etl/*', v: '@Leo' },
        { k: '*', v: '@engineering' },
      ],
    },
    {
      path: 'merge-gates.yml',
      icon: <Check size={11} className="text-trooper shrink-0" />,
      lines: [
        { k: 'ci_required', v: '✓ integration suite green' },
        { k: 'approvals', v: '✓ 1 human before merge' },
        { k: 'atomic_checkout', v: '✓ one agent per branch' },
      ],
    },
  ];

  return (
    <VignetteChrome label="trooper · org memory">
      <div className="border-b border-stone-100 bg-[#FAF9F6] px-3 py-2">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[9px] uppercase tracking-widest text-stone-500">
            Loaded on every coding mission
          </span>
          <span className="rounded border border-trooper-200 bg-trooper-50 px-1.5 py-0.5 text-[8px] font-semibold text-trooper-800">
            Persisted
          </span>
        </div>
        <p className="mt-1 text-[10px] text-stone-500 leading-relaxed">
          Branch rules, lint config, and reviewer prefs — no re-briefing each session.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-px bg-stone-100 min-h-[240px]">
        {memoryFiles.map((file) => (
          <div key={file.path} className="bg-white p-2.5 flex flex-col">
            <div className="flex items-center gap-1.5 mb-2 border-b border-stone-50 pb-1.5">
              {file.icon}
              <span className="font-mono text-[9px] font-semibold text-stone-700 truncate">{file.path}</span>
            </div>
            <div className="space-y-1 flex-1">
              {file.lines.map((line) => (
                <div key={line.k} className="flex gap-1.5 text-[8px] leading-snug">
                  <span className="font-mono text-stone-400 shrink-0 w-[72px] truncate">{line.k}</span>
                  <span className="text-stone-700 truncate">{line.v}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-stone-100 bg-white px-3 py-2">
        <span className="font-mono text-[9px] text-stone-400">4 files · synced across Codex, Claude Code, OpenCode</span>
        <span className="font-mono text-[9px] text-trooper-700">Memory hit · 0ms re-brief</span>
      </div>
    </VignetteChrome>
  );
}

/* ─── [06] Animated Canvas — full PR bundle review ─── */
export function CodingCanvasVisual() {
  return (
    <CanvasDesktopVisual
      animated
      windows={[
        {
          id: 'parser',
          title: 'src/parser.ts.diff',
          x: 18,
          y: 14,
          w: 188,
          h: 122,
          body: <DiffTile file="src/parser.ts" adds={5} dels={1} lines={PARSER_DIFF_LINES} />,
        },
        {
          id: 'dedupe',
          title: 'etl/dedupe.ts.diff',
          x: 168,
          y: 28,
          w: 172,
          h: 104,
          body: <DiffTile file="etl/dedupe.ts" adds={3} dels={0} lines={DEDUPE_DIFF_LINES} />,
        },
        {
          id: 'ci',
          title: 'logs/ci-integration.log',
          x: 36,
          y: 118,
          w: 196,
          h: 108,
          body: <CiLogTile />,
        },
        {
          id: 'pr',
          title: 'pull-requests/418-body.md',
          x: 210,
          y: 124,
          w: 214,
          h: 116,
          accent: true,
          body: <PrBodyTile />,
        },
      ]}
    />
  );
}
