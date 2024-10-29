import { ReactNode } from "react"
import { HelmetContentType } from "../../useHelmet"
import { RouteProps } from "react-router-dom"
export type { FC } from "react"

export type RouteItem = Readonly<RouteProps & {
    permissionRequire?: string[],
    helmetContents?: HelmetContentType,
}>

export type RouteProviderValue = {
    renderedRoutes: ReactNode
}

export type RouteProviderProps = {
    routes: RouteItem[],
    children: ReactNode
}