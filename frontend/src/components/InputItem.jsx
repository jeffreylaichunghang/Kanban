import { useContext } from "react";
import { ThemeContext } from "../themes";

import Input from "./Input";
import CrossIcon from '../assets/CrossIcon'

export default function InputItem({
    name = '',
    placeholder = '',
    value,
    onChange,
    onFocus,
    onBlur,
    onClick,
    style,
    validation
}) {
    const { theme } = useContext(ThemeContext)
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            columnGap: 16,
            paddingRight: 5,
        }}>
            <Input
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                style={style}
                validation={validation}
            />
            <span
                onClick={onClick}
                style={{
                    cursor: 'pointer'
                }}
            >
                <CrossIcon
                    fill={validation && !validation.valid ? theme.color.destructive : theme.color.secondaryText}
                />
            </span>
        </div>
    )
}
