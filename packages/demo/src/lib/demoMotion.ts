'use client';

import { useEffect, useState, type RefObject } from 'react';

/**
 * Motion vocabulary for the hero demo, ported from the Trooper app so the
 * marketing replica moves the way the product moves.
 *
 * Sources: Trooper `src/index.css` (keyframes + reduced-motion block) and the
 * Tailwind `duration-*` / `ease-out` pairs used across TaskCard.jsx,
 * KanbanColumn.jsx and TaskModal.jsx.
 */

/** Tailwind `ease-out` — the app's default transition curve. */
export const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
/** Tailwind `ease-in-out` — used for looping status pulses. */
export const EASE_IN_OUT = 'cubic-bezier(0.4, 0, 0.2, 1)';
/** Pointer travel: quick departure, long settle. Not a Tailwind curve — cursors decelerate. */
export const EASE_CURSOR = 'cubic-bezier(0.33, 0.05, 0.2, 1)';

/** Durations in ms, matching the app's `duration-*` utilities. */
export const DUR = {
  /** `animate-fade-in-up` — every list/thread entry in the app. */
  enter: 180,
  /** `transition-colors`, hover states. */
  hover: 150,
  /** `transition-transform duration-200` — chevrons, small affordances. */
  quick: 200,
  /** `duration-300 ease-out` — accordions, artifact cards. */
  panel: 300,
  /** `transition-all duration-500` — the task progress bar fill. */
  progress: 500,
} as const;

/** Card drag choreography — lift, travel, settle. */
export const DRAG = {
  lift: 140,
  settle: 260,
  /** Minimum time the card spends visibly in flight, even over short hops. */
  minTravel: 260,
} as const;

/**
 * Pointer travel time for a given distance, in canvas px.
 *
 * The previous implementation used a flat 720ms for every move, so a 40px nudge
 * took as long as crossing the whole 1600px canvas — the single biggest reason
 * the reel read as a slideshow rather than a person.
 */
export function cursorTravelMs(distance: number): number {
  if (!Number.isFinite(distance) || distance <= 0) return CURSOR_MIN_MS;
  return Math.min(CURSOR_MAX_MS, Math.max(CURSOR_MIN_MS, 110 + distance * 0.5));
}

export const CURSOR_MIN_MS = 160;
export const CURSOR_MAX_MS = 620;
/** Hold after arrival before the click pulse — a hand settling on the target. */
export const CURSOR_SETTLE_MS = 90;
/** Gap between the click pulse and the state change it causes. */
export const CURSOR_REACTION_MS = 110;
export const CURSOR_CLICK_MS = 260;

/** Composer typing cadence — a person, not a metronome. */
export const TYPING = {
  base: 24,
  jitter: 18,
  /** Extra pause after `.`, `?`, `!`, `,`, `:` and `;`. */
  punctuation: 160,
  space: 40,
  /** Occasional mid-sentence hesitation. */
  thinkChance: 0.045,
  think: 300,
} as const;

/** Deterministic per-character delay — no Math.random, so SSR and reruns agree. */
export function typingDelayFor(text: string, index: number): number {
  const ch = text[index] ?? '';
  const prev = text[index - 1] ?? '';
  // Cheap deterministic hash so the cadence varies but never re-renders differently.
  const hash = (index * 2654435761) % 1000 / 1000;
  let delay = TYPING.base + hash * TYPING.jitter;
  if (/[.?!,:;]/.test(prev)) delay += TYPING.punctuation;
  else if (prev === ' ') delay += TYPING.space;
  if (ch === ' ' && hash < TYPING.thinkChance) delay += TYPING.think;
  return Math.round(delay);
}

/**
 * Keyframes lifted from Trooper `src/index.css:1112-1180` plus the few entry
 * animations the demo needs. Injected once by the demo root.
 */
