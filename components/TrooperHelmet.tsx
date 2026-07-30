'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * The Trooper character — the 3D helmet from `trooper-logomark.png`, given a
 * slow idle float so it reads as a mascot rather than a pasted-on logo.
 */
export default function TrooperHelmet({
  size = 200,
  tilt = -8,
  className = '',
  priority = false,
}: {
  size?: number;
  /** Resting rotation in degrees. */
  tilt?: number;
  className?: string;
  priority?: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`pointer-events-none select-none ${className}`}
      style={{ width: size, height: size }}
      initial={reduced ? false : { opacity: 0, y: 18, rotate: tilt - 6 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-60px' }}
    >
      <motion.div
        className="h-full w-full"
        animate={reduced ? undefined : { y: [0, -9, 0], rotate: [0, 1.5, 0] }}
        transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
      >
        <Image
          src="/images/trooper-logomark.png"
          alt=""
          width={size}
          height={size}
          priority={priority}
          className="h-full w-full object-contain drop-shadow-[0_18px_28px_rgba(28,25,23,0.22)]"
          sizes={`${size}px`}
        />
      </motion.div>
    </motion.div>
  );
}
