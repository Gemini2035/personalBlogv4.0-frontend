import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { RouteItem, RouteProviderValue, FC, RouteProviderProps, ReactNode } from "./types";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { usePermission } from "../usePermission";
import { useTranslation } from "../useTranslate";

export type { RouteItem }

const RouteContext = createContext<RouteProviderValue>({
    renderedRoutes: null,
    navigate: () => { },
    currentLocation: {},
    getRouteParams: <T extends object = object,>() => ({} as T)
})

export const RouteProvider: FC<RouteProviderProps> = (props) => (
    <BrowserRouter>
        <RouteProviderCore {...props} />
    </BrowserRouter>
)


const RouteProviderCore: FC<RouteProviderProps> = ({ routes, children }) => {
    const { pathname, state } = useLocation()
    const __navigate = useNavigate()
    const { hasPermission } = usePermission()
    const { t } = useTranslation()

    const findRouteItemByPathName = useCallback((targetPath: string) => routes.find(({ path }) => new RegExp(`^${path?.replace(/:\w+/g, '(\\w+)')}$`).test(targetPath)), [routes, __navigate])

    const navigate = useCallback<RouteProviderValue['navigate']>((props) => {
        if (typeof props === 'number') __navigate(props)
        else {
            const { pathname, ...restPathFields } = props
            const targetRouteItem = findRouteItemByPathName(pathname)
            if (!targetRouteItem) return
            const { permissionRequire } = targetRouteItem
            const { status, permissionsDeny } = hasPermission(permissionRequire)

            // TODO: Enhance the error page
            if (status) __navigate({ pathname, ...restPathFields })
            else __navigate({ pathname: 'error' }, {
                state: {
                    title: t("Permission deny"),
                    content: `${t("Required permission(s)")}: ${permissionsDeny.join(", ")}`
                }
            })
        }

    }, [findRouteItemByPathName, hasPermission, __navigate, t])

    const currentLocation = useMemo(() => findRouteItemByPathName(pathname) || {}, [pathname, findRouteItemByPathName])

    const getRouteParams = useCallback<RouteProviderValue['getRouteParams']>(() => state, [])

    const renderedRoutes = useMemo<ReactNode>(() => (
        <Routes>
            {routes.map((route, index) => <Route errorElement={<Navigate to={{ pathname: '/error' }} />} key={index} {...route} />)}
        </Routes>
    ), [routes])

    useEffect(() => {
        if (!findRouteItemByPathName(pathname)) __navigate({ pathname: 'error' },
            {
                state: {
                    title: t('404 page not found'),
                    content: t(`This site doesn't have this route!`)
                }
            })
    }, [pathname, findRouteItemByPathName])


    return (
        <RouteContext.Provider value={{
            renderedRoutes,
            navigate,
            currentLocation,
            getRouteParams
        }}>
            {children}
        </RouteContext.Provider>
    )
}

export const useRoute = <CustomRouteItemType extends RouteItem = RouteItem,>(): RouteProviderValue<CustomRouteItemType> => (useContext(RouteContext) as RouteProviderValue<CustomRouteItemType>)