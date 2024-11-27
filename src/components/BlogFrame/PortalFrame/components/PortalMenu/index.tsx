import { FC, useEffect, useState } from "react";
import { PortalMenuProps } from "./types";
import { StyledPortalMenu } from "./styles";

export const PortalMenu: FC<PortalMenuProps> = ({ status, handleFrameTypeChange }) => {


    return (
        <StyledPortalMenu $status={status}>
           {status}
        </StyledPortalMenu>
    )
}