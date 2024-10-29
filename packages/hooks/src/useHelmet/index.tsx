import { Helmet } from "react-helmet";
import { AcceptableHelmetTag, HelmetTagProps, HelmetContentType, ReactNode } from "./types";

const renderHelmetItem = (type: AcceptableHelmetTag, props: HelmetTagProps): ReactNode => {
    const key = JSON.stringify(props || '') + type
    try {
        switch (type) {
            case "meta": {
                return <meta {...props} key={key} />
            }
            case "title": {
                const { content, ...restFeilds } = props
                return <title {...restFeilds} key={key}>{content}</title>
            }
            case "link": {
                return <link {...props}  key={key}/>
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