import React, { createContext, useContext, useEffect, useState } from 'react';
import { T, type Lang, type TranslationKey } from '../i18n/translations';

interface LanguageContextValue {
  lang: Lang;
  toggleLang: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'it',
  toggleLang: () => {},
  t: (key) => (T.it as Record<string, string>)[key] ?? key,
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    const stored = localStorage.getItem('lang');
    if (stored === 'it' || stored === 'en') return stored;
    return 'it';
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
  }, [lang]);

  const t = (key: string): string => {
    return (T[lang] as Record<string, string>)[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang: () => setLang(l => l === 'it' ? 'en' : 'it'), t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
