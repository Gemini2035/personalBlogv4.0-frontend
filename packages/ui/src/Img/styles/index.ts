import styled from "styled-components";
import { StyledImageProps } from "../tyoes";

export const StyledImg = styled.img<StyledImageProps>`
    width: ${({ width }) => width ? width : 'auto'};
    height: ${({ height }) => height ? height : 'auto'};
    display: ${({ block }) => block ? 'block' : 'inline-block'}
`
