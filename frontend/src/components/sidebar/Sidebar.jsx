import { useContext, useEffect, useMemo, useState } from "react"
import { ThemeContext, MediaQueryContext } from "../../themes"
import useWindowDimension from "../../hooks/useWindowDimension"
import { motion } from "framer-motion"

import { constants } from "../../constants/constants"
import SidebarButton from "./SidebarButton"
import ThemeToggleButton from "./ThemeToggleButton"
import Text from "../Text"

export default function Sidebar({
    board,
    setBoard,
    allTaskData,
    setModal,
    sidebar,
    setSidebar,
}) {
    const [activeBoard, setActiveBoard] = useState(null)
    const [boardList, setBoardList] = useState([])
    const { theme } = useContext(ThemeContext)
    const { layout, isMobile } = useContext(MediaQueryContext)
    const { height } = useWindowDimension()
    const styles = {
        container: {
            position: 'absolute',
            top: isMobile ? layout.navbarHeight + 16 : layout.navbarHeight - 1,
            left: 0,
            right: isMobile ? 0 : '',
            margin: 'auto',
            width: layout.sidebarWidth,
            height: isMobile ? '' : height - layout.navbarHeight + 1,
            backgroundColor: theme.color.backgroundSecondary,
            borderRight: `1px solid ${theme.color.line}`,
            borderTop: `1px solid transparent`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingBottom: isMobile ? 16 : 90,
            zIndex: 2
        },
        boardBtns: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            maxHeight: height - layout.navbarHeight + 100,
            overflowY: 'scroll',
            overflowX: 'none'
        },
        sidebarBtn: {
            position: 'absolute',
            width: sidebar ? layout.sidebarWidth : 56,
            height: 48,
            bottom: 32,
            paddingLeft: sidebar ? layout.sidebarPadding : 16,
            zIndex: 3
        }
    }

    useEffect(() => {
        setBoardList(allTaskData)
        setActiveBoard(board)
    }, [allTaskData, board])

    const boardButtonElements = boardList.map(board => {
        return (
            <SidebarButton
                key={board?.id}
                icon={'boardIcon'}
                text={board?.board_name}
                onClick={() => {
                    setActiveBoard(board)
                    setBoard(board)
                }}
                buttonColor={activeBoard?.board_name === board?.board_name ? theme.color.primary : 'transparent'}
                buttonHoverColor={activeBoard?.board_name === board?.board_name ? theme.color.primaryHover : theme.color.secondary}
                iconColor={activeBoard?.board_name === board?.board_name ? theme.color.white : theme.color.secondaryText}
                iconHoverColor={activeBoard?.board_name === board?.board_name ? theme.color.white : theme.color.primary}
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
                        onClick={() => setModal('newboard')}
                    />
                </div>
                <ThemeToggleButton />
            </motion.div>
            {!isMobile && <SidebarButton
                onClick={(e) => { setSidebar(!sidebar) }}
                icon={sidebar ? 'hideIcon' : 'showIcon'}
                text={sidebar ? 'Hide Sidebar' : ''}
                buttonColor={sidebar ? 'transparent' : theme.color.mainPurple}
                buttonHoverColor={sidebar ? theme.color.secondary : theme.color.primaryHover}
                iconColor={sidebar ? theme.color.secondaryText : theme.color.white}
                iconHoverColor={sidebar ? theme.color.mainPurple : theme.color.white}
                style={styles.sidebarBtn}
            />}
        </>
    )
}
