import type { ReactNode } from 'react';
import { DemoFavicon } from '@trooper/demo';
import { getProviderDomain } from '@trooper/demo';
import { getFaviconUrl } from '@/lib/favicon';

/**
 * Full-bleed shell inside the outer capability window.
 * Do NOT add a second traffic-light chrome — MarketingFeatureSections already owns that.
 */
export function VignetteChrome({
  label,
  children,
  className = '',
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex h-full min-h-[300px] flex-col bg-white lg:min-h-[340px] ${className}`}
      data-vignette={label}
    >
      {children}
    </div>
  );
}

export function ProviderChip({ provider, size = 16 }: { provider: string; size?: number }) {
  const domain = getProviderDomain(provider);
  if (provider === 'Trooper' || domain === 'trooper.so') {
    return (
      <img
        src="/images/trooper-logomark-64.webp"
        alt=""
        width={size}
        height={size}
        className="inline-block flex-shrink-0 object-contain"
      />
    );
  }
  if (domain) {
    return <img src={getFaviconUrl(domain, 32)} alt="" width={size} height={size} className="rounded-sm flex-shrink-0" />;
  }
  return null;
}

export function TrooperMark({ className = '' }: { className?: string }) {
  return (
    <img
      src="/images/trooper-logomark.webp"
      srcSet="/images/trooper-logomark-64.webp 64w, /images/trooper-logomark-128.webp 128w, /images/trooper-logomark-256.webp 256w, /images/trooper-logomark.webp 512w"
      sizes="(max-width: 640px) 48px, 64px"
      alt="Trooper"
      className={`object-contain ${className}`}
    />
  );
}
