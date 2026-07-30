import catalogData from '@/public/loops_catalog.json';
import { buildKickoffPrompt, buildLoopMermaid } from '@/lib/loopMermaid';
import { getLoopCapabilityRequirements } from '@/lib/loopCapabilityRequirements';

export type LoopEntry = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  trigger: string;
  official: boolean;
  hardened: boolean;
  views: number;
  installs: number;
  author: string;
  agents: string[];
  bestFitAgents: string[];
  tags: string[];
  goal: string;
  maxIterations: number;
  checkCommand: string;
  exitCondition: string;
  guardrails?: string[];
  flow: import('@/lib/loopMermaid').LoopFlow;
  kickoffPrompt?: string;
  related?: string[];
  inspiredBy?: {
    company: string;
    url: string;
  };
  requirements?: import('@/lib/loopMermaid').LoopRequirements;
  tier?: 'official' | 'draft';
};

export type EnrichedLoop = LoopEntry & {
  mermaid: string;
  kickoffPrompt: string;
  relatedLoops: EnrichedLoop[];
  requirements: import('@/lib/loopMermaid').LoopRequirements;
  requirementsInferred?: boolean;
};

const LOOPS = catalogData.loops as LoopEntry[];
const bySlug = new Map(LOOPS.map((loop) => [loop.slug, loop]));

export const LOOP_CATALOG_COUNT = catalogData.count;
export const LOOP_CATALOG_GENERATED_AT = catalogData.generatedAt;

const CATEGORIES = [
  'All',
  'CI',
  'Review',
  'Testing',
  'Quality',
  'Growth',
  'Website',
  'Docs',
  'Design',
  'Operations',
  'Research',
  'Product',
  'Content',
  'Security',
  'Finance',
  'Integrations',
  'Healthcare',
  'Sales',
  'Documents',
] as const;
const AGENT_LABELS: Record<string, string> = {
  'claude-code': 'Claude Code',
  cursor: 'Cursor',
  codex: 'Codex',
};

export function getLoopCategories() {
  return CATEGORIES;
}

export function getAllLoopSlugs(): string[] {
  return LOOPS.map((loop) => loop.slug);
}

function shallowLoop(loop: LoopEntry): EnrichedLoop {
  const resolved = getLoopCapabilityRequirements(loop);
  const { inferred, ...requirements } = resolved;
  const mermaid = buildLoopMermaid(loop.flow, {
    checkCommand: loop.checkCommand,
    requirements,
  });
  const kickoffPrompt = buildKickoffPrompt({ ...loop, requirements });
  return { ...loop, requirements, requirementsInferred: inferred, mermaid, kickoffPrompt, relatedLoops: [] };
}

function enrichLoop(loop: LoopEntry): EnrichedLoop {
  return {
    ...shallowLoop(loop),
    relatedLoops: getRelatedLoops(loop.related || []),
  };
}

export function getAllLoops(): EnrichedLoop[] {
  return LOOPS.map(enrichLoop);
}

export function getLoopBySlug(slug: string): EnrichedLoop | undefined {
  const loop = bySlug.get(slug);
  return loop ? enrichLoop(loop) : undefined;
}

export function getRelatedLoops(slugs: string[] = []): EnrichedLoop[] {
  return slugs
    .map((slug) => bySlug.get(slug))
    .filter(Boolean)
    .map((loop) => shallowLoop(loop as LoopEntry));
}

export function searchLoops(
  query = '',
  filters: { category?: string; trigger?: string | null } = {},
): EnrichedLoop[] {
  const q = String(query || '').trim().toLowerCase();
  const category = filters.category && filters.category !== 'All' ? filters.category : null;
  const trigger = filters.trigger || null;

  return getAllLoops().filter((loop) => {
    if (category && loop.category !== category) return false;
    if (trigger && loop.trigger !== trigger) return false;
    if (!q) return true;
    return [
      loop.title,
      loop.description,
      loop.category,
      loop.trigger,
      ...(loop.tags || []),
      loop.goal,
      loop.inspiredBy?.company,
    ]
      .join(' ')
      .toLowerCase()
      .includes(q);
  });
}

export type LoopRailItem = Pick<
  LoopEntry,
  'slug' | 'title' | 'category' | 'exitCondition'
>;

/**
 * A loop whose title and copy were written by a person.
 *
 * 82 of the 119 catalog entries get their title by appending " on Autopilot"
 * to a company tagline, which truncates into things like "The tiny computer
 * built for on Autopilot" and "AI Agents for the supply on Autopilot". Those
 * are fine on /loops, where each one sits behind a search box and has a page
 * that explains it. Six inches high in a rail on the home page they read as
 * exactly what they are, and no amount of spacing fixes that.
 *
 * The survivors share a naming convention — "X Until Green", "Lint Until
 * Clean", "Docs Until Accurate" — which is the product's actual voice.
 */
const isHandAuthored = (loop: LoopEntry) =>
  loop.official && !loop.inspiredBy && !/ on Autopilot$/.test(loop.title);

/**
 * Slim, un-enriched loops for the home rail.
 *
 * Deliberately skips `enrichLoop` (mermaid + kickoff prompt + related lookups)
 * and returns only the four fields a card renders, so a server component can
 * hand these to a client rail without shipping the whole catalog to the
 * browser.
 *
 * Ordering is round-robin across categories rather than grouped by them: the
 * rail's job is to show range, and four Testing cards in a row reads as a
 * narrow catalog even when it isn't.
 */
export function getLoopRailItems(limit = 24): LoopRailItem[] {
  const toItem = (loop: LoopEntry): LoopRailItem => ({
    slug: loop.slug,
    title: loop.title,
    category: loop.category,
    exitCondition: loop.exitCondition,
  });

  const byCategory = new Map<string, LoopEntry[]>();
  for (const loop of LOOPS.filter(isHandAuthored)) {
    const bucket = byCategory.get(loop.category) ?? [];
    bucket.push(loop);
    byCategory.set(loop.category, bucket);
  }

  // Most-installed first within each category, so if `limit` cuts the tail it
  // cuts the least interesting loops.
  const buckets = Array.from(byCategory.values())
    .map((loops) => [...loops].sort((a, b) => (b.installs || 0) - (a.installs || 0)))
    .sort((a, b) => (b[0].installs || 0) - (a[0].installs || 0));

  const out: LoopRailItem[] = [];
  for (let depth = 0; out.length < limit; depth += 1) {
    const round = buckets.filter((bucket) => bucket[depth]);
    if (round.length === 0) break;
    for (const bucket of round) {
      if (out.length >= limit) break;
      out.push(toItem(bucket[depth]));
    }
  }
  return out;
}

export function formatLoopCount(n: number) {
  const value = Number(n) || 0;
  if (value >= 1000) return `${(value / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  return String(value);
}

export function getAgentLabel(agentId: string) {
  return AGENT_LABELS[agentId] || agentId;
}
