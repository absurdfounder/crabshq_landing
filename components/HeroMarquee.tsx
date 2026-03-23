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
  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-300 bg-white text-slate-600 text-xs font-medium whitespace-nowrap flex-shrink-0 hover:border-slate-400 hover:text-slate-800 hover:bg-slate-50 transition-all duration-200">
    <Icon className="w-3.5 h-3.5" />
    <span>{label}</span>
  </div>
);

export default function HeroMarquee() {
  const allTags = [...tags, ...tags, ...tags];

  return (
    <>
      <style jsx global>{`
        @keyframes heroMarqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
      <div
        className="w-full overflow-hidden my-4"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        }}
      >
        <div
          className="flex gap-2.5 w-fit"
          style={{ animation: 'heroMarqueeScroll 45s linear infinite' }}
        >
          {allTags.map((tag, i) => (
            <Tag key={`${tag.label}-${i}`} label={tag.label} Icon={tag.icon} />
          ))}
        </div>
      </div>
    </>
  );
}