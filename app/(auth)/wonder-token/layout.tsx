import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/og/buildMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: "Wonder Token | Trooper",
  description: "Wonder token utilities and ecosystem pages on Trooper.",
  canonical: "https://trooper.so/wonder-token",
  ogKind: 'page',
  ogSlug: "wonder-token",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
