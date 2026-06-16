import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import UseCaseSubpageLayout from '@/components/marketing/UseCaseSubpageLayout';
import {
  allUseCaseSlugs,
  getUseCasePage,
  useCaseSocialImage,
} from '@/lib/useCaseContent';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return allUseCaseSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const page = getUseCasePage(params.slug);
  if (!page) return {};
  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: { canonical: page.meta.canonical },
    openGraph: {
      title: page.meta.title,
      description: page.meta.description,
      url: page.meta.canonical,
      images: [{ url: useCaseSocialImage, width: 1200, height: 630, alt: page.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.meta.title,
      description: page.meta.description,
      images: [{ url: useCaseSocialImage, alt: page.title }],
    },
  };
}

export default function UseCasePage({ params }: Props) {
  const page = getUseCasePage(params.slug);
  if (!page) notFound();
  return <UseCaseSubpageLayout content={page} />;
}
