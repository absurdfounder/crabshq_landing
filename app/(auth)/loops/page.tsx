import React from 'react';
import Header from '@/components/ui/header';
import SectionShell from '@/components/ui/SectionShell';
import CatalogHero from '@/components/marketing/CatalogHero';
import PixelButton from '@/components/ui/PixelButton';
import { ArrowRight } from 'lucide-react';
import { getAllLoops } from '@/lib/loopCatalog';
import { buildPageMetadata } from '@/lib/og/buildMetadata';
import LoopsClient from './LoopsClient';

export const metadata = buildPageMetadata({
  title: 'Agent Loops | Trooper',
  description:
    'Reusable prompt-only agent loops for CI, review, testing, and quality. Copy kickoff prompts into Cursor, Claude Code, or Codex and self-pace until checks pass.',
  canonical: 'https://trooper.so/loops',
  ogKind: 'hub',
  ogSlug: 'loops',
});

const LoopsPage = async ({
  searchParams,
}: {
  searchParams?: { category?: string };
}) => {
  const loops = getAllLoops();
  const initialCategory =
    typeof searchParams?.category === 'string' ? searchParams.category : undefined;

  return (
    <div className="bg-canvas">
      <Header />
      <CatalogHero
        label="Loops catalog"
        title="Agent loop catalog"
        description="Reusable loops with kickoff prompts, guardrails, and flow diagrams. Copy into Cursor, Claude Code, or Codex — no hook files required."
        actions={<PixelButton href="https://app.trooper.so" external size="lg" tone="dark" icon={<ArrowRight className="h-4 w-4" />}>
          Run loops in Trooper
        </PixelButton>}
      />

      <SectionShell rhythm bgClass="bg-canvas-warm">
        <LoopsClient loops={loops} initialCategory={initialCategory} />
      </SectionShell>
    </div>
  );
};

export default LoopsPage;
