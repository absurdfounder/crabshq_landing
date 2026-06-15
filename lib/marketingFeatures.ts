import type { DemoScenarioId } from '@/lib/demoScenarios';

export type MarketingVisualId =
  | 'coding-harness'
  | 'coding-board'
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
  title: string;
  intro?: string;
  bullets?: string[];
  visual: MarketingVisualId;
  reverse?: boolean;
};

export type MarketingPageMeta = {
  demoId: DemoScenarioId;
  featureSections?: MarketingFeatureSection[];
};
