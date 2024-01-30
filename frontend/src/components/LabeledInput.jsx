import { forwardRef } from 'react'

import Input from './Input'
import Label from './Label'

const LabeledInput = ({
    label,
    name,
    placeholder,
    value,
    type,
    ref = null
}) => {
    return (
        <div>
            <Label
                text={label}
                name={name}
            />
            <Input
                name={name}
                placeholder={placeholder}
                value={value}
                type={type}
                ref={ref}
            />
        </div>
    )
}

export default LabeledInput
