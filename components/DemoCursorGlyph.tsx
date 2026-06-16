'use client';

/** Shared green demo pointer — matches DemoClickCursor #3f6b00 */
export function DemoCursorGlyph({
  clicking = false,
  scale = 1,
  softShadow = false,
}: {
  clicking?: boolean;
  scale?: number;
  softShadow?: boolean;
}) {
  const w = 26 * scale;
  const h = 30 * scale;

  return (
    <div
      style={{
        position: 'relative',
        transform: clicking ? 'scale(0.9) translateY(1px)' : 'scale(1)',
        transition: 'transform 0.14s cubic-bezier(0.22, 1, 0.36, 1)',
        transformOrigin: '2px 2px',
      }}
    >
      <svg
        width={w}
        height={h}
        viewBox="0 0 26 30"
        fill="none"
        style={{
          display: 'block',
          filter: softShadow
            ? 'drop-shadow(0 1px 2px rgba(0,0,0,0.16))'
            : 'drop-shadow(0 2px 6px rgba(0,0,0,0.28))',
        }}
      >
        <path
          d="M6 4 L6 24 L11 19 L14.5 26.5 L17.5 25 L14 18 L20.5 17 Z"
          fill="#3f6b00"
          stroke="#ffffff"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      </svg>
      {clicking && (
        <span
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 22 * scale,
            height: 22 * scale,
            borderRadius: '50%',
            border: '2px solid rgba(63,107,0,0.85)',
            animation: 'demoCursorRipple 0.42s cubic-bezier(0.22, 1, 0.36, 1) forwards',
          }}
        />
      )}
    </div>
  );
}
