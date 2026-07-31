'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

import HeroRotatingHeadline from '../HeroRotatingHeadline';
import HeroArticleDemo from '../HeroArticleDemo';
import HeroDownloadButtons from '../HeroDownloadButtons';
import PixelButton from '../ui/PixelButton';
import FernCircleCheckIcon from '../ui/FernCircleCheckIcon';
import Draggable from './Draggable';

const TRUST_ITEMS = ['Free to start', 'No credit card', 'Nothing ships without your approval'] as const;

/** Generic mac-desktop assets, hotlinked per the reference site's public paths. */
const HC = 'https://www.heyclicky.com/assets';

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

function PageSvg({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 40" className={className} aria-hidden>
      <path d="M3 3a3 3 0 0 1 3-3h16l7 7v30a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3Z" fill="#fff" stroke="#e2e2e0" />
      <path d="M22 0l7 7h-5a2 2 0 0 1-2-2Z" fill="#ededeb" />
      <rect x="8" y="14" width="16" height="2" rx="1" fill="#b9d68a" />
      <rect x="8" y="20" width="16" height="2" rx="1" fill="#e2e2e0" />
      <rect x="8" y="26" width="10" height="2" rx="1" fill="#e2e2e0" />
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
    <Draggable x={x} y={y} dataId={dataId} className="w-16 text-center">
      <div data-dh={`${dataId}-icon`}>
        <RemoteIcon
          src={`${HC}/sysicon1.avif`}
          size={52}
          className="mx-auto h-[52px] w-[52px] object-contain"
          fallback={<FolderSvg className="mx-auto h-[46px] w-[56px]" />}
        />
        <span className="mt-0.5 block truncate text-[11px] leading-4 text-neutral-500">{name}</span>
      </div>
    </Draggable>
  );
}

/** A little mac window: traffic lights, a title, mock content, filename caption. */
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
        <div className="overflow-hidden rounded-lg bg-white shadow-[0_14px_30px_-16px_rgba(26,26,26,0.25)] ring-1 ring-black/[0.08]">
          <div className="flex items-center gap-1.5 border-b border-black/5 bg-neutral-50 px-2.5 py-1.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
            {title ? (
              <span className="ml-1.5 truncate text-[10px] font-medium text-neutral-400">{title}</span>
            ) : null}
          </div>
          {children}
        </div>
        {caption ? (
          <p className="mt-1.5 text-center text-[11px] text-neutral-400">{caption}</p>
        ) : null}
      </div>
    </Draggable>
  );
}

/* ------------------------------------------------------------------ */
/* Window contents — what the troopers are “working on”                */
/* ------------------------------------------------------------------ */

