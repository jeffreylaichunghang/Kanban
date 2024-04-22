import { useContext, useState } from "react"
import { ThemeContext, MediaQueryContext } from "../../themes"
import useWindowDimension from "../../hooks/useWindowDimension"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { setModal } from "../../Redux/features/modal/modalSlice"

import Logo from "./Logo"
import NavbarTitle from "./Title"
import Ellipsis from '../../assets/Ellipsis'
import Button from "../Button"
import ActionModal from "../modals/ActionModal"

export default function NavBar({
    sidebar,
    setSidebar,
}) {
    const { boardList, currentBoard } = useSelector(state => state.board)
    const [actionModal, setActionModal] = useState(false)
    const { theme } = useContext(ThemeContext)
    const { layout, isMobile } = useContext(MediaQueryContext)
    const { width } = useWindowDimension()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const styles = {
        container: {
            height: layout.navbarHeight,
            width: width,
            backgroundColor: theme.color.backgroundSecondary,
            borderBottom: `1px solid ${theme.color.line}`,
            display: 'flex',
            flexDirection: 'row',
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

    const actionButtons = [
        {
            text: 'Logout',
            color: theme.color.secondaryText,
            onClick: () => {
                localStorage.removeItem('secret_token')
                navigate('/signin', { replace: true })
            },
            props: {}
        },
        {
            text: 'Edit Board',
            color: theme.color.secondaryText,
            onClick: () => {
                setActionModal(false)
                dispatch(setModal('editboard'))
            },
            props: {}
        },
        {
            text: 'Delete Board',
            color: theme.color.destructive,
            onClick: () => {
                dispatch(setModal('deleteboard'))
                setActionModal(false)
            },
            props: {}
        },
    ]

    return (
        <div style={styles.container}>
            {!isMobile && <Logo />}
            <div style={styles.content}>
                <NavbarTitle
                    board={currentBoard}
                    sidebar={sidebar}
                    setSidebar={setSidebar}
                />
                <span style={styles.buttonGroup}>
                    <Button
                        variant="primary"
                        text={isMobile ? "+" : "+ Add New Task"}
                        onClick={() => dispatch(setModal('taskmodal'))}
                        disabled={!currentBoard?.columns.length > 0}
                        style={{
                            paddingTop: isMobile ? 5 : 15,
                            paddingBottom: isMobile ? 8 : 15,
                            paddingLeft: isMobile ? 18 : 24,
                            paddingRight: isMobile ? 18 : 24,
                        }}
                    />
                    <span
                        style={styles.ellipsis}
                        onClick={() => setActionModal(true)}
                        data-test-id='navbar-ellipsis'
                    >
                        <Ellipsis />
                    </span>
                </span>
                <ActionModal
                    actionModal={actionModal}
                    setActionModal={setActionModal}
                    style={{
                        right: 24,
                        top: isMobile ? 70 : 110,
                    }}
                    actions={boardList.length > 0 ? actionButtons : actionButtons.slice(0, 1)}
                />
            </div>
        </div>
    )
}
