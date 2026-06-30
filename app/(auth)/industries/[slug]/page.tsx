import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import IndustrySubpageLayout from '@/components/marketing/IndustrySubpageLayout';
import { ogImageMeta } from '@/lib/og/url';
import { allIndustrySlugs, getIndustryPage } from '@/lib/industryContent';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return allIndustrySlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const page = getIndustryPage(params.slug);
  if (!page) return {};
  const og = ogImageMeta('industry', page.title, params.slug);
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

export default function IndustryPage({ params }: Props) {
  const page = getIndustryPage(params.slug);
  if (!page) notFound();
  return <IndustrySubpageLayout content={page} />;
}
