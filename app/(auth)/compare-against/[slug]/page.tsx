import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Rating from '../Rating';
import AggregateStats from '../AggregateStats';
import TrustedBy from '../TrustedBy';
import ComparisonTable from '../ComparisonTable';
import TemplateDesign from '../TemplateDesign';
import TemplateLibrary from '../TemplateList';
import { _loadFromJsonComparison, _transformDataToPostPageView } from '../../../utils/helper';
import MoveBack from '@/components/MoveBack';
import Loading from '@/components/Loading';
import Header from '@/components/ui/header';

interface CallToAction {
  text: string;
  link: string;
}

interface Product {
  logo: string;
  name: string;
  provider: string;
  description: string;
  heroimage: string;
}

interface ContentSection {
  content: string;
}

interface Proof {
  screenshot: string;
  youtubevideo: string;
}

interface ComparisonFeature {
  feature: string;
  feature_value: {
    Item: boolean;
    Notion: boolean;
  };
}

interface FilterBySlugType {
  id: string;
  product: Product;
  overview?: ContentSection;
  howItWorks?: ContentSection;
  configuration?: ContentSection;
  proof?: Proof;
  comparison_table?: ComparisonFeature[]; // Make optional if not always present
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const content = await _loadFromJsonComparison();
  const filteredContent = content.find((item: { id: string }) => item.id === slug) as FilterBySlugType;

  if (!filteredContent) {
    throw new Error('Comparision not found');
  }

  return {
    title: `The simple, powerful ${filteredContent.product.name} alternative - Wonder vs ${filteredContent.product.name}`,
    description: `Wonder is the fast, modern ${filteredContent.product.name} alternative built on notion as a CMS, it's focused completely on professional website publishing. You can publish a blog, helpdesk, directory or even a 2-sided marketplace. 
Compare Wonder  to ${filteredContent.product.name}: ${filteredContent.product.description}`,
    openGraph: {
      images: [{ url: filteredContent.product.heroimage }],
    },
    alternates: {
      canonical: `https://crabshq.com/compare-against/${slug}`,
    },
  };
}

export default async function ComparisonAgainst({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const content = await _loadFromJsonComparison();
  const filteredContent = content.find((item: { id: string }) => item.id === slug) as FilterBySlugType;

  if (!filteredContent) {
    return <Loading />;
  }

  return (
    <section >
      <Header />

<br/>
<br/>
<br/>
<br/>
<br/>


      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="pt-24 pb-12 md:pt-20 md:pb-20">
          <div className="max-w-xl mx-auto text-center pb-12 md:pb-20 pt-12">
            <Image
              src={filteredContent.product.heroimage}
              alt={filteredContent.product.name}
              width={150}
              height={300}
              loading="eager"
              className="w-full max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-sm rounded-md p-8 mb-8 m-auto"
            />
            <h1 className="text-4xl font-bold mb-4 font-funneldisplay">
              Tired of <b>{filteredContent.product.name}</b>? <br /> Say hi to Wonder  Sites
            </h1>
            <p className="text-lg sm:text-xl text-slate-600">
              {filteredContent.product.description}
            </p>
            <Link href="https://app.crabshq.com" className="text-white bg-slate-900 rounded-md w-fit p-2 mt-4 px-4 mt-2 block m-auto">
              Build sites using AI
            </Link>
          </div>
          <TrustedBy />
          <ComparisonTable id={filteredContent.id} />
          <Rating />
          <TemplateDesign />
          <AggregateStats />
          <TemplateLibrary />
        </div>
      </div>
    </section>
  );
}
