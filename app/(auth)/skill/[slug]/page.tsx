import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { _loadSkills } from '@/app/utils/helper';
import type { Skill } from '@/app/utils/helper';
import Loading from '@/components/Loading';
import Header from '@/components/ui/header';
import SectionShell from '@/components/ui/SectionShell';
import SkillDetailClient from './SkillDetailClient';
import { HubCatalogCard } from '@/components/marketing/HubCatalogCard';
import { getSkillIconUrl, resolveSkillWebsite, githubAuthorFromLink } from '@/lib/skillIcon';
import { mergeOgImages } from '@/lib/og/buildMetadata';
import {
  buildSkillRouteIndex,
  findSkillByPageSlug,
  getSkillCanonicalUrl,
  getSkillPagePath,
  getSkillPageSlug,
} from '@/lib/skillRoutes';
import PixelButton from '@/components/ui/PixelButton';
import { ArrowRight } from 'lucide-react';

function getSkillOgIconUrl(skill: Skill) {
  return getSkillIconUrl(skill, 128);
}

export async function generateStaticParams() {
  const skills = await _loadSkills();
  const index = buildSkillRouteIndex(skills);
  return Array.from(index.bySlug.keys())
    .filter(Boolean)
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const skills = await _loadSkills();
  const index = buildSkillRouteIndex(skills);
  const skill = findSkillByPageSlug(params.slug, skills);

  if (!skill) {
    return {
      title: 'Skill | Trooper',
      description: 'Explore OpenClaw skills on Trooper',
    };
  }

  const canonical = getSkillCanonicalUrl(skill, index);

  const pageSlug = params.slug;

  return mergeOgImages(
    {
      title: `${skill.name} Skill — OpenClaw | Trooper`,
      description: `${skill.description}. Install with: ${skill.install_command}. Browse ${skill.category} skills and 3,000+ more on Trooper.`,
      openGraph: {
        title: `${skill.name} — OpenClaw Skill`,
        description: `${skill.description}. Category: ${skill.category}. Install: ${skill.install_command}`,
        type: 'article',
      },
      twitter: {
        title: `${skill.name} — OpenClaw Skill | Trooper`,
        description: skill.description,
      },
      alternates: { canonical },
      other: {
        robots: 'index, follow, max-snippet:-1',
      },
    },
    'skill',
    `${skill.name} — OpenClaw Skill`,
    pageSlug,
  );
}

