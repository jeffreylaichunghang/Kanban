import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "../../themes"
import useApiCall from "../../hooks/useApiCall"

import NavBar from "../../components/navbar/NavBar"
import Sidebar from "../../components/sidebar/Sidebar"
import BoardModal from "../../components/modals/BoardModal"

export default function TaskBoard() {
    const [allTaskData, setAllTaskData] = useState([])
    const [board, setBoard] = useState(null)
    const { theme } = useContext(ThemeContext)
    const { value, error, loading, callbackMemoized } = useApiCall('getAllBoardsData', 'GET')
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

    useEffect(() => {
        if (value) {
            // console.log(value)
            setAllTaskData(value)
            setBoard(value[0])
        }
    }, [value])

    return (
        <div style={styles.container}>
            <BoardModal />
            <NavBar
                board={board}
            />
            <Sidebar
                board={board}
                setBoard={setBoard}
                allTaskData={allTaskData}
            />
        </div>
    )
}
