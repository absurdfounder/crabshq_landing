'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import PixelButton from '@/components/ui/PixelButton';

const getCalApiImport = () => import('@calcom/embed-react').then((mod) => mod.getCalApi);

function TrafficLights() {
  return (
    <>
      <span className="size-3 rounded-full bg-[#ff5f57] shadow-[inset_0_-0.5px_0.5px_rgba(0,0,0,0.25)]" />
      <span className="size-3 rounded-full bg-[#febc2e] shadow-[inset_0_-0.5px_0.5px_rgba(0,0,0,0.2)]" />
      <span className="size-3 rounded-full bg-[#28c840] shadow-[inset_0_-0.5px_0.5px_rgba(0,0,0,0.2)]" />
    </>
  );
}

/**
 * One folder peeking behind the notes window — desktop/tablet only.
 * On mobile it clips and looks broken, so it stays off.
 */
function PeekingFolder() {
  return (
    <div
      className="founder-peek-folder pointer-events-none absolute -right-6 -top-8 z-0 hidden sm:block sm:-right-10 sm:-top-10"
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/desktop/folder.png"
        alt=""
        width={72}
        height={72}
        draggable={false}
        className="h-14 w-14 object-contain drop-shadow-md sm:h-[4.5rem] sm:w-[4.5rem]"
      />
      <style>{`
        .founder-peek-folder {
          animation: founderPeekBounce 2.4s ease-in-out infinite;
        }
        @keyframes founderPeekBounce {
          0%, 100% { transform: translateY(0) rotate(8deg); }
          50% { transform: translateY(-14px) rotate(8deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .founder-peek-folder { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

function FounderAvatar({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  const dim = size === 'md' ? 'size-12' : 'size-10';
  return (
    <span
      className={`relative ${dim} shrink-0 overflow-hidden rounded-full bg-[#eef5e6] ring-1 ring-black/[0.08]`}
    >
      <Image
        src="/images/founder-portrait.png"
        alt=""
        fill
        className="object-cover object-[center_18%]"
        sizes="48px"
        aria-hidden
      />
    </span>
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
      <div className="mx-auto max-w-3xl px-1 text-center sm:px-0">
        <p className="kicker">Message from the founder</p>
        <h2 className="h2-section mx-auto mt-3">the dream.</h2>
      </div>

      <div className="relative mx-auto mt-8 max-w-3xl overflow-x-clip sm:mt-12 sm:overflow-visible">
        {/*
          Mobile: one notes card with avatar in the signature — no orphaned Preview window.
          Desktop: Preview beside notes with a peeking folder.
        */}
        <div className="relative z-[2] flex flex-col items-center sm:flex-row sm:items-end sm:justify-center sm:gap-0">
          <div className="relative z-[1] mb-0 hidden w-[11rem] shrink-0 sm:mb-6 sm:block sm:-mr-4 lg:w-[12rem] lg:-mr-5">
            <div className="overflow-hidden rounded-[14px] bg-white shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_18px_40px_-16px_rgba(26,26,26,0.38)] ring-1 ring-black/[0.08]">
              <div className="flex items-center gap-1.5 border-b border-black/[0.05] bg-neutral-50 px-2 py-1.5">
                <span className="size-2 rounded-full bg-[#ff5f57]" />
                <span className="size-2 rounded-full bg-[#febc2e]" />
                <span className="size-2 rounded-full bg-[#28c840]" />
                <span className="mx-auto truncate text-[9px] font-medium text-neutral-400">Preview</span>
                <span className="w-6" aria-hidden />
              </div>
              <div className="relative aspect-[3/4] bg-[#f4faf0]">
                <Image
                  src="/images/founder-portrait.png"
                  alt="Vaibhav, founder of Trooper"
                  fill
                  className="object-cover object-top"
                  sizes="192px"
                  priority={false}
                />
              </div>
              <div className="border-t border-black/[0.04] bg-white px-2.5 py-2">
                <p className="text-[11px] font-semibold tracking-tight text-neutral-800">Vaibhav</p>
                <a
                  href="https://twitter.com/absurdfounder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-medium text-fern-700 transition-colors hover:text-fern-800"
                >
                  @absurdfounder
                </a>
              </div>
            </div>
          </div>

          <div className="relative z-[2] w-full max-w-xl sm:max-w-[34rem]">
            <PeekingFolder />
            <div className="relative z-[1] overflow-hidden rounded-[16px] bg-[#fbf8f1] shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_24px_60px_-20px_rgba(26,26,26,0.42)] ring-1 ring-black/[0.08] sm:rounded-[18px]">
              <div className="flex items-center gap-2 border-b border-black/[0.05] bg-[#f3eee4] px-3 py-2 sm:px-3.5 sm:py-2.5">
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

              <div className="px-5 pb-6 pt-6 sm:px-10 sm:pb-10 sm:pt-11">
                <p className="font-sans text-[15px] leading-[1.65] tracking-[-0.015em] text-neutral-600 sm:text-[20px] sm:leading-[1.72]">
                  everyone deserves a fully powered agentic system that does real work for them. that
                  power should not sit only in the hands of big corporations — so we built trooper for
                  you, and made it free for anyone to use. the goal is simple:{' '}
                  <mark className="rounded-[3px] bg-[#ffe566]/90 px-0.5 text-neutral-800">
                    break out of uninspired chat interfaces and clunky terminals.
                  </mark>
                  <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[2px] animate-pulse bg-neutral-400 align-baseline" />
                </p>

                <div className="mt-7 flex items-center justify-between gap-3 border-t border-black/[0.04] pt-4 sm:mt-12 sm:items-end sm:gap-4 sm:pt-5">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="sm:hidden">
                      <FounderAvatar size="sm" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[14px] font-semibold lowercase tracking-tight text-neutral-800 sm:text-[15px]">
                        — vaibhav
                      </p>
                      <a
                        href="https://twitter.com/absurdfounder"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-0.5 block text-[12px] lowercase text-neutral-400 transition-colors hover:text-fern-700 sm:hidden sm:text-[13px]"
                      >
                        @absurdfounder
                      </a>
                      <p className="mt-0.5 hidden text-[12px] lowercase text-neutral-400 sm:block sm:text-[13px]">
                        founder, trooper
                      </p>
                    </div>
                  </div>
                  <p
                    aria-hidden
                    className="select-none font-display text-2xl font-medium lowercase leading-none tracking-tight text-neutral-900/90 sm:text-3xl"
                  >
                    trooper.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-[2] mt-8 flex justify-center sm:mt-12">
          <PixelButton
            size="lg"
            variant="outline"
            tone="dark"
            className="shrink-0"
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
