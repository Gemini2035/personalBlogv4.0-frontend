import { FC } from "react";
import { TextProps } from "./types";
import { StyledText } from "./styles";

export const Text: FC<TextProps> = ({
    nodeType = 'p',
    children,
    className,
    ...styledTextProps
}) => {
    return (
        <StyledText className={className} as={nodeType} {...styledTextProps}>
            {children}
        </StyledText>
    )
}