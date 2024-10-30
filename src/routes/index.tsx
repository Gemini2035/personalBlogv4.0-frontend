import { ErrorPage } from "../Pages";
import { adminRoutes } from "./adminRoutes";
import { portalRoutes } from "./portalRoutes";

export type { BlogRouteItem } from './types'

export const routes = [
    ...portalRoutes.map(item => ({ ...item, frameType: 'portal' })),
    ...adminRoutes.map(item => ({ ...item, frameType: 'admin' })),
    {
        id: 'errorPage',
        path: '/error',
        element: <ErrorPage />
    }
]