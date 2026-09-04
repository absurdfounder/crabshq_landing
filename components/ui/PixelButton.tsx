'use client';

import React from 'react';
import Link from 'next/link';

type Variant = 'solid' | 'outline';
type Tone = 'brand' | 'dark' | 'light';
type Size = 'sm' | 'md' | 'lg';

interface BasePropsCommon {
  children: React.ReactNode;
  variant?: Variant;
  tone?: Tone;
  size?: Size;
  icon?: React.ReactNode;
  ariaLabel?: string;
  className?: string;
  labelClassName?: string;
  disabled?: boolean;
}

type AnchorRest = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'className' | 'aria-label' | 'children'
>;

type ButtonRest = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'type' | 'className' | 'aria-label' | 'children' | 'disabled' | 'onClick'
>;

interface AnchorProps extends BasePropsCommon, AnchorRest {
  href: string;
  external?: boolean;
  type?: never;
}

interface ButtonProps extends BasePropsCommon, ButtonRest {
  href?: undefined;
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

type PixelButtonProps = AnchorProps | ButtonProps;

/**
 * The site's one button: a double-shell bezel.
 *
 * An outer shell carries the gradient and 2px of padding; an inner face
 * carries its own border. That 2px reveal is what makes it read as a physical
 * control rather than a filled rectangle. See docs/design-system.md §6.
 *
 * This used to render stair-stepped clip-path polygons with ALL-CAPS mono
 * labels at `tracking-[0.14em]` — "GET STARTED", "DOWNLOAD FOR MAC". Uppercase
 * mono is ~30% wider than sentence case for the same word, reads as a terminal
 * prompt rather than an invitation, and the notched corners fought every
 * rounded surface around them. The name is kept because 53 call sites import
 * it and its API is unchanged; only the rendering moved.
 */

type SizeSpec = {
  /** Inner face padding + type. */
  face: string;
  minHeight: string;
};

const SIZE: Record<Size, SizeSpec> = {
  sm: { face: 'px-3.5 py-1.5 text-[13px]', minHeight: '2.25rem' },
  md: { face: 'px-5 py-2.5 text-[15px]', minHeight: '2.75rem' },
  lg: { face: 'px-6 py-3 text-base', minHeight: '3rem' },
};

type ToneStyles = {
  /** Outer shell: the bezel edge. */
  shell: string;
  /** Inner face: the surface the label sits on. */
  face: string;
};

function resolveTone(variant: Variant, tone: Tone): ToneStyles {
  // Outline and light both resolve to the secondary treatment: a white face
  // inside a hairline ring. There is no third button on this site.
  if (variant === 'outline' || tone === 'light') {
    return {
      shell: 'bg-white text-neutral-700 shadow-xs ring-1 ring-black/[0.08]',
      face: 'border-none bg-transparent hover:bg-neutral-50',
    };
  }

  if (tone === 'brand') {
    return {
      shell: 'bg-gradient-to-b from-trooper to-trooper-700 text-white',
      face: 'border-white/20 bg-gradient-to-b from-trooper to-trooper',
    };
  }

  return {
    shell: 'bg-gradient-to-b from-neutral-900 to-neutral-950 text-white',
    face: 'border-neutral-700/80 bg-gradient-to-b from-neutral-900 to-neutral-900',
  };
}

function buildShellClass(shellTone: string, className?: string, disabled?: boolean) {
  const wantsFullWidth = className?.includes('w-full');
  return [
    'group relative flex select-none rounded-[10px] p-0.5',
    'transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]',
    wantsFullWidth ? '' : 'w-fit',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
    shellTone,
    disabled ? 'pointer-events-none opacity-60' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export default function PixelButton(props: PixelButtonProps) {
  const {
    children,
    variant = 'solid',
    tone = 'brand',
    size = 'md',
    icon,
    ariaLabel,
    className,
    labelClassName: labelClassNameProp,
    disabled,
  } = props;

  const sizing = SIZE[size];
  const toneStyles = resolveTone(variant, tone);

  const shellClassName = buildShellClass(toneStyles.shell, className, disabled);

  const faceClassName = [
    'flex h-full w-full items-center justify-center gap-2 whitespace-nowrap',
    'rounded-[8px] border font-semibold leading-none transition-colors duration-200',
    sizing.face,
    toneStyles.face,
    labelClassNameProp,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <span className={faceClassName} style={{ minHeight: sizing.minHeight }}>
      <span>{children}</span>
      {icon ? <span className="inline-flex shrink-0 items-center">{icon}</span> : null}
    </span>
  );

  if ('href' in props && props.href) {
    const {
      href,
      external,
      children: _c,
      variant: _v,
      tone: _t,
      size: _s,
      icon: _i,
      ariaLabel: _a,
      className: _cn,
      disabled: _d,
      ...rest
    } = props as AnchorProps;

    const isExternal = external || href.startsWith('http');

    if (disabled) {
      return (
        <span role="link" aria-disabled="true" aria-label={ariaLabel} className={shellClassName}>
          {content}
        </span>
      );
    }

    if (isExternal) {
      return (
        <a
          {...rest}
          href={href}
          target={rest.target ?? '_blank'}
          rel={rest.rel ?? 'noopener noreferrer'}
          aria-label={ariaLabel}
          className={shellClassName}
        >
          {content}
        </a>
      );
    }

    return (
      <Link {...rest} href={href} aria-label={ariaLabel} className={shellClassName}>
        {content}
      </Link>
    );
  }

  const {
    type,
    onClick,
    children: _c,
    variant: _v,
    tone: _t,
    size: _s,
    icon: _i,
    ariaLabel: _a,
    className: _cn,
    disabled: _d,
    ...rest
  } = props as ButtonProps;

  return (
    <button
      {...rest}
      type={type ?? 'button'}
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      className={shellClassName}
    >
      {content}
    </button>
  );
}
