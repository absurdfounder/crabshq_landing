import type { OgBadgeIcon } from '@/lib/og/types';

const favicon = (domain: string) =>
  `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`;

/** Compatible coding agents shown on loop / agent marketing OG cards. */
export const CODING_AGENT_BADGES: OgBadgeIcon[] = [
  { label: 'Cursor', iconUrl: favicon('cursor.com') },
  { label: 'Claude Code', iconUrl: favicon('anthropic.com') },
  { label: 'Codex', iconUrl: favicon('openai.com') },
];

export function badgesMentionedInText(text = ''): OgBadgeIcon[] {
  const lower = text.toLowerCase();
  return CODING_AGENT_BADGES.filter((badge) => lower.includes(badge.label.toLowerCase()));
}

export function mergeBadgeIcons(
  explicit: OgBadgeIcon[] | undefined,
  description: string,
): OgBadgeIcon[] | undefined {
  const fromText = badgesMentionedInText(description);
  const combined = [...(explicit || []), ...fromText];
  if (!combined.length) return undefined;
  const seen = new Set<string>();
  return combined.filter((badge) => {
    if (seen.has(badge.label)) return false;
    seen.add(badge.label);
    return true;
  });
}
