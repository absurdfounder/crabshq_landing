import React from 'react';

interface SectionShellProps {
  id?: string;
  eyebrow?: string;
  eyebrowNumber?: string;
  className?: string;
  bgClass?: string;
  noBorder?: boolean;
  noBorderBottom?: boolean;
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
  bgClass = '',
  noBorder = false,
  noBorderBottom = true,
  children,
}: SectionShellProps) {
  const sectionClasses = ['relative', bgClass, className]
    .filter(Boolean)
    .join(' ');

  // Inner frame: left/right vertical hairlines + a top hairline closing the
  // box on top. The next SectionShell's own top border serves as this
  // section's bottom divider, so we omit border-b unless explicitly asked.
  const frameClasses = [
    'max-w-7xl mx-auto border-slate-200',
    !noBorder ? 'border-t border-l border-r' : 'border-l border-r',
    !noBorderBottom ? 'border-b' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section id={id} className={sectionClasses}>
      <div className={frameClasses}>
        {eyebrow && (
          <div className="px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6 -mb-2 sm:-mb-3">
            <span className="type-eyebrow-num">
              {eyebrowNumber && (
                <span className="text-slate-400">[{eyebrowNumber}]</span>
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
