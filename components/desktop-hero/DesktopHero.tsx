'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

import HeroRotatingHeadline from '../HeroRotatingHeadline';
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
        fill="#3d9be9"
      />
      <path
        d="M6 16h52v26a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4Z"
        fill="#6cb9f5"
      />
    </svg>
  );
}

function PageSvg({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 40" className={className} aria-hidden>
      <path d="M3 3a3 3 0 0 1 3-3h16l7 7v30a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3Z" fill="#fff" stroke="#d4d4d4" />
      <path d="M22 0l7 7h-5a2 2 0 0 1-2-2Z" fill="#e5e5e5" />
      <rect x="8" y="14" width="16" height="2" rx="1" fill="#9db866" />
      <rect x="8" y="20" width="16" height="2" rx="1" fill="#d4d4d4" />
      <rect x="8" y="26" width="10" height="2" rx="1" fill="#d4d4d4" />
    </svg>
  );
}

function FolderIcon({
  x,
  y,
  name,
  className = '',
}: {
  x: number;
  y: number;
  name: string;
  className?: string;
}) {
  return (
    <Draggable x={x} y={y} className="w-16 text-center">
      <div className={className}>
        <RemoteIcon
          src={`${HC}/sysicon1.avif`}
          size={52}
          className="mx-auto h-[52px] w-[52px] object-contain"
          fallback={<FolderSvg className="mx-auto h-[46px] w-[56px]" />}
        />
        <span className="mt-0.5 block truncate text-[11px] leading-4 text-neutral-600">{name}</span>
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
  children,
}: {
  x: number;
  y: number;
  w: number;
  title?: string;
  caption?: string;
  children: React.ReactNode;
}) {
  return (
    <Draggable x={x} y={y}>
      <div style={{ width: w }}>
        <div className="overflow-hidden rounded-lg bg-white shadow-[0_16px_36px_-14px_rgba(26,26,26,0.4)] ring-1 ring-black/10">
          <div className="flex items-center gap-1.5 border-b border-black/5 bg-neutral-50 px-2.5 py-1.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
            {title ? (
              <span className="ml-1.5 truncate text-[10px] font-medium text-neutral-500">{title}</span>
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
            <div className={`bg-white px-1.5 py-0.5 ${i === 2 ? 'dh-row-flash' : ''}`}>{id}</div>
            <div className={`bg-white px-1.5 py-0.5 tabular-nums ${i === 2 ? 'dh-row-flash' : ''}`}>{amt}</div>
            <div className={`bg-white px-1.5 py-0.5 ${i === 2 ? 'dh-row-flash' : ''}`}>
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
        <p className="text-red-600">- retries = 0</p>
        <p className="text-trooper-700">+ retries = 3</p>
        <p className="text-trooper-700">+ backoff = exp(2)</p>
      </div>
      <div className="mt-1.5 flex items-center gap-1.5">
        <span className="relative inline-flex size-2">
          <span className="absolute inset-0 rounded-full bg-amber-400" />
          <span className="dh-check-on absolute inset-0 rounded-full bg-trooper-500" />
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
    <div className="bg-[#161813] p-2.5 font-mono text-[10px] leading-5 text-neutral-200">
      <p>$ trooper deploy --prod</p>
      <p className="dh-type dh-t2 text-neutral-400">bundling 42 modules…</p>
      <p className="dh-type dh-t3 text-[#9db866]">✓ live on prod — 12s</p>
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
        <p className="rounded-lg rounded-tr-sm bg-trooper-600 px-2 py-1 text-white">
          Scheduled the 9am posts
        </p>
      </div>
      <div className="dh-pop flex items-start gap-1.5">
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

function AgentCursor({
  name,
  role,
  color,
  animClass,
}: {
  name: string;
  role: string;
  color: string;
  animClass: string;
}) {
  return (
    <div className={`dh-cursor ${animClass}`}>
      <svg width="18" height="18" viewBox="0 0 24 24" className="drop-shadow-sm" aria-hidden>
        <path
          d="M4.2 3.4 Q4 2.6 4.8 2.9 L20.3 9.8 Q21.1 10.2 20.2 10.7 L13.6 12.6 L11.1 19 Q10.7 19.9 10.3 19.1 Z"
          fill={color}
          stroke="#fff"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className="ml-4 block w-max rounded-full px-2 py-0.5 text-[11px] font-medium leading-4 text-white shadow-sm"
        style={{ backgroundColor: color }}
      >
        {name} · {role}
      </span>
    </div>
  );
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
 * cursors is actually working — one reconciles refunds and files the CSV into
 * a folder, one approves a PR and deploys from a terminal, one posts back in
 * the launch channel. Every window, folder and sticker can be picked up and
 * dragged.
 *
 * Engineering notes:
 * - The scene lives on a fixed 1280px stage centred in the viewport, so the
 *   cursor keyframes and their pixel targets stay in register at every width;
 *   the whole stage scales 0.8 at lg and 1.0 from xl.
 * - Cursors, the carried file, and every in-window effect (row highlight, PR
 *   check flip, terminal typing, chat bubble) share one 24s CSS timeline, so
 *   the choreography stays in sync with zero JS per frame.
 * - The scene is decorative: aria-hidden, hidden below lg, pointer-events off
 *   except on draggable objects, and every animation stops under
 *   prefers-reduced-motion (base styles are the completed state).
 */
export default function DesktopHero() {
  return (
    <section className="band relative overflow-hidden bg-canvas text-ink">
      <DhStyles />
      <div className="dh-dots pointer-events-none absolute inset-0" aria-hidden />

      {/* The desktop scene */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
        <div className="absolute left-1/2 top-0 h-full w-[1280px] -translate-x-1/2">
          <div className="dh-stage h-full w-full origin-top scale-[0.82] xl:scale-100">
            <MacWindow x={40} y={138} w={244} title="refunds — Q3" caption="reconcile-refunds.numbers">
              <SpreadsheetMock />
            </MacWindow>
            <MacWindow x={980} y={134} w={268} title="Pull request" caption="pr-482.diff">
              <PrReviewMock />
            </MacWindow>
            <MacWindow x={960} y={500} w={276} title="deploy — zsh" caption="trooper-cli">
              <TerminalMock />
            </MacWindow>
            <MacWindow x={52} y={500} w={252} title="#launch-week" caption="field-comms">
              <ChatMock />
            </MacWindow>

            <FolderIcon x={540} y={664} name="invoices" className="dh-folder-invoices" />
            <FolderIcon x={690} y={664} name="screenshots" />

            {/* The file Aria picks up and drops into “invoices” */}
            <div className="dh-file absolute left-0 top-0 z-10 w-16 text-center">
              <PageSvg className="mx-auto h-10 w-8" />
              <span className="mt-0.5 block truncate text-[10px] leading-4 text-neutral-600">
                refunds-q3.csv
              </span>
            </div>

            <Draggable x={1128} y={300} rotate={8} className="w-[96px]">
              {/* Plain <img>: TrooperHelmet's whileInView never fires inside this
                  scene, so it stayed at opacity 0. The float is CSS. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/trooper-logomark.png"
                alt=""
                width={96}
                height={96}
                draggable={false}
                className="dh-float size-24 object-contain drop-shadow-[0_18px_28px_rgba(26,26,26,0.25)]"
              />
            </Draggable>

            <div className="dh-spin absolute left-[560px] top-[128px] size-[22px]">
              <RemoteIcon src={`${HC}/beachball.svg`} size={22} className="size-[22px]" />
            </div>

            <AgentCursor name="Aria" role="Growth" color="#3f6b00" animClass="dh-cur-aria" />
            <AgentCursor name="Jordan" role="Chief of staff" color="#b45309" animClass="dh-cur-jordan" />
            <AgentCursor name="Leo" role="Finance" color="#1d4ed8" animClass="dh-cur-leo" />
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
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* The 24-second timeline                                              */
/* ------------------------------------------------------------------ */

function DhStyles() {
  return (
    <style>{`
.dh-dots{background-image:radial-gradient(rgba(26,26,26,0.09) 1.1px,transparent 1.6px);background-size:22px 22px;}

.dh-cursor{position:absolute;left:0;top:0;z-index:40;pointer-events:none;animation-duration:24s;animation-timing-function:ease-in-out;animation-iteration-count:infinite;will-change:transform;}
.dh-cur-aria{transform:translate(150px,300px);animation-name:dh-cur-aria;}
.dh-cur-jordan{transform:translate(1080px,320px);animation-name:dh-cur-jordan;}
.dh-cur-leo{transform:translate(210px,520px);animation-name:dh-cur-leo;}

.dh-file{transform:translate(96px,336px);animation:dh-file 24s ease-in-out infinite;will-change:transform,opacity;pointer-events:none;}
.dh-folder-invoices{animation:dh-folder-pop 24s ease-in-out infinite;}
.dh-row-flash{animation:dh-row-flash 24s ease-in-out infinite;}
.dh-check-on{animation:dh-check 24s linear infinite;}
.dh-pop{animation:dh-pop 24s ease-in-out infinite;}
.dh-type{overflow:hidden;white-space:nowrap;}
.dh-t2{animation:dh-type2 24s steps(20,end) infinite;}
.dh-t3{animation:dh-type3 24s steps(20,end) infinite;}
.dh-spin{animation:dh-spin 7s linear infinite;}
.dh-float{animation:dh-float 6s ease-in-out infinite;}

@keyframes dh-cur-aria{
  0%{transform:translate(150px,300px)}
  6%,8%{transform:translate(110px,352px)}
  20%,22%{transform:translate(562px,688px)}
  30%,35%{transform:translate(140px,205px)}
  36%{transform:translate(140px,205px) scale(.85)}
  37%,44%{transform:translate(140px,205px)}
  52%,100%{transform:translate(150px,300px)}
}
@keyframes dh-cur-jordan{
  0%,4%{transform:translate(1080px,320px)}
  10%,17%{transform:translate(1090px,190px)}
  18%{transform:translate(1090px,190px) scale(.85)}
  19%,28%{transform:translate(1090px,190px)}
  34%,62%{transform:translate(1060px,560px)}
  74%{transform:translate(1140px,430px)}
  100%{transform:translate(1080px,320px)}
}
@keyframes dh-cur-leo{
  0%,4%{transform:translate(210px,520px)}
  12%,19%{transform:translate(170px,545px)}
  20%{transform:translate(170px,545px) scale(.85)}
  21%,34%{transform:translate(170px,545px)}
  44%,64%{transform:translate(100px,260px)}
  78%{transform:translate(170px,410px)}
  100%{transform:translate(210px,520px)}
}
@keyframes dh-file{
  0%,8%{transform:translate(96px,336px);opacity:1}
  20%{transform:translate(548px,674px);opacity:1}
  21%,94%{transform:translate(548px,674px);opacity:0}
  95%{transform:translate(96px,336px);opacity:0}
  97%,100%{transform:translate(96px,336px);opacity:1}
}
@keyframes dh-folder-pop{
  0%,19.5%{transform:scale(1)}
  21.5%{transform:scale(1.14)}
  24%,100%{transform:scale(1)}
}
@keyframes dh-row-flash{
  0%,35%{background-color:rgba(63,107,0,0)}
  38%,46%{background-color:rgba(63,107,0,0.12)}
  52%,100%{background-color:rgba(63,107,0,0)}
}
@keyframes dh-check{
  0%,18%{opacity:0}
  20%,93%{opacity:1}
  96%,100%{opacity:0}
}
@keyframes dh-pop{
  0%,20%{opacity:0;transform:translateY(4px) scale(.92)}
  23%,93%{opacity:1;transform:none}
  96%,100%{opacity:0;transform:translateY(4px) scale(.92)}
}
@keyframes dh-type2{0%,41%{width:0}46%,96%{width:20ch}100%{width:0}}
@keyframes dh-type3{0%,50%{width:0}55%,96%{width:20ch}100%{width:0}}
@keyframes dh-spin{to{transform:rotate(360deg)}}
@keyframes dh-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}

@media (prefers-reduced-motion: reduce){
  .dh-cursor,.dh-file,.dh-folder-invoices,.dh-row-flash,.dh-check-on,.dh-pop,.dh-t2,.dh-t3,.dh-spin,.dh-float{animation:none !important;}
}
`}</style>
  );
}
