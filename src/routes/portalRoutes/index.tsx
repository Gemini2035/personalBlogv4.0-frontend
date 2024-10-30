import { BlogRouteItem } from "../types";
import { PortalHome } from "../../Pages";

export const portalRoutes: BlogRouteItem[] = [
    {
        id: 'portalHome',
        path: '/',
        element: <PortalHome />
    }
]