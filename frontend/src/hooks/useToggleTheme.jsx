import { useState } from "react"

import { lightTheme, theme as darkTheme } from "../themes/themes"

export default function useToggleTheme(initialTheme) {
    const [themeState, setThemeState] = useState(localStorage.getItem('theme') || initialTheme)

    const toggleTheme = () => {
        setThemeState(prev => {
            const newTheme = prev === 'light' ? 'dark' : 'light'
            localStorage.setItem('theme', newTheme)
            return newTheme
        })
    }

    const themes = themeState === 'dark' ? darkTheme : lightTheme

    return { themes, toggleTheme, themeState }
}
