import { Helmet } from "react-helmet";
import { AcceptableHelmetTag, HelmetTagProps, HelmetContentType, ReactNode } from "./types";

const renderHelmetItem = (type: AcceptableHelmetTag, props: HelmetTagProps): ReactNode => {
    try {
        switch (type) {
            case "meta": {
                return <meta {...props} />
            }
            case "title": {
                const { content, ...restFeilds } = props
                return <title {...restFeilds}>{content}</title>
            }
            case "link": {
                return <link {...props} />
            }
            default:
                return null
        }
    } catch {
        return null
    }
}

export const useHelmet = (helmetContent: HelmetContentType) => ({
    BlogHelmet: !!helmetContent?.length && (
        <Helmet>
            {helmetContent.map(({ type, props }) => renderHelmetItem(type, props))}
        </Helmet>
    )
})

export type { HelmetContentType }