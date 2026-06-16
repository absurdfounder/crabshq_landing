import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SubpageLayout from '@/components/marketing/SubpageLayout';
import FeatureSubpageLayout from '@/components/marketing/FeatureSubpageLayout';
import {
  allFeatureSlugs,
  getFeaturePage,
  subpageSocialImage,
} from '@/lib/subpageContent';
import {
  getFeaturePageContent,
  allRichFeatureSlugs,
  featureSocialImage,
} from '@/lib/featureContent';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  const slugs = Array.from(new Set([...allFeatureSlugs(), ...allRichFeatureSlugs()]));
  return slugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const rich = getFeaturePageContent(params.slug);
  if (rich) {
    return {
      title: rich.meta.title,
      description: rich.meta.description,
      alternates: { canonical: rich.meta.canonical },
      openGraph: {
        title: rich.meta.title,
        description: rich.meta.description,
        url: rich.meta.canonical,
        images: [{ url: featureSocialImage, width: 1200, height: 630, alt: rich.title }],
      },
      twitter: {
        card: 'summary_large_image',
        title: rich.meta.title,
        description: rich.meta.description,
        images: [{ url: featureSocialImage, alt: rich.title }],
      },
    };
  }

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
  const rich = getFeaturePageContent(params.slug);
  if (rich) return <FeatureSubpageLayout content={rich} />;

  const page = getFeaturePage(params.slug);
  if (!page) notFound();
  return <SubpageLayout content={page} />;
}
