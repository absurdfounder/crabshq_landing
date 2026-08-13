import type { ReactNode } from 'react';

type CatalogHeroProps = {
  /** Kept for call-site compatibility. Not rendered. */
  label?: string;
  title: string;
  description: string;
  actions?: ReactNode;
};

/** Shared editorial opening for the directory pages (plugins, skills, loops). */
export default function CatalogHero({ title, description, actions }: CatalogHeroProps) {
  return (
    <section className="border-b border-[var(--color-line)] bg-canvas">
      <div className="rail page-hero-padding">
        <div className="max-w-3xl">
          <h1 className="font-display max-w-3xl text-3xl font-medium leading-tight tracking-tight text-neutral-800 sm:text-4xl md:text-[2.5rem]">
            {title}
          </h1>
          <p className="lede mt-4 !max-w-2xl">
            {description}
          </p>
          {actions ? <div className="mt-6 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
      </div>
    </section>
  );
}
