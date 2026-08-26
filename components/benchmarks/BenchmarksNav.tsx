'use client';

import { useEffect, useState } from 'react';
import {
  BarChart3,
  BookOpen,
  CodeXml,
  DollarSign,
  Handshake,
  Headset,
  Inbox,
  Mail,
  Megaphone,
  MessageCircleQuestion,
  PenLine,
  Search,
  TrendingUp,
  Trophy,
} from 'lucide-react';

const ITEMS = [
  { id: 'overall', label: 'Overall rankings', icon: Trophy },
  { id: 'harness', label: 'Harness rankings', icon: Trophy },
  { id: 'models', label: 'Model rankings', icon: BarChart3 },
  { id: 'value-per-dollar', label: 'Value per dollar', icon: DollarSign },
  { id: 'coding', label: 'Coding', icon: CodeXml },
  { id: 'research', label: 'Research', icon: Search },
  { id: 'support', label: 'Customer support', icon: Headset },
  { id: 'marketing', label: 'Marketing', icon: Megaphone },
  { id: 'sales', label: 'Sales', icon: Handshake },
  { id: 'email', label: 'Email & inbox', icon: Mail },
  { id: 'data', label: 'Data & analytics', icon: BarChart3 },
  { id: 'content', label: 'Content writing', icon: PenLine },
  { id: 'seo', label: 'SEO', icon: TrendingUp },
  { id: 'management', label: 'Management & coordination', icon: Inbox },
  { id: 'methodology', label: 'Methodology', icon: BookOpen },
  { id: 'faq', label: 'FAQ', icon: MessageCircleQuestion },
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
    <div className="lg:sticky lg:top-28 lg:w-[188px] lg:shrink-0 lg:self-start">
      <nav className="hidden flex-col gap-0.5 lg:flex" aria-label="Benchmarks sections">
          {ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[13px] font-medium transition-colors ${
                  isActive
                    ? 'bg-neutral-900/5 text-neutral-900'
                    : 'text-neutral-500 hover:bg-neutral-900/[0.04] hover:text-neutral-800'
                }`}
              >
                <Icon className={`size-3.5 shrink-0 ${isActive ? 'text-emerald-700' : 'text-neutral-400'}`} />
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
            className="rounded-full border border-[var(--color-line)] px-3 py-1 text-[11px] font-medium text-neutral-600 hover:border-neutral-300 hover:text-neutral-900"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
