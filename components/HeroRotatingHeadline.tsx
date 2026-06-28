'use client';

type HeroRotatingHeadlineProps = {
  className?: string;
};

export default function HeroRotatingHeadline({ className = '' }: HeroRotatingHeadlineProps) {
  return (
    <h1
      className={`max-w-full font-display font-medium text-[2rem] leading-[1.12] tracking-tight sm:text-4xl md:text-[2.75rem] lg:text-[3.25rem] lg:leading-[1.08] xl:text-[3.5rem] ${className}`}
    >
      <span className="block text-balance text-ink">Agents + Humans</span>
      <span className="mt-1 block text-balance sm:mt-2">
        <span className="text-ink">Whole Team. </span>
        <span className="text-fern">One App.</span>
      </span>
    </h1>
  );
}
