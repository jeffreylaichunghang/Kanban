import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "../Auth/ProtectedRoute";
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
        element: (<ProtectedRoute>
            <KanbanBoard />
        </ProtectedRoute>)
    },
    {
        path: '/test',
        element: (<ProtectedRoute>
            <h1>Secret</h1>
        </ProtectedRoute>)
    }
]);
