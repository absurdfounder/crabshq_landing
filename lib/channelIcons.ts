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
};

/** Stable direct assets when a simple favicon is not enough. */
const CHANNEL_ICON_ASSETS: Record<string, string> = {
  imessage:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IMessage_logo.svg/120px-IMessage_logo.svg.png',
  signal: 'https://signal.org/assets/images/header/logo.png',
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
