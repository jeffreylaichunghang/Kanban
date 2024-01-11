import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "../../themes"
import useApiCall from "../../hooks/useApiCall"

import NavBar from "../../components/navbar/NavBar"
import Sidebar from "../../components/sidebar/Sidebar"
import BoardModal from "../../components/modals/BoardModal"

export default function TaskBoard() {
    const [allTaskData, setAllTaskData] = useState([])
    const [board, setBoard] = useState(null)
    const [modal, setModal] = useState('')
    const { theme } = useContext(ThemeContext)
    const { value, error, loading, callbackMemoized: getAllBoardsData } = useApiCall('getAllBoardsData', 'GET')
    const styles = {
        container: {
            backgroundColor: theme.color.backgroundPrimary,
            width: '100%',
            height: '100vh',
            maxHeight: '100vh',
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

    return (
        <div style={styles.container}>
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
            />
            <Sidebar
                board={board}
                setBoard={setBoard}
                allTaskData={allTaskData}
                setModal={setModal}
            />
        </div>
    )
}
