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
  /**
   * Let the shell own the section's vertical rhythm instead of the child.
   *
   * Opt-in: most callers still pad their own children, and stacking both would
   * double the gap. Pass this only after removing the child's own padding.
   */
  rhythm?: boolean;
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
  rhythm = false,
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

  // The band separator sits on the <section>, not on an inner frame, so it
  // runs the full width of the viewport. `.rail` is now measure + gutter only
  // — it draws no side edges (app/css/style.css).
  const frameClasses = ['rail', rhythm ? 'py-12 sm:py-20' : ''].filter(Boolean).join(' ');

  return (
    <section
      id={id}
      className={[sectionClasses, !noBorder ? 'band' : ''].filter(Boolean).join(' ')}
    >
      <div className={frameClasses}>
        {eyebrow && (
          <div className={rhythm ? 'pb-4' : 'pb-4 pt-12 sm:pt-20'}>
            {/*
              `eyebrowNumber` is accepted and ignored. It used to print
              `[02]` before the label, numbering the page like a parts
              catalogue — which tells a reader how many more of these they
              have left to sit through. 75 call sites pass it; rather than
              touch all of them, the shell stops rendering it.
            */}
            <span className="kicker">{eyebrow}</span>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
