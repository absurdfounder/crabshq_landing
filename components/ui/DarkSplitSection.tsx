import type { ReactNode } from 'react';

type DarkSplitSectionProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
};

/**
 * A dark band.
 *
 * The background bleeds the full width of the viewport and the content sits in
 * the centred column, same as every other section. It used to paint `bg-split`
 * on the `.rail` itself with `border-x border-white/[0.06]`, which made the
 * dark stop at 80rem and drew a visible vertical edge down both sides — a
 * black box floating on the page rather than a band running through it.
 */
export default function DarkSplitSection({
  children,
  className = '',
  innerClassName = '',
}: DarkSplitSectionProps) {
  return (
    <section className={`band-dark ${innerClassName || 'bg-split'} ${className}`}>
      <div className="rail text-white">{children}</div>
    </section>
  );
}
