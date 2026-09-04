import { TROOPERS, type Trooper, type TrooperMarkShape } from '@/lib/troopers';

type TrooperMarkProps = {
  trooper: Trooper;
  /** Rendered size in px. Hero chip rows want ~28; cast cards ~36. */
  size?: number;
  className?: string;
};

/**
 * Saturated identity blob — one colour, one silhouette per trooper.
 *
 * Chrome stays monochrome; these marks carry the rainbow. Soft white gloss
 * keeps them reading as glossy product glyphs rather than flat badges.
 */
export default function TrooperMark({
  trooper,
  size = 28,
  className = '',
}: TrooperMarkProps) {
  const { accent, mark } = trooper;

  return (
    <svg
      viewBox="0 0 297 297"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={`block shrink-0 ${className}`}
    >
      <MarkShape shape={mark} fill={accent} />
      <MarkGloss shape={mark} />
    </svg>
  );
}

function MarkShape({ shape, fill }: { shape: TrooperMarkShape; fill: string }) {
  switch (shape) {
    case 'circle':
      return <circle cx="148.5" cy="148.5" r="148.5" fill={fill} />;
    case 'round-rect':
      return <rect width="297" height="297" rx="60" fill={fill} />;
    case 'squircle':
      return (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.24 129.28C0.24 43.01 43.25 0 129.52 0H167.72C253.99 0 297 43.01 297 129.28V268.17C297 287.39 287.39 297 268.17 297H129.28C43.01 297 0 253.99 0 167.72V129.52L0.24 129.28Z"
          fill={fill}
        />
      );
    case 'pebble':
      return (
        <path
          d="M122.5 2.07C116.03 3.31 109.81 5.05 103.58 6.79C89.65 11.26 76.71 18.72 65.76 28.66C53.32 39.84 43.36 53.5 35.65 68.41C25.7 87.29 18.98 107.42 14 128.04C7.53 155.13 3.8 182.46 1.56 210.04C0.81 218.73 0.31 227.18 0.06 235.88C-1.43 268.68 23.46 296.26 55.06 296.26L241.44 297C273.3 297 298.43 269.67 296.94 237.12C295.69 207.06 291.96 176.99 284.99 147.92C279.27 124.32 271.06 101.21 259.61 79.59C250.15 62.2 238.71 45.8 224.27 32.13C212.08 20.95 198.15 11.51 182.47 5.8C164.05-0.91 142.4-1.41 122.5 2.32V2.07Z"
          fill={fill}
        />
      );
    case 'clover':
      return (
        <path
          d="M41.2 8.1C67.66-5.19 100.05-1.56 127.94 14.85C140.44 22.21 156.56 22.21 169.06 14.85C196.95-1.57 229.34-5.19 255.8 8.1C298.92 29.75 309.97 88.08 280.49 138.38C276.3 145.52 276.3 154.48 280.49 161.62C309.97 211.92 298.92 270.25 255.8 291.9C229.34 305.19 196.95 301.57 169.06 285.15C156.56 277.79 140.44 277.79 127.94 285.15C100.05 301.56 67.66 305.19 41.2 291.9C-1.91 270.25-12.97 211.92 16.51 161.62C20.7 154.48 20.7 145.52 16.51 138.38C-12.97 88.08-1.91 29.75 41.2 8.1Z"
          fill={fill}
        />
      );
  }
}

function MarkGloss({ shape }: { shape: TrooperMarkShape }) {
  switch (shape) {
    case 'circle':
      return (
        <ellipse
          opacity="0.65"
          cx="103.66"
          cy="93.33"
          rx="45.06"
          ry="46.44"
          fill="white"
        />
      );
    case 'round-rect':
      return (
        <rect
          opacity="0.65"
          x="38.73"
          y="200"
          width="119"
          height="66"
          rx="33"
          fill="white"
        />
      );
    case 'squircle':
      return (
        <path
          opacity="0.65"
          d="M117.11 37.06C69.31 37.06 45.47 60.77 45.47 108.33L45.34 108.47V129.53C45.34 177.09 74.33 143.12 104.25 111.49C133.1 81 186.09 37.06 138.29 37.06H117.11Z"
          fill="white"
        />
      );
    case 'pebble':
      return (
        <path
          opacity="0.65"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M43.14 261.2C61.17 278.92 93.41 278.08 114.41 269.98C123.74 266.37 124.08 255.14 116.99 248.17L60.28 192.44C51.84 184.15 37.78 186.12 34.27 197.34C27.7 218.3 26.22 244.57 43.14 261.2Z"
          fill="white"
        />
      );
    case 'clover':
      return (
        <path
          opacity="0.65"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M253.17 252.84C238.76 267 210.47 263.88 191.12 255.19C182 251.09 181.75 239.83 188.84 232.86L229.67 192.74C237.88 184.66 251.58 186.23 255.78 196.88C263.33 216.03 266.79 239.45 253.17 252.84Z"
          fill="white"
        />
      );
  }
}

/** Compact row of every trooper mark — for section kickers / hero chips. */
export function TrooperMarkRow({
  size = 28,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`} aria-hidden>
      {TROOPERS.map((t) => (
        <TrooperMark key={t.handle} trooper={t} size={size} />
      ))}
    </div>
  );
}
