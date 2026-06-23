'use client';

import dynamic from 'next/dynamic';
import { useReducedMotion } from 'framer-motion';

const ImageDithering = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.ImageDithering),
  { ssr: false },
);

const FOREST_BACK = '#141a10';

type PixelLandscapeBackgroundProps = {
  className?: string;
  image?: string;
};

function StaticForestLayer({ image, className = '' }: { image: string; className?: string }) {
  return (
    <div
      aria-hidden
      className={`absolute inset-0 ${className}`}
      style={{
        backgroundColor: FOREST_BACK,
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        imageRendering: 'pixelated',
      }}
    />
  );
}

export default function PixelLandscapeBackground({
  className = '',
  image = '/images/hero-dashboard-bg.png',
}: PixelLandscapeBackgroundProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <StaticForestLayer image={image} />

      {!reduceMotion ? (
        <ImageDithering
          image={image}
          width="100%"
          height="100%"
          colorBack={FOREST_BACK}
          originalColors
          inverted={false}
          type="4x4"
          size={2.25}
          colorSteps={4}
          fit="cover"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />
      ) : null}

      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(20, 26, 16, 0.04) 0%, rgba(20, 26, 16, 0.14) 100%)',
        }}
      />
    </div>
  );
}
