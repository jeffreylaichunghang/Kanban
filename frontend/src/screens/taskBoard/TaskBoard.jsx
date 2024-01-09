import { useContext } from "react"
import { ThemeContext } from "../../themes"

export default function TaskBoard() {
    const { theme } = useContext(ThemeContext)
    const styles = {
        container: {
            backgroundColor: theme.backgroundPrimary,
            width: '100%',
            height: '100vh',
            maxHeight: '100vh',
            overFlowY: 'none',
            overflowX: 'scroll',
        }
    }

    return (
        <div style={styles.container}>
            <h1>Task Board</h1>
        </div>
    )
}
