import type { Metadata } from 'next';
import type { OgKind } from '@/lib/og/types';
import { OG_SIZE } from '@/lib/og/render';
import { ogImagePath } from '@/lib/og/routes';

export { ogImagePath };

export function ogImageMeta(kind: OgKind, alt: string, slug?: string): Pick<Metadata, 'openGraph' | 'twitter'> {
  const url = ogImagePath(kind, slug);
  return {
    openGraph: {
      images: [{ url, width: OG_SIZE.width, height: OG_SIZE.height, alt }],
    },
    twitter: {
      card: 'summary_large_image',
      images: [{ url, alt }],
    },
  };
}
