'use client';

import { useEffect, useState } from 'react';

import { TROOPERS, type Trooper } from '@/lib/troopers';
import TrooperMark from './TrooperMark';

/** Gumloop agent-mark settle curve — snappy, no bounce. */
const MARK_EASE = 'cubic-bezier(0.77, 0, 0.175, 1)';
const TRANSITION_MS = 500;
const STEP_MS = 1600;
/** size-7 (28) + gap-1.5 (6). */
const SLOT_PX = 34;
/** How many marks visible in the clipped window. */
const WINDOW = 4;
/** Focus slot inside the window (0-indexed from the left of the viewport). */
const FOCUS = 2;

const LOOPS = 10;
const TRACK = Array.from({ length: LOOPS }, () => TROOPERS).flat();
const SNAP_AT = TRACK.length - WINDOW - TROOPERS.length;
const SNAP_TO = FOCUS + TROOPERS.length * 2;

type Pose = { scale: number; rotate: number };

function poseForDistance(distance: number): Pose {
  const abs = Math.abs(distance);
  if (abs === 0) return { scale: 1, rotate: 0 };
  if (abs === 1) {
    return {
      scale: 0.545,
      rotate: distance < 0 ? -22 : 18,
    };
  }
  if (abs === 2) {
    return {
      scale: 0.32,
      rotate: distance < 0 ? 26 : -24,
    };
  }
  return { scale: 0, rotate: distance < 0 ? -16 : 27 };
}

/**
 * Cycling identity marks — Gumloop-style.
 *
 * Track slides one slot at a time; neighbors shrink + tilt while the focus
 * mark settles at full size. Quiet presence, not decoration noise.
 */
export function TrooperMarkCarousel({
  size = 28,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(FOCUS);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setIndex((i) => i + 1);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  // Seamlessly rewind the track once we near the end of the duplicated list.
  useEffect(() => {
    if (reduceMotion || index < SNAP_AT) return;
    const t = window.setTimeout(() => {
      setInstant(true);
      setIndex(SNAP_TO);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setInstant(false));
      });
    }, TRANSITION_MS);
    return () => window.clearTimeout(t);
  }, [index, reduceMotion]);

  if (reduceMotion) {
    return (
      <div className={`flex items-center gap-1.5 ${className}`} aria-hidden>
        {TROOPERS.map((t) => (
          <TrooperMark key={t.handle} trooper={t} size={size} />
        ))}
      </div>
    );
  }

  const translateX = -(index - FOCUS) * SLOT_PX;

  return (
    <div
      className={`pointer-events-none max-w-[8.5rem] overflow-hidden py-1 select-none ${className}`}
      aria-hidden
    >
      <div
        className="flex w-max gap-1.5"
        style={{
          transform: `translateX(${translateX}px)`,
          transition: instant ? 'none' : `transform ${TRANSITION_MS}ms ${MARK_EASE}`,
        }}
      >
        {TRACK.map((trooper, i) => (
          <MarkSlot
            key={`${trooper.handle}-${i}`}
            trooper={trooper}
            size={size}
            pose={poseForDistance(i - index)}
            instant={instant}
          />
        ))}
      </div>
    </div>
  );
}

function MarkSlot({
  trooper,
  size,
  pose,
  instant,
}: {
  trooper: Trooper;
  size: number;
  pose: Pose;
  instant: boolean;
}) {
  const transition = instant ? 'none' : `transform ${TRANSITION_MS}ms ${MARK_EASE}`;

  return (
    <div
      className="flex size-7 shrink-0 items-center justify-center"
      style={{
        width: size,
        height: size,
        transformOrigin: '100% 50%',
        transform: `scale(${pose.scale})`,
        transition,
      }}
    >
      {/* Float sits outside rotate so the two transforms don't clobber each other. */}
      <div className={pose.scale === 1 ? 'animate-mark-float' : undefined}>
        <div
          style={{
            transform: `rotate(${pose.rotate}deg)`,
            transition,
          }}
        >
          <TrooperMark trooper={trooper} size={size} />
        </div>
      </div>
    </div>
  );
}
