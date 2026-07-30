'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Define the goal.',
    example: '"Build the #1 AI note-taking app to $1mm ARR."',
  },
  {
    number: '02',
    title: 'Hire the team.',
    example: 'CEO, CTO, engineers, designers, marketers — any agent, any provider.',
  },
  {
    number: '03',
    title: 'Approve and run.',
    example: "Review the CEO's strategy. Set budgets. Hit go. Monitor from the dashboard.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function HowItWorksSteps() {
  return (
    <div>
      <motion.div
        className="how-it-works-header mb-6 md:mb-12 max-w-3xl"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
        viewport={{ once: true, margin: '-40px' }}
      >
        <h2 className="how-it-works-heading h2-section">
          Manage business goals
          <br />
          not pull requests.
        </h2>
      </motion.div>

      {/* Hairline grid: the 1px gap exposes the container's line colour and the
          opaque cells cover the rest. Correct at any row/column count, so no
          per-index border math and nothing to re-tune per breakpoint. */}
      <div className="steps-grid grid grid-cols-1 gap-px overflow-hidden border border-[var(--color-line)] bg-[var(--color-line)] md:grid-cols-3">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08, ease }}
            viewport={{ once: true, margin: '-20px' }}
            className="step-card bg-canvas-section p-4 sm:p-6 md:p-8"
          >
            <span className="step-number block font-mono text-2xl sm:text-3xl text-slate-300 tabular-nums">
              {step.number}
            </span>
            <h3 className="step-title font-sans text-lg sm:text-xl font-semibold text-ink mt-4 mb-3">
              {step.title}
            </h3>
            <p className="step-example text-sm sm:text-base text-ink-muted leading-relaxed">
              {step.example}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
