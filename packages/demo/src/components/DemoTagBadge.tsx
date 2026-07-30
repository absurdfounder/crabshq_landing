'use client';

import { Hash, Tag, Target } from 'lucide-react';

import { DemoFavicon } from './DemoFavicon';
import type { DemoTag } from './demoTaskExecution';

/**
 * Inline entity pill.
 *
 * Extracted out of demoTaskModal so the marketing site can render the same
 * pill without pulling the whole task modal — and, through it, the entire
 * demo graph — into its bundle. The type is imported type-only so
 * demoTaskExecution's runtime exports never enter the graph either.
 */
export const TAG_COLORS: Record<DemoTag['type'], { bg: string; border: string; color: string }> = {
  channel: { bg: '#F5F5F4', border: '#E7E5E4', color: '#57534E' },
  goal: { bg: '#f0f5e6', border: '#c4d9a0', color: '#284800' },
  site: { bg: '#FFFBEB', border: '#FDE68A', color: '#92400E' },
  topic: { bg: '#EFF6FF', border: '#BFDBFE', color: '#1E40AF' },
};

export function DemoTagBadge({ tag, size = 'sm' }: { tag: DemoTag; size?: 'sm' | 'xs' }) {
  const palette = TAG_COLORS[tag.type];
  const compact = size === 'xs';
  const iconSize = compact ? 10 : 11;
  const padY = compact ? 1 : 2;
  const padX = compact ? 5 : 7;
  const fontSize = compact ? 9 : 10;

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: compact ? 3 : 4,
      padding: `${padY}px ${padX}px`, borderRadius: 999,
      background: palette.bg, border: `1px solid ${palette.border}`,
      color: palette.color, fontSize, fontWeight: 600, lineHeight: 1.2,
      whiteSpace: 'nowrap', flexShrink: 0,
    }}>
      {tag.type === 'site' && tag.domain ? (
        <DemoFavicon domain={tag.domain} size={iconSize + 2} rounded="sm" />
      ) : tag.type === 'channel' ? (
        <Hash size={iconSize} strokeWidth={2.25} />
      ) : tag.type === 'goal' ? (
        <Target size={iconSize} strokeWidth={2.25} />
      ) : (
        <Tag size={iconSize} strokeWidth={2.25} />
      )}
      {tag.type === 'channel' ? `#${tag.label}` : tag.label}
    </span>
  );
}
