import { createContext, Dispatch, FC, SetStateAction, useContext, useState } from "react";
import { GlobalData, GlobalProviderProps } from "./types";

const DEFAULT_GLOBAL_DATA: GlobalData = {
    baseUrl: ''
}

const GlobalContext = createContext<[GlobalData, Dispatch<SetStateAction<GlobalData>>]>([DEFAULT_GLOBAL_DATA, () => {}]);

export const GlobalProvider: FC<GlobalProviderProps> = ({ children, initGlobalData }) => (
    <GlobalContext.Provider value={useState<GlobalData>(initGlobalData)}>
        {children}
    </GlobalContext.Provider>
);

export const useGlobalData = () => useContext(GlobalContext)

export type { GlobalData }