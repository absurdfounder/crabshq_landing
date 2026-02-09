import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import { _loadFromJson, _transformDataToPostPageView, renderContent } from '../../../utils/helper';
import Image from 'next/image';
import Link from 'next/link';
import MoveBack from '@/components/MoveBack';
import Loading from '@/components/Loading';
import Header from '@/components/ui/header';

// Make the interfaces consistent with the ones in helper.tsx
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
  provider: string;
  type: string;
  description: string;
  callToCopy: CallToAction;
  viewDemo: ViewDemo;
  callToAction?: CallToAction; // Make this optional to match the helper.tsx definition
  tags?: string[];
}

interface ContentSection {
  content: string;
}

interface Proof {
  screenshot: string;
  youtubevideo: string;
}

interface Template {
  id: string;
  product: Product;
  overview: ContentSection;
  howItWorks: ContentSection;
  configuration: ContentSection;
  proof: Proof;
}

// Function to truncate text
const truncateText = (text: string, maxLength: number): string => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const slug = params.slug;
    const content = await _loadFromJson();

    if (!content) {
      return {
        title: 'Wonder- Error Loading Content',
        description: 'Unable to load template content',
        alternates: {
          canonical: `https://crabshq.com/showcase/${slug}`,
        },
      };
    }

    const filteredContent = content.find((item: { id: string }) => item.id === slug) as Template;

    if (!filteredContent) {
      return {
        title: 'CrabsHQ vs Unknown Template',
        description: 'Compare CrabsHQ  to an unknown template',
        alternates: {
          canonical: `https://crabshq.com/showcase/${slug}`,
        },
      };
    }

    return {
      title: `${filteredContent.product.name}`,
      description: `${filteredContent.product.name}: ${filteredContent.product.description}`,
      openGraph: {
        images: [{ url: filteredContent.proof.screenshot }],
      },
      alternates: {
        canonical: `https://crabshq.com/showcase/${slug}`,
      },
    };
  } catch (error) {
    console.error('Error in generateMetadata:', error);
    return {
      title: 'Wonder- Error',
      description: 'An error occurred while loading the content',
      alternates: {
        canonical: `https://crabshq.com/showcase/${params.slug}`,
      },
    };
  }
}

