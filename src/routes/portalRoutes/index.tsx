import { RouteItem } from "@packages/hooks";
import { PortalHome } from "../../Pages";

export const portalRoutes: RouteItem[] = [
    {
        id: 'portalHome',
        path: '/',
        element: <PortalHome />
    }
]