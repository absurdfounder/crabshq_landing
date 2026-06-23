'use client';

import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

import HeroRotatingHeadline from './HeroRotatingHeadline';
import HeroArticleDemo from './HeroArticleDemo';
import HeroMarquee from './HeroMarquee';
import HeroDownloadButtons from './HeroDownloadButtons';
import PixelButton from './ui/PixelButton';

const HERO_FEATURES = [
  'Not a chatbot. Agents have roles, ranks, and objectives.',
  'Not a prompt tool. A full AI unit with org charts, memory, and mission alignment.',
  "You're command. Agents can't act without your authorization.",
] as const;

const Features = React.memo(() => (
  <ul className="space-y-3">
    {HERO_FEATURES.map((feature) => (
      <li key={feature} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-slate-600">
        <Check className="mt-0.5 h-4 w-4 shrink-0 text-trooper" strokeWidth={2.25} />
        <span>{feature}</span>
      </li>
    ))}
  </ul>
));

Features.displayName = 'HeroFeatures';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl border-l border-r border-slate-100 px-4 sm:px-6">
        <div className="pb-0 pt-24 sm:pt-28 md:pt-32 lg:pt-36">
          {/* Bento-style split: big headline left, supporting copy right */}
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
            <div className="lg:col-span-7">
              <span className="kicker mb-4 block text-base text-trooper-700 sm:text-lg">Mission briefing</span>

              <div className="reveal reveal__usp">
                <HeroRotatingHeadline />
              </div>

              <div className="mt-8 sm:mt-10">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
                  Built for your stack
                </p>
                <HeroMarquee />
              </div>
            </div>

            <div className="lg:col-span-5 lg:pt-1 xl:pt-2">
              <p className="text-[15px] leading-relaxed text-slate-600 sm:text-base sm:leading-7">
                AI units that write code, make commits, browse the web, send emails, and execute real missions — not
                just answer questions. You hold command as the board of directors. Powered by{' '}
                <span className="font-semibold text-trooper-700">OpenClaw</span>.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <PixelButton
                  href="https://app.trooper.so?ref=herolanding"
                  external
                  size="lg"
                  tone="brand"
                  className="w-full sm:w-auto"
                  icon={<ArrowRight className="h-4 w-4" />}
                >
                  Get Started for free
                </PixelButton>
                <HeroDownloadButtons />
              </div>

              <div className="mt-8 border-t border-slate-100 pt-8">
                <Features />
              </div>
            </div>
          </div>

          <div className="relative -mx-4 mt-12 sm:-mx-6 sm:mt-14 lg:mt-16">
            <HeroArticleDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
