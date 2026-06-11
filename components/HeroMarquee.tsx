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

const Tag = ({ label, Icon }: { label: string; Icon: LucideIcon }) => (
  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-trooper-100/80 bg-trooper-50/70 text-trooper-700 text-[11px] font-mono font-semibold uppercase tracking-[0.12em] whitespace-nowrap flex-shrink-0 hover:border-trooper hover:bg-trooper-50 transition-colors duration-200 [clip-path:polygon(3px_0,100%_0,100%_calc(100%-3px),calc(100%-3px)_100%,0_100%,0_3px)]">
    <Icon className="w-3.5 h-3.5 text-trooper" strokeWidth={2} />
    <span>{label}</span>
  </div>
);

export default function HeroMarquee() {
  const allTags = [...tags, ...tags];

  return (
    <div
      className="w-full overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
      }}
    >
      <div
        className="flex gap-2.5 w-fit"
        style={{ animation: 'heroMarqueeScroll 60s linear infinite' }}
      >
        {allTags.map((tag, i) => (
          <Tag key={`${tag.label}-${i}`} label={tag.label} Icon={tag.icon} />
        ))}
      </div>
    </div>
  );
}
