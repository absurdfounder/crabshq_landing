'use client';

import { useEffect, useState } from 'react';

const ITEMS = [
  { id: 'overall', label: 'Overall rankings' },
  { id: 'harness', label: 'Harness rankings' },
  { id: 'models', label: 'Model rankings' },
  { id: 'value-per-dollar', label: 'Value per dollar' },
  { id: 'coding', label: 'Coding' },
  { id: 'research', label: 'Research' },
  { id: 'support', label: 'Customer support' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'sales', label: 'Sales' },
  { id: 'email', label: 'Email & inbox' },
  { id: 'data', label: 'Data & analytics' },
  { id: 'content', label: 'Content writing' },
  { id: 'seo', label: 'SEO' },
  { id: 'management', label: 'Management' },
  { id: 'methodology', label: 'Methodology' },
  { id: 'faq', label: 'FAQ' },
] as const;

export default function BenchmarksNav() {
  const [active, setActive] = useState<(typeof ITEMS)[number]['id']>('overall');

  useEffect(() => {
    const nodes = ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visible[0]?.target.id as (typeof ITEMS)[number]['id'] | undefined;
        if (id) setActive(id);
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0.1, 0.25, 0.5] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="lg:sticky lg:top-28 lg:w-[190px] lg:shrink-0 lg:self-start">
      <nav className="hidden space-y-2.5 border-l border-black/10 pl-4 lg:block" aria-label="On this page">
        <p className="text-[11px] uppercase tracking-[0.16em] text-black/40">On this page</p>
        {ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`block text-[13px] transition-colors ${
                isActive ? 'text-black' : 'text-black/55 hover:text-black'
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
      <div className="flex flex-wrap gap-1.5 lg:hidden">
        {ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="rounded-full border border-[var(--color-line)] px-3 py-1 text-sm font-medium text-neutral-600 hover:border-neutral-300 hover:text-neutral-900"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
