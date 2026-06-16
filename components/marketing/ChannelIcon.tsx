'use client';

import { useMemo, useState } from 'react';
import { getChannelIconCandidates } from '@/lib/channelIcons';

export default function ChannelIcon({
  channelId,
  channelName,
  iconUrl,
  size = 32,
  className = '',
}: {
  channelId: string;
  channelName: string;
  iconUrl: string;
  size?: number;
  className?: string;
}) {
  const candidates = useMemo(
    () => getChannelIconCandidates({ id: channelId, icon: iconUrl }, size),
    [channelId, iconUrl, size],
  );
  const [index, setIndex] = useState(0);
  const src = candidates[index];
  const label = channelName.slice(0, 2).toUpperCase();

  if (!src || index >= candidates.length) {
    return (
      <span
        className={`inline-flex shrink-0 items-center justify-center rounded-sm bg-slate-100 text-[10px] font-bold text-slate-500 ${className}`}
        style={{ width: size, height: size }}
        aria-hidden
      >
        {label}
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
      style={{ width: size, height: size }}
      loading="lazy"
      onError={() => setIndex((current) => current + 1)}
    />
  );
}
