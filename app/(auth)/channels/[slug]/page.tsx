import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ChannelSubpageLayout from '@/components/marketing/ChannelSubpageLayout';
import { ogImageMeta } from '@/lib/og/url';
import {
  allChannelPageSlugs,
  getChannelPage,
} from '@/lib/channelContent';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return allChannelPageSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const page = getChannelPage(params.slug);
  if (!page) return {};
  const og = ogImageMeta('channel', page.title, params.slug);
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

export default function ChannelPage({ params }: Props) {
  const page = getChannelPage(params.slug);
  if (!page) notFound();
  return <ChannelSubpageLayout content={page} />;
}
