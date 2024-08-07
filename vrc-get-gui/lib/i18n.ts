import { tc as tcOriginal } from "@/components/VGTrans";
import globalInfo from "@/lib/global-info";
import deJson from "@/locales/de.json5";
import enJson from "@/locales/en.json5";
import frJson from "@/locales/fr.json5";
import jaJson from "@/locales/ja.json5";
import zh_hansJson from "@/locales/zh_hans.json5";
import i18next, { t as i18nextt, type Resource } from "i18next";
import { initReactI18next } from "react-i18next";

const languageResources = {
	en: enJson,
	de: deJson,
	ja: jaJson,
	fr: frJson,
	zh_hans: zh_hansJson,
};

i18next.use(initReactI18next).init({
	resources: languageResources as Resource,
	lng: "en",
	fallbackLng: "en",
	nsSeparator: "::",

	interpolation: {
		// react is xzz safe (in general)
		escapeValue: false,
	},
	react: {
		transKeepBasicHtmlNodesFor: ["br", "strong", "b", "i", "code"],
	},
});

i18next.changeLanguage(globalInfo.language);

export default i18next;
export const languages = Object.keys(languageResources);

export const tc = tcOriginal;

export const tt = i18nextt;
