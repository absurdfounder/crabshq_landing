'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, KeyRound, Webhook } from 'lucide-react';
import PixelButton from '@/components/ui/PixelButton';

const ease = [0.22, 1, 0.36, 1] as const;

/** Diagonal slash through a word — Gumloop-style “for / by”. */
function Slashed({ children }: { children: string }) {
  return (
    <span className="relative mx-1.5 inline-block px-0.5 font-display italic text-trooper-700 sm:mx-2">
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute left-[-6%] right-[-6%] top-1/2 h-[2.5px] -translate-y-1/2 -rotate-[14deg] rounded-full bg-neutral-800/85"
      />
    </span>
  );
}

const AGENTS = [
  {
    title: 'Refund playbook',
    blurb: 'Triage, evidence, human gate — callable from support or your billing app.',
    team: 'Support',
    builders: 'Jordan, Leo',
    href: '/loops',
    surface: 'Internal API',
  },
  {
    title: 'Weekly digest',
    blurb: 'Changelog in, newsletter out. Expose a schedule endpoint for marketing tools.',
    team: 'Growth',
    builders: 'Aria, Ren',
    href: '/loops',
    surface: 'External webhook',
  },
  {
    title: 'PR review loop',
    blurb: 'Diffs, CI, and merge checks as a loop your eng tools can kick off.',
    team: 'Engineering',
    builders: 'Codex, Claude',
    href: '/loops',
    surface: 'Team endpoint',
  },
  {
    title: 'CRM follow-up',
    blurb: 'Quiet leads get a nudge on the right channel — LinkedIn, mail, or WhatsApp.',
    team: 'Sales',
    builders: 'Aria, Jordan',
    href: '/features/inbox',
    surface: 'Internal API',
  },
] as const;

function AgentCard({
  agent,
  index,
}: {
  agent: (typeof AGENTS)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index, 3) * 0.08, ease }}
      viewport={{ once: true, margin: '-40px' }}
    >
      <Link
        href={agent.href}
        className="group flex h-full flex-col rounded-2xl bg-white p-5 shadow-[0_18px_40px_-24px_rgba(28,25,23,0.28)] ring-1 ring-stone-200/80 transition-colors hover:bg-stone-50 sm:p-6"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-400">
            {agent.team}
          </span>
          <span className="rounded-full bg-trooper-50 px-2.5 py-1 text-[11px] font-semibold text-trooper-800">
            {agent.surface}
          </span>
        </div>
        <h3 className="mt-4 font-display text-xl tracking-tight text-stone-900 sm:text-2xl">
          {agent.title}
        </h3>
        <p className="mt-2 flex-1 text-[14px] leading-relaxed text-stone-600">{agent.blurb}</p>
        <div className="mt-5 flex items-center justify-between border-t border-stone-100 pt-4 text-[12px] text-stone-500">
          <span>Built by {agent.builders}</span>
          <span className="inline-flex items-center gap-1 font-medium text-trooper-800 opacity-0 transition-opacity group-hover:opacity-100">
            Open <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function LoopApiPanel() {
  return (
    <motion.div
      className="overflow-hidden rounded-2xl bg-stone-900 text-stone-100 shadow-[0_28px_60px_-28px_rgba(28,25,23,0.55)]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.12, ease }}
      viewport={{ once: true, margin: '-40px' }}
      data-mock-ui
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[11px] text-stone-400">loop-api · refund-playbook</span>
      </div>
      <div className="grid gap-0 lg:grid-cols-2">
        <div className="border-b border-white/10 p-5 lg:border-b-0 lg:border-r">
          <div className="mb-3 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wide text-stone-400">
            <Webhook className="h-3.5 w-3.5" />
            Expose as Loop API
          </div>
          <div className="space-y-2.5 font-mono text-[12.5px] leading-relaxed">
            <p>
              <span className="text-emerald-400">POST</span>{' '}
              <span className="text-stone-200">/v1/loops/refund-playbook/run</span>
            </p>
            <p className="text-stone-500">Authorization: Bearer ···</p>
            <p className="text-stone-500">{"{ \"ticket\": \"#4412\", \"amount\": 240 }"}</p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-lg bg-white/10 px-2.5 py-1 text-[11px] font-medium text-stone-200">
              Team internal
            </span>
            <span className="rounded-lg bg-trooper/30 px-2.5 py-1 text-[11px] font-medium text-emerald-100 ring-1 ring-trooper/40">
              External app
            </span>
          </div>
        </div>
        <div className="bg-stone-950/50 p-5">
          <div className="mb-3 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wide text-stone-400">
            <KeyRound className="h-3.5 w-3.5" />
            Keys that don’t stall
          </div>
          <ul className="space-y-3 text-[13px] leading-relaxed text-stone-300">
            <li className="flex gap-2.5">
              <Code2 className="mt-0.5 h-4 w-4 shrink-0 text-trooper" />
              Routine → workflow → versioned Loop API your apps can call.
            </li>
            <li className="flex gap-2.5">
              <KeyRound className="mt-0.5 h-4 w-4 shrink-0 text-trooper" />
              Connect another provider account when one runs dry — tokens never have to run out.
            </li>
          </ul>
          <div className="mt-5 rounded-xl bg-white/5 px-3.5 py-3 font-mono text-[11px] text-stone-400 ring-1 ring-white/10">
            <span className="text-emerald-400">ok</span> swapped Anthropic → OpenAI seat · run continued
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Gumloop-inspired homepage band: teams turn routines into Loop APIs —
 * for internal tools or external apps — with BYOA so tokens stay available.
 */
export default function LoopApiSection() {
  return (
    <div>
      <motion.div
        className="mx-auto max-w-3xl text-center"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
        viewport={{ once: true, margin: '-40px' }}
      >
        <h2 className="h2-section mx-auto">
          AI agents built
          <br />
          <Slashed>for</Slashed>
          <Slashed>by</Slashed>
          your team
        </h2>
        <p className="lede mx-auto mt-4 max-w-2xl">
          Understanding a task should be the only prerequisite to automating it. Turn routines into
          Loop APIs for team internals or an external app — and{' '}
          <strong className="font-semibold text-stone-800">
            connect to a different account so the tokens never run out
          </strong>
          .
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PixelButton href="/loops" size="lg" tone="brand" icon={<ArrowRight className="h-4 w-4" />}>
            Browse Loop APIs
          </PixelButton>
          <PixelButton
            href="https://cal.com/trooper/setup-call"
            external
            size="lg"
            variant="outline"
            tone="dark"
          >
            Talk to founder
          </PixelButton>
        </div>
      </motion.div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:gap-5">
        {AGENTS.map((agent, i) => (
          <AgentCard key={agent.title} agent={agent} index={i} />
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-4xl sm:mt-12">
        <LoopApiPanel />
      </div>
    </div>
  );
}
