import { RouteItem } from "@packages/hooks";
import { AdminHome } from "../../Pages";

export const adminRoutes: RouteItem[] = [
    {
        id: 'adminHome',
        path: '/admin',
        element: <AdminHome />
    }
]