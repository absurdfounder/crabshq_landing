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
 * landing-page sections. Renders a hairline top border and optional section
 * label so mobile scroll has clear waypoints (not just stacked big boxes).
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
  // Tighter mobile padding — less “endless tall boxes” between sections.
  const frameClasses = [
    'rail',
    bgClass || 'bg-canvas',
    !noBorder ? 'border-t' : '',
    !noBorderBottom ? 'border-b' : '',
    rhythm ? 'py-9 sm:py-16 lg:py-20' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const showLabel = Boolean(eyebrow || eyebrowNumber);
  const labelAlign = eyebrowAlign === 'center' ? 'justify-center text-center' : 'justify-start text-left';

  return (
    <section id={id} className={sectionClasses}>
      <div className={frameClasses}>
        {showLabel ? (
          <p className={`mb-5 flex items-baseline gap-2 sm:mb-7 ${labelAlign}`}>
            {eyebrowNumber ? (
              <span className="font-mono text-[11px] tabular-nums text-ink-faint sm:text-[12px]">
                {eyebrowNumber}
              </span>
            ) : null}
            {eyebrow ? <span className="kicker !inline">{eyebrow}</span> : null}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
