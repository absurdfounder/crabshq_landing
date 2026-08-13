'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Github } from 'lucide-react';

import HeroRotatingHeadline from '../HeroRotatingHeadline';
import HeroDownloadButtons from '../HeroDownloadButtons';
import PixelButton from '../ui/PixelButton';
import FernCircleCheckIcon from '../ui/FernCircleCheckIcon';
import Draggable from './Draggable';

const TRUST_ITEMS = ['Free to start', 'No credit card', 'Nothing ships without your approval'] as const;
const GITHUB_URL = 'https://github.com/Trooper-AI/trooper-core';

/** Authored desktop size. Scaled to fit the page rail; headline owns the middle. */
const STAGE_W = 1600;
const STAGE_H = 780;

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

/** Remote icon with a local SVG fallback so a dead hotlink never shows a broken glyph. */
function RemoteIcon({
  src,
  size,
  className = '',
  fallback = null,
}: {
  src: string;
  size: number;
  className?: string;
  fallback?: React.ReactNode;
}) {
  const [broken, setBroken] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  // A hotlinked icon can fail before React hydrates, so the React onError
  // prop alone misses it. On mount: if the load already settled as a failure,
  // swap immediately; otherwise listen natively for the failure.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fail = () => setBroken(true);
    if (el.complete && el.naturalWidth === 0) {
      fail();
      return;
    }
    el.addEventListener('error', fail);
    return () => el.removeEventListener('error', fail);
  }, []);
  if (broken) return <>{fallback}</>;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt=""
      width={size}
      height={size}
      draggable={false}
      decoding="async"
      className={className}
      onError={() => setBroken(true)}
    />
  );
}

function FolderSvg({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 50" className={className} aria-hidden>
      <path
        d="M6 8a4 4 0 0 1 4-4h14l6 6h28a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4Z"
        fill="#59aef2"
      />
      <path d="M6 16h52v26a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4Z" fill="#8ccafd" />
    </svg>
  );
}

function FileGlyph({
  kind,
  className = '',
}: {
  kind: 'doc' | 'pdf' | 'img' | 'code' | 'csv';
  className?: string;
}) {
  const tint =
    kind === 'pdf'
      ? { sheet: '#fff', tab: '#fecaca', bar: '#ef4444', label: 'PDF' }
      : kind === 'img'
        ? { sheet: '#fff', tab: '#bbf7d0', bar: '#22c55e', label: 'PNG' }
        : kind === 'code'
          ? { sheet: '#fff', tab: '#ddd6fe', bar: '#7c3aed', label: 'TSX' }
          : kind === 'csv'
            ? { sheet: '#fff', tab: '#bfdbfe', bar: '#2563eb', label: 'CSV' }
            : { sheet: '#fff', tab: '#e7e5e4', bar: '#a8a29e', label: 'DOC' };

  return (
    <svg viewBox="0 0 48 56" className={className} aria-hidden>
      <path
        d="M6 4a3 3 0 0 1 3-3h22l11 11v37a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3Z"
        fill={tint.sheet}
        stroke="#e7e5e4"
      />
      <path d="M31 1l11 11h-8a3 3 0 0 1-3-3Z" fill={tint.tab} />
      <rect x="12" y="22" width="24" height="3" rx="1.5" fill={tint.bar} opacity="0.85" />
      <rect x="12" y="29" width="24" height="2.5" rx="1.25" fill="#e7e5e4" />
      <rect x="12" y="35" width="16" height="2.5" rx="1.25" fill="#e7e5e4" />
      <text
        x="24"
        y="48"
        textAnchor="middle"
        fontSize="7"
        fontWeight="700"
        fill={tint.bar}
        fontFamily="ui-sans-serif, system-ui"
      >
        {tint.label}
      </text>
    </svg>
  );
}

function FolderIcon({
  x,
  y,
  name,
  dataId,
}: {
  x: number;
  y: number;
  name: string;
  dataId: string;
}) {
  return (
    <Draggable x={x} y={y} dataId={dataId} className="z-[5] w-[72px] text-center">
      <div data-dh={`${dataId}-icon`}>
        <RemoteIcon
          src="/images/desktop/folder.png"
          size={56}
          className="mx-auto h-14 w-14 object-contain drop-shadow-sm"
          fallback={<FolderSvg className="mx-auto h-12 w-[58px]" />}
        />
        <span className="dh-icon-label mt-1 block truncate text-[11px] font-medium leading-4">
          {name}
        </span>
      </div>
    </Draggable>
  );
}

const CLI_IDS = ['claude', 'codex', 'cursor', 'grok'] as const;
type CliId = (typeof CLI_IDS)[number];

type CliConfig = {
  label: string;
  src: string;
  title: string;
  caption: string;
  accent: string;
  version: string;
  model: string;
  prompt: string;
  toolLine: string;
  checks: readonly [string, string, string];
  followUp: string;
  done: string;
  next: string;
  /** Authored resting spot — each CLI sits slightly differently so a switch feels like a new window. */
  x: number;
  y: number;
  w: number;
};

const CLI_APPS: Record<CliId, CliConfig> = {
  claude: {
    label: 'Claude Code',
    src: '/images/desktop/dock/claude.png',
    title: 'claude — zsh',
    caption: 'Claude Code CLI',
    accent: '#d97757',
    version: 'Claude Code v2.1.190',
    model: 'Sonnet 4.6 · high effort · ~/trooper-app',
    prompt: 'ship the auth middleware fix',
    toolLine: 'Reading src/middleware.ts · running checks',
    checks: ['Rewrote session guard', '12 tests green', 'PR #482 ready for review'],
    followUp: 'Want me to request review from Jordan?',
    done: '* Done in 8s',
    next: 'check pipeline status…',
    x: 24,
    y: 410,
    w: 360,
  },
  codex: {
    label: 'Codex',
    src: '/images/desktop/dock/codex.png',
    title: 'codex — zsh',
    caption: 'OpenAI Codex',
    accent: '#10a37f',
    version: 'Codex CLI',
    model: 'GPT-5 · ~/trooper-app',
    prompt: 'add a refunds ledger migration',
    toolLine: 'Planning · applying schema in db/migrations',
    checks: ['Created 2026_07_refunds.sql', 'Backfilled 1.2k rows', 'Migration dry-run clean'],
    followUp: 'Should I open the PR against main?',
    done: '* Finished in 14s',
    next: 'run migrate --check…',
    x: 36,
    y: 398,
    w: 372,
  },
  cursor: {
    label: 'Cursor',
    src: '/images/desktop/dock/cursor.png',
    title: 'cursor agent — zsh',
    caption: 'Cursor Agent',
    accent: '#8fc63f',
    version: 'Cursor Agent',
    model: 'Composer · ~/trooper-app',
    prompt: 'tighten the desktop hero choreography',
    toolLine: 'Editing DesktopHero.tsx · reviewing motion paths',
    checks: ['Staggered agent starts', 'Live target tracking OK', 'No overlap on dock'],
    followUp: 'Want a pass on reduced-motion next?',
    done: '* Applied in 6s',
    next: 'snapshot the hero layout…',
    x: 18,
    y: 418,
    w: 352,
  },
  grok: {
    label: 'Grok',
    src: '/images/desktop/dock/grok.png',
    title: 'grok — zsh',
    caption: 'Grok CLI',
    accent: '#c4e08a',
    version: 'Grok CLI',
    model: 'Grok 4 · ~/trooper-app',
    prompt: 'draft the deploy checklist for #482',
    toolLine: 'Scanning PR diff · writing ops notes',
    checks: ['Smoke paths listed', 'Rollback steps added', 'On-call ping drafted'],
    followUp: 'Drop this in #ship before Jordan merges?',
    done: '* Wrapped in 5s',
    next: 'post checklist to Slack…',
    x: 42,
    y: 404,
    w: 368,
  },
};

