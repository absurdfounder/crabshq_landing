import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/og/buildMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: "Company Wiki from Notion | Trooper",
  description: "Internal wiki and knowledge base publishing from Notion.",
  canonical: "https://trooper.so/create-a-company-wiki-notion",
  ogKind: 'page',
  ogSlug: "create-a-company-wiki-notion",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
