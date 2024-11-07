import { ReactNode } from "react"
import { CSSProperties } from "styled-components"

export type { FC } from 'react'

export type FlexProps = StyledFlexProps & {
    children: ReactNode
    className?: string
}

export type StyledFlexProps = {
    verticle?: boolean
    align?: CSSProperties['alignItems']
    justify?: CSSProperties['justifyContent']
    gap?: 'small' | 'middle' | 'large' | number
}