import { ReactNode } from "react"

export type GlobalData = {
    baseUrl: string
}

export type GlobalProviderProps = {
    children: ReactNode,
    initGlobalData: GlobalData
}