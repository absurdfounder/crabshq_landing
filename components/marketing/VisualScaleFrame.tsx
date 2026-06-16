'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type VisualScaleFrameProps = {
  children: ReactNode;
  baseWidth: number;
  baseHeight: number;
  minScale?: number;
};

/** Scale fixed-size demo content down to fit narrow columns without stretching layout. */
export default function VisualScaleFrame({
  children,
  baseWidth,
  baseHeight,
  minScale = 0.38,
}: VisualScaleFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const w = el.clientWidth;
      setScale(w >= baseWidth ? 1 : Math.max(minScale, w / baseWidth));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [baseWidth, minScale]);

  const scaledW = baseWidth * scale;
  const scaledH = baseHeight * scale;

  return (
    <div ref={containerRef} className="w-full">
      <div className="relative mx-auto" style={{ width: scaledW, height: scaledH }}>
        <div
          style={{
            width: baseWidth,
            height: baseHeight,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
