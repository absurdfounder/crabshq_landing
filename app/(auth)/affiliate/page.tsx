import type { Metadata } from 'next';
import AffiliateClient from './AffiliateClient';

export const metadata: Metadata = {
  title: 'Trooper Affiliate Program — Earn Recurring Commissions',
  description:
    'Join the Trooper affiliate program. Earn 30% recurring commission promoting the AI workforce platform powered by OpenClaw. Payouts via Wise, PayPal, and bank transfer.',
  alternates: {
    canonical: 'https://trooper.so/affiliate',
  },
  openGraph: {
    title: 'Trooper Affiliate Program — Earn Recurring Commissions',
    description:
      'Earn recurring payouts for creator referrals. Promote Trooper’s AI workforce and get 30% commission on every paying customer.',
    images: [
      {
        url: 'https://dazzling-cat.netlify.app/trooper_social.png',
        width: 1200,
        height: 630,
        alt: 'Trooper Affiliate Program',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://dazzling-cat.netlify.app/trooper_social.png',
        alt: 'Trooper Affiliate Program',
      },
    ],
  },
};

export default function AffiliatePage() {
  return <AffiliateClient />;
}
