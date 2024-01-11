import { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ThemeContext } from "../themes";
import { lightTheme, theme as darkTheme } from "../themes/themes";

import TaskBoard from "../screens/taskBoard/TaskBoard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: '/taskBoard',
    element: <TaskBoard />
  }
]);

export default function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', newTheme)
      return newTheme
    })
  }

  const themes = theme === 'dark' ? darkTheme : lightTheme

  return (
    <ThemeContext.Provider value={{ theme: themes, toggleTheme, themeState: theme }}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  )
}
