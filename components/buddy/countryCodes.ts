export type CountryDial = {
  code: string
  name: string
  dial: string
  flag: string
}

/** Dial codes for the Buddy iMessage signup field (flag + ISO + dial). */
export const COUNTRY_DIALS: CountryDial[] = [
  { code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸' },
  { code: 'CA', name: 'Canada', dial: '+1', flag: '🇨🇦' },
  { code: 'GB', name: 'United Kingdom', dial: '+44', flag: '🇬🇧' },
  { code: 'AU', name: 'Australia', dial: '+61', flag: '🇦🇺' },
  { code: 'IN', name: 'India', dial: '+91', flag: '🇮🇳' },
  { code: 'DE', name: 'Germany', dial: '+49', flag: '🇩🇪' },
  { code: 'FR', name: 'France', dial: '+33', flag: '🇫🇷' },
  { code: 'NL', name: 'Netherlands', dial: '+31', flag: '🇳🇱' },
  { code: 'SG', name: 'Singapore', dial: '+65', flag: '🇸🇬' },
  { code: 'JP', name: 'Japan', dial: '+81', flag: '🇯🇵' },
  { code: 'KR', name: 'South Korea', dial: '+82', flag: '🇰🇷' },
  { code: 'BR', name: 'Brazil', dial: '+55', flag: '🇧🇷' },
  { code: 'MX', name: 'Mexico', dial: '+52', flag: '🇲🇽' },
  { code: 'ES', name: 'Spain', dial: '+34', flag: '🇪🇸' },
  { code: 'IT', name: 'Italy', dial: '+39', flag: '🇮🇹' },
  { code: 'SE', name: 'Sweden', dial: '+46', flag: '🇸🇪' },
  { code: 'CH', name: 'Switzerland', dial: '+41', flag: '🇨🇭' },
  { code: 'AE', name: 'United Arab Emirates', dial: '+971', flag: '🇦🇪' },
  { code: 'NZ', name: 'New Zealand', dial: '+64', flag: '🇳🇿' },
  { code: 'IE', name: 'Ireland', dial: '+353', flag: '🇮🇪' },
  { code: 'PH', name: 'Philippines', dial: '+63', flag: '🇵🇭' },
  { code: 'ID', name: 'Indonesia', dial: '+62', flag: '🇮🇩' },
  { code: 'MY', name: 'Malaysia', dial: '+60', flag: '🇲🇾' },
  { code: 'TH', name: 'Thailand', dial: '+66', flag: '🇹🇭' },
  { code: 'ZA', name: 'South Africa', dial: '+27', flag: '🇿🇦' },
  { code: 'NG', name: 'Nigeria', dial: '+234', flag: '🇳🇬' },
  { code: 'IL', name: 'Israel', dial: '+972', flag: '🇮🇱' },
  { code: 'PL', name: 'Poland', dial: '+48', flag: '🇵🇱' },
  { code: 'PT', name: 'Portugal', dial: '+351', flag: '🇵🇹' },
  { code: 'HK', name: 'Hong Kong', dial: '+852', flag: '🇭🇰' },
]
