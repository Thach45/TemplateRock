import { vi } from "./locales/vi"
import { en } from "./locales/en"

export const locales = {
  vi,
  en,
}

export type Locale = keyof typeof locales
export type TranslationKey = keyof typeof vi | keyof typeof en

export const defaultLocale: Locale = "vi"

