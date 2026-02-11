import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { _loadFromJson, _loadSkills, _transformDataToPostPageView } from '../../../utils/helper';
import type { Skill } from '../../../utils/helper';
import MoveBack from '@/components/MoveBack';
import Loading from '@/components/Loading';
import Header from '@/components/ui/header';
import SkillDetailClient from './SkillDetailClient';

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

function getFaviconUrl(website: string) {
  return `https://www.google.com/s2/favicons?domain=${website}&sz=128`;
}

export async function generateStaticParams() {
  const [integrations, skills] = await Promise.all([
    _loadFromJson(false),
    _loadSkills(),
  ]);

  const integrationParams = integrations.map((item: any) => ({
    slug: item.id,
  }));

  const skillParams = skills.map((skill: Skill) => ({
    slug: skill.id,
  }));

  return [...integrationParams, ...skillParams];
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
    return {
      title: `Integrate ${integration.product.name} with CrabsHQ`,
      description: `Connect CrabsHQ to ${integration.product.name}: ${integration.product.description}`,
      openGraph: {
        images: [{ url: integration.proof.screenshot }],
      },
      alternates: {
        canonical: `https://crabshq.com/integration/${slug}`,
      },
    };
  }

  // Check skills
  const skills = await _loadSkills();
  const skill = skills.find((s: Skill) => s.id === slug);

  if (skill) {
    const relatedSkills = skills.filter((s: Skill) => s.category === skill.category && s.id !== skill.id).slice(0, 6);
    return {
      title: `${skill.name} - OpenClaw Skill | CrabsHQ`,
      description: `${skill.description}. Install with: ${skill.install_command}. Browse ${skill.category} skills and 3,000+ more on CrabsHQ.`,
      openGraph: {
        title: `${skill.name} - OpenClaw Skill`,
        description: skill.description,
        images: [{ url: getFaviconUrl(skill.website) }],
      },
      alternates: {
        canonical: `https://crabshq.com/integration/${slug}`,
      },
    };
  }

  return {
    title: 'Skill | CrabsHQ',
    description: 'Explore OpenClaw skills on CrabsHQ',
    alternates: {
      canonical: `https://crabshq.com/integration/${slug}`,
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
        <br/><br/><br/><br/><br/>
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
      </div>
    );
  }

  // Check skills
  const skills = await _loadSkills();
  const skill = skills.find((s: Skill) => s.id === slug);

  if (!skill) {
    return <Loading />;
  }

  const relatedSkills = skills
    .filter((s: Skill) => s.category === skill.category && s.id !== skill.id)
    .slice(0, 6);

  return (
    <div>
      <Header />
      <br/><br/><br/><br/><br/>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 my-8">
        <MoveBack />

        {/* Skill header */}
        <div className="flex items-start gap-5 mb-8 mt-4">
          <div className="w-16 h-16 rounded-xl bg-white border border-neutral-200 flex items-center justify-center flex-shrink-0 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getFaviconUrl(skill.website)}
              alt={skill.name}
              width={40}
              height={40}
              className="w-10 h-10"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-funneldisplay text-3xl font-bold text-slate-900">{skill.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Link
                href={`/integration?category=${encodeURIComponent(skill.category)}`}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                {skill.category}
              </Link>
              <span className="text-slate-300">&middot;</span>
              <a
                href={`https://${skill.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-500 hover:text-slate-700"
              >
                {skill.website}
              </a>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="font-funneldisplay text-xl font-bold text-slate-800 mb-2">About this skill</h2>
          <p className="text-slate-600 leading-relaxed">{skill.description}</p>
        </div>

        {/* Install command */}
        <div className="mb-8">
          <h2 className="font-funneldisplay text-xl font-bold text-slate-800 mb-3">Installation</h2>
          <SkillDetailClient installCommand={skill.install_command} />
          <p className="text-xs text-slate-400 mt-2">
            Or install manually: copy to <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-600">~/.openclaw/skills/</code> (global) or <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-600">&lt;project&gt;/skills/</code> (workspace)
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mb-10">
          <a
            href={skill.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-sm font-medium transition-colors"
          >
            View Source on GitHub
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a
            href={`https://${skill.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 rounded-md text-sm font-medium transition-colors"
          >
            Visit {skill.website}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </a>
        </div>

        {/* Related skills */}
        {relatedSkills.length > 0 && (
          <div>
            <h2 className="font-funneldisplay text-xl font-bold text-slate-800 mb-4">
              More {skill.category} skills
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {relatedSkills.map((related: Skill) => (
                <Link
                  key={related.id}
                  href={`/integration/${related.id}`}
                  className="flex items-center gap-3 p-3 bg-white border border-neutral-200 rounded-lg hover:border-neutral-300 hover:shadow-sm transition-all"
                >
                  <div className="w-8 h-8 rounded-md bg-white border border-neutral-100 flex items-center justify-center flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${related.website}&sz=32`}
                      alt={related.name}
                      width={20}
                      height={20}
                      className="w-5 h-5"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{related.name}</p>
                    <p className="text-xs text-slate-500 truncate">{related.description}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-4">
              <Link
                href="/integration"
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                View all skills &rarr;
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
