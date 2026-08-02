import type { DemoScenarioId } from '@trooper/demo';

export type MarketingVisualId =
  | 'coding-harness'
  | 'coding-board'
  | 'coding-memory'
  | 'coding-canvas'
  | 'marketing-harness'
  | 'marketing-board'
  | 'marketing-memory'
  | 'marketing-canvas'
  | 'canvas-desktop'
  | 'campaign-pipeline'
  | 'sales-pipeline'
  | 'slack-routing'
  | 'whatsapp-routing'
  | 'legal-review'
  | 'ops-runbook'
  | 'engineering-incident'
  | 'messaging-routing'
  | 'email-routing'
  | 'design-pipeline'
  | 'support-queue'
  | 'finance-close'
  | 'bd-pipeline'
  | 'research-intel'
  | 'security-audit'
  | 'pr-comms'
  | 'growth-experiments'
  | 'browser-serp'
  | 'launch-ops';

export type MarketingFeatureSection = {
  eyebrow: string;
  eyebrowNumber: string;
  tag?: string;
  /** User chat ask shown as a typing bubble (homepage Capabilities style). */
  ask?: string;
  /** Trooper reply bubble after the ask finishes typing. */
  reply?: string;
  /** Traffic-light window chrome title. */
  window?: string;
  title: string;
  titleHighlight?: string;
  intro?: string;
  bullets?: string[];
  visual: MarketingVisualId;
  reverse?: boolean;
};

/** Homepage-style ask / reply / window chrome defaults per visual. */
const VISUAL_PROMPTS: Record<
  MarketingVisualId,
  { ask: string; reply: string; window: string }
> = {
  'coding-harness': {
    ask: 'trooper, run Claude Code and Codex on this parser ticket',
    reply: 'on it — three harness lanes spinning up',
    window: 'Harness — Multi-agent',
  },
  'coding-board': {
    ask: 'trooper, open the diffs and CI for PR #418',
    reply: 'pulling Canvas — diffs, logs, PR body',
    window: 'Canvas — PR review',
  },
  'coding-memory': {
    ask: 'trooper, what are our branch rules and reviewer prefs?',
    reply: 'loading AGENTS.md and CODEOWNERS',
    window: 'Memory — Org context',
  },
  'coding-canvas': {
    ask: 'trooper, lay out the hotfix bundle for merge review',
    reply: 'on it — four artifacts on Canvas',
    window: 'Canvas — Hotfix pack',
  },
  'marketing-harness': {
    ask: 'trooper, ship the Q2 pillar campaign',
    reply: 'on it — Ren + Aria on the ticket',
    window: 'Ticket — Q2 campaign',
  },
  'marketing-board': {
    ask: 'trooper, open the campaign Canvas for brand review',
    reply: 'brief, landing, carousel, nurture — ready',
    window: 'Canvas — Campaign pack',
  },
  'marketing-memory': {
    ask: 'trooper, load brand voice and ICP for this draft',
    reply: 'pulling voice, ICP, competitor notes',
    window: 'Memory — Brand context',
  },
  'marketing-canvas': {
    ask: 'trooper, arrange the Q2 pack for brand review',
    reply: 'on it — four windows on Canvas',
    window: 'Canvas — Q2 campaign',
  },
  'canvas-desktop': {
    ask: 'trooper, put the deliverables on Canvas',
    reply: 'on it — drag to rearrange',
    window: 'Canvas — Desktop',
  },
  'campaign-pipeline': {
    ask: 'trooper, run the campaign pipeline end to end',
    reply: 'claiming the ticket — briefs to publish',
    window: 'Pipeline — Campaign',
  },
  'sales-pipeline': {
    ask: 'trooper, qualify this inbound and update CRM',
    reply: 'on it — research + outreach draft',
    window: 'Pipeline — Sales',
  },
  'slack-routing': {
    ask: 'trooper, turn this Slack thread into a ticket',
    reply: 'routed — context preserved',
    window: 'Slack — Routing',
  },
  'whatsapp-routing': {
    ask: 'trooper, take this WhatsApp and run it',
    reply: 'on it — field ticket opened',
    window: 'WhatsApp — Routing',
  },
  'legal-review': {
    ask: 'trooper, prep the redline — hold for counsel',
    reply: 'draft ready — awaiting approval',
    window: 'Review — Legal',
  },
  'ops-runbook': {
    ask: 'trooper, run the compliance patrol checklist',
    reply: 'following the runbook',
    window: 'Runbook — Ops',
  },
  'engineering-incident': {
    ask: 'trooper, triage the failed deploy',
    reply: 'on it — logs and rollback steps',
    window: 'Incident — Engineering',
  },
  'messaging-routing': {
    ask: 'trooper, route this DM to the board',
    reply: 'ticket opened — same workforce',
    window: 'Channel — Routing',
  },
  'email-routing': {
    ask: 'trooper, turn this email into a mission',
    reply: 'parsed — research + draft queued',
    window: 'Inbox — Routing',
  },
  'design-pipeline': {
    ask: 'trooper, export the Figma frames for review',
    reply: 'on it — assets via Composio',
    window: 'Pipeline — Design',
  },
  'support-queue': {
    ask: 'trooper, triage the support queue',
    reply: 'sorting tickets — drafts ready',
    window: 'Queue — Support',
  },
  'finance-close': {
    ask: 'trooper, run month-end close checks',
    reply: 'on it — reconciliations queued',
    window: 'Close — Finance',
  },
  'bd-pipeline': {
    ask: 'trooper, prep outreach for these partners',
    reply: 'research + drafts on the board',
    window: 'Pipeline — BD',
  },
  'research-intel': {
    ask: 'trooper, pull competitive intel into a brief',
    reply: 'on it — multi-source notes',
    window: 'Intel — Research',
  },
  'security-audit': {
    ask: 'trooper, run the security log patrol',
    reply: 'scanning — anomalies queued',
    window: 'Audit — Security',
  },
  'pr-comms': {
    ask: 'trooper, draft the launch press wire',
    reply: 'on it — draft held for review',
    window: 'Comms — PR',
  },
  'growth-experiments': {
    ask: 'trooper, spin up the next growth experiment',
    reply: 'hypothesis + tracking set',
    window: 'Experiments — Growth',
  },
  'browser-serp': {
    ask: 'trooper, capture SERP and competitor pages',
    reply: 'browser session live',
    window: 'Browser — Recon',
  },
  'launch-ops': {
    ask: 'trooper, coordinate the launch checklist',
    reply: 'on it — PH, press, social',
    window: 'Launch — Ops',
  },
};

