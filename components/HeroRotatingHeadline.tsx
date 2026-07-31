'use client';

type HeroRotatingHeadlineProps = {
  className?: string;
};

export default function HeroRotatingHeadline({ className = '' }: HeroRotatingHeadlineProps) {
  return (
    // text-4xl sm:text-5xl and nothing above it. This was
    // text-[2.25rem] sm:text-5xl lg:text-6xl, which under the old ramp topped
    // out at 88px — nearly double the 48px the reference design gives its h1,
    // and big enough that the headline stopped being read and started being
    // looked at.
    <h1
      className={`max-w-full text-balance font-display text-4xl font-medium leading-[1.08] tracking-tight text-neutral-800 sm:text-5xl ${className}`}
    >
      <span className="block">Give the order.</span>
      <span className="mt-1 block sm:mt-2">
        Your troopers <span className="text-fern-700">ship it.</span>
      </span>
    </h1>
  );
}
