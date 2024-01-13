import { useContext } from "react"
import { ThemeContext } from "../../themes"

import OutsideAlerter from "../../hooks/useOutsideAlerter"

export default function ActionModal({
    actionModal,
    setActionModal,
    children,
    style = {}
}) {
    const { theme } = useContext(ThemeContext)

    return (
        <OutsideAlerter
            action={() => setActionModal(false)}
            style={{
                display: actionModal ? 'block' : 'none',
                position: 'absolute',
                backgroundColor: 'white',
                width: 190,
                padding: 16,
                backgroundColor: theme.color.backgroundPrimary,
                boxShadow: '1px 2px 9px black',
                color: theme.color.secondaryText,
                borderRadius: 8,
                ...style
            }}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                rowGap: 16
            }}>
                {children}
            </div>
        </OutsideAlerter>
    )
}
