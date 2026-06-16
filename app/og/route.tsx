import { resolveOgContent } from '@/lib/og/resolveContent';
import { createOgImageResponse } from '@/lib/og/render';
import type { OgKind } from '@/lib/og/types';

export const runtime = 'nodejs';

const VALID_KINDS = new Set<OgKind>([
  'home',
  'team',
  'feature',
  'plugin',
  'use-case',
  'alternative',
  'channel',
]);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const kind = searchParams.get('kind') as OgKind | null;
  const slug = searchParams.get('slug') ?? undefined;

  if (!kind || !VALID_KINDS.has(kind)) {
    return new Response('Invalid kind', { status: 400 });
  }

  const content = resolveOgContent(kind, slug);
  if (!content) {
    return new Response('Not found', { status: 404 });
  }

  const image = await createOgImageResponse(content);
  image.headers.set(
    'Cache-Control',
    'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
  );
  return image;
}
