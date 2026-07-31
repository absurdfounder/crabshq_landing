import type { ReactNode } from 'react';

type DarkSplitSectionProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
};

/**
 * Dark band contained within the max-w-7xl grid — background does not bleed
 * past the side rails. Border colour is overridden because `--color-line` is a
 * light-surface hairline.
 */
export default function DarkSplitSection({
  children,
  className = '',
  innerClassName = '',
}: DarkSplitSectionProps) {
  return (
    <section className={className}>
      <div
        className={`rail border-x border-white/[0.06] text-white ${innerClassName || 'bg-split'}`}
      >
        {children}
      </div>
    </section>
  );
}