function SpreadsheetMock() {
  const rows = [
    ['#2381', '$420.00', 'matched'],
    ['#2380', '$89.00', 'matched'],
    ['#2379', '$1,240.00', 'review'],
    ['#2378', '$56.00', 'matched'],
  ];
  return (
    <div className="p-2 text-[9px] leading-4 text-neutral-600">
      <div className="grid grid-cols-[1fr_1fr_1fr] gap-px rounded bg-neutral-100 p-px">
        <div className="bg-neutral-50 px-1.5 py-0.5 font-semibold text-neutral-500">Refund</div>
        <div className="bg-neutral-50 px-1.5 py-0.5 font-semibold text-neutral-500">Amount</div>
        <div className="bg-neutral-50 px-1.5 py-0.5 font-semibold text-neutral-500">Status</div>
        {rows.map(([id, amt, st], i) => (
          <React.Fragment key={id}>
            <div className={`bg-white px-1.5 py-0.5 ${i === 2 ? 'dh-row' : ''}`}>{id}</div>
            <div className={`bg-white px-1.5 py-0.5 tabular-nums ${i === 2 ? 'dh-row' : ''}`}>{amt}</div>
            <div className={`bg-white px-1.5 py-0.5 ${i === 2 ? 'dh-row' : ''}`}>
              <span className={st === 'review' ? 'text-amber-600' : 'text-trooper-600'}>{st}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function PrReviewMock() {
  return (
    <div className="p-2.5 text-[10px] leading-4">
      <p className="font-semibold text-neutral-800">fix: retry failed webhooks</p>
      <p className="text-neutral-400">#482 · trooper-app</p>
      <div className="mt-1.5 rounded bg-neutral-50 p-1.5 font-mono text-[9px] leading-4">
        <p className="text-red-500">- retries = 0</p>
        <p className="text-trooper-600">+ retries = 3</p>
        <p className="text-trooper-600">+ backoff = exp(2)</p>
      </div>
      <div className="mt-1.5 flex items-center gap-1.5">
        <span className="relative inline-flex size-2">
          <span className="absolute inset-0 rounded-full bg-amber-300" />
          <span data-dh="fx-check" className="dh-fx absolute inset-0 rounded-full bg-trooper-400" />
        </span>
        <span className="text-neutral-500">All checks passed</span>
        <span className="ml-auto rounded bg-trooper-50 px-1.5 py-0.5 font-medium text-trooper-700">
          Approve
        </span>
      </div>
    </div>
  );
}

function TerminalMock() {
  return (
    <div className="bg-white p-2.5 font-mono text-[10px] leading-5 text-neutral-600">
      <p>
        <span className="text-trooper-600">$</span> trooper deploy --prod
      </p>
      <p
        data-dh="fx-t2"
        className="dh-type text-neutral-400"
        style={{ '--dh-w': '20ch' } as React.CSSProperties}
      >
        bundling 42 modules…
      </p>
      <p
        data-dh="fx-t3"
        className="dh-type text-trooper-600"
        style={{ '--dh-w': '20ch' } as React.CSSProperties}
      >
        ✓ live on prod — 12s
      </p>
    </div>
  );
}

function ChatMock() {
  return (
    <div className="space-y-1.5 p-2.5 text-[10px] leading-4">
      <div className="flex items-start gap-1.5">
        <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-[7px] font-semibold text-neutral-600">
          JD
        </span>
        <p className="rounded-lg rounded-tl-sm bg-neutral-100 px-2 py-1 text-neutral-700">
          Launch thread is live 🚀
        </p>
      </div>
      <div className="flex justify-end">
        <p className="rounded-lg rounded-tr-sm bg-gradient-to-b from-[#dbe9ff] to-[#b3d0ff] px-2 py-1 font-medium text-[#1c2f66]">
          Scheduled the 9am posts
        </p>
      </div>
      <div data-dh="fx-bubble" className="dh-fx flex items-start gap-1.5">
        <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-trooper-100 text-[7px] font-semibold text-trooper-700">
          L
        </span>
        <p className="rounded-lg rounded-tl-sm bg-neutral-100 px-2 py-1 text-neutral-700 ring-1 ring-trooper-200">
          Found 12 creators — list in the sheet
        </p>
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
    home: [150, 300] as const,
  },
  {
    id: 'jordan',
    name: 'Jordan',
    role: 'Chief of staff',
    arrow: '#ffa04d',
    pillBg: '#fff0e0',
    pillText: '#b45309',
    home: [1080, 320] as const,
  },
  {
    id: 'leo',
    name: 'Leo',
    role: 'Finance',
    arrow: '#6aa6ff',
    pillBg: '#e7efff',
    pillText: '#2b5fd9',
    home: [210, 520] as const,
  },
];

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

const SCRIPTS: Record<string, Step[]> = {
  aria: [
    { to: 'file', off: [30, 28], move: 2000, dwell: 450 },
    { to: 'folder-inv', off: [30, 30], move: 2600, carry: true, fx: 'drop', dwell: 700 },
    { to: 'win-sheet', off: [116, 96], move: 2400, fx: 'flash', dwell: 600 },
    { to: 'file', off: [72, -30], move: 2600, dwell: 2400 },
  ],
  jordan: [
    { to: 'win-pr', off: [128, 96], move: 2200, fx: 'approve', dwell: 700 },
    { to: 'win-term', off: [118, 62], move: 2600, fx: 'deploy', dwell: 1000 },
    { to: 'helmet', off: [-38, 66], move: 2400, dwell: 1900 },
    { to: 'win-pr', off: [190, 168], move: 2200, dwell: 1300 },
  ],
  leo: [
    { to: 'win-chat', off: [118, 86], move: 2400, fx: 'post', dwell: 700 },
    { to: 'win-sheet', off: [66, 188], move: 2800, dwell: 1600 },
    { to: 'win-chat', off: [188, 44], move: 2400, dwell: 1700 },
  ],
};

/** Where the file chip rests, in stage px (also its authored left/top). */
const FILE_HOME = [96, 336] as const;

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
    const bubble = q('fx-bubble');
    const t2 = q('fx-t2');
    const t3 = q('fx-t3');
    check?.classList.add('dh-off');
    bubble?.classList.add('dh-off');
    t2?.classList.add('dh-t-idle');
    t3?.classList.add('dh-t-idle');

    const typeLine = (el: HTMLElement | null) => {
      if (!el) return;
      el.classList.remove('dh-typing', 'dh-t-idle');
      void el.offsetWidth;
      el.classList.add('dh-typing');
    };

    const FX: Record<string, () => void> = {
      drop: () => {
        const icon = q('folder-inv-icon');
        if (icon) {
          icon.classList.remove('dh-bounce');
          void icon.offsetWidth;
          icon.classList.add('dh-bounce');
        }
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
      post: () => {
        bubble?.classList.remove('dh-off');
        later(() => bubble?.classList.add('dh-off'), 9000);
      },
    };

    const posOf = (t: StepTarget, off: readonly [number, number] = [0, 0]): [number, number] => {
      if (Array.isArray(t)) return [t[0] + off[0], t[1] + off[1]];
      const el = q(t as string);
      const sr = stage.getBoundingClientRect();
      const s = sr.width / 1280;
      if (!el || s <= 0) return [640 + off[0], 360 + off[1]];
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
        if (c.phase === 'move') {
          const p = Math.min(1, Math.max(0, (now - c.t0) / st.move));
          const tp = posOf(st.to, st.off);
          const e = ease(p);
          const x = c.from[0] + (tp[0] - c.from[0]) * e;
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
      bubble?.classList.remove('dh-off');
      t2?.classList.remove('dh-t-idle', 'dh-typing');
      t3?.classList.remove('dh-t-idle', 'dh-typing');
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
 * - The scene lives on a fixed 1280px stage centred in the viewport (scaled
 *   0.82 at lg, 1.0 from xl) so authored coordinates hold at every width.
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
    <section className="band relative overflow-hidden bg-canvas text-ink">
      <DhStyles />
      <div
        className="dh-dots pointer-events-none absolute inset-x-0 top-0 h-full lg:h-[46rem] xl:h-[48rem]"
        aria-hidden
      />

      {/* The desktop scene */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 hidden lg:block lg:h-[46rem] xl:h-[48rem]"
        aria-hidden
      >
        <div className="absolute left-1/2 top-0 h-full w-[1280px] -translate-x-1/2">
          <div ref={stageRef} className="dh-stage h-full w-full origin-top scale-[0.82] xl:scale-100">
            <MacWindow x={40} y={138} w={244} dataId="win-sheet" title="refunds — Q3" caption="reconcile-refunds.numbers">
              <SpreadsheetMock />
            </MacWindow>
            <MacWindow x={980} y={134} w={268} dataId="win-pr" title="Pull request" caption="pr-482.diff">
              <PrReviewMock />
            </MacWindow>
            <MacWindow x={960} y={500} w={276} dataId="win-term" title="deploy — zsh" caption="trooper-cli">
              <TerminalMock />
            </MacWindow>
            <MacWindow x={52} y={500} w={252} dataId="win-chat" title="#launch-week" caption="field-comms">
              <ChatMock />
            </MacWindow>

            <FolderIcon x={540} y={664} name="invoices" dataId="folder-inv" />
            <FolderIcon x={690} y={664} name="screenshots" dataId="folder-shots" />

            {/* The file Aria picks up and drops into “invoices” */}
            <div
              data-dh="file"
              className="dh-file w-16 text-center"
              style={{ left: FILE_HOME[0], top: FILE_HOME[1] }}
            >
              <PageSvg className="mx-auto h-10 w-8" />
              <span className="mt-0.5 block truncate text-[10px] leading-4 text-neutral-500">
                refunds-q3.csv
              </span>
            </div>

            <Draggable x={1128} y={300} rotate={8} dataId="helmet" className="w-[96px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/trooper-logomark.png"
                alt=""
                width={96}
                height={96}
                draggable={false}
                className="dh-float size-24 object-contain drop-shadow-[0_10px_18px_rgba(26,26,26,0.16)]"
              />
            </Draggable>

            <div className="dh-spin absolute left-[560px] top-[128px] size-[22px]">
              <RemoteIcon src={`${HC}/beachball.svg`} size={22} className="size-[22px]" />
            </div>

            {AGENTS.map((agent) => (
              <AgentCursor key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      </div>

      {/* The copy — normal document flow, above the scene. The container spans
          the full rail and would swallow every pointer aimed at a window
          behind it, so it passes events through; only the copy column itself
          is interactive again. */}
      <div className="rail pointer-events-none relative z-10 pb-16 pt-[calc(var(--site-header-height)+2.5rem)] text-center lg:h-[46rem] lg:pb-0 xl:h-[48rem]">
        <div className="pointer-events-auto mx-auto max-w-3xl">
          <p className="kicker">AI workforce</p>

          <HeroRotatingHeadline className="mx-auto mt-4 text-center" />

          <p className="lede mx-auto max-w-2xl text-center sm:text-lg">
            <b className="font-semibold text-neutral-800">Hire a workforce, not a chatbot.</b>{' '}
            Troopers write code, ship commits, run ads, answer support and file the paperwork —
            each one running a loop you approved.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
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

          <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2" aria-label="Product highlights">
            {TRUST_ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-sm text-neutral-500">
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
        <div className="rail py-10 lg:py-14">
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
.dh-dots{background-image:radial-gradient(rgba(26,26,26,0.06) 1.1px,transparent 1.6px);background-size:24px 24px;}

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

.dh-spin{animation:dh-spin 7s linear infinite;}
@keyframes dh-spin{to{transform:rotate(360deg)}}
.dh-float{animation:dh-float 6s ease-in-out infinite;}
@keyframes dh-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}

@media (prefers-reduced-motion: reduce){
  .dh-spin,.dh-float,.dh-bounce{animation:none !important;}
}
`}</style>
  );
}
