import { createContext, useContext, useMemo, useState } from "react";
import { GlobalData, GlobalProviderProps, ProviderValuesType, FC } from "./types";
import { HelmetContentType, useHelmet } from "../useHelmet";
import { usePermissionHook } from "./hooks/usePermissionHook";

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
    const token = useMemo(() => 'hahaha', [])
    
    const {
        permissionData,
        reloadPermission,
    } = usePermissionHook(token, initGlobalData.baseUrl)

    const { BlogHelmet } = useHelmet(helmetContent)

    const reloadGlobal = () => {
        reloadPermission()
    }

    const providerValues = useMemo<ProviderValuesType>(() => ({
        GlobalConfig: initGlobalData,
        setHelmet: setHelmetContent,
        reloadGlobal,
        permissionList: permissionData || [],
    }), [setHelmetContent, permissionData, initGlobalData])

    return (
        <GlobalContext.Provider value={providerValues}>
            {BlogHelmet}
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobal = () => useContext(GlobalContext)

export type { GlobalData }