import { useCallback, useContext, useEffect, useMemo } from "react"
import { MediaQueryContext } from "../../themes"
import { motion } from "framer-motion"
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useSelector, useDispatch } from "react-redux"
import useWindowDimension from "../../hooks/useWindowDimension"
import useApiCall from "../../hooks/useApiCall"
import { setColumnList } from "../../Redux/features/columns/columnSlice"
import { getArrayorder } from "../../utils/getArrayorder"

import Taskcolumn from "./Taskcolumn"
import Emptyboard from "./Emptyboard"

export default function Taskboard({
    sidebar,
}) {
    const currentBoard = useSelector(state => state.board.currentBoard)
    const tasklist = useSelector(state => state.column.columnList)
    const dispatch = useDispatch()
    const { layout, isMobile } = useContext(MediaQueryContext)
    const { width, height } = useWindowDimension()
    const { value: updatedTask, callApi: updatetask } = useApiCall(`updateTask`, 'PUT')
    const { value: boardTasks, callApi: getBoardTasks } = useApiCall(`tasks/${currentBoard?.id}`)

    useEffect(() => {
        if (currentBoard && currentBoard.id) getBoardTasks()
    }, [currentBoard, getBoardTasks])
    useEffect(() => {
        if (boardTasks) dispatch(setColumnList(boardTasks.columns))
    }, [boardTasks, dispatch])
    useEffect(() => {
        if (updatedTask) {
            // TODO: toast message
            console.log(updatedTask)
        }
    }, [updatedTask])

    const taskboardVariant = {
        mobile: {
            paddingLeft: 24,
        },
        notMobile: {
            paddingLeft: sidebar ? layout.taskboardPadding + 24 : 24,
        }
    }

    const handleDragDrop = (results) => {
        const { source, destination, type } = results
        if (!destination) return;
        if (source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) return;
        if (type === 'task_group') {
            console.log(source, destination)
            let tasklistClone = JSON.parse(JSON.stringify(tasklist));
            const draggedItem = tasklistClone[Number(source.droppableId)].tasks.splice(source.index, 1)
            const droppedItem = {
                ...draggedItem[0],
                columnId: currentBoard?.columns[Number(destination.droppableId)].id
            }
            updatetask(droppedItem)
            tasklistClone[Number(destination.droppableId)].tasks.splice(destination.index, 0, droppedItem)

            dispatch(setColumnList(tasklistClone))
        } else if (type === 'column_group') {
            console.log(source, destination)
            const newTasklist = [...tasklist];
            [newTasklist[source.index], newTasklist[destination.index]] =
                [newTasklist[destination.index], newTasklist[source.index]];
            dispatch(setColumnList(newTasklist))
        }
    }

    const orderedIdArray = useCallback(() => getArrayorder(tasklist?.map(item => item.id)), [tasklist])
    const memorizedTaskColumns = useMemo(() => tasklist?.map((column, index) => (
        <Taskcolumn
            key={column.id}
            colIndex={index}
            colOrder={orderedIdArray()[index]}
            columnInfo={column}
        />
    )), [tasklist, orderedIdArray])

    return (
        tasklist?.length !== 0 ?
            <motion.div
                initial={false}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                variants={taskboardVariant}
                animate={isMobile ? 'mobile' : 'notMobile'}
                style={{
                    paddingTop: 24,
                    height: height - layout.navbarHeight - 10,
                    maxHeight: height - layout.navbarHeight - 10,
                    minWidth: width,
                    overflowY: 'none',
                    overflowX: 'scroll',
                }}
            >
                <DragDropContext onDragEnd={handleDragDrop}>
                    <Droppable droppableId="taskboard" type="column_group" direction="horizontal">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    flexWrap: 'nowrap',
                                    // columnGap: 24, (not supported in dnd)
                                }}
                            >
                                {memorizedTaskColumns}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </motion.div> :
            <Emptyboard />
    )
}
