import type { Skill } from '@/app/utils/helper';

/** Preserve description word casing for URL slugs, e.g. Create-and-manage-Docker-sandboxed-VM-environments */
export function skillSlugFromDescription(description = '', fallback = ''): string {
  const source = String(description || fallback || '').trim();
  if (!source) return fallback || 'Skill';

  const slug = source
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .join('-');

  return slug || fallback || 'Skill';
}

export type SkillRouteIndex = {
  bySlug: Map<string, Skill>;
  slugForSkill: Map<string, string>;
};

/** Build lookup maps for description-based skill URLs with stable collision suffixes. */
export function buildSkillRouteIndex(skills: Skill[] = []): SkillRouteIndex {
  const bySlug = new Map<string, Skill>();
  const slugForSkill = new Map<string, string>();
  const seenBase = new Map<string, number>();

  for (const skill of skills) {
    const base = skillSlugFromDescription(skill.description, skill.name || skill.id);
    const count = seenBase.get(base) || 0;
    seenBase.set(base, count + 1);

    const slug = count === 0 ? base : `${base}-${skill.id}`;
    bySlug.set(slug, skill);
    slugForSkill.set(skill.id, slug);
  }

  return { bySlug, slugForSkill };
}

export function getSkillPageSlug(skill: Skill, index?: SkillRouteIndex): string {
  const fallback = skill.name || skill.id;
  if (index) return index.slugForSkill.get(skill.id) || skillSlugFromDescription(skill.description, fallback);
  return skillSlugFromDescription(skill.description, fallback);
}

export function getSkillPagePath(skill: Skill, index?: SkillRouteIndex): string {
  return `/skill/${getSkillPageSlug(skill, index)}`;
}

export function findSkillByPageSlug(slug: string, skills: Skill[]): Skill | undefined {
  const index = buildSkillRouteIndex(skills);
  return index.bySlug.get(slug) || skills.find((skill) => skill.id === slug);
}

export function getSkillCanonicalUrl(skill: Skill, index?: SkillRouteIndex): string {
  return `https://trooper.so${getSkillPagePath(skill, index)}`;
}
