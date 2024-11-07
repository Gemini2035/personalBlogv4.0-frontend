import { StyledFlex } from "./styles";
import { FlexProps, FC } from "./types";

export const Flex: FC<FlexProps> = ({ children, className, ...styledFlexProps }) => (
    <StyledFlex className={className} {...styledFlexProps}>
        {children}
    </StyledFlex>
)