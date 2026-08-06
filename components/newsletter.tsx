'use client';

import { ArrowRight, Download } from 'lucide-react';
import PixelButton from './ui/PixelButton';

export default function Newsletter() {
  // Measure, gutter and rhythm belong to the SectionShell wrapping this in
  // app/(default)/layout.tsx — this used to re-declare max-w-7xl inside the
  // shell's own padded max-w-7xl, so it sat inset from every other rail.
  return (
    <section>
      <div>
        <div className="pb-12 md:pb-16 pt-2">
          <div className="border border-slate-200 bg-canvas px-6 sm:px-10 py-10 sm:py-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
              <div className="max-w-xl">
                <h3 className="text-2xl sm:text-3xl md:text-[2rem] font-funneldisplay tracking-tight text-slate-900 leading-tight">
                  Try Trooper now.
                </h3>
                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                  Stand up AI units that write code, manage tasks, and connect to 3,000+ tools — without the overhead of hiring.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 shrink-0">
                <PixelButton
                  href="https://app.trooper.so?ref=cta"
                  external
                  size="lg"
                  tone="brand"
                  className="plausible-event-name=CTA+Click plausible-event-location=Newsletter"
                  icon={<ArrowRight className="h-4 w-4" />}
                >
                  Get Started
                </PixelButton>

                <PixelButton
                  href="https://github.com/absurdfounder/trooper_landing/releases/download/macos-latest/Trooper.dmg"
                  external
                  size="lg"
                  variant="outline"
                  tone="dark"
                  className="plausible-event-name=Download+Mac plausible-event-location=Newsletter"
                  icon={<Download className="h-4 w-4" />}
                >
                  Download Mac App
                </PixelButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
