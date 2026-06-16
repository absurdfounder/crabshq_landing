import type { DemoScenarioId } from '@/lib/demoScenarios';

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
  title: string;
  titleHighlight?: string;
  intro?: string;
  bullets?: string[];
  visual: MarketingVisualId;
  reverse?: boolean;
};

export function canvasFeatureSection(eyebrowNumber: string): MarketingFeatureSection {
  return {
    eyebrow: 'Canvas',
    eyebrowNumber,
    tag: 'DESKTOP CANVAS',
    title: 'Drag artifacts like',
    titleHighlight: 'a desktop.',
    intro: 'Parallel deliverables land on Canvas — drag windows to organize diffs, previews, logs, and exports side by side.',
    bullets: [
      'Multiple artifacts visible at once',
      'Drag title bars to rearrange like a desktop',
      'Switch to IDE to focus a single file',
    ],
    visual: 'canvas-desktop',
  };
}

export function codingCanvasFeatureSection(eyebrowNumber: string): MarketingFeatureSection {
  return {
    eyebrow: 'Canvas',
    eyebrowNumber,
    tag: 'DESKTOP CANVAS',
    title: 'Parser hotfix bundle',
    titleHighlight: 'on Canvas.',
    intro: 'Four artifacts from one mission — parser diff, ETL patch, green CI, and PR body arranged for merge review.',
    bullets: [
      'Diffs, logs, and PR copy visible at once',
      'Live review mode with cursors and comments',
      'Drag title bars to organize before approval',
    ],
    visual: 'coding-canvas',
  };
}

export function marketingCanvasFeatureSection(eyebrowNumber: string): MarketingFeatureSection {
  return {
    eyebrow: 'Canvas',
    eyebrowNumber,
    tag: 'DESKTOP CANVAS',
    title: 'Q2 campaign pack',
    titleHighlight: 'on Canvas.',
    intro: 'Four deliverables from one mission — brief, landing preview, carousel, and social cut arranged for brand review.',
    bullets: [
      'HTML, creative, and copy visible at once',
      'Live review mode with cursors and comments',
      'Drag title bars to organize before schedule',
    ],
    visual: 'marketing-canvas',
  };
}

export type MarketingPageMeta = {
  demoId: DemoScenarioId;
  featureSections?: MarketingFeatureSection[];
};
