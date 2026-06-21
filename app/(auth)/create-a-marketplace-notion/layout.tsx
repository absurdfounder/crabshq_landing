import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/og/buildMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: "Marketplace from Notion | Trooper",
  description: "Two-sided marketplace sites with Notion as the content layer.",
  canonical: "https://trooper.so/create-a-marketplace-notion",
  ogKind: 'page',
  ogSlug: "create-a-marketplace-notion",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
