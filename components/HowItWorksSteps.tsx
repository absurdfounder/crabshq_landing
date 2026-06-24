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
    <div className="pb-8 md:pb-16 pt-2">
      <motion.div
        className="how-it-works-header mb-6 md:mb-12 max-w-3xl"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
        viewport={{ once: true, margin: '-40px' }}
      >
        <h2 className="how-it-works-heading font-funneldisplay text-[1.65rem] sm:text-3xl md:text-4xl lg:text-[2.75rem] tracking-tight text-ink leading-[1.15]">
          Manage business goals
          <br />
          not pull requests.
        </h2>
      </motion.div>

      <div className="steps-grid grid grid-cols-1 md:grid-cols-3 border border-[var(--color-line)] bg-canvas-section overflow-hidden">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08, ease }}
            viewport={{ once: true, margin: '-20px' }}
            className={[
              'step-card p-4 sm:p-6 md:p-8',
              index < steps.length - 1 ? 'border-b md:border-b-0 md:border-r border-[var(--color-line)]' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <span className="step-number block font-mono text-2xl sm:text-3xl text-slate-300 tabular-nums">
              {step.number}
            </span>
            <h3 className="step-title font-sans text-lg sm:text-xl font-semibold text-ink mt-4 mb-3">
              {step.title}
            </h3>
            <p className="step-example text-sm sm:text-base text-slate-500 leading-relaxed">
              {step.example}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
