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
    <section className="relative overflow-hidden bg-white text-slate-900">
      <div className="mx-auto max-w-7xl border-l border-r border-slate-100 px-4 sm:px-6">
        <div className="pb-0 pt-[calc(var(--site-header-height)+1.25rem)] sm:pt-[calc(var(--site-header-height)+1.75rem)] md:pt-[calc(var(--site-header-height)+2rem)]">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
            <div className="lg:col-span-7">
              <div className="reveal reveal__usp">
                <HeroRotatingHeadline />
              </div>

              <div className="mt-8 sm:mt-10">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                  Built for your stack
                </p>
                <HeroMarquee />
              </div>
            </div>

            <div className="lg:col-span-5 lg:pt-2 xl:pt-4">
              <p className="text-[15px] leading-relaxed text-slate-600 sm:text-base sm:leading-7">
                AI units that write code, make commits, browse the web, send emails, and execute real
                missions — not just answer questions. You hold command as the board of directors.
                Powered by <span className="font-semibold text-slate-900">OpenClaw</span>.
              </p>

              <div className="mt-6 flex flex-col gap-3 lg:inline-flex lg:flex-row lg:flex-nowrap lg:items-center lg:gap-2">
                <PixelButton
                  href="https://app.trooper.so?ref=herolanding"
                  external
                  size="lg"
                  tone="brand"
                  className="w-full shrink-0 lg:w-auto"
                  icon={<ArrowRight className="h-4 w-4" />}
                >
                  Get started for free
                </PixelButton>
                <HeroDownloadButtons className="w-full shrink-0 lg:w-auto" />
              </div>

              <p className="mt-5 text-xs leading-relaxed text-slate-500 sm:text-[13px]">
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
