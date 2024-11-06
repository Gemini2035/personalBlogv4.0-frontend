import { useRoute, useTranslation } from "@packages/hooks"
import { ErrorPageParamsType, FC } from "./types"
import { StyledErrorPage } from "./styles"
import { FadeAnimate } from "@packages/animate"

export const ErrorPage: FC = () => {

    const { getRouteParams } = useRoute()

    const { title = '未知错误', content = '发生了未知的错误' } = getRouteParams<ErrorPageParamsType>() || {}

    const { t } = useTranslation()

    return (
        <StyledErrorPage>
            <FadeAnimate>
                <img src="/site.svg" />
            </FadeAnimate>
            <div>{t('global.warning')}</div>
            <div>
                <p>{title}</p>
                <p>{content}</p>
            </div>
        </StyledErrorPage>
    )
}