import type { ReactNode } from 'react';

/** Matches homepage Capabilities frame — compact on mobile, roomier on desktop. */
export default function PixelFramedVisual({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-full min-h-0 flex-col bg-white p-1 sm:bg-slate-50/70 sm:p-2 md:p-4 lg:p-6 lg:min-h-[420px]">
      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden border border-slate-200 bg-white shadow-sm">
        {children}
      </div>
    </div>
  );
}
