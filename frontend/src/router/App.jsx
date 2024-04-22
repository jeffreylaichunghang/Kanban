import {
  RouterProvider,
} from "react-router-dom";
import { router } from ".";
import { ThemeContext } from "../themes";
import useToggleTheme from "../hooks/useToggleTheme";
import { MediaQueryContext } from "../themes";
import useLayout from "../hooks/useLayout";
import AuthProvider from "../Auth/AuthProvider";
import { Provider as ReduxProvider } from 'react-redux'
import store from '../Redux/store'

export default function App() {
  const { themes, toggleTheme, themeState } = useToggleTheme('dark')
  const { layout, isMobile, isTablet } = useLayout()

  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <MediaQueryContext.Provider value={{ layout, isMobile, isTablet }}>
          <ThemeContext.Provider value={{ theme: themes, toggleTheme, themeState: themeState }}>
            <RouterProvider router={router} />
          </ThemeContext.Provider>
        </MediaQueryContext.Provider>
      </AuthProvider>
    </ReduxProvider>
  )
}
