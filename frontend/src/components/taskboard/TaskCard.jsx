import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "../../themes"
import { Draggable } from "react-beautiful-dnd"

import Text from "../Text"
import { constants } from "../../constants/constants"

export default function TaskCard({
    taskInfo,
    index,
    onClick = () => true,
}) {
    const [task, setTask] = useState(taskInfo)
    const { theme } = useContext(ThemeContext)

    useEffect(() => {
        setTask(taskInfo)
    }, [taskInfo])

    return (
        <Draggable
            draggableId={String(taskInfo.id)}
            key={taskInfo.id}
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
                        onClick={onClick}
                    >
                        <Text
                            text={task.task_name}
                            variant="heading"
                            size="m"
                            color={theme.color.primaryText}
                            hoverColor={theme.color.mainPurple}
                        />
                        <Text
                            text={`${task.sub_tasks.filter(t => t.status).length || 0} of ${task.sub_tasks.length || 0} subtasks`}
                            variant="body"
                            size="m"
                            color={theme.color.secondaryText}
                        />
                    </div>
                </div>
            )}
        </Draggable>
    )
}
