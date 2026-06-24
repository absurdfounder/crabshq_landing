'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Download, Globe, Monitor, Smartphone } from 'lucide-react';
import Header from '@/components/ui/header';
import PixelButton from '@/components/ui/PixelButton';

type Platform = 'mac' | 'windows' | 'ios' | 'android' | 'web' | 'unknown';

type PlatformCard = {
  key: Platform;
  label: string;
  subtitle: string;
  requirements: string;
  href: string;
  cta: string;
  icon: React.ReactNode;
  group: 'desktop' | 'mobile';
  external: boolean;
};

function PlatformBrandIcon({ src }: { src: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" aria-hidden className="h-7 w-7 object-contain" />
  );
}

const platforms: PlatformCard[] = [
  {
    key: 'mac',
    label: 'macOS',
    subtitle: 'Mac app',
    requirements: 'macOS 12+ · Universal (Intel & Apple Silicon)',
    href: '/download/mac',
    cta: 'Download Mac app',
    icon: <PlatformBrandIcon src="/images/platforms/apple.svg" />,
    group: 'desktop',
    external: false,
  },
  {
    key: 'windows',
    label: 'Windows',
    subtitle: 'Windows app',
    requirements: 'Windows 10 20H2+ and Windows 11 · x64',
    href: '/download/windows',
    cta: 'Download Windows app',
    icon: <PlatformBrandIcon src="/images/platforms/windows.svg" />,
    group: 'desktop',
    external: false,
  },
  {
    key: 'ios',
    label: 'iOS',
    subtitle: 'Mobile app',
    requirements: 'Command your agents from iPhone and iPad',
    href: 'https://apps.apple.com/app/trooper',
    cta: 'Get the iOS app',
    icon: <PlatformBrandIcon src="/images/platforms/apple.svg" />,
    group: 'mobile',
    external: true,
  },
  {
    key: 'android',
    label: 'Android',
    subtitle: 'Mobile app',
    requirements: 'Command your agents from Android phones and tablets',
    href: 'https://play.google.com/store/apps/details?id=com.trooper',
    cta: 'Get the Android app',
    icon: <PlatformBrandIcon src="/images/platforms/android.svg" />,
    group: 'mobile',
    external: true,
  },
];

