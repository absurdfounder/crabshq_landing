type TrooperLogoProps = {
  className?: string
  /** @deprecated Kept for call-site compat; wordmark is a single SVG. */
  characterClassName?: string
  /** @deprecated Kept for call-site compat; wordmark is a single SVG. */
  textClassName?: string
  asLink?: boolean
  priority?: boolean
  theme?: 'light' | 'dark'
}

export default function TrooperLogo({
  className = '',
  asLink = false,
  priority = false,
  theme = 'light',
}: TrooperLogoProps) {
  // ?v=7 busts the broken transformed SVG that was accidentally shipped earlier.
  const src =
    theme === 'dark'
      ? '/images/trooper-wordmark-dark.svg?v=7'
      : '/images/trooper-wordmark.svg?v=7'

  const content = (
    <img
      src={src}
      alt=""
      width={122}
      height={30}
      className={`block h-7 w-auto object-left object-contain sm:h-8 ${className}`}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'low'}
      decoding="async"
      aria-hidden
    />
  )

  if (asLink) {
    return (
      <a href="/" className="inline-flex shrink-0 items-center" aria-label="Trooper">
        {content}
      </a>
    )
  }

  return content
}
