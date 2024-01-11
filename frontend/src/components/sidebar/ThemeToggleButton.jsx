import { useContext, useEffect, useRef, useState } from "react"
import { ThemeContext } from "../../themes"
import useHover from "../../hooks/useHover"
import { motion } from 'framer-motion'

import { constants } from "../../constants/constants"
import ThemeLight from '../../assets/ThemeLight'
import ThemeDark from '../../assets/ThemeDark'

export default function ThemeToggleButton({

}) {
    const { theme, toggleTheme, themeState } = useContext(ThemeContext)
    const [buttonPosition, setButtonPosition] = useState(themeState === 'light' ? 'flex-start' : 'flex-end')
    const buttonRef = useRef()
    const hovered = useHover(buttonRef)

    useEffect(() => {
        setButtonPosition(themeState === 'light' ? 'flex-start' : 'flex-end')
    }, [themeState])

    // console.log(themeState)
    return (
        <div
            ref={buttonRef}
            onClick={toggleTheme}
            style={{
                width: constants.sidebarWidth * 0.85,
                backgroundColor: theme.color.backgroundPrimary,
                marginRight: 'auto',
                marginLeft: 'auto',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 15,
                borderRadius: 5,
                cursor: 'pointer'
            }}
        >
            <ThemeLight />
            <span
                style={{
                    width: 40,
                    padding: 3,
                    marginRight: 20,
                    marginLeft: 20,
                    display: 'flex',
                    justifyContent: buttonPosition,
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
                ></motion.span>
            </span>
            <ThemeDark />
        </div>
    )
}
