import type { Metadata } from 'next';
import { ogImageMeta } from '@/lib/og/url';
import type { OgKind } from '@/lib/og/types';

type BuildPageMetadataInput = {
  title: string;
  description: string;
  canonical?: string;
  ogKind: OgKind;
  ogSlug?: string;
  ogAlt?: string;
  type?: 'website' | 'article';
  twitter?: Metadata['twitter'];
  other?: Metadata['other'];
};

/** Attach dynamic /og images to page metadata. */
export function buildPageMetadata(input: BuildPageMetadataInput): Metadata {
  const og = ogImageMeta(input.ogKind, input.ogAlt || input.title, input.ogSlug);
  return {
    title: input.title,
    description: input.description,
    alternates: input.canonical ? { canonical: input.canonical } : undefined,
    openGraph: {
      title: input.title,
      description: input.description,
      url: input.canonical,
      type: input.type || 'website',
      ...og.openGraph,
    },
    twitter: {
      title: input.title,
      description: input.description,
      ...og.twitter,
      ...input.twitter,
    },
    other: input.other,
  };
}

/** Merge OG images into existing metadata objects. */
export function mergeOgImages(
  metadata: Metadata,
  kind: OgKind,
  alt: string,
  slug?: string,
): Metadata {
  const og = ogImageMeta(kind, alt, slug);
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      ...og.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      ...metadata.twitter,
      ...og.twitter,
    },
  };
}
