import type { DemoScenarioId } from '@trooper/demo';

export type MarketingVisualId =
  | 'coding-harness'
  | 'coding-board'
  | 'coding-memory'
  | 'coding-canvas'
  | 'coding-runtime'
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
  | 'launch-ops'
  | 'inbox-unified'
  | 'inbox-compose'
  | 'inbox-campaign'
  | 'inbox-automations';

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

/** Fallback ask / reply / window when a section omits them. Prefer page-specific copy. */
const VISUAL_PROMPTS: Record<
  MarketingVisualId,
  { ask: string; reply: string; window: string }
> = {
  'coding-harness': {
    ask: 'trooper, run my coding agents on this ticket',
    reply: 'on it — working in parallel',
    window: 'Coding — Agents',
  },
  'coding-board': {
    ask: 'trooper, show me the diffs and CI',
    reply: 'opening review',
    window: 'Coding — Review',
  },
  'coding-memory': {
    ask: 'trooper, remember our repo rules',
    reply: 'standards loaded',
    window: 'Coding — Memory',
  },
  'coding-canvas': {
    ask: 'trooper, lay out this PR for merge review',
    reply: 'diffs, CI, and summary ready',
    window: 'Coding — Merge pack',
  },
  'coding-runtime': {
    ask: 'trooper, open a browser and wake Studio-Mac',
    reply: 'browser live — desktop seat attached',
    window: 'Coding — Runtimes',
  },
  'marketing-harness': {
    ask: 'trooper, ship this campaign end to end',
    reply: 'on it — work running in parallel',
    window: 'Marketing — Campaign',
  },
  'marketing-board': {
    ask: 'trooper, show me the full pack for review',
    reply: 'everything ready side by side',
    window: 'Marketing — Review',
  },
  'marketing-memory': {
    ask: 'trooper, stay on brand for this draft',
    reply: 'brand rules loaded',
    window: 'Marketing — Memory',
  },
  'marketing-canvas': {
    ask: 'trooper, open the full campaign pack',
    reply: 'pack ready for review',
    window: 'Marketing — Canvas',
  },
  'canvas-desktop': {
    ask: 'trooper, put everything on Canvas for review',
    reply: 'on it — drag to rearrange',
    window: 'Canvas — Desktop',
  },
  'campaign-pipeline': {
    ask: 'trooper, run this campaign end to end',
    reply: 'on it — from brief to publish',
    window: 'Campaign — Pipeline',
  },
  'sales-pipeline': {
    ask: 'trooper, qualify this lead and update CRM',
    reply: 'on it — research and draft ready',
    window: 'Sales — Pipeline',
  },
  'slack-routing': {
    ask: 'trooper, turn this Slack thread into a ticket',
    reply: 'on it — work is on the board',
    window: 'Slack — Command',
  },
  'whatsapp-routing': {
    ask: 'trooper, take this WhatsApp and run it',
    reply: 'field ticket opened',
    window: 'WhatsApp — Command',
  },
  'legal-review': {
    ask: 'trooper, prep this — hold for approval',
    reply: 'draft ready — waiting on you',
    window: 'Review — Approval',
  },
  'ops-runbook': {
    ask: 'trooper, run the checklist',
    reply: 'following the playbook',
    window: 'Ops — Checklist',
  },
  'engineering-incident': {
    ask: 'trooper, triage this incident',
    reply: 'on it — logs and next steps',
    window: 'Incident — Response',
  },
  'messaging-routing': {
    ask: 'trooper, turn this message into a mission',
    reply: 'ticket opened',
    window: 'Channel — Command',
  },
  'email-routing': {
    ask: 'trooper, turn this email into a mission',
    reply: 'parsed — draft held for approval',
    window: 'Email — Command',
  },
  'design-pipeline': {
    ask: 'trooper, export the design assets for review',
    reply: 'on it — packing assets',
    window: 'Design — Assets',
  },
  'support-queue': {
    ask: 'trooper, triage the support queue',
    reply: 'sorting — drafts ready for review',
    window: 'Support — Queue',
  },
  'finance-close': {
    ask: 'trooper, run month-end close',
    reply: 'on it — reconciliations queued',
    window: 'Finance — Close',
  },
  'bd-pipeline': {
    ask: 'trooper, research these partners and draft intros',
    reply: 'briefs ready for review',
    window: 'BD — Partners',
  },
  'research-intel': {
    ask: 'trooper, pull this into a brief',
    reply: 'on it — sources coming together',
    window: 'Research — Brief',
  },
  'security-audit': {
    ask: 'trooper, run the security audit',
    reply: 'findings queued by severity',
    window: 'Security — Audit',
  },
  'pr-comms': {
    ask: 'trooper, draft the press release',
    reply: 'draft held for review',
    window: 'PR — Comms',
  },
  'growth-experiments': {
    ask: 'trooper, set up the next experiment',
    reply: 'hypothesis and tracking ready',
    window: 'Growth — Experiments',
  },
  'browser-serp': {
    ask: 'trooper, capture the pages I need',
    reply: 'browser session live',
    window: 'Browser — Capture',
  },
  'launch-ops': {
    ask: 'trooper, coordinate the launch checklist',
    reply: 'on it — moving in parallel',
    window: 'Launch — Ops',
  },
  'inbox-unified': {
    ask: 'trooper, show me every conversation in one place',
    reply: 'inbox synced — LinkedIn to WhatsApp',
    window: 'Inbox — All channels',
  },
  'inbox-compose': {
    ask: 'trooper, draft this week’s digest for customers',
    reply: 'draft ready — waiting on schedule',
    window: 'Inbox — Compose',
  },
  'inbox-campaign': {
    ask: 'trooper, turn the new post into a newsletter',
    reply: 'queued for Friday morning',
    window: 'Inbox — Campaign',
  },
  'inbox-automations': {
    ask: 'trooper, keep the welcome series running',
    reply: 'automation live — no follow-ups slip',
    window: 'Inbox — Automations',
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
    eyebrow: 'Review',
    eyebrowNumber,
    tag: 'PACK REVIEW',
    ask: 'trooper, show me everything for review',
    reply: 'pack ready — brief, preview, tools',
    window: 'Review — Deliverables',
    title: 'See the deliverables',
    titleHighlight: 'before you approve.',
    intro:
      'Brief, live preview, and tool trace sit together so you review the set once — instead of chasing files across tools.',
    visual: 'canvas-desktop',
  };
}

