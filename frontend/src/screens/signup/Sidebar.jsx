import { useContext } from "react"
import { ThemeContext, MediaQueryContext } from '../../themes/index'

import signup_sidebar_mobile from '../../assets/signup-sidebar-mobile.svg'
import signup_sidebar_desktop from '../../assets/signup-sidebar-desktop.svg'

export default function Sidebar() {
    const { theme } = useContext(ThemeContext)
    const { layout, isMobile } = useContext(MediaQueryContext)

    return (
        <div
            style={{
                backgroundImage: `url(${isMobile ? signup_sidebar_mobile : signup_sidebar_desktop})`,
                width: layout.signupSidebarWidth,
                height: isMobile ? layout.signupSidebarHeight : '100%',
                borderTopRightRadius: 15,
                borderTopLeftRadius: 15,
                borderBottomLeftRadius: isMobile ? 0 : 15,
                borderBottomRightRadius: isMobile ? 0 : 15,
            }}
        >

        </div>
    )
}
