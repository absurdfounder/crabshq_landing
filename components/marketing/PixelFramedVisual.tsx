import type { ReactNode } from 'react';

type PixelFramedVisualProps = {
  children: ReactNode;
  /** Full-bleed dark desktop shell for Canvas vignettes */
  variant?: 'default' | 'desktop';
};

/** Matches homepage Capabilities frame — inner card only, no fixed aspect ratio. */
export default function PixelFramedVisual({ children, variant = 'default' }: PixelFramedVisualProps) {
  if (variant === 'desktop') {
    return (
      <div className="relative flex min-h-[340px] flex-1 flex-col bg-[#111] lg:min-h-[420px]">
        {children}
      </div>
    );
  }

  return (
    <div className="relative h-full flex flex-col p-2 sm:p-4 lg:p-6 bg-slate-50/70 sm:bg-slate-100/80 min-h-[320px] lg:min-h-[420px]">
      <div className="relative flex-1 flex flex-col border border-slate-200 bg-white overflow-hidden shadow-sm min-h-0">
        {children}
      </div>
    </div>
  );
}
