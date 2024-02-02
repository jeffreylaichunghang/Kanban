import { useContext } from "react"
import { ThemeContext, MediaQueryContext } from "../../themes"
import useWindowDimension from "../../hooks/useWindowDimension"

import desktopBgImage from '../../assets/bg-intro-desktop.png'
import IntroSection from "./IntroSection"
import SigninForm from "./SigninForm"
import Text from "../../components/Text"

export default function SigninPage() {
    const { theme } = useContext(ThemeContext)
    const { layout, isMobile } = useContext(MediaQueryContext)
    const { width, height } = useWindowDimension()

    return (
        <div
            style={{
                backgroundColor: theme.color.backgroundPrimary,
                width: width,
                height: height,
                position: 'relative',
                overflow: 'none',
                backgroundImage: `url(${desktopBgImage})`,
                display: 'grid',
                placeContent: 'center'
            }}
        >
            <div style={{
                width: layout.signinFormWidth,
                height: layout.signinFormHeight,
                display: 'flex',
                flexDirection: isMobile ? 'column' : "row",
                gap: isMobile ? 0 : 32,
            }}>
                <IntroSection />
                <div
                    style={{
                        width: isMobile ? '100%' : '50%',
                        backgroundColor: theme.color.backgroundSecondary,
                        boxShadow: '0px 10px 15px black',
                        padding: 32,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        margin: 'auto',
                        rowGap: 32,
                        borderRadius: 15,
                    }}
                >
                    <Text
                        variant="heading"
                        size="xl"
                        text="Sign In"
                        color={theme.color.mainPurple}
                        hoverColor={theme.color.mainPurple}
                        style={{ textAlign: 'center' }}
                    />
                    <SigninForm />
                </div>
            </div>
        </div>
    )
}
