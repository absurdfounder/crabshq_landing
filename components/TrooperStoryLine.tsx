'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { TROOPERS } from '@/lib/troopers';
import TrooperAvatar from './ui/TrooperAvatar';

const ROTATE_MS = 3400;
const ease = [0.22, 1, 0.36, 1] as const;

type TrooperStoryLineProps = {
  className?: string;
};

/**
 * Rotating `{trooper} {verb} {human}'s {artifact}` line.
 *
 * One named agent doing one specific job for one named person — the whole cast
 * cycles through the same slot so the reader learns the shape of the product
 * from five concrete examples instead of a verb list.
 *
 * The full cast is always present in the DOM for screen readers and crawlers;
 * only the visible slot animates, and rotation stops entirely under
 * `prefers-reduced-motion`.
 */
export default function TrooperStoryLine({ className = '' }: TrooperStoryLineProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % TROOPERS.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const trooper = TROOPERS[index];

  return (
    <div className={className}>
      {/* Visible, animated slot */}
      <div
        aria-hidden="true"
        className="flex min-h-[2.75rem] items-center gap-3 sm:min-h-[3rem]"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={trooper.handle}
            initial={reduceMotion ? false : { opacity: 0, filter: 'blur(4px)', y: 6 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, filter: 'blur(4px)', y: -6 }}
            transition={{ duration: 0.42, ease }}
            className="flex items-center gap-3"
          >
            <TrooperAvatar trooper={trooper} size={34} />
            <span className="text-[15px] leading-snug text-ink-muted sm:text-base">
              <span className="font-semibold" style={{ color: trooper.accentDark }}>
                {trooper.name}
              </span>{' '}
              {trooper.verb}{' '}
              <span className="font-semibold text-ink">{trooper.human}&rsquo;s</span>{' '}
              {trooper.artifact}.
            </span>
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Static equivalent for assistive tech and crawlers */}
      <ul className="sr-only">
        {TROOPERS.map((t) => (
          <li key={t.handle}>
            {t.name} {t.verb} {t.human}&rsquo;s {t.artifact}.
          </li>
        ))}
      </ul>
    </div>
  );
}
