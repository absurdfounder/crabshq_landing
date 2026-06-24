'use client';

import { useEffect } from 'react';
import Link from 'next/link';

import Header from '@/components/ui/header';
import {
  DragToApplicationsIllustration,
  OpenDmgIllustration,
  OpenFromApplicationsIllustration,
} from '@/components/download/MacInstallIllustrations';
import { MAC_DMG_URL, triggerFileDownload } from '@/lib/downloadUrls';

const INSTALL_STEPS = [
  {
    Illustration: OpenDmgIllustration,
    text: (
      <>
        Open <strong className="font-semibold text-ink">Trooper.dmg</strong> from your{' '}
        <strong className="font-semibold text-ink">Downloads</strong> folder
      </>
    ),
  },
  {
    Illustration: DragToApplicationsIllustration,
    text: (
      <>
        Drag the <strong className="font-semibold text-ink">Trooper</strong> icon into your{' '}
        <strong className="font-semibold text-ink">Applications</strong> folder
      </>
    ),
  },
  {
    Illustration: OpenFromApplicationsIllustration,
    text: (
      <>
        Open the <strong className="font-semibold text-ink">Trooper</strong> app from your{' '}
        <strong className="font-semibold text-ink">Applications</strong> folder
      </>
    ),
  },
] as const;

export default function DownloadMacClient() {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      triggerFileDownload(MAC_DMG_URL);
    }, 400);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Header />

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-[calc(var(--site-header-height)+2.5rem)] sm:px-6 sm:pb-20 sm:pt-[calc(var(--site-header-height)+3rem)]">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
            You&apos;re almost there!
          </h1>
          <p className="mt-4 text-base text-ink-muted sm:text-lg">
            Your download will begin automatically. Did not work?{' '}
            <a
              href={MAC_DMG_URL}
              className="font-medium text-blue-600 underline decoration-blue-600/30 underline-offset-2 transition-colors hover:text-blue-700"
            >
              Download Trooper manually
            </a>
            .
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-5">
          {INSTALL_STEPS.map(({ Illustration, text }, index) => (
            <div
              key={index}
              className="flex flex-col overflow-hidden rounded-2xl bg-neutral-100/80 p-4 sm:p-5"
            >
              <Illustration />
              <p className="mt-4 text-center text-sm leading-relaxed text-ink-muted">{text}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-ink-faint">
          Need another platform?{' '}
          <Link href="/download" className="font-medium text-ink underline-offset-2 hover:underline">
            View all downloads
          </Link>
        </p>
      </main>
    </div>
  );
}
