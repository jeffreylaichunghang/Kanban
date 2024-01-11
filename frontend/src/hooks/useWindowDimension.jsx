import { useState } from "react"
import useEventListener from "./useEventListener"

export default function useWindowDimension() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    })

    useEventListener("resize", () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }, window)

    return windowSize
}
