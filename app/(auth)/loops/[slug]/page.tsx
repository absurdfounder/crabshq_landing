import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/ui/header';
import SectionShell from '@/components/ui/SectionShell';
import Loading from '@/components/Loading';
import PixelButton from '@/components/ui/PixelButton';
import {
  formatLoopCount,
  getAllLoopSlugs,
  getAllLoops,
  getLoopBySlug,
  type EnrichedLoop,
} from '@/lib/loopCatalog';
import LoopDetailClient from './LoopDetailClient';
import { LoopRequirementsPanel } from '@/components/loops/LoopRequirementsPanel';
import { InspiredByBadge } from '@/components/loops/InspiredByBadge';
import { mergeOgImages } from '@/lib/og/buildMetadata';
import { HubCatalogCard } from '@/components/marketing/HubCatalogCard';
import {
  ArrowRight,
  Eye,
  GitBranch,
  LayoutGrid,
  Shield,
  TestTube,
  type LucideIcon,
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  CI: GitBranch,
  Review: Eye,
  Testing: TestTube,
  Quality: Shield,
};

function getCategoryIcon(category: string): LucideIcon {
  return CATEGORY_ICONS[category] || LayoutGrid;
}

export async function generateStaticParams() {
  return getAllLoopSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const loop = getLoopBySlug(params.slug);
  if (!loop) {
    return { title: 'Loop | Trooper' };
  }
  return mergeOgImages(
    {
      title: `${loop.title} Loop | Trooper`,
      description: `${loop.description} Copy the kickoff prompt for Cursor, Claude Code, or Codex.`,
      alternates: {
        canonical: `https://trooper.so/loops/${loop.slug}`,
      },
      openGraph: {
        title: `${loop.title} — Agent Loop`,
        description: loop.description,
        type: 'article',
      },
    },
    'loop',
    `${loop.title} — Agent Loop`,
    loop.slug,
  );
}

function RelatedLoopCard({ loop }: { loop: EnrichedLoop }) {
  const CategoryIcon = getCategoryIcon(loop.category);

  return (
    <HubCatalogCard
      href={`/loops/${loop.slug}`}
      title={loop.title}
      description={loop.description}
      category={loop.category}
      footerMeta={loop.trigger}
      viewLabel="View loop →"
      icon={<CategoryIcon className="h-5 w-5 text-slate-700" aria-hidden />}
    />
  );
}

