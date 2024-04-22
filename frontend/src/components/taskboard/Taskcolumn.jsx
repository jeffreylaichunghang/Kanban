import { Draggable, Droppable } from "react-beautiful-dnd"

import TaskCard from "./TaskCard"
import DoubleEllipsis from '../DoubleEllipsis'
import ColumnDraghandle from "./ColumnDraghandle"

export default function Taskcolumn({
    columnInfo,
    colIndex,
    colOrder,
}) {
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
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <div style={styles.container}>
                        <div style={styles.columnHeader} {...provided.dragHandleProps}>
                            <ColumnDraghandle
                                text={`${columnInfo.column_name.toUpperCase()} (${columnInfo.tasks?.length || 0})`}
                                colOrder={colOrder}
                            />
                            <DoubleEllipsis />
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
                                        columnInfo.tasks && columnInfo.tasks.map((task, index) => {
                                            return (
                                                <TaskCard
                                                    key={task?.id}
                                                    taskInfo={task}
                                                    index={index}
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
