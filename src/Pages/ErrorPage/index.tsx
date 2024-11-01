import { useRoute } from "@packages/hooks"
import { ErrorPageParamsType } from "./types"
import { StyledErrorPage } from "./styles"
import { FadeAnimate } from "@packages/animate"

export const ErrorPage = () => {
    const { getRouteParams } = useRoute()

    const { title = '未知错误', content = '发生了未知的错误' } = getRouteParams<ErrorPageParamsType>() || {}
    return <StyledErrorPage>
        < FadeAnimate in duration={1000}>
            111
        </FadeAnimate>
    </StyledErrorPage>
}