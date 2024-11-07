import { DefaultTheme, CSSProperties } from 'styled-components';
export { default as styled } from 'styled-components';
import { ReactNode, Dispatch, SetStateAction, FC } from 'react';

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

type TextProps = StyledTextProps & {
    nodeType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
    children: ReactNode;
};
type StyledTextProps = {
    type?: 'primary' | 'danger' | 'warning' | 'disabled' | 'default';
};

declare const Text: FC<TextProps>;

type FlexProps = StyledFlexProps & {
    children: ReactNode;
    className?: string;
};
type StyledFlexProps = {
    verticle?: boolean;
    align?: CSSProperties['alignItems'];
    justify?: CSSProperties['justifyContent'];
    gap?: 'small' | 'middle' | 'large' | number;
};

declare const Flex: FC<FlexProps>;

export { type DefaultThemesType, Flex, Text, ThemeProvider, useTheme };
