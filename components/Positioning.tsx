'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PixelMissionTag } from '@/components/PixelAtmosphere';

/* ─── Problems Solved ─── */
const problems = [
  {
    without: "You have 20 AI chat tabs open and can't track which one does what. Close the browser and you lose everything.",
    with: "Tasks are ticket-based, conversations are threaded, sessions persist across reboots. Your agents never lose context.",
  },
  {
    without: "You manually gather context from several places to remind your AI what you're actually doing.",
    with: "Context flows from the task up through the project and company goals — your agent always knows what to do and why.",
  },
  {
    without: "Folders of agent configs are disorganized and you're re-inventing task management, communication, and coordination between agents.",
    with: "Trooper gives you org charts, ticketing, delegation, and governance out of the box — so you run a company, not a pile of scripts.",
  },
  {
    without: "Runaway loops waste hundreds of dollars of tokens and max your quota before you even know what happened.",
    with: "Cost tracking surfaces token budgets and throttles agents when they're out. You set the limits, the system enforces them.",
  },
];

const pad = (n: number) => String(n + 1).padStart(2, '0');

const ProblemsSolved = () => (
  <section className="bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="mb-10">
        <PixelMissionTag index="04" label="Situation report" className="mb-4" />
        <h2 className="font-funneldisplay text-2xl sm:text-3xl md:text-4xl tracking-tight text-slate-900">
          Before and after Trooper.
        </h2>
      </div>

      {/* Bordered table: each row shares hairlines, [number] [without] [→] [with] */}
      <div className="border border-slate-200 bg-white">
        {problems.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            viewport={{ once: true }}
            className={[
              'grid grid-cols-1 md:grid-cols-[64px_1fr_40px_1fr] items-stretch',
              i !== problems.length - 1 ? 'border-b border-slate-200' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <div className="hidden md:flex items-start justify-center pt-6 border-r border-slate-200 bg-slate-50/50">
              <span className="font-mono text-2xl sm:text-3xl text-slate-300">{pad(i)}</span>
            </div>

            <div className="p-5 md:p-6 md:border-r md:border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="md:hidden font-mono text-base text-slate-300">{pad(i)}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                  Hostile terrain
                </span>
              </div>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{p.without}</p>
            </div>

            <div className="hidden md:flex items-center justify-center border-r border-slate-200 bg-white">
              <ArrowRight className="w-4 h-4 text-slate-300" />
            </div>

            <div className="p-5 md:p-6 bg-white border-t border-slate-200 md:border-t-0">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-trooper">
                Trooper ops
              </span>
              <p className="text-sm text-slate-700 mt-2 leading-relaxed">{p.with}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Under the Hood ─── */
const specials = [
  {
    title: 'Persistent agent state.',
    detail: 'Agents resume the same task context across sessions instead of restarting from scratch. Close your laptop — they pick up where they left off.',
  },
  {
    title: 'Runtime skill injection.',
    detail: 'Agents learn new workflows and project context at runtime through 3,000+ OpenClaw skills, without retraining.',
  },
  {
    title: 'Governance with rollback.',
    detail: 'Approval gates are enforced, config changes are revisioned, and bad changes can be rolled back safely. You stay in control.',
  },
  {
    title: 'Goal-aware execution.',
    detail: 'Tasks carry full goal ancestry so agents consistently see the "why," not just a title. Every action traces back to the mission.',
  },
  {
    title: 'Atomic task checkout.',
    detail: 'Only one agent can own a task at a time. No double-work, no conflicts, no wasted tokens.',
  },
  {
    title: 'True multi-org isolation.',
    detail: 'Every workspace is fully isolated. One deployment can run many organizations with separate data, agents, and audit trails.',
  },
];

const CAPABILITY_TAGS = [
  'Browser automation',
  'Terminal & code',
  'Files & git',
  'Web search',
  'Memory',
  'Delegation',
  'Cron jobs',
  '3,000+ skills',
];

const UnderTheHood = () => (
  <section className="bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="mb-10">
        <PixelMissionTag index="04" label="Systems brief" className="mb-4" />
        <h2 className="font-funneldisplay text-2xl sm:text-3xl md:text-4xl tracking-tight text-slate-900">
          Built for command, not chat.
        </h2>
        <p className="text-slate-500 text-sm sm:text-base mt-3 max-w-xl">
          Trooper handles orchestration the way an ops team expects — persistent state, traced decisions, enforced limits.
        </p>
      </div>

      {/* Specials grid — shared hairlines, numbered cells */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-slate-200 bg-white">
        {specials.map((s, i) => {
          // Compute borders based on responsive breakpoints
          const total = specials.length;
          // Mobile: every cell except last has border-b
          // sm (2-col): cells with index < total-2 have border-b; even-index cells have border-r
          // lg (3-col): cells with index < total-3 have border-b; index%3 !== 2 cells have border-r
          const isLastMobile = i === total - 1;
          const isSmLastRow = i >= total - 2;
          const isSmRightCol = i % 2 === 1;
          const isLgLastRow = i >= total - 3;
          const isLgRightCol = i % 3 === 2;

          const cls = [
            !isLastMobile ? 'border-b border-slate-200' : '',
            isSmLastRow ? 'sm:border-b-0' : 'sm:border-b',
            !isSmRightCol ? 'sm:border-r sm:border-slate-200' : 'sm:border-r-0',
            isLgLastRow ? 'lg:border-b-0' : 'lg:border-b',
            !isLgRightCol ? 'lg:border-r lg:border-slate-200' : 'lg:border-r-0',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              viewport={{ once: true }}
              className={`relative bg-white p-6 ${cls}`}
            >
              <span className="absolute top-4 right-4 font-mono text-2xl sm:text-3xl text-slate-200 leading-none">
                {pad(i)}
              </span>
              <h3 className="text-sm font-semibold text-slate-900 pr-10">{s.title}</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">{s.detail}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-10 pt-8 border-t border-slate-200">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 mb-3">
          Authorized capabilities
        </p>
        <div className="flex flex-wrap gap-2">
          {CAPABILITY_TAGS.map((tag) => (
            <span
              key={tag}
              className="army-ops-tag text-[11px] text-trooper-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default function Positioning() {
  return (
    <>
      <ProblemsSolved />
      <UnderTheHood />
    </>
  );
}
