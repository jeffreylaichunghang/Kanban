import { useContext, useEffect, useState } from "react"
import { ThemeContext, MediaQueryContext } from "../../themes"
import { motion } from "framer-motion"
import useWindowDimension from "../../hooks/useWindowDimension"
import { DragDropContext } from 'react-beautiful-dnd'

import { constants } from "../../constants/constants"
import Taskcolumn from "./Taskcolumn"
import Text from "../Text"
import Button from "../Button"

export default function Taskboard({
    sidebar,
    boardTasks,
    setModal,
    setTaskData,
}) {
    const [tasklist, setTasklist] = useState(boardTasks[0]?.columns)
    const { theme } = useContext(ThemeContext)
    const { layout, isMobile } = useContext(MediaQueryContext)
    const { width, height } = useWindowDimension()

    useEffect(() => {
        setTasklist(boardTasks[0]?.columns)
    }, [boardTasks])

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
            // do something on the state
            console.log(source)
            console.log(destination)
            setTasklist(prev => {
                const newTasklist = [...prev]
                const draggedItem = newTasklist[source.droppableId].tasks.splice(source.index, 1)
                console.log(draggedItem)
                newTasklist[destination.droppableId].tasks.splice(destination.index, 0, draggedItem[0])
                return newTasklist
            })
        }
    }

    return (
        <DragDropContext onDragEnd={handleDragDrop}>
            <motion.div
                initial={false}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                variants={taskboardVariant}
                animate={isMobile ? 'mobile' : 'notMobile'}
                style={{
                    paddingTop: 24,
                    height: height - layout.navbarHeight - 24,
                    maxHeight: height - layout.navbarHeight - 24,
                    minWidth: width,
                    overflowY: 'none',
                    overflowX: 'scroll',
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    columnGap: 24,
                }}
            >
                {
                    tasklist?.length !== 0 ?
                        tasklist?.map((column, index) => {
                            return (
                                <Taskcolumn
                                    key={column.id}
                                    colIndex={index}
                                    columnInfo={column}
                                    setModal={setModal}
                                    setTaskData={setTaskData}
                                />
                            )
                        }) :
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                display: 'grid',
                                placeItems: 'center'
                            }}
                        >
                            <div style={{ textAlign: 'center' }}>
                                <Text
                                    variant="heading"
                                    size="l"
                                    text="This board is empty. Create a new column to get started."
                                    color={theme.color.secondaryText}
                                    style={{ width: layout.emptyBoardtext }}
                                />
                                <Button
                                    variant="primary"
                                    text="+ Add New Column"
                                    style={{ marginTop: 32 }}
                                    onClick={() => setModal('editboard')}
                                />
                            </div>
                        </div>
                }
            </motion.div>
        </DragDropContext>
    )
}
