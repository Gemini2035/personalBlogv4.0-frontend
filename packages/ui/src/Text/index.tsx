import { FC } from "react";
import { TextProps } from "./types";
import { StyledText } from "./styles";

export const Text: FC<TextProps> = ({
    nodeType = 'p',
    children,
    ...styledTextProps
}) => {
    return (
        <StyledText as={nodeType} {...styledTextProps}>
            {children}
        </StyledText>
    )
}