'use client';

import Link from 'next/link';
import { TrooperMarkCarousel } from '@/components/ui/TrooperMarkCarousel';

/**
 * Sitewide footer CTA — Gumloop-style centered closer with Trooper marks.
 * Replaces the old horizontal “Try Trooper now.” band.
 */
export default function Newsletter() {
  return (
    <section>
      <div className="pb-12 pt-2 md:pb-16">
        <div className="rounded-2xl border border-slate-200/80 bg-[#f6f7f8] px-6 py-14 text-center sm:px-10 sm:py-16">
          <TrooperMarkCarousel size={28} className="mx-auto mb-6 justify-center" />
          <h3 className="font-funneldisplay text-3xl leading-tight tracking-tight text-slate-950 sm:text-4xl">
            Build your team of agents
          </h3>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-slate-500 sm:text-base">
            Create AI agents that understand your business, work across your tools, and take work
            from idea to outcome.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="https://app.trooper.so?ref=cta"
              target="_blank"
              rel="noopener noreferrer"
              className="plausible-event-name=CTA+Click plausible-event-location=Newsletter inline-flex h-11 items-center rounded-lg bg-neutral-950 px-5 text-[14px] font-medium text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Explore agents
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
