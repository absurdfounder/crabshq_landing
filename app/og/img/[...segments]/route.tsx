import { constants } from 'node:fs';
import { access, readFile } from 'node:fs/promises';
import { renderOgImageBuffer } from '@/lib/og/generateImage';
import { ogPrebuiltFilePath } from '@/lib/og/prebuilt';
import { ogImagePath, parseOgImageSegments } from '@/lib/og/routes';

export const runtime = 'nodejs';

type RouteContext = {
  params: { segments?: string[] };
};

async function canRead(path: string) {
  try {
    await access(path, constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

const PNG_CACHE = 'public, max-age=31536000, immutable';

/** Legacy /og/img/* — serve prebuilt PNG if present, else render on the fly (dev). */
export async function GET(request: Request, context: RouteContext) {
  const parsed = parseOgImageSegments(context.params.segments || []);
  if (!parsed) {
    return new Response('Not found', { status: 404 });
  }

  const { kind, slug } = parsed;
  const prebuiltPath = ogPrebuiltFilePath(kind, slug);

  if (await canRead(prebuiltPath)) {
    const body = await readFile(prebuiltPath);
    return new Response(body, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': PNG_CACHE,
      },
    });
  }

  const staticUrl = ogImagePath(kind, slug);
  if (process.env.NODE_ENV === 'production') {
    return Response.redirect(new URL(staticUrl, request.url), 307);
  }

  try {
    const buffer = await renderOgImageBuffer({ kind, slug });
    if (!buffer) {
      return new Response('Not found', { status: 404 });
    }

    return new Response(buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('[og] render failed', { kind, slug, error });
    return new Response('OG render failed', {
      status: 500,
      headers: { 'Cache-Control': 'no-store' },
    });
  }
}
