import { Fragment, useEffect, useState } from "react"
import useApiCall from "../../hooks/useApiCall"
import { useSelector, useDispatch } from "react-redux"

import Modal from "."
import Label from "../Label"
import Text from "../Text"
import Input from "../Input"
import InputItem from "../InputItem"
import Button from "../Button"
import Select from "../Select"
import Textarea from "../Textarea"
import { constants } from "../../constants/constants"
import { addNewTask, moveTaskAcrossColumns } from "../../Redux/features/columns/columnSlice"
import { setTaskdata } from "../../Redux/features/task/taskSlice"

export default function TaskModal({
    modal,
    setModal,
}) {
    const [task, setTask] = useState(null)
    const activeTask = useSelector(state => state.task.activeTask)
    const columnList = useSelector(state => state.column.columnList)
    const dispatch = useDispatch()
    const { value: createdTask, callApi: createTask } = useApiCall('createTask', 'POST')
    const { value: editedTask, callApi: editTask } = useApiCall(`editTask/${activeTask?.id}`, 'PUT')

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
        setModal('')
    }, [createdTask, dispatch])
    useEffect(() => {
        if (editedTask) {
            dispatch(setTaskdata(editedTask))
            dispatch(moveTaskAcrossColumns({ task: editedTask, columnId: activeTask.columnId }))
        }
        setModal('')
    }, [editedTask, dispatch])

    const validateTaskInfo = (info) => {
        let valid = true
        let infoToValidate = JSON.parse(JSON.stringify(info))

        for (const key in info) {
            const value = info[key]
            let validation = { valid: true, message: '' }

            if (key === 'task_name') {
                if (value === '') {
                    valid = false
                    validation.valid = false
                    validation.message = 'Can \'t be empty'
                }
                infoToValidate.validTaskname = validation
            }
            if (key === 'sub_tasks') {
                value.forEach((subtask, index) => {
                    if (subtask.sub_task_name === '') {
                        valid = false
                        validation.valid = false
                        validation.message = 'Can \'t be empty'
                    } else {
                        validation = { valid: true, message: '' }
                    }
                    infoToValidate.sub_tasks[index].validSubtask = validation
                })
            }
        }
        setTask(infoToValidate)
        return valid
    }

    const onsubmit = () => {
        if (!validateTaskInfo(task)) return
        if (modal === 'taskmodal') {
            console.log('create task', task)
            createTask(task)
        } else if (modal === 'edittask') {
            console.log('edit task', task)
            editTask(task)
        }
    }

    return (
        <Modal
            modal={modal === 'taskmodal' || modal === 'edittask'}
            action={() => {
                if (modal === 'taskmodal' || modal === 'edittask') setModal('')
            }}
            style={{ rowGap: 24 }}
        >
            <Text
                variant="heading"
                size="l"
                text={modal === 'taskmodal' ? 'Add New Task' : 'Edit Task'}
            />
            <div>
                <Label
                    name="title"
                    text={'Title'}
                />
                <Input
                    name="title"
                    placeholder={modal === 'taskmodal' ? 'e.g. Take coffee break' : ''}
                    value={task?.task_name}
                    onChange={(e) => setTask(prev => ({
                        ...prev,
                        task_name: e.target.value
                    }))}
                    validation={task?.validTaskname}
                />
            </div>
            <div>
                <Label
                    name="description"
                    text={'Description'}
                />
                <Textarea
                    placeholder={modal === 'taskmodal' ? 'e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.' : ''}
                    value={task?.description}
                    onChange={(value) => setTask(prev => ({
                        ...prev,
                        description: value
                    }))}
                />
            </div>
            <div>
                <Label
                    name="subtasks"
                    text={'Subtasks'}
                />
                <div style={{
                    maxHeight: 140,
                    overflowX: 'none',
                    overflowY: 'scroll'
                }}>
                    {
                        task?.sub_tasks.map((subtask, index) => {
                            return (
                                <Fragment key={modal === 'edittask' ? subtask.id : index}>
                                    <InputItem
                                        // key={subtask.id}
                                        name={`subtask_${subtask.id || index}`}
                                        value={subtask.sub_task_name}
                                        placeholder={modal === 'taskmodal' ? subtask.placeholder : ''}
                                        onChange={(e) => setTask(prev => ({
                                            ...prev,
                                            sub_tasks: prev.sub_tasks.toSpliced(index, 1, {
                                                ...prev.sub_tasks[index],
                                                sub_task_name: e.target.value
                                            })
                                        }))}
                                        onClick={() => setTask(prev => ({
                                            ...prev,
                                            sub_tasks: prev.sub_tasks.toSpliced(index, 1)
                                        }))}
                                        validation={subtask?.validSubtask}
                                    />
                                </Fragment>
                            )
                        })
                    }
                </div>
                <Button
                    text="+ Add New Subtasks"
                    variant="secondary"
                    style={{
                        width: '100%',
                        marginTop: 12,
                        padding: 12
                    }}
                    onClick={() => setTask(prev => ({
                        ...prev,
                        sub_tasks: [...prev.sub_tasks, {
                            sub_task_name: '',
                            status: false,
                            placeholder: constants.subtaskSuggestion.filter(sug => !prev.sub_tasks.map(subtask => subtask.placeholder).includes(sug))[0]
                        }]
                    }))}
                />
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: 8
            }}>
                <Label
                    name="status"
                    text={'Status'}
                />
                <Select
                    options={columnList?.map(col => col.column_name)}
                    initialValue={columnList?.filter(col => col.id === task?.columnId)[0]?.column_name}
                    action={(option) => setTask(prev => ({
                        ...prev,
                        columnId: columnList?.filter(col => col?.column_name === option)[0]?.id
                    }))}
                />
            </div>
            <Button
                text={modal === 'taskmodal' ? 'Create Task' : 'Edit Task'}
                variant="primary"
                style={{
                    width: '100%',
                    marginTop: 12,
                    padding: 12
                }}
                onClick={onsubmit}
            />
        </Modal>
    )
}
