import { Img, Text, useTheme } from '@packages/ui'
import { StyledLoading } from './styles'
import { FC, LoadingPops } from './types'
import { useTranslation } from '@packages/hooks'
import { useMemo } from 'react'

export const Loading: FC<LoadingPops> = (props) => {
    const { t } = useTranslation()
    const { themeMode } = useTheme()

    const imgColorRevert = useMemo(() => {
        switch (themeMode) {
            case 'light':
                return true;

            default:
                return false;
        }
    }, [themeMode])

    return (
        <StyledLoading {...{ imgColorRevert, ...props }}>
            <Img
                src='/loading.gif'
                alt='loading-img'
                title=''
                className='loading-icon'
                width="500px" />
            <Text className='loading-text'>
                {t("global.loading")}
            </Text>
        </StyledLoading>
    )
}