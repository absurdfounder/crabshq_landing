'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/** Keep lines short so "Trooper …" stays on one row; second line is fixed below. */
const ROTATING_LINES = [
  'is your team.',
  'ships code.',
  'runs ads.',
  'closes deals.',
  'posts tweets.',
  'writes code.',
  'plans launches.',
] as const;

const LONGEST_LINE = 'plans launches.';

const CHAR_MS = 46;
const HOLD_MS = 1800;
const FADE_MS = 480;

type Phase = 'typing' | 'hold' | 'fade';

type HeroRotatingHeadlineProps = {
  className?: string;
};

export default function HeroRotatingHeadline({ className = '' }: HeroRotatingHeadlineProps) {
  const reduceMotion = useReducedMotion();
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('typing');

  const line = ROTATING_LINES[lineIndex];
  const displayed = reduceMotion ? line : line.slice(0, charIndex);
  const isTyping = !reduceMotion && phase === 'typing' && charIndex < line.length;
  const showRotatingText = displayed.length > 0;
  const showCursor = isTyping && showRotatingText;

  useEffect(() => {
    if (reduceMotion) return;

    if (phase === 'typing') {
      if (charIndex < line.length) {
        const timer = setTimeout(() => setCharIndex((count) => count + 1), CHAR_MS);
        return () => clearTimeout(timer);
      }
      setPhase('hold');
      return;
    }

    if (phase === 'hold') {
      const timer = setTimeout(() => setPhase('fade'), HOLD_MS);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setLineIndex((current) => (current + 1) % ROTATING_LINES.length);
      setCharIndex(0);
      setPhase('typing');
    }, FADE_MS);

    return () => clearTimeout(timer);
  }, [phase, charIndex, line.length, reduceMotion]);

  return (
    <h1
      className={`max-w-none font-display font-medium text-[2rem] leading-[1.12] tracking-tight sm:text-4xl md:text-[2.75rem] lg:text-[3.25rem] lg:leading-[1.08] xl:text-[3.5rem] ${className}`}
    >
      <span className="grid">
        <span className="col-start-1 row-start-1 invisible pointer-events-none select-none" aria-hidden>
          Trooper {LONGEST_LINE}
        </span>
        <span className="col-start-1 row-start-1 text-ink" aria-live="polite" aria-atomic="true">
          <span>Trooper </span>
          <motion.span
            key={lineIndex}
            className="text-ink"
            initial={reduceMotion ? false : { opacity: 1 }}
            animate={{ opacity: phase === 'fade' && !reduceMotion ? 0 : 1 }}
            transition={{ duration: FADE_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
          >
            {displayed}
            {showCursor ? (
              <span
                className="ml-0.5 inline-block w-[3px] animate-pulse bg-fern align-[-0.05em]"
                style={{ height: '0.9em' }}
                aria-hidden
              />
            ) : null}
          </motion.span>
        </span>
      </span>
      <span className="mt-1 block text-ink sm:mt-2">Whole Team. One App.</span>
    </h1>
  );
}
