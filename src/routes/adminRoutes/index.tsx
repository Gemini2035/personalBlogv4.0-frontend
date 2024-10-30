import { AdminHome } from "../../Pages";
import { BlogRouteItem } from "../types";

export const adminRoutes: BlogRouteItem[] = [
    {
        id: 'adminHome',
        path: '/admin',
        element: <AdminHome />
    }
]