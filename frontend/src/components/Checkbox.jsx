import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../themes";
import useHover from "../hooks/useHover";
import { motion } from "framer-motion";

import Text from "./Text";

export default function Checkbox({
    item,
    onChange = () => true,
}) {
    const { theme } = useContext(ThemeContext)
    const [check, setCheck] = useState(false)
    const checkboxRef = useRef()
    const hovered = useHover(checkboxRef)

    useEffect(() => {
        setCheck(item.status)
    }, [item])

    return (
        <motion.button
            ref={checkboxRef}
            onClick={() => {
                setCheck(!check)
                onChange()
            }}
            whileTap={{ scale: 0.97 }}
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                columnGap: 16,
                padding: 12,
                backgroundColor: hovered ? theme.color.backgroundPrimaryHover : theme.color.backgroundPrimary,
                borderRadius: 4,
                cursor: 'pointer',
                border: 'none',
                textAlign: 'left'
            }}>
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
            <Text
                variant="body"
                size="m"
                color={check ? theme.color.secondaryText : theme.color.primaryText}
                text={item.sub_task_name}
                style={{
                    textDecoration: check ? 'line-through' : ' none'
                }}
            />
        </motion.button>
    )
}
