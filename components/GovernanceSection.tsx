'use client';

import { motion } from 'framer-motion';
import { Check, KeyRound, Lock, ServerCog } from 'lucide-react';

const controls = [
  { label: 'Pause.', colorClass: 'text-amber-300' },
  { label: 'Resume.', colorClass: 'text-fern-light' },
  { label: 'Override.', colorClass: 'text-white' },
  { label: 'Reassign.', colorClass: 'text-blue-300' },
  { label: 'Terminate.', colorClass: 'text-red-300' },
] as const;

const guarantees = [
  {
    icon: Check,
    title: 'No action without approval',
    body: 'Commits, replies and campaigns wait in Human Review until you release them. Autonomy is a privilege you grant, not a default.',
  },
  {
    icon: KeyRound,
    title: 'Your keys stay yours',
    body: 'API keys are never stored on our servers. Every organization gets an isolated workspace with encrypted connections.',
  },
  {
    icon: ServerCog,
    title: 'Run it on your own hardware',
    body: 'Self-host the whole workforce, or point it at local models. Enterprise adds SSO, private VPC and on-prem deployment.',
  },
  {
    icon: Lock,
    title: 'You are the board',
    body: 'Troopers cannot hire other troopers, raise their own budgets, or run a strategy you have not reviewed.',
  },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Trust band.
 *
 * States the guarantee as a sentence, then backs it with four narrow claims —
 * each one something the product actually does. Deliberately no compliance
 * badges: nothing here should assert a certification the company has not
 * published.
 */
type GovernanceSectionProps = {
  /** Position in the host page's numbered section rhythm. */
  eyebrowNumber?: string;
};

export default function GovernanceSection({ eyebrowNumber = '06' }: GovernanceSectionProps) {
  return (
    <div id="governance" className="scroll-mt-24 py-10 md:py-16">
      <motion.div
        className="max-w-3xl"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
        viewport={{ once: true, margin: '-40px' }}
      >
        <h2 className="h2-section-dark">
          Your troopers work for you.
          <br />
          Just you.
        </h2>
      </motion.div>

      <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-8 md:mt-12 md:grid-cols-2 lg:grid-cols-4">
        {guarantees.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: Math.min(index, 3) * 0.07, ease }}
              viewport={{ once: true, margin: '-20px' }}
              className="border-t border-white/15 pt-5"
            >
              <Icon className="h-7 w-7 text-white" strokeWidth={1.25} aria-hidden="true" />
              <h3 className="mt-4 font-sans text-base text-white sm:text-lg">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{item.body}</p>
            </motion.article>
          );
        })}
      </div>

      <motion.div
        className="mt-10 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-white/15 pt-6 md:mt-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-20px' }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
        }}
      >
        <span className="mr-2 text-sm font-medium text-neutral-400">
          At any time
        </span>
        {controls.map((control) => (
          <motion.span
            key={control.label}
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
            }}
            className={`font-funneldisplay text-xl tracking-tight sm:text-2xl md:text-3xl ${control.colorClass}`}
          >
            {control.label}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
