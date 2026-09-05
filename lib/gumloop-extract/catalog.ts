/**
 * Gumloop → Trooper extraction catalog.
 *
 * Patterns pulled from https://www.gumloop.com/ (homepage sections + CSS
 * keyframes inspected via DevTools). These live under /lab/gumloop until we
 * decide which ones to promote into the real marketing surface.
 *
 * Motion recipes are re-implemented (not imported from their CSS modules).
 * Agent silhouettes use TrooperMark, not Gumloop's brand marks.
 */

export type GumloopExtract = {
  id: string;
  title: string;
  gumloopSection: string;
  motion: string[];
  status: 'lab' | 'promoted' | 'skip';
  notes: string;
};

export const GUMLOOP_EXTRACTS: GumloopExtract[] = [
  {
    id: 'exact-mirror',
    title: 'Exact SSR + CSS mirror',
    gumloopSection: 'Full homepage (static capture)',
    motion: ['all Gumloop @keyframes (see lab-assets/gumloop/keyframes.css)'],
    status: 'lab',
    notes:
      'Fetched HTML/CSS/fonts via scripts/fetch-gumloop-exact.mjs → /lab/gumloop/exact. JS URLs in MANIFEST only.',
  },
  {
    id: 'hero-marks',
    title: 'Hero agent-mark carousel',
    gumloopSection: 'Hero — Build, share, optimize & control agents',
    motion: ['mark-carousel (scale+rotate+translate)', 'mark-float ±3px'],
    status: 'promoted',
    notes: 'Already live on TrooperCastSection via TrooperMarkCarousel.',
  },
  {
    id: 'hero-drift',
    title: 'Hero decoration drift',
    gumloopSection: 'Hero floating ornaments',
    motion: ['mark-drift (translate+rotate via CSS vars)'],
    status: 'lab',
    notes: 'Organic idle drift on marks around a headline.',
  },
  {
    id: 'dual-cta',
    title: 'Dual CTA pair',
    gumloopSection: 'Hero + nav CTAs',
    motion: ['hover scale 1.02'],
    status: 'lab',
    notes: 'Black primary + white ring secondary, 8px radius, 14px type.',
  },
  {
    id: 'product-well',
    title: 'Soft product well',
    gumloopSection: 'Hero grey rounded rectangle under CTAs',
    motion: [],
    status: 'lab',
    notes: 'Large rounded (#F3F4F6-ish) media well — calm stage for demos.',
  },
  {
    id: 'cursor-choreo',
    title: 'Agent cursor decoration',
    gumloopSection: 'Agents decoration module',
    motion: ['cursor-translate', 'cursor-rotate (click squash .92)'],
    status: 'lab',
    notes: 'Pointer that hops between marks with a click squash.',
  },
  {
    id: 'orbit',
    title: 'Orbit ring',
    gumloopSection: 'Skills / connectors orbit visuals',
    motion: ['orbit-spin', 'orbit-counter-spin', 'orbit-item-appear'],
    status: 'lab',
    notes: 'Center mark + spinning ring of satellite marks.',
  },
  {
    id: 'experts-split',
    title: 'Experts build agents',
    gumloopSection: 'Let your experts build the agents',
    motion: [],
    status: 'lab',
    notes:
      'Full extract: left copy + feature icon grid + right Data Analysis Agent product mock (sidebar, chat, funnel table).',
  },
  {
    id: 'company-brain',
    title: 'Complete context / company brain',
    gumloopSection: 'Complete context on your company',
    motion: ['orbit-spin (skills card)'],
    status: 'lab',
    notes: 'Bento: company knowledge sphere + Skills + Live activity feed.',
  },
  {
    id: 'collaborate',
    title: 'Meet your team where they work',
    gumloopSection: 'Slack / Teams / Gmail product tabs',
    motion: [],
    status: 'lab',
    notes: 'Platform picker + chat mock — Slack / Teams / Gmail.',
  },
  {
    id: 'optimize',
    title: 'Optimize Your Agents',
    gumloopSection: 'Optimize Your Agents',
    motion: ['orbit-spin (reflect loop)'],
    status: 'lab',
    notes: 'Three visual cards: cost −78%, self-improve orbit, evals flag tooltip.',
  },
  {
    id: 'enterprise-dark',
    title: 'Enterprise-grade controls',
    gumloopSection: 'Enterprise-grade controls',
    motion: [],
    status: 'lab',
    notes:
      'Dark dashboard: usage chart + At Risk, audit log, VPC, five control tiles (SSO, models, SOC2, GDPR…).',
  },
  {
    id: 'trust',
    title: 'In agents, they trust',
    gumloopSection: 'Testimonials + logos',
    motion: [],
    status: 'lab',
    notes: 'Quote-forward trust strip with a big metric.',
  },
  {
    id: 'shipped',
    title: 'Recently shipped',
    gumloopSection: 'Changelog grid',
    motion: [],
    status: 'lab',
    notes: 'Dense shipping log — title + date + one-line body.',
  },
  {
    id: 'final-cta',
    title: 'Try Trooper now (final CTA)',
    gumloopSection: 'Trooper newsletter band (preferred over Gumloop centered CTA)',
    motion: [],
    status: 'lab',
    notes:
      'Horizontal bordered band + Get Started / Download Mac App. Gumloop centered CTA kept as comparison extract.',
  },
  {
    id: 'gumloop-centered-cta',
    title: 'Gumloop centered CTA (reference)',
    gumloopSection: 'Build your team of agents',
    motion: [],
    status: 'skip',
    notes: 'Centered marks + dual CTA — reference only; Trooper prefers the horizontal band.',
  },
];

/** Gumloop settle curve used on mark carousel transitions. */
export const GUMLOOP_MARK_EASE = 'cubic-bezier(0.77, 0, 0.175, 1)';

/** Agent rainbow solids inspected from Gumloop hero SVGs. */
export const GUMLOOP_AGENT_COLORS = [
  '#FB3C98',
  '#9810FA',
  '#11AC4B',
  '#03A2FE',
  '#FE9A00',
] as const;
