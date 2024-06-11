import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import english from "./languajes/english.json";
import spanish from "./languajes/spanish.json";
import chinese from "./languajes/chinese.json";
import french from "./languajes/french.json";
import japanese from "./languajes/japanese.json";
import portuguese from "./languajes/portuguese.json";
import german from "./languajes/german.json";
import italian from "./languajes/italian.json";

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
      Chinese: {
        translation: chinese,
      },
      French: {
        translation: french,
      },
      Japanese: {
        translation: japanese,
      },
      Portuguese: {
        translation: portuguese,
      },
      German: {
        translation: german,
      },
      Italian: {
        translation: italian,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
