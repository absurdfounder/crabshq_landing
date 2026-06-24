import Link from 'next/link';
import Header from '@/components/ui/header';
import SectionShell from '@/components/ui/SectionShell';
import MarketingHeroDemo from '@/components/marketing/MarketingHeroDemo';
import PlaybookWorkflowSection from '@/components/marketing/PlaybookWorkflowSection';
import PixelButton from '@/components/ui/PixelButton';
import { PixelMissionTag } from '@/components/PixelAtmosphere';
import type { IntegrationPageContent } from '@/lib/integrationContent';
import { pluginPagePath } from '@/lib/pluginCatalog';
import { ArrowRight } from 'lucide-react';

export default function IntegrationSubpageLayout({ content }: { content: IntegrationPageContent }) {
  return (
    <>
      <div className="bg-white">
        <Header />
        <section className="max-w-7xl mx-auto border-l border-r border-slate-200">
          <div className="page-hero-padding px-4 sm:px-6 lg:px-8 pb-8">
            <PixelMissionTag index="01" label={content.missionLabel} className="mb-4" />

            <h1 className="font-funneldisplay text-3xl sm:text-4xl md:text-[2.5rem] max-w-3xl leading-tight tracking-tight text-slate-900 flex items-center gap-3 sm:gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={content.logoUrl}
                alt={content.catalog.name}
                width={36}
                height={36}
                className="h-9 w-9 shrink-0 object-contain"
              />
              <span className="min-w-0">{content.title}</span>
            </h1>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <PixelButton
                href="https://app.trooper.so"
                external
                size="lg"
                tone="brand"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Connect {content.catalog.name}
              </PixelButton>
              <PixelButton
                href="/plugin"
                size="lg"
                variant="outline"
                tone="dark"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                All plugins
              </PixelButton>
            </div>
          </div>

          <MarketingHeroDemo scenarioId={content.demoId} />
        </section>
      </div>

      <SectionShell eyebrow="Overview" eyebrowNumber="02" bgClass="bg-white">
        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="font-funneldisplay text-2xl sm:text-3xl tracking-tight text-slate-900 mb-6">
                {content.overviewTitle}
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                {content.overviewParagraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              {content.benefits.map((b) => (
                <div key={b.title} className="border border-slate-200 bg-white p-6">
                  <h3 className="font-semibold text-slate-900 mb-2">{b.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionShell>

      <PlaybookWorkflowSection content={content.playbookWorkflow} eyebrowNumber="03" />

      {content.useCases.length > 0 && (
        <SectionShell eyebrow="Use cases" eyebrowNumber="04" bgClass="bg-slate-50">
          <section className="py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-funneldisplay text-2xl sm:text-3xl tracking-tight text-slate-900 mb-8">
                What agents do with {content.catalog.name}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {content.useCases.map((uc) => (
                  <div key={uc.title} className="border border-slate-200 bg-white p-6">
                    <h3 className="font-semibold text-slate-900 mb-2">{uc.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{uc.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SectionShell>
      )}

      <SectionShell eyebrow="Setup" eyebrowNumber="05" bgClass="bg-white">
        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <h2 className="font-funneldisplay text-2xl sm:text-3xl tracking-tight text-slate-900 mb-4">
                {content.setupTitle}
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Credentials save to your private AI server and sync to OpenClaw. Configure in{' '}
                <span className="font-medium text-slate-800">Settings → Plugins</span> after deploy.
              </p>
            </div>

            <ol className="grid gap-4 md:grid-cols-2 max-w-4xl">
              {content.setupSteps.map((step, index) => (
                <li
                  key={step.slice(0, 32)}
                  className="flex gap-4 border border-slate-200 bg-white p-5"
                >
                  <span className="font-mono text-lg text-slate-300 tabular-nums shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm text-slate-600 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </SectionShell>

      {(content.relatedTeams.length > 0 || content.relatedIntegrations.length > 0) && (
        <SectionShell eyebrow="Related" eyebrowNumber="06" bgClass="bg-slate-50">
          <section className="py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-8">
                {content.relatedTeams.length > 0 && (
                  <div>
                    <h3 className="font-funneldisplay text-lg font-semibold text-slate-900 mb-4">Teams</h3>
                    <ul className="space-y-2">
                      {content.relatedTeams.map((t) => (
                        <li key={t.slug}>
                          <Link
                            href={`/teams/${t.slug}`}
                            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                          >
                            Trooper for {t.label} →
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {content.relatedIntegrations.length > 0 && (
                  <div>
                    <h3 className="font-funneldisplay text-lg font-semibold text-slate-900 mb-4">Related integrations</h3>
                    <ul className="space-y-2">
                      {content.relatedIntegrations.map((i) => (
                        <li key={i.slug}>
                          <Link
                            href={pluginPagePath(i.slug)}
                            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                          >
                            AI agent for {i.label} →
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        </SectionShell>
      )}
    </>
  );
}
