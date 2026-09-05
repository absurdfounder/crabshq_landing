'use client';

import { motion } from 'framer-motion';

import { TROOPERS } from '@/lib/troopers';
import TrooperMark from '@/components/ui/TrooperMark';

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Gumloop-inspired Optimize band — open-source cost, self-improve orbit, evals.
 * Numbers are Trooper-framed (self-host / open models), not Gumloop’s SaaS pricing.
 */
export default function OptimizeAgentsSection() {
  return (
    <div>
      <motion.div
        className="max-w-3xl"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
        viewport={{ once: true, margin: '-40px' }}
      >
        <p className="text-[13px] font-medium tracking-tight text-ink-faint">Optimize</p>
        <h2 className="mt-2 h2-section !mt-2">Optimize your troopers</h2>
        <p className="lede">
          Run cheaper models where they fit, let agents learn from their own runs, and catch
          regressions before they ship.
        </p>
      </motion.div>

      <div className="mt-10 grid gap-px border border-[var(--color-line)] bg-[var(--color-line)] md:grid-cols-3">
        {/* Open source / cost */}
        <article className="flex flex-col overflow-hidden bg-canvas-section">
          <div className="relative flex h-44 items-center justify-center p-4">
            <div className="absolute inset-6 rounded-full border border-dashed border-black/[0.08]" />
            <div className="relative z-[1] text-center">
              <p className="text-[11px] text-ink-faint">Cost per task · open models</p>
              <p className="mt-1 font-funneldisplay text-3xl font-medium tracking-tight text-ink">
                −70%
              </p>
              <p className="mt-1 text-[12px]">
                <span className="text-ink-faint line-through">$0.38</span>{' '}
                <span className="font-semibold text-ok-700">$0.11</span>
              </p>
            </div>
          </div>
          <div className="border-t border-[var(--color-line)] bg-white p-5 sm:p-6">
            <h3 className="text-[15px] font-semibold tracking-tight text-ink">
              Open-source by default
            </h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
              Self-host or point at open models. Pay a fraction of the cost, with no lock-in and
              full control over where troopers run.
            </p>
          </div>
        </article>

        {/* Self-improving */}
        <article className="flex flex-col overflow-hidden bg-canvas-section">
          <div className="relative flex h-44 items-center justify-center">
            <div className="gl-orbit-spin absolute size-28 rounded-full border border-black/[0.08]" />
            <div className="gl-orbit-spin absolute size-36 rounded-full border border-dashed border-black/[0.06]" />
            <div
              className="relative z-[1] flex size-14 items-center justify-center rounded-full shadow-md ring-1 ring-black/10"
              style={{ backgroundColor: TROOPERS[3].accent }}
            >
              <TrooperMark trooper={TROOPERS[3]} size={28} />
            </div>
            <span className="absolute top-6 text-[10px] font-medium text-ink-faint">Execute</span>
            <span className="absolute bottom-8 right-10 text-[10px] font-medium text-ink-faint">
              Reflect
            </span>
            <span className="absolute bottom-8 left-10 text-[10px] font-medium text-ink-faint">
              Learn
            </span>
          </div>
          <div className="border-t border-[var(--color-line)] bg-white p-5 sm:p-6">
            <h3 className="text-[15px] font-semibold tracking-tight text-ink">
              Self-improving agents
            </h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
              Troopers reflect on their own runs and tune themselves over time — without you
              rewriting the playbook by hand.
            </p>
          </div>
        </article>

        {/* Evals */}
        <article className="flex flex-col overflow-hidden bg-canvas-section">
          <div className="relative flex h-44 items-start justify-end bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:16px_16px] p-5">
            <div className="max-w-[200px] rounded-xl bg-white p-3 shadow-md ring-1 ring-black/[0.06]">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-faint">
                Flag
              </p>
              <p className="mt-1 text-[12px] leading-snug text-ink-muted">
                Voice &amp; tone passes fell to{' '}
                <span className="font-semibold" style={{ color: TROOPERS[3].accent }}>
                  38 of 46 tasks
                </span>{' '}
                after the latest prompt update.
              </p>
            </div>
          </div>
          <div className="border-t border-[var(--color-line)] bg-white p-5 sm:p-6">
            <h3 className="text-[15px] font-semibold tracking-tight text-ink">Evals built in</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
              Measure quality, catch regressions, and ship improvements with confidence before a
              bad run reaches a customer.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
