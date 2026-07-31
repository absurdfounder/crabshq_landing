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

  // The min-heights were 320/420 with the copy column vertically centred beside
  // them, which left the text floating in the middle of a 500px card with the
  // top and bottom thirds empty. 260/320 lets the visual size the row.
  return (
    <div className="relative h-full flex flex-col p-3 sm:p-4 lg:p-6 bg-neutral-100/70 min-h-[260px] lg:min-h-[320px]">
      <div className="relative flex-1 flex flex-col rounded-xl bg-white overflow-hidden shadow-xs ring-1 ring-black/5 min-h-0">
        {children}
      </div>
    </div>
  );
}
