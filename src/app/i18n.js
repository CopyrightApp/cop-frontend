import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import english from "./languajes/english.json";
import spanish from "./languajes/spanish.json";

i18n
  .use(initReactI18next)
  .init({
    lng: "English",
    fallbackLng: "English",
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
