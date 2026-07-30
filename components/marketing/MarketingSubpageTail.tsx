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

      <SectionShell eyebrow="Deployment Plans" eyebrowNumber="06" bgClass="bg-white">
        <SimplePricing />
      </SectionShell>

      <SectionShell eyebrow="Message from the founder" eyebrowNumber="07" bgClass="bg-white">
        <FounderMessageSection />
      </SectionShell>

      <SectionShell eyebrow="Intel Brief" eyebrowNumber="08" bgClass="bg-gray-50">
        <FAQ />
      </SectionShell>
    </>
  );
}
