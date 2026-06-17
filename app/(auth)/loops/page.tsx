import React from 'react';
import Header from '@/components/ui/header';
import SectionShell from '@/components/ui/SectionShell';
import { PixelMissionTag } from '@/components/PixelAtmosphere';
import PixelButton from '@/components/ui/PixelButton';
import { ArrowRight } from 'lucide-react';
import { getAllLoops } from '@/lib/loopCatalog';
import LoopsClient from './LoopsClient';

export const metadata = {
  title: 'Agent Loops | Trooper',
  description:
    'Reusable prompt-only agent loops for CI, review, testing, and quality. Copy kickoff prompts into Cursor, Claude Code, or Codex and self-pace until checks pass.',
  alternates: {
    canonical: 'https://trooper.so/loops',
  },
  openGraph: {
    title: 'Agent Loops | Trooper',
    description: 'Prompt-only agent loops with kickoff prompts, guardrails, and flow diagrams.',
    images: [
      {
        url: 'https://dazzling-cat.netlify.app/Trooperintegrations_socialshare.png',
        width: 1200,
        height: 630,
        alt: 'Trooper Agent Loops',
      },
    ],
  },
};

const LoopsPage = async ({
  searchParams,
}: {
  searchParams?: { category?: string };
}) => {
  const loops = getAllLoops();
  const initialCategory =
    typeof searchParams?.category === 'string' ? searchParams.category : undefined;

  return (
    <div className="bg-white">
      <Header />
      <section className="mx-auto max-w-7xl border-l border-r border-slate-200">
        <div className="px-4 pb-10 pt-24 sm:px-6 sm:pt-28 md:pt-32 lg:px-8">
          <PixelMissionTag index="01" label="Loops catalog" className="mb-4" />
          <h1 className="font-funneldisplay max-w-3xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-[2.5rem]">
            Agent loop catalog
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Reusable loops with kickoff prompts, guardrails, and Mermaid flow diagrams. Copy into Cursor, Claude Code, or Codex — no hook files required.
          </p>
          <div className="mt-6">
            <PixelButton
              href="https://app.trooper.so"
              external
              size="lg"
              tone="brand"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Run loops in Trooper
            </PixelButton>
          </div>
        </div>
      </section>

      <SectionShell eyebrow="Catalog" eyebrowNumber="02" bgClass="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-10 md:py-14 sm:px-6 lg:px-8">
          <LoopsClient loops={loops} initialCategory={initialCategory} />
        </div>
      </SectionShell>
    </div>
  );
};

export default LoopsPage;
