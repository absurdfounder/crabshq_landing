'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
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

function NodeCard({
  icon,
  iconBg,
  label,
  domains,
  className = '',
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  domains?: string[];
  className?: string;
}) {
  return (
    <div
      className={`absolute flex items-center gap-2.5 rounded-xl bg-white py-2 pl-2 pr-3 shadow-[0_14px_30px_-12px_rgba(28,25,23,0.45)] ring-1 ring-stone-900/10 ${className}`}
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
    </div>
  );
}

function EdgeLabel({ label, className = '' }: { label: string; className?: string }) {
  return (
    <span
      className={`absolute whitespace-nowrap rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-stone-600 shadow-sm ring-1 ring-stone-900/10 ${className}`}
    >
      {label}
    </span>
  );
}

/** The routine as a canvas: three node cards joined by dashed elbows. */
function WorkflowGraph() {
  return (
    <motion.div
      className="relative h-[300px] w-[360px] shrink-0"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease }}
      viewport={{ once: true, margin: '-40px' }}
      aria-hidden
    >
      <svg viewBox="0 0 360 300" fill="none" className="absolute inset-0 h-full w-full">
        <path
          d="M 100 62 L 100 104 L 196 104 L 196 130"
          stroke="#8b9375"
          strokeWidth="1.6"
          strokeDasharray="5 5"
        />
        <path
          d="M 196 176 L 196 218 L 268 218 L 268 244"
          stroke="#8b9375"
          strokeWidth="1.6"
          strokeDasharray="5 5"
        />
      </svg>

      <NodeCard
        icon={<Zap className="size-4" strokeWidth={2.25} />}
        iconBg="#f59e0b"
        label="Refund requested"
        domains={['stripe.com', 'gmail.com']}
        className="left-2 top-4"
      />
      <EdgeLabel label="Over $200?" className="left-[112px] top-[92px]" />
      <NodeCard
        icon={<Bot className="size-4" strokeWidth={2.25} />}
        iconBg="#8b5cf6"
        label="Evidence Agent"
        domains={['notion.so', 'slack.com']}
        className="left-[104px] top-[130px]"
      />
      <EdgeLabel label="Needs sign-off?" className="left-[184px] top-[206px]" />
      <NodeCard
        icon={<UserCheck className="size-4" strokeWidth={2.25} />}
        iconBg="#4f7b38"
        label="Human review gate"
        className="left-[168px] top-[244px]"
      />
      <MousePointer2
        className="absolute left-[302px] top-[168px] h-5 w-5 rotate-[-8deg] fill-[#e85f4a] text-[#e85f4a] drop-shadow-sm"
        strokeWidth={1.5}
      />
    </motion.div>
  );
}

/** The same routine, published: a callable endpoint. */
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
 * Homepage band: routines become Loop APIs. Workflow canvas on the left, the
 * published endpoint on the right, on a dither ground that stays inside the
 * page rail (rail-bleed), matching the dashboard showcase band.
 */
export default function LoopApiSection() {
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

        {/* Dither stays inside the rail, like the dashboard band. */}
        <div className="hero-surface rail-bleed mt-9 border-y border-black/5 px-4 py-9 sm:mt-11 sm:px-8 sm:py-11">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-5 lg:flex-row lg:gap-7">
            <WorkflowGraph />
            <span
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-stone-500 shadow-sm ring-1 ring-stone-900/10"
              aria-hidden
            >
              <ArrowRight className="size-4 rotate-90 lg:rotate-0" strokeWidth={2.25} />
            </span>
            <ApiTerminal />
          </div>
        </div>

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
