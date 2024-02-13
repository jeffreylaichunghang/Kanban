import { useContext } from "react"
import { ThemeContext, MediaQueryContext } from '../../themes/index'
import { motion } from "framer-motion"

import signup_sidebar_mobile from '../../assets/signup-sidebar-mobile.svg'
import signup_sidebar_desktop from '../../assets/signup-sidebar-desktop.svg'
import Text from "../../components/Text"

export default function Sidebar({
    step,
    setStep,
}) {
    const { theme } = useContext(ThemeContext)
    const { layout, isMobile } = useContext(MediaQueryContext)
    const commonButtonStyle = {
        backgroundColor: 'transparent',
        border: 'none',
        // cursor: 'pointer',
        textAlign: 'left',
    }
    const styles = {
        desktop: {
            display: 'flex',
            alignItems: 'center',
            columnGap: 15,
            ...commonButtonStyle
        },
        mobile: {
            ...commonButtonStyle
        }
    }

    return (
        <div
            style={{
                backgroundImage: `url("${isMobile ? signup_sidebar_mobile : signup_sidebar_desktop}")`,
                width: layout.signupSidebarWidth,
                height: isMobile ? layout.signupSidebarHeight : '100%',
                borderTopRightRadius: 15,
                borderTopLeftRadius: 15,
                borderBottomLeftRadius: isMobile ? 0 : 15,
                borderBottomRightRadius: isMobile ? 0 : 15,
                padding: 30,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'row' : 'column',
                    rowGap: 30,
                    justifyContent: isMobile ? 'center' : 'start',
                    columnGap: 30,
                }}
            >
                {
                    ['YOUR INFO', 'SELECT PLAN', 'ADD-ONS', 'SUMMARY'].map((item, index) => {
                        const isCurrentstep = step === index + 1
                        const buttonStyle = isMobile ? styles.mobile : styles.desktop
                        return (
                            <motion.div
                                key={`step_${index}`}
                                type="button"
                                style={{
                                    ...buttonStyle
                                }}
                                // onClick={() => setStep(index + 1)}
                                whileTap={{ scale: 0.98 }}
                            >
                                <motion.div
                                    style={{
                                        border: isCurrentstep ? 'none' : '1px solid white',
                                        display: 'grid',
                                        placeItems: 'center',
                                        width: isCurrentstep ? 45 : 40,
                                        aspectRatio: 1 / 1,
                                        borderRadius: '50%',
                                        backgroundColor: isCurrentstep ? theme.color.white : 'transparent',
                                    }}
                                    layout
                                >
                                    <Text
                                        variant="heading"
                                        size="m"
                                        text={index + 1}
                                        color={isCurrentstep ? theme.color.secondaryText : theme.color.white}
                                        style={{
                                            display: 'inline-block',
                                        }}
                                    />
                                </motion.div>
                                {!isMobile && <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    rowGap: 5,
                                }}>
                                    <Text
                                        variant="heading"
                                        size="m"
                                        text={`STEP ${index + 1}`}
                                        color={theme.color.backgroundPrimary}
                                    />
                                    <Text
                                        variant="heading"
                                        size="l"
                                        text={item}
                                        color={theme.color.white}
                                        style={{
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                        }}
                                    />
                                </div>}
                            </motion.div>
                        )
                    })
                }
            </div>
        </div>
    )
}
