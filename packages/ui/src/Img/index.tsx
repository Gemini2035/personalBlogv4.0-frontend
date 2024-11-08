import { StyledImg } from "./styles";
import { FC, ImageProps } from "./tyoes";

export const Img: FC<ImageProps> = (props) => {
    return (
        <StyledImg {...props} />
    )
}