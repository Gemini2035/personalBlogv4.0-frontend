import { createContext, ReactNode, useContext, useMemo } from "react";
import { RouteItem, RouteProviderValue, FC, RouteProviderProps } from "./types";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export type { RouteItem }

const RouteContext = createContext<RouteProviderValue>({
    renderedRoutes: null
})

export const RouteProviderWithRouter: FC<RouteProviderProps> = (props) => (
    <BrowserRouter>
        <RouteProvider {...props} />
    </BrowserRouter>
)


const RouteProvider: FC<RouteProviderProps> = ({ routes, children }) => {
    // const location = useLocation()
    // const currentLocation = useMemo(() => {
    //     console.log(location)
    //     return routes.find(({ id }) => id === location.key)
    // }, [location.key, location.pathname])

    // console.log('currentLocation', currentLocation)


    const renderedRoutes = useMemo<ReactNode>(() => (
        <Routes>
            {routes.map((route, index) => <Route errorElement={<Navigate to={{ pathname: '/error' }} />} key={index} {...route} />)}
        </Routes>
    ), [routes])

    return (
        <RouteContext.Provider value={{ renderedRoutes }}>
            {children}
        </RouteContext.Provider>
    )
}

export const useRoute = () => useContext(RouteContext)