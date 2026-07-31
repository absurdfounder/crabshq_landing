'use client';

import { useEffect, useState } from 'react';

import PixelButton from '@/components/ui/PixelButton';
import { detectPlatform, getPlatformDownload, type Platform } from '@/lib/platformDownload';

function PlatformIcon({ src, className = '' }: { src: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" aria-hidden className={`h-4 w-4 object-contain ${className}`} />
  );
}

/**
 * One download CTA for the visitor's OS (Mac / Windows / iOS / Android).
 * Detects after mount so SSR stays stable; falls back to the apps page on web.
 */
export default function HeroDownloadButtons({ className = '' }: { className?: string }) {
  const [platform, setPlatform] = useState<Platform>('mac');

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  const download = getPlatformDownload(platform);

  return (
    <PixelButton
      href={download.href}
      external={download.external}
      size="lg"
      variant="outline"
      tone="dark"
      className={`max-sm:active:translate-x-0 max-sm:active:translate-y-0 ${className}`}
    >
      <span className="inline-flex items-center gap-2">
        <PlatformIcon src={download.iconSrc} />
        {download.label}
      </span>
    </PixelButton>
  );
}
