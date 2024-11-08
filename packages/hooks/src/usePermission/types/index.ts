import { ReactNode } from "react"

export type { FC } from "react"

export type PermissionType = string

export type PermissionProviderValue = {
    reloadPermission: () => void
    permissionList: PermissionType[]
    hasPermission: (tar?: PermissionType[]) => {
        status: boolean,
        permissionsDeny: PermissionType[]
    }
}

export type PermissionProviderProps = {
    token: string
    children: ReactNode
    fallback?: ReactNode
}