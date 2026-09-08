'use client';

import { useCallback, useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';
import { Bell, ChevronsRight, Flag, Lightbulb, Loader } from 'lucide-react';

import { getTrooper } from '@/lib/troopers';
import TrooperAvatar from '@/components/ui/TrooperAvatar';

/**
 * Optimize band — rebuilt to Gumloop craft:
 * - Open-source: left/right logo arcs that scroll, digit-roll %, price swap
 * - Self-improve: SVG orbit + comet sweep + Execute/Reflect/Learn
 * - Evals: grid + scan line + cycling Flag/Notify cards
 */

type Provider = {
  id: string;
  label: string;
  /** Gumloop-extracted marks under /images/providers. */
  icon: string;
  savings: number;
};

const LEFT_PROVIDERS: readonly Provider[] = [
  { id: 'openai', label: 'OpenAI', icon: '/images/providers/openai.svg', savings: 78 },
  { id: 'anthropic', label: 'Anthropic', icon: '/images/providers/anthropic.svg', savings: 61 },
  { id: 'google', label: 'Google', icon: '/images/providers/google.svg', savings: 84 },
  { id: 'xai', label: 'xAI', icon: '/images/providers/xai.svg', savings: 69 },
  { id: 'spacexai', label: 'Space xAI', icon: '/images/providers/spacexai.svg', savings: 81 },
];

const RIGHT_PROVIDERS: readonly Provider[] = [
  { id: 'deepseek', label: 'DeepSeek', icon: '/images/providers/deepseek.png', savings: 89 },
  { id: 'moonshot', label: 'Moonshot', icon: '/images/providers/moonshot.svg', savings: 83 },
  { id: 'zai', label: 'Z.ai', icon: '/images/providers/zai.svg', savings: 87 },
  { id: 'qwen', label: 'Qwen', icon: '/images/providers/qwen.svg', savings: 83 },
  { id: 'minimax', label: 'MiniMax', icon: '/images/providers/minimax.svg', savings: 87 },
];

/** Scattered eval tiles — each hosts a different cast agent. */
const EVAL_CELL_LAYOUTS = [
  [
    { t: '18%', l: '16%', handle: 'rex' as const },
    { t: '32%', l: '36%', handle: 'nova' as const },
    { t: '56%', l: '22%', handle: 'scout' as const },
    { t: '24%', l: '58%', handle: 'pip' as const },
    { t: '64%', l: '46%', handle: 'wren' as const },
    { t: '46%', l: '68%', handle: 'nova' as const },
  ],
  [
    { t: '26%', l: '20%', handle: 'scout' as const },
    { t: '16%', l: '48%', handle: 'rex' as const },
    { t: '48%', l: '18%', handle: 'wren' as const },
    { t: '38%', l: '56%', handle: 'pip' as const },
    { t: '62%', l: '36%', handle: 'nova' as const },
    { t: '68%', l: '62%', handle: 'scout' as const },
  ],
  [
    { t: '20%', l: '34%', handle: 'pip' as const },
    { t: '40%', l: '20%', handle: 'nova' as const },
    { t: '28%', l: '64%', handle: 'rex' as const },
    { t: '58%', l: '50%', handle: 'wren' as const },
    { t: '66%', l: '26%', handle: 'scout' as const },
    { t: '50%', l: '68%', handle: 'pip' as const },
  ],
] as const;

/** Gumloop positions: toast relocates — keep inset so rounded well doesn’t clip it. */
const EVAL_TOAST_POS = [
  { top: '16%', left: '58%' },
  { top: '38%', left: '42%' },
  { top: '52%', left: '55%' },
] as const;

/** Labels stay level — readable, not orbit-rotated. */
const ORBIT = [
  { key: 'execute', label: 'Execute', Icon: ChevronsRight, left: '50%', top: '16.67%' },
  { key: 'reflect', label: 'Reflect', Icon: Loader, left: '78.87%', top: '66.67%' },
  { key: 'learn', label: 'Learn', Icon: Lightbulb, left: '21.13%', top: '66.67%' },
] as const;

const EVAL_CARDS = [
  {
    kind: 'flag' as const,
    title: 'Flag',
    body: (
      <>
        Voice &amp; tone passes fell to{' '}
        <strong className="font-semibold text-[#9810fa]">38 of 46 tasks</strong> after the latest
        prompt update.
      </>
    ),
  },
  {
    kind: 'notify' as const,
    title: 'Notify',
    body: (
      <>
        “Never quote pricing” failed in <strong className="font-semibold text-ink">3 tasks</strong>{' '}
        this week. Owners were notified.
      </>
    ),
  },
  {
    kind: 'flag' as const,
    title: 'Flag',
    body: (
      <>
        The agent guessed instead of escalating in{' '}
        <strong className="font-semibold text-[#9810fa]">2 tasks</strong>, both flagged for review.
      </>
    ),
  },
] as const;

function money(n: number) {
  return `$${n.toFixed(n < 0.1 ? 3 : 2).replace(/0+$/, '').replace(/\.$/, '')}`;
}

function wrapIndex(v: number, len: number) {
  return ((Math.round(v) % len) + len) % len;
}

function shortestDelta(index: number, scroll: number, total: number) {
  let d = index - scroll;
  while (d > total / 2) d -= total;
  while (d < -total / 2) d += total;
  return d;
}

export default function OptimizeAgentsSection() {
  return (
    <div className="gl-optimize flex flex-col gap-7 sm:gap-10 md:gap-12">
      <div className="flex flex-col">
        <h2 className="h2-section">Optimize your troopers</h2>
      </div>

      {/* Mobile: shorter wells so three cards don’t each eat a full viewport. Desktop: square. */}
      <div className="grid grid-cols-1 items-stretch gap-7 sm:gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
        <OptimizeCard
          title="Open-source by default"
          body="Run on open-source models and pay a fraction of the cost, with no lock-in and full control over where your agents run."
          visual={<OpenSourceVisual />}
        />
        <OptimizeCard
          title="Self-improving agents"
          body="Agents reflect on their own runs and improve over time, tuning themselves without manual intervention."
          visual={<SelfImproveVisual />}
        />
        <OptimizeCard
          title="Evals built in"
          body="Built-in evals let you measure quality, catch regressions, and ship improvements with confidence."
          visual={<EvalsVisual />}
        />
      </div>
    </div>
  );
}

function OptimizeCard({
  title,
  body,
  visual,
}: {
  title: string;
  body: string;
  visual: ReactNode;
}) {
  return (
    <div className="flex h-full min-w-0 flex-col gap-3 sm:gap-4">
      {/*
        Full-bleed well (Gumloop). On mobile use a shorter aspect so stacked cards
        don’t dominate the viewport; square from md up.
      */}
      <div className="relative aspect-[5/4] w-full min-w-0 overflow-hidden rounded-xl border border-[var(--color-line)] bg-[#f3f3f6] sm:aspect-[4/3] md:aspect-square">
        <div className="absolute inset-0">{visual}</div>
      </div>
      <p className="text-[14px] leading-[1.55] text-ink-muted sm:text-[15px]">
        <span className="font-medium text-ink">{title}</span> {body}
      </p>
    </div>
  );
}

/* ─── Open-source: Gumloop logo arcs + digit roll ────────────────── */

function OpenSourceVisual() {
  const reduce = !!useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.4 });
  const [leftIdx, setLeftIdx] = useState(0);
  const [rightIdx, setRightIdx] = useState(2);
  const [tick, setTick] = useState(0);
  const leftScroll = useMotionValue(0);
  const rightScroll = useMotionValue(2);
  const timer = useRef<number | null>(null);

  useMotionValueEvent(leftScroll, 'change', (v) => {
    const next = wrapIndex(v, LEFT_PROVIDERS.length);
    setLeftIdx((cur) => (cur === next ? cur : next));
  });
  useMotionValueEvent(rightScroll, 'change', (v) => {
    const next = wrapIndex(v, RIGHT_PROVIDERS.length);
    setRightIdx((cur) => (cur === next ? cur : next));
  });

  const schedule = useCallback((ms: number) => {
    if (timer.current != null) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setTick((t) => t + 1), ms);
  }, []);

  useEffect(() => {
    if (!reduce && inView) {
      schedule(1600);
      return () => {
        if (timer.current != null) window.clearTimeout(timer.current);
      };
    }
  }, [inView, reduce, schedule]);

  useEffect(() => {
    if (tick === 0 || reduce || !inView) return;
    const a = animate(leftScroll, Math.round(leftScroll.get()) + 1, {
      duration: 0.94,
      ease: [0.22, 1, 0.36, 1],
    });
    const b = animate(rightScroll, Math.round(rightScroll.get()) - 1, {
      duration: 0.94,
      ease: [0.22, 1, 0.36, 1],
    });
    schedule(2600);
    return () => {
      a.stop();
      b.stop();
    };
  }, [tick, reduce, inView, leftScroll, rightScroll, schedule]);

  const left = LEFT_PROVIDERS[leftIdx]!;
  const right = RIGHT_PROVIDERS[rightIdx]!;
  const savings = Math.round((left.savings + right.savings) / 2);
  const after = 0.42 * (1 - savings / 100);

  return (
    <div
      ref={rootRef}
      className="[container-type:size] relative isolate size-full overflow-hidden"
      role="img"
      aria-label={`${savings}% lower cost, from $0.42 down to ${money(after)} per task`}
    >
      <ProviderArc providers={LEFT_PROVIDERS} scroll={leftScroll} side="left" />
      <ProviderArc providers={RIGHT_PROVIDERS} scroll={rightScroll} side="right" />

      <div className="pointer-events-none absolute top-1/2 left-1/2 z-40 flex max-w-[90%] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
        <span className="text-[11px] font-medium leading-tight text-ink-muted sm:text-[13px]">
          Cost reduction
          <br />
          per task
        </span>
        <span className="mt-1.5 flex items-start font-display text-[clamp(2.75rem,12cqw,3.5rem)] leading-none font-medium tracking-tight text-ink tabular-nums">
          <span>−</span>
          <DigitRoll value={savings} reduce={reduce} />
          <span>%</span>
        </span>
        <span className="mt-2.5 flex items-baseline gap-1.5 text-[12px] tabular-nums sm:text-[13px]">
          <span className="text-ink-faint line-through">{money(0.42)}</span>
          <motion.span
            key={after}
            className="font-semibold text-ok-600"
            initial={reduce ? false : { opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32 }}
          >
            {money(after)}
          </motion.span>
        </span>
      </div>
    </div>
  );
}

