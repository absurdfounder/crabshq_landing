import type { MarketingFeatureSection } from '@/lib/marketingFeatures';

/** Compute the next section index after optional maturity + playbook blocks. */
export function getSubpageSectionOffset(options: {
  maturityLadder?: unknown;
  playbookWorkflow?: unknown;
}): number {
  let offset = 0;
  if (options.maturityLadder) offset += 1;
  if (options.playbookWorkflow) offset += 1;
  return offset;
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
