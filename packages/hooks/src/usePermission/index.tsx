import { useCallback } from "react"
import { useGlobal } from "../useGlobal"
import { PermissionType } from "./types"

export const usePermission = () => {
    const { permissionList } = useGlobal()

    const checkPermission = useCallback((permissionRequire: PermissionType[]) => {
        const permissionsDeny = permissionRequire.filter(permission => permissionList.includes(permission))
        return {
            status: !permissionsDeny.length,
            permissionsDeny
        }
    }, [permissionList])


    return {
        checkPermission
    }

}

export type { PermissionType }