import { useContext } from "react"
import { ThemeContext } from "../../themes"
import { Draggable, Droppable } from "react-beautiful-dnd"

import Text from "../Text"
import Ellipsis from "../../assets/Ellipsis"
import TaskCard from "./TaskCard"
import { constants } from "../../constants/constants"

export default function Taskcolumn({
    columnInfo,
    colIndex,
    setModal,
    setTaskData,
}) {
    const { theme } = useContext(ThemeContext)
    const styles = {
        container: {
            height: '100%',
            width: 290,
            minWidth: 290,
            maxWidth: 290,
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            rowGap: 24,
            marginLeft: 24,
        },
        columnHeader: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
        },
        columnName: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            columnGap: 12,
        },
        colorDot: {
            display: 'block',
            width: 15,
            aspectRatio: 1 / 1,
            borderRadius: 15 / 2,
            backgroundColor: constants.colorTags[colIndex],
        },
        ellipsis: {
            marginRight: 10,
            marginTop: 5
        }
    }
    return (
        <Draggable
            draggableId={`col_${columnInfo.id}`}
            index={colIndex}
            key={columnInfo.id}
        >
            {(provided) => (
                <div
                    // {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <div style={styles.container}>
                        <div style={styles.columnHeader} {...provided.dragHandleProps}>
                            <div style={styles.columnName}>
                                <span style={styles.colorDot}></span>
                                <Text
                                    variant="heading"
                                    size="s"
                                    color={theme.color.secondaryText}
                                    text={`${columnInfo.column_name.toUpperCase()} (${columnInfo.tasks.length})`}
                                    style={{ letterSpacing: '2.4px' }}
                                />
                            </div>
                            <span style={styles.ellipsis}>
                                <Ellipsis />
                                <Ellipsis />
                            </span>
                        </div>
                        <Droppable
                            droppableId={String(colIndex)}
                            type="task_group"
                        >
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={{
                                        overflowY: 'scroll',
                                        overflowX: 'none',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        // rowGap: 20, (not supported in dnd)
                                        height: '100%'
                                    }}>
                                    {
                                        columnInfo?.tasks.map((task, index) => {
                                            return (
                                                <TaskCard
                                                    key={task.id}
                                                    taskInfo={task}
                                                    index={index}
                                                    onClick={() => {
                                                        setTaskData(task)
                                                        setModal('taskcard')
                                                    }}
                                                />
                                            )
                                        })
                                    }
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                </div>
            )}
        </Draggable>
    )
}
