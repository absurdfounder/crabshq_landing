import { ogImagePath } from '@/lib/og/routes';

/** Legacy query URLs — redirect to path-based OG routes so CDN caches do not collide. */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const kind = url.searchParams.get('kind');
  const slug = url.searchParams.get('slug') ?? undefined;

  if (!kind) {
    return new Response('Invalid kind', { status: 400 });
  }

  try {
    const target = ogImagePath(kind as Parameters<typeof ogImagePath>[0], slug);
    return Response.redirect(new URL(target, url.origin), 308);
  } catch {
    return new Response('Invalid OG request', { status: 400 });
  }
}
