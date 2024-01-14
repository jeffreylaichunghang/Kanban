import { useState } from "react"

import { lightTheme, theme as darkTheme } from "../themes/themes"

export default function useToggleTheme(initialTheme) {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || initialTheme)

    const toggleTheme = () => {
        setTheme(prev => {
            const newTheme = prev === 'light' ? 'dark' : 'light'
            localStorage.setItem('theme', newTheme)
            return newTheme
        })
    }

    const themes = theme === 'dark' ? darkTheme : lightTheme

    return { themes, toggleTheme, theme }
}
