import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { GlobalData, GlobalProviderProps, ProviderValuesType, FC } from "./types";
import { HelmetContentType, useHelmet } from "../useHelmet";
import { useHttp } from "../useHttp";
import { PermissionType } from "../usePermission";

const DEFAULT_GLOBAL_DATA: GlobalData = {
    baseUrl: '',
}

const GlobalContext = createContext<ProviderValuesType>({
    GlobalConfig: DEFAULT_GLOBAL_DATA,
    setHelmet: () => { },
    reloadGlobal: () => { },
    permissionList: []
});

export const GlobalProvider: FC<GlobalProviderProps> = ({ children, initGlobalData }) => {
    const [helmetContent, setHelmetContent] = useState<HelmetContentType>([])

    // TODO: Token Storage
    const token = 'hahaha'

    const {
        fetchData: fetchPermission,
        data: permissionData,
        // code: permissionResponseCode
    } = useHttp<PermissionType[]>({
        url: initGlobalData.baseUrl + '/permission',
        data: { token }
    })

    const reloadGlobal = () => {
        fetchPermission?.()
    }

    useEffect(() => {
        fetchPermission?.()
    }, [token])

    const providerValues = useMemo<ProviderValuesType>(() => ({
        GlobalConfig: initGlobalData,
        setHelmet: setHelmetContent,
        reloadGlobal,
        permissionList: permissionData || [],
    }), [setHelmetContent, permissionData, initGlobalData])

    const { BlogHelmet } = useHelmet(helmetContent)

    return (
        <GlobalContext.Provider value={providerValues}>
            {BlogHelmet}
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobal = () => useContext(GlobalContext)

export type { GlobalData }