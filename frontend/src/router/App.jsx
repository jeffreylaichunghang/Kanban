import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ThemeContext } from "../themes";
import useToggleTheme from "../hooks/useToggleTheme";

import KanbanBoard from "../screens/kanbanBoard/KanbanBoard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: '/kanbanBoard',
    element: <KanbanBoard />
  }
]);

export default function App() {
  const { themes, toggleTheme, theme } = useToggleTheme('dark')

  return (
    <ThemeContext.Provider value={{ theme: themes, toggleTheme, themeState: theme }}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  )
}
