import type { OgImageTarget } from '@/lib/og/catalog';
import { finalizeOgContent } from '@/lib/og/enrich';
import { resolveAsyncOgContent, resolveLoopOgContent } from '@/lib/og/resolveAsync';
import { resolveOgContent } from '@/lib/og/resolveContent';
import { createOgImageResponse } from '@/lib/og/render';
import { isAsyncOgKind } from '@/lib/og/routes';
import type { OgHeroContent, OgKind } from '@/lib/og/types';

export async function resolveOgImageContent(
  kind: OgKind,
  slug?: string,
): Promise<OgHeroContent | null> {
  const raw = isAsyncOgKind(kind)
    ? await resolveAsyncOgContent(
        kind as 'skill' | 'compare' | 'showcase' | 'legacy-integration',
        slug,
      )
    : kind === 'loop'
      ? resolveLoopOgContent(slug)
      : resolveOgContent(kind, slug);

  return finalizeOgContent(raw, kind, slug);
}

export async function renderOgImageBuffer(target: OgImageTarget): Promise<Buffer | null> {
  const content = await resolveOgImageContent(target.kind, target.slug);
  if (!content) return null;

  const response = await createOgImageResponse(content);
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
