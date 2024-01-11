import { useContext, useState } from "react";
import { ThemeContext } from "../themes";

export default function Input({
    name = '',
    placeholder = '',
    onChange = () => true,
}) {
    const [inputValue, setInputValue] = useState('')
    const { theme } = useContext(ThemeContext)

    return (
        <label htmlFor={name}>
            <input
                name={name}
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value)
                    onChange(e)
                }}
            />
        </label>
    )
}
