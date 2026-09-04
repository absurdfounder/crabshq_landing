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
    title: 'Experts build agents split',
    gumloopSection: 'Let your experts build the agents',
    motion: ['skills-cursor-traverse'],
    status: 'lab',
    notes: 'Left copy, right feature list with a traversing cursor.',
  },
  {
    id: 'where-they-work',
    title: 'Meet your team where they work',
    gumloopSection: 'Slack / Teams / Gmail product tabs',
    motion: [],
    status: 'lab',
    notes: 'Tabbed channel shells — Trooper already has MobileChannels; keep as layout ref.',
  },
  {
    id: 'optimize',
    title: 'Optimize cards',
    gumloopSection: 'Optimize Your Agents',
    motion: [],
    status: 'lab',
    notes: 'Three quiet claim cards under one headline.',
  },
  {
    id: 'enterprise-dark',
    title: 'Enterprise dark band',
    gumloopSection: 'Enterprise-grade controls',
    motion: [],
    status: 'lab',
    notes: 'Ink band with control tiles — maps to our DarkSplitSection language.',
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
    title: 'Build your team CTA',
    gumloopSection: 'Footer CTA',
    motion: [],
    status: 'lab',
    notes: 'Closing headline + dual CTA on white.',
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
