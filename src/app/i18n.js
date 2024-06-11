import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import english from "./languajes/english.json";
import spanish from "./languajes/spanish.json";

const getDefaultLanguage = () => {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem("language") || "English";
  }
  return "English";
};

const defaultLanguage = getDefaultLanguage();

i18n
  .use(initReactI18next)
  .init({
    lng: defaultLanguage,
    fallbackLng: defaultLanguage,
    debug: true,
    resources: {
      English: {
        translation: english,
      },
      Español: {
        translation: spanish,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
