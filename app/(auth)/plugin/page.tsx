import Header from '@/components/ui/header';
import SectionShell from '@/components/ui/SectionShell';
import PixelButton from '@/components/ui/PixelButton';
import CatalogHero from '@/components/marketing/CatalogHero';
import { buildPageMetadata } from '@/lib/og/buildMetadata';
import { integrationHubMeta } from '@/lib/integrationContent';
import { getAllPlugins, PLUGIN_CATALOG_COUNT } from '@/lib/pluginCatalog';
import { ArrowRight } from 'lucide-react';
import PluginHubClient from './PluginHubClient';

export const metadata = buildPageMetadata({
  title: integrationHubMeta.title,
  description: integrationHubMeta.description,
  canonical: integrationHubMeta.canonical,
  ogKind: 'hub',
  ogSlug: 'plugins',
});

export default function PluginHubPage() {
  const allPlugins = getAllPlugins();

  return (
    <div className="bg-canvas">
      <Header />
      <CatalogHero
        label="Plugin catalog"
        title="AI agent integrations"
        description={`Connect HubSpot, Gmail, GitHub, Slack, Notion, Linear, Stripe, and ${PLUGIN_CATALOG_COUNT.toLocaleString()}+ tools to your Trooper AI workforce. Deploy agents that execute real work through OpenClaw plugins.`}
        actions={<>
          <PixelButton href="https://app.trooper.so" external size="lg" tone="dark" icon={<ArrowRight className="h-4 w-4" />}>
            Connect plugins
          </PixelButton>
          <PixelButton href="/integration" size="lg" variant="outline" tone="dark" icon={<ArrowRight className="h-4 w-4" />}>
            Browse skills
          </PixelButton>
        </>}
      />

      <SectionShell bgClass="bg-canvas">
        <div className="pb-16 pt-6 md:pb-24">
          <div className="rail-bleed">
            <PluginHubClient plugins={allPlugins} />
          </div>
        </div>
      </SectionShell>
    </div>
  );
}
