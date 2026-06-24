'use client';

import React from 'react';
import {
  Search,
  Radio,
  Workflow,
  Code,
  BarChart3,
  Rocket,
  GitBranch,
  Mail,
  Globe,
  Ticket,
  Brain,
  Target,
  type LucideIcon,
} from 'lucide-react';

const tags = [
  { label: 'recon', icon: Search },
  { label: 'comms', icon: Radio },
  { label: 'logistics', icon: Workflow },
  { label: 'code ops', icon: Code },
  { label: 'intel', icon: BarChart3 },
  { label: 'deploy', icon: Rocket },
  { label: 'github', icon: GitBranch },
  { label: 'email', icon: Mail },
  { label: 'browser', icon: Globe },
  { label: 'tickets', icon: Ticket },
  { label: 'memory', icon: Brain },
  { label: 'goals', icon: Target },
];

const Tag = ({
  label,
  Icon,
  dark = false,
}: {
  label: string;
  Icon: LucideIcon;
  dark?: boolean;
}) => (
  <div
    className={`inline-flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap px-3 py-1.5 text-[11px] font-mono font-semibold uppercase tracking-[0.12em] transition-colors duration-200 [clip-path:polygon(3px_0,100%_0,100%_calc(100%-3px),calc(100%-3px)_100%,0_100%,0_3px)] ${
      dark
        ? 'border border-white/10 bg-white/5 text-white/75 hover:border-white/20 hover:bg-white/10'
        : 'border border-fern-200/90 bg-fern-50 text-fern-800 hover:border-fern hover:bg-fern-100'
    }`}
  >
    <Icon className={`h-3.5 w-3.5 ${dark ? 'text-fern-muted' : 'text-fern'}`} strokeWidth={2} />
    <span>{label}</span>
  </div>
);

export default function HeroMarquee({ theme = 'light' }: { theme?: 'light' | 'dark' }) {
  const allTags = [...tags, ...tags];
  const dark = theme === 'dark';

  return (
    <div
      className="max-w-full overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
      }}
    >
      <div
        className="flex w-fit gap-2.5"
        style={{ animation: 'heroMarqueeScroll 60s linear infinite' }}
      >
        {allTags.map((tag, i) => (
          <Tag key={`${tag.label}-${i}`} label={tag.label} Icon={tag.icon} dark={dark} />
        ))}
      </div>
    </div>
  );
}
