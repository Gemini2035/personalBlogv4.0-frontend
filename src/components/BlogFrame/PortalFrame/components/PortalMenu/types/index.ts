import { HandleFrameTypeChange, MenuStatus } from "../../../types"

export type { MenuStatus }

export type PortalMenuProps = {
    status: MenuStatus
    handleFrameTypeChange: HandleFrameTypeChange
}

export type StyledPortalMenuProps = {
    $status: MenuStatus
}