import { createContext, useContext } from 'react';
import { translations } from '~/translations';

export const LanguageContext = createContext({});

export function LanguageProvider({ language, toggleLanguage, children }) {
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language] || translations.fr;
    for (const k of keys) {
      if (value[k] === undefined) return key;
      value = value[k];
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
