import { useEffect, useState } from "react"

const DEFAULT_DURATION = 100

export const textAppear = (targetText: string) => {
    const [text, setText] = useState(targetText[0])

    useEffect(() => {
        if (text.length < targetText.length) setTimeout(() => setText(prev => prev + targetText[prev.length]), DEFAULT_DURATION)
        else return
    }, [text])

    return text
}