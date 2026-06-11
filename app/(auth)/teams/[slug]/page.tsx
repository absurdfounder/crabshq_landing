import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SubpageLayout from '@/components/marketing/SubpageLayout';
import {
  allTeamSlugs,
  getTeamPage,
  subpageSocialImage,
} from '@/lib/subpageContent';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return allTeamSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const page = getTeamPage(params.slug);
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

export default function TeamPage({ params }: Props) {
  const page = getTeamPage(params.slug);
  if (!page) notFound();
  return <SubpageLayout content={page} />;
}
