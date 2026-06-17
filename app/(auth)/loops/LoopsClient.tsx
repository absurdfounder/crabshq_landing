'use client';

import { useMemo, useState } from 'react';
import {
  Crown,
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
import { HubCatalogCard } from '@/components/marketing/HubCatalogCard';
import type { EnrichedLoop } from '@/lib/loopCatalog';
import { getLoopCategories } from '@/lib/loopCatalog';

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
  const CategoryIcon = getCategoryIcon(loop.category);

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
          <CategoryIcon className="h-5 w-5 text-slate-700" aria-hidden />
          {loop.official ? (
            <Crown className="absolute -right-1 -top-1 h-3 w-3 text-amber-600" aria-label="Official loop" />
          ) : null}
        </span>
      }
    />
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
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
          <span className="font-semibold tabular-nums text-slate-900">{filteredLoops.length}</span>
          {filteredLoops.length === loops.length ? ' loops' : ` of ${loops.length} loops`}
        </p>
        <label className="relative block w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search loops…"
            className="w-full rounded-sm border border-slate-200 bg-white py-2 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
          />
        </label>
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
                className={`inline-flex min-h-[36px] shrink-0 items-center gap-2 rounded-sm border px-3.5 py-2 text-sm font-medium transition-colors ${
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
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-2">
            <Crown className="h-4 w-4 text-amber-600" />
            <h2 className="font-funneldisplay text-lg font-semibold text-slate-900">Official loops</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {officialLoops.map((loop) => (
              <LoopCard key={loop.id} loop={loop} />
            ))}
          </div>
        </div>
      ) : null}

      {communityLoops.length > 0 ? (
        <div className="mb-10">
          <h2 className="font-funneldisplay mb-4 text-lg font-semibold text-slate-900">Community loops</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {communityLoops.map((loop) => (
              <LoopCard key={loop.id} loop={loop} />
            ))}
          </div>
        </div>
      ) : null}

      {filteredLoops.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-600">No loops match your search.</p>
      ) : null}

      <div className="mt-10 text-center">
        <a
          href="https://app.trooper.so"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-sm bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800"
        >
          Run loops in Trooper
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
