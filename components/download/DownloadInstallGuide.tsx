'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';

import Header from '@/components/ui/header';

export type InstallStep = {
  illustration: ReactNode;
  text: ReactNode;
};

type DownloadInstallGuideProps = {
  manualDownloadHref: string;
  steps: InstallStep[];
};

export default function DownloadInstallGuide({ manualDownloadHref, steps }: DownloadInstallGuideProps) {
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
              href={manualDownloadHref}
              className="font-medium text-blue-600 underline decoration-blue-600/30 underline-offset-2 transition-colors hover:text-blue-700"
            >
              Download Trooper manually
            </a>
            .
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-3 sm:gap-5 lg:gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col overflow-hidden rounded-2xl bg-neutral-100 p-5 sm:p-6"
            >
              <div className="flex min-h-[220px] flex-1 items-center justify-center sm:min-h-[240px]">
                {step.illustration}
              </div>
              <p className="mt-5 text-center text-[15px] leading-relaxed text-ink-muted">{step.text}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-ink-faint sm:mt-12">
          Need another platform?{' '}
          <Link href="/download" className="font-medium text-ink underline-offset-2 hover:underline">
            View all downloads
          </Link>
        </p>
      </main>
    </div>
  );
}
