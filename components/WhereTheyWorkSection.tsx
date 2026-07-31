'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { WORK_SURFACES, type WorkSurface } from '@/lib/whereTheyWork';
import PixelButton from './ui/PixelButton';
import { BubbleExchange } from './ui/ChatBubble';
import {
  BrowserScene,
  DesktopScene,
  DevicesScene,
} from './where-they-work/WorkSurfaceScenes';

const SCENE: Record<WorkSurface['id'], () => JSX.Element | null> = {
  desktop: DesktopScene,
  browser: BrowserScene,
  devices: DevicesScene,
};

const CTA_ICON: Partial<Record<WorkSurface['id'], { src: string; invert?: boolean }>> = {
  desktop: { src: '/images/platforms/apple.svg', invert: true },
  browser: { src: '/images/desktop/dock/chrome.svg' },
};

function CtaBrandIcon({ src, invert = false }: { src: string; invert?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      aria-hidden
      className={`h-4 w-4 object-contain ${invert ? 'brightness-0 invert' : ''}`}
    />
  );
}

/**
 * Where troopers work — desktop, browser, and every machine you own.
 * Scroll-focus + typed chat bubbles match Capabilities; CTAs carry brand icons.
 */
export default function WhereTheyWorkSection() {
  const rowRefs = useRef<Array<HTMLElement | null>>([]);
  // -1: nothing measured yet; -2: reduced motion, dimming off.
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActive(-2);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight / 2;
      let best = -1;
      let bestD = Infinity;
      rowRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="flex flex-col gap-8 sm:gap-12 lg:gap-16">
      {WORK_SURFACES.map((surface, index) => {
        const Scene = SCENE[surface.id];
        const visualFirst = index % 2 === 1;
        const dimmed = active >= 0 && index !== active;
        const focused = active === index || active === -2;
        const brand = CTA_ICON[surface.id];

        return (
          <article
            key={surface.id}
            ref={(el) => {
              rowRefs.current[index] = el;
            }}
            className={[
              'min-w-0 overflow-hidden rounded-2xl bg-white shadow-xs ring-1 ring-black/5',
              'transition-[opacity,filter,transform] duration-500 ease-out',
              dimmed ? 'scale-[0.985] opacity-40 blur-[1.5px]' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <div className="grid min-w-0 lg:grid-cols-2 lg:items-center">
              <div
                className={`flex min-w-0 flex-col justify-center px-5 py-8 sm:px-7 sm:py-10 md:px-9 md:py-12 ${
                  visualFirst ? 'lg:order-2' : ''
                }`}
              >
                <BubbleExchange ask={surface.ask} reply={surface.reply} focused={focused} />

                <h3 className="mt-6 whitespace-pre-line font-funneldisplay text-xl font-medium leading-snug tracking-tight text-ink sm:text-2xl lg:text-[1.75rem] lg:leading-[1.2]">
                  {surface.headline}
                </h3>

                <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted sm:mt-4 sm:text-[15px] sm:leading-7">
                  {surface.body}
                </p>

                {surface.meta ? (
                  <p className="mt-4 text-sm text-neutral-500">{surface.meta}</p>
                ) : null}

                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <PixelButton
                    href={surface.cta.href}
                    external={surface.cta.external}
                    size="sm"
                    tone="dark"
                    icon={
                      brand ? undefined : <ArrowRight className="h-3.5 w-3.5" />
                    }
                  >
                    {brand ? (
                      <span className="inline-flex items-center gap-2">
                        <CtaBrandIcon src={brand.src} invert={brand.invert} />
                        {surface.cta.label}
                      </span>
                    ) : (
                      surface.cta.label
                    )}
                  </PixelButton>
                  {surface.secondary ? (
                    <Link href={surface.secondary.href} className="group link-mono">
                      <span>{surface.secondary.label}</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  ) : null}
                </div>
              </div>

              <div
                className={`relative min-w-0 border-t border-[var(--color-line)] p-4 sm:p-6 lg:border-t-0 ${
                  visualFirst ? 'lg:order-1 lg:border-r' : 'lg:border-l'
                }`}
              >
                <Scene />
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
