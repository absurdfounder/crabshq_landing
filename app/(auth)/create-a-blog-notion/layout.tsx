import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/og/buildMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: "Blog from Notion | Trooper",
  description: "Publish a professional blog powered by Notion as your CMS.",
  canonical: "https://trooper.so/create-a-blog-notion",
  ogKind: 'page',
  ogSlug: "create-a-blog-notion",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
