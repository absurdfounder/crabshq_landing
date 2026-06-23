'use client';

import dynamic from 'next/dynamic';
import { useReducedMotion } from 'framer-motion';

const ImageDithering = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.ImageDithering),
  { ssr: false },
);

type PixelLandscapeBackgroundProps = {
  className?: string;
  image?: string;
};

export default function PixelLandscapeBackground({
  className = '',
  image = '/images/hero-dashboard-bg.png',
}: PixelLandscapeBackgroundProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 ${className}`}
        style={{
          backgroundColor: '#141a10',
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    );
  }

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <ImageDithering
        image={image}
        width="100%"
        height="100%"
        colorBack="#141a10"
        originalColors
        inverted={false}
        type="4x4"
        size={2.25}
        colorSteps={4}
        fit="cover"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.9 }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(20, 26, 16, 0.02) 0%, rgba(20, 26, 16, 0.1) 100%)',
        }}
      />
    </div>
  );
}
