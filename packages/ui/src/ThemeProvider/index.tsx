import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider as __ThemeProvider, useTheme as __useTheme } from "styled-components";
import { ThemeProviderProps, ThemeProviderValue, ReactNode, DefaultThemesType } from "./types";

export type { DefaultThemesType }

const ThemeContext = createContext<ThemeProviderValue>({
    themeMode: '',
    setThemeMode: () => { },
    useCurrentTheme: () => ({})
})

export const ThemeProvider = <T extends DefaultThemesType,>({ themes, children, initThemeMode, listenerDisabled }: ThemeProviderProps<T>): ReactNode => {
    const [themeMode, setThemeMode] = useState<ThemeProviderValue['themeMode']>(initThemeMode || 'light')

    useEffect(() => {
        if (!listenerDisabled) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            setThemeMode(mediaQuery.matches ? 'dark' : 'light');
            const handleThemeChange = (e: any) => setThemeMode(e.matches ? 'dark' : 'light');
            mediaQuery.addEventListener('change', handleThemeChange);
            return () => mediaQuery.removeEventListener('change', handleThemeChange);
        }
    }, [])

    const theme = useMemo(() => themes[themeMode], [themeMode])

    return (
        <__ThemeProvider theme={theme}>
            <ThemeContext.Provider value={
                {
                    themeMode,
                    setThemeMode,
                    useCurrentTheme: __useTheme,
                }
            }>
                {children}
            </ThemeContext.Provider>
        </__ThemeProvider>
    )
}

export const useTheme = () => useContext(ThemeContext)