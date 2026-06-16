import Link from 'next/link';
import Header from '@/components/ui/header';
import SectionShell from '@/components/ui/SectionShell';
import PixelButton from '@/components/ui/PixelButton';
import { PixelMissionTag } from '@/components/PixelAtmosphere';
import {
  integrationHubMeta,
  getPriorityIntegrations,
} from '@/lib/integrationContent';
import { PLUGIN_CATALOG_COUNT, pluginPagePath } from '@/lib/pluginCatalog';
import { ArrowRight } from 'lucide-react';
import MarketingSubpageTail from '@/components/marketing/MarketingSubpageTail';

export const metadata = {
  title: integrationHubMeta.title,
  description: integrationHubMeta.description,
  alternates: { canonical: integrationHubMeta.canonical },
  openGraph: {
    title: integrationHubMeta.title,
    description: integrationHubMeta.description,
    url: integrationHubMeta.canonical,
    images: [
      {
        url: 'https://dazzling-cat.netlify.app/Trooperintegrations_socialshare.png',
        width: 1200,
        height: 630,
        alt: 'Trooper Integrations',
      },
    ],
  },
};

export default function PluginHubPage() {
  const priority = getPriorityIntegrations();

  return (
    <div className="bg-white">
      <Header />
      <section className="max-w-7xl mx-auto border-l border-r border-slate-200">
        <div className="pt-24 sm:pt-28 md:pt-32 px-4 sm:px-6 lg:px-8 pb-10">
          <PixelMissionTag index="01" label="Plugin catalog" className="mb-4" />
          <h1 className="font-funneldisplay text-3xl sm:text-4xl md:text-[2.5rem] tracking-tight text-slate-900 max-w-3xl">
            AI Agent Integrations
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Connect HubSpot, Gmail, GitHub, Slack, Notion, Linear, Stripe, and {PLUGIN_CATALOG_COUNT.toLocaleString()}+ tools
            to your Trooper AI workforce. Deploy agents that execute real work through OpenClaw plugins.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <PixelButton
              href="https://app.trooper.so"
              external
              size="lg"
              tone="brand"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Connect plugins
            </PixelButton>
            <PixelButton
              href="/integration"
              size="lg"
              variant="outline"
              tone="dark"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              OpenClaw skills
            </PixelButton>
          </div>
        </div>
      </section>

      <SectionShell eyebrow="Priority" eyebrowNumber="02" bgClass="bg-slate-50">
        <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-16 md:pb-24">
          <p className="mb-6 text-sm text-slate-600">
            Most-deployed integrations for sales, engineering, and ops teams.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {priority.map((page) => (
              <Link
                key={page.slug}
                href={pluginPagePath(page.slug)}
                className="group flex min-h-[140px] flex-col gap-3 border border-slate-200 bg-white p-5 transition-colors hover:border-slate-300 hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={page.logoUrl}
                    alt={page.catalog.name}
                    width={28}
                    height={28}
                    className="w-7 h-7 object-contain"
                  />
                  <h2 className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {page.catalog.name}
                  </h2>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed flex-1 line-clamp-2">
                  {page.description}
                </p>
                <span className="text-xs font-mono uppercase tracking-[0.12em] text-slate-400 group-hover:text-emerald-600 transition-colors">
                  View integration →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell eyebrow="Catalog" eyebrowNumber="03" bgClass="bg-white">
        <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <p className="text-slate-600 max-w-2xl leading-relaxed">
            Trooper mirrors the full Trooper app plugin marketplace — {PLUGIN_CATALOG_COUNT.toLocaleString()} integrations
            across Composio, Codex, OpenClaw channels, and native plugins. Every plugin has a dedicated SEO page at{' '}
            <code className="text-sm bg-slate-100 px-1.5 py-0.5 rounded font-mono">/plugin/ai_agent_for_[plugin]</code>.
          </p>
          <div className="mt-6">
            <PixelButton
              href="https://app.trooper.so"
              external
              size="lg"
              tone="brand"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Browse in app
            </PixelButton>
          </div>
        </div>
      </SectionShell>

      <MarketingSubpageTail />
    </div>
  );
}