function detectPlatform(): Platform {
  if (typeof navigator === 'undefined') return 'unknown';
  const ua = navigator.userAgent.toLowerCase();
  const platform =
    (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform?.toLowerCase() ||
    navigator.platform?.toLowerCase() ||
    '';

  if (/android/.test(ua)) return 'android';
  if (/iphone|ipad|ipod/.test(ua)) return 'ios';
  if (/win/.test(platform) || /windows/.test(ua)) return 'windows';
  if (/mac/.test(platform) || /macintosh/.test(ua)) return 'mac';
  return 'web';
}

function PlatformTile({
  platform,
  detected,
}: {
  platform: PlatformCard;
  detected: Platform;
}) {
  const isRecommended = detected === platform.key;

  return (
    <div
      className={[
        'flex h-full flex-col bg-white p-6 transition-colors sm:p-7',
        isRecommended ? 'ring-2 ring-inset ring-fern/40 bg-fern-50/20' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-[var(--color-line)] bg-canvas p-2">
          {platform.icon}
        </div>
        {isRecommended ? (
          <span className="rounded-sm bg-fern-50 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-fern-800 ring-1 ring-fern-200">
            Your device
          </span>
        ) : null}
      </div>

      <div className="mt-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
          {platform.subtitle}
        </p>
        <h3 className="mt-1 font-display text-xl font-medium tracking-tight text-ink">
          {platform.label}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{platform.requirements}</p>
      </div>

      <div className="mt-auto border-t border-[var(--color-line)] pt-6">
        <PixelButton
          href={platform.href}
          external={platform.external}
          size="md"
          tone={isRecommended ? 'dark' : 'dark'}
          variant={isRecommended ? 'solid' : 'outline'}
          icon={<Download className="h-3.5 w-3.5" />}
          className="w-full justify-center"
        >
          {platform.cta}
        </PixelButton>
      </div>
    </div>
  );
}

function PlatformGroup({
  title,
  icon,
  items,
  detected,
  className = '',
}: {
  title: string;
  icon: React.ReactNode;
  items: PlatformCard[];
  detected: Platform;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-center gap-2 border-b border-[var(--color-line)] bg-canvas-warm px-4 py-3 sm:px-6">
        <span className="text-ink-faint">{icon}</span>
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink-muted">
          {title}
        </span>
      </div>
      <div className="grid sm:grid-cols-2">
        {items.map((p, i) => (
          <div
            key={p.key}
            className={[
              i % 2 === 0 ? 'sm:border-r sm:border-[var(--color-line)]' : '',
              i < items.length - 1 ? 'border-b border-[var(--color-line)] sm:border-b-0' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <PlatformTile platform={p} detected={detected} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DownloadClient() {
  const [detected, setDetected] = useState<Platform>('unknown');

  useEffect(() => {
    setDetected(detectPlatform());
  }, []);

  const desktop = platforms.filter((p) => p.group === 'desktop');
  const mobile = platforms.filter((p) => p.group === 'mobile');
  const recommended = platforms.find((p) => p.key === detected);

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Header />

      <div className="mx-auto max-w-7xl border-l border-r border-[var(--color-line)]">
        <section className="border-b border-[var(--color-line)] bg-canvas">
          <div className="px-4 pb-10 pt-[calc(var(--site-header-height)+2rem)] sm:px-6 sm:pb-12 md:pb-14 md:pt-[calc(var(--site-header-height)+2.5rem)] lg:px-8">
            <p className="kicker mb-4 text-sm sm:text-base">Downloads</p>

            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <h1 className="font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl md:text-[2.75rem]">
                  Trooper, wherever work happens
                </h1>
                <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
                  One command center for your AI team across Mac, Windows, iOS, Android, and web.
                </p>
              </div>

              {recommended ? (
                <div className="shrink-0 lg:text-right">
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                    Recommended for you
                  </p>
                  <PixelButton
                    href={recommended.href}
                    external={recommended.external}
                    size="lg"
                    tone="dark"
                    icon={<Download className="h-4 w-4" />}
                  >
                    {recommended.cta}
                  </PixelButton>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-sm bg-white shadow-sm ring-1 ring-black/5">
          <div className="border-b border-[var(--color-line)] px-4 py-3 sm:px-6 lg:px-8">
            <span className="type-eyebrow-num">
              <span className="text-ink-faint">[02]</span>&nbsp;Choose how you work
            </span>
          </div>

          <div className="border-b border-[var(--color-line)]">
            <PlatformGroup
              title="Desktop apps"
              icon={<Monitor className="h-4 w-4" strokeWidth={2} />}
              items={desktop}
              detected={detected}
            />
          </div>

          <PlatformGroup
            title="Mobile apps"
            icon={<Smartphone className="h-4 w-4" strokeWidth={2} />}
            items={mobile}
            detected={detected}
          />
        </section>

        <section className="border-t border-[var(--color-line)] bg-canvas-warm">
          <div className="px-4 py-10 sm:px-6 md:py-12 lg:px-8">
            <div className="flex flex-col gap-6 rounded-sm bg-white p-6 ring-1 ring-black/5 sm:p-8 md:flex-row md:items-center md:justify-between">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-[var(--color-line)] bg-canvas text-fern">
                  <Globe className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <div>
                  <h2 className="font-display text-xl font-medium tracking-tight text-ink">
                    Run agents on your own computer
                  </h2>
                  <p className="mt-1 max-w-md text-sm leading-relaxed text-ink-muted">
                    Sign in, choose{' '}
                    <span className="font-medium text-ink">Settings → AI Server → This computer</span>,
                    then run the secure paired command for macOS or Windows.
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <PixelButton
                  href="https://app.trooper.so/settings/server"
                  external
                  size="lg"
                  tone="dark"
                  icon={<ArrowRight className="h-4 w-4" />}
                >
                  Set up local host
                </PixelButton>
                <PixelButton
                  href="https://app.trooper.so"
                  external
                  size="lg"
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
    </div>
  );
}
