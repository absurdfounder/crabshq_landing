import Link from 'next/link';
import Header from '@/components/ui/header';
import SectionShell from '@/components/ui/SectionShell';
import PixelButton from '@/components/ui/PixelButton';
import { PixelMissionTag } from '@/components/PixelAtmosphere';
import { useCaseHubMeta, allUseCaseSlugs, getUseCasePage } from '@/lib/useCaseContent';
import { buildPageMetadata } from '@/lib/og/buildMetadata';
import { ArrowRight } from 'lucide-react';
import MarketingSubpageTail from '@/components/marketing/MarketingSubpageTail';

export const metadata = buildPageMetadata({
  title: useCaseHubMeta.title,
  description: useCaseHubMeta.description,
  canonical: useCaseHubMeta.canonical,
  ogKind: 'hub',
  ogSlug: 'use-cases',
});

export default function UseCasesHubPage() {
  const slugs = allUseCaseSlugs();

  return (
    <div className="bg-white">
      <Header />
      <section className="max-w-7xl mx-auto border-l border-r border-slate-200">
        <div className="page-hero-padding px-4 sm:px-6 lg:px-8 pb-10">
          <PixelMissionTag index="01" label="Solutions" className="mb-4" />
          <h1 className="font-funneldisplay text-3xl sm:text-4xl md:text-[2.5rem] tracking-tight text-slate-900 max-w-3xl">
            AI Agent Use Cases
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            See how Trooper AI agents handle lead generation, sales research, CRM updates, code writing,
            browser automation, customer support, and more.
          </p>
          <div className="mt-6">
            <PixelButton
              href="https://app.trooper.so"
              external
              size="lg"
              tone="brand"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Deploy agents
            </PixelButton>
          </div>
        </div>
      </section>

      <SectionShell eyebrow="Use cases" eyebrowNumber="02" bgClass="bg-slate-50">
        <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-16 md:pb-24">
          <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
            {slugs.map((slug) => {
              const page = getUseCasePage(slug)!;
              return (
                <Link
                  key={slug}
                  href={`/use-cases/${slug}`}
                  className="group flex min-h-[120px] flex-col gap-2 border border-slate-200 bg-white p-5 transition-colors hover:border-slate-300 hover:bg-slate-50"
                >
                  <h2 className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {page.title}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1 line-clamp-2">
                    {page.description}
                  </p>
                  <span className="text-xs font-mono uppercase tracking-[0.12em] text-slate-400 group-hover:text-emerald-600 transition-colors">
                    Learn more →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </SectionShell>

      <MarketingSubpageTail />
    </div>
  );
}
