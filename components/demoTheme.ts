/** Trooper app chrome — aligned with src/index.css + brand.js */
export const TROOPER_DEMO = {
  brand: '#007A5A',
  brandHover: '#006048',
  brandLight: '#E8F3EE',
  brandSoft: '#D4E8DF',
  bg: '#FAF9F6',
  card: '#FFFFFF',
  cardWarm: '#FDFCFB',
  border: '#E7E5E4',
  borderWarm: '#EDEBE9',
  text: '#1C1917',
  textMuted: '#57534E',
  textSubtle: '#78716C',
  /** Helmet olive — pixel hero wash */
  olive: '#7BA044',
  radius: 12,
  radiusSm: 8,
} as const;

export const KANBAN_COLUMNS = {
  inbox: { id: 'inbox', label: 'TODO', emoji: '🎯', headerBg: '#F5F5F4', headerText: '#1C1917' },
  in_progress: { id: 'in_progress', label: 'IN PROGRESS', emoji: '⏳', headerBg: '#EFEEEC', headerText: '#1C1917' },
  review: { id: 'review', label: 'HUMAN REVIEW', emoji: '📝', headerBg: '#FFFBEB', headerText: '#78350F' },
  done: { id: 'done', label: 'COMPLETED', emoji: '🎉', headerBg: '#ECFDF5', headerText: '#065F46' },
} as const;

export type DemoColumnId = keyof typeof KANBAN_COLUMNS;
