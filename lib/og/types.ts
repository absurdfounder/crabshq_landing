export type OgKind =
  | 'home'
  | 'team'
  | 'feature'
  | 'plugin'
  | 'use-case'
  | 'alternative'
  | 'channel';

export type OgHeroContent = {
  kind: OgKind;
  eyebrowIndex: string;
  eyebrowLabel: string;
  headlinePrimary: string;
  headlineAccent?: string;
  description: string;
  showSetup?: boolean;
  iconUrl?: string;
  watermark?: string;
};
