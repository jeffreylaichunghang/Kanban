import { useContext, useEffect, useRef, useState } from "react"
import { ThemeContext, MediaQueryContext } from "../themes"
import useHover from "../hooks/useHover"
import { motion } from 'framer-motion'

export default function ToggleSwitch({
    leftLabel,
    rightLabel,
    onClick,
    defaultValue,
}) {
    const { theme } = useContext(ThemeContext)
    // const { layout } = useContext(MediaQueryContext)
    const [buttonPosition, setButtonPosition] = useState(defaultValue)
    const buttonRef = useRef()
    const hovered = useHover(buttonRef)

    // useEffect(() => {
    //     setButtonPosition(defaultValue)
    // }, [defaultValue])

    return (
        <div
            ref={buttonRef}
            onClick={onClick}
            style={{
                width: '100%',
                backgroundColor: theme.color.backgroundPrimary,
                margin: 'auto',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 15,
                borderRadius: 5,
                cursor: 'pointer'
            }}
        >
            {leftLabel}
            <span
                style={{
                    width: 40,
                    padding: 3,
                    marginRight: 20,
                    marginLeft: 20,
                    display: 'flex',
                    justifyContent: buttonPosition ? 'flex-start' : 'flex-end',
                    justifyItems: 'center',
                    backgroundColor: hovered ? theme.color.primaryHover : theme.color.primary,
                    borderRadius: 10
                }}
            >
                <motion.span
                    style={{
                        width: 15,
                        aspectRatio: 1 / 1,
                        borderRadius: 15 / 2,
                        backgroundColor: theme.color.white,
                    }}
                    layout
                    initial={false}
                ></motion.span>
            </span>
            {rightLabel}
        </div>
    )
}
