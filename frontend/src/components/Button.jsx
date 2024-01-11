import { useContext, useRef } from "react"
import { ThemeContext } from "../themes"
import useHover from "../hooks/useHover"

import Text from "./Text"

export default function Button({
    text = '',
    variant = 'primary',
    style = {},
    textStyle = {},
    onClick = () => true,
}) {
    const buttonRef = useRef()
    const hovered = useHover(buttonRef)
    const { theme } = useContext(ThemeContext)

    let defaultStyle = {};
    let textProperty;
    switch (variant) {
        case 'primary':
            defaultStyle = {
                backgroundColor: hovered ? theme.color.primaryHover : theme.color.primary
            }
            textProperty = {
                variant: "heading",
                size: "m",
                color: theme.color.white,
            }
            break;
        case 'secondary':
            defaultStyle = {
                backgroundColor: hovered ? theme.color.secondaryHover : theme.color.secondary
            }
            textProperty = {
                variant: "heading",
                size: "m",
                color: theme.color.mainPurple,
            }
            break;
        case 'destructive':
            defaultStyle = {
                backgroundColor: hovered ? theme.color.destructiveHover : theme.color.destructive
            }
            textProperty = {
                variant: "heading",
                size: "m",
                color: theme.color.white,
            }
            break;

        default:
            break;
    }

    const styles = {
        paddingTop: '15px',
        paddingBottom: '15px',
        paddingLeft: '24px',
        paddingRight: '24px',
        borderRadius: '24px',
        outline: 'none',
        border: 'none',
        cursor: 'pointer',
        ...defaultStyle,
        ...style
    }

    return (
        <button
            ref={buttonRef}
            style={styles}
            onClick={onClick}
        >
            <Text
                text={text}
                {...textProperty}
                style={textStyle}
            />
        </button>
    )
}
