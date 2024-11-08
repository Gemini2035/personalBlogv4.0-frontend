import { DefaultTheme, CSSProperties } from 'styled-components';
export { default as styled } from 'styled-components';
import { ReactNode, Dispatch, SetStateAction, FC, ImgHTMLAttributes, CSSProperties as CSSProperties$1 } from 'react';

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
    className?: string;
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

type StyledImageProps = {
    width?: CSSProperties$1['width'];
    height?: CSSProperties$1['height'];
    block?: boolean;
};
type ImageProps = StyledImageProps & ImgHTMLAttributes<HTMLImageElement> & {
    src: string;
    alt: string;
    title: string;
};

declare const Img: FC<ImageProps>;

export { type DefaultThemesType, Flex, Img, Text, ThemeProvider, useTheme };
