import type { ReactNode } from 'react';

type DarkSplitSectionProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
};

/** Dark band contained within the max-w-7xl grid — background does not bleed past rails. */
export default function DarkSplitSection({ children, className = '', innerClassName = '' }: DarkSplitSectionProps) {
  return (
    <section className={className}>
      <div
        className={`mx-auto max-w-7xl min-w-0 overflow-x-hidden border-x border-white/[0.06] px-4 text-white sm:px-6 ${innerClassName || 'bg-split'}`}
      >
        {children}
      </div>
    </section>
  );
}
