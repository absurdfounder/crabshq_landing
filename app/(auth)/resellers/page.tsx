import type { Metadata } from 'next';
import Header from '@/components/ui/header';
import SectionShell from '@/components/ui/SectionShell';
import DarkSplitSection from '@/components/ui/DarkSplitSection';
import DashboardShowcaseSection from '@/components/DashboardShowcaseSection';
import IntegrationScroller from '@/components/IntegrationScroller';
import FounderMessageSection from '@/components/FounderMessageSection';
import { getIntegrationTiles } from '@/lib/integrationScroller';
import { PLUGIN_CATALOG_COUNT } from '@/lib/pluginCatalog';
import { getIndustryCards } from '@/lib/industryContent';
import { buildPageMetadata } from '@/lib/og/buildMetadata';
import ResellersHero from './ResellersHero';
import ResellersStory, { ResellersIndustries, ResellersFaq } from './ResellersStory';
import ResellersApplyBand from './ResellersApplyBand';

export const metadata: Metadata = buildPageMetadata({
  title: 'Trooper Reseller Program — Build Custom Solutions for Clients',
  description:
    'Join the Trooper Reseller Program. Build custom Mission Control setups for local businesses, charge $200–$500/month, and keep the margin.',
  canonical: 'https://trooper.so/resellers',
  ogKind: 'page',
  ogSlug: 'resellers',
});

export default function ResellersPage() {
  const industries = getIndustryCards();
  const integrationTiles = getIntegrationTiles(36);

  return (
    <div className="bg-canvas text-ink">
      <div className="hero-shell bg-canvas">
        <Header />
        <ResellersHero />
      </div>

      <ResellersStory />

      <ResellersIndustries industries={industries} />

      {/* Same Mission Control surface as the homepage — what clients actually run */}
      <DashboardShowcaseSection />

      <SectionShell rhythm eyebrow="Works with their stack" bgClass="bg-white">
        <IntegrationScroller tiles={integrationTiles} totalCount={PLUGIN_CATALOG_COUNT} />
      </SectionShell>

      <SectionShell rhythm bgClass="bg-canvas">
        <FounderMessageSection />
      </SectionShell>

      <ResellersFaq />

      <DarkSplitSection>
        <ResellersApplyBand />
      </DarkSplitSection>
    </div>
  );
}
