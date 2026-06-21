'use client';

import { useState } from 'react';

type RequirementItemIconProps = {
  src: string;
  fallback: string;
  size?: number;
  className?: string;
};

export function RequirementItemIcon({
  src,
  fallback,
  size = 20,
  className = '',
}: RequirementItemIconProps) {
  const [failed, setFailed] = useState(false);
  const initial = (fallback || '?').trim().charAt(0).toUpperCase() || '?';

  if (!src || failed) {
    return (
      <span
        className={`inline-flex shrink-0 items-center justify-center rounded-sm bg-slate-200 font-semibold text-slate-600 ${className}`}
        style={{ width: size, height: size, fontSize: Math.max(10, Math.round(size * 0.45)) }}
        aria-hidden
      >
        {initial}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      className={`shrink-0 rounded-sm object-contain ${className}`}
      onError={() => setFailed(true)}
      referrerPolicy="no-referrer"
    />
  );
}
