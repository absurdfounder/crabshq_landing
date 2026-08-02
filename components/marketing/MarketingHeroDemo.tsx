'use client';

import HeroArticleDemo from '@/components/HeroArticleDemo';
import type { DemoScenarioId } from '@trooper/demo';

/**
 * Product demo for marketing subpages (teams, features, channels, …).
 * Matches the homepage Command Center framing: tinted dither ground + padding
 * around the dashboard so it does not sit flush on white.
 */
export default function MarketingHeroDemo({ scenarioId }: { scenarioId: DemoScenarioId }) {
  return (
    <div className="hero-surface relative border-y border-black/5 px-2 py-6 sm:px-3 sm:py-8 lg:px-3 lg:py-9">
      <HeroArticleDemo scenarioId={scenarioId} flush />
    </div>
  );
}
