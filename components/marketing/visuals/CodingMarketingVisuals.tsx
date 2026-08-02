'use client';

import { DemoFavicon } from '@trooper/demo';
import { VignetteChrome } from './shared';
import {
  AcpCliPane,
  AppDiffCard,
  AppDocPanel,
  AppTerminalPanel,
  type DiffLine,
} from './productSurfaces';

const HARNESS_LANES = [
  {
    provider: 'Claude Code',
    status: 'working' as const,
    branch: 'fix/parser-null-rows',
    file: 'tests/parser.test.ts',
    diff: '+12 −0',
    highlight: true,
    tools: [
      { label: 'write_file', detail: 'empty CSV regression case', done: true },
      { label: 'exec', detail: 'vitest parser.test.ts', running: true },
    ],
  },
  {
    provider: 'Codex',
    status: 'working' as const,
    branch: 'fix/parser-null-rows',
    file: 'src/parser.ts',
    diff: '+5 −1',
    tools: [
      { label: 'exec', detail: 'npm test — repro failure', done: true },
      { label: 'apply_patch', detail: 'filter empty CSV rows', done: true },
      { label: 'exec', detail: 'npm run test:integration', running: true },
    ],
  },
  {
    provider: 'OpenCode',
    status: 'ready' as const,
    branch: 'fix/etl-dedupe',
    file: 'etl/dedupe.ts',
    diff: '+3 −0',
    tools: [
      { label: 'apply_patch', detail: 'ignore empty row ids', done: true },
      { label: 'exec', detail: 'dedupe.integration.test', done: true },
    ],
  },
];

const PARSER_DIFF: DiffLine[] = [
  { type: 'hunk', text: '@@ -84,7 +84,11 @@ export function parseInvoiceRows(raw: string) {' },
  { type: 'ctx', oldLine: 84, newLine: 84, text: '  const rows = raw.split("\\n");' },
  { type: 'del', oldLine: 85, newLine: null, text: '  return rows.map(parseRow);' },
  { type: 'add', oldLine: null, newLine: 85, text: '  return rows' },
  { type: 'add', oldLine: null, newLine: 86, text: '    .map((line) => line.trim())' },
  { type: 'add', oldLine: null, newLine: 87, text: '    .filter((line) => line.length > 0)' },
  { type: 'add', oldLine: null, newLine: 88, text: '    .map(parseRow);' },
  { type: 'ctx', oldLine: 86, newLine: 89, text: '}' },
];

