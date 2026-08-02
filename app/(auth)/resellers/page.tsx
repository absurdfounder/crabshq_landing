import type { Metadata } from 'next';
import ResellersClient from './ResellersClient';
import { buildPageMetadata } from '@/lib/og/buildMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Trooper Reseller Program — Build Custom Solutions for Clients',
  description:
    'Resell Trooper to your clients. Build custom Mission Control setups for local businesses, charge $200–$500/month, and keep the margin. Apply to the reseller program.',
  canonical: 'https://trooper.so/resellers',
  ogKind: 'page',
  ogSlug: 'resellers',
});

export default function ResellersPage() {
  return <ResellersClient />;
}
