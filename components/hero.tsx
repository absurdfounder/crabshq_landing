'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

import HeroRotatingHeadline from './HeroRotatingHeadline';
import HeroArticleDemo from './HeroArticleDemo';
import HeroMarquee from './HeroMarquee';
import HeroDownloadButtons from './HeroDownloadButtons';
import PixelButton from './ui/PixelButton';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#141a10] text-white">
      <div className="mx-auto max-w-7xl border-l border-r border-white/[0.06] px-4 sm:px-6">
        <div className="pb-0 pt-[calc(var(--site-header-height)+1.25rem)] sm:pt-[calc(var(--site-header-height)+1.75rem)] md:pt-[calc(var(--site-header-height)+2rem)]">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
            <div className="lg:col-span-7">
              <div className="reveal reveal__usp">
                <HeroRotatingHeadline />
              </div>

              <div className="mt-8 sm:mt-10">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-white/40">
                  Built for your stack
                </p>
                <HeroMarquee theme="dark" />
              </div>
            </div>

            <div className="lg:col-span-5 lg:pt-2 xl:pt-4">
              <p className="text-[15px] leading-relaxed text-white/65 sm:text-base sm:leading-7">
                AI units that write code, make commits, browse the web, send emails, and execute real
                missions — not just answer questions. You hold command as the board of directors.
                Powered by <span className="font-semibold text-white">OpenClaw</span>.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <PixelButton
                  href="https://app.trooper.so?ref=herolanding"
                  external
                  size="lg"
                  tone="brand"
                  className="w-full focus-visible:!ring-offset-[#141a10] sm:w-auto"
                  icon={<ArrowRight className="h-4 w-4" />}
                >
                  Get started for free
                </PixelButton>
                <HeroDownloadButtons />
              </div>

              <p className="mt-5 text-xs leading-relaxed text-white/40 sm:text-[13px]">
                Free to start · OpenClaw-powered · Cancel anytime
              </p>
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
