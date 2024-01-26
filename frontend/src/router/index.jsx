import { createBrowserRouter } from "react-router-dom";

import KanbanBoard from "../screens/kanbanBoard/KanbanBoard";
import SigninPage from "../screens/signin/SigninPage";

export const router = createBrowserRouter([
    {
        path: "/signIn",
        element: <SigninPage />,
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
