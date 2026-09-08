'use client';

type HeroRotatingHeadlineProps = {
  className?: string;
};

export default function HeroRotatingHeadline({ className = '' }: HeroRotatingHeadlineProps) {
  return (
    <h1 className={`h1-hero ${className}`.trim()}>
      <span className="block">Give the order.</span>
      <span className="mt-0.5 block sm:mt-1">
        Your troopers <span className="text-fern-700">ship&nbsp;it.</span>
      </span>
    </h1>
  );
}
