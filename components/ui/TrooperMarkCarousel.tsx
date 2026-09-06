'use client';

import { useEffect, useState } from 'react';

import { TROOPERS, type Trooper } from '@/lib/troopers';
import TrooperMark from './TrooperMark';

/** Gumloop agent-mark settle curve — snappy, no bounce. */
const MARK_EASE = 'cubic-bezier(0.77, 0, 0.175, 1)';
const TRANSITION_MS = 500;
const STEP_MS = 1600;
const SLOT_PX = 40;
/** Odd window so focus sits dead-center (2 left · focus · 2 right). */
const WINDOW = 5;
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
    return { scale: 0.72, rotate: distance < 0 ? -8 : 8 };
  }
  if (abs === 2) {
    return { scale: 0.5, rotate: distance < 0 ? 10 : -10 };
  }
  return { scale: 0, rotate: 0 };
}

/**
 * Cycling SVG identity marks — static silhouettes, no avatar RAF loops.
 */
export function TrooperMarkCarousel({
  size = 32,
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
      <div className={`flex items-center justify-center gap-2 ${className}`} aria-hidden>
        {TROOPERS.map((t) => (
          <TrooperMark key={t.handle} trooper={t} size={size} />
        ))}
      </div>
    );
  }

  const translateX = -(index - FOCUS) * SLOT_PX;
  const windowPx = WINDOW * SLOT_PX;

  return (
    <div
      className={`pointer-events-none overflow-visible py-1 select-none ${className}`}
      style={{ width: windowPx, maxWidth: '100%' }}
      aria-hidden
    >
      <div className="mx-auto overflow-hidden" style={{ width: windowPx }}>
        <div
          className="flex w-max"
          style={{
            gap: SLOT_PX - size,
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
      className="flex shrink-0 items-center justify-center overflow-visible"
      style={{
        width: size,
        height: size,
        transformOrigin: '50% 50%',
        transform: `scale(${pose.scale})`,
        transition,
        opacity: pose.scale === 0 ? 0 : 1,
      }}
    >
      <div className={pose.scale === 1 ? 'animate-mark-float' : undefined}>
        <div style={{ transform: `rotate(${pose.rotate}deg)`, transition }}>
          <TrooperMark trooper={trooper} size={size} />
        </div>
      </div>
    </div>
  );
}
