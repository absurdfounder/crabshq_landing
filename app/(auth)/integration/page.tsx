import React from 'react';
import Header from '@/components/ui/header';
import SectionShell from '@/components/ui/SectionShell';
import { _loadSkills } from '@/app/utils/helper';
import IntegrationClient from './IntegrationClient';
import CatalogHero from '@/components/marketing/CatalogHero';
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
    <div className="bg-canvas">
      <Header />
      <CatalogHero
        label="Skills catalog"
        title="OpenClaw skills"
        description="Extend your AI workforce with thousands of community-built skills. From GitHub to Gmail, Slack to Shopify — connect your entire stack."
        actions={<PixelButton href="https://app.trooper.so" external size="lg" tone="dark" icon={<ArrowRight className="h-4 w-4" />}>
          Deploy with skills
        </PixelButton>}
      />

      <SectionShell eyebrow="Catalog" eyebrowNumber="02" bgClass="bg-canvas-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <IntegrationClient skills={skills} initialCategory={initialCategory} />
        </div>
      </SectionShell>
    </div>
  );
};

export default Integration;
