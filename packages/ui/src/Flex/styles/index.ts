import styled from "styled-components";
import { StyledFlexProps } from "../types";

const DEFAULT_GAP = '5px'

const generateGap = (gap: StyledFlexProps['gap']) => {
    if (typeof gap === 'string') {
        switch (gap) {
            case 'small':
                return '1px';
            case 'middle':
                return DEFAULT_GAP;
            case 'large':
                return '10px'
            default:
                return DEFAULT_GAP;
        }
    } else return gap ? (gap + 'px') : DEFAULT_GAP
}

export const StyledFlex = styled.div<StyledFlexProps>`
    display: flex;
    flex-direction: ${({ verticle }) => verticle ? 'column' : 'row'};
    align-items: ${({ align }) => align};
    justify-content: ${({ justify }) => justify};
    gap: ${({gap}) => generateGap(gap)}
`