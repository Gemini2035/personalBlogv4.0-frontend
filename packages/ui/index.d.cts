import { DefaultTheme } from 'styled-components';
export { default as styled } from 'styled-components';
import { ReactNode, Dispatch, SetStateAction } from 'react';

type DefaultThemesType = {
    light: DefaultTheme;
} & Record<string, DefaultTheme>;
type ThemeProviderProps<T extends DefaultThemesType = {
    light: {};
    [key: string]: DefaultTheme;
}> = {
    themes: T;
    initThemeMode?: keyof DefaultThemesType;
    children: ReactNode;
    listenerDisabled?: boolean;
};
type ThemeProviderValue = {
    themeMode: keyof ThemeProviderProps['themes'];
    useCurrentTheme: () => DefaultTheme;
    setThemeMode: Dispatch<SetStateAction<keyof ThemeProviderProps['themes']>>;
};

declare const ThemeProvider: <T extends DefaultThemesType>({ themes, children, initThemeMode, listenerDisabled }: ThemeProviderProps<T>) => ReactNode;
declare const useTheme: () => ThemeProviderValue;

export { type DefaultThemesType, ThemeProvider, useTheme };
