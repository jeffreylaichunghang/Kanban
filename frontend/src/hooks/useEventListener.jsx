import { useEffect, useRef } from "react"

export default function useEventListener(
    eventType,
    callback,
    element
) {
    const callbackRef = useRef(callback)

    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    useEffect(() => {
        const targetElement = element?.current ?? element;
        if (targetElement === null || targetElement === undefined) return

        const handler = e => callbackRef.current(e)
        targetElement.addEventListener(eventType, handler)

        return () => targetElement.removeEventListener(eventType, handler)
    }, [eventType, element])
}