export function codingCanvasFeatureSection(eyebrowNumber: string): MarketingFeatureSection {
  return {
    eyebrow: 'Merge pack',
    eyebrowNumber,
    tag: 'CODE REVIEW',
    ask: 'trooper, lay out this PR for merge review',
    reply: 'diffs, CI, and summary ready',
    window: 'Coding — Merge pack',
    title: 'Diffs and CI together,',
    titleHighlight: 'ready to approve.',
    intro:
      'Unified diff and integration terminal sit side by side so you can approve the change without reconstructing context yourself.',
    visual: 'coding-canvas',
  };
}

export function marketingCanvasFeatureSection(eyebrowNumber: string): MarketingFeatureSection {
  return {
    eyebrow: 'Review',
    eyebrowNumber,
    tag: 'PACK REVIEW',
    ask: 'trooper, show me the full pack for brand review',
    reply: 'landing, brief, carousel, and email — ready',
    window: 'Marketing — Pack review',
    title: 'See the whole pack',
    titleHighlight: 'before you approve.',
    intro:
      'Landing preview, brief, carousel, and nurture copy sit together. Review like a product — not a scavenger hunt across tools.',
    visual: 'marketing-canvas',
  };
}

export type MarketingPageMeta = {
  demoId: DemoScenarioId;
  featureSections?: MarketingFeatureSection[];
};
