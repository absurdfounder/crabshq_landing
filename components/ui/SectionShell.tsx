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

  // Inner frame: left/right vertical hairlines + a top hairline closing the
  // box on top. The next SectionShell's own top border serves as this
  // section's bottom divider, so we omit border-b unless explicitly asked.
  //
  // The side rails are dropped below `sm`: at phone widths they sit hard
  // against the viewport edge and read as a container box rather than as the
  // page's own margin.
  const frameClasses = [
    // `.rail` owns measure + gutter + side hairlines (app/css/style.css).
    // No overflow-x-hidden: it was clipping misalignment rather than
    // preventing it, and it disables `position: sticky` on descendants.
    'rail',
    bgClass || 'bg-canvas',
    !noBorder ? 'border-t' : '',
    !noBorderBottom ? 'border-b' : '',
    rhythm ? 'py-10 md:py-14' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section id={id} className={sectionClasses}>
      <div className={frameClasses}>
        {eyebrow && (
          <div className={rhythm ? 'pb-6 md:pb-8' : 'pt-4 sm:pt-6 md:pt-8 pb-2'}>
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
