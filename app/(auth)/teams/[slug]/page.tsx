import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import SubpageLayout from '@/components/marketing/SubpageLayout';
import TeamSubpageLayout from '@/components/marketing/TeamSubpageLayout';
import {
  allTeamSlugs,
  getTeamPage,
  subpageSocialImage,
} from '@/lib/subpageContent';
import {
  getTeamPageContent,
  allRichTeamSlugs,
  teamSocialImage,
} from '@/lib/teamContent';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  const slugs = Array.from(new Set([...allTeamSlugs(), ...allRichTeamSlugs()]));
  return slugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const rich = getTeamPageContent(params.slug);
  if (rich) {
    return {
      title: rich.meta.title,
      description: rich.meta.description,
      alternates: { canonical: rich.meta.canonical },
      openGraph: {
        title: rich.meta.title,
        description: rich.meta.description,
        url: rich.meta.canonical,
        images: [{ url: teamSocialImage, width: 1200, height: 630, alt: rich.title }],
      },
      twitter: {
        card: 'summary_large_image',
        title: rich.meta.title,
        description: rich.meta.description,
        images: [{ url: teamSocialImage, alt: rich.title }],
      },
    };
  }

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
  if (params.slug === 'legal') redirect('/teams/lawyers');

  const rich = getTeamPageContent(params.slug);
  if (rich) return <TeamSubpageLayout content={rich} />;

  const page = getTeamPage(params.slug);
  if (!page) notFound();
  return <SubpageLayout content={page} />;
}
