const characterSrc = '/images/trooper-logomark.png'

type TrooperLogoProps = {
  className?: string
  characterClassName?: string
  textClassName?: string
  asLink?: boolean
  priority?: boolean
  theme?: 'light' | 'dark'
}

export default function TrooperLogo({
  className = '',
  characterClassName = 'h-11 w-11 sm:h-12 sm:w-12 object-contain',
  textClassName = 'text-xl sm:text-2xl',
  asLink = false,
  priority = false,
  theme = 'light',
}: TrooperLogoProps) {
  const textColor = theme === 'dark' ? 'text-white' : 'text-slate-900'
  const content = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src={characterSrc}
        alt=""
        width={1024}
        height={1024}
        className={`bg-transparent pixel-render ${characterClassName}`}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        aria-hidden
      />
      <span
        className={`font-brand lowercase leading-none tracking-tight ${textColor} ${textClassName}`}
      >
        trooper
      </span>
    </span>
  )

  if (asLink) {
    return (
      <a href="/" className="shrink-0" aria-label="Trooper">
        {content}
      </a>
    )
  }

  return content
}
