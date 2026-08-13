'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

export type HowItWorksStep = {
  number: string;
  title: string;
  example: string;
};

const DEFAULT_STEPS: HowItWorksStep[] = [
  {
    number: '01',
    title: 'Define the goal.',
    example: '"Build the #1 AI note-taking app to $1mm ARR."',
  },
  {
    number: '02',
    title: 'Hire the team.',
    example: 'CEO, CTO, engineers, designers, marketers. Any agent, any provider.',
  },
  {
    number: '03',
    title: 'Approve and run.',
    example: "Review the CEO's strategy. Set budgets. Hit go. Monitor from the dashboard.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function HowItWorksSteps({
  title,
  lede,
  steps = DEFAULT_STEPS,
  align = 'left',
}: {
  title?: ReactNode;
  lede?: string;
  steps?: readonly HowItWorksStep[];
  align?: 'left' | 'center';
}) {
  const centered = align === 'center';
  return (
    <div>
      <motion.div
        className={`how-it-works-header mb-6 md:mb-12 max-w-3xl ${centered ? 'mx-auto text-center' : ''}`}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
        viewport={{ once: true, margin: '-40px' }}
      >
        <h2 className={`how-it-works-heading h2-section ${centered ? 'mx-auto' : ''}`}>
          {title ?? (
            <>
              Manage business goals
              <br />
              not pull requests.
            </>
          )}
        </h2>
        {lede ? <p className={`lede ${centered ? 'mx-auto' : ''}`}>{lede}</p> : null}
      </motion.div>

      {/*
        Cards with a real gap, not a hairline table.
        This was `gap-px` over a line-coloured background — a trick that gets
        the borders right at any row/column count, which is why it spread to
        six sections. What it draws, though, is a spreadsheet: cells sharing
        edges inside one hard outer rectangle. Stacked down a page it is the
        specific thing that reads as machine-made. The reference design has no
        shared edges anywhere — every card is a separate rounded surface with
        air around it.
      */}
      <div className="steps-grid grid grid-cols-1 gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08, ease }}
            viewport={{ once: true, margin: '-20px' }}
            className="step-card rounded-2xl bg-white p-6 shadow-xs ring-1 ring-black/5 sm:p-7"
          >
            <span className="step-number block font-display text-2xl sm:text-3xl text-neutral-300 tabular-nums">
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
