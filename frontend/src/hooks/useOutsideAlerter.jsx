import { useRef, forwardRef } from "react";
import { motion } from "framer-motion";

import useEventListener from "./useEventListener";
import { mergeRefs } from '../utils/mergeRefs'

export function useOutsideAlerter(ref, cb) {
    useEventListener("mousedown", e => {
        if (ref.current == null || ref.current.contains(e.target)) return
        cb(e)
    }, document)
}

const StaticOutsideAlerter = forwardRef(function OutsideAlerter({
    children,
    style,
    action,
    ...props
}, ref) {
    const modalRef = useRef()

    useOutsideAlerter(modalRef, action)

    return (
        <motion.div
            ref={mergeRefs(modalRef, ref)}
            style={style}
            {...props}
        >
            {children}
        </motion.div>
    )
})

const OutsideAlerter = motion(StaticOutsideAlerter, { forwardMotionProps: true })
export default OutsideAlerter
