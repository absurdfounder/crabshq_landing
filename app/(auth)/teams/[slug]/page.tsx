import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import SubpageLayout from '@/components/marketing/SubpageLayout';
import TeamSubpageLayout from '@/components/marketing/TeamSubpageLayout';
import { ogImageMeta } from '@/lib/og/url';
import {
  allTeamSlugs,
  getTeamPage,
} from '@/lib/subpageContent';
import {
  getTeamPageContent,
  allRichTeamSlugs,
} from '@/lib/teamContent';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  const slugs = Array.from(new Set([...allTeamSlugs(), ...allRichTeamSlugs()]));
  return slugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const rich = getTeamPageContent(params.slug);
  if (rich) {
    const og = ogImageMeta('team', rich.title, params.slug);
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

  const page = getTeamPage(params.slug);
  if (!page) return {};
  const og = ogImageMeta('team', page.title, params.slug);
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

export default function TeamPage({ params }: Props) {
  if (params.slug === 'legal') redirect('/teams/lawyers');

  const rich = getTeamPageContent(params.slug);
  if (rich) return <TeamSubpageLayout content={rich} />;

  const page = getTeamPage(params.slug);
  if (!page) notFound();
  return <SubpageLayout content={page} />;
}
