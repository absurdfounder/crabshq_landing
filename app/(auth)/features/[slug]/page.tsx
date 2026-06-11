import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SubpageLayout from '@/components/marketing/SubpageLayout';
import {
  allFeatureSlugs,
  getFeaturePage,
  subpageSocialImage,
} from '@/lib/subpageContent';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return allFeatureSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const page = getFeaturePage(params.slug);
  if (!page) return {};
  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: { canonical: page.meta.canonical },
    openGraph: {
      title: page.meta.title,
      description: page.meta.description,
      url: page.meta.canonical,
      images: [{ url: subpageSocialImage, width: 1200, height: 630, alt: page.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.meta.title,
      description: page.meta.description,
      images: [{ url: subpageSocialImage, alt: page.title }],
    },
  };
}

export default function FeaturePage({ params }: Props) {
  const page = getFeaturePage(params.slug);
  if (!page) notFound();
  return <SubpageLayout content={page} />;
}
