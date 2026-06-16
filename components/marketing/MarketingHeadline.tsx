import type { ReactNode } from 'react';

export type MarketingHeadlinePart = {
  text: string;
  tone?: 'default' | 'brand' | 'muted' | 'strong';
};

export type MarketingHeadlineLine = {
  parts: MarketingHeadlinePart[];
  /** Insert trooper logomark after this part index (0-based). */
  iconAfter?: number;
};

export type MarketingHeadlineProps = {
  as?: 'h1' | 'h2' | 'h3';
  size?: 'hero' | 'section' | 'card';
  align?: 'left' | 'center';
  lines: MarketingHeadlineLine[];
  subline?: ReactNode;
  className?: string;
  sublineClassName?: string;
};

const sizeClasses = {
  hero: 'text-3xl sm:text-4xl md:text-[2.5rem] lg:text-[2.75rem] leading-[1.12]',
  section: 'text-2xl sm:text-3xl md:text-4xl leading-[1.15]',
  card: 'text-lg sm:text-2xl lg:text-3xl leading-snug',
} as const;

const sublineSizeClasses = {
  hero: 'text-base sm:text-lg mt-3 sm:mt-4',
  section: 'text-sm sm:text-base mt-3',
  card: 'text-sm mt-3 sm:mt-4',
} as const;

const toneClasses: Record<NonNullable<MarketingHeadlinePart['tone']>, string> = {
  default: 'text-slate-900 font-normal',
  brand: 'text-trooper font-normal',
  muted: 'text-slate-500 font-normal',
  strong: 'text-slate-950 font-semibold',
};

function InlineTrooperMark({ size }: { size: MarketingHeadlineProps['size'] }) {
  const markSize =
    size === 'hero'
      ? 'h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9'
      : size === 'section'
        ? 'h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8'
        : 'h-5 w-5 sm:h-6 sm:w-6';

  return (
    <span className="inline-flex mx-1.5 sm:mx-2 align-[-0.15em]" aria-hidden>
      <img
        src="/images/trooper-logomark.png"
        alt=""
        width={36}
        height={36}
        className={`pixel-render ${markSize} object-contain inline-block`}
        decoding="async"
      />
    </span>
  );
}

function renderPart(part: MarketingHeadlinePart, key: string) {
  const tone = part.tone ?? 'default';
  return (
    <span key={key} className={toneClasses[tone]}>
      {part.text}
    </span>
  );
}

export default function MarketingHeadline({
  as: Tag = 'h2',
  size = 'section',
  align = 'left',
  lines,
  subline,
  className = '',
  sublineClassName = '',
}: MarketingHeadlineProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={alignClass}>
      <Tag
        className={`font-funneldisplay tracking-tight text-balance max-w-3xl ${sizeClasses[size]} ${className}`}
      >
        {lines.map((line, lineIndex) => (
          <span
            key={`line-${lineIndex}`}
            className={lineIndex > 0 ? 'block mt-0.5 sm:mt-1' : 'block'}
          >
            {line.parts.map((part, partIndex) => (
              <span key={`part-${lineIndex}-${partIndex}`}>
                {renderPart(part, `text-${lineIndex}-${partIndex}`)}
                {line.iconAfter === partIndex ? <InlineTrooperMark size={size} /> : null}
              </span>
            ))}
          </span>
        ))}
      </Tag>
      {subline ? (
        <p
          className={`text-slate-500 leading-relaxed max-w-2xl ${sublineSizeClasses[size]} ${align === 'center' ? 'mx-auto' : ''} ${sublineClassName}`}
        >
          {subline}
        </p>
      ) : null}
    </div>
  );
}

/** Render a card-level title + optional brand/muted highlight spans. */
export function MarketingCardTitle({
  title,
  titleHighlight,
  titleHighlightTone = 'brand',
  className = '',
}: {
  title: string;
  titleHighlight?: string;
  titleHighlightTone?: 'brand' | 'muted';
  className?: string;
}) {
  const highlightClass =
    titleHighlightTone === 'brand' ? 'text-trooper font-normal' : 'text-slate-500 font-normal';

  return (
    <h3
      className={`font-funneldisplay text-lg sm:text-2xl lg:text-3xl tracking-tight text-slate-900 mt-3 sm:mt-4 leading-snug ${className}`}
    >
      {title}
      {titleHighlight ? (
        <>
          {' '}
          <span className={highlightClass}>{titleHighlight}</span>
        </>
      ) : null}
    </h3>
  );
}
