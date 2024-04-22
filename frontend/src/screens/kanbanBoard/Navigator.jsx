import { useContext } from "react"
import { ThemeContext } from "../../themes"
import useWindowDimension from "../../hooks/useWindowDimension"

import NavBar from "../../components/navbar/NavBar"
import Sidebar from "../../components/sidebar/Sidebar"

const Navigator = ({
    sidebar,
    setSidebar,
    children,
}) => {
    const { theme } = useContext(ThemeContext)
    const { width, height } = useWindowDimension()
    const styles = {
        container: {
            backgroundColor: theme.color.backgroundPrimary,
            width: width,
            height: height,
            maxHeight: height,
            overFlowY: 'none',
            overflowX: 'scroll',
            padding: 0,
        }
    }

    return (
        <div style={styles.container}>
            <NavBar
                sidebar={sidebar}
                setSidebar={setSidebar}
            />
            <Sidebar
                sidebar={sidebar}
                setSidebar={setSidebar}
            />
            {children}
        </div>
    )
}

export default Navigator
