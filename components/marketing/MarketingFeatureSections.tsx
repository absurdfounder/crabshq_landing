import SectionShell from '@/components/ui/SectionShell';
import PixelFramedVisual from '@/components/marketing/PixelFramedVisual';
import type { MarketingFeatureSection } from '@/lib/marketingFeatures';
import {
  CodingHarnessVisual,
  CodingBoardVisual,
  CampaignPipelineVisual,
  SalesPipelineVisual,
  SlackRoutingVisual,
  WhatsAppRoutingVisual,
  LegalReviewVisual,
  OpsRunbookVisual,
  EngineeringIncidentVisual,
  MessagingRoutingVisual,
  EmailRoutingVisual,
} from '@/components/marketing/visuals/MarketingVisuals';

const VISUALS = {
  'coding-harness': CodingHarnessVisual,
  'coding-board': CodingBoardVisual,
  'campaign-pipeline': CampaignPipelineVisual,
  'sales-pipeline': SalesPipelineVisual,
  'slack-routing': SlackRoutingVisual,
  'whatsapp-routing': WhatsAppRoutingVisual,
  'legal-review': LegalReviewVisual,
  'ops-runbook': OpsRunbookVisual,
  'engineering-incident': EngineeringIncidentVisual,
  'messaging-routing': MessagingRoutingVisual,
  'email-routing': EmailRoutingVisual,
} as const;

function FeatureVisual({ visualId }: { visualId: MarketingFeatureSection['visual'] }) {
  const Component = VISUALS[visualId];
  return (
    <PixelFramedVisual>
      <Component />
    </PixelFramedVisual>
  );
}

export default function MarketingFeatureSections({ sections }: { sections: MarketingFeatureSection[] }) {
  if (!sections.length) return null;

  return (
    <>
      {sections.map((section) => (
        <SectionShell
          key={section.title}
          eyebrow={section.eyebrow}
          eyebrowNumber={section.eyebrowNumber}
          bgClass={section.reverse ? 'bg-slate-50' : 'bg-white'}
        >
          <section className="py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`grid gap-10 lg:gap-16 items-center ${section.reverse ? 'lg:grid-cols-2' : 'lg:grid-cols-2'}`}>
                <div className={section.reverse ? 'lg:order-2' : ''}>
                  <FeatureVisual visualId={section.visual} />
                </div>
                <div className={section.reverse ? 'lg:order-1' : ''}>
                  <h2 className="font-funneldisplay text-2xl sm:text-3xl tracking-tight text-slate-900 mb-4">
                    {section.title}
                  </h2>
                  {section.intro && (
                    <p className="text-slate-600 leading-relaxed mb-4">{section.intro}</p>
                  )}
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="space-y-2 text-sm text-slate-600">
                      {section.bullets.map((b) => (
                        <li key={b} className="flex gap-2">
                          <span className="text-trooper mt-0.5">▸</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </section>
        </SectionShell>
      ))}
    </>
  );
}
