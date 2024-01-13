import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../themes";
import useHover from "../hooks/useHover";

export default function Textarea({
    placeholder = '',
    value = '',
    onChange = () => true,
}) {
    const [text, setText] = useState(value)
    const { theme } = useContext(ThemeContext)
    const textareaRef = useRef()
    const hovered = useHover(textareaRef)

    useEffect(() => { setText(value) }, [value])

    return (
        <textarea
            ref={textareaRef}
            placeholder={placeholder}
            value={text}
            style={{
                resize: 'none',
                paddingTop: 8,
                paddingLeft: 16,
                paddingRight: 25,
                minHeight: 112,
                width: '100%',
                backgroundColor: 'transparent',
                borderColor: hovered ? theme.color.mainPurple : theme.color.line,
                borderRadius: 4,
                marginTop: 8,
                lineHeight: '176.923%',
                color: theme.color.primaryText
            }}
            onFocus={(e) => {
                e.target.style.outline = `1px solid ${theme.color.mainPurple}`
            }}
            onBlur={(e) => {
                e.target.style.outline = `1px solid ${theme.color.line}`
            }}
            onChange={(e) => {
                setText(e.target.value)
                onChange(e.target.value)
            }}
        />
    )
}
