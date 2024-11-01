import { useRoute } from "@packages/hooks";
import { FC } from "./types";
import { BlogRouteItem } from "../../routes";
import { AdminFrame } from "./AdminFrame";
import { PortalFrame } from "./PortalFrame";

export const BlogFrame: FC = () => {
    const { currentLocation: { frameType }, renderedRoutes } = useRoute<BlogRouteItem>()

    let Frame: FC = () => <></>

    switch (frameType) {
        case 'portal': {
            Frame = PortalFrame
            break
        }
        case 'admin': {
            Frame = AdminFrame
            break
        }
        default: {
            Frame = () => (<>{renderedRoutes}</>)
        }
    }

    return <Frame />

}