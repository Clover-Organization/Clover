import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "@/locales/en/global.json";
import ptTranslation from "@/locales/pt/global.json";

const resources = {
	en: {
		translation: enTranslation,
	},
	pt: {
		translation: ptTranslation,
	},
};

i18n.use(initReactI18next) 
	.init({
		resources,
		lng: "en", 
        fallbackLng: "en",
		interpolation: {
			escapeValue: false, 
		},
	});

export default i18n;
