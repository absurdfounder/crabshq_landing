import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import IntegrationSubpageLayout from '@/components/marketing/IntegrationSubpageLayout';
import { ogImageMeta } from '@/lib/og/url';
import {
  allIntegrationPageSlugs,
  getIntegrationPageByPageSlug,
} from '@/lib/integrationContent';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return allIntegrationPageSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const page = getIntegrationPageByPageSlug(params.slug);
  if (!page) return {};
  const og = ogImageMeta('plugin', page.title, params.slug);
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

export default function PluginPage({ params }: Props) {
  const page = getIntegrationPageByPageSlug(params.slug);
  if (!page) notFound();
  return <IntegrationSubpageLayout content={page} />;
}
