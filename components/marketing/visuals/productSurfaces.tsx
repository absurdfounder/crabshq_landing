'use client';

import type { ReactNode } from 'react';
import { Check, ChevronDown, FileCode, Loader2 } from 'lucide-react';
import { ProviderChip } from './shared';

export type AcpToolLine = {
  label: string;
  detail: string;
  done?: boolean;
  running?: boolean;
};

export type DiffLine = {
  type: 'add' | 'del' | 'ctx' | 'hunk';
  oldLine?: number | null;
  newLine?: number | null;
  text: string;
};

const ACP_STATUS: Record<string, string> = {
  working: 'bg-green-100 text-green-700',
  running: 'bg-green-100 text-green-700',
  ready: 'bg-stone-100 text-stone-600',
  waiting: 'bg-amber-100 text-amber-800',
};

/** Tool row styled like Trooper ACP / ToolTimeline activity. */
export function AcpToolRow({ label, detail, done, running }: AcpToolLine) {
  return (
    <div className="flex items-start gap-2 py-0.5 font-mono text-[11px] leading-snug">
      {done ? (
        <Check size={12} className="mt-0.5 shrink-0 text-trooper" />
      ) : running ? (
        <Loader2 size={12} className="mt-0.5 shrink-0 animate-spin text-amber-600" />
      ) : (
        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full border border-stone-400" />
      )}
      <div className="min-w-0 flex-1 break-words">
        <span className="font-semibold text-stone-200">{label}</span>{' '}
        <span className="text-stone-400">{detail}</span>
        {running ? <span className="ml-0.5 inline-block animate-pulse text-amber-400">▌</span> : null}
      </div>
    </div>
  );
}

/**
 * Full OS-style ACP CLI window — title bar shows the full provider name (no
 * cramped column truncation). Use for harness floors, not 3-up grids.
 */
export function AcpCliWindow({
  provider,
  status = 'working',
  cwd,
  lines,
  className = '',
}: {
  provider: string;
  status?: keyof typeof ACP_STATUS | string;
  cwd: string;
  lines: ReactNode;
  className?: string;
}) {
  const statusClass = ACP_STATUS[status] ?? ACP_STATUS.ready;

  return (
    <div
      className={`overflow-hidden rounded-lg bg-stone-950 shadow-[0_12px_28px_-10px_rgba(0,0,0,0.45)] ring-1 ring-black/40 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-stone-800 bg-[#2a2a2c] px-3 py-2">
        <span className="flex shrink-0 gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <ProviderChip provider={provider} size={16} />
        <span className="min-w-0 flex-1 text-[12px] font-medium text-stone-100">
          {provider}
        </span>
        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${statusClass}`}>
          {status}
        </span>
      </div>
      <div className="border-b border-stone-800/80 bg-stone-900 px-3 py-1.5 font-mono text-[11px] text-stone-400">
        {cwd}
      </div>
      <div className="space-y-1 px-3 py-2.5 font-mono text-[12px] leading-relaxed text-stone-300">
        {lines}
      </div>
    </div>
  );
}

/**
 * Compact ACP lane for denser grids (marketing). Prefer AcpCliWindow on coding.
 */
