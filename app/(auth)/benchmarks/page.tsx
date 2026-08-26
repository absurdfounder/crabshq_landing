import type { Metadata } from 'next';
import Header from '@/components/ui/header';
import BenchmarksView from '@/components/benchmarks/BenchmarksView';
import { buildPageMetadata } from '@/lib/og/buildMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Benchmarks | Trooper harness and model rankings',
  description:
    'Elo rankings for harness × model pairs on real Trooper work: coding, research, support, marketing, and more — with cost, time, and win rate.',
  canonical: 'https://trooper.so/benchmarks',
  ogKind: 'page',
  ogSlug: 'benchmarks',
});

export default function BenchmarksPage() {
  return (
    <div className="bg-canvas">
      <Header />
      <BenchmarksView />
    </div>
  );
}
