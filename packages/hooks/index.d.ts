import { Dispatch, SetStateAction, ReactNode, FC } from 'react';
import { AxiosRequestConfig } from 'axios';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { RouteProps, Path } from 'react-router-dom';

type AcceptableHelmetTag = 'meta' | 'title' | 'link';
type HelmetTagProps = Record<string, string>;
type HelmetContentType = {
    type: AcceptableHelmetTag;
    props: HelmetTagProps;
}[];

declare const useHelmet: (helmetContent: HelmetContentType) => {
    BlogHelmet: false | react_jsx_runtime.JSX.Element;
};

type PermissionType = string;

declare const usePermission: () => {
    checkPermission: (permissionRequire: PermissionType[]) => {
        status: boolean;
        permissionsDeny: string[];
    };
};

type GlobalData = {
    baseUrl: string;
};
type ProviderValuesType = {
    GlobalConfig: GlobalData;
    setHelmet: Dispatch<SetStateAction<HelmetContentType>>;
    permissionList: PermissionType[];
    reloadGlobal: () => void;
};
type GlobalProviderProps = {
    children: ReactNode;
    initGlobalData: GlobalData;
};

declare const GlobalProvider: FC<GlobalProviderProps>;
declare const useGlobal: () => ProviderValuesType;

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
}

declare const useHttp: <T>({ url, method, data, headers, }: UseHttpProps) => UseHttpState<T> & {
    fetchData: () => void;
};

type RouteItem = Readonly<RouteProps & {
    permissionRequire?: string[];
    helmetContents?: HelmetContentType;
}>;
type RouteProviderValue<T extends RouteItem = RouteItem> = {
    renderedRoutes: ReactNode;
    navigate: (args: Partial<Path> & {
        pathname: Path['pathname'];
    }) => void;
    currentLocation: T;
    getRouteParams: <T extends object = object>() => T;
};
type RouteProviderProps = {
    routes: RouteItem[];
    children: ReactNode;
};

declare const RouteProviderWithRouter: FC<RouteProviderProps>;
declare const useRoute: <CustomRouteItemType extends RouteItem = RouteItem>() => RouteProviderValue<CustomRouteItemType>;

export { type GlobalData, GlobalProvider, type HelmetContentType, type PermissionType, type RouteItem, RouteProviderWithRouter, useGlobal, useHelmet, useHttp, usePermission, useRoute };
