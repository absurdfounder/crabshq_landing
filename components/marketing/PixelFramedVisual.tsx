import type { ReactNode } from 'react';

type PixelFramedVisualProps = {
  children: ReactNode;
  /** Full-bleed dark desktop shell for Canvas vignettes */
  variant?: 'default' | 'desktop';
};

/** Outer capability window already has chrome — children fill the body edge-to-edge. */
export default function PixelFramedVisual({ children, variant = 'default' }: PixelFramedVisualProps) {
  if (variant === 'desktop') {
    return (
      <div className="relative flex min-h-[340px] flex-1 flex-col bg-[#111] lg:min-h-[400px]">
        {children}
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[300px] flex-col lg:min-h-[360px]">
      {children}
    </div>
  );
}
