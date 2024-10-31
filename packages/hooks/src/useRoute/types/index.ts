import { ReactNode } from "react"
import { HelmetContentType } from "../../useHelmet"
import { Path, RouteProps } from "react-router-dom"
export type { FC, ReactNode } from "react"

export type RouteItem = Readonly<RouteProps & {
    permissionRequire?: string[],
    helmetContents?: HelmetContentType,
}>

export type RouteProviderValue<T extends RouteItem = RouteItem> = {
    renderedRoutes: ReactNode,
    navigate: (args: Partial<Path> & { pathname: Path['pathname'] }) => void,
    currentLocation: T,
    getRouteParams: <T extends object = object>() => T
}

export type RouteProviderProps = {
    routes: RouteItem[],
    children: ReactNode
}