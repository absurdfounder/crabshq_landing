'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight, Globe } from 'lucide-react';

import {
  DesktopAppPreview,
  MobileAppPreview,
} from '@/components/download/DownloadDevicePreviews';
import Header from '@/components/ui/header';
import PixelButton from '@/components/ui/PixelButton';
import HeroDownloadButtons from '@/components/HeroDownloadButtons';
import { PLATFORM_DOWNLOADS, type PlatformDownload } from '@/lib/platformDownload';

type DownloadRow = PlatformDownload & {
  name: string;
};

const MOBILE_ROWS: DownloadRow[] = [
  { ...PLATFORM_DOWNLOADS.ios, name: 'iOS & iPadOS' },
  { ...PLATFORM_DOWNLOADS.android, name: 'Android' },
];

const DESKTOP_ROWS: DownloadRow[] = [
  { ...PLATFORM_DOWNLOADS.mac, name: 'macOS' },
  { ...PLATFORM_DOWNLOADS.windows, name: 'Windows' },
];

function PlatformIcon({ src }: { src: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" aria-hidden className="h-5 w-5 object-contain" />
  );
}

function DownloadOptionRow({ row, isLast }: { row: DownloadRow; isLast: boolean }) {
  return (
    <div
      className={[
        'flex items-center justify-between gap-4 px-5 py-4 sm:px-6',
        isLast ? '' : 'border-b border-black/5',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-stone-50 ring-1 ring-black/5">
          <PlatformIcon src={row.iconSrc} />
        </span>
        <span className="truncate text-[15px] font-semibold text-neutral-800">{row.name}</span>
      </div>
      <PixelButton
        href={row.href}
        external={row.external}
        size="sm"
        variant="outline"
        tone="dark"
        className="shrink-0"
      >
        Download
      </PixelButton>
    </div>
  );
}

function DeviceDownloadCard({
  preview,
  rows,
}: {
  preview: ReactNode;
  rows: DownloadRow[];
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-xs ring-1 ring-black/5">
      <div className="relative border-b border-black/5 bg-stone-50">{preview}</div>
      <div>
        {rows.map((row, i) => (
          <DownloadOptionRow key={row.key} row={row} isLast={i === rows.length - 1} />
        ))}
      </div>
    </article>
  );
}

export default function DownloadClient() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Header />

      <section className="site-header-clear border-b border-black/5 bg-canvas">
        <div className="rail py-12 sm:py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="h2-section mx-auto">Trooper, wherever work happens</h1>
            <p className="lede mx-auto">
              One command center for your AI team. Available for macOS, Windows, iOS, and Android.
            </p>
            <div className="mt-6 flex justify-center sm:mt-7">
              <HeroDownloadButtons size="lg" variant="solid" tone="dark" />
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 lg:mt-14 lg:grid-cols-2">
            <DeviceDownloadCard preview={<MobileAppPreview />} rows={MOBILE_ROWS} />
            <DeviceDownloadCard preview={<DesktopAppPreview />} rows={DESKTOP_ROWS} />
          </div>
        </div>
      </section>

      <section className="border-b border-black/5 bg-white">
        <div className="rail py-10 sm:py-12">
          <div className="flex flex-col gap-6 rounded-2xl bg-stone-50 p-6 ring-1 ring-black/5 sm:p-8 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-fern-700 ring-1 ring-black/5">
                <Globe className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-neutral-800">
                  Run agents on your own computer
                </h2>
                <p className="mt-1 max-w-md text-[15px] leading-relaxed text-neutral-500">
                  Self-host on a laptop or VM.{' '}
                  <Link
                    href="/self-host"
                    className="font-medium text-neutral-800 underline-offset-2 hover:underline"
                  >
                    How it works
                  </Link>
                  , or sign in and choose Settings → AI Server → This computer.
                </p>
              </div>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <PixelButton
                href="https://app.trooper.so/settings/server"
                external
                size="md"
                tone="dark"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Set up local host
              </PixelButton>
              <PixelButton
                href="https://app.trooper.so"
                external
                size="md"
                variant="outline"
                tone="dark"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Open web app
              </PixelButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
