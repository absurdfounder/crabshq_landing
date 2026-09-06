import type { CSSProperties } from 'react';

/** Soft pad for cast SVGs — never circle-crop Mickey ears / Cubee corners / cloud blobs. */
export function CastAvatarDisc({
  src,
  size,
  alt = '',
  border = false,
  borderColor,
}: {
  src: string;
  size: number;
  alt?: string;
  border?: boolean;
  borderColor?: string;
}) {
  const isCast = src.includes('/images/cast/');
  if (!isCast) {
    return (
      <img
        src={src}
        alt={alt}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          objectFit: 'cover',
          border: border && borderColor ? `1.5px solid ${borderColor}` : undefined,
          flexShrink: 0,
          display: 'block',
        }}
      />
    );
  }

  const radius = Math.max(8, Math.round(size * 0.28));
  const mark = Math.round(size * 0.78);
  const shell: CSSProperties = {
    width: size,
    height: size,
    borderRadius: radius,
    background: '#f5f5f4',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    overflow: 'visible',
    border: border && borderColor ? `1.5px solid ${borderColor}` : undefined,
    boxSizing: 'border-box',
  };

  return (
    <span style={shell}>
      <img
        src={src}
        alt={alt}
        style={{
          width: mark,
          height: mark,
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </span>
  );
}

export function CastAvatarFallback({ size }: { size: number }) {
  return (
    <span
      aria-hidden
      style={{
        width: size,
        height: size,
        borderRadius: Math.max(8, Math.round(size * 0.28)),
        background: '#e7e5e4',
        flexShrink: 0,
        display: 'block',
      }}
    />
  );
}