function ProviderArc({
  providers,
  scroll,
  side,
}: {
  providers: readonly Provider[];
  scroll: ReturnType<typeof useMotionValue<number>>;
  side: 'left' | 'right';
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 select-none">
      {providers.map((entry, index) => (
        <ProviderLogo
          key={entry.id}
          entry={entry}
          index={index}
          total={providers.length}
          scroll={scroll}
          side={side}
        />
      ))}
    </div>
  );
}

function ProviderLogo({
  entry,
  index,
  total,
  scroll,
  side,
}: {
  entry: Provider;
  index: number;
  total: number;
  scroll: ReturnType<typeof useMotionValue<number>>;
  side: 'left' | 'right';
}) {
  const [d, setD] = useState(() => shortestDelta(index, scroll.get(), total));

  useMotionValueEvent(scroll, 'change', (v) => {
    setD(shortestDelta(index, v, total));
  });

  useEffect(() => {
    setD(shortestDelta(index, scroll.get(), total));
  }, [index, scroll, total]);

  const ad = Math.abs(d);
  const scale = ad < 0.01 ? 1.06 : ad < 1.01 ? 0.86 : 0.7;
  const opacity = ad < 0.01 ? 1 : ad < 1.01 ? 0.7 : 0.45;
  // Use the square’s height — Gumloop arcs run nearly top-to-bottom.
  const yPct = 50 + d * 19;
  const xBase = side === 'left' ? 17 : 83;
  const xBulge = (side === 'left' ? 1 : -1) * (ad < 0.01 ? 2.5 : ad < 1.01 ? 0.8 : 0);
  const xPct = xBase + xBulge;

  return (
    <div
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2 transition-[opacity] duration-300"
      style={{
        left: `${xPct}%`,
        top: `${yPct}%`,
        opacity,
        transform: `translate(-50%, -50%) scale(${scale})`,
        zIndex: ad < 0.5 ? 30 : 10,
      }}
      aria-hidden
    >
      <div className="relative z-10 grid size-10 place-items-center rounded-[10px] bg-white p-2 text-ink shadow-[0_4px_16px_-6px_rgba(0,0,0,0.18)] ring-1 ring-black/[0.06] sm:size-11 sm:rounded-[11px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={entry.icon}
          alt=""
          width={24}
          height={24}
          className="size-5 object-contain sm:size-6"
          draggable={false}
        />
      </div>
    </div>
  );
}

