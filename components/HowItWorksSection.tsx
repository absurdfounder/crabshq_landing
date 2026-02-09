'use client';

import React, { lazy, Suspense } from 'react';
import Link from 'next/link';
import { Play } from 'lucide-react';

const TabImageHotspots = lazy(() => import('./tabbed_examples'));

export default function HowItWorksSection() {
  return (
    <section 
      className="border border-neutral-200 relative"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(186, 183, 195, 0.6) 0.7px, transparent 0.7px)',
        backgroundSize: '10px 10px',
        backgroundColor: 'rgb(255, 255, 255)',
        backgroundPosition: '0px 0px'
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:gap-12">
          {/* Text content on top */}
          <div className="pt-12 pb-4 sm:pt-20 text-center lg:text-left">
            <span className="font-silkscreen text-blue-600 mb-4 text-xs sm:text-lg">How it works</span>
            <h2 className="mt-4 font-funneldisplay font-display text-balance text-2xl sm:text-3xl md:text-4xl text-slate-800">
            One home for all product knowledge
            </h2>
            <p className="body-text mt-6 max-w-4xl text-base text-slate-600 leading-relaxed">
            Your current help center, blog, changelog, and documentation is a constant struggle to maintain. CrabsHQ gives you a fully customizable, SEO-optimized help center that our AI agent, Wonder, automatically keeps in sync with your product.

            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start">
              <Link
                href="https://app.crabshq.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex rounded-[10px] p-0.5 duration-200 hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-b from-slate-900 to-slate-950 text-white"
                aria-label="Create Your Product Knowledge Base"
              >
                <span className="flex h-full w-full items-center justify-center gap-2 rounded-[8px] border border-slate-700/80 bg-gradient-to-b from-slate-900 to-slate-900 px-6 py-3 text-base font-bold">
                  Deploy Wonder
                </span>
              </Link>
              <Link
                href="https://app.crabshq.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex rounded-[10px] p-0.5 duration-200 hover:scale-[1.02] active:scale-[0.98] ring ring-black/8 border border-white bg-gradient-to-b from-white via-white to-white shadow-sm text-slate-600"
                aria-label="See it live"
              >
                <span className="flex h-full w-full items-center justify-center gap-2 rounded-[8px] border-none bg-transparent px-6 py-3 text-base font-bold">
                  <Play className="h-5 w-5" />
                  See it live
                </span>
              </Link>
            </div>
          </div>

          {/* Tabbed section below */}
          <div className="w-full pb-12 sm:pb-16 px-2 sm:px-0">
            <Suspense
              fallback={
                <div className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-6 py-6 sm:py-8">
                  <div className="flex flex-wrap sm:flex-nowrap space-x-2 sm:space-x-4 justify-center gap-y-2 sm:gap-y-0">
                    <div className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-200 rounded text-sm">
                      Feature 1
                    </div>
                    <div className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-300 rounded font-medium text-sm">
                      Feature 2
                    </div>
                    <div className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-200 rounded text-sm">
                      Feature 3
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-full bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
                      <span className="text-gray-500 text-sm sm:text-base">
                        Loading preview...
                      </span>
                    </div>
                  </div>
                </div>
              }
            >
              <TabImageHotspots />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
