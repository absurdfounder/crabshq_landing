import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/og/buildMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: "Chrome Extension Builder | Trooper",
  description: "Create and ship browser extensions with Trooper workflows.",
  canonical: "https://trooper.so/create-a-chrome-extension",
  ogKind: 'page',
  ogSlug: "create-a-chrome-extension",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
