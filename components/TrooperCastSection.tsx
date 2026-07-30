'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { TROOPERS } from '@/lib/troopers';
import TrooperAvatar from './ui/TrooperAvatar';

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * The cast.
 *
 * Names the workforce instead of describing it. Each card is one trooper, one
 * human, one artifact, and a link to the loop that actually does the job — so
 * the personality is a way into the catalog rather than set dressing.
 */
export default function TrooperCastSection() {
  return (
    <div className="pb-8 pt-2 md:pb-16">
      <motion.div
        className="mb-6 max-w-3xl md:mb-12"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
        viewport={{ once: true, margin: '-40px' }}
      >
        <h2 className="font-funneldisplay text-[1.65rem] leading-[1.15] tracking-tight text-ink sm:text-3xl md:text-4xl lg:text-[2.75rem]">
          Everyone on the team
          <br />
          gets a trooper.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
          They have names, mailboxes and a job. Write to one like you&apos;d write to a
          colleague — and it stops at your desk before anything leaves the building.
        </p>
      </motion.div>

      {/* border-t/l on the frame + border-b/r per cell keeps the hairline grid
          clean at 1, 2 or 3 columns without per-index border logic. */}
      <div className="grid grid-cols-1 border-l border-t border-[var(--color-line)] bg-canvas-section sm:grid-cols-2 lg:grid-cols-3">
        {TROOPERS.map((trooper, index) => (
          <motion.article
            key={trooper.handle}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: Math.min(index, 3) * 0.07, ease }}
            viewport={{ once: true, margin: '-20px' }}
            className="flex flex-col border-b border-r border-[var(--color-line)] p-5 sm:p-6 md:p-7"
          >
            <div className="flex items-start gap-3">
              <TrooperAvatar trooper={trooper} size={44} />
              <div className="min-w-0">
                <h3 className="font-funneldisplay text-lg tracking-tight text-ink sm:text-xl">
                  <span
                    className="inline-block px-[0.2em]"
                    style={{ backgroundColor: trooper.tint, color: trooper.accentDark }}
                  >
                    {trooper.name}
                  </span>
                </h3>
                <p
                  className="mt-1 truncate font-mono text-[11px] tracking-tight sm:text-xs"
                  style={{ color: trooper.accent }}
                >
                  {`${trooper.handle}@trooper.so`}
                </p>
              </div>
              <span className="ml-auto shrink-0 border border-[var(--color-line)] bg-white px-2 py-1 font-silkscreen text-[9px] font-bold uppercase tracking-[0.16em] text-ink-faint">
                {trooper.role}
              </span>
            </div>

            <p className="mt-5 text-base leading-snug text-ink sm:text-lg">
              <span className="font-semibold" style={{ color: trooper.accentDark }}>
                {trooper.name}
              </span>{' '}
              {trooper.verb}{' '}
              <span className="font-semibold">{trooper.human}&rsquo;s</span> {trooper.artifact}.
            </p>

            <p className="mt-2.5 text-sm leading-relaxed text-slate-500">{trooper.detail}</p>

            <Link
              href={`/loops/${trooper.loopSlug}`}
              className="group mt-5 inline-flex items-center gap-1.5 self-start border-b border-transparent pb-0.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:border-current hover:text-ink sm:text-xs"
            >
              <span>Runs {trooper.loopTitle}</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.article>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28, ease }}
          viewport={{ once: true, margin: '-20px' }}
          className="flex flex-col justify-between border-b border-r border-[var(--color-line)] bg-white p-5 sm:p-6 md:p-7"
        >
          <div>
            <span className="type-eyebrow-num">Open roles</span>
            <p className="mt-5 text-base leading-snug text-ink sm:text-lg">
              The rest of the roster is hiring.
            </p>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-500">
              Research, QA, security, finance, docs. Same deal: a name, a mailbox, and a loop
              that says when the job is done.
            </p>
          </div>
          <Link
            href="https://app.trooper.so?ref=squad"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-5 inline-flex items-center gap-1.5 self-start border-b border-transparent pb-0.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:border-current hover:text-ink sm:text-xs"
          >
            <span>Hire your squad</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
