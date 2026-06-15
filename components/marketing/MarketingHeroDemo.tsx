'use client';

import HeroArticleDemo from '@/components/HeroArticleDemo';
import type { DemoScenarioId } from '@/lib/demoScenarios';

export default function MarketingHeroDemo({ scenarioId }: { scenarioId: DemoScenarioId }) {
  return <HeroArticleDemo scenarioId={scenarioId} />;
}
