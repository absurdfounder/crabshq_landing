import React from 'react';
import Header from '@/components/ui/header';
import SectionShell from '@/components/ui/SectionShell';
import { _loadSkills } from '@/app/utils/helper';
import IntegrationClient from './IntegrationClient';
import { PixelMissionTag } from '@/components/PixelAtmosphere';
import PixelButton from '@/components/ui/PixelButton';
import { ArrowRight } from 'lucide-react';
import { buildPageMetadata } from '@/lib/og/buildMetadata';

export const metadata = buildPageMetadata({
  title: 'OpenClaw Skills | Trooper',
  description:
    'Extend your AI workforce with 3,000+ OpenClaw skills. Connect GitHub, Gmail, Slack, Notion, AWS, Docker, Shopify, and hundreds of other tools to your AI employees.',
  canonical: 'https://trooper.so/integration',
  ogKind: 'hub',
  ogSlug: 'integration',
});

const Integration = async ({
  searchParams,
}: {
  searchParams?: { category?: string }
}) => {
  const skills = await _loadSkills();
  const initialCategory =
    typeof searchParams?.category === 'string' ? searchParams.category : undefined;

  return (
    <div className="bg-white">
      <Header />
      <section className="max-w-7xl mx-auto border-l border-r border-slate-200">
        <div className="page-hero-padding px-4 sm:px-6 lg:px-8 pb-10">
          <PixelMissionTag index="01" label="Skills catalog" className="mb-4" />
          <h1 className="font-funneldisplay text-3xl sm:text-4xl md:text-[2.5rem] tracking-tight text-slate-900 max-w-3xl">
            OpenClaw Skills
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Extend your AI workforce with thousands of community-built skills. From GitHub to Gmail, Slack to Shopify — connect your entire stack.
          </p>
          <div className="mt-6">
            <PixelButton
              href="https://app.trooper.so"
              external
              size="lg"
              tone="brand"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Deploy with skills
            </PixelButton>
          </div>
        </div>
      </section>

      <SectionShell eyebrow="Catalog" eyebrowNumber="02" bgClass="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <IntegrationClient skills={skills} initialCategory={initialCategory} />
        </div>
      </SectionShell>
    </div>
  );
};

export default Integration;
