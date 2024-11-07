import { ReactNode } from 'react'

export type TextProps = StyledTextProps & {
    nodeType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span',
    children: ReactNode ,
    className?: string
}

export type StyledTextProps = {
    type?: 'primary' | 'danger' | 'warning' | 'disabled' | 'default',
}

export type { WebTarget } from 'styled-components'