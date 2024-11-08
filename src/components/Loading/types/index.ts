import { CSSProperties } from 'react'

export type { FC } from 'react'

export type LoadingPops = Omit<StyledLoadingProps, 'filter'>

export type StyledLoadingProps = {
    height?: CSSProperties['height']
    width?: CSSProperties['width']
    filter: CSSProperties['filter']
}