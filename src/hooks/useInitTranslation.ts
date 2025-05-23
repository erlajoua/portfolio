import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { useEffect, useState } from "react";

const DEFAULT_LANG: string = "en";
const STORAGE_LANG_KEY: string = "lang";

type TranslationObject = Record<string, any>;

export const fetchTranslations = async (lang: string): Promise<TranslationObject> => {
	const response = await fetch(`${"/translations/"}/${lang}.json`);
	return await response.json();
};

export const setI18n = async (lang: string): Promise<void> => {
	localStorage.setItem(STORAGE_LANG_KEY, lang);

	const translations = await fetchTranslations(lang);

	await i18n.use(initReactI18next).init({
		lng: lang,
		resources: {
			[lang]: { translation: translations },
		},
	});
};

export const handleChangeLanguage = async (language: string): Promise<void> => {
	const translations = await fetchTranslations(language);
	localStorage.setItem("lang", language);
	await i18n.use(initReactI18next).init({
		lng: language,
		resources: {
			[language]: { translation: translations },
		},
	});
};

export const useInitTranslation = (): boolean => {
	const [initTranslation, setInitTranslation] = useState<boolean>(false);

	const lang: string =
		typeof window !== "undefined"
			? localStorage.getItem(STORAGE_LANG_KEY) || DEFAULT_LANG
			: DEFAULT_LANG;

	useEffect(() => {
		(async (): Promise<void> => {
			try {
				await setI18n(lang);
			} catch (err) {
				console.warn("could not fetch translations", err);
			}
			setInitTranslation(true);
		})();
	}, [lang]);

	return initTranslation;
};