function SkillStructuredData({
  skill,
  index,
}: {
  skill: Skill;
  index: ReturnType<typeof buildSkillRouteIndex>;
}) {
  const pageUrl = getSkillCanonicalUrl(skill, index);
  const pageSlug = getSkillPageSlug(skill, index);

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: skill.name,
    description: skill.description,
    codeRepository: skill.link,
    programmingLanguage: 'OpenClaw Skill',
    runtimePlatform: 'Trooper',
    url: pageUrl,
    author: {
      '@type': 'Organization',
      name: 'OpenClaw Community',
    },
    isPartOf: {
      '@type': 'SoftwareApplication',
      name: 'Trooper',
      url: 'https://trooper.so',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://trooper.so' },
      { '@type': 'ListItem', position: 2, name: 'Skills', item: 'https://trooper.so/integration' },
      {
        '@type': 'ListItem',
        position: 3,
        name: skill.category,
        item: `https://trooper.so/integration?category=${encodeURIComponent(skill.category)}`,
      },
      { '@type': 'ListItem', position: 4, name: skill.name, item: pageUrl },
    ],
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to install ${skill.name} OpenClaw skill`,
    description: `Install the ${skill.name} skill on Trooper to extend your AI agent capabilities.`,
    step: [
      {
        '@type': 'HowToStep',
        name: 'Run the install command',
        text: `Open your terminal and run: ${skill.install_command}`,
      },
      {
        '@type': 'HowToStep',
        name: 'Verify installation',
        text: 'The skill will be installed to your OpenClaw skills directory and automatically available to your AI agents.',
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
    </>
  );
}

export default async function SkillPage({ params }: { params: { slug: string } }) {
  const skills = await _loadSkills();
  const index = buildSkillRouteIndex(skills);
  const skill = findSkillByPageSlug(params.slug, skills);

  if (!skill) {
    return <Loading />;
  }

  const canonicalSlug = getSkillPageSlug(skill, index);
  if (params.slug !== canonicalSlug) {
    redirect(getSkillPagePath(skill, index));
  }

  const relatedSkills = skills
    .filter((s: Skill) => s.category === skill.category && s.id !== skill.id)
    .slice(0, 6);

  const productWebsite = resolveSkillWebsite(skill);
  const skillAuthor = githubAuthorFromLink(skill.link);
  const categoryCount = skills.filter((s: Skill) => s.category === skill.category).length;

  return (
    <article itemScope itemType="https://schema.org/SoftwareSourceCode">
      <Header />
      <SkillStructuredData skill={skill} index={index} />
      <SectionShell eyebrow="SKILL" eyebrowNumber="01" bgClass="bg-white" clearSiteHeader>
        <div className="pb-4 pt-2">
          <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ol className="flex items-center gap-1.5 font-mono text-sm text-slate-400">
              <li>
                <Link href="/" className="transition-colors hover:text-slate-600">home</Link>
              </li>
              <li className="text-slate-300">/</li>
              <li>
                <Link href="/integration" className="transition-colors hover:text-slate-600">skills</Link>
              </li>
              <li className="text-slate-300">/</li>
              <li>
                <Link
                  href={`/integration?category=${encodeURIComponent(skill.category)}`}
                  className="transition-colors hover:text-slate-600"
                >
                  {skill.category.toLowerCase()}
                </Link>
              </li>
              <li className="text-slate-300">/</li>
              <li className="font-medium text-slate-700">{canonicalSlug}</li>
            </ol>
          </nav>

          <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <main className="lg:col-span-8">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700">
                    {skill.category}
                  </span>
                  <span className="inline-flex items-center rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600">
                    OpenClaw
                  </span>
                </div>

                <h1 className="font-funneldisplay flex items-center gap-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getSkillIconUrl(skill, 128)}
                    alt=""
                    width={36}
                    height={36}
                    className="h-9 w-9 shrink-0 object-contain"
                    itemProp="image"
                  />
                  <span className="min-w-0">{skill.name}</span>
                </h1>

                <p className="mt-3 text-base leading-relaxed text-slate-600" itemProp="description">
                  {skill.description}
                </p>

                {skillAuthor ? (
                  <p className="mt-2 text-sm text-slate-500">
                    by{' '}
                    <a
                      href={`https://github.com/${skillAuthor}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-slate-700 hover:text-emerald-700"
                    >
                      {skillAuthor}
                    </a>
                  </p>
                ) : null}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <PixelButton
                    href="https://app.trooper.so"
                    external
                    size="lg"
                    tone="brand"
                    icon={<ArrowRight className="h-4 w-4" />}
                  >
                    Deploy with skills
                  </PixelButton>
                  <PixelButton
                    href={skill.link}
                    external
                    size="lg"
                    variant="outline"
                    tone="dark"
                    icon={<ArrowRight className="h-4 w-4" />}
                  >
                    View repository
                  </PixelButton>
                </div>

                <div className="mt-8">
                  <SkillDetailClient
                    installCommand={skill.install_command}
                    skillName={skill.name}
                    category={skill.category}
                    githubLink={skill.link}
                  />
                </div>

                {relatedSkills.length > 0 ? (
                  <section className="mt-10 border-t border-slate-200 pt-8">
                    <h2 className="font-funneldisplay mb-4 text-lg font-semibold text-slate-900">
                      More {skill.category} skills
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 md:gap-5">
                      {relatedSkills.map((related: Skill) => (
                        <HubCatalogCard
                          key={related.id}
                          href={getSkillPagePath(related, index)}
                          title={related.name}
                          description={related.description}
                          category={related.category}
                          viewLabel="View skill →"
                          icon={
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={getSkillIconUrl(related, 64)}
                              alt=""
                              width={28}
                              height={28}
                              className="h-7 w-7 object-contain"
                              loading="lazy"
                            />
                          }
                        />
                      ))}
                    </div>
                    <div className="mt-4">
                      <Link
                        href={`/integration?category=${encodeURIComponent(skill.category)}`}
                        className="font-mono text-sm font-medium text-emerald-600 hover:text-emerald-700"
                      >
                        View all skills &rarr;
                      </Link>
                    </div>
                  </section>
                ) : null}
              </main>

              <aside className="lg:col-span-4">
                <div className="sticky top-28 space-y-4">
                  <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-5">
                    <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Skill info
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono text-sm text-slate-500">Category</span>
                        <Link
                          href={`/integration?category=${encodeURIComponent(skill.category)}`}
                          className="text-right text-sm font-medium text-emerald-600 hover:text-emerald-700"
                        >
                          {skill.category}
                        </Link>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm text-slate-500">Skills in category</span>
                        <span className="text-sm font-medium text-slate-700">{categoryCount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm text-slate-500">Skill id</span>
                        <span className="font-mono text-sm font-medium text-slate-700">{skill.id}</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-white p-5">
                    <h3 className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Repository
                    </h3>
                    <a
                      href={skill.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 font-mono text-sm text-slate-700 hover:text-slate-900"
                      itemProp="codeRepository"
                    >
                      View on GitHub
                    </a>
                    {productWebsite ? (
                      <a
                        href={`https://${productWebsite}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mt-2 flex items-center gap-2 font-mono text-sm text-slate-700 hover:text-slate-900"
                      >
                        {productWebsite}
                      </a>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/integration?category=${encodeURIComponent(skill.category)}`}
                      className="rounded-full border border-slate-200 px-2.5 py-0.5 text-xs text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-800"
                    >
                      {skill.category.toLowerCase()}
                    </Link>
                    {['openclaw', 'skill', 'ai-agent'].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200 px-2.5 py-0.5 text-xs text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-slate-900 p-5">
                    <h3 className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Quick install
                    </h3>
                    <code className="block break-all font-mono text-xs text-green-400">{skill.install_command}</code>
                    <Link
                      href="https://trooper.so/features/skills-plugins"
                      className="mt-3 inline-block font-mono text-xs text-slate-400 hover:text-slate-300"
                    >
                      Learn more about skills &rarr;
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </SectionShell>
    </article>
  );
}
