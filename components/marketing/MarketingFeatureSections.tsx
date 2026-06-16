'use client';

import { useEffect, useRef, useState } from 'react';
import MarketingHeadline, {
  MarketingCardTitle,
  type MarketingHeadlineLine,
} from '@/components/marketing/MarketingHeadline';
import SectionShell from '@/components/ui/SectionShell';
import { PixelMissionTag } from '@/components/PixelAtmosphere';
import PixelFramedVisual from '@/components/marketing/PixelFramedVisual';
import type { MarketingFeatureSection } from '@/lib/marketingFeatures';
import {
  CodingHarnessVisual,
  CodingBoardVisual,
  CodingMemoryVisual,
  CodingCanvasVisual,
  MarketingHarnessVisual,
  MarketingBoardVisual,
  MarketingMemoryVisual,
  MarketingCanvasVisual,
  CanvasBoardVisual,
  CampaignPipelineVisual,
  SalesPipelineVisual,
  SlackRoutingVisual,
  WhatsAppRoutingVisual,
  LegalReviewVisual,
  OpsRunbookVisual,
  EngineeringIncidentVisual,
  MessagingRoutingVisual,
  EmailRoutingVisual,
  DesignPipelineVisual,
  SupportQueueVisual,
  FinanceCloseVisual,
  BdPipelineVisual,
  ResearchIntelVisual,
  SecurityAuditVisual,
  PrCommsVisual,
  GrowthExperimentsVisual,
  BrowserSerpVisual,
  LaunchOpsVisual,
} from '@/components/marketing/visuals/MarketingVisuals';

const DESKTOP_VISUALS = new Set([
  'coding-board',
  'coding-canvas',
  'marketing-board',
  'marketing-canvas',
  'canvas-desktop',
]);

const VISUALS = {
  'coding-harness': CodingHarnessVisual,
  'coding-board': CodingBoardVisual,
  'coding-memory': CodingMemoryVisual,
  'coding-canvas': CodingCanvasVisual,
  'marketing-harness': MarketingHarnessVisual,
  'marketing-board': MarketingBoardVisual,
  'marketing-memory': MarketingMemoryVisual,
  'marketing-canvas': MarketingCanvasVisual,
  'canvas-desktop': CanvasBoardVisual,
  'campaign-pipeline': CampaignPipelineVisual,
  'sales-pipeline': SalesPipelineVisual,
  'slack-routing': SlackRoutingVisual,
  'whatsapp-routing': WhatsAppRoutingVisual,
  'legal-review': LegalReviewVisual,
  'ops-runbook': OpsRunbookVisual,
  'engineering-incident': EngineeringIncidentVisual,
  'messaging-routing': MessagingRoutingVisual,
  'email-routing': EmailRoutingVisual,
  'design-pipeline': DesignPipelineVisual,
  'support-queue': SupportQueueVisual,
  'finance-close': FinanceCloseVisual,
  'bd-pipeline': BdPipelineVisual,
  'research-intel': ResearchIntelVisual,
  'security-audit': SecurityAuditVisual,
  'pr-comms': PrCommsVisual,
  'growth-experiments': GrowthExperimentsVisual,
  'browser-serp': BrowserSerpVisual,
  'launch-ops': LaunchOpsVisual,
} as const;

const sectionXPadding = 'px-4 sm:px-6 lg:px-8';

type MarketingFeatureSectionsProps = {
  sections: MarketingFeatureSection[];
  eyebrow?: string;
  eyebrowNumber?: string;
  heading?: string;
  headingLines?: MarketingHeadlineLine[];
  subheading?: string;
};

const defaultHeadingLines: MarketingHeadlineLine[] = [
  {
    parts: [
      { text: 'How this unit', tone: 'default' },
      { text: 'runs', tone: 'default' },
    ],
    iconAfter: 0,
  },
  {
    parts: [{ text: 'on Trooper.', tone: 'brand' }],
  },
];

