import { Trans, useRoute, useTranslation } from "@packages/hooks"
import { Flex, Text, Img } from '@packages/ui'
import { ErrorPageParamsType, FC } from "./types"
import { StyledErrorPage } from "./styles"
import { FadeAnimate } from "@packages/animate"
import { textAppear } from "./utils"
import { useCallback } from "react"

// TODO: add contact us link

export const ErrorPage: FC = () => {

    const { getRouteParams, navigate } = useRoute()
    const { t } = useTranslation()

    const {
        title = t("errorPage.defaultTitle"),
        content = t("errorPage.defaultContent")
    } = getRouteParams<ErrorPageParamsType>() || {}

    const RetryLink = useCallback((props: object) => (
        <a href="/" onClick={() => navigate(-1)} rel="noopener noreferrer" {...props} />
    ), [])
    const ContactLink = useCallback((props: object) => (
        <a href="/" rel="noopener noreferrer" {...props} />
    ), [])

    return (
        <StyledErrorPage align="center" justify="center" verticle>
            <div className="maintain">
                <FadeAnimate innerClassName="icon">
                    <Img src="/site.svg" alt="site.svg" title="" />
                </FadeAnimate>
                <div className="warning-banner">
                    <Text nodeType="h2" type="warning">{t('global.warning').toLocaleUpperCase()}</Text>
                </div>
                <Flex className="title" align="center" justify="space-between">
                    <Text nodeType="h3">{title}</Text>
                    <Img src="/warning.svg" alt="warning_img" title="" className="warning-icon" />
                </Flex>
                <Text className="content">{textAppear(content)}</Text>
            </div>
            <FadeAnimate>
                <Text className="tips">
                    <Trans
                        i18nKey="errorPage.tips"
                        components={{
                            retryLink: <RetryLink />,
                            contactLink: <ContactLink />
                        }} />
                </Text>
            </FadeAnimate>
        </StyledErrorPage>
    )
}