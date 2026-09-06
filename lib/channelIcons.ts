import type { ChannelCatalogItem } from '@/lib/channelCatalog';
import { getFaviconUrl } from '@/lib/favicon';

/** Brand domain for favicon lookup — never use CDN hostname from catalog icon URLs. */
const CHANNEL_BRAND_DOMAINS: Record<string, string> = {
  slack: 'slack.com',
  whatsapp: 'whatsapp.com',
  telegram: 'telegram.org',
  discord: 'discord.com',
  signal: 'signal.org',
  imessage: 'apple.com',
  email: 'gmail.com',
  gmail: 'gmail.com',
  teams: 'teams.microsoft.com',
  // SMS uses a local iOS Messages–style mark — no Google Messages favicon.
};

/** Stable direct assets when a simple favicon is not enough. */
const CHANNEL_ICON_ASSETS: Record<string, string> = {
  imessage:
    'https://www.google.com/s2/favicons?domain=apple.com&sz=128',
  signal: 'https://signal.org/assets/images/header/logo.png',
  whatsapp: 'https://www.google.com/s2/favicons?domain=whatsapp.com&sz=128',
  telegram: 'https://www.google.com/s2/favicons?domain=telegram.org&sz=128',
  slack: 'https://www.google.com/s2/favicons?domain=slack.com&sz=128',
  discord: 'https://www.google.com/s2/favicons?domain=discord.com&sz=128',
  email: 'https://www.google.com/s2/favicons?domain=gmail.com&sz=128',
  gmail: 'https://www.google.com/s2/favicons?domain=gmail.com&sz=128',
  teams: 'https://www.google.com/s2/favicons?domain=teams.microsoft.com&sz=128',
  /** Local iOS Messages–style green bubble — not Google Messages / Android. */
  sms: '/images/channels/sms.svg',
};

/** Ordered icon candidates for a channel card (best first). */
export function getChannelIconCandidates(
  channel: Pick<ChannelCatalogItem, 'id' | 'icon'>,
  size = 32,
): string[] {
  const candidates: string[] = [];
  const asset = CHANNEL_ICON_ASSETS[channel.id];
  if (asset) candidates.push(asset);

  const brand = CHANNEL_BRAND_DOMAINS[channel.id];
  if (brand) candidates.push(getFaviconUrl(brand, size));

  if (channel.icon && !candidates.includes(channel.icon)) {
    candidates.push(channel.icon);
  }

  return candidates;
}

export function getChannelIconSrc(
  channel: Pick<ChannelCatalogItem, 'id' | 'icon'>,
  size = 32,
): string {
  return getChannelIconCandidates(channel, size)[0] ?? channel.icon;
}
