'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, RefreshCw } from 'lucide-react';
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

/* ─── Script ───
 * step 0  idle
 * step 1  mention lands (POST appears)
 * step 2  agents hand off (run log)
 * step 3  response
 * step 4  token rotation footer
 */

/** Left half of the panel: the agent workflow canvas. */
function WorkflowCanvas() {
  return (
    <div className="relative flex h-[280px] w-full items-center justify-center overflow-hidden bg-white px-5 lg:h-auto lg:min-h-[330px]" aria-hidden>
      {/* canvas dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(28,25,23,0.07) 1px, transparent 0)',
          backgroundSize: '12px 12px',
        }}
      />
      <p className="absolute left-3.5 top-3 z-10 font-mono text-[10px] tracking-wide text-stone-400">
        workflow · agent-orchestration
      </p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/landing/agent-orchestration.svg"
        alt=""
        className="relative z-[1] mt-4 w-full max-w-[400px]"
        width={409}
        height={211}
      />
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

/** Right half of the panel: the same workflow, published — replays the run live. */
function ApiTerminal({ step }: { step: number }) {
  const running = step >= 1 && step < 3;

  return (
    <div className="flex h-full w-full flex-col bg-stone-900" data-mock-ui>
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[11px] text-stone-400">
          loop-api · agent-orchestration
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
                <span className="text-stone-100">/v1/loops/agent-orchestration/run</span>
              </p>
              <p className="text-stone-500">Authorization: Bearer sk-team-····</p>
              <p className="text-stone-400">{'{ "mention": "@acme", "sentiment": "negative" }'}</p>
            </TerminalLine>
          ) : null}

          {step >= 2 ? (
            <TerminalLine key="run">
              <p className="pt-2 text-stone-500"># run</p>
              <p className="text-stone-300">
                <span className="text-violet-400">social-agent</span> flagged mention →{' '}
                <span className="text-sky-400">support-agent</span> triaging…
              </p>
            </TerminalLine>
          ) : null}

          {step >= 3 ? (
            <TerminalLine key="res">
              <p className="pt-2 text-stone-500"># response</p>
              <p className="text-stone-300">
                {'{ "status": '}
                <span className="text-emerald-400">"handed_off"</span>
                {', "to": "support-agent" }'}
              </p>
            </TerminalLine>
          ) : null}

          {step >= 4 ? (
            <TerminalLine key="rotate">
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-[11px] text-stone-400 ring-1 ring-white/10">
                <RefreshCw className="h-3 w-3 shrink-0 text-trooper-300" aria-hidden />
                token low · switched to backup account, run continued
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
 * Homepage band: routines become Loop APIs. One split panel — the agent
 * workflow canvas on the left, the published endpoint replaying the run on
 * the right — on a dither ground that stays inside the page rail.
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
      <div className="rail border-t border-[var(--color-line)] py-12 sm:py-20">
        <motion.div
          className="mx-auto w-full max-w-2xl text-center"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          viewport={{ once: true, margin: '-40px' }}
        >
          <h2 className="h2-section mx-auto">
            AI agents built <ForBy /> your team
          </h2>
          <p className="lede mx-auto">
            Publish a loop as an API for your team or an app. Connect another account so tokens
            never run out.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-7">
            <PixelButton href="/loops" size="md" tone="dark" icon={<ArrowRight className="h-3.5 w-3.5" />}>
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
        </motion.div>

        {/* Same dither as the dashboard: rail-bleed, square to the hairlines. */}
        <motion.div
          ref={bandRef}
          className="mt-10 lg:mt-14"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease }}
          viewport={{ once: true, margin: '-50px' }}
        >
          <div className="hero-surface rail-bleed relative border-y border-black/5 px-2 py-6 sm:px-3 sm:py-8 lg:px-3 lg:py-9">
            <div className="relative overflow-hidden rounded-2xl shadow-[0_24px_56px_-28px_rgba(28,25,23,0.32)] ring-1 ring-black/5 lg:grid lg:grid-cols-2">
              <WorkflowCanvas />
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
