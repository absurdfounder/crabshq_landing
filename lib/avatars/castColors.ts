/** Paper-friendly cast fills — kept in sync by scripts/export-cast-svgs.mjs */
export const CAST_COLORS = {
  "rex": {
    "body": "#6bcf8e",
    "eyes": "#3f3f46"
  },
  "nova": {
    "body": "#7ebef0",
    "eyes": "#3f3f46"
  },
  "scout": {
    "body": "#f0b45c",
    "eyes": "#3f3f46"
  },
  "pip": {
    "body": "#b49aef",
    "eyes": "#3f3f46"
  },
  "wren": {
    "body": "#f0a0bc",
    "eyes": "#3f3f46"
  }
} as const
export const CAST_POSE = {
  "rex": "small-attentive",
  "nova": "curious-left",
  "scout": "playful-right",
  "pip": "downward-gaze",
  "wren": "upward-side-glance"
} as const
/** Silhouette fingerprint — changes when body shapes change (not just colors). */
export const CAST_SHAPE_META = {
  "rex": "Cubee:cube:0",
  "nova": "mickey:mickey:0",
  "scout": "Cloudee:sphere:4",
  "pip": "cylinder:cylinder:0",
  "wren": "Kirby:sphere:2"
} as const
export const CAST_ASSET_REV = "mickey-cloud-v2" as const
export type CastHandle = keyof typeof CAST_COLORS
