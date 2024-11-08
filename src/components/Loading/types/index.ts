import { CSSProperties } from 'react'

export type { FC } from 'react'

export type LoadingPops = Omit<StyledLoadingProps, 'imgColorRevert'>

export type StyledLoadingProps = {
    height?: CSSProperties['height']
    width?: CSSProperties['width']
    imgColorRevert: boolean
}