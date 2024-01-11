import { useContext } from "react"
import { ThemeContext } from "../themes"

export default function Text({
    variant = 'body',
    size = 'l',
    text = '',
    color,
    style = {},
    onClick = () => true
}) {
    const { theme } = useContext(ThemeContext)
    let defaultStyle = {};

    if (variant === 'heading') {
        switch (size) {
            case 'xl':
                defaultStyle = { ...theme.font.heading.xl }
                break;
            case 'l':
                defaultStyle = { ...theme.font.heading.l }
                break;
            case 'm':
                defaultStyle = { ...theme.font.heading.m }
                break;
            case 's':
                defaultStyle = { ...theme.font.heading.s }
                break;

            default:
                break;
        }
    } else if (variant === 'body') {
        switch (size) {
            case 'l':
                defaultStyle = { ...theme.font.body.l }
                break;
            case 'm':
                defaultStyle = { ...theme.font.body.m }
                break;

            default:
                break;
        }
    }

    const styles = {
        color: color || theme.color.primaryText,
        ...defaultStyle,
        ...style
    }

    return (
        <p style={styles} onClick={onClick}>
            {text}
        </p>
    )
}