function DigitRoll({ value, reduce }: { value: number; reduce: boolean }) {
  const digits = String(value).padStart(2, '0').split('');
  return (
    <span className="inline-flex h-[1em] overflow-hidden">
      {digits.map((ch, i) => (
        <span key={i} className="relative inline-block w-[0.62em] overflow-hidden">
          <motion.span
            className="absolute top-0 left-0 flex w-full flex-col"
            animate={reduce ? { y: `-${Number(ch)}em` } : { y: `-${Number(ch)}em` }}
            initial={false}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 }}
          >
            {Array.from({ length: 10 }, (_, n) => (
              <span
                key={n}
                className="inline-flex h-[1em] shrink-0 items-center justify-center leading-none"
              >
                {n}
              </span>
            ))}
          </motion.span>
          <span className="invisible">0</span>
        </span>
      ))}
    </span>
  );
}

/* ─── Self-improve: Gumloop dual orbit (no dashed CSS rings) ─────── */

function arcPath(cx: number, cy: number, r: number, a0deg: number, a1deg: number) {
  const a0 = (a0deg * Math.PI) / 180;
  const a1 = (a1deg * Math.PI) / 180;
  let sweep = a1deg - a0deg;
  if (sweep < 0) sweep += 360;
  const large = sweep > 180 ? 1 : 0;
  const x0 = cx + r * Math.cos(a0);
  const y0 = cy + r * Math.sin(a0);
  const x1 = cx + r * Math.cos(a1);
  const y1 = cy + r * Math.sin(a1);
  return {
    d: `M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1}`,
    len: (sweep * Math.PI * r) / 180,
  };
}

