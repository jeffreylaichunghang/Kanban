import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../themes";
import useHover from "../hooks/useHover";

import Text from "./Text";

export default function Input({
    name = '',
    placeholder = '',
    value = '',
    onChange = () => true,
    onBlur = () => true,
    onFocus = () => true,
    style = {},
    validation,
}) {
    const inputRef = useRef()
    const hovered = useHover(inputRef)
    const [inputValue, setInputValue] = useState('')
    const [warningText, setWarningText] = useState(false)
    const { theme } = useContext(ThemeContext)

    useEffect(() => {
        setInputValue(value)
        if (validation) {
            setWarningText(validation.message)
        } else {
            setWarningText(false)
        }
    }, [value, validation])

    let borderColor;
    if (hovered) {
        if (validation && !validation.valid) {
            borderColor = theme.color.destructive
        } else {
            borderColor = theme.color.mainPurple
        }
    } else {
        if (validation && !validation.valid) {
            borderColor = theme.color.destructive
        } else {
            borderColor = theme.color.line
        }
    }

    return (
        <div style={{
            position: 'relative',
            width: '100%'
        }}>
            <input
                ref={inputRef}
                name={name}
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value)
                    onChange(e)
                }}
                onFocus={(e) => {
                    e.target.style.outline = `1px solid ${theme.color.primary}`
                    onFocus()
                }}
                onBlur={(e) => {
                    e.target.style.outline = `1px solid ${theme.color.line}`
                    onBlur()
                }}
                style={{
                    width: '100%',
                    backgroundColor: 'transparent',
                    paddingTop: 8,
                    paddingBottom: 8,
                    paddingLeft: 16,
                    paddingRight: 16,
                    marginTop: 8,
                    color: theme.color.primaryText,
                    border: `1px solid ${borderColor}`,
                    outlineColor: theme.color.primary,
                    ...theme.font.body.l,
                    ...style
                }}
            />
            <Text
                variant="body"
                size="l"
                text={warningText}
                style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    display: warningText ? 'block' : 'none'
                }}
                color={theme.color.destructive}
            />
        </div>
    )
}
