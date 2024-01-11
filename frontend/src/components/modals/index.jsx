import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../themes";
import OutsideAlerter from "../../hooks/useOutsideAlerter";
import { motion } from "framer-motion";

const modalVariants = {
    open: { scale: 1 },
    closed: { scale: 0 }
}

export default function Modal({
    children,
    style = {},
    modal,
    action
}) {
    const { theme } = useContext(ThemeContext)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        modal === '' ? setOpen(false) : setOpen(true)
    }, [modal])

    return (
        <motion.div
            animate={open ? 'open' : 'closed'}
            variants={modalVariants}
            transition={{ type: 'just' }}
            initial={false}
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 5
            }}>
            <OutsideAlerter
                action={() => {
                    if (open) setOpen(false)
                    action()
                }}
                style={{
                    backgroundColor: theme.color.backgroundSecondary,
                    borderRadius: 6,
                    color: theme.color.secondary,
                    width: "480px",
                    height: 'min-content',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    margin: 'auto',
                    zIndex: 10,
                    padding: 32,
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '1px 2px 9px black',
                    ...style
                }}
            >
                {children}
            </OutsideAlerter>
        </motion.div>
    )
}
