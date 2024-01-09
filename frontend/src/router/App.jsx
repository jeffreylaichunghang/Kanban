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
  const [theme, setTheme] = useState('dark')

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'light') {
        setTheme('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        setTheme('dark')
        localStorage.setItem('theme', 'dark')
      }
    })
  }

  const themes = theme === 'dark' ? darkTheme : lightTheme

  return (
    <ThemeContext.Provider value={{ theme: themes, toggleTheme }}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  )
}