const DOCK_APPS = [
  { id: 'finder', label: 'Finder', src: '/images/desktop/dock/finder.png', kind: 'finder' as const },
  { id: 'claude', label: 'Claude Code', src: '/images/desktop/dock/claude.png', kind: 'cli' as const },
  { id: 'codex', label: 'Codex', src: '/images/desktop/dock/codex.png', kind: 'cli' as const },
  { id: 'cursor', label: 'Cursor', src: '/images/desktop/dock/cursor.png', kind: 'cli' as const },
  { id: 'grok', label: 'Grok', src: '/images/desktop/dock/grok.png', kind: 'cli' as const },
  { id: 'spotify', label: 'Spotify', src: '/images/desktop/dock/spotify.png', kind: 'app' as const },
  { id: 'chrome', label: 'Chrome', src: '/images/desktop/dock/chrome.png', kind: 'app' as const },
  { id: 'figma', label: 'Figma', src: '/images/desktop/dock/figma.png', kind: 'app' as const },
  { id: 'whatsapp', label: 'WhatsApp', src: '/images/desktop/dock/whatsapp.png', kind: 'app' as const },
  { id: 'trash', label: 'Trash', src: '/images/desktop/dock/trash.png', kind: 'app' as const },
] as const;

/**
 * macOS dock — Finder opens over deploy; CLI icons switch the agent terminal.
 * Trash sits past a hairline divider on the right.
 */
