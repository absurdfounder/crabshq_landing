import SectionShell from '@/components/ui/SectionShell';
import GovernanceSection from '@/components/GovernanceSection';
import SimplePricing from '@/components/SimplePricing';
import FAQ from '@/components/faq';

/** Shared closing sections for team, feature, and channel subpages — matches homepage [05]–[07]. */
export default function MarketingSubpageTail() {
  return (
    <>
      <SectionShell eyebrow="Governance" eyebrowNumber="05" bgClass="bg-white">
        <GovernanceSection />
      </SectionShell>

      <SectionShell eyebrow="Deployment Plans" eyebrowNumber="06" bgClass="bg-white">
        <SimplePricing />
      </SectionShell>

      <SectionShell eyebrow="Intel Brief" eyebrowNumber="07" bgClass="bg-gray-50">
        <FAQ />
      </SectionShell>
    </>
  );
}
