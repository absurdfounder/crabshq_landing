import type { ReactNode } from 'react';
import Image from 'next/image';

function CardFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[200px] w-full items-center justify-center sm:min-h-[220px]">
      {children}
    </div>
  );
}

export function OpenDmgIllustration() {
  return (
    <CardFrame>
      <div className="relative w-full max-w-[240px]">
        <div className="mx-auto mb-3 w-fit rounded-md bg-white px-2.5 py-1 text-[11px] font-medium text-neutral-600 shadow-sm ring-1 ring-black/5">
          Downloads
        </div>
        <div className="rounded-2xl bg-gradient-to-b from-neutral-200/80 to-neutral-300/60 px-6 pb-3 pt-4 shadow-inner">
          <div className="mx-auto flex w-fit items-end gap-3 rounded-xl bg-neutral-400/25 px-4 py-2.5 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-1">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-blue-500/30">
                <svg viewBox="0 0 24 24" className="h-6 w-6 text-blue-500" aria-hidden>
                  <path
                    fill="currentColor"
                    d="M12 2a6 6 0 0 0-6 6v1H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1V8a6 6 0 0 0-6-6Zm0 2a4 4 0 0 1 4 4v1H8V8a4 4 0 0 1 4-4Z"
                  />
                </svg>
              </div>
              <span className="text-[10px] font-medium text-neutral-700">Downloads</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white shadow-md ring-2 ring-blue-400/40">
                <span className="text-[9px] font-semibold text-neutral-500">.dmg</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardFrame>
  );
}

export function DragToApplicationsIllustration() {
  return (
    <CardFrame>
      <div className="relative flex items-center justify-center gap-4 sm:gap-6">
        <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg ring-1 ring-black/5">
          <Image
            src="/images/trooper-logomark.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>

        <svg viewBox="0 0 48 24" className="h-6 w-12 text-neutral-400" aria-hidden>
          <path
            d="M4 12h32m0 0-6-6m6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>

        <div className="relative">
          <div className="absolute -inset-3 rounded-full bg-blue-400/20 blur-xl" aria-hidden />
          <div className="relative flex h-16 w-16 flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-blue-400 to-blue-500 shadow-lg">
            <svg viewBox="0 0 24 24" className="h-8 w-8 text-white/95" aria-hidden>
              <path
                fill="currentColor"
                d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z"
              />
            </svg>
            <span className="mt-0.5 text-[8px] font-semibold text-white/90">Apps</span>
          </div>
        </div>
      </div>
    </CardFrame>
  );
}

export function OpenFromApplicationsIllustration() {
  return (
    <CardFrame>
      <div className="w-full max-w-[260px] overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-black/5">
        <div className="flex items-center gap-1.5 border-b border-neutral-100 bg-neutral-50 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex min-h-[150px]">
          <div className="w-[34%] border-r border-neutral-100 bg-neutral-50/80 p-2">
            <p className="rounded-md bg-blue-500 px-2 py-1 text-[9px] font-medium text-white">
              Applications
            </p>
            <p className="mt-2 px-2 text-[9px] text-neutral-400">Desktop</p>
            <p className="px-2 text-[9px] text-neutral-400">Documents</p>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-2 p-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 ring-2 ring-blue-400/30">
              <Image
                src="/images/trooper-logomark.png"
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
            <p className="text-[11px] font-semibold text-neutral-800">Trooper</p>
          </div>
        </div>
      </div>
    </CardFrame>
  );
}
