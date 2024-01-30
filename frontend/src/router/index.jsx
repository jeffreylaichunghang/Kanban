import { createBrowserRouter } from "react-router-dom";

import KanbanBoard from "../screens/kanbanBoard/KanbanBoard";
import SigninPage from "../screens/signin/SigninPage";
import SignupPage from "../screens/signup/SignupPage";

export const router = createBrowserRouter([
    {
        path: "/signin",
        element: <SigninPage />,
    },
    {
        path: "/signup",
        element: <SignupPage />,
    },
    {
        path: '/kanbanBoard',
        element: <KanbanBoard />
    }
]);
