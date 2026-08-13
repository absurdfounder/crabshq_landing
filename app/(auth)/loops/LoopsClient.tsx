'use client';

import { useMemo, useRef, useState } from 'react';
import {
  BookOpen,
  Briefcase,
  CircleDollarSign,
  ExternalLink,
  Eye,
  FileInput,
  FileText,
  GitBranch,
  Globe,
  Handshake,
  HeartPulse,
  LayoutGrid,
  Lock,
  Package,
  Palette,
  Plug,
  Search,
  Shield,
  Target,
  TestTube,
  type LucideIcon,
} from 'lucide-react';
import { HubCatalogCard } from '@/components/marketing/HubCatalogCard';
import { RequirementItemIcon } from '@/components/loops/RequirementItemIcon';
import type { EnrichedLoop } from '@/lib/loopCatalog';
import { getLoopCategories } from '@/lib/loopCatalog';
import { getInspiredByFaviconUrl } from '@/lib/loopIcons';

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  CI: GitBranch,
  Review: Eye,
  Testing: TestTube,
  Quality: Shield,
  Growth: Target,
  Website: Globe,
  Docs: BookOpen,
  Design: Palette,
  Operations: Briefcase,
  Research: Search,
  Product: Package,
  Content: FileText,
  Security: Lock,
  Finance: CircleDollarSign,
  Integrations: Plug,
  Healthcare: HeartPulse,
  Sales: Handshake,
  Documents: FileInput,
};

function getCategoryIcon(category: string): LucideIcon {
  return CATEGORY_ICONS[category] || LayoutGrid;
}

function LoopCard({ loop }: { loop: EnrichedLoop }) {
  const CategoryIcon = getCategoryIcon(loop.category);
  const icon = loop.inspiredBy ? (
    <RequirementItemIcon
      src={getInspiredByFaviconUrl(loop.inspiredBy.url, 32)}
      fallback={loop.inspiredBy.company}
      size={28}
    />
  ) : (
    <CategoryIcon className="h-5 w-5 text-slate-700" aria-hidden />
  );

  return (
    <HubCatalogCard
      href={`/loops/${loop.slug}`}
      title={loop.title}
      description={loop.description}
      category={loop.category}
      footerMeta={loop.inspiredBy ? loop.inspiredBy.company : loop.trigger}
      viewLabel="View loop →"
      icon={icon}
    />
  );
}

type LoopsClientProps = {
  loops: EnrichedLoop[];
  initialCategory?: string;
};

export default function LoopsClient({ loops, initialCategory }: LoopsClientProps) {
  const catalogRef = useRef<HTMLDivElement>(null);
  const categories = getLoopCategories();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(() => {
    if (initialCategory && categories.includes(initialCategory as (typeof categories)[number])) {
      return initialCategory;
    }
    return 'All';
  });

  const filteredLoops = useMemo(() => {
    const q = query.trim().toLowerCase();
    return loops.filter((loop) => {
      if (selectedCategory !== 'All' && loop.category !== selectedCategory) return false;
      if (!q) return true;
      return [loop.title, loop.description, loop.category, ...(loop.tags || []), loop.goal]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [loops, query, selectedCategory]);

  const countByCategory = useMemo(() => {
    const counts: Record<string, number> = { All: loops.length };
    loops.forEach((loop) => {
      counts[loop.category] = (counts[loop.category] || 0) + 1;
    });
    return counts;
  }, [loops]);

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    requestAnimationFrame(() => catalogRef.current?.scrollIntoView({ block: 'start', behavior: 'auto' }));
  };

  const filterButtons = categories.map((cat) => {
    const isActive = selectedCategory === cat;
    const CategoryIcon = cat === 'All' ? LayoutGrid : getCategoryIcon(cat);
    const count = countByCategory[cat] || 0;
    return (
      <button
        key={cat}
        type="button"
        onClick={() => selectCategory(cat)}
        aria-pressed={isActive}
        className={`flex w-48 shrink-0 items-center gap-2 px-2 py-1.5 text-left text-sm transition-colors md:w-full ${
          isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
        }`}
      >
        <CategoryIcon className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
        <span className="min-w-0 flex-1 truncate">{cat}</span>
        <span className={`font-mono text-[10px] ${isActive ? 'text-slate-300' : 'text-slate-400'}`}>{count}</span>
      </button>
    );
  });

  return (
    <div ref={catalogRef} className="mx-auto scroll-mt-[var(--site-header-height)] overflow-hidden rounded-2xl border border-slate-200 bg-white md:grid md:grid-cols-[15rem_minmax(0,1fr)]">
      <aside className="border-b border-slate-200 p-5 md:sticky md:top-[var(--site-header-height)] md:h-[calc(100vh-var(--site-header-height))] md:border-b-0 md:border-r md:p-6">
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
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">Filter by category</p>
        <div className="mt-3 flex gap-2 overflow-x-auto border-t border-slate-100 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:block md:max-h-[calc(100vh-16rem)] md:overflow-y-auto">{filterButtons}</div>
      </aside>

      <section className="min-h-[calc(100vh-var(--site-header-height))] min-w-0 [overflow-anchor:none]">
        <div className="border-b border-slate-200 px-5 py-6 md:px-8 md:py-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500"><span className="font-semibold tabular-nums text-slate-900">{filteredLoops.length}</span>{filteredLoops.length === loops.length ? ' loops' : ` of ${loops.length} loops`}</p>
          <h2 className="mt-3 font-display text-xl tracking-tight text-slate-950 md:text-2xl">{selectedCategory === 'All' ? 'All loops' : selectedCategory}</h2>
        </div>
        {filteredLoops.length > 0 ? <div className="grid gap-4 p-5 sm:grid-cols-2 md:gap-5 md:p-8 xl:grid-cols-3">{filteredLoops.map((loop) => <LoopCard key={loop.id} loop={loop} />)}</div> : <p className="p-8 text-sm text-slate-500">No loops match your search.</p>}
        <div className="border-t border-slate-200 p-8 text-center">
          <a href="https://app.trooper.so" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-sm bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800">Run loops in Trooper <ExternalLink className="h-4 w-4" /></a>
        </div>
      </section>
    </div>
  );
}
