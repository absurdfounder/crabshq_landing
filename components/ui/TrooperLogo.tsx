import Image from 'next/image'
import Link from 'next/link'

const characterSrc = '/images/trooper-character.png'

type TrooperLogoProps = {
  className?: string
  characterClassName?: string
  textClassName?: string
  asLink?: boolean
  priority?: boolean
}

export default function TrooperLogo({
  className = '',
  characterClassName = 'h-9 w-auto sm:h-10 [image-rendering:pixelated]',
  textClassName = 'text-xl sm:text-2xl',
  asLink = false,
  priority = false,
}: TrooperLogoProps) {
  const content = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src={characterSrc}
        alt=""
        width={1003}
        height={902}
        className={characterClassName}
        priority={priority}
        unoptimized
        aria-hidden
      />
      <span
        className={`font-brand lowercase leading-none tracking-tight text-slate-900 ${textClassName}`}
      >
        trooper
      </span>
    </span>
  )

  if (asLink) {
    return (
      <Link href="/" className="shrink-0" aria-label="Trooper">
        {content}
      </Link>
    )
  }

  return content
}
