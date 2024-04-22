import { useState } from "react"
import useEventListener from "./useEventListener"

export default function useHover(ref) {
    const [hovered, setHovered] = useState(false)

    useEventListener("mouseenter", () => {
        setHovered(true)
    }, ref)
    useEventListener("mouseleave", () => {
        setHovered(false)
    }, ref)

    return hovered
}
