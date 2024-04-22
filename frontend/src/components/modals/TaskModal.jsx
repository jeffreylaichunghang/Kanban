import { Fragment } from "react"
import { useSelector, useDispatch } from "react-redux"
import useTaskmodalAction from "../../hooks/modal/useTaskmodalAction"

import Modal from "."
import Label from "../Label"
import Text from "../Text"
import Input from "../Input"
import InputItem from "../InputItem"
import Button from "../Button"
import Select from "../Select"
import Textarea from "../Textarea"
import { constants } from "../../constants/constants"
import { setModal } from "../../Redux/features/modal/modalSlice"
import { useForm } from "react-hook-form"

export default function TaskModal() {
    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm()
    const { task, setTask, onsubmit } = useTaskmodalAction()
    const columnList = useSelector(state => state.column.columnList)
    const modal = useSelector(state => state.modal.value)
    const dispatch = useDispatch()

    return (
        <Modal
            modal={modal === 'taskmodal' || modal === 'edittask'}
            action={() => {
                if (modal === 'taskmodal' || modal === 'edittask') dispatch(setModal(''))
                clearErrors()
            }}
        >
            <form
                style={{
                    rowGap: 24,
                    display: 'flex',
                    flexDirection: 'column'
                }}
                onSubmit={handleSubmit(onsubmit)}
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
                        validation={errors['title']}
                        {...register('title', {
                            value: task?.task_name,
                            required: 'task name required',
                            onChange: (e) => setTask(prev => ({
                                ...prev,
                                task_name: e.target.value
                            }))
                        })}
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
                                let validatedTask;
                                if (errors['subtask']) validatedTask = errors['subtask'][index]
                                return (
                                    <Fragment key={modal === 'edittask' ? subtask.id : index}>
                                        <InputItem
                                            // key={subtask.id}
                                            name={`subtask_${subtask.id || index}`}
                                            value={subtask.sub_task_name}
                                            placeholder={modal === 'taskmodal' ? subtask.placeholder : ''}
                                            onClick={() => setTask(prev => ({
                                                ...prev,
                                                sub_tasks: prev.sub_tasks.toSpliced(index, 1)
                                            }))}
                                            validation={validatedTask}
                                            {...register(`subtask.${index}`, {
                                                required: 'name required',
                                                onChange: (e) => setTask(prev => ({
                                                    ...prev,
                                                    sub_tasks: prev.sub_tasks.toSpliced(index, 1, {
                                                        ...prev.sub_tasks[index],
                                                        sub_task_name: e.target.value
                                                    })
                                                }))
                                            })}
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
                    type="submit"
                />
            </form>
        </Modal>
    )
}