export default function LoopDetailPage({ params }: { params: { slug: string } }) {
  const loop = getLoopBySlug(params.slug);

  if (!loop) {
    return <Loading />;
  }

  const categoryCount = getAllLoops().filter((l) => l.category === loop.category).length;
  const CategoryIcon = getCategoryIcon(loop.category);

  return (
    <article>
      <Header />
      <SectionShell eyebrow="LOOP" eyebrowNumber="01" bgClass="bg-white" clearSiteHeader>
        <div className="pb-4 pt-2">
          <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ol className="flex items-center gap-1.5 font-mono text-sm text-slate-400">
              <li>
                <Link href="/" className="transition-colors hover:text-slate-600">home</Link>
              </li>
              <li className="text-slate-300">/</li>
              <li>
                <Link href="/loops" className="transition-colors hover:text-slate-600">loops</Link>
              </li>
              <li className="text-slate-300">/</li>
              <li>
                <Link
                  href={`/loops?category=${encodeURIComponent(loop.category)}`}
                  className="transition-colors hover:text-slate-600"
                >
                  {loop.category.toLowerCase()}
                </Link>
              </li>
              <li className="text-slate-300">/</li>
              <li className="font-medium text-slate-700">{loop.slug}</li>
            </ol>
          </nav>

          <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <main className="lg:col-span-8">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700">
                    {loop.category}
                  </span>
                  <span className="inline-flex items-center rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600">
                    {loop.trigger}
                  </span>
                  {loop.hardened ? (
                    <span className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600">
                      Hardened
                    </span>
                  ) : null}
                  {loop.tier === 'draft' ? (
                    <span className="rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800">
                      Template
                    </span>
                  ) : null}
                </div>

                <h1 className="font-funneldisplay flex items-center gap-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  <CategoryIcon className="h-8 w-8 shrink-0 text-slate-700" aria-hidden />
                  <span className="min-w-0">{loop.title}</span>
                </h1>

                <p className="mt-3 text-base leading-relaxed text-slate-600">{loop.description}</p>

                {loop.inspiredBy ? (
                  <InspiredByBadge company={loop.inspiredBy.company} url={loop.inspiredBy.url} className="mt-2" />
                ) : null}

                <p className="mt-2 text-sm text-slate-500">by {loop.author}</p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <PixelButton
                    href="https://app.trooper.so"
                    external
                    size="lg"
                    tone="brand"
                    icon={<ArrowRight className="h-4 w-4" />}
                  >
                    Run in Trooper
                  </PixelButton>
                  <PixelButton
                    href="/loops"
                    size="lg"
                    variant="outline"
                    tone="dark"
                    icon={<ArrowRight className="h-4 w-4" />}
                  >
                    All loops
                  </PixelButton>
                </div>

                <div className="mt-8">
                  <LoopDetailClient
                    kickoffPrompt={loop.kickoffPrompt}
                    mermaid={loop.mermaid}
                    steps={loop.flow?.steps || []}
                    guardrails={loop.guardrails}
                    requirements={loop.requirements}
                  />
                </div>

                {loop.relatedLoops.length > 0 ? (
                  <section className="mt-10 border-t border-slate-200 pt-8">
                    <h2 className="font-funneldisplay mb-4 text-lg font-semibold text-slate-900">
                      More {loop.category} loops
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 md:gap-5">
                      {loop.relatedLoops.map((related) => (
                        <RelatedLoopCard key={related.id} loop={related} />
                      ))}
                    </div>
                    <div className="mt-4">
                      <Link
                        href={`/loops?category=${encodeURIComponent(loop.category)}`}
                        className="font-mono text-sm font-medium text-emerald-600 hover:text-emerald-700"
                      >
                        View all loops &rarr;
                      </Link>
                    </div>
                  </section>
                ) : null}
              </main>

              <aside className="lg:col-span-4">
                <div className="sticky top-28 space-y-4">
                  <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-5">
                    <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Loop info
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono text-sm text-slate-500">Category</span>
                        <Link
                          href={`/loops?category=${encodeURIComponent(loop.category)}`}
                          className="text-right text-sm font-medium text-emerald-600 hover:text-emerald-700"
                        >
                          {loop.category}
                        </Link>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm text-slate-500">Trigger</span>
                        <span className="text-sm font-medium text-slate-700">{loop.trigger}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm text-slate-500">Max iterations</span>
                        <span className="text-sm font-medium text-slate-700">{loop.maxIterations}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm text-slate-500">Loops in category</span>
                        <span className="text-sm font-medium text-slate-700">{categoryCount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm text-slate-500">Views</span>
                        <span className="text-sm font-medium text-slate-700">{formatLoopCount(loop.views)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-slate-900 p-5">
                    <h3 className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Check command
                    </h3>
                    <code className="block break-all font-mono text-xs text-green-400">{loop.checkCommand}</code>
                    <p className="mt-3 font-mono text-xs text-slate-500">Exit when: {loop.exitCondition}</p>
                  </div>

                  <LoopRequirementsPanel
                    requirements={loop.requirements}
                    inferred={loop.requirementsInferred}
                  />

                  {loop.inspiredBy ? (
                    <div className="rounded-lg border border-slate-200 bg-white p-5">
                      <h3 className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Inspired by
                      </h3>
                      <InspiredByBadge company={loop.inspiredBy.company} url={loop.inspiredBy.url} />
                    </div>
                  ) : null}

                  {loop.agents.length > 0 ? (
                    <div className="rounded-lg border border-slate-200 bg-white p-5">
                      <h3 className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Compatible agents
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {loop.agents.map((agent) => (
                          <span
                            key={agent}
                            className={`rounded-full border px-2.5 py-0.5 text-xs capitalize text-slate-600 ${
                              loop.bestFitAgents.includes(agent)
                                ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                                : 'border-slate-200'
                            }`}
                          >
                            {agent.replace(/-/g, ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <div className="flex flex-wrap gap-2">
                    {loop.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200 px-2.5 py-0.5 text-xs text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
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
