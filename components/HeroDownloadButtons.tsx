'use client';

import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

import PixelButton from '@/components/ui/PixelButton';
import { detectPlatform, getPlatformDownload, type Platform } from '@/lib/platformDownload';

function PlatformIcon({ src, className = '' }: { src: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" aria-hidden className={`h-4 w-4 object-contain brightness-0 invert ${className}`} />
  );
}

export default function HeroDownloadButtons() {
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
      className="w-full focus-visible:!ring-offset-[#141a10] max-sm:active:translate-x-0 max-sm:active:translate-y-0 sm:w-auto"
      labelClassName="!border-white/30 !bg-transparent !text-white hover:!bg-white/10 hover:!border-white/45"
      icon={
        download.external ? (
          <PlatformIcon src={download.iconSrc} />
        ) : (
          <Download className="h-4 w-4" strokeWidth={2} />
        )
      }
    >
      {download.label}
    </PixelButton>
  );
}
