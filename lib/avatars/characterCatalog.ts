import characterPresets from './characterPresets.json'

export type CharacterPresetCategory = 'soft' | 'character' | 'simple'

export type CharacterPreset = {
  id: string
  name: string
  blurb: string
  category: CharacterPresetCategory
  body: {
    primary: Record<string, unknown>
    nodes: unknown[]
  }
  eyes: Record<string, number>
  defaultColors: { body: string; eyes: string }
}

export const CHARACTER_PRESETS = characterPresets.presets as CharacterPreset[]

export const CHARACTER_CATEGORIES: {
  id: CharacterPresetCategory | 'all'
  label: string
}[] = [
  { id: 'all', label: 'All' },
  { id: 'soft', label: 'Soft / Disney-ish' },
  { id: 'character', label: 'Characters' },
  { id: 'simple', label: 'Simple shapes' },
]

/** Default silhouette per Trooper cast handle (matches shipping cast). */
export const DEFAULT_TEAM_PRESETS: Record<string, string> = {
  rex: 'cubee',
  nova: 'mickey',
  scout: 'cloudee',
  pip: 'cylinder',
  wren: 'kirby',
}

export function getCharacterPreset(id: string): CharacterPreset | undefined {
  return CHARACTER_PRESETS.find((p) => p.id === id)
}

export function presetsByCategory(category: CharacterPresetCategory | 'all') {
  if (category === 'all') return CHARACTER_PRESETS
  return CHARACTER_PRESETS.filter((p) => p.category === category)
}
