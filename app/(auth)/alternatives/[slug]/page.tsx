import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import AlternativeSubpageLayout from '@/components/marketing/AlternativeSubpageLayout';
import { ogImageMeta } from '@/lib/og/url';
import {
  allAlternativeSlugs,
  getAlternativePage,
} from '@/lib/alternativeContent';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return allAlternativeSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const page = getAlternativePage(params.slug);
  if (!page) return {};
  const og = ogImageMeta('alternative', page.title, params.slug);
  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: { canonical: page.meta.canonical },
    openGraph: {
      title: page.meta.title,
      description: page.meta.description,
      url: page.meta.canonical,
      ...og.openGraph,
    },
    twitter: {
      title: page.meta.title,
      description: page.meta.description,
      ...og.twitter,
    },
  };
}

export default function AlternativePage({ params }: Props) {
  const page = getAlternativePage(params.slug);
  if (!page) notFound();
  return <AlternativeSubpageLayout content={page} />;
}
