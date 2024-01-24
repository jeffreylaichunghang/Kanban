import { useContext } from "react"
import { ThemeContext } from "../themes"
import useWindowDimension from "../hooks/useWindowDimension"

export default function Signin() {
    const { theme } = useContext(ThemeContext)
    const { width, height } = useWindowDimension()
    return (
        <div
            style={{
                backgroundColor: theme.color.backgroundPrimary,
                width: width,
                height: height,
            }}
        >Sign in page</div>
    )
}
