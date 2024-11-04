import { createContext, useCallback, useContext, useEffect } from "react"
import { PermissionProviderProps, PermissionProviderValue, FC, PermissionType } from "./types"
import { useHttp } from "../useHttp"

export type { PermissionType }

const PermissionContext = createContext<PermissionProviderValue>({
    hasPermission: () => ({ status: false, permissionsDeny: [] }),
    permissionList: [],
    reloadPermission: () => { }
})

export const PermissionProvider: FC<PermissionProviderProps> = ({ token, children }) => {
    const {
        fetchData: fetchPermission,
        data: permissionData,
        // code: permissionResponseCode
    } = useHttp<PermissionType[]>({
        url: '/permission',
        data: { token }
    })

    useEffect(() => {
        fetchPermission()
    }, [token])

    const hasPermission = useCallback<PermissionProviderValue['hasPermission']>((permissionRequire = []) => {
        const permissionsDeny = permissionRequire.filter(permission => permissionData?.includes(permission)) || []
        return {
            status: !permissionsDeny,
            permissionsDeny
        }
    }, [permissionData])

    return (
        <PermissionContext.Provider value={{
            permissionList: permissionData || [],
            hasPermission,
            reloadPermission: fetchPermission
        }}>
            {children}
        </PermissionContext.Provider>
    )
}

export const usePermission = () => useContext(PermissionContext)