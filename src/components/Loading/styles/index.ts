import { styled } from "@packages/ui";
import { StyledLoadingProps } from "../types";

export const StyledLoading = styled.div<StyledLoadingProps>`
    background-color: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: ${({ height }) => height ?? '100vh'};
    width: ${({ width }) => width ?? '100vw'};
    
    .loading-icon {
        filter: ${({imgColorRevert}) => imgColorRevert ? 'invert(1)' : 'none'};
    }
    
    .loading-text {
        margin-top: -15px;
        z-index: 1;
    }
`