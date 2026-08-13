'use client';

import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import { ArrowRight, Grid3X3, Search } from 'lucide-react';
import {
  primitiveCategories,
  primitivePath,
  primitives,
  type Primitive,
  type PrimitiveCategory,
} from '@/lib/primitives';

function PrimitiveCard({ primitive, index }: { primitive: Primitive; index: number }) {
  return (
    <Link
      href={primitivePath(primitive.slug)}
      className="group relative isolate flex min-h-[250px] flex-col overflow-hidden border border-slate-200 bg-white p-5 transition-colors hover:border-emerald-400 hover:bg-emerald-50/30 md:min-h-[280px] md:p-6"
    >
      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center border border-slate-300 bg-canvas-warm font-mono text-xs text-slate-600">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h2 className="font-funneldisplay text-xl tracking-tight text-ink transition-colors group-hover:text-fern-700">
            {primitive.name}
          </h2>
        </div>
        <p className="mt-4 max-w-[30ch] text-sm leading-relaxed text-ink-muted">{primitive.tagline}</p>
      </div>

      <div className="relative mt-auto min-h-[116px] overflow-hidden border border-slate-200 bg-canvas-warm p-3 font-mono text-[10px] text-slate-500">
        <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(15,23,42,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.07)_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative flex items-center justify-between border-b border-slate-200 pb-2 uppercase tracking-[0.16em]">
          <span>{primitive.slug}</span>
          <span className="text-fern-700">ready</span>
        </div>
        <div className="relative mt-3 space-y-2">
          <p><span className="text-slate-400">$</span> {primitive.endpoint}</p>
          <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 bg-fern-600" />{primitive.outcomes[0]}</div>
          <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 border border-slate-400" />{primitive.outcomes[1]}</div>
        </div>
      </div>

      <ArrowRight className="absolute bottom-5 right-5 h-4 w-4 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-fern-700 md:bottom-6 md:right-6" />
    </Link>
  );
}

function CategoryNav({ selected, onSelect }: { selected: PrimitiveCategory | 'All'; onSelect: (category: PrimitiveCategory | 'All') => void }) {
  const countFor = (category: PrimitiveCategory | 'All') => category === 'All' ? primitives.length : primitives.filter((primitive) => primitive.category === category).length;
  return (
    <nav aria-label="Primitive categories" className="flex gap-2 md:flex-col md:gap-0.5">
      {(['All', ...primitiveCategories] as const).map((category) => {
        const active = selected === category;
        return (
          <button key={category} type="button" onClick={() => onSelect(category)} className={`w-48 shrink-0 border px-3 py-2 text-left transition-colors md:w-full md:border-0 md:px-2 md:py-1.5 ${active ? 'border-slate-900 bg-slate-900 text-white md:bg-slate-900' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-950 md:bg-transparent'}`}>
            <span className="block text-sm font-medium">{category}</span>
            <span className={`block text-[10px] ${active ? 'text-slate-300' : 'text-slate-400'}`}>{countFor(category)} primitives</span>
          </button>
        );
      })}
    </nav>
  );
}

export default function PrimitivesCatalog() {
  const catalogRef = useRef<HTMLElement>(null);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PrimitiveCategory | 'All'>('All');
  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return primitives.filter((primitive) => {
      if (selectedCategory !== 'All' && primitive.category !== selectedCategory) return false;
      return !normalizedQuery || [primitive.name, primitive.tagline, primitive.description, primitive.category].join(' ').toLowerCase().includes(normalizedQuery);
    });
  }, [query, selectedCategory]);
  const featured = primitives.filter((primitive) => primitive.featured);

  const selectCategory = (category: PrimitiveCategory | 'All') => {
    setSelectedCategory(category);
    requestAnimationFrame(() => catalogRef.current?.scrollIntoView({ block: 'start', behavior: 'auto' }));
  };

  return (
    <section ref={catalogRef} className="scroll-mt-[var(--site-header-height)] border-t border-[var(--color-line)] bg-canvas-warm">
      <div className="rail py-12 sm:py-20">
        <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white md:flex-row">
        <aside className="shrink-0 border-b border-[var(--color-line)] bg-canvas p-5 md:sticky md:top-[var(--site-header-height)] md:h-[calc(100vh-var(--site-header-height))] md:w-64 md:border-b-0 md:border-r md:p-7">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search primitives…" className="w-full border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-ink outline-none placeholder:text-slate-400 focus:border-fern-600" type="search" />
          </label>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">Filter by capability</p>
          <div className="mt-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:max-h-[calc(100vh-15rem)] md:overflow-y-auto"> <CategoryNav selected={selectedCategory} onSelect={selectCategory} /></div>
        </aside>

        <div className="min-h-[calc(100vh-var(--site-header-height))] min-w-0 flex-1 bg-canvas-warm [overflow-anchor:none]">
          {selectedCategory === 'All' && !query ? (
            <section className="border-b border-[var(--color-line)]">
              <div className="border-b border-[var(--color-line)] px-5 py-6 md:px-8 md:py-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fern-700">Start here</span>
                <h2 className="mt-2 font-display text-xl tracking-tight text-ink md:text-2xl">Featured primitives</h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">The capabilities most teams use to give their agents durable, real-world reach.</p>
              </div>
              <div className="grid gap-4 p-5 sm:grid-cols-2 md:gap-5 md:p-8 xl:grid-cols-3">{featured.map((primitive, index) => <PrimitiveCard key={primitive.slug} primitive={primitive} index={index} />)}</div>
            </section>
          ) : null}

          <section>
            <div className="flex items-end justify-between border-b border-[var(--color-line)] px-5 py-6 md:px-8 md:py-8">
              <div><span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fern-700">{selectedCategory === 'All' ? 'All capabilities' : selectedCategory}</span><h2 className="mt-2 font-display text-xl tracking-tight text-ink md:text-2xl">{filtered.length} {filtered.length === 1 ? 'primitive' : 'primitives'}</h2></div>
              <Grid3X3 className="h-5 w-5 text-slate-400" aria-hidden />
            </div>
            {filtered.length ? <div className="grid gap-4 p-5 sm:grid-cols-2 md:gap-5 md:p-8 xl:grid-cols-3">{filtered.map((primitive, index) => <PrimitiveCard key={primitive.slug} primitive={primitive} index={index} />)}</div> : <p className="p-8 text-sm text-ink-muted">No primitives match that search.</p>}
          </section>
        </div>
        </div>
      </div>
    </section>
  );
}
