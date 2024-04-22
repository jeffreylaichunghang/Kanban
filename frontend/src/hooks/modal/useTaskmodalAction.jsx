import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useApiCall from '../useApiCall'

import { constants } from '../../constants/constants'
import { addNewTask, moveTaskAcrossColumns } from '../../Redux/features/columns/columnSlice'
import { setModal } from '../../Redux/features/modal/modalSlice'
import { setTaskdata } from '../../Redux/features/task/taskSlice'

const useTaskmodalAction = () => {
    const [task, setTask] = useState(null)
    const activeTask = useSelector(state => state.task.activeTask)
    const columnList = useSelector(state => state.column.columnList)
    const modal = useSelector(state => state.modal.value)
    const { value: createdTask, callApi: createTask } = useApiCall('createTask', 'POST')
    const { value: editedTask, callApi: editTask } = useApiCall(`editTask/${activeTask?.id}`, 'PUT')
    const dispatch = useDispatch()

    useEffect(() => {
        modal === 'taskmodal' ? setTask({
            task_name: '',
            description: '',
            columnId: columnList[0]?.id,
            sub_tasks: constants.subtaskSuggestion.slice(0, 2).map(sug => {
                return {
                    sub_task_name: '',
                    status: false,
                    placeholder: sug
                }
            })
        }) : setTask(activeTask)
    }, [activeTask, modal, columnList])

    useEffect(() => {
        if (createdTask) {
            dispatch(addNewTask(createdTask))
        }
        dispatch(setModal(''))
    }, [createdTask, dispatch])
    useEffect(() => {
        if (editedTask) {
            dispatch(setTaskdata(editedTask))
            dispatch(moveTaskAcrossColumns({ task: editedTask, columnId: activeTask.columnId }))
        }
        dispatch(setModal(''))
    }, [editedTask, dispatch])

    const onsubmit = () => {
        console.log(modal, task)
        modal === 'taskmodal' ? createTask(task) : editTask(task)
    }

    return { task, setTask, onsubmit }
}

export default useTaskmodalAction
