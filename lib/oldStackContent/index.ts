export type { OldStackContent } from './types';
export { INDUSTRY_OLD_STACK } from './industries';
export { TEAM_OLD_STACK } from './teams';
export { PRICING_OLD_STACK } from './pricing';
export { RESELLERS_OLD_STACK } from './resellers';

import { INDUSTRY_OLD_STACK } from './industries';
import { TEAM_OLD_STACK } from './teams';
import { PRICING_OLD_STACK } from './pricing';
import { RESELLERS_OLD_STACK } from './resellers';
import type { OldStackContent } from './types';

export function getIndustryOldStack(slug: string): OldStackContent | undefined {
  return INDUSTRY_OLD_STACK[slug];
}

export function getTeamOldStack(slug: string): OldStackContent | undefined {
  return TEAM_OLD_STACK[slug];
}

export function getPricingOldStack(): OldStackContent {
  return PRICING_OLD_STACK;
}

export function getResellersOldStack(): OldStackContent {
  return RESELLERS_OLD_STACK;
}
