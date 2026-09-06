'use client'

import CharacterBuilder from '@/components/character-builder/CharacterBuilder'
import Header from '@/components/ui/header'
import SectionShell from '@/components/ui/SectionShell'

export default function CharactersPage() {
  return (
    <div className="bg-canvas">
      <Header />
      <SectionShell rhythm clearSiteHeader noBorder>
        <CharacterBuilder />
      </SectionShell>
    </div>
  )
}
