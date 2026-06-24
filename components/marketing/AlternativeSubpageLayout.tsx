import Header from '@/components/ui/header';
import SectionShell from '@/components/ui/SectionShell';
import MarketingHeroDemo from '@/components/marketing/MarketingHeroDemo';
import PixelButton from '@/components/ui/PixelButton';
import { PixelMissionTag } from '@/components/PixelAtmosphere';
import type { AlternativePageContent } from '@/lib/alternativeContent';
import { ArrowRight, Check } from 'lucide-react';
import MarketingSubpageTail from '@/components/marketing/MarketingSubpageTail';

export default function AlternativeSubpageLayout({ content }: { content: AlternativePageContent }) {
  return (
    <>
      <div className="bg-white">
        <Header />
        <section className="max-w-7xl mx-auto border-l border-r border-slate-200">
          <div className="page-hero-padding px-4 sm:px-6 lg:px-8 pb-8">
            <PixelMissionTag index="01" label={content.missionLabel} className="mb-4" />

            <h1 className="font-funneldisplay text-3xl sm:text-4xl md:text-[2.5rem] max-w-3xl leading-tight tracking-tight text-slate-900">
              {content.title}
              {content.titleAccent && (
                <>
                  <br />
                  <span className="text-slate-500 font-normal">{content.titleAccent}</span>
                </>
              )}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              {content.description}
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <PixelButton
                href="https://app.trooper.so"
                external
                size="lg"
                tone="brand"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Try Trooper free
              </PixelButton>
              <PixelButton
                href="/alternatives"
                size="lg"
                variant="outline"
                tone="dark"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                All comparisons
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

      <SectionShell eyebrow="Comparison" eyebrowNumber="03" bgClass="bg-slate-50">
        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-funneldisplay text-2xl sm:text-3xl tracking-tight text-slate-900 mb-8">
              Trooper vs {content.competitorName}
            </h2>

            <div className="overflow-x-auto border border-slate-200 bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="text-left p-4 font-semibold text-slate-900 w-1/4">Feature</th>
                    <th className="text-left p-4 font-semibold text-emerald-700 w-[37.5%]">Trooper</th>
                    <th className="text-left p-4 font-semibold text-slate-500 w-[37.5%]">{content.competitorName}</th>
                  </tr>
                </thead>
                <tbody>
                  {content.comparisonRows.map((row) => (
                    <tr key={row.feature} className="border-b border-slate-100 last:border-b-0">
                      <td className="p-4 font-medium text-slate-800 align-top">{row.feature}</td>
                      <td className="p-4 text-slate-700 align-top">
                        <span className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                          {row.trooper}
                        </span>
                      </td>
                      <td className="p-4 text-slate-500 align-top">{row.competitor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </SectionShell>

      <SectionShell eyebrow="When to choose Trooper" bgClass="bg-white">
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ul className="grid md:grid-cols-3 gap-4 max-w-5xl">
              {content.whenToChooseTrooper.map((item) => (
                <li
                  key={item.slice(0, 32)}
                  className="flex gap-3 border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600 leading-relaxed"
                >
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <PixelButton
                href="https://app.trooper.so"
                external
                size="lg"
                tone="brand"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Deploy your AI workforce
              </PixelButton>
            </div>
          </div>
        </section>
      </SectionShell>

      <MarketingSubpageTail />
    </>
  );
}
