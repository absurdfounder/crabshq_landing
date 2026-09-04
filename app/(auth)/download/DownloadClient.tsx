'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Cable,
  Laptop,
  MessageSquare,
  RefreshCw,
  type LucideIcon,
} from 'lucide-react';

import Header from '@/components/ui/header';
import {
  PLATFORM_DOWNLOADS,
  detectPlatform,
  getPlatformDownload,
  type Platform,
  type PlatformDownload,
} from '@/lib/platformDownload';

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

const FEATURES: {
  icon: LucideIcon;
  title: string;
  body: string;
}[] = [
  {
    icon: MessageSquare,
    title: 'Command your workforce from anywhere',
    body:
      'Text agents from iMessage, Slack, WhatsApp, or the Trooper app. Review work and ship without opening a laptop.',
  },
  {
    icon: Laptop,
    title: 'Run agents on a machine you own',
    body:
      'Self-host on a laptop or VM with your keys and models. Give troopers real computer access without sending the box elsewhere.',
  },
  {
    icon: RefreshCw,
    title: 'Ship loops your team already approved',
    body:
      'Inbox triage, PR review, follow-ups — repeatable loops that run with the guardrails you set, not one-off chat sessions.',
  },
  {
    icon: Cable,
    title: 'Connect the tools you already use',
    body:
      'Browser, files, email, GitHub, Notion, and more. One prompt can move work across the stack your team already lives in.',
  },
];

function PlatformIcon({
  src,
  className = 'h-5 w-5 object-contain',
}: {
  src: string;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" aria-hidden className={className} />
  );
}

function PrimaryDownloadCta() {
  const [platform, setPlatform] = useState<Platform>('unknown');

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  const download = getPlatformDownload(platform);
  const label =
    download.key === 'mac'
      ? 'Download macOS app'
      : download.key === 'windows'
        ? 'Download Windows app'
        : download.key === 'ios'
          ? 'Download iOS app'
          : download.key === 'android'
            ? 'Download Android app'
            : 'Download apps';

  const showIcon =
    download.key === 'mac' ||
    download.key === 'ios' ||
    download.key === 'windows' ||
    download.key === 'android';

  return (
    <Link
      href={download.href}
      {...(download.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-neutral-950 px-7 text-[15px] font-medium text-white transition-colors hover:bg-neutral-800"
    >
      {showIcon ? (
        <PlatformIcon
          src={download.iconSrc}
          className="h-4 w-4 object-contain brightness-0 invert"
        />
      ) : null}
      {label}
    </Link>
  );
}

function DownloadOptionRow({ row, isLast }: { row: DownloadRow; isLast: boolean }) {
  return (
    <div
      className={[
        'flex items-center gap-3 px-4 py-4',
        isLast ? '' : 'border-b border-black/5',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2.5">
        <span className="flex size-5 shrink-0 items-center justify-center">
          <PlatformIcon src={row.iconSrc} />
        </span>
        <span className="truncate text-[15px] font-medium text-neutral-800">{row.name}</span>
      </div>
      <Link
        href={row.href}
        {...(row.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="inline-flex h-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white px-4 text-[13px] font-medium text-neutral-800 transition-colors hover:bg-neutral-50"
      >
        Download
      </Link>
    </div>
  );
}

function DeviceDownloadCard({
  imageSrc,
  imageAlt,
  rows,
  priority,
}: {
  imageSrc: string;
  imageAlt: string;
  rows: DownloadRow[];
  priority?: boolean;
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white">
      <div className="relative aspect-[784/440] w-full overflow-hidden bg-[#ededed]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-center"
        />
      </div>
      <div className="flex flex-1 flex-col">
        {rows.map((row, i) => (
          <DownloadOptionRow key={row.key} row={row} isLast={i === rows.length - 1} />
        ))}
      </div>
    </article>
  );
}

export default function DownloadClient() {
  return (
    <div className="min-h-screen bg-[#f7f7f5] text-ink">
      <Header />

      <section className="site-header-clear">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-display text-[2.35rem] leading-[1.08] tracking-tight text-neutral-900 sm:text-5xl lg:text-[3.25rem]">
              Trooper, wherever work happens
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-neutral-500 sm:text-[17px]">
              The AI workforce that doesn&apos;t just think — it ships. Available for macOS,
              Windows, iOS, and Android.
            </p>
            <div className="mt-7 flex justify-center">
              <PrimaryDownloadCta />
            </div>
          </div>

          <div className="mt-12 grid gap-5 sm:mt-14 sm:gap-6 lg:grid-cols-2">
            <DeviceDownloadCard
              imageSrc="/images/download/mobile-card.jpg"
              imageAlt="Trooper mobile app on iPhone"
              rows={MOBILE_ROWS}
              priority
            />
            <DeviceDownloadCard
              imageSrc="/images/download/desktop-card.jpg"
              imageAlt="Trooper desktop app on computer"
              rows={DESKTOP_ROWS}
              priority
            />
          </div>

          <div className="mt-16 grid gap-10 sm:mt-20 sm:gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <div key={title} className="space-y-3">
                <Icon className="size-5 text-neutral-800" strokeWidth={1.75} aria-hidden />
                <div className="space-y-2">
                  <h2 className="text-[16px] font-medium leading-snug text-neutral-800">{title}</h2>
                  <p className="text-[14px] leading-relaxed text-neutral-500">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
