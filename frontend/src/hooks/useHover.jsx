import { useState, useEffect, useRef } from "react"
import useEventListener from "./useEventListener"

export default function useHover(ref) {
    const [hovered, setHovered] = useState(false)

    // useEventListener("mouseenter", (e) => {
    //     setHovered(true)
    // }, ref.current)
    // useEventListener("mouseleave", (e) => {
    //     setHovered(false)
    // }, ref.current)

    useEffect(() => {
        const handleMouseEnter = () => {
            setHovered(true);
        };

        const handleMouseLeave = () => {
            setHovered(false);
        };

        if (ref.current) {
            ref.current.addEventListener("mouseenter", handleMouseEnter);
            ref.current.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            if (ref.current) {
                ref.current.removeEventListener("mouseenter", handleMouseEnter);
                ref.current.removeEventListener("mouseleave", handleMouseLeave);
            }
        };
    }, [ref]);

    return hovered
}
