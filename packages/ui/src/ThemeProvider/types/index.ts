import { Dispatch, ReactNode, SetStateAction } from "react"
import { DefaultTheme } from "styled-components"

export type { ReactNode }

export type DefaultThemesType ={light: DefaultTheme} & Record<string, DefaultTheme>

export type ThemeProviderProps<T extends DefaultThemesType = {light: {}, [key: string]: DefaultTheme}> = {
    themes: T
    initThemeMode?: keyof DefaultThemesType
    children: ReactNode
    listenerDisabled?: boolean
}

export type ThemeProviderValue = {
    themeMode: keyof ThemeProviderProps['themes']
    useCurrentTheme: () => DefaultTheme
    setThemeMode: Dispatch<SetStateAction<keyof ThemeProviderProps['themes']>>
}