function MacDock({
  activeCli,
  onSelectCli,
  onOpenFinder,
}: {
  activeCli: CliId;
  onSelectCli: (id: CliId) => void;
  onOpenFinder: () => void;
}) {
  return (
    <div
      data-dh="dock"
      className="dh-dock pointer-events-auto absolute bottom-1.5 left-1/2 z-30 flex -translate-x-1/2 items-end gap-[5px] rounded-[16px] px-2.5 py-1.5"
    >
      {DOCK_APPS.map((app, i) => {
        const isCli = app.kind === 'cli';
        const isFinder = app.kind === 'finder';
        const isActive = isCli && app.id === activeCli;
        const interactive = isCli || isFinder;
        return (
          <React.Fragment key={app.id}>
            {app.id === 'trash' ? (
              <span className="dh-dock-sep mx-0.5 mb-1 h-8 w-px self-center" />
            ) : null}
            <button
              type="button"
              data-dh={
                isCli ? `dock-${app.id}` : isFinder ? 'dock-finder' : app.id === 'trash' ? 'trash' : undefined
              }
              aria-label={
                isCli ? `Open ${app.label}` : isFinder ? 'Open Finder' : app.label
              }
              aria-pressed={isCli ? isActive : undefined}
              disabled={!interactive}
              onClick={() => {
                if (isCli) onSelectCli(app.id as CliId);
                if (isFinder) onOpenFinder();
              }}
              className={[
                'relative flex size-9 items-center justify-center rounded-[9px]',
                interactive
                  ? 'cursor-pointer transition-transform hover:-translate-y-0.5 active:translate-y-0'
                  : 'cursor-default disabled:opacity-100',
              ].join(' ')}
            >
              <span
                className={[
                  'flex size-9 items-center justify-center overflow-hidden rounded-[9px] shadow-[0_1px_3px_rgba(26,26,26,0.22)]',
                  isActive ? 'ring-2 ring-[#8fc63f] ring-offset-1 ring-offset-white/50' : '',
                ].join(' ')}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={app.src}
                  alt=""
                  width={36}
                  height={36}
                  draggable={false}
                  className="pointer-events-none size-9 select-none object-cover"
                />
              </span>
              {isActive ? (
                <span className="absolute -bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-[#8fc63f]" />
              ) : null}
            </button>
            {i === 0 ? <span className="dh-dock-sep mx-0.5 mb-1 h-8 w-px self-center" /> : null}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function DesktopFile({
  x,
  y,
  name,
  kind,
  dataId,
}: {
  x: number;
  y: number;
  name: string;
  kind: 'doc' | 'pdf' | 'img' | 'code' | 'csv';
  dataId?: string;
}) {
  return (
    <Draggable x={x} y={y} dataId={dataId} className="z-[5] w-[72px] text-center">
      <FileGlyph kind={kind} className="mx-auto h-[52px] w-[44px] drop-shadow-sm" />
      <span className="dh-icon-label mt-1 block truncate text-[11px] font-medium leading-4">
        {name}
      </span>
    </Draggable>
  );
}

/** Flat mac window — no tilt. Real desktops keep windows square to the screen. */
function MacWindow({
  x,
  y,
  w,
  title,
  caption,
  dataId,
  children,
}: {
  x: number;
  y: number;
  w: number;
  title?: string;
  caption?: string;
  dataId: string;
  children: React.ReactNode;
}) {
  return (
    <Draggable x={x} y={y} dataId={dataId} className="z-[12]">
      <div style={{ width: w }}>
        <div className="overflow-hidden rounded-[10px] bg-white shadow-[0_1px_0_rgba(255,255,255,0.75)_inset,0_2px_4px_rgba(26,26,26,0.04),0_12px_32px_-8px_rgba(26,26,26,0.22),0_32px_64px_-16px_rgba(26,26,26,0.16)] ring-1 ring-black/[0.08]">
          <div className="flex items-center gap-1.5 border-b border-black/[0.05] bg-gradient-to-b from-neutral-50 to-neutral-100/90 px-3 py-2">
            <span className="size-3 rounded-full bg-[#ff5f57] shadow-[inset_0_-0.5px_0.5px_rgba(0,0,0,0.25)]" />
            <span className="size-3 rounded-full bg-[#febc2e] shadow-[inset_0_-0.5px_0.5px_rgba(0,0,0,0.2)]" />
            <span className="size-3 rounded-full bg-[#28c840] shadow-[inset_0_-0.5px_0.5px_rgba(0,0,0,0.2)]" />
            {title ? (
              <span className="ml-2 truncate text-[11px] font-medium tracking-tight text-neutral-500">
                {title}
              </span>
            ) : null}
          </div>
          {children}
        </div>
        {caption ? (
          <p className="mt-2 text-center text-[11px] font-medium tracking-tight text-neutral-400">
            {caption}
          </p>
        ) : null}
      </div>
    </Draggable>
  );
}

/* ------------------------------------------------------------------ */
/* Window contents — what the troopers are “working on”                */
/* ------------------------------------------------------------------ */

/** Transient Preview window — opens when an agent double-clicks a desktop file. */
function PreviewDocMock() {
  return (
    <div className="relative overflow-hidden text-[11px] leading-[1.45] text-neutral-600">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/desktop/cats-monet-preview.jpg"
        alt=""
        className="h-[108px] w-full object-cover"
      />
      <div className="relative px-3.5 py-2.5">
        <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
          Article · Markdown
        </p>
        <p className="mt-1 font-semibold text-neutral-800">
          Six cats in Monet’s light
        </p>
        <p className="mt-1 line-clamp-3 text-[10px] text-neutral-500">
          Persian, Siamese, Maine Coon — Impressionist breed studies. Editorial playbook before publish.
        </p>
        <span data-dh="fx-readbar" className="dh-readbar pointer-events-none absolute left-2 right-2 h-5 rounded-sm bg-amber-200/50" />
      </div>
    </div>
  );
}

function PreviewCodeMock() {
  return (
    <div className="relative px-3 py-2.5 font-mono text-[10px] leading-[1.55] text-neutral-300">
      <p className="text-[9px] text-neutral-500">App.tsx — skim</p>
      <p className="mt-1.5">
        <span className="text-violet-300">export</span> <span className="text-sky-300">function</span>{' '}
        <span className="text-amber-200">TrooperApp</span>() {'{'}
      </p>
      <p className="pl-3 text-neutral-400">return &lt;Workforce /&gt;</p>
      <p>{'}'}</p>
      <p className="mt-1 text-emerald-400/90">// hooks ready · no blockers</p>
      <span data-dh="fx-readbar-code" className="dh-readbar pointer-events-none absolute left-2 right-2 h-4 rounded-sm bg-sky-400/25" />
    </div>
  );
}

/** Quick Look from Finder — Jordan scans a PDF before shipping. */
function PreviewFinderFileMock() {
  return (
    <div className="relative px-4 py-3 text-[11px] leading-[1.55] text-neutral-600">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
        PDF · 4 pages
      </p>
      <p className="mt-2 font-semibold text-neutral-800">Q3 refunds audit</p>
      <p className="mt-2">
        Matched Stripe payouts to the sheet. Four open disputes still need sign-off before close.
      </p>
      <ul className="mt-2 space-y-1 text-[10px] text-neutral-500">
        <li>· 18 refunds · $2,117.50 total</li>
        <li>· 0 chargebacks pending</li>
        <li>· Ledger export attached on p.3</li>
      </ul>
      <span
        data-dh="fx-readbar-finder"
        className="dh-readbar pointer-events-none absolute left-2 right-2 h-4 rounded-sm bg-amber-200/50"
      />
    </div>
  );
}

/**
 * Compact macOS Finder — sidebar + icon grid. Opens over deploy — zsh so Jordan
 * can check folders/files, then the terminal comes back.
 */
function FinderMock() {
  const side = [
    { label: 'Recents', active: false },
    { label: 'Applications', active: false },
    { label: 'Downloads', active: false },
    { label: 'Desktop', active: false },
    { label: 'Documents', active: false },
    { label: 'iCloud Drive', active: true },
  ] as const;

  const items: {
    id: string;
    name: string;
    kind: 'folder' | 'img' | 'pdf';
    selected?: boolean;
  }[] = [
    { id: 'finder-item-desktop', name: 'Desktop', kind: 'folder' },
    { id: 'finder-item-docs', name: 'Documents', kind: 'folder' },
    { id: 'finder-item-receipts', name: 'Receipts', kind: 'folder' },
    { id: 'finder-item-pdf', name: 'Q3-audit.pdf', kind: 'pdf', selected: true },
    { id: 'finder-item-photo', name: 'persian.jpg', kind: 'img' },
  ];

  return (
    <div className="flex h-[248px] select-none bg-[#ececec] text-[10px] text-neutral-700">
      <aside className="w-[108px] shrink-0 border-r border-black/[0.06] bg-[#e8e8e8]/px-1.5 py-2">
        <p className="px-1.5 pb-1 text-[8px] font-semibold uppercase tracking-[0.08em] text-neutral-400">
          Favorites
        </p>
        <ul className="space-y-0.5">
          {side.map((row) => (
            <li
              key={row.label}
              className={[
                'truncate rounded-md px-1.5 py-1 font-medium',
                row.active ? 'bg-white text-neutral-900 shadow-sm ring-1 ring-black/[0.04]' : 'text-neutral-600',
              ].join(' ')}
            >
              {row.label}
            </li>
          ))}
        </ul>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col bg-[#f6f6f6]">
        <div className="flex items-center gap-2 border-b border-black/[0.06] bg-gradient-to-b from-white to-[#f3f3f3] px-2.5 py-1.5">
          <span className="text-[11px] text-neutral-400">‹</span>
          <span className="text-[11px] text-neutral-300">›</span>
          <span className="ml-1 truncate text-[11px] font-semibold text-neutral-700">iCloud Drive</span>
          <span className="ml-auto rounded border border-black/10 bg-white px-1.5 py-0.5 text-[8px] font-semibold text-neutral-500">
            Icons
          </span>
        </div>

        <div className="grid grid-cols-3 gap-x-2 gap-y-3 overflow-hidden px-3 py-3">
          {items.map((item) => (
            <div
              key={item.id}
              data-dh={item.id}
              className={[
                'flex flex-col items-center rounded-lg px-1 py-1 text-center',
                item.selected ? 'bg-[#d6e4f5] ring-1 ring-[#7aa7d9]/40' : '',
              ].join(' ')}
            >
              {item.kind === 'folder' ? (
                <RemoteIcon
                  src="/images/desktop/folder.png"
                  size={40}
                  className="h-10 w-10 object-contain"
                  fallback={<FolderSvg className="h-9 w-[44px]" />}
                />
              ) : item.kind === 'img' ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/demo-assets/content/persian.jpg"
                  alt=""
                  className="h-10 w-10 rounded-[5px] object-cover shadow-sm ring-1 ring-black/10"
                />
              ) : (
                <FileGlyph kind="pdf" className="h-10 w-8" />
              )}
              <span className="mt-1 w-full truncate text-[9px] font-medium leading-tight text-neutral-700">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Closed by default; choreography opens → reads → closes. */
function TransientWindow({
  x,
  y,
  w,
  dataId,
  title,
  dark,
  zClass = 'z-[25]',
  children,
}: {
  x: number;
  y: number;
  w: number;
  dataId: string;
  title: string;
  dark?: boolean;
  zClass?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      data-dh={dataId}
      className={`dh-preview dh-preview-closed absolute ${zClass}`}
      style={{ left: x, top: y, width: w }}
    >
      <div
        className={`overflow-hidden rounded-[10px] shadow-[0_1px_0_rgba(255,255,255,0.75)_inset,0_12px_32px_-8px_rgba(26,26,26,0.28),0_32px_64px_-16px_rgba(26,26,26,0.2)] ring-1 ring-black/[0.1] ${
          dark ? 'bg-neutral-950' : 'bg-white'
        }`}
      >
        <div
          className={`flex items-center gap-1.5 border-b px-3 py-2 ${
            dark ? 'border-white/10 bg-neutral-900' : 'border-black/[0.05] bg-gradient-to-b from-neutral-50 to-neutral-100/90'
          }`}
        >
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
          <span
            className={`ml-2 truncate text-[11px] font-medium tracking-tight ${
              dark ? 'text-neutral-400' : 'text-neutral-500'
            }`}
          >
            {title}
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

function SpreadsheetMock() {
  const rows = [
    ['#2381', '$420.00', 'matched'],
    ['#2380', '$89.00', 'matched'],
    ['#2379', '$1,240.00', 'review'],
    ['#2378', '$56.00', 'matched'],
    ['#2377', '$312.50', 'matched'],
  ];
  return (
    <div className="p-3.5 text-[11px] leading-4 text-neutral-600">
      <div className="mb-2 flex items-center justify-between px-0.5">
        <span className="text-[12px] font-semibold text-neutral-800">Q3 refunds</span>
        <span className="rounded-full bg-trooper-50 px-2 py-0.5 text-[10px] font-semibold text-trooper-700">
          4 matched
        </span>
      </div>
      <div className="grid grid-cols-[1fr_1fr_1fr] gap-px overflow-hidden rounded-md bg-neutral-200/70 p-px">
        <div className="bg-neutral-50 px-2 py-1.5 text-[10px] font-semibold text-neutral-500">Refund</div>
        <div className="bg-neutral-50 px-2 py-1.5 text-[10px] font-semibold text-neutral-500">Amount</div>
        <div className="bg-neutral-50 px-2 py-1.5 text-[10px] font-semibold text-neutral-500">Status</div>
        {rows.map(([id, amt, st], i) => (
          <React.Fragment key={id}>
            <div className={`bg-white px-2 py-1.5 ${i === 2 ? 'dh-row' : ''}`}>{id}</div>
            <div className={`bg-white px-2 py-1.5 tabular-nums ${i === 2 ? 'dh-row' : ''}`}>{amt}</div>
            <div className={`bg-white px-2 py-1.5 ${i === 2 ? 'dh-row' : ''}`}>
              <span
                className={
                  st === 'review'
                    ? 'rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-700'
                    : 'rounded bg-trooper-50 px-1.5 py-0.5 text-[10px] font-medium text-trooper-700'
                }
              >
                {st}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function PrReviewMock() {
  return (
    <div className="p-3.5 text-[11px] leading-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-[12px] font-semibold text-neutral-800">
            fix: retry failed webhooks
          </p>
          <p className="mt-0.5 text-[10px] text-neutral-400">#482 · trooper-app · +18 −4</p>
        </div>
        <span className="shrink-0 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
          review
        </span>
      </div>
      <div className="mt-2.5 overflow-hidden rounded-md bg-neutral-950 p-2.5 font-mono text-[10px] leading-[1.5] text-neutral-300">
        <p className="text-red-400">- retries = 0</p>
        <p className="text-emerald-400">+ retries = 3</p>
        <p className="text-emerald-400">+ backoff = exp(2)</p>
        <p className="text-neutral-500">  await flush(queue)</p>
      </div>
      <div className="mt-2.5 flex items-center gap-1.5">
        <span className="relative inline-flex size-2.5">
          <span className="absolute inset-0 rounded-full bg-amber-300" />
          <span data-dh="fx-check" className="dh-fx absolute inset-0 rounded-full bg-trooper-400" />
        </span>
        <span className="text-[11px] text-neutral-500">All checks passed</span>
        <span className="ml-auto rounded-md bg-trooper-600 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
          Approve
        </span>
      </div>
    </div>
  );
}

function TerminalMock() {
  return (
    <div className="bg-[#14170f] p-3.5 font-mono text-[11px] leading-5 text-neutral-300">
      <p>
        <span className="text-trooper-400">trooper@ship</span>
        <span className="text-neutral-500"> ~ %</span> trooper deploy --prod
      </p>
      <p
        data-dh="fx-t2"
        className="dh-type text-neutral-500"
        style={{ '--dh-w': '22ch' } as React.CSSProperties}
      >
        bundling 42 modules…
      </p>
      <p
        data-dh="fx-t3"
        className="dh-type text-trooper-400"
        style={{ '--dh-w': '22ch' } as React.CSSProperties}
      >
        ✓ live on prod — 12s
      </p>
    </div>
  );
}

/**
 * Agent CLI chat — Claude / Codex / Cursor / Grok each run a different session.
 * Choreography hooks (fx-claude-*) stay stable across brands.
 */
function CliTerminalMock({ cli }: { cli: CliId }) {
  const cfg = CLI_APPS[cli];
  const accent = cfg.accent;
  return (
    <div className="select-none bg-[#1a1a1a] font-mono text-[9px] leading-[1.45] text-[#eceae6]">
      <div className="mx-2 mt-2 px-1 py-2">
        <div className="flex items-start gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cfg.src}
            alt=""
            width={28}
            height={28}
            draggable={false}
            className="mt-0.5 size-7 shrink-0 rounded-[6px] object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="text-[9px] font-medium text-white/70">
              {cfg.version}
            </p>
            <p className="text-[10px] font-medium text-white">Welcome back Vaibhav!</p>
            <p className="mt-0.5 truncate text-[8px] text-white/45">{cfg.model}</p>
          </div>
        </div>
      </div>

      <div className="mt-2.5">
        <div className="bg-white/[0.07] px-3 py-1.5">
          <p className="text-[10px] text-white/90">
            <span className="text-white/50">&gt;</span> {cfg.prompt}
          </p>
        </div>

        <div
          data-dh="fx-claude-1"
          className="dh-fx space-y-1.5 px-3 py-2.5 text-[9px] leading-[1.5]"
        >
          <p className="text-white/85">On it — working through this now.</p>
          <p className="text-white/40">{cfg.toolLine}</p>
          <div className="pt-0.5 text-white/80">
            {cfg.checks.map((line) => (
              <p key={line}>
                <span style={{ color: accent }}>✓</span> {line}
              </p>
            ))}
          </div>
          <p className="pt-0.5 text-white/75">{cfg.followUp}</p>
          <p className="text-white/35">{cfg.done}</p>
        </div>
      </div>

      <div className="border-t border-white/10 px-3 pb-2 pt-2">
        <p className="flex items-center gap-1.5 text-[10px]">
          <span className="text-white/70">&gt;</span>
          <span
            data-dh="fx-claude-2"
            className="dh-type text-white/55"
            style={{ '--dh-w': `${Math.max(18, cfg.next.length)}ch` } as React.CSSProperties}
          >
            {cfg.next}
          </span>
          <span className="inline-block h-[11px] w-[7px] animate-pulse bg-white/90" aria-hidden />
        </p>
        <div className="mt-1.5 flex justify-between text-[8px] text-white/30">
          <span>? for shortcuts</span>
          <span>{cfg.label}</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Agent cursors                                                       */
/* ------------------------------------------------------------------ */

const AGENTS = [
  {
    id: 'aria',
    name: 'Aria',
    role: 'Growth',
    arrow: '#8fc63f',
    pillBg: '#eef6df',
    pillText: '#4a7a08',
    home: [140, 100] as const,
  },
  {
    id: 'jordan',
    name: 'Jordan',
    role: 'Chief of staff',
    arrow: '#6a9a28',
    pillBg: '#e2efd0',
    pillText: '#3a6808',
    home: [1420, 120] as const,
  },
  {
    id: 'leo',
    name: 'Leo',
    role: 'Finance',
    arrow: '#a8d45c',
    pillBg: '#f3f9e8',
    pillText: '#5a8a14',
    // Resting on Claude Code (bottom-left).
    home: [180, 420] as const,
  },
];

/** Keep cursors on the stage when a target is dragged way off-canvas. */
function clampToStage(x: number, y: number): [number, number] {
  return [Math.max(-40, Math.min(STAGE_W - 20, x)), Math.max(-20, Math.min(STAGE_H - 20, y))];
}

/** Fit the authored stage inside the rail scene without stretching. */
function useRailStageScale(sceneRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const apply = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width <= 0 || height <= 0) return;
      const scale = Math.min(width / STAGE_W, height / STAGE_H, 1);
      el.style.setProperty('--dh-scale', String(scale));
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, [sceneRef]);
}

function AgentCursor({ agent }: { agent: (typeof AGENTS)[number] }) {
  return (
    <div
      data-dh={`cursor-${agent.id}`}
      className="dh-cursor"
      style={{ transform: `translate(${agent.home[0]}px, ${agent.home[1]}px)` }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        className="drop-shadow-[0_2px_4px_rgba(26,26,26,0.18)]"
        aria-hidden
      >
        <path
          d="M4.2 3.4 Q4 2.6 4.8 2.9 L20.3 9.8 Q21.1 10.2 20.2 10.7 L13.6 12.6 L11.1 19 Q10.7 19.9 10.3 19.1 Z"
          fill={agent.arrow}
          stroke="#fff"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className="ml-4 mt-0.5 block w-max rounded-full px-2.5 py-1 text-[11px] font-semibold leading-none shadow-sm ring-1 ring-black/5"
        style={{ backgroundColor: agent.pillBg, color: agent.pillText }}
      >
        {agent.name} · {agent.role}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* The choreography engine                                             */
/* ------------------------------------------------------------------ */

type StepTarget = string | readonly [number, number];
type Step = {
  /** Element id (data-dh) or absolute stage point. */
  to: StepTarget;
  /** Offset from the target element's top-left corner, in stage px. */
  off?: readonly [number, number];
  /** Travel time in ms. */
  move: number;
  /** Pause on arrival in ms. */
  dwell?: number;
  /** data-dh id of a desktop file that rides under the cursor for this leg. */
  carry?: string;
  /** Effect fired on arrival. */
  fx?: string;
  /** Switch the agent CLI window to this brand on arrival (Leo clicks the dock). */
  cli?: CliId;
};

/** Authored left/top for each carryable desktop file (stage px). */
const CARRY_HOMES: Record<string, readonly [number, number]> = {
  // Left icon column, above every CLI resting box (CLI tops sit ~372+).
  file: [292, 200],
  'file-junk': [372, 200],
};

/** Scripts resolve targets from live element positions every frame. */
const SCRIPTS: Record<string, Step[]> = {
  aria: [
    // Open cats-monet.md → read → close, file the refunds csv, then trash the scratch file.
    { to: 'file-brief', off: [24, 28], move: 1800, dwell: 350, fx: 'openBrief' },
    { to: 'win-preview', off: [130, 90], move: 1400, fx: 'readBrief', dwell: 2400 },
    { to: 'win-preview', off: [28, 14], move: 700, fx: 'closeBrief', dwell: 450 },
    { to: 'file', off: [24, 28], move: 1800, dwell: 400 },
    { to: 'folder-inv', off: [24, 28], move: 2200, carry: 'file', fx: 'drop', dwell: 700 },
    { to: 'file-junk', off: [24, 28], move: 1600, dwell: 400 },
    { to: 'trash', off: [18, 18], move: 2400, carry: 'file-junk', fx: 'trash', dwell: 800 },
    { to: 'win-sheet', off: [120, 100], move: 2000, fx: 'flash', dwell: 600 },
  ],
  jordan: [
    // Open App.tsx → skim → close, then Finder over deploy, check a file, close, ship.
    { to: 'file-app', off: [24, 28], move: 1800, dwell: 350, fx: 'openCode' },
    { to: 'win-code', off: [120, 80], move: 1400, fx: 'readCode', dwell: 2200 },
    { to: 'win-code', off: [28, 14], move: 700, fx: 'closeCode', dwell: 450 },
    { to: 'dock-finder', off: [18, 18], move: 1600, dwell: 400, fx: 'openFinder' },
    { to: 'finder-item-receipts', off: [28, 36], move: 1400, dwell: 500 },
    { to: 'finder-item-pdf', off: [28, 36], move: 1200, dwell: 380, fx: 'openFinderFile' },
    { to: 'win-finder-preview', off: [120, 90], move: 1300, fx: 'readFinderFile', dwell: 2200 },
    { to: 'win-finder-preview', off: [28, 14], move: 700, fx: 'closeFinderFile', dwell: 400 },
    { to: 'win-finder', off: [20, 12], move: 800, fx: 'closeFinder', dwell: 500 },
    { to: 'win-pr', off: [140, 100], move: 2000, fx: 'approve', dwell: 700 },
    { to: 'win-term', off: [120, 60], move: 2200, fx: 'deploy', dwell: 1000 },
    { to: 'folder-shots', off: [24, 28], move: 2000, dwell: 1400 },
  ],
  leo: [
    // Cycle CLIs via the dock — click icon, then work in the shifted window.
    { to: 'dock-claude', off: [18, 18], move: 1600, dwell: 380, cli: 'claude' },
    { to: 'win-claude', off: [130, 78], move: 1900, fx: 'claude', dwell: 1500 },
    { to: 'dock-codex', off: [18, 18], move: 1500, dwell: 360, cli: 'codex' },
    { to: 'win-claude', off: [150, 64], move: 1800, fx: 'claude', dwell: 1600 },
    { to: 'win-sheet', off: [100, 160], move: 2200, dwell: 1100 },
    { to: 'dock-cursor', off: [18, 18], move: 1500, dwell: 360, cli: 'cursor' },
    { to: 'win-claude', off: [110, 88], move: 1800, fx: 'claude', dwell: 1600 },
    { to: 'dock-grok', off: [18, 18], move: 1500, dwell: 360, cli: 'grok' },
    { to: 'win-claude', off: [142, 56], move: 1800, fx: 'claude', dwell: 1700 },
  ],
};

/**
 * Runs the three cursors with requestAnimationFrame instead of CSS keyframes.
 *
 * The crucial difference from a keyframed timeline: a target's position is
 * resolved from its element's **live** bounding rect on every frame, so when
 * the visitor drags a window or a folder somewhere else, the agents follow it
 * there — mid-flight, even. Fixed keyframes kept clicking where the window
 * used to be.
 *
 * The engine also owns the in-window effects (row flash, check flip, terminal
 * typing, chat bubble) by toggling classes, so an effect can only ever fire
 * when its agent has actually arrived. Base styles are the completed state:
 * with the engine off (reduced motion, no JS) everything is simply visible.
 */
function useAgentChoreography(
  stageRef: React.RefObject<HTMLDivElement | null>,
  onSwitchCli: (id: CliId) => void,
  finderOpenRef: React.MutableRefObject<(() => void) | null>,
) {
  const switchCliRef = useRef(onSwitchCli);
  switchCliRef.current = onSwitchCli;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const q = (id: string) => stage.querySelector<HTMLElement>(`[data-dh="${id}"]`);
    const fileEl = q('file');
    const junkEl = q('file-junk');

    const moveCarried = (carryId: string | undefined, x: number, y: number) => {
      if (!carryId) return;
      const el = q(carryId);
      const home = CARRY_HOMES[carryId];
      if (!el || !home || el.classList.contains('dh-hide')) return;
      el.style.transform = `translate(${x - 30 - home[0]}px, ${y - 28 - home[1]}px)`;
    };

    const swallowFile = (el: HTMLElement | null) => {
      if (!el) return;
      el.classList.add('dh-hide');
      later(() => {
        el.style.transform = '';
        later(() => el.classList.remove('dh-hide'), 900);
      }, 500);
    };

    const timeouts = new Set<number>();
    const later = (fn: () => void, ms: number) => {
      const t = window.setTimeout(() => {
        timeouts.delete(t);
        fn();
      }, ms);
      timeouts.add(t);
    };

    // The story starts with these not yet done; the engine reveals them.
    const check = q('fx-check');
    const t2 = q('fx-t2');
    const t3 = q('fx-t3');
    const preview = q('win-preview');
    const codeWin = q('win-code');
    const finderWin = q('win-finder');
    const finderPreview = q('win-finder-preview');
    const readbar = q('fx-readbar');
    const readbarCode = q('fx-readbar-code');
    const readbarFinder = q('fx-readbar-finder');
    check?.classList.add('dh-off');
    // CLI reply nodes remount when Leo switches brands — always re-query.
    const hideCliFx = () => {
      q('fx-claude-1')?.classList.add('dh-off');
      const c2 = q('fx-claude-2');
      c2?.classList.remove('dh-typing');
      c2?.classList.add('dh-t-idle');
    };
    hideCliFx();
    t2?.classList.add('dh-t-idle');
    t3?.classList.add('dh-t-idle');
    preview?.classList.add('dh-preview-closed');
    codeWin?.classList.add('dh-preview-closed');
    finderWin?.classList.add('dh-preview-closed');
    finderPreview?.classList.add('dh-preview-closed');

    const typeLine = (el: HTMLElement | null) => {
      if (!el) return;
      el.classList.remove('dh-typing', 'dh-t-idle');
      void el.offsetWidth;
      el.classList.add('dh-typing');
    };

    const bounceIcon = (id: string) => {
      const el = q(id);
      if (!el) return;
      el.classList.remove('dh-bounce');
      void el.offsetWidth;
      el.classList.add('dh-bounce');
    };

    const switchCli = (id: CliId) => {
      switchCliRef.current(id);
      bounceIcon(`dock-${id}`);
      // Wait for React to remount the CLI body, then reset FX to “not yet done”.
      later(hideCliFx, 40);
    };

    const posOf = (t: StepTarget, off: readonly [number, number] = [0, 0]): [number, number] => {
      if (Array.isArray(t)) return clampToStage(t[0] + off[0], t[1] + off[1]);
      const el = q(t as string);
      const sr = stage.getBoundingClientRect();
      const s = sr.width / STAGE_W;
      if (!el || s <= 0) return clampToStage(STAGE_W / 2 + off[0], 360 + off[1]);
      // Hidden / dimmed targets still have a layout box — use it so agents
      // keep aiming at where the user left the window.
      const r = el.getBoundingClientRect();
      return clampToStage((r.left - sr.left) / s + off[0], (r.top - sr.top) / s + off[1]);
    };

    const placePreviewAt = (win: HTMLElement | null, targetId: string) => {
      if (!win) return;
      const [x, y] = posOf(targetId, [0, 0]);
      win.style.left = `${x}px`;
      win.style.top = `${y}px`;
    };

    const openPreview = (win: HTMLElement | null, bar: HTMLElement | null) => {
      if (!win) return;
      win.classList.remove('dh-preview-closed', 'dh-preview-closing');
      void win.offsetWidth;
      win.classList.add('dh-preview-open');
      bar?.classList.remove('dh-reading');
    };

    const readPreview = (bar: HTMLElement | null) => {
      if (!bar) return;
      bar.classList.remove('dh-reading');
      void bar.offsetWidth;
      bar.classList.add('dh-reading');
    };

    const closePreview = (win: HTMLElement | null, bar: HTMLElement | null) => {
      if (!win) return;
      win.classList.remove('dh-preview-open');
      win.classList.add('dh-preview-closing');
      bar?.classList.remove('dh-reading');
      later(() => {
        win.classList.add('dh-preview-closed');
        win.classList.remove('dh-preview-closing');
      }, 320);
    };

    const FX: Record<string, () => void> = {
      drop: () => {
        bounceIcon('folder-inv-icon');
        swallowFile(fileEl);
      },
      trash: () => {
        bounceIcon('trash');
        swallowFile(junkEl);
      },
      flash: () => {
        const rows = stage.querySelectorAll('.dh-row');
        rows.forEach((el) => el.classList.add('dh-hl'));
        later(() => rows.forEach((el) => el.classList.remove('dh-hl')), 1700);
      },
      approve: () => {
        check?.classList.remove('dh-off');
        later(() => check?.classList.add('dh-off'), 9000);
      },
      deploy: () => {
        typeLine(t2);
        later(() => typeLine(t3), 1100);
      },
      claude: () => {
        // Re-query — nodes remount whenever the active CLI changes.
        q('fx-claude-1')?.classList.add('dh-off');
        const c2 = q('fx-claude-2');
        c2?.classList.remove('dh-typing');
        c2?.classList.add('dh-t-idle');
        later(() => {
          q('fx-claude-1')?.classList.remove('dh-off');
          later(() => typeLine(q('fx-claude-2')), 600);
        }, 120);
      },
      openBrief: () => {
        bounceIcon('file-brief');
        later(() => {
          // Open on the sheet's *live* spot (follows a user drag).
          placePreviewAt(preview, 'win-sheet');
          q('win-sheet')?.classList.add('dh-win-dim');
          openPreview(preview, readbar);
        }, 180);
      },
      readBrief: () => readPreview(readbar),
      closeBrief: () => {
        closePreview(preview, readbar);
        later(() => q('win-sheet')?.classList.remove('dh-win-dim'), 280);
      },
      openCode: () => {
        bounceIcon('file-app');
        later(() => {
          placePreviewAt(codeWin, 'win-pr');
          q('win-pr')?.classList.add('dh-win-dim');
          openPreview(codeWin, readbarCode);
        }, 180);
      },
      readCode: () => readPreview(readbarCode),
      closeCode: () => {
        closePreview(codeWin, readbarCode);
        later(() => q('win-pr')?.classList.remove('dh-win-dim'), 280);
      },
      openFinder: () => {
        bounceIcon('dock-finder');
        later(() => {
          // Cover deploy — zsh, but pull inward so Finder isn’t jammed in the corner.
          placePreviewAt(finderWin, 'win-term');
          if (finderWin) {
            const left = parseFloat(finderWin.style.left || '0');
            const top = parseFloat(finderWin.style.top || '0');
            finderWin.style.left = `${Math.max(980, left - 160)}px`;
            finderWin.style.top = `${Math.max(300, top - 55)}px`;
          }
          q('win-term')?.classList.add('dh-win-dim');
          openPreview(finderWin, null);
        }, 180);
      },
      openFinderFile: () => {
        bounceIcon('finder-item-pdf');
        later(() => {
          placePreviewAt(finderPreview, 'win-finder');
          if (finderPreview) {
            const left = parseFloat(finderPreview.style.left || '0');
            const top = parseFloat(finderPreview.style.top || '0');
            // Quick Look floats over the Finder content area, not the outer edge.
            finderPreview.style.left = `${left + 128}px`;
            finderPreview.style.top = `${top + 48}px`;
          }
          openPreview(finderPreview, readbarFinder);
        }, 180);
      },
      readFinderFile: () => readPreview(readbarFinder),
      closeFinderFile: () => {
        closePreview(finderPreview, readbarFinder);
      },
      closeFinder: () => {
        closePreview(finderWin, null);
        later(() => q('win-term')?.classList.remove('dh-win-dim'), 280);
      },
    };

    // Dock Finder click uses the same open path as Jordan’s choreography.
    finderOpenRef.current = () => FX.openFinder();
    const clearFinderApi = () => {
      finderOpenRef.current = null;
    };

    const ease = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);

    type CursorState = {
      el: HTMLElement | null;
      steps: Step[];
      i: number;
      phase: 'move' | 'dwell';
      t0: number;
      from: [number, number];
    };
    const cursors: CursorState[] = AGENTS.map((a, k) => ({
      el: q(`cursor-${a.id}`),
      steps: SCRIPTS[a.id],
      i: 0,
      phase: 'move',
      // Staggered starts so the three agents never move in lockstep.
      t0: performance.now() + k * 500,
      from: [a.home[0], a.home[1]],
    }));

    let raf = 0;
    const frame = (now: number) => {
      for (const c of cursors) {
        if (!c.el) continue;
        const st = c.steps[c.i];
        // Live target every frame — if the visitor dragged the window/file,
        // the cursor retargets mid-flight and mid-dwell.
        const tp = posOf(st.to, st.off);
        if (c.phase === 'move') {
          const p = Math.min(1, Math.max(0, (now - c.t0) / st.move));
          const e = ease(p);
          const x = c.from[0] + (tp[0] - c.from[0]) * e;
          const y = c.from[1] + (tp[1] - c.from[1]) * e;
          c.el.style.transform = `translate(${x}px, ${y}px)`;
          moveCarried(st.carry, x, y);
          if (p >= 1) {
            c.from = tp;
            c.phase = 'dwell';
            c.t0 = now;
            if (st.cli) switchCli(st.cli);
            if (st.fx) FX[st.fx]?.();
          }
        } else {
          c.from = tp;
          c.el.style.transform = `translate(${tp[0]}px, ${tp[1]}px)`;
          moveCarried(st.carry, tp[0], tp[1]);
          if (now - c.t0 >= (st.dwell ?? 300)) {
            c.i = (c.i + 1) % c.steps.length;
            c.phase = 'move';
            c.t0 = now;
          }
        }
      }
      raf = requestAnimationFrame(frame);
    };

    // Pause the whole choreography while the hero is off screen.
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!raf) {
          const now = performance.now();
          cursors.forEach((c) => {
            c.t0 = now;
          });
          raf = requestAnimationFrame(frame);
        }
      } else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(stage);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      timeouts.forEach((t) => window.clearTimeout(t));
      clearFinderApi();
      // Leave the page in the completed, everything-visible state.
      check?.classList.remove('dh-off');
      q('fx-claude-1')?.classList.remove('dh-off');
      q('fx-claude-2')?.classList.remove('dh-t-idle', 'dh-typing');
      t2?.classList.remove('dh-t-idle', 'dh-typing');
      t3?.classList.remove('dh-t-idle', 'dh-typing');
      preview?.classList.add('dh-preview-closed');
      preview?.classList.remove('dh-preview-open', 'dh-preview-closing');
      codeWin?.classList.add('dh-preview-closed');
      codeWin?.classList.remove('dh-preview-open', 'dh-preview-closing');
      finderWin?.classList.add('dh-preview-closed');
      finderWin?.classList.remove('dh-preview-open', 'dh-preview-closing');
      finderPreview?.classList.add('dh-preview-closed');
      finderPreview?.classList.remove('dh-preview-open', 'dh-preview-closing');
      readbar?.classList.remove('dh-reading');
      readbarCode?.classList.remove('dh-reading');
      readbarFinder?.classList.remove('dh-reading');
      q('win-sheet')?.classList.remove('dh-win-dim');
      q('win-pr')?.classList.remove('dh-win-dim');
      q('win-term')?.classList.remove('dh-win-dim');
      if (fileEl) {
        fileEl.style.transform = '';
        fileEl.classList.remove('dh-hide');
      }
      if (junkEl) {
        junkEl.style.transform = '';
        junkEl.classList.remove('dh-hide');
      }
    };
  }, [stageRef, finderOpenRef]);
}

/* ------------------------------------------------------------------ */
/* The hero                                                            */
/* ------------------------------------------------------------------ */

/**
 * The hero is a desktop.
 *
 * The claim of the product is “AI employees doing real multi-window work on a
 * real computer”, so the hero shows exactly that: a dot-grid desktop with the
 * headline in the middle and, around it, mac windows a squad of named agent
 * cursors is actually working. Every window, folder and sticker can be picked
 * up and dragged — and because the choreography resolves targets from live
 * element positions, the agents follow wherever you put things.
 *
 * Below the scene, the real product demo band (as before this hero existed).
 *
 * Engineering notes:
 * - The scene lives on a fixed STAGE_W × STAGE_H stage, scaled to fit the page
 *   rail and centred so the dock sits on the desktop floor. Windows sit near
 *   the edges — the middle third is reserved for the headline.
 * - Cursors run on a rAF engine (see useAgentChoreography); in-window effects
 *   are class toggles whose base styles are the completed state, so with the
 *   engine off (reduced motion, no JS) nothing is hidden.
 * - The scene is decorative: aria-hidden, hidden below lg, pointer-events off
 *   except on draggable objects.
 */
export default function DesktopHero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const finderOpenRef = useRef<(() => void) | null>(null);
  const [activeCli, setActiveCli] = useState<CliId>('claude');
  const cli = CLI_APPS[activeCli];
  useAgentChoreography(stageRef, setActiveCli, finderOpenRef);
  useRailStageScale(sceneRef);

  return (
    <section className="band relative bg-canvas text-ink">
      <DhStyles />

      {/* Same page rail as every section below — side hairlines + max-w-7xl. */}
      <div className="rail relative overflow-hidden lg:h-[50rem] xl:h-[52rem]">
        {/* Wallpaper clipped to the rail (not full viewport). */}
        <div
          className="dh-wallpaper pointer-events-none absolute inset-x-0 top-[var(--site-header-height)] bottom-0"
          aria-hidden
        />

        {/* Desktop scene — pinned to rail bottom so the dock sits on the wallpaper edge. */}
        <div
          ref={sceneRef}
          className="pointer-events-none absolute inset-x-0 top-[calc(var(--site-header-height)+16px)] bottom-0 hidden lg:flex lg:items-end lg:justify-center"
          aria-hidden
        >
          <div
            ref={stageRef}
            className="dh-stage relative shrink-0"
            style={{
              width: STAGE_W,
              height: STAGE_H,
              transform: 'scale(var(--dh-scale, 0.75))',
              transformOrigin: 'bottom center',
            }}
          >
            {/*
              Clean four-corner grid. Icons sit in the side columns only —
              never on windows, never into the center copy band.
            */}
            <MacWindow
              x={24}
              y={48}
              w={248}
              dataId="win-sheet"
              title="refunds — Q3"
              caption="reconcile-refunds.numbers"
            >
              <SpreadsheetMock />
            </MacWindow>

            <MacWindow
              x={1345}
              y={48}
              w={240}
              dataId="win-pr"
              title="Pull request"
              caption="pr-482.diff"
            >
              <PrReviewMock />
            </MacWindow>

            <MacWindow
              x={1288}
              y={410}
              w={300}
              dataId="win-term"
              title="deploy — zsh"
              caption="trooper-cli"
            >
              <TerminalMock />
            </MacWindow>

            <MacWindow
              key={activeCli}
              x={cli.x}
              y={cli.y}
              w={cli.w}
              dataId="win-claude"
              title={cli.title}
              caption={cli.caption}
            >
              <div className="dh-cli-body max-h-[240px] overflow-hidden">
                <CliTerminalMock cli={activeCli} />
              </div>
            </MacWindow>

            {/*
              Side-column icons only — kept clear of every CLI resting box
              (CLIs sit ~x18–410, y398–670) and of the center copy band.
            */}
            <DesktopFile x={292} y={56} name="cats-monet.md" kind="doc" dataId="file-brief" />
            <FolderIcon x={480} y={580} name="invoices" dataId="folder-inv" />

            {/* Right icon column — left of right windows, clear gaps. */}
            <DesktopFile x={1195} y={56} name="App.tsx" kind="code" dataId="file-app" />
            <FolderIcon x={1180} y={580} name="screenshots" dataId="folder-shots" />

            {/* Preview readers — same corner as the window they replace. */}
            <TransientWindow x={24} y={48} w={248} dataId="win-preview" title="cats-monet.md">
              <PreviewDocMock />
            </TransientWindow>
            <TransientWindow x={1345} y={48} w={240} dataId="win-code" title="App.tsx" dark>
              <PreviewCodeMock />
            </TransientWindow>

            {/* Finder replaces deploy — zsh while open; Quick Look sits above it. */}
            <TransientWindow
              x={1080}
              y={330}
              w={460}
              dataId="win-finder"
              title="iCloud Drive"
              zClass="z-[26]"
            >
              <FinderMock />
            </TransientWindow>
            <TransientWindow
              x={1208}
              y={378}
              w={268}
              dataId="win-finder-preview"
              title="Q3-audit.pdf"
              zClass="z-[27]"
            >
              <PreviewFinderFileMock />
            </TransientWindow>

            {/* Aria's files — refunds goes to invoices; scratch gets trashed. */}
            <div
              data-dh="file"
              className="dh-file w-[72px] text-center"
              style={{ left: CARRY_HOMES.file[0], top: CARRY_HOMES.file[1] }}
            >
              <FileGlyph kind="csv" className="mx-auto h-[52px] w-[44px] drop-shadow-sm" />
              <span className="dh-icon-label mt-1 block truncate text-[11px] font-medium leading-4">
                refunds-q3.csv
              </span>
            </div>
            <div
              data-dh="file-junk"
              className="dh-file w-[72px] text-center"
              style={{ left: CARRY_HOMES['file-junk'][0], top: CARRY_HOMES['file-junk'][1] }}
            >
              <FileGlyph kind="doc" className="mx-auto h-[52px] w-[44px] drop-shadow-sm" />
              <span className="dh-icon-label mt-1 block truncate text-[11px] font-medium leading-4">
                scratch.txt
              </span>
            </div>

            <MacDock
              activeCli={activeCli}
              onSelectCli={setActiveCli}
              onOpenFinder={() => finderOpenRef.current?.()}
            />

            {AGENTS.map((agent) => (
              <AgentCursor key={agent.id} agent={agent} />
            ))}
          </div>
        </div>

        {/* Copy — same rail as the scene; no full-bleed rail-open. */}
        <div className="pointer-events-none relative z-10 pb-16 pt-[calc(var(--site-header-height)+1.5rem)] text-center lg:pb-0 lg:pt-[calc(var(--site-header-height)+1.25rem)]">
          <div className="dh-hero-copy pointer-events-auto mx-auto mt-10 w-full max-w-xl">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg p-2 px-6 font-sans text-sm font-medium tracking-tight text-fern-900 transition-colors hover:text-fern-800"
            >
              <Github className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              Open source
            </a>

            <HeroRotatingHeadline className="mx-auto mt-2.5 text-center !text-neutral-900 !text-[2rem] sm:!text-4xl lg:!text-[2.35rem] xl:!text-5xl" />

            <p className="lede mx-auto !mt-2.5 max-w-xl text-pretty text-center !text-[0.95rem] !leading-relaxed !text-neutral-700 sm:!text-base">
              <b className="font-semibold text-neutral-900">Hire a workforce, not a chatbot.</b>{' '}
              They use your tools and come back for your approval.
            </p>

            <div className="mt-5 flex flex-col items-center justify-center gap-2.5 sm:flex-row sm:gap-3">
              <PixelButton
                href="https://app.trooper.so?ref=herolanding"
                external
                size="lg"
                tone="dark"
                className="plausible-event-name=CTA+Click plausible-event-location=Hero w-full shrink-0 sm:w-auto"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Get started free
              </PixelButton>
              <HeroDownloadButtons className="w-full shrink-0 sm:w-auto" />
            </div>

            <ul className="mt-3.5 flex flex-wrap justify-center gap-x-4 gap-y-1.5" aria-label="Product highlights">
              {TRUST_ITEMS.map((item) => (
                <li key={item} className="flex items-center gap-1.5 text-[13px] text-neutral-700">
                  <FernCircleCheckIcon className="h-3.5 w-3.5 shrink-0 text-fern-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-4 text-[13px] text-neutral-500">
              <Link href="/self-host" className="font-medium text-neutral-700 transition-colors hover:text-neutral-900">
                Open source. Self-host on your machine.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Scene styles                                                        */
/* ------------------------------------------------------------------ */

function DhStyles() {
  return (
    <style>{`
.dh-wallpaper{
  position:absolute;
  /* Soft fern tint under the photo — reads as desktop atmosphere, not flat white. */
  background-color:#e6ecd8;
}
.dh-wallpaper::before{
  content:'';
  position:absolute;
  inset:0;
  pointer-events:none;
  background-image:url('/images/desktop/wallpaper.png');
  background-repeat:no-repeat;
  background-position:center 22%;
  background-size:cover;
  opacity:0.38;
}
/* Tint wash + system dot grid on top of the photo. */
.dh-wallpaper::after{
  content:'';
  position:absolute;
  inset:0;
  pointer-events:none;
  background-image:
    radial-gradient(circle at 1px 1px, rgba(40, 56, 24, 0.11) 1px, transparent 0),
    linear-gradient(180deg, rgba(230,236,216,0.78) 0%, rgba(230,236,216,0.42) 30%, rgba(230,236,216,0.16) 55%, transparent 72%);
  background-size:16px 16px, 100% 100%;
  background-repeat:repeat, no-repeat;
}

.dh-hero-copy{
  text-shadow:none;
}
.dh-icon-label{
  color:#1a1a1a;
  text-shadow:none;
}
.dh-stage [data-dh="win-sheet"],
.dh-stage [data-dh="win-pr"]{
  transition:opacity .25s ease;
}
.dh-win-dim{
  opacity:0 !important;
  pointer-events:none;
}

.dh-cli-body{
  animation:dh-cli-in .3s ease;
}
@keyframes dh-cli-in{
  from{opacity:0;transform:translateY(5px)}
  to{opacity:1;transform:none}
}

.dh-dock{
  background: linear-gradient(180deg, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.58) 100%);
  border: 1px solid rgba(255,255,255,0.7);
  box-shadow:
    0 1px 0 rgba(255,255,255,0.75) inset,
    0 10px 28px -10px rgba(26,26,26,0.35),
    0 2px 6px rgba(26,26,26,0.08);
  -webkit-backdrop-filter: blur(28px) saturate(1.5);
  backdrop-filter: blur(28px) saturate(1.5);
}
.dh-dock-sep{background:rgba(26,26,26,0.16);}
.dh-dock *:focus,.dh-dock *:focus-visible{outline:none !important; box-shadow:none !important;}

.dh-cursor{position:absolute;left:0;top:0;z-index:40;pointer-events:none;will-change:transform;}
.dh-file{position:absolute;z-index:5;pointer-events:none;transition:opacity .45s ease;}
.dh-file.dh-hide{opacity:0;}

.dh-bounce{animation:dh-bounce .55s ease;}
@keyframes dh-bounce{0%{transform:scale(1)}45%{transform:scale(1.16)}100%{transform:scale(1)}}

.dh-row{transition:background-color .5s ease;}
.dh-row.dh-hl{background-color:rgba(122,168,36,0.16) !important;}

.dh-fx{transition:opacity .35s ease,transform .35s ease;}
.dh-fx.dh-off{opacity:0;transform:translateY(4px) scale(.95);}

.dh-type{overflow:hidden;white-space:nowrap;}
.dh-type.dh-t-idle{width:0;}
.dh-type.dh-typing{width:0;animation:dh-typeonce 1s steps(22,end) forwards;}
@keyframes dh-typeonce{from{width:0}to{width:var(--dh-w,20ch)}}

.dh-preview{
  transform-origin: 20% 10%;
  transition: opacity .28s ease, transform .32s cubic-bezier(.2,.8,.2,1);
  will-change: opacity, transform;
}
.dh-preview-closed{
  opacity:0;
  transform: scale(.88) translateY(8px);
  pointer-events:none;
  visibility:hidden;
}
.dh-preview-open{
  opacity:1;
  transform: scale(1) translateY(0);
  visibility:visible;
}
.dh-preview-closing{
  opacity:0;
  transform: scale(.92) translateY(6px);
  visibility:visible;
}
.dh-readbar{
  top: 2.6rem;
  opacity:0;
}
.dh-readbar.dh-reading{
  opacity:1;
  animation: dh-read 2.2s ease-in-out forwards;
}
@keyframes dh-read{
  0%{ top: 2.4rem; opacity:0; }
  12%{ opacity:1; }
  100%{ top: calc(100% - 1.6rem); opacity:.55; }
}

.dh-float{animation:dh-float 6s ease-in-out infinite;}
@keyframes dh-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}

@media (prefers-reduced-motion: reduce){
  .dh-float,.dh-bounce,.dh-readbar.dh-reading,.dh-cli-body{animation:none !important;}
  .dh-preview{transition:none !important;}
}
`}</style>
  );
}
