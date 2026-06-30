import UseCaseSubpageLayout from '@/components/marketing/UseCaseSubpageLayout';
import type { IndustryPageContent } from '@/lib/industryContent';

export default function IndustrySubpageLayout({ content }: { content: IndustryPageContent }) {
  return (
    <UseCaseSubpageLayout content={content} hubHref="/industries" hubLabel="All industries" />
  );
}
