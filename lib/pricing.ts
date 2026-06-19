/** Public marketing prices — keep in sync with app checkout when billing changes. */
export const PRICING_USD = {
  localLifetime: 49,
  cloudLifetime: 149,
  cloudStandardMonthly: 25,
  cloudPremiumMonthly: 99,
  cloudAdditionalMemberMonthly: 10,
  cloudIncludedMembers: 2,
  cloudIncludedWorkspaces: 1,
  localIncludedMembers: 1,
  localIncludedWorkspaces: 1,
} as const;

export type CloudSubscriptionTier = 'standard' | 'premium';

export const CLOUD_SUBSCRIPTION_TIERS: {
  id: CloudSubscriptionTier;
  label: string;
  price: number;
}[] = [
  { id: 'standard', label: 'Cloud', price: PRICING_USD.cloudStandardMonthly },
  { id: 'premium', label: 'Cloud Max', price: PRICING_USD.cloudPremiumMonthly },
];

export function formatUsd(amount: number) {
  return `$${amount}`;
}

export function getCloudTierMonthlyPrice(tier: CloudSubscriptionTier) {
  return CLOUD_SUBSCRIPTION_TIERS.find((entry) => entry.id === tier)?.price ?? PRICING_USD.cloudStandardMonthly;
}

export function estimateCloudMonthly({
  tier,
  seatCount,
  workspaceCount,
}: {
  tier: CloudSubscriptionTier;
  seatCount: number;
  workspaceCount: number;
}) {
  const tierPrice = getCloudTierMonthlyPrice(tier);
  const additionalMembers = Math.max(0, seatCount - PRICING_USD.cloudIncludedMembers);
  return tierPrice * workspaceCount + additionalMembers * PRICING_USD.cloudAdditionalMemberMonthly;
}

export const COMMON_PLAN_FEATURES = [
  'Unlimited agents and chats',
  'Adaptive memory and shared workflows',
  'Skills, integrations, and browser automation',
] as const;
