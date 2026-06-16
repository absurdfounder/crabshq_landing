import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import AlternativeSubpageLayout from '@/components/marketing/AlternativeSubpageLayout';
import {
  allAlternativeSlugs,
  getAlternativePage,
  alternativeSocialImage,
} from '@/lib/alternativeContent';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return allAlternativeSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const page = getAlternativePage(params.slug);
  if (!page) return {};
  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: { canonical: page.meta.canonical },
    openGraph: {
      title: page.meta.title,
      description: page.meta.description,
      url: page.meta.canonical,
      images: [{ url: alternativeSocialImage, width: 1200, height: 630, alt: page.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.meta.title,
      description: page.meta.description,
      images: [{ url: alternativeSocialImage, alt: page.title }],
    },
  };
}

export default function AlternativePage({ params }: Props) {
  const page = getAlternativePage(params.slug);
  if (!page) notFound();
  return <AlternativeSubpageLayout content={page} />;
}
