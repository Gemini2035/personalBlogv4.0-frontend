import { I18nextProvider, initReactI18next, useTranslation } from "react-i18next"
import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from "i18next"
import { TranslateProviderProps, FC } from "./types";

export const TranslateProvider: FC<TranslateProviderProps> = ({ children, resources, lng = 'zh' }) => {
    i18n
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
            resources,
            lng: lng,
            fallbackLng: lng,
            interpolation: {
                escapeValue: false,
            },
        });

    return (
        <I18nextProvider i18n={i18n}>
            {children}
        </I18nextProvider>
    )
}

export { useTranslation }
export type { ResourcesType } from './types'