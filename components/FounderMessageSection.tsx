'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import PixelButton from '@/components/ui/PixelButton';

const getCalApiImport = () => import('@calcom/embed-react').then((mod) => mod.getCalApi);

function TrafficLights() {
  return (
    <>
      <span className="size-2.5 rounded-full bg-[#ff5f57] shadow-[inset_0_-0.5px_0.5px_rgba(0,0,0,0.25)] sm:size-3" />
      <span className="size-2.5 rounded-full bg-[#febc2e] shadow-[inset_0_-0.5px_0.5px_rgba(0,0,0,0.2)] sm:size-3" />
      <span className="size-2.5 rounded-full bg-[#28c840] shadow-[inset_0_-0.5px_0.5px_rgba(0,0,0,0.2)] sm:size-3" />
    </>
  );
}

/** Folder peeks behind notes — kept inside padded frame so it never clips. */
function PeekingFolder() {
  return (
    <div
      className="founder-peek-folder pointer-events-none absolute -right-1 -top-7 z-0 sm:-right-2 sm:-top-9"
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/desktop/folder.png"
        alt=""
        width={72}
        height={72}
        draggable={false}
        className="h-10 w-10 object-contain drop-shadow-md sm:h-14 sm:w-14"
      />
      <style>{`
        .founder-peek-folder {
          animation: founderPeekBounce 2.4s ease-in-out infinite;
        }
        @keyframes founderPeekBounce {
          0%, 100% { transform: translateY(0) rotate(8deg); }
          50% { transform: translateY(-10px) rotate(8deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .founder-peek-folder { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

function PreviewWindow({ className = '' }: { className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl bg-white shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_18px_40px_-16px_rgba(26,26,26,0.38)] ring-1 ring-black/[0.08] ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-black/[0.05] bg-neutral-50 px-2 py-1.5">
        <span className="size-2 rounded-full bg-[#ff5f57]" />
        <span className="size-2 rounded-full bg-[#febc2e]" />
        <span className="size-2 rounded-full bg-[#28c840]" />
        <span className="mx-auto truncate text-[9px] font-medium text-neutral-400">Preview</span>
        <span className="w-6" aria-hidden />
      </div>
      <div className="relative aspect-[3/4] bg-neutral-50">
        <Image
          src="/images/founder-portrait.png"
          alt="Vaibhav, founder of Trooper"
          fill
          className="object-cover object-top"
          sizes="180px"
          priority={false}
        />
      </div>
      <div className="border-t border-black/[0.04] bg-white px-2.5 py-2">
        <p className="text-[11px] font-semibold tracking-tight text-neutral-800">Vaibhav</p>
        <a
          href="https://twitter.com/absurdfounder"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] font-medium text-ink-muted transition-colors hover:text-ink"
        >
          @absurdfounder
        </a>
      </div>
    </div>
  );
}

export default function FounderMessageSection() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const loadCalApi = async () => {
        try {
          const getCalApi = await getCalApiImport();
          const cal = await getCalApi({ namespace: 'setup-call' });
          cal('ui', { hideEventTypeDetails: false, layout: 'month_view' });
        } catch {
          // Cal.com widget failed to load silently
        }
      };

      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        window.requestIdleCallback(loadCalApi);
      } else {
        setTimeout(loadCalApi, 2000);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="h2-section mx-auto">the dream.</h2>
      </div>

      {/*
        Composition: Preview left + narrower/taller notes + folder peek.
        Outer padding reserves space so the folder bounce never leaves the rail.
      */}
      <div className="relative mx-auto mt-8 max-w-4xl overflow-visible px-1 pt-8 sm:mt-12 sm:px-6 sm:pt-10">
        <div className="relative z-[2] flex flex-row items-end justify-center gap-3 sm:gap-0">
          <div className="relative z-[1] mb-2 w-[5.5rem] shrink-0 sm:mb-6 sm:w-[10.5rem] sm:-mr-3 lg:w-[11.5rem] lg:-mr-4">
            <PreviewWindow />
          </div>

          <div className="relative z-[2] w-full min-w-0 max-w-[16.5rem] pb-1 pt-2 sm:max-w-[26rem] sm:pb-0 sm:pt-4 sm:pl-1">
            <PeekingFolder />
            <div className="relative z-[1] overflow-hidden rounded-2xl bg-[#fbf8f1] shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_16px_40px_-18px_rgba(26,26,26,0.35)] ring-1 ring-black/[0.08] sm:shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_24px_60px_-20px_rgba(26,26,26,0.42)]">
              <div className="flex items-center gap-1.5 border-b border-black/[0.05] bg-[#f3eee4] px-3 py-2 sm:gap-2 sm:px-3.5 sm:py-2.5">
                <TrafficLights />
                <span className="mx-auto flex items-center gap-1.5 text-[11px] font-medium text-neutral-500 sm:text-[12px]">
                  <svg viewBox="0 0 16 14" className="h-3 w-3 text-amber-700/70 sm:h-3.5 sm:w-3.5" aria-hidden>
                    <path
                      d="M1.5 3.5a1.5 1.5 0 0 1 1.5-1.5h3l1.5 1.5H13A1.5 1.5 0 0 1 14.5 5v6a1.5 1.5 0 0 1-1.5 1.5H3A1.5 1.5 0 0 1 1.5 11Z"
                      fill="currentColor"
                    />
                  </svg>
                  notes
                </span>
                <span className="w-[36px] sm:w-[42px]" aria-hidden />
              </div>

              <div className="px-4 pb-7 pt-7 sm:px-8 sm:pb-12 sm:pt-12">
                <p className="font-sans text-[14px] leading-[1.7] tracking-[-0.015em] text-neutral-600 sm:text-[18px] sm:leading-[1.75]">
                  everyone deserves a fully powered agentic system that does real work for them. that
                  power should not sit only in the hands of big corporations — so we built trooper for
                  you, and made it free for anyone to use. the goal is simple:{' '}
                  <mark className="rounded-[3px] bg-[#ffe566]/90 px-0.5 text-neutral-800">
                    break out of uninspired chat interfaces and clunky terminals.
                  </mark>
                  <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[2px] animate-pulse bg-neutral-400 align-baseline" />
                </p>

                <div className="mt-8 flex items-end justify-between gap-3 border-t border-black/[0.04] pt-4 sm:mt-11 sm:gap-4 sm:pt-5">
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold lowercase tracking-tight text-neutral-800 sm:text-[15px]">
                      — vaibhav
                    </p>
                    <p className="mt-0.5 text-[11px] lowercase text-neutral-400 sm:text-[13px]">
                      founder, trooper
                    </p>
                  </div>
                  <p
                    aria-hidden
                    className="select-none font-display text-xl font-medium lowercase leading-none tracking-tight text-neutral-900/90 sm:text-3xl"
                  >
                    trooper.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-[2] mt-7 flex justify-center sm:mt-12">
          <PixelButton
            size="md"
            variant="outline"
            tone="dark"
            className="shrink-0 sm:text-base"
            icon={<ArrowRight className="h-4 w-4" />}
            data-cal-namespace="setup-call"
            data-cal-link="set-meeting/setup-call"
            data-cal-config='{"layout":"month_view"}'
          >
            Talk to founder
          </PixelButton>
        </div>
      </div>
    </div>
  );
}