/* ─── Shared harness / coding CLIs on one ticket ─── */
export function CodingHarnessVisual() {
  return (
    <VignetteChrome label="trooper · ticket #418 · ACP">
      <div className="border-b border-stone-100 bg-white px-3 py-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="mb-1 flex items-center gap-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-stone-400">
                ENG · parser hotfix
              </span>
              <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide text-amber-800">
                In progress
              </span>
            </div>
            <h4 className="truncate text-[13px] font-semibold leading-snug text-stone-900">
              Fix invoice parser null rows
            </h4>
          </div>
          <div className="flex shrink-0 -space-x-1.5">
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
          <span className="inline-flex items-center gap-1 rounded border border-stone-200 bg-stone-50 px-1.5 py-0.5 font-mono text-[8px] text-stone-600">
            <DemoFavicon domain="github.com" size={10} rounded="sm" />
            acme-billing
          </span>
          <span className="font-mono text-[8px] text-stone-400">
            Claude Code · Codex · OpenCode
          </span>
        </div>
      </div>

      <div className="grid min-h-[240px] grid-cols-3 divide-x divide-stone-200 bg-white">
        {HARNESS_LANES.map((lane) => (
          <AcpCliPane key={lane.provider} {...lane} />
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-stone-100 bg-[#FAF9F6] px-3 py-2">
        <span className="font-mono text-[9px] text-stone-500">
          One ticket · three coding CLIs
        </span>
        <span className="inline-flex items-center gap-1 font-mono text-[9px] text-trooper-700">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-trooper opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-trooper" />
          </span>
          Live ACP sessions
        </span>
      </div>
    </VignetteChrome>
  );
}

/* ─── DiffViewer-style review ─── */
export function CodingBoardVisual() {
  return (
    <VignetteChrome label="Review · DiffViewer">
      <div className="border-b border-stone-100 bg-white px-3 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-stone-400">
            Pull request #418
          </span>
          <span className="rounded border border-trooper-200 bg-trooper-50 px-2 py-0.5 text-[10px] font-semibold text-trooper-800">
            Ready for review
          </span>
        </div>
        <h4 className="mt-1.5 text-[13px] font-semibold text-stone-900 sm:text-sm">
          fix(parser): skip empty invoice rows
        </h4>
      </div>

      <div className="space-y-3 bg-[#FAF9F6] p-3">
        <AppDiffCard
          path="src/parser.ts"
          additions={5}
          deletions={1}
          lines={PARSER_DIFF}
        />
        <div className="flex items-center gap-3 rounded-lg border border-stone-200 bg-white px-3 py-2 font-mono text-[11px]">
          <span className="text-emerald-600">✓</span>
          <span className="text-stone-700">CI · 13 tests passed</span>
          <span className="ml-auto text-stone-400">etl/dedupe.ts +3</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-stone-100 bg-white px-3 py-2.5 text-[11px]">
        <span className="text-stone-500">Codex patch · Claude Code tests</span>
        <span className="font-medium text-amber-700">Staff merges</span>
      </div>
    </VignetteChrome>
  );
}

/* ─── AGENTS.md / repo memory document ─── */
export function CodingMemoryVisual() {
  return (
    <VignetteChrome label="Coding · AGENTS.md">
      <div className="border-b border-stone-100 bg-[#FAF9F6] px-3 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-stone-400">
            Org context for every CLI
          </span>
          <span className="rounded border border-trooper-200 bg-trooper-50 px-2 py-0.5 text-[10px] font-semibold text-trooper-800">
            Injected
          </span>
        </div>
        <p className="mt-1.5 text-[12px] leading-relaxed text-stone-600">
          Same branch, review, and test rules load into Claude Code, Codex, and OpenCode.
        </p>
      </div>

      <div className="bg-white p-3">
        <AppDocPanel filename="AGENTS.md" badge="acme-billing">
          <p className="mb-2 text-neutral-500"># Engineering agents</p>
          <p className="mb-3 text-neutral-800">## Branch rules</p>
          <p className="mb-1">- Default branch: <span className="text-trooper-700">main</span> — no direct pushes</p>
          <p className="mb-1">- Feature branches: <span className="text-neutral-500">fix/*</span> or <span className="text-neutral-500">feat/*</span></p>
          <p className="mb-3">- One agent checkout per branch</p>
          <p className="mb-3 text-neutral-800">## Review & merge</p>
          <p className="mb-1">- Parser owners review <span className="text-neutral-500">src/parser*</span> first</p>
          <p className="mb-1">- CI must be green before merge</p>
          <p className="mb-3">- 1 human approval required</p>
          <p className="mb-3 text-neutral-800">## Tests</p>
          <p className="mb-1">- Unit + integration required on parser/ETL changes</p>
          <p>- Lint: no console in src/; TS strict</p>
        </AppDocPanel>
      </div>

      <div className="flex items-center justify-between border-t border-stone-100 bg-[#FAF9F6] px-3 py-2.5 text-[11px]">
        <span className="text-stone-500">Loaded for Claude · Codex · OpenCode</span>
        <span className="font-medium text-trooper-700">Always on</span>
      </div>
    </VignetteChrome>
  );
}

/* ─── Merge pack: DiffViewer + CI terminal ─── */
export function CodingCanvasVisual() {
  return (
    <VignetteChrome label="Review · merge pack">
      <div className="border-b border-stone-100 bg-white px-3 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-stone-400">
            Merge pack · PR #418
          </span>
          <span className="rounded border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
            CI green
          </span>
        </div>
        <h4 className="mt-1.5 text-[13px] font-semibold text-stone-900 sm:text-sm">
          Diffs and CI — ready to approve
        </h4>
      </div>

      <div className="grid min-h-[240px] grid-cols-1 gap-3 bg-[#FAF9F6] p-3 sm:grid-cols-2">
        <AppDiffCard
          path="src/parser.ts"
          additions={5}
          deletions={1}
          lines={PARSER_DIFF.slice(0, 6)}
        />
        <AppTerminalPanel title="ci · npm run test:integration">
          <p className="text-stone-500">$ npm run test:integration</p>
          <p className="mt-1.5 text-green-400">✓ parser.test.ts (8)</p>
          <p className="text-green-400">✓ dedupe.integration.test (5)</p>
          <p className="mt-1.5 text-emerald-400">Tests: 13 passed</p>
          <p className="mt-1 text-stone-500">Duration: 4.2s</p>
          <p className="mt-2 text-stone-400">Ready for PR #418 ▌</p>
        </AppTerminalPanel>
      </div>

      <div className="flex items-center justify-between border-t border-stone-100 bg-white px-3 py-2.5 text-[11px]">
        <span className="text-stone-500">UnifiedDiff · Terminal</span>
        <span className="font-medium text-amber-700">Approve to merge</span>
      </div>
    </VignetteChrome>
  );
}