function SelfImproveVisual() {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2 });
  const [phase, setPhase] = useState(0);
  const uid = useId().replace(/:/g, '');

  useEffect(() => {
    if (reduce || !inView) return;
    const id = window.setInterval(() => setPhase((p) => (p + 1) % ORBIT.length), 1800);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  const cx = 300;
  const cy = 300;
  // Outer orbit nodes at -90 / 30 / 150 (Execute / Reflect / Learn)
  const outerAngles = [-90, 30, 150] as const;
  const innerAngles = [-60, 60, 180] as const;

  return (
    <div
      ref={ref}
      className="[container-type:size] relative isolate size-full overflow-hidden"
    >
      {/* Fill the square — Gumloop’s orbit nearly touches the well edges. */}
      <div className="absolute inset-[2%]">
        <div className="absolute inset-0">
          <svg viewBox="0 0 600 600" fill="none" className="absolute inset-0 size-full overflow-visible" aria-hidden>
            <defs>
              <filter id={`oa-blur-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.4" />
              </filter>
              <marker
                id={`oa-arrow-${uid}`}
                viewBox="0 0 8 8"
                refX="6"
                refY="4"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path
                  d="M 1 1 L 7 4 L 1 7"
                  stroke="#c4c4c8"
                  strokeWidth="1.2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </marker>
            </defs>

            <g
              className={inView && !reduce ? 'gl-orbit-spin' : undefined}
              style={{ transformOrigin: '300px 300px', transformBox: 'view-box' }}
            >
              {innerAngles.map((a0, i) => {
                const a1 = innerAngles[(i + 1) % innerAngles.length]!;
                // Keep inner ring outside the white disc — never through Cubee corners.
                const { d } = arcPath(cx, cy, 178, a0, a1);
                return (
                  <path
                    key={`in-${i}`}
                    d={d}
                    stroke="#d4d4d8"
                    strokeWidth="1.2"
                    opacity="0.55"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}
            </g>

            {outerAngles.map((a0, i) => {
              const a1 = outerAngles[(i + 1) % outerAngles.length]!;
              const { d, len } = arcPath(cx, cy, 228, a0, a1);
              const active = phase === i;
              return (
                <g key={`out-${i}`}>
                  <path
                    d={d}
                    stroke="#d4d4d8"
                    strokeWidth="1.2"
                    opacity="0.6"
                    markerEnd={`url(#oa-arrow-${uid})`}
                    vectorEffect="non-scaling-stroke"
                  />
                  {active && inView && !reduce ? (
                    <path
                      d={d}
                      stroke="#9810fa"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      fill="none"
                      filter={`url(#oa-blur-${uid})`}
                      className="gl-comet-sweep"
                      style={{ '--comet-len': len } as CSSProperties}
                      vectorEffect="non-scaling-stroke"
                    />
                  ) : null}
                </g>
              );
            })}
          </svg>

          {ORBIT.map((step, i) => {
            const active = phase === i;
            const Icon = step.Icon;
            return (
              <div
                key={step.key}
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: step.left, top: step.top }}
              >
                <div
                  className={`relative flex aspect-square items-center justify-center rounded-full border bg-white transition-[width,border-color] duration-300 ${
                    active
                      ? 'w-[min(11%,42px)] border-[#9810fa]/35'
                      : 'w-[min(7.5%,30px)] border-transparent'
                  }`}
                >
                  {active ? (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -inset-1 rounded-full bg-[#9810fa]/25 blur-md"
                    />
                  ) : null}
                  <Icon
                    className={`relative size-[55%] ${
                      active ? 'text-ink' : 'text-ink-faint opacity-50'
                    } ${active && step.key === 'reflect' ? 'animate-spin' : ''}`}
                    strokeWidth={1.8}
                  />
                </div>
                <span
                  className={`absolute bottom-full left-1/2 -translate-x-1/2 pb-1.5 whitespace-nowrap transition-[font-size] duration-200 ${
                    active ? 'text-[13px]' : 'text-[11px]'
                  }`}
                >
                  <span
                    className={`font-medium ${active ? 'text-ink' : 'text-ink-faint opacity-70'}`}
                  >
                    {step.label}
                  </span>
                </span>
              </div>
            );
          })}
        </div>

        {/*
          Live cast with expressions. Large white disc + smaller mark so Cubee
          corners never meet the rim (Gumloop-style platform, not a crop).
        */}
        <div className="absolute top-1/2 left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <span
            className="relative flex h-32 w-32 items-center justify-center overflow-visible rounded-full bg-white sm:h-36 sm:w-36"
            style={{
              boxShadow:
                'rgba(0,0,0,0.04) 0 0 0 1px, rgba(0,0,0,0.05) 0 8px 20px -8px, rgba(0,0,0,0.04) 0 18px 32px -14px',
            }}
          >
            {(() => {
              const center = getTrooper('rex');
              if (!center) return null;
              return (
                <TrooperAvatar
                  trooper={center}
                  size={62}
                  live={inView && !reduce}
                  animation={phase === 0 ? 'working' : phase === 1 ? 'thinking' : 'happy'}
                />
              );
            })()}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Evals: grid + scan + toast that relocates ──────────────────── */

