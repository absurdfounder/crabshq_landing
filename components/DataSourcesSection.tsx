'use client';

import { Cloud, FileText, Clock, StickyNote, Pin, ExternalLink } from 'lucide-react';
import FeaturePeekStage from './ui/FeaturePeekStage';

const sectionXPadding = 'px-4 sm:px-6 lg:px-8';

const SOURCE_TAGS = [
  'OneDrive',
  'Google Drive',
  'Notion',
  'Apple Notes',
  'Slack',
  'Gmail',
  'X / social',
  'APIs',
];

function FileTypeIcon({ kind }: { kind: 'docx' | 'pptx' | 'pdf' }) {
  const map = {
    docx: { label: 'W', bg: 'bg-blue-500' },
    pptx: { label: 'P', bg: 'bg-orange-500' },
    pdf: { label: 'PDF', bg: 'bg-red-500' },
  } as const;
  const { label, bg } = map[kind];
  return (
    <span
      className={`inline-flex size-7 shrink-0 items-center justify-center rounded-md ${bg} font-mono text-[10px] font-bold text-white`}
    >
      {label}
    </span>
  );
}

function DataSourcesVisual() {
  return (
    <div className="grid w-full max-w-[34rem] grid-cols-2 gap-3 sm:gap-3.5">
      {/* Recent files (cloud) — spans both columns */}
      <div className="col-span-2 overflow-hidden rounded-xl bg-white shadow-[0_16px_40px_-18px_rgba(28,25,23,0.28)] ring-1 ring-black/[0.06]">
        <div className="flex items-center gap-2 border-b border-slate-100 px-3.5 py-2.5">
          <Cloud className="size-4 text-sky-500" strokeWidth={2} />
          <span className="text-[13px] font-semibold text-slate-900">Recent files</span>
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.12em] text-slate-400">
            OneDrive
          </span>
        </div>
        <div className="divide-y divide-slate-100">
          <div className="flex items-center gap-3 px-3.5 py-2.5">
            <FileTypeIcon kind="docx" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12.5px] font-medium text-slate-800">Project_Proposal.docx</p>
              <p className="font-mono text-[10px] text-slate-400">Modified 3 hours ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-3.5 py-2.5">
            <FileTypeIcon kind="pptx" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12.5px] font-medium text-slate-800">Q4_Launch_Deck.pptx</p>
              <p className="font-mono text-[10px] text-slate-400">Modified 5 hours ago</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-slate-100 px-3.5 py-2">
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-slate-400">
            <Clock className="size-3" strokeWidth={2} />
            Synced 3 hours ago
          </span>
          <ExternalLink className="size-3 text-slate-300" strokeWidth={2} />
        </div>
      </div>

      {/* API documentation file */}
      <div className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-gradient-to-br from-red-500 to-rose-600 p-3.5 text-white shadow-[0_16px_40px_-18px_rgba(190,18,60,0.5)]">
        <span className="absolute right-0 top-0 size-7 bg-white/20 [clip-path:polygon(100%_0,0_0,100%_100%)]" />
        <div>
          <FileText className="mb-2 size-5 text-white/90" strokeWidth={2} />
          <p className="text-[12.5px] font-semibold leading-snug">API Documentation v2.1</p>
          <p className="mt-1 text-[10.5px] leading-snug text-white/80">
            REST endpoints, auth methods, and integration examples for developers…
          </p>
        </div>
        <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-white/70">
          <Clock className="size-2.5" strokeWidth={2} />
          3 minutes ago
        </span>
      </div>

      {/* Sticky note */}
      <div className="flex flex-col overflow-hidden rounded-xl bg-amber-300 shadow-[0_16px_40px_-18px_rgba(217,119,6,0.45)]">
        <div className="flex items-center gap-1.5 bg-amber-400/70 px-3 py-2">
          <StickyNote className="size-3.5 text-amber-900" strokeWidth={2} />
          <span className="text-[11.5px] font-semibold text-amber-950">Mountain Hiking</span>
        </div>
        <div className="flex-1 space-y-1.5 px-3 py-2.5 text-[11px] leading-snug text-amber-950/85">
          <p>Hiked point C → F today.</p>
          <p>Move to point H tomorrow.</p>
          <p className="text-amber-900/70">Total 3km · bring the other backpack.</p>
        </div>
      </div>

      {/* Social post */}
      <div className="col-span-2 overflow-hidden rounded-xl bg-white p-3.5 shadow-[0_16px_40px_-18px_rgba(28,25,23,0.28)] ring-1 ring-black/[0.06]">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex size-7 items-center justify-center rounded-full bg-slate-900 font-mono text-[11px] font-bold text-white">
            X
          </span>
          <div className="leading-tight">
            <p className="text-[12.5px] font-semibold text-slate-900">Max</p>
            <p className="font-mono text-[10px] text-slate-400">@maxthreads</p>
          </div>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-slate-500">
            <Pin className="size-2.5" strokeWidth={2} />
            Pinned
          </span>
        </div>
        <p className="mt-2 text-[12px] leading-snug text-slate-700">
          Great work isn&apos;t about inspiration — it&apos;s about discipline. Show up, stay curious,
          keep refining. <span className="text-sky-600">#KeepGoing</span>
        </p>
      </div>
    </div>
  );
}

type DataSourcesSectionProps = {
  kicker?: string;
};

/** Same card shell as other capabilities — showcases the files & data sources memory draws from. */
export default function DataSourcesSection({ kicker = '05' }: DataSourcesSectionProps) {
  return (
    <article
      aria-labelledby="data-sources-heading"
      className="relative overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5"
    >
      <div className="grid lg:grid-cols-2 lg:items-stretch">
        <div className={`${sectionXPadding} flex flex-col justify-center py-8 sm:py-10 md:py-12 lg:py-14`}>
          <p className="kicker text-sm sm:text-base">
            <span className="text-ink-faint/80">[{kicker}]</span>{' '}
            <span className="normal-case">Files &amp; Data Sources</span>
          </p>
          <h3
            id="data-sources-heading"
            className="mt-4 font-display text-xl font-medium leading-snug tracking-tight text-balance text-ink sm:mt-5 sm:text-2xl lg:text-[1.75rem] lg:leading-[1.2]"
          >
            Connected to your files,{' '}
            <span className="text-ink-muted">docs, notes, and feeds.</span>
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted sm:mt-4 sm:text-[15px] sm:leading-7">
            AI employees pull live context from the places your work already lives — cloud drives,
            API docs, sticky notes, and social feeds. Memory stays grounded in real, up-to-date
            sources instead of stale snapshots.
          </p>

          <div className="mt-5 flex flex-wrap gap-1.5 sm:mt-6">
            {SOURCE_TAGS.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-slate-50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-500 ring-1 ring-slate-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="relative min-h-[360px] border-t border-[var(--color-line)] sm:min-h-[440px] lg:min-h-[500px] lg:border-t-0 lg:rounded-r-xl">
          <FeaturePeekStage framed={false}>
            <DataSourcesVisual />
          </FeaturePeekStage>
        </div>
      </div>
    </article>
  );
}
