'use client'

import { useId } from 'react'

type LiquidOrbVariant = 'changelog' | 'status'

const VARIANTS: Record<
  LiquidOrbVariant,
  {
    glow: string
    fillStops: [string, string, string, string, string]
    waveLight: [string, string, string]
    waveDark: [string, string, string]
    waveAccent: string
    waveAccent2: string
    bubble1: string
    bubble2: string
    shadowLight: string
    shadowDark: string
  }
> = {
  changelog: {
    glow: '#c4a882',
    fillStops: ['#fff4dd', '#ead0a4', '#c4a882', '#8a7e6b', '#3c3528'],
    waveLight: ['#fff4dd', '#d8ba8e', '#7a746a'],
    waveDark: ['#3c3528', '#8a7e6b', '#ead0a4'],
    waveAccent: '#ead0a4',
    waveAccent2: '#fff4dd',
    bubble1: '#ead0a4',
    bubble2: '#fff4dd',
    shadowLight: '#c4a882',
    shadowDark: '#3c3528',
  },
  status: {
    glow: '#49de63',
    fillStops: ['#f4ffe4', '#bfff8b', '#45d45e', '#168845', '#084224'],
    waveLight: ['#ddffd1', '#72f06d', '#0f7c3b'],
    waveDark: ['#05361e', '#15994a', '#b2ff7c'],
    waveAccent: '#baff83',
    waveAccent2: '#e2ffc9',
    bubble1: '#f4ffe4',
    bubble2: '#d5ffc4',
    shadowLight: '#8dff75',
    shadowDark: '#063f22',
  },
}

