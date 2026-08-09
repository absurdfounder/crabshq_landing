'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Bot, MousePointer2, RefreshCw, UserCheck, Zap } from 'lucide-react';
import { DemoFavicon } from '@trooper/demo';
import PixelButton from '@/components/ui/PixelButton';

const ease = [0.22, 1, 0.36, 1] as const;

/** “for” struck through, “by” takes its place. */
function ForBy() {
  return (
    <span className="whitespace-nowrap">
      <span className="relative mr-2 inline-block text-neutral-400">
        for
        <span
          aria-hidden
          className="pointer-events-none absolute left-[-8%] right-[-8%] top-1/2 h-[3px] -translate-y-1/2 -rotate-[10deg] rounded-full bg-trooper"
        />
      </span>
      <em className="font-display italic text-trooper-700">by</em>
    </span>
  );
}

/* ─── Script: the workflow runs on the left, the terminal answers on the right ───
 * step 0  idle
 * step 1  refund request lands (POST appears)
 * step 2  evidence agent works (edge 1 draws, run log)
 * step 3  human gate (edge 2 draws, response)
 * step 4  token rotation footer
 */

function NodeCard({
  icon,
  iconBg,
  label,
  domains,
  className = '',
  active,
  done,
}: {
  icon: ReactNode;
  iconBg: string;
  label: string;
  domains?: string[];
  className?: string;
  active: boolean;
  done: boolean;
}) {
  return (
    <motion.div
      className={`absolute flex items-center gap-2.5 rounded-xl bg-white py-2 pl-2 pr-3 shadow-[0_14px_30px_-14px_rgba(28,25,23,0.4)] ${
        active ? 'ring-2 ring-trooper' : 'ring-1 ring-stone-900/10'
      } ${className}`}
      animate={{ scale: active ? 1.04 : 1, opacity: active || done ? 1 : 0.5 }}
      transition={{ duration: 0.35, ease }}
    >
      <span
        className="flex size-7 shrink-0 items-center justify-center rounded-lg text-white"
        style={{ background: iconBg }}
      >
        {icon}
      </span>
      <span className="whitespace-nowrap text-[13px] font-semibold text-stone-800">{label}</span>
      {domains && domains.length > 0 ? (
        <span className="flex items-center gap-1">
          {domains.map((d) => (
            <span
              key={d}
              className="flex size-5 items-center justify-center rounded-full bg-stone-50 ring-1 ring-stone-200"
            >
              <DemoFavicon domain={d} size={11} rounded="sm" />
            </span>
          ))}
        </span>
      ) : null}
    </motion.div>
  );
}

function EdgeLabel({
  label,
  className = '',
  passed,
}: {
  label: string;
  className?: string;
  passed: boolean;
}) {
  return (
    <span
      className={`absolute whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium shadow-sm ring-1 transition-colors duration-300 ${
        passed ? 'bg-trooper-50 text-trooper-800 ring-trooper/40' : 'bg-white text-stone-500 ring-stone-900/10'
      } ${className}`}
    >
      {label}
    </span>
  );
}

const CURSOR_POS = [
  { x: 205, y: 64 },
  { x: 205, y: 64 },
  { x: 296, y: 172 },
  { x: 318, y: 282 },
  { x: 318, y: 282 },
] as const;

