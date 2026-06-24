import React from 'react';

interface SectionShellProps {
  id?: string;
  eyebrow?: string;
  eyebrowNumber?: string;
  className?: string;
  bgClass?: string;
  noBorder?: boolean;
  noBorderBottom?: boolean;
  /** First section below fixed site header — clears TopBar + nav overlap */
  clearSiteHeader?: boolean;
  children: React.ReactNode;
}

/**
 * SectionShell — establishes a deliberate grid/line rhythm between major
 * landing-page sections. Renders a hairline top border, an optional numbered
 * monospace eyebrow at the top-left (e.g. `[02] WORKFORCE`), and the children.
 *
 * Keeps the light theme intact. Children control their own inner padding and
 * background; pass `bgClass` so the eyebrow strip matches the section's bg.
 */
export default function SectionShell({
  id,
  eyebrow,
  eyebrowNumber,
  className = '',
  bgClass = 'bg-canvas',
  noBorder = false,
  noBorderBottom = true,
  clearSiteHeader = false,
  children,
}: SectionShellProps) {
  const sectionClasses = [
    'relative',
    bgClass || 'bg-canvas',
    clearSiteHeader ? 'site-header-clear' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Inner frame: left/right vertical hairlines + a top hairline closing the
  // box on top. The next SectionShell's own top border serves as this
  // section's bottom divider, so we omit border-b unless explicitly asked.
  const frameClasses = [
    'max-w-7xl mx-auto min-w-0 overflow-x-hidden border-[var(--color-line)]',
    'px-4 sm:px-6',
    bgClass || 'bg-canvas',
    !noBorder ? 'border-t border-l border-r' : 'border-l border-r',
    !noBorderBottom ? 'border-b' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section id={id} className={sectionClasses}>
      <div className={frameClasses}>
        {eyebrow && (
          <div className="pt-4 sm:pt-6 md:pt-8 pb-2">
            <span className="type-eyebrow-num">
              {eyebrowNumber && (
                <span className="text-ink-faint">[{eyebrowNumber}]</span>
              )}
              {eyebrowNumber && <span>&nbsp;</span>}
              {eyebrow}
            </span>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
