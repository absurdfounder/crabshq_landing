'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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
  {
    without: "You have recurring jobs (customer support, social, reports) and have to remember to manually kick them off.",
    with: "Agents handle regular work on a schedule. They wake up, do the job, report back. You supervise.",
  },
  {
    without: "You have an idea, you have to fire up Claude Code, keep a tab open, and babysit it.",
    with: "Add a task in Trooper. Your AI employee works on it until it's done. You review their work when you're ready.",
  },
];

const pad = (n: number) => String(n + 1).padStart(2, '0');

const ProblemsSolved = () => (
  <section className="bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="mb-10">
        <h2 className="font-funneldisplay text-2xl sm:text-3xl md:text-4xl tracking-tight text-slate-900">
          What changes with Trooper.
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
                  Without
                </span>
              </div>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{p.without}</p>
            </div>

            <div className="hidden md:flex items-center justify-center border-r border-slate-200 bg-white">
              <ArrowRight className="w-4 h-4 text-slate-300" />
            </div>

            <div className="p-5 md:p-6 bg-white border-t border-slate-200 md:border-t-0">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-600">
                With Trooper
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

const capabilities = [
  { icon: '🌐', label: 'Browser Automation', detail: 'Navigate, click, type, scroll — full browser control' },
  { icon: '🔍', label: 'Web Search & Scraping', detail: 'Search the web and extract structured data from any page' },
  { icon: '💻', label: 'Terminal & Processes', detail: 'Run shell commands, manage processes, execute scripts' },
  { icon: '📁', label: 'File Operations', detail: 'Read, write, patch, and search across your entire filesystem' },
  { icon: '⚡', label: 'Code Execution', detail: 'Run code in any language — Python, Node.js, Bash, and more' },
  { icon: '👁️', label: 'Vision & Image Analysis', detail: 'Agents can see — analyze screenshots, images, and visual data' },
  { icon: '🎨', label: 'Image Generation', detail: 'Create images, diagrams, and visual assets on demand' },
  { icon: '🔊', label: 'Text-to-Speech', detail: 'Generate natural-sounding speech from any text' },
  { icon: '🧠', label: 'Mixture of Agents', detail: 'Multiple AI models collaborate on the same task for better results' },
  { icon: '👥', label: 'Task Delegation', detail: 'Agents delegate sub-tasks to other agents autonomously' },
  { icon: '⏰', label: 'Cron Jobs', detail: 'Schedule recurring autonomous work — reports, monitoring, updates' },
  { icon: '💾', label: 'Persistent Memory', detail: 'Agents remember everything across sessions — preferences, context, decisions' },
  { icon: '🔎', label: 'Session Search', detail: 'Search and reference any past conversation or decision' },
  { icon: '📋', label: 'Task Planning', detail: 'Agents break complex work into structured, trackable sub-tasks' },
  { icon: '🧪', label: 'RL Training', detail: 'Agents learn and improve through reinforcement learning loops' },
  { icon: '🏠', label: 'Home Assistant', detail: 'Control smart home devices — lights, locks, thermostats, and more' },
];

const UnderTheHood = () => (
  <section className="bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="mb-10">
        <h2 className="font-funneldisplay text-2xl sm:text-3xl md:text-4xl tracking-tight text-slate-900">
          Why Trooper is different.
        </h2>
        <p className="text-slate-500 text-sm sm:text-base mt-3 max-w-xl">
          Trooper handles the hard orchestration details correctly.
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

      {/* Agent capabilities */}
      <div className="mt-16">
        <div className="mb-8">
          <h3 className="font-funneldisplay text-xl sm:text-2xl md:text-3xl tracking-tight text-slate-900">
            What your agents can do.
          </h3>
          <p className="text-slate-500 text-sm sm:text-base mt-3 max-w-lg">
            Every agent has access to the full toolset. Not plugins you install — native capabilities
            that work out of the box.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 border border-slate-200 bg-white">
          {capabilities.map((c, i) => {
            const total = capabilities.length;
            // Mobile 2-col, sm 3-col, lg 4-col
            const mIsLastRow = i >= total - (total % 2 === 0 ? 2 : 1);
            const mIsRightCol = i % 2 === 1;
            const sIsLastRow = i >= total - (total % 3 === 0 ? 3 : total % 3);
            const sIsRightCol = i % 3 === 2;
            const lIsLastRow = i >= total - (total % 4 === 0 ? 4 : total % 4);
            const lIsRightCol = i % 4 === 3;

            const cls = [
              !mIsLastRow ? 'border-b border-slate-200' : '',
              !mIsRightCol ? 'border-r border-slate-200' : '',
              sIsLastRow ? 'sm:border-b-0' : 'sm:border-b',
              sIsRightCol ? 'sm:border-r-0' : 'sm:border-r sm:border-slate-200',
              lIsLastRow ? 'lg:border-b-0' : 'lg:border-b',
              lIsRightCol ? 'lg:border-r-0' : 'lg:border-r lg:border-slate-200',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.025 }}
                viewport={{ once: true }}
                className={`bg-white p-4 ${cls}`}
              >
                <span className="text-lg">{c.icon}</span>
                <h4 className="text-[13px] font-semibold text-slate-900 mt-2">{c.label}</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{c.detail}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

/* ─── What Trooper is not ─── */
const diffs = [
  {
    title: 'Not a chatbot.',
    detail: 'Agents have jobs, not chat windows. They write code, send emails, manage repos, and ship real work.',
  },
  {
    title: 'Not an agent framework.',
    detail: "We don't tell you how to build agents. We tell you how to run a company made of them.",
  },
  {
    title: 'Not a workflow builder.',
    detail: 'No drag-and-drop pipelines. Trooper models companies — with org charts, goals, budgets, and governance.',
  },
  {
    title: 'Not a prompt manager.',
    detail: 'Agents bring their own models and runtimes. Trooper manages the organization they work in.',
  },
  {
    title: 'Not a single-agent toy.',
    detail:
      "This is for teams. Hierarchies. Companies. If you have one agent, you might not need this. If you have twenty — you definitely do.",
  },
];

const Differentiation = () => (
  <section className="bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="mb-10">
        <h2 className="font-funneldisplay text-2xl sm:text-3xl md:text-4xl tracking-tight text-slate-900">
          What Trooper is not.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 border border-slate-200 bg-white">
        {diffs.map((d, i) => {
          const total = diffs.length;
          const isLastMobile = i === total - 1;
          const isLoneInLastRow = i === total - 1 && total % 2 === 1;
          const lastRowStart = Math.floor((total - 1) / 2) * 2;
          const isLastRowDesktop = i >= lastRowStart;
          const isLeftCol = i % 2 === 0;
          const dropMdBorderR = !isLeftCol || isLoneInLastRow;

          const cls = [
            !isLastMobile ? 'border-b border-slate-200' : '',
            isLastRowDesktop ? 'md:border-b-0' : 'md:border-b',
            dropMdBorderR ? 'md:border-r-0' : 'md:border-r md:border-slate-200',
            isLoneInLastRow ? 'md:col-span-2' : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <div key={i} className={`relative bg-white p-6 md:p-8 ${cls}`}>
              <span className="absolute top-4 right-4 font-mono text-2xl sm:text-3xl text-slate-200 leading-none">
                {pad(i)}
              </span>
              <h3 className="text-base font-semibold text-slate-900 pr-10">{d.title}</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">{d.detail}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

/* ─── Export all three ─── */
export default function Positioning() {
  return (
    <>
      <ProblemsSolved />
      <UnderTheHood />
      <Differentiation />
    </>
  );
}
