import React from 'react';

interface SectionShellProps {
  id?: string;
  eyebrow?: string;
  eyebrowNumber?: string;
  /** Default left. Use center when the section body is a centered composition. */
  eyebrowAlign?: 'left' | 'center';
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
  eyebrowAlign = 'left',
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

  // `.rail` owns measure + gutter + side hairlines. Top hairline closes the
  // box on the frame so vertical and horizontal lines meet at the corners;
  // the next section's top border serves as this one's bottom divider.
  const frameClasses = [
    'rail',
    bgClass || 'bg-canvas',
    !noBorder ? 'border-t' : '',
    !noBorderBottom ? 'border-b' : '',
    rhythm ? 'py-12 sm:py-20' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section id={id} className={sectionClasses}>
      <div className={frameClasses}>
        {eyebrow && (
          <div
            className={`${rhythm ? 'pb-4' : 'pb-4 pt-12 sm:pt-20'} ${
              eyebrowAlign === 'center' ? 'text-center' : ''
            }`}
          >
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
