'use client';

import { Check, Laptop, Loader2 } from 'lucide-react';
import { DemoBrowserFrame, DemoFavicon } from '@trooper/demo';
import { VignetteChrome, ProviderChip } from './shared';
import {
  AcpCliWindow,
  AppDiffCard,
  AppDocPanel,
  AppTerminalPanel,
  type DiffLine,
} from './productSurfaces';

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

function ShellLine({
  prompt,
  children,
  muted,
  ok,
  running,
}: {
  prompt?: boolean;
  children: string;
  muted?: boolean;
  ok?: boolean;
  running?: boolean;
}) {
  return (
    <div
      className={
        muted
          ? 'text-stone-500'
          : ok
            ? 'text-green-400'
            : running
              ? 'text-amber-300'
              : prompt
                ? 'text-stone-100'
                : 'text-stone-300'
      }
    >
      {ok ? <Check size={11} className="mr-1.5 inline text-trooper" /> : null}
      {running ? <Loader2 size={11} className="mr-1.5 inline animate-spin text-amber-400" /> : null}
      {children}
      {running ? <span className="ml-0.5 animate-pulse text-amber-400">▌</span> : null}
    </div>
  );
}

/* ─── Shared harness: real CLI windows + on-demand surfaces ─── */
export function CodingHarnessVisual() {
  return (
    <VignetteChrome label="workspace" className="bg-[#b9b4ab]">
      <div className="border-b border-black/10 bg-white px-3.5 py-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">
                ENG · parser hotfix
              </span>
              <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-amber-800">
                In progress
              </span>
            </div>
            <h4 className="text-[14px] font-semibold leading-snug text-stone-900">
              Fix invoice parser null rows
            </h4>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded border border-stone-200 bg-stone-50 px-1.5 py-0.5 font-mono text-[10px] text-stone-600">
            <DemoFavicon domain="github.com" size={12} rounded="sm" />
            acme-billing
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-3">
        <AcpCliWindow
          provider="Claude Code"
          status="working"
          cwd="~/acme-billing · fix/parser-null-rows · tests/parser.test.ts"
          lines={
            <>
              <ShellLine prompt>$ claude — resume session</ShellLine>
              <ShellLine muted>Session attached · ACP harness</ShellLine>
              <ShellLine ok>write_file  tests/parser.test.ts — empty CSV regression</ShellLine>
              <ShellLine running>exec  vitest tests/parser.test.ts</ShellLine>
            </>
          }
        />

        <AcpCliWindow
          provider="Codex"
          status="working"
          cwd="~/acme-billing · fix/parser-null-rows · src/parser.ts  +5 −1"
          lines={
            <>
              <ShellLine prompt>$ codex — acp</ShellLine>
              <ShellLine ok>exec  npm test — repro null-row failure</ShellLine>
              <ShellLine ok>apply_patch  src/parser.ts — filter empty CSV rows</ShellLine>
              <ShellLine running>exec  npm run test:integration</ShellLine>
            </>
          }
        />

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <div className="overflow-hidden rounded-lg shadow-[0_10px_24px_-10px_rgba(0,0,0,0.4)] ring-1 ring-black/30">
            <div className="flex items-center gap-2 border-b border-stone-800 bg-[#2a2a2c] px-2.5 py-1.5">
              <span className="text-[11px] font-medium text-stone-200">Browser on demand</span>
              <span className="ml-auto rounded-full bg-green-500/15 px-1.5 py-0.5 text-[9px] font-medium text-green-300">
                Live
              </span>
            </div>
            <DemoBrowserFrame
              addressUrl="github.com/acme/billing/pull/418"
              faviconDomain="github.com"
              title="PR #418"
              compact
            >
              <div className="h-[100px] space-y-2 overflow-hidden bg-white p-2.5 text-[12px]">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                    Open
                  </span>
                  <span className="font-semibold text-stone-900">fix(parser): skip empty rows</span>
                </div>
                <p className="text-stone-500">acme/billing #418 · Codex + Claude Code</p>
                <p className="font-mono text-[11px] text-emerald-700">+8 −1 · All checks passed</p>
              </div>
            </DemoBrowserFrame>
          </div>

          <div className="overflow-hidden rounded-lg bg-[#1c1c1e] shadow-[0_10px_24px_-10px_rgba(0,0,0,0.4)] ring-1 ring-black/30">
            <div className="flex items-center justify-between border-b border-white/10 px-2.5 py-1.5">
              <div className="flex items-center gap-1.5 text-[11px] text-white/90">
                <Laptop className="size-3.5 text-white/55" strokeWidth={2} />
                <span className="font-medium">Desktop on demand</span>
              </div>
              <span className="rounded-full bg-amber-400/20 px-1.5 py-0.5 text-[9px] font-semibold text-amber-200 ring-1 ring-amber-400/30">
                ● Busy
              </span>
            </div>
            <div className="border-b border-white/10 bg-[#2c2c2e] px-2.5 py-1.5 text-[10px] text-white/55">
              Studio-Mac · macOS 15.2 · seat on screen 1
            </div>
            <div className="space-y-0.5 px-2.5 py-2.5 font-mono text-[12px] leading-relaxed">
              <div className="text-white">$ trooper device wake studio-mac</div>
              <div className="text-[#a3e635]/85">device responded · agent seat attached</div>
              <div className="flex items-center gap-1.5 text-amber-300">
                <Loader2 size={11} className="animate-spin" />
                npm run test:integration
                <span className="animate-pulse">▌</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-black/10 bg-[#FAF9F6] px-3.5 py-2">
        <span className="font-mono text-[11px] text-stone-500">
          CLIs · browser · desktop — one ticket
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-trooper-700">
          <ProviderChip provider="Claude Code" size={12} />
          <ProviderChip provider="Codex" size={12} />
          Live ACP
        </span>
      </div>
    </VignetteChrome>
  );
}

/* ─── DiffViewer-style review ─── */
export function CodingBoardVisual() {
  return (
    <VignetteChrome label="DiffViewer">
      <div className="border-b border-stone-100 px-3.5 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-stone-400">
            Pull request #418
          </span>
          <span className="rounded border border-trooper-200 bg-trooper-50 px-2 py-0.5 text-[10px] font-semibold text-trooper-800">
            Ready for review
          </span>
        </div>
        <h4 className="mt-1 text-[14px] font-semibold text-stone-900">
          fix(parser): skip empty invoice rows
        </h4>
      </div>

      <div className="flex-1 space-y-3 bg-[#FAF9F6] p-3">
        <AppDiffCard path="src/parser.ts" additions={5} deletions={1} lines={PARSER_DIFF} />
        <div className="flex items-center gap-3 rounded-lg border border-stone-200 bg-white px-3 py-2.5 font-mono text-[12px]">
          <span className="text-emerald-600">✓</span>
          <span className="text-stone-700">CI · 13 tests passed</span>
          <span className="ml-auto text-stone-400">etl/dedupe.ts +3</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-stone-100 bg-white px-3.5 py-2.5 text-[12px]">
        <span className="text-stone-500">Codex patch · Claude Code tests</span>
        <span className="font-medium text-amber-700">Staff merges</span>
      </div>
    </VignetteChrome>
  );
}

/* ─── AGENTS.md / repo memory ─── */
export function CodingMemoryVisual() {
  return (
    <VignetteChrome label="AGENTS.md">
      <div className="border-b border-stone-100 bg-[#FAF9F6] px-3.5 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-stone-400">
            Org context for every CLI
          </span>
          <span className="rounded border border-trooper-200 bg-trooper-50 px-2 py-0.5 text-[10px] font-semibold text-trooper-800">
            Injected
          </span>
        </div>
      </div>

      <div className="flex-1 bg-white p-3">
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

      <div className="flex items-center justify-between border-t border-stone-100 bg-[#FAF9F6] px-3.5 py-2.5 text-[12px]">
        <span className="text-stone-500">Loaded for Claude · Codex · OpenCode</span>
        <span className="font-medium text-trooper-700">Always on</span>
      </div>
    </VignetteChrome>
  );
}

/* ─── Merge pack: full-bleed DiffViewer + CI terminal ─── */
export function CodingCanvasVisual() {
  return (
    <VignetteChrome label="merge pack">
      <div className="border-b border-stone-100 px-3.5 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-stone-400">
            Merge pack · PR #418
          </span>
          <span className="rounded border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
            CI green
          </span>
        </div>
        <h4 className="mt-1 text-[14px] font-semibold text-stone-900">
          Diffs and CI — ready to approve
        </h4>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-0 bg-white sm:grid-cols-2">
        <div className="border-b border-stone-100 p-3 sm:border-b-0 sm:border-r">
          <AppDiffCard path="src/parser.ts" additions={5} deletions={1} lines={PARSER_DIFF} />
        </div>
        <div className="bg-stone-950 p-3">
          <AppTerminalPanel title="ci · npm run test:integration" className="!rounded-none !ring-0">
            <p className="text-stone-500">$ npm run test:integration</p>
            <p className="mt-2 text-[13px] text-green-400">✓ parser.test.ts (8)</p>
            <p className="text-[13px] text-green-400">✓ dedupe.integration.test (5)</p>
            <p className="mt-2 text-[13px] text-emerald-400">Tests: 13 passed</p>
            <p className="mt-1 text-stone-500">Duration: 4.2s</p>
            <p className="mt-3 text-stone-400">Ready for PR #418 ▌</p>
          </AppTerminalPanel>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-stone-100 bg-[#FAF9F6] px-3.5 py-2.5 text-[12px]">
        <span className="text-stone-500">UnifiedDiff · Terminal</span>
        <span className="font-medium text-amber-700">Approve to merge</span>
      </div>
    </VignetteChrome>
  );
}

/* ─── Browser + desktop on demand ─── */
export function CodingRuntimeVisual() {
  return (
    <VignetteChrome label="runtimes" className="bg-[#b9b4ab]">
      <div className="border-b border-black/10 bg-white px-3.5 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-stone-400">
            Runtimes on this ticket
          </span>
          <span className="rounded border border-trooper-200 bg-trooper-50 px-2 py-0.5 text-[10px] font-semibold text-trooper-800">
            Attached
          </span>
        </div>
        <h4 className="mt-1 text-[14px] font-semibold text-stone-900">
          Browser on demand · Desktop on demand
        </h4>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-3 p-3 sm:grid-cols-2">
        <div className="overflow-hidden rounded-lg shadow-md ring-1 ring-black/25">
          <div className="flex items-center gap-2 border-b border-stone-800 bg-[#2a2a2c] px-2.5 py-1.5">
            <span className="text-[12px] font-medium text-stone-100">Browser on demand</span>
            <span className="ml-auto rounded-full bg-green-500/15 px-1.5 py-0.5 text-[9px] font-medium text-green-300">
              Session live
            </span>
          </div>
          <DemoBrowserFrame
            addressUrl="github.com/acme/billing/actions"
            faviconDomain="github.com"
            title="CI · Actions"
            compact
          >
            <div className="h-[140px] space-y-2 overflow-hidden bg-white p-3 text-[12px]">
              <p className="font-semibold text-stone-900">Actions · acme/billing</p>
              <div className="rounded border border-stone-100 px-2.5 py-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-stone-800">integration</span>
                  <span className="text-[11px] font-semibold text-emerald-700">passing</span>
                </div>
                <p className="mt-0.5 font-mono text-[11px] text-stone-400">
                  fix/parser-null-rows · 4.2s
                </p>
              </div>
              <div className="rounded border border-stone-100 px-2.5 py-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-stone-800">lint</span>
                  <span className="text-[11px] font-semibold text-emerald-700">passing</span>
                </div>
              </div>
            </div>
          </DemoBrowserFrame>
          <div className="space-y-1 border-t border-stone-800 bg-stone-950 px-3 py-2.5 font-mono text-[12px]">
            <div className="text-green-400">✓ browser_navigate  pull/418</div>
            <div className="text-green-400">✓ browser_snapshot  CI green</div>
            <div className="text-amber-300">
              browser_click  Merge when approved
              <span className="animate-pulse">▌</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col overflow-hidden rounded-lg bg-[#1c1c1e] shadow-md ring-1 ring-black/25">
          <div className="flex items-center justify-between border-b border-white/10 px-2.5 py-1.5">
            <div className="flex items-center gap-1.5 text-[12px] text-white/90">
              <Laptop className="size-3.5 text-white/55" strokeWidth={2} />
              <span className="font-medium">Desktop on demand</span>
            </div>
            <span className="rounded-full bg-amber-400/20 px-1.5 py-0.5 text-[9px] font-semibold text-amber-200 ring-1 ring-amber-400/30">
              Studio-Mac
            </span>
          </div>
          <div className="flex flex-1 flex-col bg-[#2c2c2e] p-3">
            <div className="mb-2 rounded border border-white/10 bg-[#1c1c1e] px-2.5 py-1.5 font-mono text-[11px] text-white/70">
              Terminal — ~/acme-billing
            </div>
            <div className="flex-1 space-y-1 font-mono text-[12px] leading-relaxed">
              <p className="text-stone-500">$ trooper device exec studio-mac</p>
              <p className="text-green-400">✓ git checkout fix/parser-null-rows</p>
              <p className="text-green-400">✓ npm run test:integration</p>
              <p className="mt-1 text-emerald-400">13 passed · 4.2s</p>
              <p className="mt-2 text-stone-400">Seat held for review ▌</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-black/10 bg-white px-3.5 py-2.5 text-[12px]">
        <span className="text-stone-500">Same ticket · live browser · enrolled Mac</span>
        <span className="font-medium text-trooper-700">On demand</span>
      </div>
    </VignetteChrome>
  );
}
