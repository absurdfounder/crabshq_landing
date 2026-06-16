import type { DemoScenarioId } from '@/lib/demoScenarios';

export type MarketingVisualId =
  | 'coding-harness'
  | 'coding-board'
  | 'canvas-desktop'
  | 'campaign-pipeline'
  | 'sales-pipeline'
  | 'slack-routing'
  | 'whatsapp-routing'
  | 'legal-review'
  | 'ops-runbook'
  | 'engineering-incident'
  | 'messaging-routing'
  | 'email-routing';

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

export type MarketingPageMeta = {
  demoId: DemoScenarioId;
  featureSections?: MarketingFeatureSection[];
};
