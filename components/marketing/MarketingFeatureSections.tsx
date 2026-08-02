'use client';

import { useEffect, useRef, useState } from 'react';
import MarketingHeadline, {
  type MarketingHeadlineLine,
} from '@/components/marketing/MarketingHeadline';
import SectionShell from '@/components/ui/SectionShell';
import { BubbleExchange } from '@/components/ui/ChatBubble';
import PixelFramedVisual from '@/components/marketing/PixelFramedVisual';
import {
  resolveCapabilityPrompt,
  type MarketingFeatureSection,
} from '@/lib/marketingFeatures';
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
      { text: 'What this team', tone: 'default' },
      { text: 'does', tone: 'default' },
    ],
    iconAfter: 0,
  },
  {
    parts: [{ text: 'on Trooper.', tone: 'brand' }],
  },
];

/**
 * Capability rows for team / feature / channel pages.
 * Same rhythm as homepage `OldWays`: typing ask/reply bubbles, title,
 * description, traffic-light product window, scroll-focus dimming.
 */
export default function MarketingFeatureSections({
  sections,
  eyebrow = 'Capabilities',
  eyebrowNumber = '03',
  heading = 'What this team does on Trooper.',
  headingLines = defaultHeadingLines,
  subheading = 'Each row is one clear capability — ask in chat, watch it run, approve before anything ships.',
}: MarketingFeatureSectionsProps) {
  const rowRefs = useRef<Array<HTMLElement | null>>([]);
  const activeRef = useRef(-1);
  // -1: unmeasured; -2: reduced motion (all rows fully on)
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktopMq = window.matchMedia('(min-width: 1024px)');
    let raf = 0;

    const focusY = (r: DOMRect, desktop: boolean) =>
      desktop ? r.top + r.height / 2 : r.top + Math.min(160, r.height * 0.22);

    const distance = (el: HTMLElement, band: number, desktop: boolean) =>
      Math.abs(focusY(el.getBoundingClientRect(), desktop) - band);

    const update = () => {
      raf = 0;
      if (reduceMq.matches) {
        activeRef.current = -2;
        setActive(-2);
        return;
      }

      const desktop = desktopMq.matches;
      const band = window.innerHeight * (desktop ? 0.5 : 0.34);
      let best = -1;
      let bestD = Infinity;

      rowRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = distance(el, band, desktop);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });

      const prev = activeRef.current;
      let next = best;
      if (prev >= 0 && prev !== best) {
        const prevEl = rowRefs.current[prev];
        if (prevEl) {
          const prevD = distance(prevEl, band, desktop);
          const slack = desktop ? 56 : 96;
          if (prevD < bestD + slack) next = prev;
        }
      }

      if (next !== prev) {
        activeRef.current = next;
        setActive(next);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    reduceMq.addEventListener('change', onScroll);
    desktopMq.addEventListener('change', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      reduceMq.removeEventListener('change', onScroll);
      desktopMq.removeEventListener('change', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [sections]);

  if (!sections.length) return null;

  return (
    <SectionShell eyebrow={eyebrow} eyebrowNumber={eyebrowNumber} bgClass="bg-canvas" rhythm>
      <div className="mb-10 max-w-2xl sm:mb-14">
        {headingLines.length > 0 ? (
          <MarketingHeadline as="h2" size="section" lines={headingLines} subline={subheading} />
        ) : (
          <>
            <h2 className="font-funneldisplay text-2xl leading-snug tracking-tight text-ink sm:text-3xl md:text-4xl">
              {heading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">{subheading}</p>
          </>
        )}
      </div>

      <div className="flex flex-col gap-12 sm:gap-16 lg:gap-24">
        {sections.map((section, index) => {
          const Visual = VISUALS[section.visual] ?? CanvasBoardVisual;
          const visualFirst = section.reverse ?? index % 2 === 1;
          const dimmed = active >= 0 && index !== active;
          const focused = active === index || active === -2;
          const prompt = resolveCapabilityPrompt(section);

          return (
            <article
              key={`${section.eyebrowNumber}-${section.visual}-${index}`}
              ref={(el) => {
                rowRefs.current[index] = el;
              }}
              className={[
                'grid min-w-0 items-center gap-6 transition-[opacity,filter,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:grid-cols-2 lg:gap-12',
                dimmed
                  ? 'opacity-[0.38] max-lg:opacity-[0.48] lg:scale-[0.985] lg:opacity-40 lg:blur-[1.5px]'
                  : 'opacity-100',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <div
                className={`flex min-w-0 flex-col lg:max-w-md lg:justify-self-center ${
                  visualFirst ? 'lg:order-2' : ''
                }`}
              >
                <BubbleExchange ask={prompt.ask} reply={prompt.reply} focused={focused} />

                <h3 className="mt-6 font-funneldisplay text-xl font-medium leading-snug tracking-tight text-balance text-ink sm:text-2xl lg:text-[1.75rem] lg:leading-[1.2]">
                  {section.title}{' '}
                  {section.titleHighlight ? (
                    <span className="text-ink-muted">{section.titleHighlight}</span>
                  ) : null}
                </h3>
                {section.intro ? (
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted sm:mt-4 sm:text-[15px] sm:leading-7">
                    {section.intro}
                  </p>
                ) : null}
              </div>

              <div className={`min-w-0 ${visualFirst ? 'lg:order-1' : ''}`}>
                <div className="overflow-hidden rounded-xl bg-white shadow-[0_28px_56px_-24px_rgba(26,26,26,0.4)] ring-1 ring-black/10">
                  <div className="relative flex items-center gap-1.5 overflow-hidden rounded-t-xl border-b border-black/5 bg-neutral-50 px-3 py-2">
                    <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="size-2.5 rounded-full bg-[#febc2e]" />
                    <span className="size-2.5 rounded-full bg-[#28c840]" />
                    <span className="pointer-events-none absolute inset-x-0 text-center text-[11px] font-medium text-neutral-500">
                      {prompt.window}
                    </span>
                  </div>
                  <PixelFramedVisual>
                    <Visual />
                  </PixelFramedVisual>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </SectionShell>
  );
}
