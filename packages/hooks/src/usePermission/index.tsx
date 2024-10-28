import { useGlobal } from "../useGlobal"
import { PermissionType } from "./types"

export const usePermission = (permissionRequire: PermissionType[]) => {
    const { permissionList } = useGlobal()

    const permissionsDeny = permissionRequire.filter(permission => permissionList.includes(permission))
    return {
        status: !permissionsDeny.length,
        permissionsDeny
    }
}

export type { PermissionType }