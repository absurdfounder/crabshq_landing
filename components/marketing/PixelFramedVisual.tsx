import type { ReactNode } from 'react';

export default function PixelFramedVisual({ children }: { children: ReactNode }) {
  return (
    <div className="border border-slate-200 bg-white overflow-hidden shadow-sm">
      <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">trooper</span>
      </div>
      <div className="aspect-[16/10] min-h-[220px]">{children}</div>
    </div>
  );
}