export default function MarketingFeatureSections({
  sections,
  eyebrow = 'Capabilities',
  eyebrowNumber = '03',
  heading = 'How this unit runs on Trooper.',
  headingLines = defaultHeadingLines,
  subheading = 'Traced tickets, live artifacts, and harnesses that match the work — not generic placeholders.',
}: MarketingFeatureSectionsProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [cardTransforms, setCardTransforms] = useState<{ scale: number; opacity: number; y: number }[]>([]);

  useEffect(() => {
    const calculateTransforms = () => {
      const isMobile = window.innerWidth < 1024;
      const stickyTop = window.innerHeight * 0.15;
      const transforms: { scale: number; opacity: number; y: number }[] = [];

      if (isMobile) {
        setCardTransforms(sections.map(() => ({ scale: 1, opacity: 1, y: 0 })));
        return;
      }

      let activeCardIndex = 0;
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        if (card.getBoundingClientRect().top <= stickyTop + 10) activeCardIndex = index;
      });

      cardRefs.current.forEach((card, index) => {
        if (!card) {
          transforms.push({ scale: 1, opacity: 1, y: 0 });
          return;
        }
        const cardsOnTop = Math.max(0, activeCardIndex - index);
        if (cardsOnTop > 0) {
          transforms.push({
            scale: Math.max(0.92, 1 - 0.025 * cardsOnTop),
            opacity: Math.max(0.45, 1 - 0.12 * cardsOnTop),
            y: -8 * cardsOnTop,
          });
        } else {
          transforms.push({ scale: 1, opacity: 1, y: 0 });
        }
      });
      setCardTransforms(transforms);
    };

    calculateTransforms();
    let rafId: number | undefined;
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(calculateTransforms);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', calculateTransforms);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateTransforms);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [sections]);

  if (!sections.length) return null;

  return (
    <SectionShell eyebrow={eyebrow} eyebrowNumber={eyebrowNumber} bgClass="bg-slate-50">
      <div className="max-w-7xl mx-auto px-0 sm:px-0 py-10 sm:py-16 md:py-24">
        <div className="mb-8 sm:mb-12 md:mb-14 max-w-2xl">
          {headingLines.length > 0 ? (
            <MarketingHeadline
              as="h2"
              size="section"
              lines={headingLines}
              subline={subheading}
            />
          ) : (
            <>
              <h2 className="font-funneldisplay text-2xl sm:text-3xl md:text-4xl tracking-tight text-slate-900 leading-snug">
                {heading}
              </h2>
              <p className="text-slate-500 text-sm sm:text-base mt-3 leading-relaxed">{subheading}</p>
            </>
          )}
        </div>

        <div className="relative" style={{ perspective: '1000px' }}>
          {sections.map((section, index) => {
            const Visual = VISUALS[section.visual] ?? CanvasBoardVisual;
            const t = cardTransforms[index] ?? { scale: 1, opacity: 1, y: 0 };
            const tag = section.tag ?? section.eyebrow;

            return (
              <div
                key={`${section.eyebrowNumber}-${section.visual}-${index}`}
                ref={(el) => { cardRefs.current[index] = el; }}
                className="lg:sticky lg:top-[15vh] mb-4 sm:mb-6 lg:mb-8"
                style={{
                  zIndex: sections.length + index,
                  marginBottom: index === sections.length - 1 ? '0' : undefined,
                }}
              >
                <div
                  className="relative bg-white border border-slate-200 overflow-hidden min-h-0 lg:min-h-[520px] flex flex-col will-change-transform"
                  style={{
                    transform: `scale(${t.scale}) translateY(${t.y}px)`,
                    opacity: t.opacity,
                    transformOrigin: 'center top',
                    transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                >
                  <div className="grid md:flex items-stretch flex-1 min-h-0">
                    <div className={`${sectionXPadding} box-border pt-6 sm:pt-8 md:pt-10 pb-6 sm:pb-8 md:pb-10 lg:pb-12 md:w-[38%] w-full flex flex-col`}>
                      <PixelMissionTag index={section.eyebrowNumber} label={tag} />
                      <MarketingCardTitle
                        title={section.title}
                        titleHighlight={section.titleHighlight}
                        titleHighlightTone="brand"
                      />
                      {section.intro && (
                        <p className="text-sm text-slate-500 mt-3 sm:mt-4 leading-relaxed">{section.intro}</p>
                      )}
                      {section.bullets && section.bullets.length > 0 && (
                        <ul className="mt-4 space-y-2 text-sm text-slate-600">
                          {section.bullets.map((b) => (
                            <li key={b} className="flex gap-2">
                              <span className="text-trooper mt-0.5 shrink-0">▸</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="box-border w-full md:w-[62%] border-t md:border-t-0 md:border-l border-slate-200 flex flex-col min-h-0">
                      <PixelFramedVisual variant={DESKTOP_VISUALS.has(section.visual) ? 'desktop' : 'default'}>
                        <Visual />
                      </PixelFramedVisual>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
