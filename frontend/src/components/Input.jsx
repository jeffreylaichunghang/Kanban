import { useContext, useEffect, useRef, useState, forwardRef } from "react";
import { ThemeContext } from "../themes";
import useHover from "../hooks/useHover";

import Text from "./Text";
import { mergeRefs } from "../utils/mergeRefs";

const Input = forwardRef(function Input({
    name = '',
    placeholder = '',
    value = '',
    onChange = () => true,
    onBlur = () => true,
    onFocus = () => true,
    style = {},
    validation,
    type = 'text',
    ...props
}, ref) {
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
                ref={mergeRefs(inputRef, ref)}
                name={name}
                placeholder={placeholder}
                value={inputValue}
                type={type}
                onChange={(e) => {
                    setInputValue(e.target.value)
                    onChange(e)
                }}
                onFocus={(e) => {
                    e.target.style.outline = `1px solid ${theme.color.primary}`
                    onFocus(e)
                }}
                onBlur={(e) => {
                    e.target.style.outline = `1px solid ${theme.color.line}`
                    onBlur(e)
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
                    borderRadius: 4,
                    outlineColor: theme.color.primary,
                    ...theme.font.body.l,
                    ...style
                }}
                {...props}
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
})

export default Input
