import type { MarketingFeatureSection } from '@/lib/marketingFeatures';

/** Compute the next section index after optional playbook block. */
export function getSubpageSectionOffset(options: {
  playbookWorkflow?: unknown;
}): number {
  return options.playbookWorkflow ? 1 : 0;
}

export function getCapabilitiesEyebrowNumber(offset: number): string {
  return String(3 + offset).padStart(2, '0');
}

export function bumpFeatureSectionNumbers(
  sections: MarketingFeatureSection[],
  offset: number,
): MarketingFeatureSection[] {
  if (offset === 0) return sections;
  return sections.map((section) => ({
    ...section,
    eyebrowNumber: String(parseInt(section.eyebrowNumber, 10) + offset).padStart(2, '0'),
  }));
}
