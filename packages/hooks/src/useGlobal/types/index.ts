import { Dispatch, ReactNode, SetStateAction } from "react"
import { HelmetContentType } from "../../useHelmet"
import { PermissionType } from "../../usePermission"
export type { FC } from "react"

export type GlobalData = {
    baseUrl: string,
}

export type ProviderValuesType = {
    GlobalConfig: GlobalData,
    setHelmet: Dispatch<SetStateAction<HelmetContentType>>,
    permissionList: PermissionType[]
    reloadGlobal: () => void
}

export type GlobalProviderProps = {
    children: ReactNode,
    initGlobalData: GlobalData
}