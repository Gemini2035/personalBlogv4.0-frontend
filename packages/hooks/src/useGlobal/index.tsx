import { createContext, useContext, useMemo, useState } from "react";
import { GlobalData, GlobalProviderProps, ProviderValuesType, FC } from "./types";
import { HelmetContentType, useHelmet } from "../useHelmet";

const DEFAULT_GLOBAL_DATA: GlobalData = {
    baseUrl: ''
}

const GlobalContext = createContext<ProviderValuesType>({
    GlobalConfig: DEFAULT_GLOBAL_DATA,
    setHelmet: () => {}
});

export const GlobalProvider: FC<GlobalProviderProps> = ({ children, initGlobalData }) => {
    const [helmetContent, setHelmetContent] = useState<HelmetContentType>([])

    const providerValues = useMemo<ProviderValuesType>(() => ({
        GlobalConfig: initGlobalData,
        setHelmet: setHelmetContent
    }), [setHelmetContent])

    const { BlogHelmet } = useHelmet(helmetContent)

    return (
        <GlobalContext.Provider value={providerValues}>
            {BlogHelmet}
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalData = () => useContext(GlobalContext)

export type { GlobalData }