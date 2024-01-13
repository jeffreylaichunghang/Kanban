import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../themes";
import useApiCall from "../../hooks/useApiCall";

import Modal from ".";
import Text from "../Text";
import Ellipsis from "../../assets/Ellipsis";
import Checkbox from "../Checkbox";
import Select from "../Select";
import ActionModal from "./ActionModal";

export default function TaskCardModal({
    taskData,
    setTaskData,
    modal,
    setModal,
    setWarningModal,
    boardTasks,
    getAllBoardsData
}) {
    const [task, setTask] = useState(taskData)
    const [actionModal, setActionModal] = useState(false)
    const { value: updatedSubtask, callApi: updateSubtask } = useApiCall(`updateSubTask/${taskData?.id}`, 'PUT')
    const { value: editedTask, callApi: editTask } = useApiCall(`editTask/${taskData?.id}`, 'PUT')
    const { theme } = useContext(ThemeContext)

    useEffect(() => {
        setTask(taskData)
    }, [taskData])
    useEffect(() => {
        if (updatedSubtask || editedTask) {
            setTaskData(task)
            getAllBoardsData()
        }
    }, [updatedSubtask, editedTask])

    return (
        <Modal
            modal={modal === 'taskcard'}
            action={() => {
                if (modal === 'taskcard') setModal(false)
            }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                rowGap: 24,
            }}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                columnGap: 24,
                position: 'relative'
            }}>
                <Text
                    text={task?.task_name}
                    variant="heading"
                    size="l"
                />
                <span style={{ cursor: 'pointer' }} onClick={() => setActionModal(true)}>
                    <Ellipsis />
                </span>
                <ActionModal
                    actionModal={actionModal}
                    setActionModal={() => setActionModal(false)}
                    style={{
                        right: -80,
                        top: 40
                    }}
                >
                    <Text
                        variant="body"
                        size="l"
                        text="Edit Task"
                        color={theme.color.secondaryText}
                        style={{ cursor: 'pointer' }}
                        onClick={() => setModal('edittask')}
                    />
                    <Text
                        variant="body"
                        size="l"
                        text="Delete Task"
                        color={theme.color.destructive}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            setWarningModal({
                                show: true,
                                target: 'task'
                            })
                            setModal('')
                        }}
                    />
                </ActionModal>
            </div>
            <Text
                text={task?.description}
                color={theme.color.secondaryText}
                variant="body"
                size="l"
            />
            <Text
                variant="body"
                size="m"
                text={`Subtasks(${task?.sub_tasks.filter(t => t.status === true).length} of ${task?.sub_tasks.length})`}
            />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                rowGap: 8,
                maxHeight: 230,
                overflowY: 'scroll',
                overflowX: 'none',
            }}>
                {
                    task?.sub_tasks.map((subt, index) => {
                        return (
                            <Checkbox
                                key={subt.id}
                                item={subt}
                                onChange={() => {
                                    const newSubTask = {
                                        ...task.sub_tasks[index],
                                        status: !task.sub_tasks[index].status
                                    }
                                    setTask(prev => ({
                                        ...prev,
                                        sub_tasks: prev.sub_tasks.toSpliced(index, 1, newSubTask)
                                    }))
                                    updateSubtask([newSubTask])
                                }}
                            />
                        )
                    })
                }
            </div>
            <Select
                options={boardTasks[0]?.columns.map(col => col.column_name)}
                initialValue={boardTasks[0]?.columns.filter(col => col.id === taskData?.columnId)[0]?.column_name}
                action={(option) => {
                    const newTask = {
                        ...task,
                        columnId: boardTasks[0]?.columns.filter(col => col.column_name === option)[0].id
                    }
                    editTask(newTask)
                }}
            />
        </Modal>
    )
}
