import { useRoute } from "@packages/hooks"
import { FC } from "react"

export const Test: FC = () => {
    const {
        renderedRoutes
    } = useRoute()
    return <>{renderedRoutes}</>
}