import SectionShell from '@/components/ui/SectionShell';
import DarkSplitSection from '@/components/ui/DarkSplitSection';
import GovernanceSection from '@/components/GovernanceSection';
import SimplePricing from '@/components/SimplePricing';
import FounderMessageSection from '@/components/FounderMessageSection';
import FAQ from '@/components/faq';

/** Shared closing sections for feature, team, and channel marketing subpages — matches homepage [05]–[08]. Not for catalog/hub pages. */
export default function MarketingSubpageTail() {
  return (
    <>
      {/* GovernanceSection is a dark trust band and renders its own eyebrow —
          it must sit on the dark surface, not inside a white SectionShell. */}
      <DarkSplitSection>
        <GovernanceSection eyebrowNumber="05" />
      </DarkSplitSection>

      {/* `rhythm` is required here, not optional: SimplePricing,
          FounderMessageSection and FAQ no longer pad themselves, so the shell
          owns their vertical spacing on every page that renders them. */}
      <SectionShell rhythm eyebrow="Deployment Plans" eyebrowNumber="06" bgClass="bg-canvas">
        <SimplePricing />
      </SectionShell>

      <SectionShell rhythm eyebrowNumber="07" bgClass="bg-canvas">
        <FounderMessageSection />
      </SectionShell>

      <SectionShell rhythm eyebrow="Intel Brief" eyebrowNumber="08" bgClass="bg-canvas-warm">
        <FAQ />
      </SectionShell>
    </>
  );
}
