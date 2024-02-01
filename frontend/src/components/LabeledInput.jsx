import { useContext } from 'react'
import { MediaQueryContext, ThemeContext } from '../themes'

import Input from './Input'
import Label from './Label'

const LabeledInput = ({
    label,
    name,
    placeholder,
    value,
    type,
    ref = null,
    onChange,
    ...props
}) => {
    const { isMobile } = useContext(MediaQueryContext)
    const { theme } = useContext(ThemeContext)
    return (
        <div>
            <Label
                text={label}
                name={name}
                color={isMobile ? theme.color.secondaryText : theme.color.primaryText}
            />
            <Input
                name={name}
                placeholder={placeholder}
                value={value}
                type={type}
                ref={ref}
                onChange={onChange}
                style={{
                    color: isMobile ? theme.color.secondaryText : theme.color.primaryText
                }}
                {...props}
            />
        </div>
    )
}

export default LabeledInput
