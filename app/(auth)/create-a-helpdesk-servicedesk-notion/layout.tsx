import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/og/buildMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: "Helpdesk from Notion | Trooper",
  description: "Customer helpdesk and service desk sites from Notion content.",
  canonical: "https://trooper.so/create-a-helpdesk-servicedesk-notion",
  ogKind: 'page',
  ogSlug: "create-a-helpdesk-servicedesk-notion",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
