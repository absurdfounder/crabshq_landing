import type { Metadata } from 'next';
import AffiliateClient from './AffiliateClient';
import { buildPageMetadata } from '@/lib/og/buildMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Trooper Affiliate Program — Earn Recurring Commissions',
  description:
    'Join the Trooper affiliate program. Earn 30% recurring commission promoting the AI workforce platform powered by OpenClaw. Payouts via Wise, PayPal, and bank transfer.',
  canonical: 'https://trooper.so/affiliate',
  ogKind: 'page',
  ogSlug: 'affiliate',
});

export default function AffiliatePage() {
  return <AffiliateClient />;
}