export default function LiquidOrb({
  variant,
  size = 17,
}: {
  variant: LiquidOrbVariant
  size?: number
}) {
  const uid = useId().replace(/:/g, '')
  const palette = VARIANTS[variant]
  const clipId = `${variant}-orb-clip-${uid}`
  const fillId = `${variant}-orb-fill-${uid}`
  const waveLightId = `${variant}-orb-wave-light-${uid}`
  const waveDarkId = `${variant}-orb-wave-dark-${uid}`
  const shineId = `${variant}-orb-shine-${uid}`
  const liquidId = `${variant}-orb-liquid-${uid}`
  const shadowId = `${variant}-orb-shadow-${uid}`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      aria-hidden
      className="shrink-0 overflow-visible"
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="7" cy="7" r="5.75" />
        </clipPath>
        <radialGradient id={fillId} cx="32%" cy="24%" r="78%">
          <stop offset="0%" stopColor={palette.fillStops[0]} />
          <stop offset="26%" stopColor={palette.fillStops[1]} />
          <stop offset="58%" stopColor={palette.fillStops[2]} />
          <stop offset="82%" stopColor={palette.fillStops[3]} />
          <stop offset="100%" stopColor={palette.fillStops[4]} />
        </radialGradient>
        <linearGradient id={waveLightId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={palette.waveLight[0]} stopOpacity="0.95" />
          <stop offset="46%" stopColor={palette.waveLight[1]} stopOpacity="0.72" />
          <stop offset="100%" stopColor={palette.waveLight[2]} stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id={waveDarkId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={palette.waveDark[0]} stopOpacity="0.82" />
          <stop offset="52%" stopColor={palette.waveDark[1]} stopOpacity="0.48" />
          <stop offset="100%" stopColor={palette.waveDark[2]} stopOpacity="0.24" />
        </linearGradient>
        <radialGradient id={shineId} cx="32%" cy="22%" r="42%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.94)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <filter id={liquidId} x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9 1.25"
            numOctaves={2}
            seed={7}
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="2.6s"
              values="0.75 1.1;1.15 0.8;0.75 1.1"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="0.42"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <filter id={shadowId} x="-80%" y="-80%" width="260%" height="260%">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="1.25"
            floodColor={palette.shadowLight}
            floodOpacity="0.45"
          >
            <animate
              attributeName="flood-opacity"
              dur="1.8s"
              values="0.24;0.62;0.24"
              repeatCount="indefinite"
            />
          </feDropShadow>
          <feDropShadow
            dx="0"
            dy="1"
            stdDeviation="0.65"
            floodColor={palette.shadowDark}
            floodOpacity="0.8"
          />
        </filter>
      </defs>

      <circle cx="7" cy="7" r="5.9" fill={palette.glow} opacity="0.3">
        <animate attributeName="r" dur="1.8s" values="5.9;6.55;5.9" repeatCount="indefinite" />
        <animate
          attributeName="opacity"
          dur="1.8s"
          values="0.28;0.08;0.28"
          repeatCount="indefinite"
        />
      </circle>

      <g filter={`url(#${shadowId})`}>
        <circle cx="7" cy="7" r="5.75" fill={`url(#${fillId})`} />
        <g clipPath={`url(#${clipId})`} filter={`url(#${liquidId})`}>
          <path
            d="M-2 8.15 C1.1 6.35 3.1 8.8 5.7 7.2 C8.6 5.4 10.4 7.2 16 5.65 L16 15 L-2 15 Z"
            fill={`url(#${waveLightId})`}
            opacity="0.84"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              dur="2.4s"
              values="-2.2 0;1.3 -0.35;-2.2 0"
              repeatCount="indefinite"
            />
          </path>
          <path
            d="M-2 5.75 C1.6 7.35 3.4 4.75 6.15 6.15 C9.05 7.65 11.5 5.35 16 6.75 L16 15 L-2 15 Z"
            fill={`url(#${waveDarkId})`}
            opacity="0.64"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              dur="3.1s"
              values="1.6 0;-1.8 0.45;1.6 0"
              repeatCount="indefinite"
            />
          </path>
          <ellipse cx="4.05" cy="9.1" rx="2.7" ry="1.45" fill={palette.waveAccent} opacity="0.3">
            <animateTransform
              attributeName="transform"
              type="rotate"
              dur="2.8s"
              values="0 7 7;360 7 7"
              repeatCount="indefinite"
            />
          </ellipse>
          <ellipse cx="9.7" cy="5.4" rx="2.25" ry="1.05" fill={palette.waveAccent2} opacity="0.28">
            <animateTransform
              attributeName="transform"
              type="rotate"
              dur="3.6s"
              values="360 7 7;0 7 7"
              repeatCount="indefinite"
            />
          </ellipse>
          <circle cx="4.6" cy="4.3" r="0.58" fill={palette.bubble1} opacity="0.84">
            <animate attributeName="cy" dur="1.9s" values="5.2;3.7;5.2" repeatCount="indefinite" />
            <animate
              attributeName="opacity"
              dur="1.9s"
              values="0.28;0.94;0.28"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="9.4" cy="8.6" r="0.42" fill={palette.bubble2} opacity="0.72">
            <animate attributeName="cy" dur="2.2s" values="9.4;6.4;9.4" repeatCount="indefinite" />
            <animate attributeName="cx" dur="2.2s" values="9.1;9.7;9.1" repeatCount="indefinite" />
          </circle>
        </g>
        <circle
          cx="7"
          cy="7"
          r="5.45"
          fill="none"
          stroke="rgba(255,255,255,0.46)"
          strokeWidth="0.45"
        />
        <circle cx="4.85" cy="4.05" r="2.45" fill={`url(#${shineId})`} opacity="0.88">
          <animate
            attributeName="opacity"
            dur="2s"
            values="0.58;0.96;0.58"
            repeatCount="indefinite"
          />
        </circle>
        <path
          d="M3.35 8.45c1.15 1.85 4.65 2.55 7.4-.3-.45 2.05-2.05 3.45-4.05 3.45-1.55 0-2.75-.78-3.35-3.15Z"
          fill="rgba(255,255,255,0.22)"
        />
      </g>
    </svg>
  )
}