export const DEMO_KEYFRAMES = `
@keyframes demoFadeInUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
@keyframes demoFadeIn { from { opacity: 0; transform: translateY(-2px); } to { opacity: 1; transform: translateY(0); } }
@keyframes demoPop { 0% { opacity: 0; transform: scale(0.6); } 60% { opacity: 1; transform: scale(1.06); } 100% { opacity: 1; transform: scale(1); } }
@keyframes demoCountBump { 0% { transform: scale(1); } 45% { transform: scale(1.18); } 100% { transform: scale(1); } }
@keyframes demoShimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
@keyframes demoStreamLiveDot { 0%, 100% { opacity: 0.55; } 50% { opacity: 1; } }
@keyframes demoWorkingSheen { 0% { left: -45%; opacity: 0; } 18% { opacity: 0.9; } 52% { left: 115%; opacity: 0; } 100% { left: 115%; opacity: 0; } }
@keyframes demoPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
@keyframes demoSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes demoBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
@keyframes demoCursorRipple { from { opacity: 0.85; transform: scale(0.35); } to { opacity: 0; transform: scale(2.2); } }

.demo-enter { animation: demoFadeInUp ${DUR.enter}ms ${EASE_OUT} both; }
.demo-pop { animation: demoPop 160ms ${EASE_OUT} both; }
.demo-count-bump { animation: demoCountBump 260ms ${EASE_OUT}; }
.demo-spin { animation: demoSpin 1s linear infinite; }
.demo-blink { animation: demoBlink 1s steps(2, start) infinite; }
.demo-pulse { animation: demoPulse 2s ${EASE_IN_OUT} infinite; }

/* Live agent stream — the app's softer status pulse. */
.demo-live-dot { animation: demoStreamLiveDot 2.2s ${EASE_IN_OUT} infinite; will-change: opacity; }

/* The app's working-agent badge, sheen and all. */
.demo-working-badge {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  border: 1px solid rgba(245, 158, 11, 0.35);
  background: rgb(255 251 235);
  color: rgb(146 64 14);
}
.demo-working-badge::after {
  content: '';
  position: absolute;
  inset: -1px auto -1px -45%;
  z-index: 0;
  width: 40%;
  transform: skewX(-18deg);
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent);
  animation: demoWorkingSheen 3.2s ${EASE_IN_OUT} infinite;
}

.demo-shimmer {
  background: linear-gradient(90deg, #e7e5e4 25%, #f5f5f4 50%, #e7e5e4 75%);
  background-size: 200% 100%;
  animation: demoShimmer 1.5s ${EASE_IN_OUT} infinite;
}

/*
 * Hover affordances. Both the visitor's real pointer and the ghost cursor
 * (which stamps [data-demo-hover] on whatever it is pointing at) light these
 * up, so the scripted reel touches a UI that visibly responds.
 */
.demo-hoverable { transition: background-color ${DUR.hover}ms ${EASE_OUT}, box-shadow ${DUR.hover}ms ${EASE_OUT}, border-color ${DUR.hover}ms ${EASE_OUT}, color ${DUR.hover}ms ${EASE_OUT}; }
.demo-row:hover, .demo-row[data-demo-hover] { background-color: rgba(255,255,255,0.75); box-shadow: 0 1px 3px rgba(28,25,23,0.06); }
.demo-row:active { background-color: rgba(245,245,244,0.9); }
.demo-icon-btn:hover, .demo-icon-btn[data-demo-hover] { background-color: #F5F5F4; color: #1C1917; }
.demo-chip:hover, .demo-chip[data-demo-hover] { background-color: #FAF9F6; border-color: #D6D3D1; }
.demo-send:hover, .demo-send[data-demo-hover] { filter: brightness(1.08); }

.Trooper-scrollbar::-webkit-scrollbar { width: 5px; height: 5px; }
.Trooper-scrollbar::-webkit-scrollbar-track { background: rgba(231,229,228,0.35); border-radius: 4px; }
.Trooper-scrollbar::-webkit-scrollbar-thumb { background: #78716C; border-radius: 4px; }

@media (prefers-reduced-motion: reduce) {
  .demo-enter, .demo-pop, .demo-count-bump { animation: none; opacity: 1; transform: none; }
  .demo-live-dot { animation: none; opacity: 0.85; }
  .demo-working-badge::after { animation: none; opacity: 0; }
  .demo-shimmer { animation: none; }
  .demo-pulse { animation: none; }
}
`;

/** Pauses ambient animation while a surface is scrolled out of view. */
export function useInViewport(ref: RefObject<Element | null>, rootMargin = '0px'): boolean {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15, rootMargin },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, rootMargin]);

  return visible;
}

/** Mirrors the app's `@media (prefers-reduced-motion: reduce)` handling in JS. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return reduced;
}
