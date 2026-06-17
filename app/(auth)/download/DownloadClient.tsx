'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Download, Globe, Monitor, Smartphone } from 'lucide-react';
import Header from '@/components/ui/header';
import { PixelMissionTag } from '@/components/PixelAtmosphere';
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
  action: 'download' | 'open';
};

const BrandIcon = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    {children}
  </svg>
);

const SiApple = ({ className }: { className?: string }) => (
  <BrandIcon className={className}>
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </BrandIcon>
);

const SiWindows = ({ className }: { className?: string }) => (
  <BrandIcon className={className}>
    <path d="M3 12V6.75l6-1.32v13.03L3 17.25V12zm6-1.32L22 3v5.75l-13 2.83V10.68zm0 2.52v5.75L22 21V15.25l-13-2.83z" />
  </BrandIcon>
);

const SiAndroid = ({ className }: { className?: string }) => (
  <BrandIcon className={className}>
    <path d="M17.523 15.341c-.703 0-1.274.573-1.274 1.274s.571 1.274 1.274 1.274 1.274-.573 1.274-1.274-.571-1.274-1.274-1.274zm-11.046 0c-.703 0-1.274.573-1.274 1.274s.571 1.274 1.274 1.274 1.274-.573 1.274-1.274-.571-1.274-1.274-1.274zm11.397-6.02 1.997-3.459a.416.416 0 0 0-.152-.567.416.416 0 0 0-.567.152l-2.022 3.503C15.147 8.246 13.651 7.74 12 7.74s-3.147.506-4.131 1.404L5.847 5.641a.416.416 0 0 0-.567-.152.416.416 0 0 0-.152.567l1.997 3.459C2.688 11.186.343 14.658 0 18.761h24c-.343-4.103-2.688-7.575-6.126-9.44z" />
  </BrandIcon>
);

const platforms: PlatformCard[] = [
  {
    key: 'mac',
    label: 'macOS',
    subtitle: 'Mac app',
    requirements: 'macOS 12+ · Universal (Intel & Apple Silicon)',
    href: 'https://github.com/absurdfounder/trooper_landing/releases/download/macos-latest/Trooper.dmg',
    cta: 'Download Mac app',
    icon: <SiApple className="h-7 w-7" />,
    group: 'desktop',
    action: 'download',
  },
  {
    key: 'windows',
    label: 'Windows',
    subtitle: 'Windows app',
    requirements: 'Windows 10 20H2+ and Windows 11 · x64',
    href: 'https://github.com/absurdfounder/trooper_landing/releases/download/windows-latest/Trooper-Windows-x64-Setup.exe',
    cta: 'Download Windows app',
    icon: <SiWindows className="h-7 w-7" />,
    group: 'desktop',
    action: 'download',
  },
  {
    key: 'ios',
    label: 'iOS',
    subtitle: 'Mobile app',
    requirements: 'Command your agents from iPhone and iPad',
    href: 'https://apps.apple.com/app/trooper',
    cta: 'Get the iOS app',
    icon: <SiApple className="h-7 w-7" />,
    group: 'mobile',
    action: 'download',
  },
  {
    key: 'android',
    label: 'Android',
    subtitle: 'Mobile app',
    requirements: 'Command your agents from Android phones and tablets',
    href: 'https://play.google.com/store/apps/details?id=com.trooper',
    cta: 'Get the Android app',
    icon: <SiAndroid className="h-7 w-7" />,
    group: 'mobile',
    action: 'download',
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
        'flex flex-col h-full p-6 sm:p-7 bg-white transition-colors',
        isRecommended ? 'ring-2 ring-trooper ring-inset bg-trooper-50/30' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="relative z-10 flex h-12 w-12 items-center justify-center border border-slate-200 bg-white text-slate-700">
          {platform.icon}
        </div>
        {isRecommended && (
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-trooper-700 bg-white border border-trooper-100 px-2 py-0.5">
            Your device
          </span>
        )}
      </div>

      <div className="mt-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
          {platform.subtitle}
        </p>
        <h3 className="mt-1 font-funneldisplay text-xl tracking-tight text-slate-900">
          {platform.label}
        </h3>
        <p className="mt-2 text-sm text-slate-500 leading-relaxed">{platform.requirements}</p>
      </div>

      <div className="mt-auto pt-6 border-t border-slate-100">
        <PixelButton
          href={platform.href}
          external
          size="md"
          tone={isRecommended ? 'brand' : 'dark'}
          variant={isRecommended ? 'solid' : 'outline'}
          icon={platform.action === 'download'
            ? <Download className="h-3.5 w-3.5" />
            : <ArrowRight className="h-3.5 w-3.5" />}
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
      <div className="flex items-center gap-2 px-4 sm:px-6 py-3 border-b border-slate-200 bg-slate-50/80">
        <span className="text-slate-500">{icon}</span>
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600">
          {title}
        </span>
      </div>
      <div className="grid sm:grid-cols-2">
        {items.map((p, i) => (
          <div
            key={p.key}
            className={[
              i % 2 === 0 ? 'sm:border-r sm:border-slate-200' : '',
              i < items.length - 1 ? 'border-b border-slate-200 sm:border-b-0' : '',
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
    <div className="bg-white min-h-screen">
      <Header />

      <div className="max-w-7xl mx-auto border-l border-r border-slate-200">
        {/* Hero */}
        <section className="dashboard-landscape-bg border-b border-slate-200">
          <div className="bg-white/90 backdrop-blur-[2px]">
            <div className="pt-24 sm:pt-28 md:pt-32 px-4 sm:px-6 lg:px-8 pb-10 md:pb-14">
              <PixelMissionTag index="01" label="Choose your surface" className="mb-4" />

              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                <div className="max-w-2xl">
                  <h1 className="font-funneldisplay text-3xl sm:text-4xl md:text-[2.75rem] tracking-tight text-slate-900 leading-tight">
                    Trooper, wherever work happens
                  </h1>
                  <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                    One command center for your AI team across Mac, Windows, iOS, Android, and web.
                  </p>
                </div>

                {recommended && (
                  <div className="shrink-0 lg:text-right">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 mb-2">
                      Recommended for you
                    </p>
                    <PixelButton
                      href={recommended.href}
                      external
                      size="lg"
                      tone="brand"
                      icon={<Download className="h-4 w-4" />}
                    >
                      {recommended.cta}
                    </PixelButton>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Platform grid */}
        <section>
          <div className="px-4 sm:px-6 lg:px-8 py-3 border-b border-slate-200">
            <span className="type-eyebrow-num">
              <span className="text-slate-400">[02]</span>&nbsp;Choose how you work
            </span>
          </div>

          <div className="border-b border-slate-200">
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

        {/* Web fallback */}
        <section className="border-t border-slate-200 bg-slate-50">
          <div className="px-4 sm:px-6 lg:px-8 py-10 md:py-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border border-slate-200 bg-white p-6 sm:p-8">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-slate-200 bg-slate-50 text-trooper">
                  <Globe className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <div>
                  <h2 className="font-funneldisplay text-xl tracking-tight text-slate-900">
                    Run agents on your own computer
                  </h2>
                  <p className="mt-1 text-sm text-slate-600 leading-relaxed max-w-md">
                    Sign in, choose <span className="font-medium text-slate-800">Settings → AI Server → This computer</span>,
                    then run the secure paired command for macOS or Windows.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <PixelButton
                  href="https://app.trooper.so/settings/server"
                  external
                  size="lg"
                  tone="brand"
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
