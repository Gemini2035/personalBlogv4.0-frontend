import { createContext, useContext, useMemo, useState } from "react";
import { GlobalData, GlobalProviderProps, ProviderValuesType, FC } from "./types";
import { HelmetContentType, useHelmet } from "../useHelmet";

const DEFAULT_GLOBAL_DATA: GlobalData = {
    baseUrl: '',
}

const GlobalContext = createContext<ProviderValuesType>({
    GlobalConfig: DEFAULT_GLOBAL_DATA,
    setHelmet: () => { }
});

export const GlobalProvider: FC<GlobalProviderProps> = ({ children, initGlobalData }) => {
    const [helmetContent, setHelmetContent] = useState<HelmetContentType>([])
    

    const { BlogHelmet } = useHelmet(helmetContent)

    const providerValues = useMemo<ProviderValuesType>(() => ({
        GlobalConfig: initGlobalData,
        setHelmet: setHelmetContent,
    }), [setHelmetContent, initGlobalData])

    return (
        <GlobalContext.Provider value={providerValues}>
            {BlogHelmet}
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobal = () => useContext(GlobalContext)

export type { GlobalData }