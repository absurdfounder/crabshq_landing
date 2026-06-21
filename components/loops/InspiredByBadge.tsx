import { RequirementItemIcon } from '@/components/loops/RequirementItemIcon';
import { getInspiredByFaviconUrl } from '@/lib/loopIcons';

type InspiredByBadgeProps = {
  company: string;
  url: string;
  className?: string;
};

export function InspiredByBadge({ company, url, className = '' }: InspiredByBadgeProps) {
  return (
    <p className={`flex items-center gap-2 text-sm text-slate-500 ${className}`}>
      <RequirementItemIcon
        src={getInspiredByFaviconUrl(url, 32)}
        fallback={company}
        size={18}
      />
      <span>
        Inspired by{' '}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-slate-700 underline decoration-slate-300 underline-offset-2 transition-colors hover:text-slate-900"
        >
          {company}
        </a>
      </span>
    </p>
  );
}