export function AcpCliPane({
  provider,
  status = 'working',
  branch,
  file,
  diff,
  tools,
  highlight,
}: {
  provider: string;
  status?: keyof typeof ACP_STATUS | string;
  branch: string;
  file: string;
  diff: string;
  tools: AcpToolLine[];
  highlight?: boolean;
}) {
  const statusClass = ACP_STATUS[status] ?? ACP_STATUS.ready;

  return (
    <div
      className={`flex min-h-0 flex-col overflow-hidden border-stone-200 ${
        highlight ? 'bg-trooper-50/30' : 'bg-white'
      }`}
    >
      <div className="flex items-center gap-2 border-b border-stone-100 bg-white px-2.5 py-2">
        <ProviderChip provider={provider} size={18} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[12px] font-semibold text-stone-900">{provider}</span>
            <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-medium capitalize ${statusClass}`}>
              {status}
            </span>
          </div>
          <div className="font-mono text-[10px] leading-snug text-stone-400">{branch}</div>
        </div>
        <span className="shrink-0 font-mono text-[10px] font-semibold text-trooper-700">{diff}</span>
      </div>
      <div className="border-b border-stone-800/40 bg-stone-950 px-2.5 py-1.5">
        <div className="font-mono text-[10px] leading-snug text-stone-400">{file}</div>
      </div>
      <div className="flex-1 space-y-0.5 bg-stone-950 px-2.5 py-2">
        {tools.map((t) => (
          <AcpToolRow key={`${t.label}-${t.detail}`} {...t} />
        ))}
      </div>
    </div>
  );
}

/** DiffViewer / UnifiedDiffCard-style file card for landing mocks. */
export function AppDiffCard({
  path,
  additions,
  deletions,
  lines,
  defaultOpen = true,
}: {
  path: string;
  additions: number;
  deletions: number;
  lines: DiffLine[];
  defaultOpen?: boolean;
}) {
  const basename = path.split('/').pop() || path;
  const folder = path.includes('/') ? path.split('/').slice(0, -1).join('/') : '';

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] ring-1 ring-neutral-200/55">
      <div className="flex w-full items-start gap-2.5 px-3 py-2 text-left">
        <span className="mt-1.5 shrink-0 text-neutral-400" aria-hidden>
          <ChevronDown className="h-3 w-3" />
        </span>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-stone-50 ring-1 ring-neutral-200/60">
          <FileCode className="h-3.5 w-3.5 text-neutral-400" strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="break-all font-mono text-[11px] font-medium leading-snug text-neutral-900">
            {basename}
          </div>
          {folder ? (
            <div className="mt-0.5 break-all text-[10px] leading-snug text-neutral-500">{folder}</div>
          ) : null}
        </div>
        <div className="mt-1 flex shrink-0 items-center gap-1.5">
          {additions > 0 ? (
            <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[11px] font-semibold tabular-nums text-emerald-700">
              +{additions}
            </span>
          ) : null}
          {deletions > 0 ? (
            <span className="rounded-md bg-red-50 px-1.5 py-0.5 text-[11px] font-semibold tabular-nums text-red-600">
              −{deletions}
            </span>
          ) : null}
        </div>
      </div>

      {defaultOpen ? (
        <div className="overflow-x-auto border-t border-neutral-200/70 bg-white">
          <table className="w-full border-collapse font-mono text-[12px] leading-5">
            <tbody>
              {lines.map((line, i) => {
                if (line.type === 'hunk') {
                  return (
                    <tr key={`h-${i}`}>
                      <td
                        colSpan={4}
                        className="bg-stone-50/80 px-3 py-1 text-[11px] text-neutral-500"
                      >
                        {line.text}
                      </td>
                    </tr>
                  );
                }
                const bg =
                  line.type === 'add'
                    ? 'bg-emerald-50/70'
                    : line.type === 'del'
                      ? 'bg-red-50/60'
                      : '';
                const marker =
                  line.type === 'add' ? '+' : line.type === 'del' ? '−' : ' ';
                const markerColor =
                  line.type === 'add'
                    ? 'text-emerald-700'
                    : line.type === 'del'
                      ? 'text-red-500'
                      : 'text-transparent';
                return (
                  <tr key={`l-${i}`} className={bg}>
                    <td className="w-8 select-none border-r border-neutral-200/70 px-1.5 text-right text-[11px] text-neutral-400 tabular-nums">
                      {line.oldLine ?? ''}
                    </td>
                    <td className="w-8 select-none border-r border-neutral-200/70 px-1.5 text-right text-[11px] text-neutral-400 tabular-nums">
                      {line.newLine ?? ''}
                    </td>
                    <td className={`w-4 select-none px-1 text-center ${markerColor}`}>{marker}</td>
                    <td className="break-all px-2 text-neutral-800">{line.text}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}

/** Dark PTY-style panel for CI / shell output (TerminalPage aesthetic). */
export function AppTerminalPanel({
  title = 'Terminal',
  children,
  className = '',
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl bg-stone-950 ring-1 ring-stone-800 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-stone-800 px-3 py-1.5">
        <span className="size-2 rounded-full bg-stone-600" />
        <span className="size-2 rounded-full bg-stone-600" />
        <span className="size-2 rounded-full bg-stone-600" />
        <span className="ml-1 font-mono text-[10px] uppercase tracking-wide text-stone-500">
          {title}
        </span>
      </div>
      <div className="px-3 py-2.5 font-mono text-[11px] leading-relaxed text-stone-300">
        {children}
      </div>
    </div>
  );
}

/** Document viewer for AGENTS.md / brand rules — not a settings grid. */
export function AppDocPanel({
  filename,
  badge,
  children,
}: {
  filename: string;
  badge?: string;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] ring-1 ring-neutral-200/55">
      <div className="flex items-center justify-between gap-2 border-b border-neutral-200/70 bg-stone-50/80 px-3 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <FileCode className="h-3.5 w-3.5 shrink-0 text-neutral-400" strokeWidth={1.75} />
          <span className="truncate font-mono text-[12px] font-medium text-neutral-900">
            {filename}
          </span>
        </div>
        {badge ? (
          <span className="shrink-0 rounded border border-trooper-200 bg-trooper-50 px-1.5 py-0.5 text-[10px] font-semibold text-trooper-800">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="max-h-[260px] overflow-y-auto bg-white px-3 py-3 font-mono text-[12px] leading-relaxed text-neutral-700">
        {children}
      </div>
    </div>
  );
}
