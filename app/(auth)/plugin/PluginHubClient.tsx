'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { LayoutGrid, Search } from 'lucide-react';
import type { PluginCatalogItem } from '@/lib/pluginCatalog';
import { pluginLogoUrl, pluginPagePath } from '@/lib/pluginCatalog';

const PAGE_SIZE = 60;

type PluginHubClientProps = {
  plugins: PluginCatalogItem[];
};

export default function PluginHubClient({ plugins }: PluginHubClientProps) {
  const categories = useMemo(() => {
    const cats = Array.from(new Set(plugins.map((p) => p.category)));
    return ['All', ...cats.sort()];
  }, [plugins]);

  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return plugins.filter((p) => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (!q) return true;
      const haystack = [p.name, p.slug, p.id, p.description, p.shortDescription, p.category, p.source]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [plugins, query, selectedCategory]);

  const visible = filtered.slice(0, visibleCount);
  const countByCategory = useMemo(() => {
    const counts: Record<string, number> = { All: plugins.length };
    for (const p of plugins) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
    return counts;
  }, [plugins]);

  const filterButtons = categories.map((cat) => {
    const isActive = selectedCategory === cat;
    const count = countByCategory[cat] || 0;
    return (
      <button
        key={cat}
        type="button"
        onClick={() => {
          setSelectedCategory(cat);
          setVisibleCount(PAGE_SIZE);
        }}
        aria-pressed={isActive}
        className={`flex w-48 shrink-0 items-center gap-2 px-2 py-1.5 text-left text-sm transition-colors md:w-full ${
          isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
        }`}
      >
        {cat === 'All' ? <LayoutGrid className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden /> : <span className="h-3.5 w-3.5 shrink-0" />}
        <span className="min-w-0 flex-1 truncate">{cat}</span>
        <span className={`font-mono text-[10px] ${isActive ? 'text-slate-300' : 'text-slate-400'}`}>{count.toLocaleString()}</span>
      </button>
    );
  });

  return (
    <div className="mx-auto max-w-7xl border-y border-slate-200 bg-white md:grid md:grid-cols-[15rem_minmax(0,1fr)] md:border-x">
      <aside className="border-b border-slate-200 p-5 md:sticky md:top-[var(--site-header-height)] md:h-[calc(100vh-var(--site-header-height))] md:border-b-0 md:border-r md:p-6">
        <label className="relative block w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisibleCount(PAGE_SIZE);
            }}
            placeholder="Search plugins…"
            className="w-full rounded-sm border border-slate-200 bg-white py-2 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
          />
        </label>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">Filter by category</p>
        <div className="mt-3 flex gap-2 overflow-x-auto border-t border-slate-100 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:block md:max-h-[calc(100vh-16rem)] md:overflow-y-auto">{filterButtons}</div>
      </aside>

      <section className="min-h-[calc(100vh-var(--site-header-height))] min-w-0 [overflow-anchor:none]">
        <div className="border-b border-slate-200 px-5 py-6 md:px-8 md:py-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500"><span className="font-semibold text-slate-900 tabular-nums">{filtered.length.toLocaleString()}</span>{filtered.length === plugins.length ? ' integrations' : ` of ${plugins.length.toLocaleString()} integrations`}</p>
          <h2 className="mt-3 font-funneldisplay text-2xl tracking-tight text-slate-950 md:text-3xl">{selectedCategory === 'All' ? 'All integrations' : selectedCategory}</h2>
        </div>
        {filtered.length === 0 ? <p className="p-8 text-sm text-slate-500">No plugins match your search.</p> : <>
          <div className="grid gap-4 p-5 sm:grid-cols-2 md:gap-5 md:p-8 xl:grid-cols-3">
            {visible.map((plugin) => (
              <Link
                key={plugin.id}
                href={pluginPagePath(plugin.slug)}
                className="group flex min-h-[132px] flex-col gap-3 border border-slate-200 bg-white p-5 transition-colors hover:border-slate-300 hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={pluginLogoUrl(plugin)}
                    alt={plugin.name}
                    width={28}
                    height={28}
                    className="w-7 h-7 object-contain"
                    loading="lazy"
                  />
                  <h2 className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                    {plugin.name}
                  </h2>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed flex-1 line-clamp-2">
                  {plugin.shortDescription || plugin.description}
                </p>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono uppercase tracking-[0.12em] text-slate-400 truncate">
                    {plugin.category}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-[0.12em] text-slate-400 group-hover:text-emerald-600 transition-colors shrink-0">
                    View →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {visibleCount < filtered.length ? (
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-sm text-sm font-medium transition-colors"
              >
                Load more ({Math.min(visibleCount + PAGE_SIZE, filtered.length).toLocaleString()} of{' '}
                {filtered.length.toLocaleString()})
              </button>
            </div>
          ) : null}
        </>}
      </section>
    </div>
  );
}
