
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
                onChange={onChange}
            />
        </div>
    )
}

export default LabeledInput
