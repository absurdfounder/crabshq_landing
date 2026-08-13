'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, GitBranch, RefreshCw } from 'lucide-react';
import { MermaidFlowDiagram } from '@/components/loops/MermaidFlowDiagram';
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
 * step 1  refund request (POST)
 * step 2  evidence agent
 * step 3  human gate + response
 * step 4  token rotation
 */

const LOOP_NODE_IDS = ['n1', 'n2', 'n3', 'n4', 'n5', 'n6'] as const;

const REFUND_MERMAID = `flowchart TD
  n1(["Refund requested"])
  n2{"Amount over $200?"}
  n3["Collect evidence"]
  n4["Apply refund SOP"]
  n5["Human review gate"]
  n6(["Issue refund"])
  n1 --> n2
  n2 -->|yes| n3
  n3 --> n4
  n4 --> n5
  n5 --> n6`;

const WORKFLOW_MERMAID_CSS = `
.loop-api-mermaid .node { transition: opacity 280ms ease; }
.loop-api-mermaid .node[data-state="idle"] { opacity: 0.38; }
.loop-api-mermaid .node[data-state="done"] { opacity: 1; }
.loop-api-mermaid .node[data-state="running"] { opacity: 1; }
.loop-api-mermaid .node[data-state="done"] rect,
.loop-api-mermaid .node[data-state="done"] polygon,
.loop-api-mermaid .node[data-state="done"] path,
.loop-api-mermaid .node[data-state="done"] circle {
  fill: #f0f5e6 !important;
  stroke: #3f6b00 !important;
  stroke-width: 1.75px !important;
}
.loop-api-mermaid .node[data-state="running"] rect,
.loop-api-mermaid .node[data-state="running"] polygon,
.loop-api-mermaid .node[data-state="running"] path,
.loop-api-mermaid .node[data-state="running"] circle {
  fill: #eef6dc !important;
  stroke: #3f6b00 !important;
  stroke-width: 2.5px !important;
}
.loop-api-mermaid .node label,
.loop-api-mermaid .node .label,
.loop-api-mermaid .node span {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
  font-size: 12px !important;
}
.loop-api-mermaid .edgePath path {
  stroke: #a8a29e !important;
  stroke-width: 1.5px !important;
}
.loop-api-mermaid .edgeLabel {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
  font-size: 11px !important;
  color: #57534e !important;
}
.loop-api-mermaid .marker {
  fill: #a8a29e !important;
  stroke: #a8a29e !important;
}
`;

/** Terminal step → how far the playbook has walked. */
function activeNodeCount(step: number) {
  if (step <= 0) return 0;
  if (step === 1) return 1;
  if (step === 2) return 3;
  if (step === 3) return 5;
  return LOOP_NODE_IDS.length;
}

/** Left half: Trooper refund playbook, same mermaid editor as the product. */
function WorkflowCanvas({ step }: { step: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [svgReady, setSvgReady] = useState(0);
  const handleRender = useCallback(() => setSvgReady((n) => n + 1), []);
  const count = activeNodeCount(step);

  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;

    const activeIds = LOOP_NODE_IDS.slice(0, count);
    const runningId =
      activeIds.length > 0 && activeIds.length < LOOP_NODE_IDS.length
        ? activeIds[activeIds.length - 1]
        : null;
    const done = new Set<string>(runningId ? activeIds.slice(0, -1) : activeIds);

    root.querySelectorAll<SVGGElement>('g.node').forEach((node) => {
      const id = node.id.match(/^flowchart-([^-]+)-/)?.[1];
      if (!id) return;
      if (runningId && id === runningId) node.dataset.state = 'running';
      else if (done.has(id)) node.dataset.state = 'done';
      else node.dataset.state = 'idle';
    });
  }, [count, svgReady]);

  return (
    <div className="flex h-[280px] w-full flex-col bg-[#FAFAF9] lg:h-auto lg:min-h-[330px]" aria-hidden>
      <style dangerouslySetInnerHTML={{ __html: WORKFLOW_MERMAID_CSS }} />
      <div className="flex shrink-0 items-center gap-2 border-b border-[#E7E5E4] bg-[#FAFAF9] px-3 py-2.5">
        <GitBranch size={13} className="text-neutral-400" strokeWidth={2} />
        <span className="text-[12px] font-semibold text-neutral-800">Refund playbook</span>
        <span className="ml-auto font-mono text-[10px] tabular-nums text-neutral-400">
          {count}/{LOOP_NODE_IDS.length} steps
        </span>
      </div>
      <div
        ref={wrapRef}
        className="loop-api-mermaid flex min-h-0 flex-1 items-center justify-center overflow-auto px-2 py-3"
      >
        <MermaidFlowDiagram
          source={REFUND_MERMAID}
          className="min-h-0 w-full [&_svg]:max-h-[260px]"
          onRender={handleRender}
        />
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
          loop-api · refund-playbook
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
              <WorkflowCanvas step={step} />
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
