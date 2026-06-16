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

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
          <span className="font-semibold text-slate-900 tabular-nums">{filtered.length.toLocaleString()}</span>
          {filtered.length === plugins.length ? ' integrations' : ` of ${plugins.length.toLocaleString()} integrations`}
        </p>
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
      </div>

      <div className="mb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 mb-3">
          Filter by category
        </p>
        <div className="-mx-4 sm:mx-0">
          <div
            className="overflow-x-auto px-4 sm:px-0 pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            role="group"
            aria-label="Plugin category filters"
          >
            <div className="flex flex-nowrap sm:flex-wrap gap-2 min-w-0">
              {categories.map((cat) => {
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
                    className={`inline-flex items-center gap-2 shrink-0 px-3.5 py-2 min-h-[36px] rounded-sm text-sm font-medium transition-colors border ${
                      isActive
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {cat === 'All' ? <LayoutGrid className="w-3.5 h-3.5 opacity-80" aria-hidden /> : null}
                    <span className="whitespace-nowrap">{cat}</span>
                    <span
                      className={`font-mono text-[11px] tabular-nums px-1.5 py-0.5 rounded-sm ${
                        isActive ? 'bg-slate-700/70 text-slate-300' : 'bg-slate-100 text-slate-500 border border-slate-200/80'
                      }`}
                    >
                      {count.toLocaleString()}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-slate-600 py-8 text-center">No plugins match your search.</p>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
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
        </>
      )}
    </div>
  );
}
