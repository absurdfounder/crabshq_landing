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
    with: "Crabs HQ gives you org charts, ticketing, delegation, and governance out of the box — so you run a company, not a pile of scripts.",
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
    with: "Add a task in Crabs HQ. Your AI employee works on it until it's done. You review their work when you're ready.",
  },
];

const ProblemsSolved = () => (
  <section className="bg-white">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <hr className="border-slate-200 mb-12" />
      <div className="mb-10">
        <span className="text-[11px] font-mono font-bold uppercase tracking-[0.15em] text-red-600">Problems Solved</span>
        <h2 className="font-funneldisplay text-2xl sm:text-3xl md:text-4xl tracking-tight text-slate-900 mt-3">
          What changes with Crabs HQ.
        </h2>
      </div>

      <div className="space-y-6">
        {problems.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6 items-start"
          >
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.12em] text-slate-400">Without</span>
              <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">{p.without}</p>
            </div>

            <div className="hidden md:flex items-center justify-center pt-6">
              <ArrowRight className="w-4 h-4 text-slate-300" />
            </div>

            <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.12em] text-emerald-600">With Crabs HQ</span>
              <p className="text-sm text-slate-700 mt-1.5 leading-relaxed">{p.with}</p>
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <hr className="border-slate-200 mb-12" />
      <div className="mb-10">
        <span className="text-[11px] font-mono font-bold uppercase tracking-[0.15em] text-red-600">Under the Hood</span>
        <h2 className="font-funneldisplay text-2xl sm:text-3xl md:text-4xl tracking-tight text-slate-900 mt-3">
          Why Crabs HQ is different.
        </h2>
        <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-xl">
          Crabs HQ handles the hard orchestration details correctly.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {specials.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg border border-slate-200 p-5"
          >
            <h3 className="text-sm font-semibold text-slate-900">{s.title}</h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">{s.detail}</p>
          </motion.div>
        ))}
      </div>

      {/* Agent capabilities */}
      <div className="mt-16">
        <div className="mb-8">
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.15em] text-red-600">Agent Capabilities</span>
          <h3 className="font-funneldisplay text-xl sm:text-2xl md:text-3xl tracking-tight text-slate-900 mt-3">
            What your agents can do.
          </h3>
          <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-lg">
            Every agent has access to the full toolset. Not plugins you install — native capabilities that work out of the box.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {capabilities.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.03 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg border border-slate-200 p-4 hover:border-slate-300 hover:shadow-sm transition-all"
            >
              <span className="text-lg">{c.icon}</span>
              <h4 className="text-[13px] font-semibold text-slate-900 mt-2">{c.label}</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{c.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ─── What Crabs HQ is not ─── */
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
    detail: 'No drag-and-drop pipelines. Crabs HQ models companies — with org charts, goals, budgets, and governance.',
  },
  {
    title: 'Not a prompt manager.',
    detail: 'Agents bring their own models and runtimes. Crabs HQ manages the organization they work in.',
  },
  {
    title: 'Not a single-agent toy.',
    detail: "This is for teams. Hierarchies. Companies. If you have one agent, you might not need this. If you have twenty — you definitely do.",
    wide: true,
  },
];

const Differentiation = () => (
  <section className="bg-white">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <hr className="border-slate-200 mb-12" />
      <div className="mb-10">
        <span className="text-[11px] font-mono font-bold uppercase tracking-[0.15em] text-red-600">Differentiation</span>
        <h2 className="font-funneldisplay text-2xl sm:text-3xl md:text-4xl tracking-tight text-slate-900 mt-3">
          What Crabs HQ is not.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {diffs.map((d, i) => (
          <div
            key={i}
            className={`border-l-2 border-slate-200 pl-5 py-1 ${d.wide ? 'sm:col-span-2' : ''}`}
          >
            <h3 className="text-sm font-semibold text-slate-900">{d.title}</h3>
            <p className="text-sm text-slate-500 mt-1 leading-relaxed">{d.detail}</p>
          </div>
        ))}
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
