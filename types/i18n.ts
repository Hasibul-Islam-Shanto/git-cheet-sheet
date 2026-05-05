export type Locale = 'en' | 'bn'

export interface LocaleOption {
  code: Locale
  label: string
  flag: string
  shortLabel: string
}

export const LOCALES: LocaleOption[] = [
  { code: 'en', label: 'English', flag: '🇬🇧', shortLabel: 'EN' },
  { code: 'bn', label: 'বাংলা',   flag: '🇧🇩', shortLabel: 'BN' },
]
