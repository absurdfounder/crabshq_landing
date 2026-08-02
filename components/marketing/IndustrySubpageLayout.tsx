import UseCaseSubpageLayout from '@/components/marketing/UseCaseSubpageLayout';
import type { IndustryPageContent } from '@/lib/industryContent';
import { getIndustryOldStack } from '@/lib/oldStackContent';

export default function IndustrySubpageLayout({ content }: { content: IndustryPageContent }) {
  const oldStack = getIndustryOldStack(content.slug);
  return (
    <UseCaseSubpageLayout
      content={content}
      hubHref="/industries"
      hubLabel="All industries"
      oldStack={oldStack}
    />
  );
}