function EvalsVisual() {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [cardIdx, setCardIdx] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = window.setInterval(() => {
      setCardIdx((i) => (i + 1) % EVAL_CARDS.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  const card = EVAL_CARDS[cardIdx]!;
  const pos = EVAL_TOAST_POS[cardIdx]!;
  const cells = EVAL_CELL_LAYOUTS[cardIdx % EVAL_CELL_LAYOUTS.length]!;

  return (
    <div
      ref={ref}
      className="relative size-full overflow-hidden bg-[linear-gradient(to_right,rgba(0,0,0,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.045)_1px,transparent_1px)] bg-[size:24px_24px]"
    >
      <AnimatePresence mode="popLayout">
        {cells.map((p, i) => {
          const agent = getTrooper(p.handle);
          return (
            <motion.span
              key={`${cardIdx}-${i}-${p.handle}`}
              aria-hidden
              className="absolute flex size-9 items-center justify-center overflow-visible rounded-lg bg-white shadow-sm sm:size-10"
              style={{ top: p.t, left: p.l }}
              initial={reduce ? false : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
            >
              {agent ? <TrooperAvatar trooper={agent} size={28} live={false} /> : null}
            </motion.span>
          );
        })}
      </AnimatePresence>

      {inView && !reduce ? (
        <motion.div
          aria-hidden
          className="absolute top-0 bottom-0 w-px"
          style={{
            background:
              'linear-gradient(to bottom, transparent, #9810fa 18%, #9810fa 82%, transparent)',
            boxShadow: '0 0 14px 1px rgba(152,16,250,0.4)',
          }}
          animate={{ left: ['14%', '86%', '14%'] }}
          transition={{ duration: 7.5, ease: 'linear', repeat: Infinity }}
        />
      ) : (
        <div aria-hidden className="absolute top-0 bottom-0 left-[72%] w-px bg-[#9810fa]/70" />
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={cardIdx}
          className="pointer-events-none absolute z-30 max-w-[min(210px,72%)] -translate-x-1/2 rounded-xl bg-white p-3 shadow-[0_10px_30px_-14px_rgba(0,0,0,0.3)] ring-1 ring-black/5 sm:max-w-[220px] sm:p-3.5"
          style={{ top: pos.top, left: pos.left }}
          initial={reduce ? false : { opacity: 0, y: 10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-ink">
            {card.kind === 'flag' ? (
              <Flag className="size-3 text-[#fe9a00]" strokeWidth={2.25} aria-hidden />
            ) : (
              <Bell className="size-3 text-[#9810fa]" strokeWidth={2.25} aria-hidden />
            )}
            {card.title}
          </p>
          <p className="mt-1.5 text-[12px] leading-snug text-ink-muted">{card.body}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
