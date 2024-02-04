import { useContext } from 'react'
import { MediaQueryContext, ThemeContext } from '../themes'
import { useFormContext } from 'react-hook-form'

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
    const { register } = useFormContext()
    const registerOptions = {
        'name': {
            required: 'name is required'
        },
        'email': {
            required: 'email is required',
            pattern: {
                value: /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/,
                message: 'wrong email format'
            },
        },
        'password': {
            required: 'password is required',
            minLength: {
                value: 7,
                message: 'password shorter than 7'
            },
            maxLength: {
                value: 15,
                message: 'password longer than 15'
            },
            // validate: {
            //     includeNumber: v => v.match(/\d/) || 'at least one digit',
            //     includeString: v => v.match(/[a-zA-Z]/) || 'at least one letter',
            //     includeCaptitalLetter: v => v.match(/[A-Z]/) || 'at least one capital letter',
            //     includeSmallLetter: v => v.match(/[a-z]/) || 'at least one small letter'
            // },
        }
    }
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
                {...register(name, registerOptions[name])}
            />
        </div>
    )
}

export default LabeledInput
