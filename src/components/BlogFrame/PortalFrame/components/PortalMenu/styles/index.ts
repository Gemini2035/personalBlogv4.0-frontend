import { styled } from "@packages/ui";
import { MenuStatus, StyledPortalMenuProps } from "../types";
import { CSSProperties } from "react";

export const StyledPortalMenu = styled.div<StyledPortalMenuProps>`
    background-color: grey;
    width: ${({ $status }) => widthGenerator($status)};
    flex-shrink: 0;
    transition: 0.6s ease-in-out;
    height: 100vh;
    position: sticky;
    top: 0;
    left:0;
`


const widthGenerator = (status: MenuStatus): CSSProperties['width'] => {
    switch (status) {
        case 1:
            return '0'
        case 2:
            return '40%'
        case 3:
            return '100%'
        default:
            return 'unset';
    }
}