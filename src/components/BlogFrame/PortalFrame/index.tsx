import { useRoute } from "@packages/hooks"
import { FC } from "./types"

export const PortalFrame: FC = () => {
    const { renderedRoutes } = useRoute()
    return (
        <>
            This is PortalFrame
            {renderedRoutes}
        </>
    )
}