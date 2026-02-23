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
        title: `${integration.product.name} Integration | CrabsHQ`,
        description: `Connect CrabsHQ to ${integration.product.name}: ${integration.product.description}`,
        images: [{ url: integration.proof.screenshot }],
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${integration.product.name} Integration | CrabsHQ`,
        description: integration.product.description,
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
    return {
      title: `${skill.name} Skill — OpenClaw | CrabsHQ`,
      description: `${skill.description}. Install with: ${skill.install_command}. Browse ${skill.category} skills and 3,000+ more on CrabsHQ.`,
      openGraph: {
        title: `${skill.name} — OpenClaw Skill`,
        description: `${skill.description}. Category: ${skill.category}. Install: ${skill.install_command}`,
        images: [{ url: getFaviconUrl(skill.website) }],
        type: 'article',
      },
      twitter: {
        card: 'summary',
        title: `${skill.name} — OpenClaw Skill | CrabsHQ`,
        description: skill.description,
      },
      alternates: {
        canonical: `https://crabshq.com/integration/${slug}`,
      },
      other: {
        'robots': 'index, follow, max-snippet:-1',
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

// Structured data component for skill pages
function SkillStructuredData({ skill, relatedSkills }: { skill: Skill; relatedSkills: Skill[] }) {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "name": skill.name,
    "description": skill.description,
    "codeRepository": skill.link,
    "programmingLanguage": "OpenClaw Skill",
    "runtimePlatform": "CrabsHQ",
    "url": `https://crabshq.com/integration/${skill.id}`,
    "author": {
      "@type": "Organization",
      "name": "OpenClaw Community"
    },
    "isPartOf": {
      "@type": "SoftwareApplication",
      "name": "CrabsHQ",
      "url": "https://crabshq.com"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://crabshq.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Skills",
        "item": "https://crabshq.com/integration"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": skill.category,
        "item": `https://crabshq.com/integration?category=${encodeURIComponent(skill.category)}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": skill.name,
        "item": `https://crabshq.com/integration/${skill.id}`
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to install ${skill.name} OpenClaw skill`,
    "description": `Install the ${skill.name} skill on CrabsHQ to extend your AI agent capabilities.`,
    "step": [
      {
        "@type": "HowToStep",
        "name": "Run the install command",
        "text": `Open your terminal and run: ${skill.install_command}`
      },
      {
        "@type": "HowToStep",
        "name": "Verify installation",
        "text": `The skill will be installed to your OpenClaw skills directory and automatically available to your AI agents.`
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is the ${skill.name} OpenClaw skill?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${skill.name} is an OpenClaw skill in the ${skill.category} category. ${skill.description}. It can be installed using: ${skill.install_command}`
        }
      },
      {
        "@type": "Question",
        "name": `How do I install ${skill.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Run the command: ${skill.install_command}. You can also install manually by copying to ~/.openclaw/skills/ (global) or <project>/skills/ (workspace).`
        }
      },
      {
        "@type": "Question",
        "name": `What category is ${skill.name} in?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${skill.name} belongs to the "${skill.category}" category. You can browse more skills in this category on the CrabsHQ skills catalog.`
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
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

  // Get category skills count
  const categoryCount = skills.filter((s: Skill) => s.category === skill.category).length;

  return (
    <article itemScope itemType="https://schema.org/SoftwareSourceCode">
      <Header />
      <SkillStructuredData skill={skill} relatedSkills={relatedSkills} />
      <div className="pt-24 pb-4">
        {/* Breadcrumb navigation */}
        <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-1.5 text-sm font-mono text-slate-400">
            <li>
              <Link href="/" className="hover:text-slate-600 transition-colors">home</Link>
            </li>
            <li className="text-slate-300">/</li>
            <li>
              <Link href="/integration" className="hover:text-slate-600 transition-colors">skills</Link>
            </li>
            <li className="text-slate-300">/</li>
            <li>
              <Link href={`/integration?category=${encodeURIComponent(skill.category)}`} className="hover:text-slate-600 transition-colors">
                {skill.category.toLowerCase()}
              </Link>
            </li>
            <li className="text-slate-300">/</li>
            <li className="text-slate-700 font-medium" itemProp="name">{skill.id}</li>
          </ol>
        </nav>

        {/* Main content grid - playbooks.com style 9:3 ratio */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Left column - Primary content (9 cols) */}
            <main className="lg:col-span-8">
              {/* Skill header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getFaviconUrl(skill.website)}
                    alt={skill.name}
                    width={36}
                    height={36}
                    className="w-9 h-9"
                    itemProp="image"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h1 className="font-mono text-2xl font-bold text-slate-900" itemProp="name">
                      {skill.id}
                      <span className="text-slate-400 font-normal ml-2">skill</span>
                    </h1>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                      safe
                    </span>
                  </div>
                  <a
                    href={skill.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-500 hover:text-slate-700 font-mono mt-1 inline-flex items-center gap-1"
                    itemProp="codeRepository"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    View repository
                  </a>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-600 leading-relaxed mb-6 text-base" itemProp="description">
                {skill.description}
              </p>

              {/* Client-side interactive content: install command, file explorer, collapsible sections */}
              <SkillDetailClient
                installCommand={skill.install_command}
                skillName={skill.name}
                skillDescription={skill.description}
                category={skill.category}
                website={skill.website}
                githubLink={skill.link}
              />

              {/* Related skills */}
              {relatedSkills.length > 0 && (
                <section className="mt-10 pt-8 border-t border-slate-200">
                  <h2 className="font-mono text-lg font-semibold text-slate-900 mb-4">
                    More {skill.category} skills
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {relatedSkills.map((related: Skill) => (
                      <Link
                        key={related.id}
                        href={`/integration/${related.id}`}
                        className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg hover:border-slate-300 hover:shadow-sm transition-all group"
                      >
                        <div className="w-8 h-8 rounded-md bg-white border border-slate-100 flex items-center justify-center flex-shrink-0">
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
                          <p className="text-sm font-medium text-slate-900 truncate group-hover:text-slate-700">{related.name}</p>
                          <p className="text-xs text-slate-500 truncate">{related.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Link
                      href="/integration"
                      className="text-sm text-red-600 hover:text-red-700 font-medium font-mono"
                    >
                      View all skills &rarr;
                    </Link>
                  </div>
                </section>
              )}
            </main>

            {/* Right sidebar (4 cols) - playbooks.com style */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 space-y-4">

                {/* Skill info card */}
                <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4">
                  <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">Skill Info</h3>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500 font-mono">Category</span>
                      <Link
                        href={`/integration?category=${encodeURIComponent(skill.category)}`}
                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        {skill.category}
                      </Link>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500 font-mono">Skills in category</span>
                      <span className="text-sm text-slate-700 font-medium">{categoryCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500 font-mono">Status</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                {/* Repository card */}
                <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3">
                  <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">Repository</h3>
                  <a
                    href={skill.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-slate-700 hover:text-slate-900 font-mono group"
                  >
                    <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    View on GitHub
                    <svg className="w-3 h-3 text-slate-300 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                  <a
                    href={`https://${skill.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-slate-700 hover:text-slate-900 font-mono group"
                  >
                    <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                    {skill.website}
                    <svg className="w-3 h-3 text-slate-300 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                </div>

                {/* Tags card */}
                <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3">
                  <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/integration?category=${encodeURIComponent(skill.category)}`}
                      className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 transition-colors"
                    >
                      {skill.category.toLowerCase()}
                    </Link>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 text-slate-600">
                      openclaw
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 text-slate-600">
                      skill
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 text-slate-600">
                      ai-agent
                    </span>
                  </div>
                </div>

                {/* Quick install card */}
                <div className="bg-slate-900 border border-slate-700 rounded-lg p-5 space-y-3">
                  <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">Quick Install</h3>
                  <code className="block text-sm text-green-400 font-mono break-all">
                    {skill.install_command}
                  </code>
                  <a
                    href="https://crabshq.com/features/skills-plugins"
                    className="text-xs text-slate-400 hover:text-slate-300 font-mono"
                  >
                    Learn more about skills &rarr;
                  </a>
                </div>

              </div>
            </aside>

          </div>
        </div>
      </div>
    </article>
  );
}
