'use client';

import React from 'react';
import {
  FileText,
  LayoutGrid,
  Table,
  Workflow,
  FileType,
  FileSignature,
  File,
  Search,
  BarChart3,
  Code,
  AlertCircle,
  type LucideIcon,
} from 'lucide-react';

const tags = [
  { label: "reports", icon: FileText },
  { label: "apps", icon: LayoutGrid },
  { label: "spreadsheets", icon: Table },
  { label: "workflows", icon: Workflow },
  { label: "PDFs", icon: FileType },
  { label: "contracts", icon: FileSignature },
  { label: "documents", icon: File },
  { label: "research", icon: Search },
  { label: "metrics", icon: BarChart3 },
  { label: "coding", icon: Code },
  { label: "issues", icon: AlertCircle },
];

const Tag = ({ label, Icon }: { label: string; Icon: LucideIcon }) => (
  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-trooper-100/80 bg-trooper-50/70 text-trooper-700 text-[11px] font-mono font-semibold uppercase tracking-[0.12em] whitespace-nowrap flex-shrink-0 hover:border-trooper hover:bg-trooper-50 transition-colors duration-200 pixel-flicker-slow [clip-path:polygon(3px_0,100%_0,100%_calc(100%-3px),calc(100%-3px)_100%,0_100%,0_3px)]">
    <Icon className="w-3.5 h-3.5 text-trooper" strokeWidth={2} />
    <span>{label}</span>
  </div>
);

export default function HeroMarquee() {
  const allTags = [...tags, ...tags];

  return (
    <>
      <div
        className="w-full overflow-hidden my-4"
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
    </>
  );
}
