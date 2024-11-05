import { useRoute, useTranslation } from "@packages/hooks"
import { ErrorPageParamsType } from "./types"
import { StyledErrorPage } from "./styles"
import { FadeAnimate } from "@packages/animate"

export const ErrorPage = () => {
    const { getRouteParams } = useRoute()

    const { title = '未知错误', content = '发生了未知的错误' } = getRouteParams<ErrorPageParamsType>() || {}

    const { t } = useTranslation()

    return <StyledErrorPage>
        <FadeAnimate>
            {t('global.welcome')}
        </FadeAnimate>
    </StyledErrorPage>
}