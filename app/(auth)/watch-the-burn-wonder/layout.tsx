import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/og/buildMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: "Watch the Burn | Wonder",
  description: "Wonder burn tracker and ecosystem updates.",
  canonical: "https://trooper.so/watch-the-burn-wonder",
  ogKind: 'page',
  ogSlug: "watch-the-burn-wonder",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
