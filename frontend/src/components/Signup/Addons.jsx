import { useContext, useState, useRef } from 'react'
import { ThemeContext } from '../../themes'
import { motion } from 'framer-motion'
import useHover from '../../hooks/useHover'

import Text from '../Text'

function Addons({
    text,
    subText,
    price,
    onChange = () => true,
}) {
    const [check, setCheck] = useState(false)
    const { theme } = useContext(ThemeContext)
    const addonRef = useRef()
    const hovered = useHover(addonRef)
    let borderColor;
    if (check) {
        borderColor = hovered ? theme.color.primaryHover : theme.color.primary
    } else {
        borderColor = hovered ? theme.color.primary : theme.color.borderLine
    }

    return (
        <motion.button
            ref={addonRef}
            style={{
                padding: 20,
                border: `1px solid ${borderColor}`,
                borderRadius: 10,
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'center',
                cursor: 'pointer',
                backgroundColor: check ? theme.color.backgroundPrimary : 'transparent',
            }}
            onClick={() => {
                setCheck(!check)
            }}
            whileTap={{ scale: 0.98 }}
        >
            <label>
                <span style={{
                    position: 'absolute',
                    marginLeft: 3,
                    fontSize: 13
                }}>{check ? String.fromCharCode(0x2713) : ''}</span>
                <input
                    value={check}
                    type="checkbox"
                    onChange={() => {
                        setCheck(!check)
                        onChange()
                    }}
                    style={{
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        width: 16,
                        aspectRatio: 1 / 1,
                        borderRadius: '0.15em',
                        outline: 'none',
                        border: '1px solid rgba(130, 143, 163, 0.25)',
                        cursor: 'pointer',
                        backgroundColor: check ? theme.color.mainPurple : theme.color.backgroundSecondary,
                    }}
                />
            </label>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: 10,
                    textAlign: 'left',
                    marginLeft: 20,
                }}
            >
                <Text
                    variant='body'
                    size='m'
                    text={text}
                    color={theme.color.primaryText}
                />
                <Text
                    variant='body'
                    size='m'
                    text={subText}
                    color={theme.color.secondaryText}
                />
            </div>
            <Text
                variant='body'
                size='m'
                text={`+$${price}/mo`}
                color={theme.color.primary}
                style={{
                    marginLeft: 'auto'
                }}
            />
        </motion.button>
    )
}

export default Addons
