import { Dispatch, ReactNode, SetStateAction } from "react"
import { HelmetContentType } from "../../useHelmet"
export type { FC } from "react"

export type GlobalData = {
    baseUrl: string
}

export type ProviderValuesType = {
    GlobalConfig: GlobalData,
    setHelmet: Dispatch<SetStateAction<HelmetContentType>>
}

export type GlobalProviderProps = {
    children: ReactNode,
    initGlobalData: GlobalData
}