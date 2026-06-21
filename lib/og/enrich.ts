import { resolveOgPageUrl } from '@/lib/og/pageUrls';
import type { OgHeroContent, OgKind } from '@/lib/og/types';

export function finalizeOgContent(
  content: OgHeroContent | null,
  kind: OgKind,
  slug?: string,
): OgHeroContent | null {
  if (!content) return null;
  return {
    ...content,
    pageUrl: content.pageUrl || resolveOgPageUrl(kind, slug),
  };
}
