import { useContext, useRef, useState } from "react";
import { ThemeContext } from "../themes";

export default function Label({
    text = '',
    name = '',
}) {
    const { theme } = useContext(ThemeContext)

    return (
        <label
            style={{
                color: theme.color.primaryLabel,
                fontSize: 12,
            }}
            htmlFor={name}
        > {text}           </label>
    )
}
