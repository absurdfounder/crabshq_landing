import { _loadFromJson, _loadFromJsonComparison, _loadSkills } from '@/app/utils/helper';
import { getLoopBySlug } from '@/lib/loopCatalog';
import { getInspiredByFaviconUrl } from '@/lib/loopIcons';
import { getSkillIconUrl } from '@/lib/skillIcon';
import { findSkillByPageSlug } from '@/lib/skillRoutes';
import { resolveOgPageUrl } from '@/lib/og/pageUrls';
import type { OgHeroContent } from '@/lib/og/types';

function productOg(
  kind: OgHeroContent['kind'],
  eyebrowLabel: string,
  name: string,
  description: string,
  iconUrl?: string,
  slug?: string,
): OgHeroContent {
  return {
    kind,
    eyebrowIndex: '01',
    eyebrowLabel,
    headlinePrimary: name,
    description,
    iconUrl,
    singleLineHeadline: true,
    pageUrl: slug ? resolveOgPageUrl(kind, slug) : undefined,
  };
}

export async function resolveAsyncOgContent(
  kind: 'skill' | 'compare' | 'showcase' | 'legacy-integration',
  slug?: string,
): Promise<OgHeroContent | null> {
  if (!slug) return null;

  if (kind === 'skill') {
    const skills = await _loadSkills();
    const skill = findSkillByPageSlug(slug, skills);
    if (!skill) return null;
    return productOg(
      'skill',
      `${skill.category} skill`,
      skill.name,
      skill.description,
      getSkillIconUrl(skill, 128),
      slug,
    );
  }

  if (kind === 'compare') {
    const content = await _loadFromJsonComparison();
    const item = content.find((entry: { id: string }) => entry.id === slug) as {
      product?: { name?: string; description?: string; heroimage?: string };
    } | undefined;
    if (!item?.product?.name) return null;
    return productOg(
      'compare',
      'Comparison',
      `Trooper vs ${item.product.name}`,
      item.product.description || '',
      item.product.heroimage,
      slug,
    );
  }

  if (kind === 'showcase' || kind === 'legacy-integration') {
    const content = await _loadFromJson(kind === 'legacy-integration');
    const item = content.find((entry: { id: string }) => entry.id === slug) as {
      product?: { name?: string; description?: string; logo?: string };
      proof?: { screenshot?: string };
    } | undefined;
    if (!item?.product?.name) return null;
    return productOg(
      kind,
      kind === 'showcase' ? 'Template' : 'Integration',
      item.product.name,
      item.product.description || '',
      item.product.logo || item.proof?.screenshot,
      slug,
    );
  }

  return null;
}

export function resolveLoopOgContent(slug?: string): OgHeroContent | null {
  if (!slug) return null;
  const loop = getLoopBySlug(slug);
  if (!loop) return null;
  return {
    kind: 'loop',
    eyebrowIndex: '01',
    eyebrowLabel: `${loop.category} loop`,
    headlinePrimary: loop.title,
    description: loop.description,
    iconUrl: loop.inspiredBy ? getInspiredByFaviconUrl(loop.inspiredBy.url, 128) : undefined,
    singleLineHeadline: true,
    pageUrl: resolveOgPageUrl('loop', slug),
  };
}
