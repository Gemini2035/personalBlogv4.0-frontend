import { useEffect } from "react"
import { useHttp } from "../../useHttp"
import { PermissionType } from "../../usePermission"

export const usePermissionHook = (token: string, baseUrl: string) => {
    const {
        fetchData: fetchPermission,
        data: permissionData,
        // code: permissionResponseCode
    } = useHttp<PermissionType[]>({
        url: baseUrl + '/permission',
        data: { token }
    })

    useEffect(() => {
        fetchPermission()
    }, [token])

    return {
        permissionData,
        reloadPermission: fetchPermission
    }
}