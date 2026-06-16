import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import UseCaseSubpageLayout from '@/components/marketing/UseCaseSubpageLayout';
import { ogImageMeta } from '@/lib/og/url';
import {
  allUseCaseSlugs,
  getUseCasePage,
} from '@/lib/useCaseContent';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return allUseCaseSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const page = getUseCasePage(params.slug);
  if (!page) return {};
  const og = ogImageMeta('use-case', page.title, params.slug);
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

export default function UseCasePage({ params }: Props) {
  const page = getUseCasePage(params.slug);
  if (!page) notFound();
  return <UseCaseSubpageLayout content={page} />;
}
