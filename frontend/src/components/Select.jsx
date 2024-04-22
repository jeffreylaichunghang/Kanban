import { useContext, useEffect, useRef, useState } from 'react'
import { ThemeContext, MediaQueryContext } from '../themes'
import useHover from '../hooks/useHover'
import { motion } from 'framer-motion'
import OutsideAlerter from '../hooks/useOutsideAlerter'

import Chevron from '../assets/ChevronDown'
import Text from './Text'

export default function Select({
    options,
    initialValue,
    action = () => true,
}) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(initialValue)
    const selectRef = useRef()
    const hovered = useHover(selectRef)
    const { theme } = useContext(ThemeContext)
    const { layout } = useContext(MediaQueryContext)

    useEffect(() => {
        if (initialValue) {
            setValue(initialValue)
        }
    }, [initialValue])

    return (
        <OutsideAlerter action={() => setOpen(false)}>
            <motion.button
                ref={selectRef}
                type='button'
                style={{
                    width: '100%',
                    paddingTop: 8,
                    paddingBottom: 8,
                    paddingLeft: 16,
                    paddingRight: 16,
                    border: `1px solid ${hovered ? theme.color.primary : theme.color.line}`,
                    borderRadius: 4,
                    backgroundColor: 'transparent'
                }}
                onClick={() => setOpen(!open)}
                whileTap={{ scale: 0.97 }}
                animate={open ? 'open' : 'closed'}
            >
                <motion.div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Text
                        variant='body'
                        size='l'
                        text={value}
                        hoverColor={theme.color.primaryText}
                    />
                    <motion.span
                        variants={{
                            open: { rotate: 180 },
                            closed: { rotate: 0 }
                        }}
                        transition={{ duration: 0.2 }}
                        style={{ originY: 0.55 }}
                    >
                        <Chevron />
                    </motion.span>
                </motion.div>
                <motion.div
                    style={{
                        position: 'absolute',
                        backgroundColor: theme.color.backgroundPrimary,
                        width: layout.modalWidth - 32 * 2,
                        left: 0,
                        right: 0,
                        margin: 'auto',
                        marginTop: 15,
                        padding: 16,
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: 8,
                        borderRadius: 8,
                        textAlign: 'left',
                    }}
                    variants={{
                        open: {
                            clipPath: "inset(0% 0% 0% 0% round 8px)",
                            transition: {
                                type: "spring",
                                bounce: 0,
                                duration: 0.7,
                                delayChildren: 0.4,
                                staggerChildren: 0.05
                            }
                        },
                        closed: {
                            clipPath: "inset(10% 50% 90% 50% round 8px)",
                            transition: {
                                type: "spring",
                                bounce: 0,
                                duration: 0.3
                            }
                        }
                    }}
                >
                    {
                        options?.map((option, index) => {
                            return (
                                <motion.li
                                    key={`option_${index}`}
                                    style={{
                                        listStyle: 'none'
                                    }}
                                    variants={{
                                        open: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { type: "spring", stiffness: 300, damping: 24 }
                                        },
                                        closed: {
                                            opacity: 0,
                                            y: 20,
                                            transition: { duration: 0.2 }
                                        }
                                    }}
                                >
                                    <Text
                                        variant='body'
                                        size='l'
                                        text={option}
                                        color={theme.color.secondaryText}
                                        hoverColor={theme.color.mainPurple}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            setValue(option)
                                            action(option)
                                        }}
                                    />
                                </motion.li>
                            )
                        })
                    }
                </motion.div>
            </motion.button>
        </OutsideAlerter>
    )
}
