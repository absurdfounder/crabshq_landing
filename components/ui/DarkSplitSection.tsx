import type { ReactNode } from 'react';

type DarkSplitSectionProps = {
  children: ReactNode;
  className?: string;
};

/** Full-bleed dark band with grid rails — Ferndesk/Bento-style split section. */
export default function DarkSplitSection({ children, className = '' }: DarkSplitSectionProps) {
  return (
    <section className={`bg-split text-white ${className}`}>
      <div className="mx-auto max-w-7xl border-x border-white/[0.06] px-4 sm:px-6">
        {children}
      </div>
    </section>
  );
}
