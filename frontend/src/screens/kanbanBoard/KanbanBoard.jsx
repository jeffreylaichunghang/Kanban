import { useState } from "react"

import Navigator from "./Navigator"
import Taskboard from "../../components/taskboard/Taskboard"
import ModalManager from '../kanbanBoard/ModalManager'

export default function KanbanBoard() {
    const [sidebar, setSidebar] = useState(true)

    return (
        <Navigator
            sidebar={sidebar}
            setSidebar={setSidebar}
        >
            <ModalManager />
            <Taskboard
                sidebar={sidebar}
            />
        </Navigator>
    )
}