async function getData(slug: string): Promise<{
  filterBySlug: Template;
  postPageView: any;
  relatedTemplates: Template[];
} | null> {
  const content = await _loadFromJson();
  const filteredContent = content.find((item: { id: string }) => item.id === slug) as Template;

  if (filteredContent) {
    // Add callToAction if it doesn't exist
    if (!filteredContent.product.callToAction) {
      filteredContent.product.callToAction = filteredContent.product.callToCopy;
    }

    const transformedData = _transformDataToPostPageView(filteredContent);

    // Find related templates based on type or tags
    let relatedTemplates: Template[] = [];

    if (filteredContent.product.tags && filteredContent.product.tags.length > 0) {
      // Find templates with matching tags
      relatedTemplates = content
        .filter((item: Template) =>
          item.id !== slug && // Not the current template
          item.product.tags && // Has tags
          item.product.tags.some((tag: string) =>
            filteredContent.product.tags?.includes(tag)
          )
        )
        .slice(0, 3);
    }

    // If not enough related templates by tags, add some based on type
    if (relatedTemplates.length < 3) {
      const typeRelated = content
        .filter((item: Template) =>
          item.id !== slug && // Not the current template
          item.product.type === filteredContent.product.type && // Same type
          !relatedTemplates.some(rel => rel.id === item.id) // Not already included
        )
        .slice(0, 3 - relatedTemplates.length);

      relatedTemplates = [...relatedTemplates, ...typeRelated];
    }

    // If still not enough, just add random ones
    if (relatedTemplates.length < 3) {
      const randomRelated = content
        .filter((item: Template) =>
          item.id !== slug && // Not the current template
          !relatedTemplates.some(rel => rel.id === item.id) // Not already included
        )
        .slice(0, 3 - relatedTemplates.length);

      relatedTemplates = [...relatedTemplates, ...randomRelated];
    }

    return {
      filterBySlug: filteredContent,
      postPageView: transformedData,
      relatedTemplates
    };
  }

  return null;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getData(params.slug);

  if (!data) {
    return <Loading />;
  }

  const { filterBySlug, postPageView, relatedTemplates } = data;

  return (
    <div>
      <Header />

<br/>
<br/>
<br/>
<br/>
<br/>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back navigation */}
        <div className="mb-8">
          <MoveBack />
        </div>

        {/* Hero section with improved layout */}
        <div className="grid gap-8 items-start mb-16">
          <div className="space-y-6">
            {/* Template header */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-red-100 text-red-700 text-xs font-medium px-3 py-1 rounded-md">
                  {filterBySlug.product.type}
                </span>
                <span className="text-sm text-slate-600 flex items-center">
                  by <span className="font-medium ml-1">{filterBySlug.product.provider}</span>
                </span>
              </div>
              <h1 className="font-funneldisplay text-4xl font-bold text-slate-900 tracking-tight">{filterBySlug.product.name}</h1>
            </div>

            {/* Description */}
            <p className="text-lg text-slate-700 leading-relaxed">
              {filterBySlug.product.description}
            </p>

            {/* Tags with improved styling */}
            {filterBySlug.product.tags && filterBySlug.product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {filterBySlug.product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-slate-100 text-slate-600 text-xs font-medium px-3 py-1.5 rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* CTAs with improved design */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href={filterBySlug.product.callToCopy.link}
                className="bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-6 rounded-lg inline-flex items-center transition duration-200 shadow-sm"
                target="_blank" rel="noopener" 
              >
                <span>{filterBySlug.product.callToCopy.text}</span>
              </Link>
              <Link
                href={filterBySlug.product.viewDemo.link}
                className="bg-white hover:bg-gray-50 text-slate-800 font-medium py-3 px-6 rounded-lg inline-flex items-center border border-slate-200 transition duration-200"
                target="_blank" rel="noopener" 
              >
                <span>{filterBySlug.product.viewDemo.text}</span>
              </Link>
            </div>
          </div>

          {/* Screenshot with improved presentation */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-red-100 to-blue-100 rounded-2xl transform rotate-1 scale-105 opacity-30 -z-10"></div>
            <div className="relative overflow-hidden rounded-xl shadow-2xl border border-slate-200">
              <Image
                src={filterBySlug.proof.screenshot}
                alt={filterBySlug.product.name}
                width={600}
                height={400}
                className="w-full object-cover"
                quality="95"
              />
            </div>
          </div>
        </div>

        {/* Content sections with improved cards */}
        <div className="grid gap-8 mb-16">
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition duration-300">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
              <span className="bg-red-100 text-red-700 w-8 h-8 rounded-md flex items-center justify-center text-sm mr-3">1</span>
              About
            </h2>
            <p className="text-slate-700 leading-relaxed">{filterBySlug.overview.content}</p>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition duration-300">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-md flex items-center justify-center text-sm mr-3">2</span>
              Features
            </h2>
            <p className="text-slate-700 leading-relaxed">{filterBySlug.howItWorks.content}</p>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition duration-300">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
              <span className="bg-green-100 text-green-700 w-8 h-8 rounded-md flex items-center justify-center text-sm mr-3">3</span>
              Setup
            </h2>
            <div className="text-slate-700 leading-relaxed whitespace-pre-line">{filterBySlug.configuration.content}</div>
          </div>
        </div>

        {/* Related Templates Section with improved cards */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
            <span className="mr-3 bg-slate-100 w-10 h-10 rounded-md flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-700" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
            </span>
            Related Templates
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedTemplates.map((template, index) => (
              <Link
                href={`/showcase/${template.id}`}
                key={index}
                className="group flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition duration-300"
              >
                <div className=" bg-gray-50 border-b flex justify-center items-center ">
                  <Image
                    className="object-contain h-full w-full transition-transform duration-300 group-hover:scale-110"
                    width={120}
                    height={80}
                    src={template.product.logo}
                    unoptimized
                    alt={template.product.name}
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <div className="mb-3">
                    <span className="bg-red-50 text-red-600 text-xs font-medium px-2.5 py-1 rounded-md">
                      {template.product.type}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-800 group-hover:text-red-600 transition-colors text-lg mb-2">
                    {template.product.name}
                  </h3>

                  <p className="text-sm text-slate-600 mb-4 flex-grow">
                    {truncateText(template.product.description, 100)}
                  </p>

                  {/* Show up to 3 tags */}
                  {template.product.tags && template.product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {template.product.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                      {template.product.tags.length > 3 && (
                        <span className="text-xs text-slate-500 px-2.5 py-1">+{template.product.tags.length - 3}</span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
