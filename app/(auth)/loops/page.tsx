import React from 'react';
import Header from '@/components/ui/header';
import SectionShell from '@/components/ui/SectionShell';
import { PixelMissionTag } from '@/components/PixelAtmosphere';
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
      <section className="mx-auto max-w-7xl border-b border-l border-r border-[var(--color-line)] bg-canvas">
        <div className="page-hero-padding px-4 sm:px-6 lg:px-8">
          <PixelMissionTag index="01" label="Loops catalog" className="mb-4" />
          <h1 className="font-funneldisplay max-w-3xl text-3xl font-medium tracking-tight text-ink sm:text-4xl md:text-[2.5rem]">
            Agent loop catalog
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            Reusable loops with kickoff prompts, guardrails, and flow diagrams. Copy into Cursor, Claude Code, or Codex — no hook files required.
          </p>
          <div className="mt-6">
            <PixelButton
              href="https://app.trooper.so"
              external
              size="lg"
              tone="dark"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Run loops in Trooper
            </PixelButton>
          </div>
        </div>
      </section>

      <SectionShell eyebrow="Catalog" eyebrowNumber="02" bgClass="bg-canvas-warm">
        <div className="py-10 md:py-14">
          <LoopsClient loops={loops} initialCategory={initialCategory} />
        </div>
      </SectionShell>
    </div>
  );
};

export default LoopsPage;
