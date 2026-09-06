'use client';

import { useMemo, useState } from 'react';
import { getFaviconUrl } from '@/lib/favicon';

type FieldCommsChannelIconProps = {
  channelId: string;
  size?: number;
  className?: string;
};

/** Brand domains → Google s2 favicons (real app icons, not handmade SVGs). */
const CHANNEL_FAVICON_DOMAINS: Record<string, string> = {
  imessage: 'apple.com',
  whatsapp: 'whatsapp.com',
  telegram: 'telegram.org',
  email: 'gmail.com',
  gmail: 'gmail.com',
  slack: 'slack.com',
  discord: 'discord.com',
  sms: 'messages.google.com',
  teams: 'teams.microsoft.com',
};

/** Local fallbacks if Google favicon fails (transparent-friendly where possible). */
const CHANNEL_LOCAL_FALLBACK: Record<string, string> = {
  whatsapp: '/images/desktop/dock/whatsapp.png',
  telegram: '/images/channels/telegram.png',
  slack: '/images/channels/slack.png',
  imessage: '/images/channels/imessage.png',
  teams: '/images/channels/teams.png',
  email: '/images/channels/gmail.png',
  gmail: '/images/channels/gmail.png',
};

/**
 * Real brand marks via Google's favicon service — same approach as integration pages.
 */
export default function FieldCommsChannelIcon({
  channelId,
  size = 22,
  className = '',
}: FieldCommsChannelIconProps) {
  const candidates = useMemo(() => {
    const list: string[] = [];
    const domain = CHANNEL_FAVICON_DOMAINS[channelId];
    if (domain) {
      list.push(getFaviconUrl(domain, Math.max(64, size * 2)));
      list.push(getFaviconUrl(domain, 128));
    }
    const local = CHANNEL_LOCAL_FALLBACK[channelId];
    if (local) list.push(local);
    return list;
  }, [channelId, size]);

  const [index, setIndex] = useState(0);
  const src = candidates[index];
  const r = Math.round(size * 0.22);

  if (!src || index >= candidates.length) {
    return (
      <span
        className={`inline-flex shrink-0 items-center justify-center bg-neutral-100 text-[9px] font-bold text-neutral-500 ${className}`}
        style={{ width: size, height: size, borderRadius: r }}
        aria-hidden
      >
        {channelId.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- brand favicon from Google s2
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      className={`shrink-0 object-contain ${className}`}
      style={{ width: size, height: size, borderRadius: r }}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setIndex((i) => i + 1)}
      aria-hidden
    />
  );
}
