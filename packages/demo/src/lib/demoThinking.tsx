'use client';

import { ThinkingOrb, type OrbState } from 'thinking-orbs';
import { usePrefersReducedMotion } from './demoMotion';

/**
 * Agent activity, drawn as one of six thinking states.
 *
 * The app already knows what an agent is doing — `RunActivityContent.jsx:600`
 * resolves a live run to the latest tool name, then falls back to "Writing
 * response" and finally "Thinking…" — and then throws that away into a single
 * pulsing dot. `thinking-orbs` gives the six states a shape, so the mapping
 * below is the same heuristic `getToolIconName` uses to pick an icon, pointed
 * at animations instead.
 */

/**
 * Which orb a piece of work should wear.
 *
 * `fallback` is what a surface knows about itself before any text is read — a
 * live browser session is searching until its action says otherwise. Without
 * it the generic verbs win: every frame of the browser stream carries the tool
 * name `browser`, which matches the searching group, so "Signing in with the
 * shared analytics seat" came out as a globe sweep instead of a form fill.
 */
export function orbStateForTool(tool: string, label?: string, fallback: OrbState = 'working'): OrbState {
  const t = `${tool} ${label ?? ''}`.toLowerCase();
  // Most specific first — a form fill reads as composing even in a browser.
  if (/(listen|transcri|voice|audio|record|dictat)/.test(t)) return 'listening';
  if (/(sign[- ]?in|log[- ]?in|credential|password|fill|submit|checkout)/.test(t)) return 'composing';
  if (/(generat|render|image|video|design|diagram|thumbnail|screenshot|capture)/.test(t)) return 'shaping';
  if (/(exec|shell|terminal|run|build|test|deploy|install|compile|git|commit)/.test(t)) return 'solving';
  if (/(write|patch|edit|draft|reply|message|doc|markdown|file|append|update)/.test(t)) return 'composing';
  if (/(search|query|grep|find|lookup|browse|navigat|fetch|crawl|scrape|scroll|read)/.test(t)) return 'searching';
  return fallback;
}

/** The generation dialog's two modes read as two different kinds of making. */
export function orbStateForGeneration(kind: 'image' | 'video'): OrbState {
  return kind === 'image' ? 'shaping' : 'composing';
}

export type DemoOrbProps = {
  state: OrbState;
  /** 20 for inline status rows, 64 for a surface the orb owns. */
  size?: 20 | 64;
  /**
   * Which ink to draw. The demo canvas is a fixed light replica of the app
   * regardless of the visitor's OS theme, so `auto` would invert the orb on a
   * dark-mode machine — every placement pins this deliberately.
   *
   * `'light'` draws dark ink (for the app's stone surfaces); `'dark'` draws
   * light ink (for the video stage and the browser/generation overlays).
   */
  tone: 'light' | 'dark';
  speed?: number;
  title?: string;
  style?: React.CSSProperties;
};

/**
 * The demo's orb. Pins the theme and honours the same reduced-motion
 * preference as the rest of the reel — `thinking-orbs` has its own handling,
 * but the demo's hook is what every other surface here obeys, so it stays
 * authoritative.
 */
export function DemoOrb({ state, size = 20, tone, speed, title, style }: DemoOrbProps) {
  const reduced = usePrefersReducedMotion();
  return (
    <ThinkingOrb
      state={state}
      size={size}
      theme={tone}
      speed={speed}
      paused={reduced}
      aria-label={title ?? `Agent ${state}`}
      style={{ flexShrink: 0, display: 'block', ...style }}
    />
  );
}
