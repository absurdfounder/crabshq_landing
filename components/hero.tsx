'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

import HeroRotatingHeadline from './HeroRotatingHeadline';
import HeroArticleDemo from './HeroArticleDemo';
import HeroDownloadButtons from './HeroDownloadButtons';
import TrooperStoryLine from './TrooperStoryLine';
import PixelButton from './ui/PixelButton';
import FernCircleCheckIcon from './ui/FernCircleCheckIcon';

const TRUST_ITEMS = ['Free to start', 'No credit card', 'Nothing ships without your approval'] as const;

export default function Hero() {
  return (
    // No local clip. The comment that used to sit here claimed the demo "uses
    // rotate + perspective and deliberately extends past the rail" — none of
    // that is true. `rotate` only selects which scenario plays, there is no
    // transform, and nothing bleeds. The page-level `hero-shell` already
    // provides the one clip this page needs.
    <section className="relative bg-canvas text-ink">
      <div className="rail">
        <div className="pb-0 pt-[calc(var(--site-header-height)+1.25rem)] sm:pt-[calc(var(--site-header-height)+1.75rem)] md:pt-[calc(var(--site-header-height)+2rem)]">
          <div className="grid min-w-0 items-start gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
            <div className="min-w-0 lg:col-span-7">
              <p className="reveal reveal__kicker kicker mb-4 sm:mb-5">AI workforce</p>

              <div className="reveal reveal__usp">
                <HeroRotatingHeadline />
              </div>

              <TrooperStoryLine className="mt-5 sm:mt-6" />
            </div>

            <div className="min-w-0 lg:col-span-5 lg:pt-8 xl:pt-10">
              <p className="max-w-full text-[15px] leading-relaxed text-ink-muted sm:text-base sm:leading-7">
                <b className="text-ink">Hire a workforce, not a chatbot.</b> Troopers{' '}
                <b className="text-trooper">write code</b>, <b className="text-trooper">ship commits</b>,{' '}
                <b className="text-trooper">run ads</b>, <b className="text-trooper">answer support</b>, and{' '}
                <b className="text-trooper">file the paperwork</b> — each one running a loop you approved.
                Powered by <span className="font-semibold text-ink">OpenClaw</span>.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:inline-flex lg:flex-nowrap">
                <PixelButton
                  href="https://app.trooper.so?ref=herolanding"
                  external
                  size="lg"
                  tone="dark"
                  className="w-full shrink-0 sm:w-auto"
                  icon={<ArrowRight className="h-4 w-4" />}
                >
                  Get Started
                </PixelButton>
                <HeroDownloadButtons className="w-full shrink-0 sm:w-auto" />
              </div>

              <ul className="fern-trust-row mt-5" aria-label="Product highlights">
                {TRUST_ITEMS.map((item) => (
                  <li key={item} className="fern-trust-row__item">
                    <FernCircleCheckIcon className="fern-trust-row__check" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* `.rail-bleed` is exactly the rail's gutter, so the demo band's
              edges land on the hairlines by construction rather than by eye.
              No top margin: the band's own py + full-width border-t is the
              section rule; 104px of stacked gap is what made it look detached. */}
          <div className="rail-bleed relative min-w-0">
            <HeroArticleDemo rotate />
          </div>
        </div>
      </div>
    </section>
  );
}
