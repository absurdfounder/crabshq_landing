'use client';

import { useHomeMode } from '@/components/home/HomeModeContext';

type HeroRotatingHeadlineProps = {
  className?: string;
};

export default function HeroRotatingHeadline({ className = '' }: HeroRotatingHeadlineProps) {
  const { isPersonal } = useHomeMode();

  if (isPersonal) {
    return (
      <h1 className={`h1-hero ${className}`.trim()}>
        <span className="block">Meet Buddy.</span>
        <span className="mt-0.5 block sm:mt-1">
          Your personal agent <span className="text-fern-700">ships&nbsp;it.</span>
        </span>
      </h1>
    );
  }

  return (
    <h1 className={`h1-hero ${className}`.trim()}>
      <span className="block">Give the order.</span>
      <span className="mt-0.5 block sm:mt-1">
        Your troopers <span className="text-fern-700">ship&nbsp;it.</span>
      </span>
    </h1>
  );
}
