import { createBrowserRouter } from "react-router-dom";

import KanbanBoard from "../screens/kanbanBoard/KanbanBoard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Hello world!</div>,
    },
    {
        path: '/kanbanBoard',
        element: <KanbanBoard />
    }
]);
