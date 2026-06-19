/** Public marketing prices — keep in sync with app checkout when billing changes. */
export const PRICING_USD = {
  localLifetime: 49,
  cloudLifetime: 149,
  cloudStandardMonthly: 25,
  cloudPremiumMonthly: 99,
  cloudAdditionalMemberMonthly: 10,
  cloudIncludedMembers: 2,
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
