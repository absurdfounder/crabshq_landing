'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import DeferredMount from '@/components/DeferredMount';
import LazyHeroArticleDemo from '@/components/LazyHeroArticleDemo';
import PixelButton from '@/components/ui/PixelButton';
import { useHomeMode } from '@/components/home/HomeModeContext';

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Ferndesk-style product showcase: centered section header, then the live
 * Trooper dashboard on the same dither ground as the old under-hero band.
 * Mobile gets a flush (non-rotated) demo so the section isn’t text-only.
 */
export default function DashboardShowcaseSection() {
  const { isPersonal } = useHomeMode();

  return (
    <section className="relative bg-canvas">
      <div className="rail border-t border-[var(--color-line)] py-9 sm:py-16 lg:py-20">
        <p className="mb-5 flex items-baseline justify-start gap-2 text-left sm:mb-7 sm:justify-center sm:text-center">
          <span className="font-mono text-[11px] tabular-nums text-ink-faint sm:text-[12px]">02</span>
          <span className="kicker !inline">Product</span>
        </p>
        <motion.div
          className="mx-auto w-full min-w-0 text-left sm:text-center"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          viewport={{ once: true, margin: '-40px' }}
        >
          <h2 className="h2-section mx-auto !max-w-5xl text-balance">
            {isPersonal
              ? 'Message Buddy like a teammate. Watch work move.'
              : 'Message troopers like teammates. Watch them coordinate.'}
          </h2>
          <p className="lede mx-auto">
            {isPersonal
              ? 'Give Buddy a task in chat. Follow the full trace from start to sign-off.'
              : 'Give a task in chat. Watch it move across the board. Open any ticket for the full trace.'}
          </p>
          <div className="mt-6 flex justify-start sm:mt-7 sm:justify-center">
            <PixelButton
              href="https://app.trooper.so"
              external
              size="md"
              tone="dark"
              icon={<ArrowRight className="h-3.5 w-3.5" />}
            >
              Get started free
            </PixelButton>
          </div>
        </motion.div>

        {/* Mobile / tablet: flush product frame (no rotate — fits narrow rails). */}
        <motion.div
          className="hero-surface mt-9 overflow-hidden rounded-2xl border border-black/[0.06] bg-white lg:hidden"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.06, ease }}
          viewport={{ once: true, margin: '-40px' }}
        >
          <div className="overflow-x-clip overflow-y-hidden rounded-[inherit] px-2 py-4 sm:px-4 sm:py-6">
            <DeferredMount minHeight={280}>
              <LazyHeroArticleDemo flush maxHeight={360} />
            </DeferredMount>
          </div>
        </motion.div>

        {/* Desktop: dither card with slight rotate for presence. */}
        <motion.div
          className="hero-surface mt-9 hidden rounded-2xl border border-black/[0.06] bg-white sm:mt-11 lg:block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease }}
          viewport={{ once: true, margin: '-60px' }}
        >
          <div className="overflow-hidden rounded-[inherit] px-3 py-6 sm:px-6 sm:py-8">
            <DeferredMount desktopOnly minHeight={520}>
              <LazyHeroArticleDemo rotate flush />
            </DeferredMount>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
