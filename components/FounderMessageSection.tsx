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

/** Folder peeks behind notes — always inset so bounce stays in-frame. */
function PeekingFolder({ className = '' }: { className?: string }) {
  return (
    <div
      className={`founder-peek-folder pointer-events-none absolute z-0 ${className}`}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/desktop/folder.png"
        alt=""
        width={72}
        height={72}
        draggable={false}
        className="h-9 w-9 object-contain drop-shadow-md sm:h-14 sm:w-14"
      />
    </div>
  );
}

function PreviewWindow({ className = '' }: { className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-xl bg-white shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_14px_32px_-14px_rgba(26,26,26,0.38)] ring-1 ring-black/[0.08] sm:rounded-2xl sm:shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_18px_40px_-16px_rgba(26,26,26,0.38)] ${className}`}
    >
      <div className="flex items-center gap-1 border-b border-black/[0.05] bg-neutral-50 px-1.5 py-1 sm:gap-1.5 sm:px-2 sm:py-1.5">
        <span className="size-1.5 rounded-full bg-[#ff5f57] sm:size-2" />
        <span className="size-1.5 rounded-full bg-[#febc2e] sm:size-2" />
        <span className="size-1.5 rounded-full bg-[#28c840] sm:size-2" />
        <span className="mx-auto truncate text-[8px] font-medium text-neutral-400 sm:text-[9px]">
          Preview
        </span>
        <span className="w-4 sm:w-6" aria-hidden />
      </div>
      <div className="relative aspect-[3/4] bg-neutral-50">
        <Image
          src="/images/founder-portrait.png"
          alt="Vaibhav, founder of Trooper"
          fill
          className="object-cover object-top"
          sizes="160px"
          priority={false}
        />
      </div>
      <div className="border-t border-black/[0.04] bg-white px-1.5 py-1.5 sm:px-2.5 sm:py-2">
        <p className="truncate text-[9px] font-semibold tracking-tight text-neutral-800 sm:text-[11px]">
          Vaibhav
        </p>
        <a
          href="https://twitter.com/absurdfounder"
          target="_blank"
          rel="noopener noreferrer"
          className="block truncate text-[8px] font-medium text-ink-muted transition-colors hover:text-ink sm:text-[10px]"
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
      <style>{`
        .founder-peek-folder {
          animation: founderPeekBounce 2.4s ease-in-out infinite;
        }
        @keyframes founderPeekBounce {
          0%, 100% { transform: translateY(0) rotate(8deg); }
          50% { transform: translateY(-8px) rotate(8deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .founder-peek-folder { animation: none !important; }
        }
      `}</style>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="h2-section mx-auto">the dream.</h2>
      </div>

      {/*
        Mobile: single notes card in the rail; preview + folder stay inset.
        Desktop: preview left + notes + folder peek.
      */}
      <div className="relative mx-auto mt-7 w-full max-w-4xl sm:mt-12">
        {/* Mobile */}
        <div className="sm:hidden">
          <div className="relative mx-auto w-full max-w-[19.5rem]">
            {/* Folder stays inside the top-right of this box */}
            <PeekingFolder className="right-2 top-0" />

            <div className="relative z-[1] pt-7">
              <div className="overflow-hidden rounded-2xl bg-[#fbf8f1] shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_16px_40px_-18px_rgba(26,26,26,0.35)] ring-1 ring-black/[0.08]">
                <div className="flex items-center gap-1.5 border-b border-black/[0.05] bg-[#f3eee4] px-3 py-2">
                  <TrafficLights />
                  <span className="mx-auto flex items-center gap-1.5 text-[11px] font-medium text-neutral-500">
                    <svg viewBox="0 0 16 14" className="h-3 w-3 text-amber-700/70" aria-hidden>
                      <path
                        d="M1.5 3.5a1.5 1.5 0 0 1 1.5-1.5h3l1.5 1.5H13A1.5 1.5 0 0 1 14.5 5v6a1.5 1.5 0 0 1-1.5 1.5H3A1.5 1.5 0 0 1 1.5 11Z"
                        fill="currentColor"
                      />
                    </svg>
                    notes
                  </span>
                  <span className="w-[36px]" aria-hidden />
                </div>

                <div className="px-4 pb-6 pt-5">
                  <p className="font-sans text-[14px] leading-[1.65] tracking-[-0.015em] text-neutral-600">
                    everyone deserves a fully powered agentic system that does real work for them. that
                    power should not sit only in the hands of big corporations — so we built trooper for
                    you, and made it free for anyone to use. the goal is simple:{' '}
                    <mark className="rounded-[3px] bg-[#ffe566]/90 px-0.5 text-neutral-800">
                      break out of uninspired chat interfaces and clunky terminals.
                    </mark>
                    <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[2px] animate-pulse bg-neutral-400 align-baseline" />
                  </p>

                  <div className="mt-6 flex items-end justify-between gap-3 border-t border-black/[0.04] pt-4">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span className="relative size-9 shrink-0 overflow-hidden rounded-full bg-neutral-100 ring-1 ring-black/[0.08]">
                        <Image
                          src="/images/founder-portrait.png"
                          alt=""
                          fill
                          className="object-cover object-[center_18%]"
                          sizes="36px"
                          aria-hidden
                        />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold lowercase tracking-tight text-neutral-800">
                          — vaibhav
                        </p>
                        <p className="mt-0.5 text-[11px] lowercase text-neutral-400">founder, trooper</p>
                      </div>
                    </div>
                    <p
                      aria-hidden
                      className="select-none font-display text-xl font-medium lowercase leading-none tracking-tight text-neutral-900/90"
                    >
                      trooper.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop / tablet */}
        <div className="relative z-[2] hidden items-end justify-center px-6 pt-10 sm:flex">
          <div className="relative z-[1] mb-6 w-[10.5rem] shrink-0 sm:-mr-3 lg:w-[11.5rem] lg:-mr-4">
            <PreviewWindow />
          </div>

          <div className="relative z-[2] w-full min-w-0 max-w-[26rem] pt-4 pl-1">
            <PeekingFolder className="right-1 top-0 sm:-right-1 sm:-top-2" />
            <div className="relative z-[1] overflow-hidden rounded-2xl bg-[#fbf8f1] shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_24px_60px_-20px_rgba(26,26,26,0.42)] ring-1 ring-black/[0.08]">
              <div className="flex items-center gap-2 border-b border-black/[0.05] bg-[#f3eee4] px-3.5 py-2.5">
                <TrafficLights />
                <span className="mx-auto flex items-center gap-1.5 text-[12px] font-medium text-neutral-500">
                  <svg viewBox="0 0 16 14" className="h-3.5 w-3.5 text-amber-700/70" aria-hidden>
                    <path
                      d="M1.5 3.5a1.5 1.5 0 0 1 1.5-1.5h3l1.5 1.5H13A1.5 1.5 0 0 1 14.5 5v6a1.5 1.5 0 0 1-1.5 1.5H3A1.5 1.5 0 0 1 1.5 11Z"
                      fill="currentColor"
                    />
                  </svg>
                  notes
                </span>
                <span className="w-[42px]" aria-hidden />
              </div>

              <div className="px-8 pb-12 pt-12">
                <p className="font-sans text-[18px] leading-[1.75] tracking-[-0.015em] text-neutral-600">
                  everyone deserves a fully powered agentic system that does real work for them. that
                  power should not sit only in the hands of big corporations — so we built trooper for
                  you, and made it free for anyone to use. the goal is simple:{' '}
                  <mark className="rounded-[3px] bg-[#ffe566]/90 px-0.5 text-neutral-800">
                    break out of uninspired chat interfaces and clunky terminals.
                  </mark>
                  <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[2px] animate-pulse bg-neutral-400 align-baseline" />
                </p>

                <div className="mt-11 flex items-end justify-between gap-4 border-t border-black/[0.04] pt-5">
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold lowercase tracking-tight text-neutral-800">
                      — vaibhav
                    </p>
                    <p className="mt-0.5 text-[13px] lowercase text-neutral-400">founder, trooper</p>
                  </div>
                  <p
                    aria-hidden
                    className="select-none font-display text-3xl font-medium lowercase leading-none tracking-tight text-neutral-900/90"
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
