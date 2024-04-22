import WarningModal from "../../components/modals/WarningModal"
import TaskModal from "../../components/modals/TaskModal"
import BoardModal from "../../components/modals/BoardModal"

const ModalManager = () => {
    return (
        <>
            <WarningModal />
            <TaskModal />
            <BoardModal />
        </>
    )
}

export default ModalManager
