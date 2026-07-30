/** Trooper app chrome — values mirror the app's `src/index.css` custom properties. */
export const TROOPER_DEMO = {
  brand: '#3f6b00',
  brandHover: '#325600',
  /** `--color-primary-light` — neutral surface, despite the legacy name. */
  brandLight: '#F5F5F4',
  brandSoft: '#E7E5E4',
  /** Actual brand tint (trooper-50) — `bg-emerald-50` under the landing palette remap. */
  brandTint: '#f0f5e6',
  bg: '#FAF9F6',
  card: '#FFFFFF',
  cardWarm: '#FDFCFB',
  border: '#E7E5E4',
  borderWarm: '#EDEBE9',
  text: '#1C1917',
  textMuted: '#57534E',
  textSubtle: '#78716C',
  /** Helmet olive — pixel hero wash */
  olive: '#6d9220',
  radius: 12,
  radiusLg: 16,
  radiusSm: 8,
} as const;

/**
 * Mirrors the `columns` array in KanbanBoard.jsx. The app expresses these as
 * Tailwind classes (`bg-stone-100`, `bg-amber-50`, `bg-emerald-50`); the hex
 * values below are those classes resolved through the landing palette, where
 * `emerald` is remapped to Trooper green in tailwind.config.js.
 */
export const KANBAN_COLUMNS = {
  inbox: {
    id: 'inbox',
    label: 'TODO',
    emoji: '🎯',
    headerBg: '#F5F5F4',
    headerText: '#292524',
    bodyBg: 'rgba(245,245,244,0.65)',
  },
  in_progress: {
    id: 'in_progress',
    label: 'IN PROGRESS',
    emoji: '⏳',
    headerBg: 'rgba(231,229,228,0.55)',
    headerText: '#292524',
    bodyBg: 'rgba(245,245,244,0.65)',
  },
  review: {
    id: 'review',
    label: 'HUMAN REVIEW',
    emoji: '📝',
    headerBg: '#FFFBEB',
    headerText: '#78350F',
    bodyBg: 'rgba(245,245,244,0.65)',
  },
  done: {
    id: 'done',
    label: 'COMPLETED',
    emoji: '🎉',
    headerBg: '#f0f5e6',
    headerText: '#325600',
    bodyBg: 'rgba(245,245,244,0.65)',
  },
} as const;

export type DemoColumnId = keyof typeof KANBAN_COLUMNS;
