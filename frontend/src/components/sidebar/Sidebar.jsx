import { useContext, useEffect } from "react"
import { ThemeContext, MediaQueryContext } from "../../themes"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import useWindowDimension from "../../hooks/useWindowDimension"
import useApiCall from "../../hooks/useApiCall"

import SidebarButton from "./SidebarButton"
import ToggleSwitch from "../ToggleSwitch"
import Text from "../Text"
import ThemeLight from "../../assets/ThemeLight"
import ThemeDark from "../../assets/ThemeDark"
import { setBoardList, setCurrentBoard } from "../../Redux/features/board/boardSlice"
import { setModal } from "../../Redux/features/modal/modalSlice"

export default function Sidebar({
    sidebar,
    setSidebar,
}) {
    const { boardList, currentBoard } = useSelector(state => state.board)
    const dispatch = useDispatch()
    const { theme, toggleTheme, themeState } = useContext(ThemeContext)
    const { layout, isMobile } = useContext(MediaQueryContext)
    const { height } = useWindowDimension()
    const { value: allboards, callApi: getAllboards } = useApiCall('boards')
    const styles = {
        container: {
            position: 'absolute',
            top: isMobile ? layout.navbarHeight + 16 : layout.navbarHeight - 2,
            left: 0,
            right: isMobile ? 0 : '',
            margin: 'auto',
            paddingBottom: isMobile ? 16 : 90,
            width: layout.sidebarWidth,
            height: isMobile ? '' : height - layout.navbarHeight + 1,
            backgroundColor: theme.color.backgroundSecondary,
            borderRight: `1px solid ${theme.color.line}`,
            borderTop: `1px solid transparent`,
            borderRadius: isMobile ? 8 : 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            zIndex: 2,
        },
        boardBtns: {
            width: '110%',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            maxHeight: height - layout.navbarHeight + 100,
            overflowY: 'scroll',
            overflowX: 'none'
        },
        sidebarBtn: {
            position: 'absolute',
            width: sidebar ? layout.sidebarButtonWidth : 56,
            height: 48,
            bottom: 32,
            paddingLeft: sidebar ? layout.sidebarPadding : 16,
            zIndex: 3
        }
    }

    useEffect(() => getAllboards(), [])
    useEffect(() => {
        if (allboards) {
            dispatch(setBoardList(allboards))
            dispatch(setCurrentBoard(allboards[0]))
        }
    }, [allboards])

    const boardButtonElements = boardList.map(board => {
        return (
            <SidebarButton
                key={board?.id}
                icon={'boardIcon'}
                text={board?.board_name}
                onClick={() => dispatch(setCurrentBoard(board))}
                buttonColor={currentBoard?.board_name === board?.board_name ? theme.color.primary : 'transparent'}
                buttonHoverColor={currentBoard?.board_name === board?.board_name ? theme.color.primaryHover : theme.color.secondary}
                iconColor={currentBoard?.board_name === board?.board_name ? theme.color.white : theme.color.secondaryText}
                iconHoverColor={currentBoard?.board_name === board?.board_name ? theme.color.white : theme.color.primary}
                testId="board-button"
            />
        )
    })

    const sidebarVariant = {
        mobile: {
            display: sidebar ? 'block' : 'none',
            opacity: sidebar ? 1 : 0,
        },
        notMobile: {
            x: sidebar ? 0 : '-100%'
        }
    }

    return (
        <>
            <motion.div
                animate={isMobile ? 'mobile' : 'notMobile'}
                variants={sidebarVariant}
                transition={{ type: 'just' }}
                style={styles.container}
                data-test-id='sidebar'
            >
                <Text
                    variant="body"
                    size="m"
                    text={`ALL BOARDS (${boardList.length})`}
                    color={theme.color.secondaryText}
                    style={{
                        paddingLeft: layout.sidebarPadding,
                        marginBottom: 19,
                        marginTop: 15,
                    }}
                />
                <div style={styles.boardBtns}>
                    {boardButtonElements}
                    <SidebarButton
                        icon={'boardIcon'}
                        text="+ Create New Board"
                        buttonColor={'transparent'}
                        buttonHoverColor={'transparent'}
                        iconColor={theme.color.primary}
                        iconHoverColor={theme.color.primaryHover}
                        onClick={() => dispatch(setModal('newboard'))}
                        testId="new-board-button"
                    />
                </div>
                <div style={{ width: layout.sidebarWidth * 0.85, margin: 'auto' }}>
                    <ToggleSwitch
                        leftLabel={<ThemeLight />}
                        rightLabel={<ThemeDark />}
                        onClick={toggleTheme}
                        defaultValue={themeState === 'light'}
                    />
                </div>
            </motion.div>
            {!isMobile && <SidebarButton
                onClick={() => { setSidebar(!sidebar) }}
                icon={sidebar ? 'hideIcon' : 'showIcon'}
                text={sidebar ? 'Hide Sidebar' : ''}
                buttonColor={sidebar ? 'transparent' : theme.color.mainPurple}
                buttonHoverColor={sidebar ? theme.color.secondary : theme.color.primaryHover}
                iconColor={sidebar ? theme.color.secondaryText : theme.color.white}
                iconHoverColor={sidebar ? theme.color.mainPurple : theme.color.white}
                style={styles.sidebarBtn}
                testId="sidebar-toggle-button"
            />}
        </>
    )
}
