import { ReactNode, FC, Dispatch, SetStateAction } from 'react';
import { AxiosRequestConfig } from 'axios';

type GlobalData = {
    baseUrl: string;
};
type GlobalProviderProps = {
    children: ReactNode;
    initGlobalData: GlobalData;
};

declare const GlobalProvider: FC<GlobalProviderProps>;
declare const useGlobalData: () => [GlobalData, Dispatch<SetStateAction<GlobalData>>];

interface UseHttpProps {
    url: string;
    method?: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    headers?: AxiosRequestConfig['headers'];
}
interface UseHttpState<T> {
    loading: boolean;
    error: string | null;
    data: T | null;
    code: number | null;
    fetchData?: () => void;
}
declare const useHttp: <T>({ url, method, data, headers, }: UseHttpProps) => UseHttpState<T>;

export { type GlobalData, GlobalProvider, type UseHttpProps, type UseHttpState, useGlobalData, useHttp };
