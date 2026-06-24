import { finalizeOgContent } from '@/lib/og/enrich';
import { resolveAsyncOgContent } from '@/lib/og/resolveAsync';
import { resolveOgContent } from '@/lib/og/resolveContent';
import { createOgImageResponse } from '@/lib/og/render';
import { isAsyncOgKind, parseOgImageSegments } from '@/lib/og/routes';
import type { OgKind } from '@/lib/og/types';

export const runtime = 'nodejs';

type RouteContext = {
  params: { segments?: string[] };
};

export async function GET(_request: Request, context: RouteContext) {
  const parsed = parseOgImageSegments(context.params.segments || []);
  if (!parsed) {
    return new Response('Not found', { status: 404 });
  }

  const { kind, slug } = parsed;
  const raw = isAsyncOgKind(kind)
    ? await resolveAsyncOgContent(kind as 'skill' | 'compare' | 'showcase' | 'legacy-integration', slug)
    : resolveOgContent(kind, slug);
  const content = finalizeOgContent(raw, kind as OgKind, slug);

  if (!content) {
    return new Response('Not found', { status: 404 });
  }

  try {
    const image = await createOgImageResponse(content);
    image.headers.set(
      'Cache-Control',
      'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
    );
    return image;
  } catch (error) {
    console.error('[og] render failed', { kind, slug, error });
    return new Response('OG render failed', {
      status: 500,
      headers: { 'Cache-Control': 'no-store' },
    });
  }
}
