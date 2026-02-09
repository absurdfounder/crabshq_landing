import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { _loadFromJson, _transformDataToPostPageView } from '../../../utils/helper';
import MoveBack from '@/components/MoveBack';
import Loading from '@/components/Loading';
import Header from '@/components/ui/header';

// Type definitions
interface CallToAction {
  text: string;
  link: string;
}

interface ViewDemo {
  text: string;
  link: string;
}

interface Product {
  logo: string;
  name: string;
  type: string;
  provider: string;
  description: string;
  callToAction: CallToAction;
  callToCopy: CallToAction;
  viewDemo: ViewDemo;
}

interface ContentSection {
  content: string;
}

interface Proof {
  screenshot: string;
  youtubevideo: string;
}

interface FilterBySlugType {
  id: string;
  product: Product;
  overview: ContentSection;
  howItWorks: ContentSection;
  configuration: ContentSection;
  proof: Proof;
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const content = await _loadFromJson(false);
  const filteredContent = content.find((item: { id: string }) => item.id === slug) as FilterBySlugType;

  if (!filteredContent) {
    return {
      title: 'Integrate Integration with CrabsHQ',
      description: 'Connect CrabsHQ to an integration',
      alternates: {
        canonical: `https://crabshq.com/integration/${slug}`,
      },
    };
  }

  return {
    title: `Integrate ${filteredContent.product.name} with CrabsHQ`,
    description: `Connect CrabsHQ  to ${filteredContent.product.name}: ${filteredContent.product.description}`,
    openGraph: {
      images: [{ url: filteredContent.proof.screenshot }],
    },
    alternates: {
      canonical: `https://crabshq.com/integration/${slug}`,
    },
  };
}

async function getData(slug: string) {
  const content = await _loadFromJson(false);
  const filteredContent = content.find((item: { id: string }) => item.id === slug) as FilterBySlugType;
  if (filteredContent) {
    // Add default values for missing properties
    const enhancedContent = {
      ...filteredContent,
      product: {
        ...filteredContent.product,
        type: 'integration',
        callToCopy: filteredContent.product.callToAction,
        viewDemo: {
          text: 'View Demo',
          link: filteredContent.proof.youtubevideo || '#'
        }
      }
    };
    const transformedData = _transformDataToPostPageView(enhancedContent);
    return { filterBySlug: filteredContent, postPageView: transformedData };
  }
  return null;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getData(params.slug);

  if (!data) {
    return <Loading />;
  }

  const { filterBySlug, postPageView } = data;

  return (
    <div>
      <Header />

<br/>
<br/>
<br/>
<br/>
<br/>


      <div className="max-w-6xl m-auto my-8">
        <div className="grid grid-cols-1 gap-y-8 gap-x-8 lg:grid-cols-2 xl:gap-x-12">
          <div>
            <MoveBack />
            <div className="flex gap-4 mb-4">
              <Image
                alt="Logo"
                height={100}
                width={100}
                className="rounded-md object-cover w-20 h-20 mt-6 p-2"
                src={filterBySlug.product.logo}
              />
              <div>
                <h1 className="font-funneldisplay text-3xl font-bold text-slate-800 mt-8">{filterBySlug.product.name}</h1>
                <p className="text-md text-slate-600">{filterBySlug.product.provider}</p>
              </div>
            </div>
            <div className="text-slate-800">
              <p>{filterBySlug.product.description}</p>
            </div>
            <div className="flex mt-4 gap-4">
              <div className="flex space-x-2 items-center">
                <Link
                  href={filterBySlug.product.callToAction.link}
                  className="bg-slate-900 hover:bg-slate-700 text-white cursor-pointer font-bold py-2 px-4 rounded-md inline-flex items-center"
                  target="_blank" rel="noopener" 
                >
                  <span>Install</span>
                </Link>
              </div>
            </div>
          </div>

          <Image
            src={filterBySlug.proof.screenshot}
            alt={filterBySlug.product.name}
            width={400}
            height={450}
            className="w-full rounded-2xl object-cover shadow-xl"
            quality="90"
          />
        </div>

        <div className="mb-4">
          <h1 className="font-funneldisplay text-2xl font-bold text-slate-800">Overview</h1>
          <p className="text-md text-slate-600">{filterBySlug.overview.content}</p>
        </div>

        <div className="mb-4">
          <h1 className="font-funneldisplay text-2xl font-bold text-slate-800">How it Works</h1>
          <p className="text-md text-slate-600">{filterBySlug.howItWorks.content}</p>
        </div>

        <div className="mb-4">
          <h1 className="font-funneldisplay font-funneldisplay text-2xl font-bold text-slate-800">Configuration</h1>
          <p className="text-md text-slate-600">{filterBySlug.configuration.content}</p>
        </div>
      </div>
    </div>
  );
}
