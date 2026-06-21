'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const ROTATING_LINES = [
  'is your team.',
  'plans your roadmap.',
  'ships your code.',
  'runs your ads.',
  'replies to customers.',
  'closes your deals.',
  'posts your tweets.',
] as const;

const ROTATE_MS = 2800;
const ease = [0.22, 1, 0.36, 1] as const;

type HeroRotatingHeadlineProps = {
  className?: string;
};

export default function HeroRotatingHeadline({ className = '' }: HeroRotatingHeadlineProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROTATING_LINES.length);
    }, ROTATE_MS);

    return () => clearInterval(timer);
  }, [reduceMotion]);

  const suffix = ROTATING_LINES[index];

  return (
    <h1
      className={`font-funneldisplay tracking-tight text-balance max-w-3xl text-3xl sm:text-4xl md:text-[2.5rem] lg:text-[2.75rem] leading-[1.12] ${className}`}
    >
      <span className="block text-trooper font-normal">Trooper</span>
      <span className="relative block mt-0.5 sm:mt-1 min-h-[1.15em]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={suffix}
            className="block text-slate-900 font-normal"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.38, ease }}
            aria-live="polite"
          >
            {suffix}
          </motion.span>
        </AnimatePresence>
      </span>
    </h1>
  );
}
