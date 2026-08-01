import type { ReactNode } from 'react';
import { PixelMissionTag } from '@/components/PixelAtmosphere';

type CatalogHeroProps = {
  label: string;
  title: string;
  description: string;
  actions?: ReactNode;
};

/** Shared editorial opening for the directory pages (plugins, skills, loops). */
export default function CatalogHero({ label, title, description, actions }: CatalogHeroProps) {
  return (
    <section className="border-b border-[var(--color-line)] bg-canvas">
      <div className="rail page-hero-padding">
        <div className="max-w-4xl">
          <PixelMissionTag index="01" label={label} className="mb-5" />
          <h1 className="font-funneldisplay max-w-4xl text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-ink sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-muted sm:text-xl">
            {description}
          </p>
          {actions ? <div className="mt-7 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
      </div>
    </section>
  );
}
