import { useContext } from 'react'
import { ThemeContext, MediaQueryContext } from '../../themes'

import LogoMobile from '../../assets/LogoMobile'
import Text from '../Text'
import ChevronUp from '../../assets/ChevronUp'

const NavbarTitle = ({
    board,
    setSidebar,
    sidebar
}) => {
    const { theme } = useContext(ThemeContext)
    const { layout, isMobile } = useContext(MediaQueryContext)

    const toggleSidebar = () => {
        setSidebar(!sidebar)
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                columnGap: 24
            }}
            data-test-id='navbar-title'
        >
            {isMobile && <LogoMobile />}
            <Text
                text={board?.board_name}
                variant="heading"
                size={layout.boardnameSize}
                hoverColor={theme.color.primaryText}
                onClick={isMobile ? toggleSidebar : () => true}
            />
            {
                isMobile &&
                <ChevronUp
                    onClick={toggleSidebar}
                    rotateUp={sidebar}
                />
            }
        </div>
    )
}

export default NavbarTitle
