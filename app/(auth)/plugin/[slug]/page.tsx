import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import IntegrationSubpageLayout from '@/components/marketing/IntegrationSubpageLayout';
import {
  allIntegrationPageSlugs,
  getIntegrationPageByPageSlug,
  integrationSocialImage,
} from '@/lib/integrationContent';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return allIntegrationPageSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const page = getIntegrationPageByPageSlug(params.slug);
  if (!page) return {};
  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: { canonical: page.meta.canonical },
    openGraph: {
      title: page.meta.title,
      description: page.meta.description,
      url: page.meta.canonical,
      images: [{ url: integrationSocialImage, width: 1200, height: 630, alt: page.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.meta.title,
      description: page.meta.description,
      images: [{ url: integrationSocialImage, alt: page.title }],
    },
  };
}

export default function PluginPage({ params }: Props) {
  const page = getIntegrationPageByPageSlug(params.slug);
  if (!page) notFound();
  return <IntegrationSubpageLayout content={page} />;
}
