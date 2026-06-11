'use client';

import { useState } from 'react';
import { getFaviconUrl } from '@/lib/favicon';

export function DemoFavicon({
  domain,
  size = 16,
  alt,
  className = '',
  rounded = 'md',
}: {
  domain: string;
  size?: number;
  alt?: string;
  className?: string;
  rounded?: 'full' | 'md' | 'sm' | 'none';
}) {
  const [failed, setFailed] = useState(false);
  const label = (alt || domain.split('.')[0] || '?').slice(0, 2).toUpperCase();
  const radius = rounded === 'full' ? '9999px' : rounded === 'md' ? '6px' : rounded === 'sm' ? '4px' : '0';

  if (failed) {
    return (
      <span
        className={className}
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F5F5F4',
          color: '#78716C',
          fontSize: Math.max(7, size * 0.38),
          fontWeight: 700,
          flexShrink: 0,
        }}
        aria-hidden
      >
        {label}
      </span>
    );
  }

  return (
    <img
      src={getFaviconUrl(domain, Math.max(size * 2, 32))}
      alt={alt || domain}
      width={size}
      height={size}
      className={className}
      onError={() => setFailed(true)}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        objectFit: 'contain',
        flexShrink: 0,
        display: 'block',
      }}
    />
  );
}
