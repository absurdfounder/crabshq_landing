import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/og/buildMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: "Docs from Notion | Trooper",
  description: "Developer and product documentation powered by Notion.",
  canonical: "https://trooper.so/create-a-documentation-notion",
  ogKind: 'page',
  ogSlug: "create-a-documentation-notion",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
