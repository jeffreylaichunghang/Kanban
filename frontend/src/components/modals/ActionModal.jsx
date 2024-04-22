import { useContext } from "react"
import { ThemeContext } from "../../themes"

import OutsideAlerter from "../../hooks/useOutsideAlerter"
import Text from "../Text"

export default function ActionModal({
    actionModal,
    setActionModal,
    // children,
    style = {},
    actions = [],
}) {
    const { theme } = useContext(ThemeContext)

    return (
        <OutsideAlerter
            action={() => setActionModal(false)}
            style={{
                display: actionModal ? 'block' : 'none',
                position: 'absolute',
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
                {/* {children} */}
                {
                    actions.map((action, index) => (
                        <Text
                            key={`action_btn_${index}`}
                            variant="body"
                            size="l"
                            style={{ cursor: 'pointer' }}
                            text={action.text}
                            color={action.color}
                            onClick={action.onClick}
                            {...action.props}
                        />
                    ))
                }
            </div>
        </OutsideAlerter>
    )
}
