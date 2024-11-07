import styled from "styled-components";
import { StyledTextProps } from "../types";

export const StyledText = styled('p') <StyledTextProps>`
    color: ${({ type = 'default', theme }) => theme?.colors?.[type] || '#000'};
    margin: 0
`