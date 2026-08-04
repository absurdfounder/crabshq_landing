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
 * landing-page sections. Renders a hairline top border and the children.
 *
 * Eyebrow / number props are accepted for call-site compatibility but never
 * rendered — small left kickers read as misaligned when section bodies are
 * centered, and duplicated real headlines below them.
 */
export default function SectionShell({
  id,
  eyebrow,
  eyebrowNumber: _eyebrowNumber,
  eyebrowAlign: _eyebrowAlign = 'left',
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

  // Non-rhythm sections used to get top padding from the eyebrow strip.
  // Keep that spacing when a label was requested so layouts do not collapse.
  const needsLegacyTopPad = Boolean(eyebrow) && !rhythm;

  return (
    <section id={id} className={sectionClasses}>
      <div className={frameClasses}>
        {needsLegacyTopPad ? <div className="pt-12 sm:pt-20" aria-hidden /> : null}
        {children}
      </div>
    </section>
  );
}
