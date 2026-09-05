'use client';

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';
import { ChevronsRight, Lightbulb, Loader } from 'lucide-react';

import { TROOPERS } from '@/lib/troopers';
import TrooperMark from '@/components/ui/TrooperMark';

/**
 * Optimize Your Agents — Gumloop three-card band:
 * open-source cost routing, self-improve orbit, evals flag.
 */

const LEFT_PROVIDERS = [
  { name: 'OpenAI', savings: 78 },
  { name: 'Anthropic', savings: 61 },
  { name: 'Google', savings: 84 },
  { name: 'xAI', savings: 69 },
  { name: 'Space xAI', savings: 81 },
] as const;

const RIGHT_PROVIDERS = [
  { name: 'DeepSeek', savings: 89 },
  { name: 'Moonshot', savings: 83 },
  { name: 'Z.ai', savings: 87 },
  { name: 'Qwen', savings: 83 },
  { name: 'MiniMax', savings: 87 },
] as const;

const ORBIT = [
  { key: 'execute', label: 'Execute', Icon: ChevronsRight, angle: -90 },
  { key: 'reflect', label: 'Reflect', Icon: Loader, angle: 30 },
  { key: 'learn', label: 'Learn', Icon: Lightbulb, angle: 150 },
] as const;

function money(n: number) {
  return `$${n.toFixed(n < 0.1 ? 3 : 2).replace(/0+$/, '').replace(/\.$/, '')}`;
}

function wrapIndex(v: number, len: number) {
  return ((Math.round(v) % len) + len) % len;
}

