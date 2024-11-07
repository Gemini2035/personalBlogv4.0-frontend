import { useRoute, useTranslation } from "@packages/hooks"
import { ErrorPageParamsType, FC } from "./types"
import { StyledErrorPage } from "./styles"
import { FadeAnimate } from "@packages/animate"
import { textAppear } from "./utils"

export const ErrorPage: FC = () => {

    const { getRouteParams } = useRoute()

    const { title = '未知错误', content = '发生了未知的错误' } = getRouteParams<ErrorPageParamsType>() || {}

    const { t } = useTranslation()

    return (
        <StyledErrorPage>
            <div className="maintain">
                <FadeAnimate innerClassName="icon">
                    <img src="/site.svg" />
                </FadeAnimate>
                <h1 className="warning-banner">{t('global.warning').toLocaleUpperCase()}</h1>
                <div className="title">
                    <p>{title}</p>
                    <img src="" alt="warning_img" />
                </div>
                <p>{textAppear(content)}</p>
            </div>
        </StyledErrorPage>
    )
}