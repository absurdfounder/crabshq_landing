import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { _loadFromJson, _loadSkills, _transformDataToPostPageView } from '../../../utils/helper';
import { mergeOgImages } from '@/lib/og/buildMetadata';
import MoveBack from '@/components/MoveBack';
import Loading from '@/components/Loading';
import Header from '@/components/ui/header';
import SectionShell from '@/components/ui/SectionShell';
import {
  buildSkillRouteIndex,
  findSkillByPageSlug,
  getSkillPagePath,
} from '@/lib/skillRoutes';

// Type definitions for integrations
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

export async function generateStaticParams() {
  const integrations = await _loadFromJson(false);
  return integrations.map((item: { id: string }) => ({
    slug: item.id,
  }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;

  // Check integrations first
  const integrations = await _loadFromJson(false);
  const integration = integrations.find((item: { id: string }) => item.id === slug) as FilterBySlugType | undefined;

  if (integration) {
    return mergeOgImages(
      {
        title: `Integrate ${integration.product.name} with Trooper`,
        description: `Connect Trooper to ${integration.product.name}: ${integration.product.description}`,
        openGraph: {
          title: `${integration.product.name} Integration | Trooper`,
          description: `Connect Trooper to ${integration.product.name}: ${integration.product.description}`,
          type: 'article',
        },
        twitter: {
          title: `${integration.product.name} Integration | Trooper`,
          description: integration.product.description,
        },
        alternates: {
          canonical: `https://trooper.so/integration/${slug}`,
        },
      },
      'legacy-integration',
      `${integration.product.name} Integration | Trooper`,
      slug,
    );
  }

  return {
    title: 'Integration | Trooper',
    description: 'Explore Trooper integrations',
    alternates: {
      canonical: `https://trooper.so/integration/${slug}`,
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  // Check integrations first
  const integrations = await _loadFromJson(false);
  const integration = integrations.find((item: { id: string }) => item.id === slug) as FilterBySlugType | undefined;

  if (integration) {
    const enhancedContent = {
      ...integration,
      product: {
        ...integration.product,
        type: 'integration',
        callToCopy: integration.product.callToAction,
        viewDemo: {
          text: 'View Demo',
          link: integration.proof.youtubevideo || '#'
        }
      }
    };
    const transformedData = _transformDataToPostPageView(enhancedContent);

    return (
      <div>
        <Header />
        <SectionShell eyebrow="OVERVIEW" eyebrowNumber="01" bgClass="bg-white" clearSiteHeader>
        <div className="max-w-6xl m-auto my-8 px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-y-8 gap-x-8 lg:grid-cols-2 xl:gap-x-12">
            <div>
              <MoveBack />
              <div className="flex gap-4 mb-4">
                <Image
                  alt="Logo"
                  height={100}
                  width={100}
                  className="rounded-md object-cover w-20 h-20 mt-6 p-2"
                  src={integration.product.logo}
                />
                <div>
                  <h1 className="font-funneldisplay text-3xl font-bold text-slate-800 mt-8">{integration.product.name}</h1>
                  <p className="text-md text-slate-600">{integration.product.provider}</p>
                </div>
              </div>
              <div className="text-slate-800">
                <p>{integration.product.description}</p>
              </div>
              <div className="flex mt-4 gap-4">
                <div className="flex space-x-2 items-center">
                  <Link
                    href={integration.product.callToAction.link}
                    className="bg-slate-900 hover:bg-slate-700 text-white cursor-pointer font-bold py-2 px-4 rounded-md inline-flex items-center"
                    target="_blank" rel="noopener"
                  >
                    <span>Install</span>
                  </Link>
                </div>
              </div>
            </div>
            <Image
              src={integration.proof.screenshot}
              alt={integration.product.name}
              width={400}
              height={450}
              className="w-full rounded-2xl object-cover shadow-xl"
              quality="90"
            />
          </div>
        </div>
        </SectionShell>

        <SectionShell eyebrow="HOW IT WORKS" eyebrowNumber="02" bgClass="bg-slate-50">
        <div className="max-w-6xl m-auto py-8 px-4 sm:px-6">
          <div className="mb-4">
            <h1 className="font-funneldisplay text-2xl font-bold text-slate-800">Overview</h1>
            <p className="text-md text-slate-600">{integration.overview.content}</p>
          </div>
          <div className="mb-4">
            <h1 className="font-funneldisplay text-2xl font-bold text-slate-800">How it Works</h1>
            <p className="text-md text-slate-600">{integration.howItWorks.content}</p>
          </div>
          <div className="mb-4">
            <h1 className="font-funneldisplay text-2xl font-bold text-slate-800">Configuration</h1>
            <p className="text-md text-slate-600">{integration.configuration.content}</p>
          </div>
        </div>
        </SectionShell>
      </div>
    );
  }

  // Legacy skill URLs under /integration/* → /skill/*
  const skills = await _loadSkills();
  const skill = findSkillByPageSlug(slug, skills);
  if (skill) {
    const index = buildSkillRouteIndex(skills);
    redirect(getSkillPagePath(skill, index));
  }

  return <Loading />;
}
