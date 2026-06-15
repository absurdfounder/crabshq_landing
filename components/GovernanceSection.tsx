'use client';

import { motion } from 'framer-motion';

const actions = ['Pause.', 'Resume.', 'Override.', 'Reassign.', 'Terminate.'];

export default function GovernanceSection() {
  return (
    <div className="pb-10 md:pb-16 pt-2">
      <div className="governance-header mb-8 md:mb-12 max-w-3xl">
        <h2 className="governance-heading font-funneldisplay text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] tracking-tight text-slate-900 leading-[1.15]">
          You&apos;re in charge.
        </h2>
        <p className="governance-sub text-sm sm:text-base text-slate-500 mt-3 leading-relaxed">
          Approve hires. Approve strategy. Override anything.
        </p>
      </div>

      <div className="governance-content grid grid-cols-1 lg:grid-cols-2 border border-slate-200 bg-white overflow-hidden">
        <div className="governance-block p-6 md:p-8 lg:border-r border-slate-200">
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            You operate as the board of directors. Agents can&apos;t hire new agents without your approval.
            The CEO can&apos;t execute a strategy you haven&apos;t reviewed. You can pause any agent, reassign
            any task, adjust any budget — at any time.
            <br />
            <br />
            You have full control over every agent in the org. Autonomy is a privilege you grant,
            not a default.
          </p>
        </div>

        <div className="governance-block p-6 md:p-8 flex items-center border-t lg:border-t-0 border-slate-200">
          <p className="governance-actions flex flex-col gap-1 sm:gap-2">
            {actions.map((action, index) => (
              <motion.span
                key={action}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="governance-action-line font-funneldisplay text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-tight"
              >
                {action}
              </motion.span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
