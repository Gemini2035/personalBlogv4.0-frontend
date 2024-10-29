import { ErrorPage } from "../Pages";
import { adminRoutes } from "./adminRoutes";
import { portalRoutes } from "./portalRoutes";

export const routes = [
    ...portalRoutes,
    ...adminRoutes,
    {
        id: 'errorPage',
        path: '/error',
        element: <ErrorPage />
    }
]