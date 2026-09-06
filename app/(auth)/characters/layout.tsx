import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Character Builder | Trooper',
  description:
    'Build procedural agent characters with eyes, expressions, and idle motion — then run them as your troopers.',
}

export default function CharactersLayout({ children }: { children: React.ReactNode }) {
  return children
}
