'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MousePointer2, RefreshCw } from 'lucide-react';
import { DemoFavicon } from '@trooper/demo';
import PixelButton from '@/components/ui/PixelButton';

const ease = [0.22, 1, 0.36, 1] as const;

/** “for” struck through, “by” takes its place — the Gumloop headline device. */
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

function NodeChip({
  label,
  domains,
  className = '',
}: {
  label: string;
  domains: string[];
  className?: string;
}) {
  return (
    <div
      className={`absolute flex items-center gap-2 rounded-full bg-white py-1.5 pl-3 pr-2 shadow-[0_10px_24px_-14px_rgba(28,25,23,0.35)] ring-1 ring-stone-200/90 ${className}`}
    >
      <span className="text-[12.5px] font-semibold text-stone-800">{label}</span>
      <span className="flex items-center gap-1">
        {domains.map((d) => (
          <span
            key={d}
            className="flex size-5 items-center justify-center rounded-full bg-stone-50 ring-1 ring-stone-200/70"
          >
            <DemoFavicon domain={d} size={11} rounded="sm" />
          </span>
        ))}
      </span>
    </div>
  );
}

function EdgeLabel({ label, className = '' }: { label: string; className?: string }) {
  return (
    <span
      className={`absolute rounded-full bg-white px-2.5 py-1 text-[10.5px] font-medium text-stone-500 shadow-sm ring-1 ring-stone-200/80 ${className}`}
    >
      {label}
    </span>
  );
}

/** Gumloop-style hand-off graph: agent chips joined by dashed elbows. */
function WorkflowGraph() {
  return (
    <motion.div
      className="relative h-[300px] w-full max-w-[26rem]"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease }}
      viewport={{ once: true, margin: '-40px' }}
      aria-hidden
    >
      <svg
        viewBox="0 0 416 300"
        fill="none"
        className="absolute inset-0 h-full w-full text-stone-300"
      >
        {/* trigger → decision → agent, orthogonal dashed elbows like the product canvas */}
        <path
          d="M 208 44 L 208 96 L 96 96 L 96 148"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="5 5"
        />
        <path
          d="M 208 44 L 208 130 L 300 130 L 300 220"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="5 5"
        />
        <path
          d="M 96 180 L 96 236 L 236 236"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="5 5"
        />
      </svg>

      <NodeChip
        label="Refund requested"
        domains={['stripe.com', 'gmail.com']}
        className="left-1/2 top-4 -translate-x-1/2"
      />
      <EdgeLabel label="Over $200?" className="left-[52px] top-[84px]" />
      <NodeChip
        label="Evidence Agent"
        domains={['notion.so', 'slack.com']}
        className="left-2 top-[148px]"
      />
      <EdgeLabel label="Needs human?" className="left-[236px] top-[118px]" />
      <NodeChip
        label="Review gate"
        domains={['trooper.so']}
        className="left-[224px] top-[208px]"
      />
      <MousePointer2
        className="absolute left-[168px] top-[178px] h-5 w-5 rotate-[-8deg] fill-[#e85f4a] text-[#e85f4a]"
        strokeWidth={1.5}
      />
    </motion.div>
  );
}

/** Dark terminal: the same workflow, published and callable as an API. */
function ApiTerminal() {
  return (
    <motion.div
      className="w-full max-w-[27rem] overflow-hidden rounded-2xl bg-stone-900 shadow-[0_28px_60px_-28px_rgba(28,25,23,0.55)] ring-1 ring-black/20"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.1, ease }}
      viewport={{ once: true, margin: '-40px' }}
      data-mock-ui
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[11px] text-stone-400">
          loop-api — refund-playbook
        </span>
        <span className="ml-auto rounded-full bg-trooper/25 px-2 py-0.5 text-[10px] font-semibold text-trooper-200 ring-1 ring-trooper/40">
          Published
        </span>
      </div>

      <div className="space-y-1 px-4 py-4 font-mono text-[12.5px] leading-relaxed">
        <p className="text-stone-500"># call it from your app or internal tools</p>
        <p>
          <span className="text-emerald-400">POST</span>{' '}
          <span className="text-stone-100">/v1/loops/refund-playbook/run</span>
        </p>
        <p className="text-stone-500">Authorization: Bearer sk-team-····</p>
        <p className="text-stone-400">{'{ "ticket": "#4412", "amount": 240 }'}</p>

        <p className="pt-2 text-stone-500"># response</p>
        <p className="text-stone-300">
          {'{ "status": '}
          <span className="text-emerald-400">"held_for_review"</span>
          {', "gate": "human" }'}
        </p>

        <div className="mt-3 flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-[11px] text-stone-400 ring-1 ring-white/10">
          <RefreshCw className="h-3 w-3 shrink-0 text-trooper-300" aria-hidden />
          token low — switched to backup account, run continued
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Homepage band: routines and workflows become Loop APIs — workflow canvas on
 * the left, the published endpoint on the right, on the hero dither ground.
 */
export default function LoopApiSection() {
  return (
    <section className="relative bg-canvas">
      <div className="hero-surface border-t border-black/5">
        <div className="rail px-4 py-14 sm:px-6 sm:py-16">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
            viewport={{ once: true, margin: '-40px' }}
          >
            <h2 className="h2-section mx-auto">
              AI agents built <ForBy /> your team
            </h2>
            <p className="lede mx-auto mt-3">
              Understanding a task should be the only prerequisite to automating it. Turn routines
              into Loop APIs for your team or an external app —{' '}
              <strong className="font-semibold text-neutral-800">
                and connect a different account so the tokens never run out
              </strong>
              .
            </p>
          </motion.div>

          <div className="mt-10 grid items-center justify-items-center gap-8 lg:grid-cols-2 lg:gap-10">
            <WorkflowGraph />
            <ApiTerminal />
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
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
      </div>
    </section>
  );
}
