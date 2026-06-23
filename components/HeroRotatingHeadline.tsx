'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const ROTATING_LINES = [
  'is your team.',
  'plans your roadmap.',
  'ships your code.',
  'runs your ads.',
  'replies to customers.',
  'closes your deals.',
  'posts your tweets.',
] as const;

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
      className={`font-display text-4xl font-medium text-balance text-slate-900 sm:text-5xl max-w-3xl ${className}`}
    >
      <span
        className="block"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="text-trooper">Trooper</span>{' '}
        <motion.span
          key={lineIndex}
          className="text-slate-900"
          initial={reduceMotion ? false : { opacity: 1 }}
          animate={{ opacity: phase === 'fade' && !reduceMotion ? 0 : 1 }}
          transition={{ duration: FADE_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
        >
          {displayed}
          {showCursor ? (
            <span
              className="ml-0.5 inline-block w-[2px] animate-pulse bg-trooper align-[-0.05em]"
              style={{ height: '0.85em' }}
              aria-hidden
            />
          ) : null}
        </motion.span>
      </span>
      <span className="mt-1 block">
        Whole Team. <span className="text-trooper">One App.</span>
      </span>
    </h1>
  );
}
