import { useState, useContext, useEffect } from "react";
import { ThemeContext, MediaQueryContext } from "../../themes";
import OutsideAlerter from "../../hooks/useOutsideAlerter";
import { motion } from "framer-motion";

const modaltransition = {
    type: "spring",
    bounce: 0,
    duration: 0.4,
}

const modalVariants = {
    open: {
        scale: 1,
        transition: modaltransition
    },
    closed: {
        scale: 0,
        transition: {
            ...modaltransition,
        }
    }
}

const modalBackgroundTransition = {
    type: 'just',
    duration: 0.5,
    ease: [0, 0.71, 0.2, 1.01]
}

const modalBackgroundVariants = {
    open: {
        opacity: 1,
        display: 'block',
        transition: modalBackgroundTransition
    },
    closed: {
        opacity: 0,
        display: 'none',
        transition: {
            ...modalBackgroundTransition,
            delay: 0.2
        }
    }
}

export default function Modal({
    children,
    style = {},
    modal,
    action
}) {
    const { theme } = useContext(ThemeContext)
    const { layout } = useContext(MediaQueryContext)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        modal ? setOpen(true) : setOpen(false)
    }, [modal])

    return (
        <motion.div
            animate={open ? 'open' : 'closed'}
            variants={modalBackgroundVariants}
            initial={false}
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 5,
                top: 0,
                left: 0
            }}>
            <OutsideAlerter
                action={action}
                style={{
                    backgroundColor: theme.color.backgroundSecondary,
                    color: theme.color.secondary,
                    boxShadow: '1px 2px 9px black',
                    borderRadius: 6,
                    width: layout.modalWidth,
                    height: 'min-content',
                    margin: 'auto',
                    padding: 32,
                    zIndex: 10,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    ...style
                }}
                variants={modalVariants}
            >
                {children}
            </OutsideAlerter>
        </motion.div>
    )
}
