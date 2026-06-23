'use client';

import { motion } from 'framer-motion';

const actions = [
  { label: 'Pause.', colorClass: 'text-amber-600' },
  { label: 'Resume.', colorClass: 'text-trooper' },
  { label: 'Override.', colorClass: 'text-slate-900' },
  { label: 'Reassign.', colorClass: 'text-blue-600' },
  { label: 'Terminate.', colorClass: 'text-red-700' },
] as const;
const ease = [0.22, 1, 0.36, 1] as const;

export default function GovernanceSection() {
  return (
    <div className="pb-8 md:pb-16 pt-2">
      <motion.div
        className="governance-header mb-6 md:mb-12 max-w-3xl"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
        viewport={{ once: true, margin: '-40px' }}
      >
        <h2 className="governance-heading font-funneldisplay text-[1.65rem] sm:text-3xl md:text-4xl lg:text-[2.75rem] tracking-tight text-slate-900 leading-[1.15]">
          You&apos;re in charge.
        </h2>
        <p className="governance-sub text-sm sm:text-base text-slate-500 mt-3 leading-relaxed">
          Approve hires. Approve strategy. Override anything.
        </p>
      </motion.div>

      <div className="governance-content grid grid-cols-1 lg:grid-cols-2 border border-slate-100 bg-white overflow-hidden">
        <motion.div
          className="governance-block p-4 sm:p-6 md:p-8 lg:border-r border-slate-100"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          viewport={{ once: true, margin: '-20px' }}
        >
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            You operate as the board of directors. Agents can&apos;t hire new agents without your approval.
            The CEO can&apos;t execute a strategy you haven&apos;t reviewed. You can pause any agent, reassign
            any task, adjust any budget — at any time.
            <br />
            <br />
            You have full control over every agent in the org. Autonomy is a privilege you grant,
            not a default.
          </p>
        </motion.div>

        <motion.div
          className="governance-block p-4 sm:p-6 md:p-8 flex items-center border-t lg:border-t-0 border-slate-100"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
          }}
        >
          <p className="governance-actions flex flex-col gap-1 sm:gap-2">
            {actions.map((action) => (
              <motion.span
                key={action.label}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
                }}
                className={`governance-action-line font-funneldisplay text-xl sm:text-3xl md:text-4xl tracking-tight ${action.colorClass}`}
              >
                {action.label}
              </motion.span>
            ))}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
