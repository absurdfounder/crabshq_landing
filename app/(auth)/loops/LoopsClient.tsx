'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Check,
  Copy,
  Crown,
  Download,
  ExternalLink,
  Eye,
  GitBranch,
  LayoutGrid,
  Repeat,
  Search,
  Shield,
  TestTube,
  type LucideIcon,
} from 'lucide-react';
import { AgentIcon } from '@/components/loops/AgentIcon';
import type { EnrichedLoop } from '@/lib/loopCatalog';
import { formatLoopCount, getLoopCategories } from '@/lib/loopCatalog';

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  CI: GitBranch,
  Review: Eye,
  Testing: TestTube,
  Quality: Shield,
};

const TRIGGERS = ['All', 'manual', 'interval'] as const;

function getCategoryIcon(category: string): LucideIcon {
  return CATEGORY_ICONS[category] || LayoutGrid;
}

function LoopCard({ loop }: { loop: EnrichedLoop }) {
  const [copied, setCopied] = useState(false);
  const CategoryIcon = getCategoryIcon(loop.category);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(loop.kickoffPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div
      className={`group relative flex h-full flex-col rounded-xl border p-6 transition-all duration-300 hover:shadow-lg ${
        loop.official
          ? 'border-amber-300/60 bg-amber-50/30 hover:border-amber-400/70'
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700">
            <CategoryIcon className="h-3.5 w-3.5" />
            {loop.category}
          </span>
          <span className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-600">
            {loop.trigger}
          </span>
          {loop.official ? (
            <span className="inline-flex items-center rounded-full border border-amber-300/60 bg-amber-50 px-2 py-0.5 text-amber-700" aria-label="Official loop">
              <Crown className="h-3 w-3" />
            </span>
          ) : null}
        </div>
        <div className="flex shrink-0 flex-wrap justify-end gap-3 text-xs text-gray-500">
          <span className="inline-flex items-center gap-1.5">
            <Eye className="h-3.5 w-3.5" />
            {formatLoopCount(loop.views)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Download className="h-3.5 w-3.5" />
            {formatLoopCount(loop.installs)}
          </span>
        </div>
      </div>

      <div className="mb-5 flex-1">
        <h3 className="mb-2 text-base font-semibold tracking-tight text-gray-900">{loop.title}</h3>
        <p className="text-sm leading-relaxed text-gray-600">{loop.description}</p>
      </div>

      <p className="mb-4 line-clamp-3 rounded-lg border border-gray-100 bg-gray-50 p-3 text-sm leading-6 text-gray-600">
        {loop.kickoffPrompt}
      </p>

      <div className="mb-4 flex flex-wrap items-center gap-1.5">
        {loop.agents.map((agent) => (
          <AgentIcon key={agent} agent={agent} bestFit={loop.bestFitAgents.includes(agent)} />
        ))}
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {loop.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-xs text-gray-600">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto space-y-3">
        <div className="flex items-center justify-between gap-2 text-xs text-gray-500">
          <span>by {loop.author}</span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/loops/${loop.slug}`}
            className="inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 text-xs font-medium text-gray-800 transition-colors hover:bg-gray-100"
          >
            <Eye className="h-3.5 w-3.5" />
            View
          </Link>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-3 text-xs font-medium text-white transition-colors hover:bg-slate-700"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}

type LoopsClientProps = {
  loops: EnrichedLoop[];
  initialCategory?: string;
};

export default function LoopsClient({ loops, initialCategory }: LoopsClientProps) {
  const categories = getLoopCategories();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(() => {
    if (initialCategory && categories.includes(initialCategory as (typeof categories)[number])) {
      return initialCategory;
    }
    return 'All';
  });
  const [selectedTrigger, setSelectedTrigger] = useState<(typeof TRIGGERS)[number]>('All');

  const filteredLoops = useMemo(() => {
    const q = query.trim().toLowerCase();
    return loops.filter((loop) => {
      if (selectedCategory !== 'All' && loop.category !== selectedCategory) return false;
      if (selectedTrigger !== 'All' && loop.trigger !== selectedTrigger) return false;
      if (!q) return true;
      return [loop.title, loop.description, loop.category, ...(loop.tags || []), loop.goal]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [loops, query, selectedCategory, selectedTrigger]);

  const officialLoops = filteredLoops.filter((l) => l.official);
  const communityLoops = filteredLoops.filter((l) => !l.official);

  const countByCategory = useMemo(() => {
    const counts: Record<string, number> = { All: loops.length };
    loops.forEach((loop) => {
      counts[loop.category] = (counts[loop.category] || 0) + 1;
    });
    return counts;
  }, [loops]);

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
          <span className="font-semibold tabular-nums text-slate-900">{loops.length}</span> agent loops available
        </p>
      </div>

      <div className="relative mb-8 max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search loops"
          className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
        />
      </div>

      <div className="mb-6">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">Filter by category</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            const CategoryIcon = cat === 'All' ? LayoutGrid : getCategoryIcon(cat);
            const count = countByCategory[cat] || 0;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                aria-pressed={isActive}
                className={`inline-flex min-h-[36px] shrink-0 items-center gap-2.5 rounded-sm border px-3.5 py-2 text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <CategoryIcon className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
                <span className="whitespace-nowrap leading-none">{cat}</span>
                <span
                  className={`rounded-sm px-1.5 py-0.5 font-mono text-[11px] tabular-nums leading-none ${
                    isActive ? 'bg-slate-700/70 text-slate-300' : 'border border-slate-200/80 bg-slate-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-10">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">Trigger</p>
        <div className="flex flex-wrap gap-2">
          {TRIGGERS.map((trigger) => {
            const isActive = selectedTrigger === trigger;
            return (
              <button
                key={trigger}
                type="button"
                onClick={() => setSelectedTrigger(trigger)}
                aria-pressed={isActive}
                className={`inline-flex min-h-[36px] items-center gap-2 rounded-sm border px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <Repeat className="h-3.5 w-3.5 opacity-80" />
                {trigger}
              </button>
            );
          })}
        </div>
      </div>

      {officialLoops.length > 0 ? (
        <div className="mb-12">
          <div className="mb-6 flex items-center gap-2">
            <Crown className="h-4 w-4 text-amber-600" />
            <h2 className="font-funneldisplay text-xl font-semibold text-slate-900">Official loops</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {officialLoops.map((loop) => (
              <LoopCard key={loop.id} loop={loop} />
            ))}
          </div>
        </div>
      ) : null}

      {communityLoops.length > 0 ? (
        <div className="mb-12">
          <h2 className="font-funneldisplay mb-6 text-xl font-semibold text-slate-900">Community loops</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {communityLoops.map((loop) => (
              <LoopCard key={loop.id} loop={loop} />
            ))}
          </div>
        </div>
      ) : null}

      {filteredLoops.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-white p-10 text-center text-slate-600">
          No loops match your search.
        </div>
      ) : null}

      <div className="mt-16 text-center">
        <a
          href="https://app.trooper.so"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-black px-6 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-gray-800 hover:shadow-md"
        >
          Run loops in Trooper
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
