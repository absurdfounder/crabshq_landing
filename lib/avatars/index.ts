/** Trooper cast — Bible Strong procedural avatar definitions. */
import rex from './rex.avatar.json'
import nova from './nova.avatar.json'
import scout from './scout.avatar.json'
import pip from './pip.avatar.json'
import wren from './wren.avatar.json'

export { CAST_COLORS, type CastHandle } from './castColors'

export const TROOPER_AVATARS = {
  rex,
  nova,
  scout,
  pip,
  wren,
} as const

export type TrooperAvatarHandle = keyof typeof TROOPER_AVATARS

export function getTrooperAvatar(handle: string) {
  if (handle in TROOPER_AVATARS) {
    return TROOPER_AVATARS[handle as TrooperAvatarHandle]
  }
  return undefined
}

/** Static SVG snapshot path for a cast member. */
export function castSnapshotSrc(handle: string) {
  if (handle in TROOPER_AVATARS) return `/images/cast/${handle}.svg`
  return null
}
