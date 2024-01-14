import { useContext, useRef, useState } from "react"
import { ThemeContext, MediaQueryContext } from "../../themes"
import useHover from "../../hooks/useHover"

import Text from "../Text"
import HideIcon from "../../assets/HideIcon"
import ShowIcon from "../../assets/ShowIcon"
import BoardIcon from '../../assets/BoardIcon'

export default function SidebarButton({
    icon,
    text = '',
    onClick = () => true,
    buttonColor,
    buttonHoverColor,
    iconColor,
    iconHoverColor,
    style = {}
}) {
    const buttonRef = useRef()
    const hovered = useHover(buttonRef)
    const { theme } = useContext(ThemeContext)
    const { layout } = useContext(MediaQueryContext)
    const renderedIcon = {
        'hideIcon': <HideIcon fill={hovered ? iconHoverColor || theme.color.mainPurple : iconColor || theme.color.secondaryText} />,
        'showIcon': <ShowIcon fill={hovered ? iconHoverColor || theme.color.mainPurple : iconColor || theme.color.secondaryText} />,
        'boardIcon': <BoardIcon fill={hovered ? iconHoverColor || theme.color.mainPurple : iconColor || theme.color.secondaryText} />
    }

    return (
        <div
            ref={buttonRef}
            onClick={onClick}
            style={{
                width: layout.sidebarButtonWidth,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 15,
                cursor: 'pointer',
                paddingTop: 14,
                paddingBottom: 13,
                paddingLeft: layout.sidebarPadding,
                marginRight: layout.sidebarPadding,
                borderTopRightRadius: 100,
                borderBottomRightRadius: 100,
                backgroundColor: hovered ? buttonHoverColor || theme.color.secondary : buttonColor || 'transparent',
                ...style
            }}
        >
            {renderedIcon[icon]}
            <Text
                variant="heading"
                size="m"
                text={text}
                color={hovered ?
                    iconHoverColor || theme.color.mainPurple :
                    iconColor || theme.color.secondaryText}
            />
        </div>
    )
}
