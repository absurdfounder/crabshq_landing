import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/og/buildMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: "Directory from Notion | Trooper",
  description: "Launch a searchable directory site backed by Notion.",
  canonical: "https://trooper.so/create-a-directory-notion",
  ogKind: 'page',
  ogSlug: "create-a-directory-notion",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
