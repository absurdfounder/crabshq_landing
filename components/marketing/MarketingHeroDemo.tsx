'use client';

import HeroArticleDemo from '@/components/HeroArticleDemo';
import type { DemoScenarioId } from '@trooper/demo';

/**
 * Product demo for marketing subpages (teams, features, channels, …).
 * Matches the homepage dashboard: rounded dither card with side padding
 * so the demo does not sit flush on the rail.
 */
export default function MarketingHeroDemo({ scenarioId }: { scenarioId: DemoScenarioId }) {
  return (
    <div className="hero-surface mx-4 mb-8 rounded-2xl border border-black/5 px-4 py-8 sm:mx-6 sm:px-8 sm:py-10 lg:mx-8">
      <HeroArticleDemo scenarioId={scenarioId} flush />
    </div>
  );
}
