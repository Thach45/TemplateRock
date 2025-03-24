"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { type Locale, defaultLocale, locales } from "@/lib/i18n"

type LanguageContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)

  useEffect(() => {
    // Get locale from localStorage or use default
    const savedLocale = localStorage.getItem("locale") as Locale
    if (savedLocale && Object.keys(locales).includes(savedLocale)) {
      setLocaleState(savedLocale)
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    localStorage.setItem("locale", newLocale)
    setLocaleState(newLocale)
  }

  // Translation function
  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = locales[locale]

    for (const k of keys) {
      if (value === undefined) return key
      value = value[k]
    }

    return value || key
  }

  return <LanguageContext.Provider value={{ locale, setLocale, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

