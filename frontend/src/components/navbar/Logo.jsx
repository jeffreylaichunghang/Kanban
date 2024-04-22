import { useContext } from 'react'
import { ThemeContext, MediaQueryContext } from '../../themes'

import LogoLight from '../../assets/LogoLight'
import LogoDark from '../../assets/LogoDark'

const Logo = () => {
    const { theme, themeState } = useContext(ThemeContext)
    const { layout } = useContext(MediaQueryContext)
    const styles = {
        logo: {
            width: layout.sidebarWidth,
            height: '100%',
            paddingTop: layout.logoPaddingTop,
            paddingLeft: '24px',
            borderRight: `1px solid ${theme.color.line}`,
        },
    }
    return (
        <div style={styles.logo}>
            {themeState === 'dark' ? <LogoLight /> : <LogoDark />}
        </div>
    )
}

export default Logo
