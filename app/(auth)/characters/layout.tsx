import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Character Builder | Trooper',
  description:
    'Pick ready-made characters and a theme style for your virtual team. Pastel, neon, and more — all expressions included.',
}

export default function CharactersLayout({ children }: { children: React.ReactNode }) {
  return children
}
