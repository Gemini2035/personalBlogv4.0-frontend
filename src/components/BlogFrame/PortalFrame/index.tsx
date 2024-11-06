import { useRoute } from "@packages/hooks"
import { FC } from "./types"
import { StyledPortalFrame } from "./styles"

export const PortalFrame: FC = () => {
    const { renderedRoutes } = useRoute()
    return (
        <StyledPortalFrame>
            This is PortalFrame
            {renderedRoutes}
        </StyledPortalFrame>
    )
}