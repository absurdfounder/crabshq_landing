// components/FloatingScrollIndicator.tsx
'use client';

import React, { useState, useEffect } from 'react';

const FloatingScrollIndicator: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [showScrollbar, setShowScrollbar] = useState<boolean>(false);

  const handleScroll = (): void => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
    setScrollPosition(scrollPercent);

    // Hide scrollbar in hero section (first ~100vh)
    const heroHeight = window.innerHeight;
    setShowScrollbar(scrollTop > heroHeight * 0.8); // Show after 80% of hero section
  };

  const handleIndicatorClick = (index: number): void => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const heroHeight = window.innerHeight;
    // Start from after hero section and divide remaining space
    const targetPosition = heroHeight + ((index / 19) * (docHeight - heroHeight));
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  };

  useEffect((): (() => void) => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial position
    
    return (): void => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Don't render on mobile or if not past hero section
  if (!showScrollbar) return null;

  return (
    <div className="hidden lg:block fixed left-4 top-1/2 transform -translate-y-1/2 w-12 rounded-full flex flex-col items-center py-8 z-50">
      {/* Scroll indicator lines */}
      <div className="space-y-2 w-10 flex flex-col items-center">
        {[...Array(20)].map((_, i: number) => {
          const distanceFromActive: number = Math.abs(i - scrollPosition * 19);
          const isCenter: boolean = distanceFromActive < 1;
          const isAdjacent: boolean = distanceFromActive >= 1 && distanceFromActive < 2.5;
          const isActive: boolean = distanceFromActive < 2.5;
          
          let width: string = '16px'; // default width
          if (isCenter) {
            width = '32px'; // largest - center line
          } else if (isAdjacent) {
            width = '24px'; // medium - adjacent lines
          }
          
          return (
            <div
              key={i}
              className={`h-1 transition-all duration-300 cursor-pointer hover:opacity-100 select-none ${
                isActive ? 'bg-trooper pixel-flicker' : 'bg-slate-300 hover:bg-trooper-300'
              }`}
              style={{
                width: width,
                opacity: isActive ? 1 : 0.45,
                imageRendering: 'pixelated',
              }}
              onClick={(): void => handleIndicatorClick(i)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FloatingScrollIndicator;