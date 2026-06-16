import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SubpageLayout from '@/components/marketing/SubpageLayout';
import FeatureSubpageLayout from '@/components/marketing/FeatureSubpageLayout';
import { ogImageMeta } from '@/lib/og/url';
import {
  allFeatureSlugs,
  getFeaturePage,
} from '@/lib/subpageContent';
import {
  getFeaturePageContent,
  allRichFeatureSlugs,
} from '@/lib/featureContent';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  const slugs = Array.from(new Set([...allFeatureSlugs(), ...allRichFeatureSlugs()]));
  return slugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const rich = getFeaturePageContent(params.slug);
  if (rich) {
    const og = ogImageMeta('feature', rich.title, params.slug);
    return {
      title: rich.meta.title,
      description: rich.meta.description,
      alternates: { canonical: rich.meta.canonical },
      openGraph: {
        title: rich.meta.title,
        description: rich.meta.description,
        url: rich.meta.canonical,
        ...og.openGraph,
      },
      twitter: {
        title: rich.meta.title,
        description: rich.meta.description,
        ...og.twitter,
      },
    };
  }

  const page = getFeaturePage(params.slug);
  if (!page) return {};
  const og = ogImageMeta('feature', page.title, params.slug);
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

export default function FeaturePage({ params }: Props) {
  const rich = getFeaturePageContent(params.slug);
  if (rich) return <FeatureSubpageLayout content={rich} />;

  const page = getFeaturePage(params.slug);
  if (!page) notFound();
  return <SubpageLayout content={page} />;
}
