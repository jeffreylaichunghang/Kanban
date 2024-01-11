import { useContext, useState } from "react"
import { ThemeContext } from "../../themes"
import useWindowDimension from "../../hooks/useWindowDimension"

import { constants } from "../../constants/constants"
import LogoDark from "../../assets/LogoDark"
import LogoLight from '../../assets/LogoLight'
import Ellipsis from '../../assets/Ellipsis'
import Button from "../Button"
import Text from "../Text"
import ActionModal from "../modals/ActionModal"

export default function NavBar({
    board
}) {
    const [actionModal, setActionModal] = useState(false)
    const { theme, themeState } = useContext(ThemeContext)
    const { width } = useWindowDimension()
    const styles = {
        container: {
            height: constants.navbarHeight,
            width: width,
            backgroundColor: theme.color.backgroundSecondary,
            borderBottom: `1px solid ${theme.color.line}`,
            display: 'flex',
            flexDirection: 'row',
        },
        logo: {
            width: constants.sidebarWidth,
            height: '100%',
            paddingTop: '34px',
            paddingLeft: '34px',
            borderRight: `1px solid ${theme.color.line}`,
        },
        content: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: width - constants.sidebarWidth,
            padding: 32,
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

    return (
        <div style={styles.container}>
            <div style={styles.logo}>
                {themeState === 'dark' ? <LogoLight /> : <LogoDark />}
            </div>
            <div style={styles.content}>
                <Text
                    text={board?.board_name}
                    variant="heading"
                    size="xl"
                />
                <span style={styles.buttonGroup}>
                    <Button
                        variant="primary"
                        text="+ Add New Task"
                        onClick={() => console.log('create task')}
                    />
                    <span style={styles.ellipsis} onClick={() => setActionModal(true)}><Ellipsis /></span>
                </span>
                <ActionModal
                    actionModal={actionModal}
                    setActionModal={setActionModal}
                >
                    <Text
                        variant="body"
                        size="l"
                        color={theme.color.secondaryText}
                        text="Edit Board"
                        style={{ cursor: 'pointer' }}
                    />
                    <Text
                        variant="body"
                        size="l"
                        color={theme.color.destructive}
                        text="Delete Board"
                        style={{ cursor: 'pointer' }}
                    />
                </ActionModal>
            </div>
        </div>
    )
}
