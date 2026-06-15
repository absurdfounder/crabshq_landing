import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ChannelSubpageLayout from '@/components/marketing/ChannelSubpageLayout';
import {
  allChannelPageSlugs,
  channelSocialImage,
  getChannelPage,
} from '@/lib/channelContent';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return allChannelPageSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const page = getChannelPage(params.slug);
  if (!page) return {};
  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: { canonical: page.meta.canonical },
    openGraph: {
      title: page.meta.title,
      description: page.meta.description,
      url: page.meta.canonical,
      images: [{ url: channelSocialImage, width: 1200, height: 630, alt: page.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.meta.title,
      description: page.meta.description,
      images: [{ url: channelSocialImage, alt: page.title }],
    },
  };
}

export default function ChannelPage({ params }: Props) {
  const page = getChannelPage(params.slug);
  if (!page) notFound();
  return <ChannelSubpageLayout content={page} />;
}
