import { useContext } from "react";
import { ThemeContext } from "../../themes";
import { useSelector, useDispatch } from "react-redux";
import useWarningmodalAction from "../../hooks/modal/useWarningmodalAction";

import Modal from ".";
import Text from "../Text";
import Button from "../Button";
import { setModal } from "../../Redux/features/modal/modalSlice";

export default function WarningModal() {
    const { deleteboard, deleteTask } = useWarningmodalAction()
    const activeTask = useSelector(state => state.task.activeTask)
    const { currentBoard } = useSelector(state => state.board)
    const modal = useSelector(state => state.modal.value)
    const dispatch = useDispatch()
    const { theme } = useContext(ThemeContext)

    let target = {
        type: '',
        message: ''
    };
    if (modal) {
        switch (modal) {
            case 'deleteboard':
                target.type = 'board',
                    target.message = `Are you sure you want to delete the ‘${currentBoard?.board_name}’ board? This action will remove all columns and tasks and cannot be reversed.`
                break;
            case 'deletetask':
                target.type = 'task',
                    target.message = `Are you sure you want to delete the ‘${activeTask?.task_name}’ task? This action will remove all subtasks and cannot be reversed.`
                break;

            default:
                break;
        }
    }

    return (
        <Modal
            modal={modal === 'deleteboard' || modal === 'deletetask'}
            action={() => {
                if (modal === 'deleteboard' || modal === 'deletetask') {
                    dispatch(setModal(''))
                }
            }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                rowGap: 24,
            }}
        >
            <Text
                variant="heading"
                size="l"
                text={`Delete this ${target.type}?`}
                color={theme.color.destructive}
            />
            <Text
                variant="body"
                size="l"
                text={`${target.message}`}
                color={theme.color.secondaryText}
            />
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    columnGap: 16
                }}
            >
                <Button
                    text="Delete"
                    variant="destructive"
                    style={{
                        width: '100%'
                    }}
                    onClick={() => {
                        if (target.type === 'board') {
                            deleteboard()
                        } else if (target.type === 'task') {
                            deleteTask()
                        }
                    }}
                />
                <Button
                    text="Cancel"
                    variant="secondary"
                    style={{
                        width: '100%'
                    }}
                    onClick={() => dispatch(setModal(''))}
                />
            </div>
        </Modal>
    )
}
