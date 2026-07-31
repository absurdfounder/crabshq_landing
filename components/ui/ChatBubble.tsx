'use client';

import React, { useEffect, useId, useRef, useState } from 'react';

/**
 * The reference site's chat bubbles, reproduced from their real geometry.
 *
 * Each bubble is a stretched-to-fit SVG behind the text: a rounded rect whose
 * bottom corner is replaced by an organic speech tail, filled with a vertical
 * gradient and outlined with a gradient stroke. The tail construction is
 * lifted point-for-point from the reference markup (an ask bubble at 288×110
 * and a reply bubble at 92×53 resolve to identical constants relative to the
 * anchored corner), so the path generator here produces exactly their shape
 * at whatever size the text needs.
 *
 * The box is measured with a ResizeObserver and the path regenerated at the
 * real size — no preserveAspectRatio="none" squashing of corner radii.
 */

const f = (n: number) => +n.toFixed(3);

/** Ask bubble: tail flowing out of the bottom-right corner. */
function askPath(w: number, h: number) {
  const r = Math.min(23, h / 2);
  return (
    `M${f(r)},0H${f(w - r)}A${f(r)},${f(r)} 0 0 1 ${f(w)},${f(r)}V${f(h - r)}` +
    `C${f(w)},${f(h - 13)} ${f(w - 3.6)},${f(h - 8.5)} ${f(w - 8.423)},${f(h - 6.288)}` +
    `C${f(w - 10.529)},${f(h - 4.423)} ${f(w - 12.072)},${f(h - 1.738)} ${f(w - 10.864)},${f(h + 0.803)}` +
    `C${f(w - 10.405)},${f(h + 1.741)} ${f(w - 9.237)},${f(h + 3.473)} ${f(w - 8.215)},${f(h + 4.808)}` +
    `C${f(w - 7.193)},${f(h + 6.142)} ${f(w - 7.527)},${f(h + 8.623)} ${f(w - 10.154)},${f(h + 8.415)}` +
    `C${f(w - 11.03)},${f(h + 8.352)} ${f(w - 14.534)},${f(h + 6.809)} ${f(w - 18.622)},${f(h + 4.557)}` +
    `C${f(w - 23.596)},${f(h + 1.818)} ${f(w - 29.072)},${f(h - 0.024)} ${f(w - 34.75)},${f(h - 0.005)}` +
    `H${f(r)}A${f(r)},${f(r)} 0 0 1 0,${f(h - r)}V${f(r)}A${f(r)},${f(r)} 0 0 1 ${f(r)},0Z`
  );
}

/** Reply bubble: tail flowing out of the bottom-left corner. */
function replyPath(w: number, h: number) {
  const r = Math.min(19, h / 2);
  return (
    `M${f(r)},0H${f(w - r)}A${f(r)},${f(r)} 0 0 1 ${f(w)},${f(r)}V${f(h - r)}` +
    `A${f(r)},${f(r)} 0 0 1 ${f(w - r)},${f(h)}H32.204` +
    `C26.698,${f(h)} 21.445,${f(h + 1.902)} 16.622,${f(h + 4.558)}` +
    `C12.535,${f(h + 6.81)} 9.032,${f(h + 8.353)} 8.155,${f(h + 8.416)}` +
    `C5.528,${f(h + 8.625)} 5.193,${f(h + 6.142)} 6.215,${f(h + 4.808)}` +
    `C7.237,${f(h + 3.473)} 8.405,${f(h + 1.742)} 8.864,${f(h + 0.804)}` +
    `C9.761,${f(h - 1.083)} 8.731,${f(h - 3.11)} 7.119,${f(h - 4.436)}` +
    `C2.772,${f(h - 8.013)} 0,${f(h - 13.432)} 0,${f(r)}` +
    `A${f(r)},${f(r)} 0 0 1 ${f(r)},0Z`
  );
}

const STYLES = {
  ask: {
    path: askPath,
    fill: [
      ['0', '#d6e6ff'],
      ['0.42', '#9ec5ff'],
      ['1', '#d2f1f7'],
    ],
    stroke: [
      ['0', '#221898'],
      ['1', '#626262'],
    ],
    text: 'text-[#101a4d]',
  },
  reply: {
    path: replyPath,
    fill: [
      ['0', '#ffe9d6'],
      ['0.42', '#ffc999'],
      ['1', '#ffe9d6'],
    ],
    stroke: [
      ['0', '#9a5518'],
      ['1', '#626262'],
    ],
    text: 'text-[#4a2b0f]',
  },
} as const;

export default function ChatBubble({
  kind,
  className = '',
  children,
}: {
  kind: keyof typeof STYLES;
  className?: string;
  children: React.ReactNode;
}) {
  const uid = useId();
  const ref = useRef<HTMLDivElement>(null);
  // Nominal size for the server render; corrected to the measured box on mount.
  const [dim, setDim] = useState({ w: 320, h: 46 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () =>
      setDim({ w: Math.max(60, el.offsetWidth), h: Math.max(30, el.offsetHeight) });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const s = STYLES[kind];
  const fillId = `bub-f-${uid}`;
  const strokeId = `bub-s-${uid}`;

  return (
    <div
      ref={ref}
      className={`relative w-max max-w-full ${
        kind === 'ask' ? 'px-5 py-2.5' : 'px-4 py-2'
      } ${className}`}
    >
      <svg
        className="absolute left-0 top-0 drop-shadow-[0_2px_3px_rgba(26,26,26,0.10)]"
        style={{ width: dim.w, height: dim.h + 9 }}
        viewBox={`0 0 ${dim.w} ${dim.h + 9}`}
        aria-hidden
      >
        <defs>
          <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
            {s.fill.map(([o, c]) => (
              <stop key={o} offset={o} stopColor={c} />
            ))}
          </linearGradient>
          <linearGradient id={strokeId} x1="0" y1="0" x2="0" y2="1">
            {s.stroke.map(([o, c]) => (
              <stop key={o} offset={o} stopColor={c} />
            ))}
          </linearGradient>
        </defs>
        <path
          d={s.path(dim.w, dim.h)}
          fill={`url(#${fillId})`}
          stroke={`url(#${strokeId})`}
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
      {/* soft glass sheen along the top, like the reference's gloss layer */}
      <span
        className="pointer-events-none absolute inset-x-4 top-[3px] h-[34%] rounded-full bg-white/45 blur-[5px]"
        aria-hidden
      />
      <span
        className={`relative z-[1] block text-[15px] font-medium leading-snug sm:text-base ${s.text}`}
      >
        {children}
      </span>
    </div>
  );
}
