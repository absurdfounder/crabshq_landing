'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

import HeroRotatingHeadline from './HeroRotatingHeadline';
import HeroArticleDemo from './HeroArticleDemo';
import HeroMarquee from './HeroMarquee';
import HeroDownloadButtons from './HeroDownloadButtons';
import PixelButton from './ui/PixelButton';
import FernCircleCheckIcon from './ui/FernCircleCheckIcon';

const TRUST_ITEMS = ['Free to start', 'No credit card', 'OpenClaw-powered'] as const;

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-canvas text-ink">
      <div className="mx-auto max-w-7xl border-l border-r border-[var(--color-line)] px-4 sm:px-6">
        <div className="pb-0 pt-[calc(var(--site-header-height)+1.25rem)] sm:pt-[calc(var(--site-header-height)+1.75rem)] md:pt-[calc(var(--site-header-height)+2rem)]">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
            <div className="lg:col-span-7">
              <p className="reveal reveal__kicker kicker mb-4 sm:mb-5">AI workforce</p>

              <div className="reveal reveal__usp">
                <HeroRotatingHeadline />
              </div>

              <div className="mt-8 sm:mt-10">
                <p className="mb-3 font-silkscreen text-[10px] font-bold uppercase tracking-[0.18em] text-ink-faint">
                  Built for your stack
                </p>
                <HeroMarquee />
              </div>
            </div>

            <div className="lg:col-span-5 lg:pt-8 xl:pt-10">
              <p className="text-[15px] leading-relaxed text-ink-muted sm:text-base sm:leading-7">
                AI units that write code, make commits, browse the web, send emails, and execute real
                missions — not just answer questions. You hold command as the board of directors.
                Powered by <span className="font-semibold text-ink">OpenClaw</span>.
              </p>

              <div className="mt-6 flex flex-col gap-3 lg:inline-flex lg:flex-row lg:flex-nowrap lg:items-center lg:gap-2">
                <PixelButton
                  href="https://app.trooper.so?ref=herolanding"
                  external
                  size="lg"
                  tone="dark"
                  className="w-full shrink-0 lg:w-auto"
                  icon={<ArrowRight className="h-4 w-4" />}
                >
                  Get Started
                </PixelButton>
                <HeroDownloadButtons className="w-full shrink-0 lg:w-auto" />
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

          <div className="relative -mx-4 mt-10 sm:-mx-6 sm:mt-12 lg:mt-14">
            <HeroArticleDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
