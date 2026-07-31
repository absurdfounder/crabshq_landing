'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Github } from 'lucide-react';

import HeroRotatingHeadline from '../HeroRotatingHeadline';
import HeroArticleDemo from '../HeroArticleDemo';
import HeroDownloadButtons from '../HeroDownloadButtons';
import PixelButton from '../ui/PixelButton';
import FernCircleCheckIcon from '../ui/FernCircleCheckIcon';
import Draggable from './Draggable';

const TRUST_ITEMS = ['Free to start', 'No credit card', 'Nothing ships without your approval'] as const;
const GITHUB_URL = 'https://github.com/Trooper-AI';

/** Authored desktop width. Windows sit near the edges; the headline owns the middle. */
const STAGE_W = 1600;

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
    <Draggable x={x} y={y} dataId={dataId} className="w-[72px] text-center">
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

const DOCK_APPS = [
  { id: 'finder', label: 'Finder', src: '/images/desktop/dock/finder.png' },
  { id: 'claude', label: 'Claude', src: '/images/desktop/dock/claude.png' },
  { id: 'codex', label: 'Codex', src: '/images/desktop/dock/codex.png' },
  { id: 'cursor', label: 'Cursor', src: '/images/desktop/dock/cursor.png' },
  { id: 'grok', label: 'Grok', src: '/images/desktop/dock/grok.png' },
  { id: 'spotify', label: 'Spotify', src: '/images/desktop/dock/spotify.png' },
  { id: 'chrome', label: 'Chrome', src: '/images/desktop/dock/chrome.png' },
  { id: 'figma', label: 'Figma', src: '/images/desktop/dock/figma.png' },
  { id: 'whatsapp', label: 'WhatsApp', src: '/images/desktop/dock/whatsapp.png' },
  { id: 'trash', label: 'Trash', src: '/images/desktop/dock/trash.png' },
] as const;

/**
 * Decorative macOS dock — not interactive. Small glass shelf, no focus rings,
 * no hover lift. Trash sits past a hairline divider on the right.
 */
