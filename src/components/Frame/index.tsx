import { useRoute } from "@packages/hooks";
import { FC, FrameProps } from "./types";
import { useMemo } from "react";
import { BlogRouteItem } from "../../routes";

export const Frame: FC<FrameProps> = ({ children }) => {
    const { currentLocation: {frameType} } = useRoute<BlogRouteItem>()
    const frameType = useMemo(() => {
        
    }, [])
    if (disableFrame) return children
    
}