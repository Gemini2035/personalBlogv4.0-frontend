import { ErrorPage } from "../Pages";
import { adminRoutes } from "./adminRoutes";
import { portalRoutes } from "./portalRoutes";

export type { BlogRouteItem } from './types'

export const routes = [
    ...portalRoutes,
    ...adminRoutes.map(item => ({ ...item, frameType: 'admin' })),
    {
        id: 'errorPage',
        path: '/error',
        element: <ErrorPage />
    }
]