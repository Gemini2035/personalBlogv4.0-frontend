import { InitOptions } from 'i18next'
import { ReactNode } from 'react'

export type { FC } from 'react'
export type ResourcesType = InitOptions['resources']
export type TranslateProviderProps = {
    children: ReactNode,
    lng?: InitOptions['lng'],
    resources?: ResourcesType
}