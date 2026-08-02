'use client';

import { useEffect, useState, type ReactNode } from 'react';

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
export default function HeroDownloadButtons({
  className = '',
  size = 'lg',
  variant = 'outline',
  tone = 'dark',
  icon,
}: {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline';
  tone?: 'brand' | 'dark' | 'light';
  icon?: ReactNode;
}) {
  // Keep the server render platform-neutral. The label updates immediately
  // after mount once the visitor's actual device is available.
  const [platform, setPlatform] = useState<Platform>('unknown');

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  const download = getPlatformDownload(platform);
  // Platform SVGs ship as near-black fills — invert on solid dark/brand faces
  // so the mark stays visible (header "Download for Mac" was black-on-black).
  const lightFace = variant === 'solid' && tone !== 'light';

  return (
    <PixelButton
      href={download.href}
      external={download.external}
      size={size}
      variant={variant}
      tone={tone}
      className={`max-sm:active:translate-x-0 max-sm:active:translate-y-0 ${className}`}
      icon={icon}
    >
      <span className="inline-flex items-center gap-2">
        <PlatformIcon
          src={download.iconSrc}
          className={lightFace ? 'brightness-0 invert' : undefined}
        />
        {download.label}
      </span>
    </PixelButton>
  );
}
