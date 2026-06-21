import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/og/buildMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: "Changelog from Notion | Trooper",
  description: "Ship product updates with a Notion-backed changelog site.",
  canonical: "https://trooper.so/create-a-changelog-notion",
  ogKind: 'page',
  ogSlug: "create-a-changelog-notion",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
