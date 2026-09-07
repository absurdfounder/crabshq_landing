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
  const src =
    theme === 'dark'
      ? '/images/trooper-wordmark-dark.svg'
      : '/images/trooper-wordmark.svg'

  const content = (
    <img
      src={src}
      alt=""
      width={122}
      height={30}
      className={`h-7 w-auto sm:h-8 ${className}`}
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
