import { motion } from "framer-motion"
import useWindowDimension from "../../hooks/useWindowDimension"

import { constants } from "../../constants/constants"
import Taskcolumn from "./Taskcolumn"

export default function Taskboard({
    sidebar,
    boardTasks,
    setModal,
    setTaskData
}) {
    const { width, height } = useWindowDimension()

    return (
        <motion.div
            initial={false}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            animate={{ paddingLeft: sidebar ? constants.sidebarWidth + 24 : 24, }}
            style={{
                paddingTop: 24,
                height: height - constants.navbarHeight - 24,
                maxHeight: height - constants.navbarHeight - 24,
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
                boardTasks[0]?.columns.map(column => {
                    return (
                        <Taskcolumn
                            key={column.id}
                            columnInfo={column}
                            setModal={setModal}
                            setTaskData={setTaskData}
                        />
                    )
                })
            }
        </motion.div>
    )
}
