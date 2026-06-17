import Link from 'next/link';
import type { ReactNode } from 'react';

type HubCatalogCardProps = {
  href: string;
  title: string;
  description: string;
  category: string;
  icon: ReactNode;
  viewLabel?: string;
  footerMeta?: string;
};

export function HubCatalogCard({
  href,
  title,
  description,
  category,
  icon,
  viewLabel = 'View →',
  footerMeta,
}: HubCatalogCardProps) {
  return (
    <Link
      href={href}
      className="group flex min-h-[132px] flex-col gap-3 border border-slate-200 bg-white p-5 transition-colors hover:border-slate-300 hover:bg-slate-50"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center">{icon}</div>
        <h2 className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1 min-w-0">
          {title}
        </h2>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed flex-1 line-clamp-2">{description}</p>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-mono uppercase tracking-[0.12em] text-slate-400 truncate">
          {footerMeta ? `${category} · ${footerMeta}` : category}
        </span>
        <span className="text-xs font-mono uppercase tracking-[0.12em] text-slate-400 group-hover:text-emerald-600 transition-colors shrink-0">
          {viewLabel}
        </span>
      </div>
    </Link>
  );
}
