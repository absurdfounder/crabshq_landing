'use client';

type HeroRotatingHeadlineProps = {
  className?: string;
};

export default function HeroRotatingHeadline({ className = '' }: HeroRotatingHeadlineProps) {
  return (
    <h1
      className={`max-w-full text-balance font-display text-[2.25rem] font-medium leading-[1.08] tracking-tight text-neutral-800 sm:text-5xl lg:text-6xl ${className}`}
    >
      <span className="block">Give the order.</span>
      <span className="mt-1 block sm:mt-2">
        Your troopers <span className="text-fern-700">ship it.</span>
      </span>
    </h1>
  );
}
