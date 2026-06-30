import { _loadFromJson, _loadFromJsonComparison, _loadSkills } from '@/app/utils/helper';
import { allAlternativeSlugs } from '@/lib/alternativeContent';
import { allChannelPageSlugs } from '@/lib/channelContent';
import { allIndustrySlugs } from '@/lib/industryContent';
import { getAllLoopSlugs } from '@/lib/loopCatalog';
import { HUB_OG_PAGES, STATIC_OG_PAGES } from '@/lib/og/staticPages';
import type { OgKind } from '@/lib/og/types';
import { allPluginPageSlugs } from '@/lib/pluginCatalog';
import { buildSkillRouteIndex } from '@/lib/skillRoutes';
import { allFeatureSlugs, allTeamSlugs } from '@/lib/subpageContent';
import { allUseCaseSlugs } from '@/lib/useCaseContent';

export type OgImageTarget = {
  kind: OgKind;
  slug?: string;
};

function pushSlug(targets: OgImageTarget[], kind: OgKind, slug: string) {
  targets.push({ kind, slug });
}

/** Every OG card the site can reference — used by the prebuild generator. */
export async function listAllOgImageTargets(): Promise<OgImageTarget[]> {
  const targets: OgImageTarget[] = [{ kind: 'home' }];

  for (const slug of Object.keys(HUB_OG_PAGES)) pushSlug(targets, 'hub', slug);
  for (const slug of Object.keys(STATIC_OG_PAGES)) pushSlug(targets, 'page', slug);
  for (const slug of allFeatureSlugs()) pushSlug(targets, 'feature', slug);
  for (const slug of allTeamSlugs()) pushSlug(targets, 'team', slug);
  for (const slug of allPluginPageSlugs()) pushSlug(targets, 'plugin', slug);
  for (const slug of allUseCaseSlugs()) pushSlug(targets, 'use-case', slug);
  for (const slug of allAlternativeSlugs()) pushSlug(targets, 'alternative', slug);
  for (const slug of allChannelPageSlugs()) pushSlug(targets, 'channel', slug);
  for (const slug of allIndustrySlugs()) pushSlug(targets, 'industry', slug);
  for (const slug of getAllLoopSlugs()) pushSlug(targets, 'loop', slug);

  const skills = await _loadSkills();
  const skillIndex = buildSkillRouteIndex(skills);
  skillIndex.bySlug.forEach((_, slug) => {
    if (slug) pushSlug(targets, 'skill', slug);
  });

  const comparisons = await _loadFromJsonComparison();
  for (const entry of comparisons) {
    if (entry.id) pushSlug(targets, 'compare', entry.id);
  }

  const showcase = await _loadFromJson(true);
  for (const entry of showcase) {
    if (entry.id) pushSlug(targets, 'showcase', entry.id);
  }

  const integrations = await _loadFromJson(false);
  for (const entry of integrations) {
    if (entry.id) pushSlug(targets, 'legacy-integration', entry.id);
  }

  return targets;
}
