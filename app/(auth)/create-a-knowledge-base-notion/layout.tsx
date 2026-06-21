import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/og/buildMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: "Knowledge Base from Notion | Trooper",
  description: "Self-serve support knowledge base publishing from Notion.",
  canonical: "https://trooper.so/create-a-knowledge-base-notion",
  ogKind: 'page',
  ogSlug: "create-a-knowledge-base-notion",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
