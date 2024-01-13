import { useRef } from "react";
import useEventListener from "./useEventListener";

export function useOutsideAlerter(ref, cb) {
    useEventListener("mousedown", e => {
        if (ref.current == null || ref.current.contains(e.target)) return
        cb(e)
    }, document)
}

export default function OutsideAlerter({
    children,
    style,
    action
}) {
    const modalRef = useRef()

    useOutsideAlerter(modalRef, action)

    return (
        <div
            ref={modalRef}
            style={style}
        >
            {children}
        </div>
    )
}