export default function OptimizeAgentsSection() {
  return (
    <div className="gl-optimize flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <p className="text-sm font-medium text-ink">Optimize</p>
        <h2 className="font-funneldisplay text-3xl leading-tight font-medium tracking-tight text-ink md:text-4xl">
          Optimize your troopers
        </h2>
      </div>

      {/* Gumloop: visual wells are tall bordered panels; title/body sit below, not inside */}
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-5">
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
    <div className="flex flex-col gap-5 pb-2 md:gap-6 md:pb-0">
      <div className="relative h-[400px] overflow-hidden rounded-md border border-[var(--color-line)] bg-[#f3f3f6] md:h-[320px] xl:h-[440px]">
        {visual}
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-base font-medium text-ink">{title}</h3>
        <p className="text-base leading-normal text-ink-muted">{body}</p>
      </div>
    </div>
  );
}

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

  const schedule = useCallback(
    (ms: number) => {
      if (timer.current != null) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setTick((t) => t + 1), ms);
    },
    [],
  );

  useEffect(() => {
    if (!reduce && inView) {
      schedule(1800);
      return () => {
        if (timer.current != null) window.clearTimeout(timer.current);
      };
    }
  }, [inView, reduce, schedule]);

  useEffect(() => {
    if (tick === 0 || reduce || !inView) return;
    const leftTarget = Math.round(leftScroll.get()) + 1;
    const rightTarget = Math.round(rightScroll.get()) - 1;
    const a = animate(leftScroll, leftTarget, {
      duration: 0.94,
      ease: [0.22, 1, 0.36, 1],
    });
    const b = animate(rightScroll, rightTarget, {
      duration: 0.94,
      ease: [0.22, 1, 0.36, 1],
    });
    schedule(2600);
    return () => {
      a.stop();
      b.stop();
    };
  }, [tick, reduce, inView, leftScroll, rightScroll, schedule]);

  const left = LEFT_PROVIDERS[leftIdx] ?? LEFT_PROVIDERS[0];
  const right = RIGHT_PROVIDERS[rightIdx] ?? RIGHT_PROVIDERS[0];
  const savings = Math.round((left.savings + right.savings) / 2);
  const after = 0.42 * (1 - savings / 100);

  return (
    <div
      ref={rootRef}
      className="[container-type:size] relative isolate size-full overflow-hidden"
      role="group"
      aria-label="Flexible open-source model routing"
    >
      <ProviderColumn
        providers={LEFT_PROVIDERS}
        selected={leftIdx}
        scroll={leftScroll}
        side="left"
      />
      <ProviderColumn
        providers={RIGHT_PROVIDERS}
        selected={rightIdx}
        scroll={rightScroll}
        side="right"
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 z-40 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1.5 text-center whitespace-nowrap"
        role="status"
        aria-label={`${savings}% lower cost, from $0.42 down to ${money(after)} per task`}
      >
        <span className="font-funneldisplay text-sm font-medium text-ink-muted/80">
          Cost reduction
          <br />
          per task
        </span>
        <span className="relative z-0 inline-flex h-[1em] items-start overflow-hidden text-[clamp(27px,13cqw,58px)] leading-none font-medium tabular-nums text-ink">
          <DigitRoll value={savings} reduce={reduce} />
          <span>%</span>
        </span>
        <span className="flex items-baseline gap-1 text-xs tabular-nums">
          <span className="text-base text-ink-muted line-through">{money(0.42)}</span>
          <motion.span
            key={after}
            className="text-base font-medium tabular-nums text-ok-600"
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

function ProviderColumn({
  providers,
  selected,
  scroll,
  side,
}: {
  providers: readonly { name: string; savings: number }[];
  selected: number;
  scroll: ReturnType<typeof useMotionValue<number>>;
  side: 'left' | 'right';
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 select-none">
      {providers.map((entry, index) => (
        <ProviderChip
          key={entry.name}
          name={entry.name}
          index={index}
          total={providers.length}
          selected={index === selected}
          scroll={scroll}
          side={side}
        />
      ))}
    </div>
  );
}

function ProviderChip({
  name,
  index,
  total,
  selected,
  scroll,
  side,
}: {
  name: string;
  index: number;
  total: number;
  selected: boolean;
  scroll: ReturnType<typeof useMotionValue<number>>;
  side: 'left' | 'right';
}) {
  const [y, setY] = useState(0);

  useMotionValueEvent(scroll, 'change', (v) => {
    let d = index - v;
    while (d > total / 2) d -= total;
    while (d < -total / 2) d += total;
    setY(d * 36);
  });

  useEffect(() => {
    let d = index - scroll.get();
    while (d > total / 2) d -= total;
    while (d < -total / 2) d += total;
    setY(d * 36);
  }, [index, scroll, total]);

  return (
    <div
      className="absolute top-1/2"
      style={{
        [side]: '4%',
        transform: `translateY(calc(-50% + ${y}px))`,
        opacity: selected ? 1 : Math.max(0.25, 1 - Math.abs(y) / 90),
      }}
    >
      <span className="pointer-events-none absolute -inset-2 z-0 rounded-[16px] bg-black/[0.03] blur-sm" />
      <div
        className={`relative z-10 flex min-w-[5.5rem] items-center justify-center rounded-[12px] bg-white px-3 py-2.5 text-[11px] font-medium shadow-sm ring-1 transition-shadow ${
          selected ? 'text-ink ring-black/10' : 'text-ink-faint ring-transparent'
        }`}
      >
        {name}
      </div>
    </div>
  );
}

function DigitRoll({ value, reduce }: { value: number; reduce: boolean }) {
  const text = String(value);
  return (
    <span className="inline-flex">
      {text.split('').map((ch, i) => (
        <motion.span
          key={`${i}-${ch}`}
          className="inline-block"
          initial={reduce ? false : { y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, delay: i * 0.04 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

function SelfImproveVisual() {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.15 });
  const [phase, setPhase] = useState(0);
  const uid = useId().replace(/:/g, '');
  const arrowId = `self-improve-arrow-${uid}`;

  useEffect(() => {
    if (reduce || !inView) return;
    const id = window.setInterval(() => setPhase((p) => (p + 1) % ORBIT.length), 1600);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  const r = 78;
  const cx = 120;
  const cy = 104;

  return (
    <div ref={ref} className="relative flex size-full items-center justify-center">
      <svg viewBox="0 0 240 208" className="absolute inset-0 size-full" aria-hidden>
        <defs>
          <marker id={arrowId} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#a3a3a3" />
          </marker>
        </defs>
        {ORBIT.map((step, i) => {
          const next = ORBIT[(i + 1) % ORBIT.length]!;
          const a0 = (step.angle * Math.PI) / 180;
          const a1 = (next.angle * Math.PI) / 180;
          let end = next.angle;
          if (end < step.angle) end += 360;
          const large = end - step.angle > 180 ? 1 : 0;
          const x0 = cx + r * Math.cos(a0);
          const y0 = cy + r * Math.sin(a0);
          const x1 = cx + r * Math.cos(a1);
          const y1 = cy + r * Math.sin(a1);
          const active = phase === i;
          return (
            <path
              key={step.key}
              d={`M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1}`}
              fill="none"
              stroke={active ? TROOPERS[3].accent : '#d4d4d4'}
              strokeWidth={active ? 1.75 : 1}
              markerEnd={`url(#${arrowId})`}
              className={inView && !reduce ? 'gl-orbit-spin origin-center' : undefined}
              style={{
                transformOrigin: `${cx}px ${cy}px`,
                animationDuration: '18s',
                animationPlayState: 'paused',
              }}
            />
          );
        })}
      </svg>

      <div
        className="relative z-[1] flex size-14 items-center justify-center rounded-full shadow-md ring-1 ring-black/10"
        style={{ backgroundColor: TROOPERS[3].accent }}
      >
        <TrooperMark trooper={TROOPERS[3]} size={28} />
      </div>

      {ORBIT.map((step, i) => {
        const a = (step.angle * Math.PI) / 180;
        const x = 50 + 38 * Math.cos(a);
        const y = 50 + 38 * Math.sin(a);
        const active = phase === i;
        const Icon = step.Icon;
        return (
          <div
            key={step.key}
            className={`absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 ${
              active ? 'text-ink' : 'text-ink-faint'
            }`}
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <Icon
              className={`size-3.5 ${active && step.key === 'reflect' ? 'animate-spin' : ''}`}
              strokeWidth={1.75}
            />
            <span className="text-[10px] font-medium">{step.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function EvalsVisual() {
  return (
    <div className="relative flex size-full items-start justify-end bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:16px_16px] p-5 md:p-6">
      <motion.div
        className="max-w-[220px] rounded-xl bg-white p-3.5 shadow-md ring-1 ring-black/5"
        initial={{ opacity: 0, y: 8, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-faint">Flag</p>
        <p className="mt-1 text-[12px] leading-snug text-ink-muted">
          Voice &amp; tone passes fell to{' '}
          <span className="font-semibold" style={{ color: TROOPERS[3].accent }}>
            38 of 46 tasks
          </span>{' '}
          after the latest prompt update.
        </p>
      </motion.div>
    </div>
  );
}