/** Left half of the panel: the routine as a canvas, nodes light up as the run advances. */
function WorkflowGraph({ step }: { step: number }) {
  const reduceMotion = useReducedMotion();
  const cursor = CURSOR_POS[Math.min(step, CURSOR_POS.length - 1)];

  return (
    <div className="relative h-[330px] w-full overflow-hidden bg-white" aria-hidden>
      {/* canvas dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(28,25,23,0.07) 1px, transparent 0)',
          backgroundSize: '12px 12px',
        }}
      />
      <p className="absolute left-3.5 top-3 z-10 font-mono text-[10px] tracking-wide text-stone-400">
        workflow — refund-playbook
      </p>

      {/* fixed-size canvas centered in the half; squeezes slightly on phones */}
      <div className="absolute left-1/2 top-0 h-[330px] w-[360px] origin-top -translate-x-1/2 scale-[0.88] sm:scale-100">
      <svg viewBox="0 0 360 330" fill="none" className="absolute inset-0 h-full w-full">
        {/* resting edges */}
        <path
          d="M 100 88 L 100 130 L 196 130 L 196 156"
          stroke="#c9c4b8"
          strokeWidth="1.6"
          strokeDasharray="5 5"
        />
        <path
          d="M 196 202 L 196 244 L 268 244 L 268 270"
          stroke="#c9c4b8"
          strokeWidth="1.6"
          strokeDasharray="5 5"
        />
        {/* traversed edges draw in green */}
        <motion.path
          d="M 100 88 L 100 130 L 196 130 L 196 156"
          stroke="#4f7b38"
          strokeWidth="2"
          strokeLinecap="round"
          initial={false}
          animate={{ pathLength: step >= 2 ? 1 : 0, opacity: step >= 2 ? 1 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, ease }}
        />
        <motion.path
          d="M 196 202 L 196 244 L 268 244 L 268 270"
          stroke="#4f7b38"
          strokeWidth="2"
          strokeLinecap="round"
          initial={false}
          animate={{ pathLength: step >= 3 ? 1 : 0, opacity: step >= 3 ? 1 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, ease }}
        />
      </svg>

      <NodeCard
        icon={<Zap className="size-4" strokeWidth={2.25} />}
        iconBg="#f59e0b"
        label="Refund requested"
        domains={['stripe.com', 'gmail.com']}
        className="left-2 top-[42px]"
        active={step === 1}
        done={step > 1}
      />
      <EdgeLabel label="Over $200?" className="left-[112px] top-[118px]" passed={step >= 2} />
      <NodeCard
        icon={<Bot className="size-4" strokeWidth={2.25} />}
        iconBg="#8b5cf6"
        label="Evidence Agent"
        domains={['notion.so', 'slack.com']}
        className="left-[104px] top-[156px]"
        active={step === 2}
        done={step > 2}
      />
      <EdgeLabel label="Needs sign-off?" className="left-[184px] top-[232px]" passed={step >= 3} />
      <NodeCard
        icon={<UserCheck className="size-4" strokeWidth={2.25} />}
        iconBg="#4f7b38"
        label="Human review gate"
        className="left-[168px] top-[270px]"
        active={step >= 3}
        done={step > 3}
      />

      <motion.span
        className="absolute left-0 top-0"
        initial={false}
        animate={{ x: cursor.x, y: cursor.y }}
        transition={{ duration: reduceMotion ? 0 : 0.55, ease }}
      >
        <MousePointer2
          className="h-5 w-5 rotate-[-8deg] fill-[#e85f4a] text-[#e85f4a] drop-shadow-sm"
          strokeWidth={1.5}
        />
      </motion.span>
      </div>
    </div>
  );
}

