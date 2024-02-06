import { useContext, useEffect, useMemo, useState } from "react"
import { ThemeContext } from "../../themes"
import useApiCall from "../../hooks/useApiCall"
import useWindowDimension from "../../hooks/useWindowDimension"

import Taskboard from "../../components/taskboard/Taskboard"
import NavBar from "../../components/navbar/NavBar"
import Sidebar from "../../components/sidebar/Sidebar"
import BoardModal from "../../components/modals/BoardModal"
import WarningModal from "../../components/modals/WarningModal"
import TaskCardModal from "../../components/modals/TaskCardModal"
import TaskModal from "../../components/modals/TaskModal"

export default function KanbanBoard() {
    const [allTaskData, setAllTaskData] = useState([])
    const [taskData, setTaskData] = useState(null)
    const [board, setBoard] = useState(null)
    const [modal, setModal] = useState('')
    const [warningModal, setWarningModal] = useState({ show: false })
    const [sidebar, setSidebar] = useState(true)
    const { theme } = useContext(ThemeContext)
    const { value, error, loading, callApi: getAllBoardsData } = useApiCall('getAllBoardsData', 'GET')
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

    useEffect(() => { getAllBoardsData() }, [])
    useEffect(() => {
        if (value) {
            // console.log(value)
            setAllTaskData(value)
            if (!board) {
                setBoard(value[0])
            } else {
                setBoard(board)
            }
        }
    }, [value, board])

    // const boardTasks = allTaskData?.filter(data => data.id === board?.id)
    const boardTasks = useMemo(() => allTaskData?.filter(data => data.id === board?.id), [board, allTaskData])

    return (
        <div style={styles.container}>
            <WarningModal
                warningModal={warningModal}
                setWarningModal={setWarningModal}
                board={board}
                setBoard={setBoard}
                taskData={taskData}
                getAllBoardsData={getAllBoardsData}
            />
            <TaskModal
                modal={modal}
                setModal={setModal}
                taskData={taskData}
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
                allTaskData={allTaskData}
                getAllBoardsData={getAllBoardsData}
            />
            <NavBar
                board={board}
                setWarningModal={setWarningModal}
                setModal={setModal}
                sidebar={sidebar}
                setSidebar={setSidebar}
            />
            <Sidebar
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
