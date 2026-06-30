import { getAlternativePage } from '@/lib/alternativeContent';
import { getChannelPage } from '@/lib/channelContent';
import { getIndustryPage } from '@/lib/industryContent';
import { getFeaturePage, getTeamPage } from '@/lib/subpageContent';
import { getFeaturePageContent } from '@/lib/featureContent';
import { getIntegrationPageByPageSlug } from '@/lib/integrationContent';
import { getTeamPageContent } from '@/lib/teamContent';
import { getUseCasePage } from '@/lib/useCaseContent';
import { HUB_OG_PAGES, STATIC_OG_PAGES } from '@/lib/og/staticPages';
import { resolveLoopOgContent } from '@/lib/og/resolveAsync';
import type { OgHeroContent, OgKind } from '@/lib/og/types';

const HOME_OG: OgHeroContent = {
  kind: 'home',
  eyebrowIndex: '01',
  eyebrowLabel: 'Mission briefing',
  headlineLead: 'Agents + Humans',
  headlinePrimary: 'Whole Team.',
  headlineAccent: 'One App.',
  description:
    'Fire all your employees. An AI workforce that does everything for you — code, commits, ads, deals, support. Powered by OpenClaw.',
  showSetup: true,
  singleLineHeadline: true,
  pageUrl: 'https://trooper.so',
};

function fromTitleParts(title: string, titleAccent?: string, missionLabel = 'Unit brief'): OgHeroContent {
  return {
    kind: 'team',
    eyebrowIndex: '01',
    eyebrowLabel: missionLabel,
    headlinePrimary: title,
    headlineAccent: titleAccent,
    description: '',
  };
}

export function resolveOgContent(kind: OgKind, slug?: string): OgHeroContent | null {
  if (kind === 'home') return HOME_OG;

  if (kind === 'hub') {
    return slug ? HUB_OG_PAGES[slug] ?? null : null;
  }

  if (kind === 'page') {
    return slug ? STATIC_OG_PAGES[slug] ?? null : null;
  }

  if (kind === 'loop') {
    return resolveLoopOgContent(slug);
  }

  if (!slug) return null;

  switch (kind) {
    case 'team': {
      const rich = getTeamPageContent(slug);
      if (rich) {
        return {
          kind: 'team',
          eyebrowIndex: '01',
          eyebrowLabel: rich.missionLabel,
          headlinePrimary: rich.title,
          headlineAccent: rich.titleAccent,
          description: rich.description,
          watermark: 'trooper.',
        };
      }
      const page = getTeamPage(slug);
      if (!page) return null;
      return {
        ...fromTitleParts(page.title, page.titleAccent, page.missionLabel),
        kind: 'team',
        description: page.description,
        watermark: 'trooper.',
      };
    }
    case 'feature': {
      const rich = getFeaturePageContent(slug);
      if (rich) {
        return {
          kind: 'feature',
          eyebrowIndex: '01',
          eyebrowLabel: rich.missionLabel,
          headlinePrimary: rich.title,
          headlineAccent: rich.titleAccent,
          description: rich.description,
          watermark: 'trooper.',
        };
      }
      const page = getFeaturePage(slug);
      if (!page) return null;
      return {
        kind: 'feature',
        eyebrowIndex: '01',
        eyebrowLabel: page.missionLabel,
        headlinePrimary: page.title,
        headlineAccent: page.titleAccent,
        description: page.description,
        watermark: 'trooper.',
      };
    }
    case 'plugin': {
      const page = getIntegrationPageByPageSlug(slug);
      if (!page) return null;
      return {
        kind: 'plugin',
        eyebrowIndex: '01',
        eyebrowLabel: page.missionLabel,
        headlinePrimary: page.title,
        description: page.description,
        iconUrl: page.logoUrl,
        watermark: 'trooper.',
      };
    }
    case 'use-case': {
      const page = getUseCasePage(slug);
      if (!page) return null;
      return {
        kind: 'use-case',
        eyebrowIndex: '01',
        eyebrowLabel: page.missionLabel,
        headlinePrimary: page.title,
        headlineAccent: page.titleAccent,
        description: page.description,
        watermark: 'trooper.',
      };
    }
    case 'alternative': {
      const page = getAlternativePage(slug);
      if (!page) return null;
      return {
        kind: 'alternative',
        eyebrowIndex: '01',
        eyebrowLabel: page.missionLabel,
        headlinePrimary: page.title,
        headlineAccent: page.titleAccent,
        description: page.description,
        watermark: 'trooper.',
      };
    }
    case 'channel': {
      const page = getChannelPage(slug);
      if (!page) return null;
      return {
        kind: 'channel',
        eyebrowIndex: '01',
        eyebrowLabel: page.missionLabel,
        headlinePrimary: page.title,
        headlineAccent: page.titleAccent,
        description: page.description,
        watermark: 'trooper.',
      };
    }
    case 'industry': {
      const page = getIndustryPage(slug);
      if (!page) return null;
      return {
        kind: 'industry',
        eyebrowIndex: '01',
        eyebrowLabel: page.missionLabel,
        headlinePrimary: page.title,
        headlineAccent: page.titleAccent,
        description: page.description,
        watermark: 'trooper.',
      };
    }
    default:
      return null;
  }
}
