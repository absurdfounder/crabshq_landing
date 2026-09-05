'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import DeferredMount from '@/components/DeferredMount';
import LazyHeroArticleDemo from '@/components/LazyHeroArticleDemo';
import PixelButton from '@/components/ui/PixelButton';

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Ferndesk-style product showcase: centered section header, then the live
 * Trooper dashboard on the same dither ground as the old under-hero band.
 * The ground fills the page rail (not the viewport); the dashboard keeps a
 * gutter so the texture shows at the sides.
 */
export default function DashboardShowcaseSection() {
  return (
    <section className="relative bg-canvas">
      <div className="rail border-t border-[var(--color-line)] py-12 sm:py-20">
        <motion.div
          className="mx-auto w-full text-center"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          viewport={{ once: true, margin: '-40px' }}
        >
          <h2 className="h2-section mx-auto !max-w-5xl">
            Message troopers like teammates. Watch them coordinate.
          </h2>
          <p className="lede mx-auto">
            Give a task in chat. Watch it move across the board. Open any ticket for the full trace.
          </p>
          <div className="mt-6 flex justify-center sm:mt-7">
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

        {/* Dither card, inset from the rail like Loop API — not a full-bleed stripe. */}
        <motion.div
          className="hero-surface mt-9 hidden overflow-hidden rounded-2xl border border-black/[0.06] bg-white px-3 py-6 sm:mt-11 sm:px-6 sm:py-8 lg:block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease }}
          viewport={{ once: true, margin: '-60px' }}
        >
          <DeferredMount desktopOnly minHeight={520}>
            <LazyHeroArticleDemo rotate flush />
          </DeferredMount>
        </motion.div>
      </div>
    </section>
  );
}
