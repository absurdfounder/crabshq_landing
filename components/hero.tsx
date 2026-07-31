'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

import HeroRotatingHeadline from './HeroRotatingHeadline';
import HeroArticleDemo from './HeroArticleDemo';
import HeroDownloadButtons from './HeroDownloadButtons';
import PixelButton from './ui/PixelButton';
import FernCircleCheckIcon from './ui/FernCircleCheckIcon';

const TRUST_ITEMS = ['Free to start', 'No credit card', 'Nothing ships without your approval'] as const;

/**
 * The hero.
 *
 * Copy stacks in one column — kicker, headline, lede, actions, reassurances —
 * at a capped measure, then the product fills the width below on a tinted
 * surface.
 *
 * It used to split the copy across a 7/5 grid, which put the paragraph and the
 * primary CTA to the *right of* the headline rather than under it, so the eye
 * had to travel sideways to find the thing to click. And the demo sat on flat
 * `bg-canvas`: a white UI on a near-white ground, which is why it read as
 * washed out at any size. A tinted ground and a real elevation fix that
 * without touching the demo itself.
 */
export default function Hero() {
  return (
    <section className="band relative bg-canvas text-ink">
      <div className="rail pt-[calc(var(--site-header-height)+2rem)] sm:pt-[calc(var(--site-header-height)+3rem)]">
        <div className="max-w-3xl">
          <p className="kicker">AI workforce</p>

          <div className="mt-4">
            <HeroRotatingHeadline />
          </div>

          <p className="lede max-w-2xl sm:text-lg">
            <b className="font-semibold text-neutral-800">Hire a workforce, not a chatbot.</b>{' '}
            Troopers write code, ship commits, run ads, answer support and file the paperwork —
            each one running a loop you approved.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <PixelButton
              href="https://app.trooper.so?ref=herolanding"
              external
              size="lg"
              tone="dark"
              className="w-full shrink-0 sm:w-auto"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Get started free
            </PixelButton>
            <HeroDownloadButtons className="w-full shrink-0 sm:w-auto" />
          </div>

          <ul
            className="mt-6 flex flex-wrap gap-x-5 gap-y-2"
            aria-label="Product highlights"
          >
            {TRUST_ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-sm text-neutral-500">
                <FernCircleCheckIcon className="h-4 w-4 shrink-0 text-fern-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/*
        The product, on a tinted pixel surface.

        Full-bleed rather than inside the rail: the surface is the band, and a
        band has no side edges. The demo itself sits on top as an elevated,
        rounded card so the white UI reads as lifted off the tint instead of
        dissolving into it.
      */}
      <div className="hero-surface relative mt-12 hidden border-t border-black/5 sm:mt-16 lg:block">
        <div className="rail py-10 lg:py-14">
          <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5">
            <HeroArticleDemo rotate />
          </div>
        </div>
      </div>
    </section>
  );
}