function TerminalLine({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Right half of the panel: the same routine, published — replays the run live. */
function ApiTerminal({ step }: { step: number }) {
  const running = step >= 1 && step < 3;

  return (
    <div className="flex h-full w-full flex-col bg-stone-900" data-mock-ui>
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[11px] text-stone-400">
          loop-api — refund-playbook
        </span>
        <span
          className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 transition-colors duration-300 ${
            running
              ? 'bg-amber-400/20 text-amber-200 ring-amber-400/40'
              : 'bg-trooper/25 text-trooper-200 ring-trooper/40'
          }`}
        >
          {running ? 'Running' : 'Published'}
        </span>
      </div>

      <div className="min-h-[248px] flex-1 space-y-1 px-4 py-4 font-mono text-[12.5px] leading-relaxed">
        <p className="text-stone-500"># call it from your app or internal tools</p>

        <AnimatePresence initial={false}>
          {step >= 1 ? (
            <TerminalLine key="req">
              <p>
                <span className="text-emerald-400">POST</span>{' '}
                <span className="text-stone-100">/v1/loops/refund-playbook/run</span>
              </p>
              <p className="text-stone-500">Authorization: Bearer sk-team-····</p>
              <p className="text-stone-400">{'{ "ticket": "#4412", "amount": 240 }'}</p>
            </TerminalLine>
          ) : null}

          {step >= 2 ? (
            <TerminalLine key="run">
              <p className="pt-2 text-stone-500"># run</p>
              <p className="text-stone-300">
                <span className="text-violet-400">evidence-agent</span> pulling Stripe charge +
                email thread…
              </p>
            </TerminalLine>
          ) : null}

          {step >= 3 ? (
            <TerminalLine key="res">
              <p className="pt-2 text-stone-500"># response</p>
              <p className="text-stone-300">
                {'{ "status": '}
                <span className="text-emerald-400">"held_for_review"</span>
                {', "gate": "human" }'}
              </p>
            </TerminalLine>
          ) : null}

          {step >= 4 ? (
            <TerminalLine key="rotate">
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-[11px] text-stone-400 ring-1 ring-white/10">
                <RefreshCw className="h-3 w-3 shrink-0 text-trooper-300" aria-hidden />
                token low — switched to backup account, run continued
              </div>
            </TerminalLine>
          ) : null}
        </AnimatePresence>

        <p aria-hidden>
          <span className="inline-block h-[14px] w-[7px] animate-pulse bg-stone-500/80 align-middle" />
        </p>
      </div>
    </div>
  );
}

/**
 * Homepage band: routines become Loop APIs. The workflow replays on a canvas
 * card at the left while the published endpoint streams the same run on the
 * right. The dither ground is a rounded panel inside the page rail.
 */
export default function LoopApiSection() {
  const bandRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [play, setPlay] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const el = bandRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setPlay(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!play || reduceMotion) {
      setStep(reduceMotion ? 4 : 0);
      return;
    }

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const schedule = (fn: () => void, ms: number) => {
      timeoutId = setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
    };

    const run = () => {
      setStep(0);
      schedule(() => {
        setStep(1);
        schedule(() => {
          setStep(2);
          schedule(() => {
            setStep(3);
            schedule(() => {
              setStep(4);
              schedule(run, 3200);
            }, 1200);
          }, 1400);
        }, 1300);
      }, 700);
    };

    run();
    return () => {
      cancelled = true;
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [play, reduceMotion]);

  return (
    <section className="relative bg-canvas">
      <div className="rail border-t border-[var(--color-line)] py-12 sm:py-16">
        <motion.div
          className="mx-auto w-full max-w-2xl text-center"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          viewport={{ once: true, margin: '-40px' }}
        >
          <h2 className="h2-section mx-auto text-balance">
            AI agents built <ForBy /> your team
          </h2>
          <p className="lede mx-auto mt-3 max-w-lg">
            Understanding a task should be the only prerequisite to automating it. Turn routines
            into Loop APIs for your team or an external app —{' '}
            <strong className="font-semibold text-neutral-800">
              and connect a different account so the tokens never run out
            </strong>
            .
          </p>
        </motion.div>

        {/* Dither ground stays inside the grid: a rounded panel on the rail. */}
        <motion.div
          ref={bandRef}
          className="hero-surface mt-9 rounded-2xl border border-black/5 px-4 py-8 sm:mt-11 sm:px-8 sm:py-10"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease }}
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* One panel, two halves: workflow canvas | published endpoint. */}
          <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl shadow-[0_28px_60px_-26px_rgba(28,25,23,0.45)] ring-1 ring-stone-900/10 lg:grid lg:grid-cols-2">
            <WorkflowGraph step={step} />
            <div className="border-t border-stone-900/10 lg:border-l lg:border-t-0">
              <ApiTerminal step={step} />
            </div>
            <span
              className="absolute left-1/2 top-1/2 z-10 hidden size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-stone-500 shadow-md ring-1 ring-stone-900/10 lg:flex"
              aria-hidden
            >
              <ArrowRight className="size-4" strokeWidth={2.25} />
            </span>
          </div>
        </motion.div>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:mt-10">
          <PixelButton href="/loops" size="sm" tone="brand" icon={<ArrowRight className="h-4 w-4" />}>
            Browse Loop APIs
          </PixelButton>
          <Link href="/loops" className="group link-mono">
            <span>See the full catalog</span>
            <ArrowRight
              className="size-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
