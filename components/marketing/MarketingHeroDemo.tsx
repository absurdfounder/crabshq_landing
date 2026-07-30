'use client';

import HeroArticleDemo from '@/components/HeroArticleDemo';
import type { DemoScenarioId } from '@trooper/demo';

export default function MarketingHeroDemo({ scenarioId }: { scenarioId: DemoScenarioId }) {
  return <HeroArticleDemo scenarioId={scenarioId} />;
}
