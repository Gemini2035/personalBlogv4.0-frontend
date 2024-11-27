import { ReactNode } from "react"

export type MenuStatus = 1 | 2 | 3

export type HandleFrameTypeChange = (target: MenuStatus) => void

export type PortalFrameProps = {
    routesContent: ReactNode
}