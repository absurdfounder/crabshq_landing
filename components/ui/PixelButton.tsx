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

type PixelSize = {
  labelMin: string;
  padX: string;
  padY: string;
  text: string;
  /** rest: notch on top-left + bottom-right */
  clipRest: string;
  /** hover: notch swaps to top-right + bottom-left */
  clipHover: string;
};

/**
 * Stair-stepped polygons. Each diagonal corner has a 2-pixel stair (each pixel
 * 2px × 2px) so the corners read as pixel-art edges, not as missing chunks.
 * Rest state notches the TL+BR diagonal; hover snaps the notches to TR+BL.
 */
const PIXEL_SIZE: Record<Size, PixelSize> = {
  sm: {
    labelMin: 'min-h-[28px]',
    padX: 'px-3',
    padY: 'py-2.5',
    text: 'text-[10px] sm:text-[11px]',
    clipRest:
      '[clip-path:polygon(4px_0,100%_0,100%_calc(100%-4px),calc(100%-2px)_calc(100%-4px),calc(100%-2px)_calc(100%-2px),calc(100%-4px)_calc(100%-2px),calc(100%-4px)_100%,0_100%,0_4px,2px_4px,2px_2px,4px_2px)]',
    clipHover:
      'group-hover:[clip-path:polygon(0_0,calc(100%-4px)_0,calc(100%-4px)_2px,calc(100%-2px)_2px,calc(100%-2px)_4px,100%_4px,100%_100%,4px_100%,4px_calc(100%-2px),2px_calc(100%-2px),2px_calc(100%-4px),0_calc(100%-4px))] group-focus-visible:[clip-path:polygon(0_0,calc(100%-4px)_0,calc(100%-4px)_2px,calc(100%-2px)_2px,calc(100%-2px)_4px,100%_4px,100%_100%,4px_100%,4px_calc(100%-2px),2px_calc(100%-2px),2px_calc(100%-4px),0_calc(100%-4px))]',
  },
  md: {
    labelMin: 'min-h-[36px]',
    padX: 'px-4',
    padY: 'py-3',
    text: 'text-[11px] sm:text-xs',
    clipRest:
      '[clip-path:polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-3px)_calc(100%-6px),calc(100%-3px)_calc(100%-3px),calc(100%-6px)_calc(100%-3px),calc(100%-6px)_100%,0_100%,0_6px,3px_6px,3px_3px,6px_3px)]',
    clipHover:
      'group-hover:[clip-path:polygon(0_0,calc(100%-6px)_0,calc(100%-6px)_3px,calc(100%-3px)_3px,calc(100%-3px)_6px,100%_6px,100%_100%,6px_100%,6px_calc(100%-3px),3px_calc(100%-3px),3px_calc(100%-6px),0_calc(100%-6px))] group-focus-visible:[clip-path:polygon(0_0,calc(100%-6px)_0,calc(100%-6px)_3px,calc(100%-3px)_3px,calc(100%-3px)_6px,100%_6px,100%_100%,6px_100%,6px_calc(100%-3px),3px_calc(100%-3px),3px_calc(100%-6px),0_calc(100%-6px))]',
  },
  lg: {
    labelMin: 'min-h-[40px]',
    padX: 'px-5',
    padY: 'py-3.5',
    text: 'text-xs sm:text-sm',
    clipRest:
      '[clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-4px)_calc(100%-8px),calc(100%-4px)_calc(100%-4px),calc(100%-8px)_calc(100%-4px),calc(100%-8px)_100%,0_100%,0_8px,4px_8px,4px_4px,8px_4px)]',
    clipHover:
      'group-hover:[clip-path:polygon(0_0,calc(100%-8px)_0,calc(100%-8px)_4px,calc(100%-4px)_4px,calc(100%-4px)_8px,100%_8px,100%_100%,8px_100%,8px_calc(100%-4px),4px_calc(100%-4px),4px_calc(100%-8px),0_calc(100%-8px))] group-focus-visible:[clip-path:polygon(0_0,calc(100%-8px)_0,calc(100%-8px)_4px,calc(100%-4px)_4px,calc(100%-4px)_8px,100%_8px,100%_100%,8px_100%,8px_calc(100%-4px),4px_calc(100%-4px),4px_calc(100%-8px),0_calc(100%-8px))]',
  },
};

type ToneStyles = {
  fill: string;
  text: string;
  outlineBorder: string;
  outlineBg: string;
  outlineHover: string;
};

function resolveTone(variant: Variant, tone: Tone): ToneStyles {
  if (variant === 'solid' && tone === 'brand') {
    return {
      fill: 'bg-trooper hover:bg-trooper-700',
      text: 'text-white',
      outlineBorder: 'border-slate-900',
      outlineBg: 'bg-transparent',
      outlineHover: 'hover:bg-slate-50',
    };
  }
  if (variant === 'solid' && tone === 'dark') {
    return {
      fill: 'bg-neutral-950 hover:bg-neutral-900',
      text: 'text-white',
      outlineBorder: 'border-neutral-950',
      outlineBg: 'bg-transparent',
      outlineHover: 'hover:bg-neutral-50',
    };
  }
  if (variant === 'solid' && tone === 'light') {
    return {
      fill: 'bg-slate-200',
      text: 'text-slate-900',
      outlineBorder: 'border-slate-900',
      outlineBg: 'bg-transparent',
      outlineHover: 'hover:bg-slate-100',
    };
  }
  return {
    fill: 'bg-transparent',
    text: 'text-slate-900',
    outlineBorder: 'border-slate-900',
    outlineBg: 'bg-transparent',
    outlineHover: 'hover:bg-slate-50',
  };
}

function buildShellClass(className?: string, disabled?: boolean) {
  const wantsFullWidth = className?.includes('w-full');
  return [
    'group relative inline-flex items-stretch select-none',
    wantsFullWidth ? '' : 'w-fit',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
    'active:translate-x-px active:translate-y-px',
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

  const px = PIXEL_SIZE[size];
  const toneStyles = resolveTone(variant, tone);
  const isPixelSolid = variant === 'solid';

  const shellClassName = buildShellClass(className, disabled);

  const labelClassName = [
    'inline-flex flex-1 items-center justify-center gap-2 self-stretch',
    'font-mono font-semibold uppercase leading-none tracking-[0.14em] whitespace-nowrap',
    px.padX,
    px.padY,
    px.text,
    px.labelMin,
    toneStyles.text,
    'border',
    isPixelSolid
      ? [
          'border-transparent',
          toneStyles.fill,
          px.clipRest,
          px.clipHover,
          'transition-none',
        ].join(' ')
      : [toneStyles.outlineBorder, toneStyles.outlineBg, toneStyles.outlineHover].join(' '),
    labelClassNameProp,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <span className={labelClassName}>
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