function MacDock() {
  return (
    <div
      data-dh="dock"
      aria-hidden
      className="dh-dock pointer-events-none absolute bottom-2 left-1/2 z-30 flex -translate-x-1/2 items-end gap-[5px] rounded-[16px] px-2.5 py-1.5"
    >
      {DOCK_APPS.map((app, i) => {
        const hasBg = 'bg' in app && Boolean(app.bg);
        const padded = 'pad' in app && Boolean(app.pad);
        return (
          <React.Fragment key={app.id}>
            {app.id === 'trash' ? <span className="dh-dock-sep mx-0.5 mb-1 h-8 w-px self-center" /> : null}
            <div
              data-dh={app.id === 'trash' ? 'trash' : undefined}
              className="relative flex size-9 items-center justify-center"
            >
              <span
                className="flex size-9 items-center justify-center overflow-hidden rounded-[9px] shadow-[0_1px_3px_rgba(26,26,26,0.22)]"
                style={{ backgroundColor: hasBg ? app.bg : 'transparent' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={app.src}
                  alt=""
                  width={36}
                  height={36}
                  draggable={false}
                  className={`pointer-events-none select-none ${padded ? 'size-[22px] object-contain' : 'size-9 object-cover'}`}
                />
              </span>
            </div>
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
    <Draggable x={x} y={y} dataId={dataId} className="w-[72px] text-center">
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
    <Draggable x={x} y={y} dataId={dataId}>
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
    <div className="relative px-4 py-3 text-[11px] leading-[1.55] text-neutral-600">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">Launch brief</p>
      <p className="mt-2 font-semibold text-neutral-800">Q3 growth push — refunds + ads</p>
      <p className="mt-2">
        Match Stripe refunds to the sheet, then hand Aria the creative for the retargeting set.
      </p>
      <p className="mt-1.5 text-neutral-500">
        Exit when four matched rows land and the PR is green. Jordan approves before deploy.
      </p>
      <span data-dh="fx-readbar" className="dh-readbar pointer-events-none absolute left-2 right-2 h-5 rounded-sm bg-amber-200/50" />
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

/** Closed by default; choreography opens → reads → closes. */
function TransientWindow({
  x,
  y,
  w,
  dataId,
  title,
  dark,
  children,
}: {
  x: number;
  y: number;
  w: number;
  dataId: string;
  title: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      data-dh={dataId}
      className="dh-preview dh-preview-closed absolute z-[25]"
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
 * Claude Code CLI chat — not a web bubble UI. Matches the real terminal:
 * orange-framed header, grey user bar, monospace reply, block cursor.
 */
function ClaudeCodeMock() {
  const accent = '#d97757';
  return (
    <div className="select-none bg-[#1a1a1a] font-mono text-[9px] leading-[1.45] text-[#eceae6]">
      {/* Branded session header */}
      <div className="mx-2 mt-2 rounded-sm px-2.5 py-2" style={{ border: `1px solid ${accent}` }}>
        <div className="flex items-start gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/claude-code-logo.png"
            alt=""
            width={28}
            height={28}
            draggable={false}
            className="mt-0.5 size-7 shrink-0 object-contain"
            style={{ imageRendering: 'pixelated' }}
          />
          <div className="min-w-0 flex-1">
            <p className="text-[9px] font-medium" style={{ color: accent }}>
              Claude Code v2.1.190
            </p>
            <p className="text-[10px] font-medium text-white">Welcome back Vaibhav!</p>
            <p className="mt-0.5 truncate text-[8px] text-white/45">
              Sonnet 4.6 · high effort · ~/trooper-app
            </p>
          </div>
        </div>
      </div>

      {/* Conversation */}
      <div className="mt-2.5">
        {/* User turn — full-width grey bar */}
        <div className="bg-white/[0.07] px-3 py-1.5">
          <p className="text-[10px] text-white/90">
            <span className="text-white/50">&gt;</span> ship the auth middleware fix
          </p>
        </div>

        {/* Assistant turn */}
        <div
          data-dh="fx-claude-1"
          className="dh-fx space-y-1.5 px-3 py-2.5 text-[9px] leading-[1.5]"
        >
          <p className="text-white/85">I&apos;ll dig into the auth middleware and get this shipped.</p>
          <p className="text-white/40">Called github-mcp · reading src/middleware.ts</p>
          <div className="pt-0.5 text-white/80">
            <p>
              <span style={{ color: accent }}>✓</span> Rewrote session guard
            </p>
            <p>
              <span style={{ color: accent }}>✓</span> 12 tests green
            </p>
            <p>
              <span style={{ color: accent }}>✓</span> PR #482 ready for review
            </p>
          </div>
          <p className="pt-0.5 text-white/75">Want me to request review from Jordan?</p>
          <p className="text-white/35">* Sautéed for 8s</p>
        </div>
      </div>

      {/* Input + footer */}
      <div className="border-t border-white/10 px-3 pb-2 pt-2">
        <p className="flex items-center gap-1.5 text-[10px]">
          <span className="text-white/70">&gt;</span>
          <span
            data-dh="fx-claude-2"
            className="dh-type text-white/55"
            style={{ '--dh-w': '24ch' } as React.CSSProperties}
          >
            check pipeline status…
          </span>
          <span className="inline-block h-[11px] w-[7px] animate-pulse bg-white/90" aria-hidden />
        </p>
        <div className="mt-1.5 flex justify-between text-[8px] text-white/30">
          <span>? for shortcuts</span>
          <span>← for agents</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Agent cursors                                                       */
/* ------------------------------------------------------------------ */

/**
 * Center copy owns the middle. Agents / chrome stay in side gutters only.
 */
const LANE = { leftMax: 380, rightMin: 1220 } as const;

const AGENTS = [
  {
    id: 'aria',
    name: 'Aria',
    role: 'Growth',
    arrow: '#8fc63f',
    pillBg: '#eef6df',
    pillText: '#4a7a08',
    lane: 'left' as const,
    home: [140, 100] as const,
  },
  {
    id: 'jordan',
    name: 'Jordan',
    role: 'Chief of staff',
    arrow: '#ffa04d',
    pillBg: '#fff0e0',
    pillText: '#b45309',
    lane: 'right' as const,
    home: [1420, 120] as const,
  },
  {
    id: 'leo',
    name: 'Leo',
    role: 'Finance',
    arrow: '#6aa6ff',
    pillBg: '#e7efff',
    pillText: '#2b5fd9',
    lane: 'left' as const,
    // Resting on Claude Code (bottom-left).
    home: [180, 420] as const,
  },
];

function clampToLane(x: number, lane: 'left' | 'right'): number {
  return lane === 'left' ? Math.min(x, LANE.leftMax) : Math.max(x, LANE.rightMin);
}

function AgentCursor({ agent }: { agent: (typeof AGENTS)[number] }) {
  return (
    <div
      data-dh={`cursor-${agent.id}`}
      className="dh-cursor"
      style={{ transform: `translate(${agent.home[0]}px, ${agent.home[1]}px)` }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" className="drop-shadow-[0_2px_4px_rgba(26,26,26,0.18)]" aria-hidden>
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
  /** The file rides under the cursor for this leg. */
  carry?: boolean;
  /** Effect fired on arrival. */
  fx?: string;
};

/** Each agent only visits targets in its lane — never the center copy band. */
const SCRIPTS: Record<string, Step[]> = {
  aria: [
    // Open brief.pdf → read → close, then file the refunds csv.
    { to: 'file-brief', off: [24, 28], move: 1800, dwell: 350, fx: 'openBrief' },
    { to: 'win-preview', off: [130, 90], move: 1400, fx: 'readBrief', dwell: 2400 },
    { to: 'win-preview', off: [28, 14], move: 700, fx: 'closeBrief', dwell: 450 },
    { to: 'file', off: [24, 28], move: 1800, dwell: 400 },
    { to: 'folder-inv', off: [24, 28], move: 2200, carry: true, fx: 'drop', dwell: 700 },
    { to: 'win-sheet', off: [120, 100], move: 2000, fx: 'flash', dwell: 600 },
  ],
  jordan: [
    // Open App.tsx → skim → close, then ship the PR / deploy.
    { to: 'file-app', off: [24, 28], move: 1800, dwell: 350, fx: 'openCode' },
    { to: 'win-code', off: [120, 80], move: 1400, fx: 'readCode', dwell: 2200 },
    { to: 'win-code', off: [28, 14], move: 700, fx: 'closeCode', dwell: 450 },
    { to: 'win-pr', off: [140, 100], move: 2000, fx: 'approve', dwell: 700 },
    { to: 'win-term', off: [120, 60], move: 2200, fx: 'deploy', dwell: 1000 },
    { to: 'folder-shots', off: [24, 28], move: 2000, dwell: 1400 },
  ],
  leo: [
    { to: 'win-claude', off: [120, 80], move: 2200, fx: 'claude', dwell: 700 },
    { to: 'win-sheet', off: [100, 160], move: 2600, dwell: 1400 },
    { to: 'win-claude', off: [150, 50], move: 2200, dwell: 1600 },
  ],
};

/** Where the file chip rests, in stage px (also its authored left/top). */
const FILE_HOME = [292, 200] as const;

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
function useAgentChoreography(stageRef: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const q = (id: string) => stage.querySelector<HTMLElement>(`[data-dh="${id}"]`);
    const fileEl = q('file');

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
    const c1 = q('fx-claude-1');
    const c2 = q('fx-claude-2');
    const t2 = q('fx-t2');
    const t3 = q('fx-t3');
    const preview = q('win-preview');
    const codeWin = q('win-code');
    const readbar = q('fx-readbar');
    const readbarCode = q('fx-readbar-code');
    check?.classList.add('dh-off');
    c1?.classList.add('dh-off');
    c2?.classList.add('dh-t-idle');
    t2?.classList.add('dh-t-idle');
    t3?.classList.add('dh-t-idle');
    preview?.classList.add('dh-preview-closed');
    codeWin?.classList.add('dh-preview-closed');

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
        if (fileEl) {
          fileEl.classList.add('dh-hide');
          later(() => {
            fileEl.style.transform = '';
            later(() => fileEl.classList.remove('dh-hide'), 800);
          }, 500);
        }
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
        c1?.classList.remove('dh-off');
        later(() => typeLine(c2), 600);
      },
      openBrief: () => {
        bounceIcon('file-brief');
        later(() => {
          // Replace the corner window — don't stack a second frame on it.
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
          q('win-pr')?.classList.add('dh-win-dim');
          openPreview(codeWin, readbarCode);
        }, 180);
      },
      readCode: () => readPreview(readbarCode),
      closeCode: () => {
        closePreview(codeWin, readbarCode);
        later(() => q('win-pr')?.classList.remove('dh-win-dim'), 280);
      },
    };

    const posOf = (t: StepTarget, off: readonly [number, number] = [0, 0]): [number, number] => {
      if (Array.isArray(t)) return [t[0] + off[0], t[1] + off[1]];
      const el = q(t as string);
      const sr = stage.getBoundingClientRect();
      const s = sr.width / STAGE_W;
      if (!el || s <= 0) return [STAGE_W / 2 + off[0], 360 + off[1]];
      const r = el.getBoundingClientRect();
      return [(r.left - sr.left) / s + off[0], (r.top - sr.top) / s + off[1]];
    };

    const ease = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);

    type CursorState = {
      el: HTMLElement | null;
      steps: Step[];
      i: number;
      phase: 'move' | 'dwell';
      t0: number;
      from: [number, number];
      lane: 'left' | 'right';
    };
    const cursors: CursorState[] = AGENTS.map((a, k) => ({
      el: q(`cursor-${a.id}`),
      steps: SCRIPTS[a.id],
      i: 0,
      phase: 'move',
      // Staggered starts so the three agents never move in lockstep.
      t0: performance.now() + k * 500,
      from: [a.home[0], a.home[1]],
      lane: a.lane,
    }));

    let raf = 0;
    const frame = (now: number) => {
      for (const c of cursors) {
        if (!c.el) continue;
        const st = c.steps[c.i];
        if (c.phase === 'move') {
          const p = Math.min(1, Math.max(0, (now - c.t0) / st.move));
          const raw = posOf(st.to, st.off);
          const tp: [number, number] = [clampToLane(raw[0], c.lane), raw[1]];
          const e = ease(p);
          const x = clampToLane(c.from[0] + (tp[0] - c.from[0]) * e, c.lane);
          const y = c.from[1] + (tp[1] - c.from[1]) * e;
          c.el.style.transform = `translate(${x}px, ${y}px)`;
          if (st.carry && fileEl && !fileEl.classList.contains('dh-hide')) {
            fileEl.style.transform = `translate(${x - 30 - FILE_HOME[0]}px, ${y - 28 - FILE_HOME[1]}px)`;
          }
          if (p >= 1) {
            c.from = tp;
            c.phase = 'dwell';
            c.t0 = now;
            if (st.fx) FX[st.fx]?.();
          }
        } else if (now - c.t0 >= (st.dwell ?? 300)) {
          c.i = (c.i + 1) % c.steps.length;
          c.phase = 'move';
          c.t0 = now;
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
      // Leave the page in the completed, everything-visible state.
      check?.classList.remove('dh-off');
      c1?.classList.remove('dh-off');
      c2?.classList.remove('dh-t-idle', 'dh-typing');
      t2?.classList.remove('dh-t-idle', 'dh-typing');
      t3?.classList.remove('dh-t-idle', 'dh-typing');
      preview?.classList.add('dh-preview-closed');
      preview?.classList.remove('dh-preview-open', 'dh-preview-closing');
      codeWin?.classList.add('dh-preview-closed');
      codeWin?.classList.remove('dh-preview-open', 'dh-preview-closing');
      readbar?.classList.remove('dh-reading');
      readbarCode?.classList.remove('dh-reading');
      if (fileEl) {
        fileEl.style.transform = '';
        fileEl.classList.remove('dh-hide');
      }
    };
  }, [stageRef]);
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
 * - The scene lives on a fixed STAGE_W stage centred in the viewport (scaled
 *   down below xl) so authored coordinates hold at every width. Windows sit
 *   near the edges — the middle third is reserved for the headline.
 * - Cursors run on a rAF engine (see useAgentChoreography); in-window effects
 *   are class toggles whose base styles are the completed state, so with the
 *   engine off (reduced motion, no JS) nothing is hidden.
 * - The scene is decorative: aria-hidden, hidden below lg, pointer-events off
 *   except on draggable objects.
 */
export default function DesktopHero() {
  const stageRef = useRef<HTMLDivElement>(null);
  useAgentChoreography(stageRef);

  return (
    <section className="band relative overflow-hidden text-ink">
      <DhStyles />
      {/* Wallpaper below the solid site header. */}
      <div
        className="dh-wallpaper pointer-events-none absolute inset-x-0 top-[var(--site-header-height)] h-[calc(100%-var(--site-header-height))] lg:h-[calc(50rem-var(--site-header-height))] xl:h-[calc(52rem-var(--site-header-height))]"
        aria-hidden
      />

      {/* Desktop scene — clear of the header, corners only. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-[calc(var(--site-header-height)+24px)] hidden lg:block lg:h-[calc(50rem-var(--site-header-height)-24px)] xl:h-[calc(52rem-var(--site-header-height)-24px)]"
        aria-hidden
      >
        <div
          className="absolute left-1/2 top-0 h-full -translate-x-1/2"
          style={{ width: STAGE_W }}
        >
          <div
            ref={stageRef}
            className="dh-stage h-full w-full origin-top scale-[0.7] min-[1100px]:scale-[0.78] xl:scale-[0.9] 2xl:scale-100"
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
              x={1360}
              y={410}
              w={220}
              dataId="win-term"
              title="deploy — zsh"
              caption="trooper-cli"
            >
              <TerminalMock />
            </MacWindow>

            <MacWindow
              x={24}
              y={400}
              w={260}
              dataId="win-claude"
              title="claude — zsh"
              caption="Claude Code CLI"
            >
              <div className="max-h-[240px] overflow-hidden">
                <ClaudeCodeMock />
              </div>
            </MacWindow>

            {/* Left icon column — right of left windows, clear gaps. */}
            <DesktopFile x={292} y={56} name="brief.pdf" kind="pdf" dataId="file-brief" />
            <FolderIcon x={292} y={560} name="invoices" dataId="folder-inv" />

            {/* Right icon column — left of right windows, clear gaps. */}
            <DesktopFile x={1195} y={56} name="App.tsx" kind="code" dataId="file-app" />
            <FolderIcon x={1195} y={560} name="screenshots" dataId="folder-shots" />

            {/* Preview readers — same corner as the window they replace. */}
            <TransientWindow x={24} y={48} w={248} dataId="win-preview" title="brief.pdf">
              <PreviewDocMock />
            </TransientWindow>
            <TransientWindow x={1345} y={48} w={240} dataId="win-code" title="App.tsx" dark>
              <PreviewCodeMock />
            </TransientWindow>

            {/* Aria's file — in the left icon column between the two windows. */}
            <div
              data-dh="file"
              className="dh-file w-[72px] text-center"
              style={{ left: FILE_HOME[0], top: FILE_HOME[1] }}
            >
              <FileGlyph kind="csv" className="mx-auto h-[52px] w-[44px] drop-shadow-sm" />
              <span className="dh-icon-label mt-1 block truncate text-[11px] font-medium leading-4">
                refunds-q3.csv
              </span>
            </div>

            <MacDock />

            {AGENTS.map((agent) => (
              <AgentCursor key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      </div>

      {/* Copy high in the sky band, center only — no card behind it. */}
      <div className="rail rail-open pointer-events-none relative z-10 pb-16 pt-[calc(var(--site-header-height)+1.75rem)] text-center lg:h-[50rem] lg:pb-0 lg:pt-[calc(var(--site-header-height)+1.5rem)] xl:h-[52rem]">
        <div className="dh-hero-copy pointer-events-auto mx-auto max-w-md lg:max-w-[26rem] xl:max-w-md">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-sans text-sm font-medium tracking-tight text-fern-700 transition-colors hover:text-fern-800 sm:text-base"
          >
            <Github className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
            Open source
          </a>

          <HeroRotatingHeadline className="mx-auto mt-3 text-center !text-neutral-900" />

          <p className="lede mx-auto !mt-3 max-w-md text-center !text-neutral-700 sm:text-lg">
            <b className="font-semibold text-neutral-900">Hire a workforce, not a chatbot.</b>{' '}
            Troopers write code, ship commits, run ads, answer support and file the paperwork —
            each one running a loop you approved.
          </p>

          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PixelButton
              href="https://app.trooper.so?ref=herolanding"
              external
              size="lg"
              tone="dark"
              className="w-full shrink-0 sm:w-auto"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Get started free
            </PixelButton>
            <HeroDownloadButtons className="w-full shrink-0 sm:w-auto" />
          </div>

          <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2" aria-label="Product highlights">
            {TRUST_ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-sm text-neutral-700">
                <FernCircleCheckIcon className="h-4 w-4 shrink-0 text-fern-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/*
        The product, on the tinted pixel surface. No white card around it: the
        demo window already carries its own border, radius and shadow, and a
        second frame plus the band's internal padding read as a grey mat
        around the product. `flush` strips the band's own padding too.
      */}
      <div className="hero-surface relative hidden border-t border-black/5 lg:block">
        <div className="rail rail-open py-10 lg:py-14">
          <HeroArticleDemo rotate flush />
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
  background-color:#e4e9e2;
  background-image:url('/images/desktop/wallpaper.png');
  background-repeat:no-repeat;
  background-position:center 22%;
  background-size:cover;
}
/* Soft upper lift for copy contrast — full-width fade, not a center box. */
.dh-wallpaper::after{
  content:'';
  position:absolute;
  inset:0;
  background:linear-gradient(180deg, rgba(240,243,236,0.55) 0%, rgba(240,243,236,0.2) 28%, transparent 48%);
  pointer-events:none;
}

.dh-hero-copy{
  text-shadow:0 1px 0 rgba(240,243,236,0.7);
}
.dh-icon-label{
  color:#1a1a1a;
  text-shadow: 0 1px 2px rgba(250,248,240,0.95), 0 0 8px rgba(250,248,240,0.8);
}
.dh-stage [data-dh="win-sheet"],
.dh-stage [data-dh="win-pr"]{
  transition:opacity .25s ease;
}
.dh-win-dim{
  opacity:0 !important;
  pointer-events:none;
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
.dh-file{position:absolute;z-index:10;pointer-events:none;transition:opacity .45s ease;}
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
  .dh-float,.dh-bounce,.dh-readbar.dh-reading{animation:none !important;}
  .dh-preview{transition:none !important;}
}
`}</style>
  );
}
