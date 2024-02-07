import { useContext, useState } from "react"
import { ThemeContext } from "../../themes"
import useWindowDimension from "../../hooks/useWindowDimension"

import Taskboard from "../../components/taskboard/Taskboard"
import NavBar from "../../components/navbar/NavBar"
import Sidebar from "../../components/sidebar/Sidebar"
import BoardModal from "../../components/modals/BoardModal"
import WarningModal from "../../components/modals/WarningModal"
import TaskCardModal from "../../components/modals/TaskCardModal"
import TaskModal from "../../components/modals/TaskModal"

export default function KanbanBoard() {
    const [board, setBoard] = useState(null)
    const [modal, setModal] = useState('')
    const [warningModal, setWarningModal] = useState({ show: false })
    const [sidebar, setSidebar] = useState(true)
    const { theme } = useContext(ThemeContext)
    const { width, height } = useWindowDimension()
    const styles = {
        container: {
            backgroundColor: theme.color.backgroundPrimary,
            width: width,
            height: height,
            maxHeight: height,
            overFlowY: 'none',
            overflowX: 'scroll',
            padding: 0,
        }
    }

    return (
        <div style={styles.container}>
            <WarningModal
                warningModal={warningModal}
                setWarningModal={setWarningModal}
                board={board}
                setBoard={setBoard}
            />
            <TaskModal
                modal={modal}
                setModal={setModal}
            />
            <TaskCardModal
                modal={modal}
                setModal={setModal}
                setWarningModal={setWarningModal}
            />
            <BoardModal
                board={board}
                setBoard={setBoard}
                modal={modal}
                setModal={setModal}
            />
            <NavBar
                board={board}
                setWarningModal={setWarningModal}
                setModal={setModal}
                sidebar={sidebar}
                setSidebar={setSidebar}
            />
            <Sidebar
                board={board}
                setBoard={setBoard}
                setModal={setModal}
                sidebar={sidebar}
                setSidebar={setSidebar}
            />
            {board && <Taskboard
                sidebar={sidebar}
                board={board}
                setModal={setModal}
            />}
        </div>
    )
}
