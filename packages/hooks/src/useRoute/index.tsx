import { createContext, useCallback, useContext, useMemo } from "react";
import { RouteItem, RouteProviderValue, FC, RouteProviderProps, ReactNode } from "./types";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { usePermission } from "../usePermission";

export type { RouteItem }

const RouteContext = createContext<RouteProviderValue>({
    renderedRoutes: null,
    navigate: () => {},
    currentLocation: {}
})

export const RouteProviderWithRouter: FC<RouteProviderProps> = (props) => (
    <BrowserRouter>
        <RouteProvider {...props} />
    </BrowserRouter>
)


const RouteProvider: FC<RouteProviderProps> = ({ routes, children }) => {
    const { pathname } = useLocation()
    const __navigate = useNavigate()
    const { checkPermission } = usePermission()

    const findRouteItemByPathName = useCallback((targetPath: string) => {
        const result = routes.find(({ path }) => new RegExp(`^${path?.replace(/:\w+/g, '(\\w+)')}$`).test(targetPath))
        if (!result) {
            __navigate({ pathname: 'error' })
            return {}
        }
        return result
    }, [routes, __navigate])

    const navigate = useCallback<RouteProviderValue['navigate']>(({ pathname, ...restPathFields }) => {
        const targetRouteItem = findRouteItemByPathName(pathname)
        
        const { permissionRequire } = targetRouteItem
        const { status } = checkPermission(permissionRequire || [])

        // TODO: Enhance the error page
        if (status) __navigate({pathname, ...restPathFields})
        else __navigate({ pathname: 'error' })
        
    }, [routes, findRouteItemByPathName, __navigate])

    const currentLocation = useMemo(() => findRouteItemByPathName(pathname) || {}, [pathname, findRouteItemByPathName])


    const renderedRoutes = useMemo<ReactNode>(() => (
        <Routes>
            {routes.map((route, index) => <Route errorElement={<Navigate to={{ pathname: '/error' }} />} key={index} {...route} />)}
        </Routes>
    ), [routes])

    return (
        <RouteContext.Provider value={{ renderedRoutes, navigate, currentLocation }}>
            {children}
        </RouteContext.Provider>
    )
}

export const useRoute = () => useContext(RouteContext)