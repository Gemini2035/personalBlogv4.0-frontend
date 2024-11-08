import { CSSProperties, ImgHTMLAttributes } from "react"

export type { FC } from 'react'

export type StyledImageProps = {
    width?: CSSProperties['width'];
    height?: CSSProperties['height'];
    block?: boolean;
}

export type ImageProps = StyledImageProps & ImgHTMLAttributes<HTMLImageElement> & {
    src: string;
    alt: string;
    title: string
}