export function resolveCapabilityPrompt(section: MarketingFeatureSection): {
  ask: string;
  reply: string;
  window: string;
} {
  const defaults = VISUAL_PROMPTS[section.visual];
  return {
    ask: section.ask ?? defaults.ask,
    reply: section.reply ?? defaults.reply,
    window: section.window ?? defaults.window,
  };
}

export function canvasFeatureSection(eyebrowNumber: string): MarketingFeatureSection {
  return {
    eyebrow: 'Canvas',
    eyebrowNumber,
    tag: 'DESKTOP CANVAS',
    ask: 'trooper, put the deliverables on Canvas',
    reply: 'on it — drag to rearrange',
    window: 'Canvas — Desktop',
    title: 'Drag artifacts like',
    titleHighlight: 'a desktop.',
    intro:
      'Parallel deliverables land on Canvas — drag windows to organize diffs, previews, logs, and exports side by side.',
    visual: 'canvas-desktop',
  };
}

export function codingCanvasFeatureSection(eyebrowNumber: string): MarketingFeatureSection {
  return {
    eyebrow: 'Canvas',
    eyebrowNumber,
    tag: 'DESKTOP CANVAS',
    ask: 'trooper, lay out the hotfix bundle for merge review',
    reply: 'on it — four artifacts on Canvas',
    window: 'Canvas — Hotfix pack',
    title: 'Parser hotfix bundle',
    titleHighlight: 'on Canvas.',
    intro:
      'Four artifacts from one mission — parser diff, ETL patch, green CI, and PR body arranged for merge review.',
    visual: 'coding-canvas',
  };
}

export function marketingCanvasFeatureSection(eyebrowNumber: string): MarketingFeatureSection {
  return {
    eyebrow: 'Canvas',
    eyebrowNumber,
    tag: 'DESKTOP CANVAS',
    ask: 'trooper, arrange the Q2 pack for brand review',
    reply: 'on it — four windows on Canvas',
    window: 'Canvas — Q2 campaign',
    title: 'Q2 campaign pack',
    titleHighlight: 'on Canvas.',
    intro:
      'Four deliverables from one mission — brief, landing preview, carousel, and social cut arranged for brand review.',
    visual: 'marketing-canvas',
  };
}

export type MarketingPageMeta = {
  demoId: DemoScenarioId;
  featureSections?: MarketingFeatureSection[];
};
