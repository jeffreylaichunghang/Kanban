import { useContext, useRef, useState } from "react";
import { ThemeContext } from "../themes";

export default function Label({
    text = '',
    name = '',
    color,
}) {
    const { theme } = useContext(ThemeContext)

    return (
        <label
            style={{
                color: color || theme.color.primaryLabel,
                fontSize: 12,
            }}
            htmlFor={name}
        > {text}           </label>
    )
}
