'use client';

import { TrooperDemo, type DemoScenarioId } from '@trooper/demo';
import PixelDitherGradient from './ui/PixelDitherGradient';

/**
 * The demo now lives in `packages/demo` so it can be built and iterated on
 * standalone (`npm run dev -w @trooper/demo`). This wrapper keeps the existing
 * import path working for `hero.tsx` and the marketing subpage layouts, and
 * supplies the landing's backdrop — which the package deliberately doesn't own.
 */
export default function HeroArticleDemo({
  scenarioId,
  rotate = false,
}: {
  scenarioId?: DemoScenarioId;
  rotate?: boolean;
}) {
  return <TrooperDemo scenarioId={scenarioId} rotate={rotate} backdrop={<PixelDitherGradient />} />;
}
