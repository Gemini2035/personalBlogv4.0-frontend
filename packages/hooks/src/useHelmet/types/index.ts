export type { ReactNode } from "react"

export type AcceptableHelmetTag = 'meta' | 'title' | 'link'

export type HelmetTagProps = Record<string, string> 

export type HelmetContentType = {type: AcceptableHelmetTag, props: HelmetTagProps}[]