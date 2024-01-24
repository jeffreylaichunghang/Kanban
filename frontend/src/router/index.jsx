import { createBrowserRouter } from "react-router-dom";

import KanbanBoard from "../screens/kanbanBoard/KanbanBoard";
import Signin from "../screens/Signin";

export const router = createBrowserRouter([
    {
        path: "/signIn",
        element: <Signin />,
    },
    {
        path: "/signUp",
        element: <div>Hello world!</div>,
    },
    {
        path: '/kanbanBoard',
        element: <KanbanBoard />
    }
]);
