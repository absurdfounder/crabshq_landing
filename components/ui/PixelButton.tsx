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

type SizeStyles = {
  spacer: string;
  shadow: string;
  hover: string;
  padding: string;
  text: string;
};

// Tailwind JIT requires literal class strings; keep variants explicit.
const SIZE_STYLES: Record<Size, SizeStyles> = {
  sm: {
    spacer: 'mb-[3px] mr-[3px]',
    shadow: 'translate-x-[3px] translate-y-[3px]',
    hover:
      'hover:translate-x-[3px] hover:translate-y-[3px] focus-visible:translate-x-[3px] focus-visible:translate-y-[3px]',
    padding: 'px-3 py-2.5',
    text: 'text-[11px]',
  },
  md: {
    spacer: 'mb-[4px] mr-[4px]',
    shadow: 'translate-x-[4px] translate-y-[4px]',
    hover:
      'hover:translate-x-[4px] hover:translate-y-[4px] focus-visible:translate-x-[4px] focus-visible:translate-y-[4px]',
    padding: 'px-5 py-3',
    text: 'text-xs sm:text-sm',
  },
  lg: {
    spacer: 'mb-[6px] mr-[6px]',
    shadow: 'translate-x-[6px] translate-y-[6px]',
    hover:
      'hover:translate-x-[6px] hover:translate-y-[6px] focus-visible:translate-x-[6px] focus-visible:translate-y-[6px]',
    padding: 'px-6 py-3.5',
    text: 'text-sm sm:text-base',
  },
};

type ToneStyles = {
  bg: string;
  text: string;
  shadowBg: string;
  hoverBg: string;
};

function resolveTone(variant: Variant, tone: Tone): ToneStyles {
  if (variant === 'solid' && tone === 'brand') {
    return {
      bg: 'bg-emerald-500',
      text: 'text-slate-900',
      shadowBg: 'bg-slate-900',
      hoverBg: 'hover:bg-emerald-400',
    };
  }
  if (variant === 'solid' && tone === 'dark') {
    return {
      bg: 'bg-slate-900',
      text: 'text-white',
      shadowBg: 'bg-emerald-500',
      hoverBg: 'hover:bg-slate-950',
    };
  }
  if (variant === 'solid' && tone === 'light') {
    return {
      bg: 'bg-slate-100',
      text: 'text-slate-900',
      shadowBg: 'bg-slate-300',
      hoverBg: 'hover:bg-white',
    };
  }
  if (variant === 'outline' && tone === 'brand') {
    return {
      bg: 'bg-white',
      text: 'text-slate-900',
      shadowBg: 'bg-emerald-500',
      hoverBg: 'hover:bg-emerald-50',
    };
  }
  if (variant === 'outline' && tone === 'dark') {
    return {
      bg: 'bg-white',
      text: 'text-slate-900',
      shadowBg: 'bg-slate-900',
      hoverBg: 'hover:bg-slate-50',
    };
  }
  // outline + light
  return {
    bg: 'bg-white',
    text: 'text-slate-900',
    shadowBg: 'bg-slate-300',
    hoverBg: 'hover:bg-slate-50',
  };
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
    disabled,
  } = props;

  const sizeStyles = SIZE_STYLES[size];
  const toneStyles = resolveTone(variant, tone);

  const wrapperClassName = [
    'relative inline-flex group align-middle',
    sizeStyles.spacer,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const buttonClassName = [
    'relative inline-flex items-center gap-2 select-none whitespace-nowrap',
    'font-mono uppercase tracking-[0.14em] font-semibold',
    'border border-slate-900',
    'transition-transform duration-75 [transition-timing-function:steps(1,end)] motion-reduce:transition-none',
    sizeStyles.hover,
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
    toneStyles.bg,
    toneStyles.text,
    toneStyles.hoverBg,
    sizeStyles.padding,
    sizeStyles.text,
    disabled ? 'pointer-events-none opacity-60' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const shadowClassName = [
    'absolute inset-0 pointer-events-none',
    sizeStyles.shadow,
    toneStyles.shadowBg,
  ].join(' ');

  const Label = (
    <>
      <span>{children}</span>
      {icon ? <span className="ml-1 inline-flex items-center">{icon}</span> : null}
    </>
  );

  let interactive: React.ReactNode;

  if ('href' in props && props.href) {
    const {
      href,
      external,
      // strip props we own from rest
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
      interactive = (
        <span
          role="link"
          aria-disabled="true"
          aria-label={ariaLabel}
          className={buttonClassName}
        >
          {Label}
        </span>
      );
    } else if (isExternal) {
      interactive = (
        <a
          {...rest}
          href={href}
          target={rest.target ?? '_blank'}
          rel={rest.rel ?? 'noopener noreferrer'}
          aria-label={ariaLabel}
          className={buttonClassName}
        >
          {Label}
        </a>
      );
    } else {
      interactive = (
        <Link
          {...rest}
          href={href}
          aria-label={ariaLabel}
          className={buttonClassName}
        >
          {Label}
        </Link>
      );
    }
  } else {
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

    interactive = (
      <button
        {...rest}
        type={type ?? 'button'}
        aria-label={ariaLabel}
        onClick={onClick}
        disabled={disabled}
        className={buttonClassName}
      >
        {Label}
      </button>
    );
  }

  return (
    <span className={wrapperClassName}>
      <span aria-hidden="true" className={shadowClassName} />
      {interactive}
    </span>
  );
}
