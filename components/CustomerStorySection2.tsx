'use client';

import Image from 'next/image';

const sectionXPadding = 'px-4 sm:px-6 lg:px-8';

export default function CustomerStorySection2() {
  return (
    <section 
      className="border border-neutral-200 bg-white"
      style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(186, 183, 195, 0.08) 2px, rgba(186, 183, 195, 0.08) 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(186, 183, 195, 0.08) 2px, rgba(186, 183, 195, 0.08) 4px)',
        backgroundSize: '100% 20px, 20px 100%',
      }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center lg:grid-cols-2">
      <div className={`${sectionXPadding} flex flex-col gap-6 py-12`}>
        <div className="font-silkscreen text-xl text-red-600">Customer Story</div>
        <blockquote className="font-funneldisplay text-2xl font-medium text-neutral-800 lg:text-3xl pr-4">
          &ldquo;We&apos;re saving at least 20 hours/mo which frees me up to work on more impactful tasks.&rdquo;
        </blockquote>
        <div className="flex flex-col gap-1">
          <div className="font-medium text-neutral-800">Emmet Cooke</div>
          <div className="text-sm text-neutral-500">Founder, Pixelflow</div>
        </div>
      </div>
      <div className="relative overflow-hidden bg-stone-100">
        <div className="relative aspect-[5/3]">
          <Image
            src="https://pbs.twimg.com/profile_images/1773282762708881408/RzahtNBz_400x400.jpg"
            alt="Emmet Cooke"
            fill
            className="object-cover"
            style={{
              filter: 'grayscale(100%) brightness(0.95) sepia(100%) hue-rotate(200deg) saturate(60%)',
            }}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div
            className="absolute inset-0 mix-blend-multiply"
            style={{
              backgroundImage: `
                linear-gradient(45deg, rgba(0,0,0,0.3) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.3) 75%),
                linear-gradient(45deg, rgba(0,0,0,0.3) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.3) 75%)
              `,
              backgroundSize: '4px 4px',
              backgroundPosition: '0 0, 2px 2px',
              imageRendering: 'pixelated',
            }}
          />
        </div>
      </div>
      </div>
    </section>
  );
}
