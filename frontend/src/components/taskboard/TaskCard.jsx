import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "../../themes"
import { Draggable } from "react-beautiful-dnd"
import { useSelector, useDispatch } from "react-redux"
import { constants } from "../../constants/constants"
import { setTaskdata } from "../../Redux/features/task/taskSlice"

import Text from "../Text"
import TaskCardModal from "../modals/TaskCardModal"

export default function TaskCard({
    taskInfo,
    index,
}) {
    const [task, setTask] = useState(taskInfo)
    const [cardModal, setCardModal] = useState(false)
    const activeTask = useSelector(state => state.task.activeTask)
    const { theme } = useContext(ThemeContext)
    const dispatch = useDispatch()

    useEffect(() => setTask(taskInfo), [taskInfo])
    useEffect(() => {
        if (activeTask?.id === task?.id) setTask(activeTask)
    }, [activeTask, task])

    return (
        <>
            <Draggable
                draggableId={String(task?.id)}
                key={taskInfo?.id}
                index={index}
            >
                {(provided) => (
                    <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                        <div
                            style={{
                                paddingTop: 23,
                                paddingBottom: 23,
                                paddingLeft: 16,
                                paddingRight: 16,
                                marginBottom: 20,
                                backgroundColor: theme.color.backgroundSecondary,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                rowGap: 8,
                                width: constants.cardWidth,
                                borderRadius: 8,
                                cursor: 'pointer',
                                ...provided.dragHandleProps.style
                            }}
                            onClick={() => {
                                dispatch(setTaskdata(task))
                                setCardModal(true)
                            }}
                        >
                            <Text
                                text={task?.task_name}
                                variant="heading"
                                size="m"
                                color={theme.color.primaryText}
                                hoverColor={theme.color.mainPurple}
                            />
                            <Text
                                text={`${task?.sub_tasks.filter(t => t.status).length || 0} of ${task?.sub_tasks.length || 0} subtasks`}
                                variant="body"
                                size="m"
                                color={theme.color.secondaryText}
                            />
                        </div>
                    </div>
                )}
            </Draggable>
            <TaskCardModal
                cardModal={cardModal}
                setCardModal={() => setCardModal(false)}
            />
        </>
    )
}
