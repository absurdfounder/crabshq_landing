'use client';

import { useEffect, useRef } from 'react';

/**
 * Move a rail horizontally as its row passes through the viewport.
 *
 * This was originally CSS `animation-timeline: view()`, which is the elegant
 * way to do it — no listener, no main-thread work. It is also, as measured in
 * a real browser, not actually running here: the track sat frozen at exactly
 * 50% progress at every scroll position, under both programmatic scrolling and
 * real wheel input. Rather than ship motion that cannot be verified, this
 * drives the transform directly.
 *
 * It stays cheap: rAF only runs while the row is on screen, and not at all
 * under `prefers-reduced-motion`.
 *
 * @param reverse  travel right-to-left instead of left-to-right
 * @param travel   fraction of the track to move across the full pass. The
 *                 track renders its items twice, so anything up to 0.5 stays
 *                 seamless. 0.5 crosses a full copy in roughly one screen of
 *                 scrolling, which reads as a lurch; ~0.22 is about 1:1 with
 *                 the scroll and reads as drift.
 */
export function useScrollDrivenRail<T extends HTMLElement>(reverse = false, travel = 0.22) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const track = ref.current;
    if (!track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let running = false;

    const step = () => {
      const rect = track.getBoundingClientRect();
      // 0 as the row enters the bottom of the viewport, 1 as it leaves the top.
      const span = window.innerHeight + rect.height;
      const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / span));
      const distance = track.scrollWidth * travel;
      const x = reverse ? -distance * (1 - progress) : -distance * progress;
      track.style.transform = `translate3d(${x}px, 0, 0)`;
      raf = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        raf = requestAnimationFrame(step);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });

    observer.observe(track);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reverse, travel]);

  return ref;
}
