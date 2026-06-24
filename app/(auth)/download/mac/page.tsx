import { Metadata } from 'next';

import DownloadMacClient from '@/components/download/DownloadMacClient';
import { buildPageMetadata } from '@/lib/og/buildMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Download Trooper for Mac',
  description:
    'Your Trooper Mac download should start automatically. Follow the steps to install Trooper on macOS.',
  canonical: 'https://trooper.so/download/mac',
  ogKind: 'page',
  ogSlug: 'download-mac',
});

export default function DownloadMacPage() {
  return <DownloadMacClient />;
}
