import type { ReactNode } from 'react';
import { DemoFavicon } from '@/components/DemoFavicon';
import { getProviderDomain } from '@/lib/demoProviders';
import { getFaviconUrl } from '@/lib/favicon';

export function VignetteChrome({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex h-full min-h-[320px] flex-col justify-center p-3 sm:p-5 md:p-6">
      <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-[0_8px_24px_-8px_rgba(28,25,23,0.12)]">
        <div className="flex items-center gap-2.5 border-b border-stone-100 bg-[#FDFCFB] px-3.5 py-2">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
            <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
            <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-stone-400">{label}</span>
        </div>
        {children}
      </div>
    </div>
  );
}

export function ProviderChip({ provider, size = 16 }: { provider: string; size?: number }) {
  const domain = getProviderDomain(provider);
  if (provider === 'Trooper' || domain === 'trooper.so') {
    return (
      <img
        src="/images/trooper-logomark.png"
        alt=""
        width={size}
        height={size}
        className="inline-block flex-shrink-0 object-contain pixel-render"
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
      src="/images/trooper-logomark.png"
      alt="Trooper"
      className={`object-contain pixel-render ${className}`}
    />
  );
}
