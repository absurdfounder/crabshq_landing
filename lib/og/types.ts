export type OgKind =
  | 'home'
  | 'team'
  | 'feature'
  | 'plugin'
  | 'use-case'
  | 'alternative'
  | 'channel'
  | 'industry'
  | 'hub'
  | 'page'
  | 'loop'
  | 'skill'
  | 'compare'
  | 'showcase'
  | 'legacy-integration';

export type OgBadgeIcon = {
  label: string;
  iconUrl: string;
};

export type OgHeroContent = {
  kind: OgKind;
  eyebrowIndex: string;
  eyebrowLabel: string;
  /** Optional lead line above the main headline (e.g. home hero). */
  headlineLead?: string;
  headlinePrimary: string;
  headlineAccent?: string;
  /** When true (default), primary + accent render on one line. */
  singleLineHeadline?: boolean;
  description: string;
  showSetup?: boolean;
  iconUrl?: string;
  badgeIcons?: OgBadgeIcon[];
  pageUrl?: string;
  watermark?: string;
};
