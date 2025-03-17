import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "./locales/en/translation.json";
import thTranslations from "./locales/th/translation.json";

const savedLanguage = localStorage.getItem("i18nextLng") || "en"

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      th: { translation: thTranslations },
    },
    lng: savedLanguage,
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;