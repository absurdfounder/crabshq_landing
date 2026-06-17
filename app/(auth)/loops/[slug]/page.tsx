import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/ui/header';
import SectionShell from '@/components/ui/SectionShell';
import Loading from '@/components/Loading';
import { AgentIcon } from '@/components/loops/AgentIcon';
import { MermaidFlowDiagram } from '@/components/loops/MermaidFlowDiagram';
import { formatLoopCount, getAllLoopSlugs, getAllLoops, getLoopBySlug, type EnrichedLoop } from '@/lib/loopCatalog';
import LoopDetailClient from './LoopDetailClient';
import { HubCatalogCard } from '@/components/marketing/HubCatalogCard';
import {
  ArrowRight,
  CircleAlert,
  Crown,
  Download,
  Eye,
  MessageSquare,
  Repeat,
  ShieldCheck,
} from 'lucide-react';

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
  return {
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
  };
}

function FlowStepsList({ loop }: { loop: EnrichedLoop }) {
  const steps = [
    loop.flow?.trigger,
    ...(loop.flow?.steps || []).map((step) => step.label),
    loop.flow?.exitLabel,
  ].filter(Boolean) as string[];

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap gap-2">
        <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700">
          {loop.trigger} trigger
        </span>
        <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700">
          {loop.category}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {steps.map((label, index) => (
          <div key={label} className="flex items-start gap-3 sm:items-center">
            <div className="min-w-0 max-w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900">
              {label}
            </div>
            {index < steps.length - 1 ? (
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 rotate-90 text-slate-400 sm:mt-0 sm:rotate-0" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function RelatedLoopCard({ loop }: { loop: EnrichedLoop }) {
  return (
    <HubCatalogCard
      href={`/loops/${loop.slug}`}
      title={loop.title}
      description={loop.description}
      category={loop.category}
      footerMeta={loop.trigger}
      viewLabel="View loop →"
      icon={
        <span className="relative flex h-7 w-7 items-center justify-center">
          <Repeat className="h-5 w-5 text-slate-700" aria-hidden />
          {loop.official ? (
            <Crown className="absolute -right-1 -top-1 h-3 w-3 text-amber-600" aria-label="Official loop" />
          ) : null}
        </span>
      }
    />
  );
}

export default function LoopDetailPage({ params }: { params: { slug: string } }) {
  const loop = getLoopBySlug(params.slug);

  if (!loop) {
    return <Loading />;
  }

  const categoryCount = getAllLoops().filter((l) => l.category === loop.category).length;

  return (
    <article>
      <Header />
      <SectionShell eyebrow="LOOP" eyebrowNumber="01" bgClass="bg-white">
        <div className="pb-4 pt-24">
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
                  {loop.official ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/60 bg-amber-50 px-2 py-0.5 text-xs text-amber-700">
                      <Crown className="h-3 w-3" /> Official
                    </span>
                  ) : null}
                  {loop.hardened ? (
                    <span className="rounded-full border border-slate-200 px-2.5 py-0.5 text-xs text-slate-600">Hardened</span>
                  ) : null}
                  {loop.agents.map((agent) => (
                    <AgentIcon key={agent} agent={agent} bestFit={loop.bestFitAgents.includes(agent)} />
                  ))}
                </div>

                <h1 className="font-funneldisplay text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  {loop.title}
                </h1>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{loop.description}</p>

                <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Eye className="h-4 w-4" />
                    {formatLoopCount(loop.views)} views
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Download className="h-4 w-4" />
                    {formatLoopCount(loop.installs)} installs
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-500">by {loop.author}</p>

                <div className="mt-6">
                  <LoopDetailClient kickoffPrompt={loop.kickoffPrompt} mermaid={loop.mermaid} />
                </div>

                {loop.guardrails?.length ? (
                  <div className="mt-8 rounded-2xl border border-dashed border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                        <ShieldCheck className="h-3 w-3" />
                        Guardrails
                      </span>
                      {loop.hardened ? (
                        <span className="rounded-full border border-slate-200 px-2.5 py-0.5 text-xs text-slate-600">Hardened</span>
                      ) : null}
                    </div>
                    <h2 className="font-funneldisplay text-lg font-semibold text-slate-900">Anti-gaming rules</h2>
                    <p className="mt-1 text-sm text-slate-600">
                      Rules the agent must follow so it cannot cheat the exit condition.
                    </p>
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
                      {loop.guardrails.map((rule) => (
                        <li key={rule}>{rule}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="mt-8 rounded-2xl border border-dashed border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                      <CircleAlert className="h-3 w-3" />
                      How to run this loop
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs text-slate-700">
                      <MessageSquare className="h-3 w-3" />
                      Prompt only
                    </span>
                  </div>
                  <h2 className="font-funneldisplay text-lg font-semibold text-slate-900">
                    Run &ldquo;{loop.title}&rdquo; in your agent
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Deeplinks only paste the kickoff prompt — they do not install hook files.
                  </p>
                </div>

                <div className="mt-8 grid gap-8 lg:grid-cols-2">
                  <div>
                    <FlowStepsList loop={loop} />
                    <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white p-4">
                      <MermaidFlowDiagram source={loop.mermaid} />
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="font-funneldisplay text-base font-semibold text-slate-900">Steps</h3>
                    <p className="mt-1 text-sm text-slate-600">What the agent does on each pass.</p>
                    <div className="mt-4 space-y-4">
                      {(loop.flow?.steps || []).map((step, index) => (
                        <div key={step.label} className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                          <p className="text-sm font-medium text-slate-900">
                            {index + 1}. {step.label}
                          </p>
                          {step.description ? (
                            <p className="mt-2 text-sm text-slate-600">{step.description}</p>
                          ) : null}
                          {step.command ? (
                            <pre className="mt-3 overflow-x-auto rounded border border-slate-200 bg-white p-2 font-mono text-xs text-slate-800">
                              {step.command}
                            </pre>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {loop.relatedLoops.length > 0 ? (
                  <section className="mt-10 border-t border-slate-200 pt-8">
                    <h2 className="font-funneldisplay mb-4 text-lg font-semibold text-slate-900">Related loops</h2>
                    <div className="grid gap-4 sm:grid-cols-2 md:gap-5">
                      {loop.relatedLoops.map((related) => (
                        <RelatedLoopCard key={related.id} loop={related} />
                      ))}
                    </div>
                    <div className="mt-4">
                      <Link href="/loops" className="font-mono text-sm font-medium text-emerald-600 hover:text-emerald-700">
                        View all loops &rarr;
                      </Link>
                    </div>
                  </section>
                ) : null}
              </main>

              <aside className="lg:col-span-4">
                <div className="sticky top-28 space-y-4">
                  <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-5">
                    <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">Loop info</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm text-slate-500">Category</span>
                        <Link
                          href={`/loops?category=${encodeURIComponent(loop.category)}`}
                          className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
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
                        <span className="font-mono text-sm text-slate-500">Catalog size</span>
                        <span className="text-sm font-medium text-slate-700">{categoryCount}</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-white p-5">
                    <h3 className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">Check command</h3>
                    <code className="block rounded bg-slate-900 p-3 font-mono text-xs text-green-400">{loop.checkCommand}</code>
                    <p className="mt-3 text-xs text-slate-500">Exit when: {loop.exitCondition}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {loop.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-slate-200 px-2.5 py-0.5 text-xs text-slate-600">
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
