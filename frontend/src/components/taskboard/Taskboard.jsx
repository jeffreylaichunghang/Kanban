import { useContext } from "react"
import { ThemeContext, MediaQueryContext } from "../../themes"
import { motion } from "framer-motion"
import useWindowDimension from "../../hooks/useWindowDimension"

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
    const { theme } = useContext(ThemeContext)
    const { layout, isMobile } = useContext(MediaQueryContext)
    const { width, height } = useWindowDimension()

    const taskboardVariant = {
        mobile: {
            paddingLeft: 24,
        },
        notMobile: {
            paddingLeft: sidebar ? layout.taskboardPadding + 24 : 24,
        }
    }

    return (
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
                boardTasks[0]?.columns.length !== 0 ?
                    boardTasks[0]?.columns.map(column => {
                        return (
                            <Taskcolumn
                                key={column.id}
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
    )
}
