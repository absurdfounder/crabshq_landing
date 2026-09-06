import rexBase from './rex.avatar.json'
import type { CharacterPreset } from './characterCatalog'

type AvatarColors = { body: string; eyes: string }

type AvatarDefinition = {
  schema: string
  schemaVersion: number
  name: string
  body: CharacterPreset['body']
  colors: AvatarColors
  expressions: Record<string, unknown>
  expressionOrder: string[]
  animations: Record<string, unknown>
  animationOrder: string[]
}

type StudioNode = {
  surface?: Record<string, unknown>
  position?: number[]
  rotation?: number[]
  id?: string
  name?: string
}

/** Schema only allows surface / position / rotation on nodes (strip studio id/name). */
export function sanitizePresetBody(body: CharacterPreset['body']): CharacterPreset['body'] {
  return {
    primary: { ...body.primary },
    nodes: (body.nodes ?? []).map((raw) => {
      const node = raw as StudioNode
      return {
        surface: { ...(node.surface ?? {}) },
        position: [...(node.position ?? [0, 0, 0])],
        rotation: [...(node.rotation ?? [0, 0, 0])],
      }
    }),
  }
}

/**
 * Compose a full runtime definition from a ready-made body + theme colors.
 * Expressions and animations are shared — every preset gets the full catalog.
 */
export function assembleAvatarDefinition(opts: {
  name: string
  preset: CharacterPreset
  colors: AvatarColors
}): AvatarDefinition {
  const base = rexBase as unknown as AvatarDefinition
  // Share expression/animation catalogs by reference — every preset gets the full set.
  return {
    schema: base.schema,
    schemaVersion: base.schemaVersion,
    name: opts.name,
    body: sanitizePresetBody(opts.preset.body),
    colors: { ...opts.colors },
    expressions: base.expressions,
    expressionOrder: base.expressionOrder,
    animations: base.animations,
    animationOrder: base.animationOrder,
  }
}

/** Full animation catalog is exposed via `definition.animationOrder` in the builder. */
