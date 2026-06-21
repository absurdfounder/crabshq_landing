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

export function formatLoopCount(n: number) {
  const value = Number(n) || 0;
  if (value >= 1000) return `${(value / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  return String(value);
}

export function getAgentLabel(agentId: string) {
  return AGENT_LABELS[agentId] || agentId;
}
