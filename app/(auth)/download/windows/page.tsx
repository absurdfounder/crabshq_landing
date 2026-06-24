import { Metadata } from 'next';

import DownloadWindowsClient from '@/components/download/DownloadWindowsClient';
import { buildPageMetadata } from '@/lib/og/buildMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Download Trooper for Windows',
  description:
    'Your Trooper Windows download should start automatically. Follow the steps to install Trooper on Windows.',
  canonical: 'https://trooper.so/download/windows',
  ogKind: 'page',
  ogSlug: 'download-windows',
});

export default function DownloadWindowsPage() {
  return <DownloadWindowsClient />;
}
