import { useContext, useState } from "react"
import { ThemeContext, MediaQueryContext } from "../../themes"
import useWindowDimension from "../../hooks/useWindowDimension"

import { constants } from "../../constants/constants"
import LogoDark from "../../assets/LogoDark"
import LogoLight from '../../assets/LogoLight'
import LogoMobile from '../../assets/LogoMobile'
import ChevronDown from '../../assets/ChevronDown'
import ChevronUp from '../../assets/ChevronUp'
import Ellipsis from '../../assets/Ellipsis'
import Button from "../Button"
import Text from "../Text"
import ActionModal from "../modals/ActionModal"

export default function NavBar({
    board,
    setWarningModal,
    setModal,
    sidebar,
    setSidebar,
}) {
    const [actionModal, setActionModal] = useState(false)
    const { theme, themeState } = useContext(ThemeContext)
    const { layout, isMobile } = useContext(MediaQueryContext)
    const { width } = useWindowDimension()
    const styles = {
        container: {
            height: layout.navbarHeight,
            width: width,
            backgroundColor: theme.color.backgroundSecondary,
            borderBottom: `1px solid ${theme.color.line}`,
            display: 'flex',
            flexDirection: 'row',
        },
        logo: {
            width: layout.sidebarWidth,
            height: '100%',
            paddingTop: layout.logoPaddingTop,
            paddingLeft: '24px',
            borderRight: `1px solid ${theme.color.line}`,
        },
        content: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: isMobile ? '100%' : width - layout.sidebarWidth,
            padding: layout.navbarPadding,
            position: 'relative',
        },
        buttonGroup: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        ellipsis: {
            paddingLeft: 15,
            paddingTop: 10,
            paddingBottom: 10,
            cursor: 'pointer'
        }
    }
    // console.log(board)

    return (
        <div style={styles.container}>
            {!isMobile && <div style={styles.logo}>
                {themeState === 'dark' ? <LogoLight /> : <LogoDark />}
            </div>}
            <div style={styles.content}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    columnGap: 24
                }}>
                    {isMobile && <LogoMobile />}
                    <Text
                        text={board?.board_name}
                        variant="heading"
                        size={layout.boardnameSize}
                        hoverColor={theme.color.primaryText}
                    />
                    {
                        isMobile &&
                        <ChevronUp onClick={() => setSidebar(!sidebar)} />
                    }
                </div>
                <span style={styles.buttonGroup}>
                    <Button
                        variant="primary"
                        text={isMobile ? "+" : "+ Add New Task"}
                        onClick={() => setModal('taskmodal')}
                        disabled={!board?.columns.length > 0}
                        style={{
                            paddingTop: isMobile ? 5 : 15,
                            paddingBottom: isMobile ? 8 : 15,
                            paddingLeft: isMobile ? 18 : 24,
                            paddingRight: isMobile ? 18 : 24,
                        }}
                    />
                    <span style={styles.ellipsis} onClick={() => setActionModal(true)}><Ellipsis /></span>
                </span>
                <ActionModal
                    actionModal={actionModal}
                    setActionModal={setActionModal}
                    style={{
                        right: 24,
                        bottom: -90,
                    }}
                >
                    <Text
                        variant="body"
                        size="l"
                        color={theme.color.secondaryText}
                        text="Edit Board"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            setActionModal(false)
                            setModal('editboard')
                        }}
                    />
                    <Text
                        variant="body"
                        size="l"
                        color={theme.color.destructive}
                        text="Delete Board"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            setWarningModal({
                                show: true,
                                target: 'board'
                            })
                            setActionModal(false)
                        }}
                    />
                </ActionModal>
            </div>
        </div>
    )
}
