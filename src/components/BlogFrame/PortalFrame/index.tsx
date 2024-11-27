import { useRoute } from "@packages/hooks"
import { StyledPortalFrame } from "./styles"
import { PortalMenu } from "./components"
import { FC, useCallback, useState } from "react"
import { MenuStatus } from "./components/PortalMenu/types"
import { HandleFrameTypeChange } from "./types"
import clsx from "clsx"
import { Flex } from "@packages/ui"

export const PortalFrame: FC = () => {
    const { renderedRoutes } = useRoute()
    const [status, setStatus] = useState<MenuStatus>(2)

    const handleFrameTypeChange = useCallback<HandleFrameTypeChange>((target) => {
        if (status === target) return;
        setStatus(target)
    }, [status, setStatus])

    return (
        <StyledPortalFrame gap={0}>
            <PortalMenu status={status} handleFrameTypeChange={handleFrameTypeChange} />
            {status !== 3 && (
                <Flex className="router-container" align="center">
                    <div className={clsx("router-content", status === 2 && 'shrink')} onClick={() => handleFrameTypeChange(1)}>
                        {renderedRoutes}
                    </div>
                </Flex>
            )}
        </StyledPortalFrame>
    )
}