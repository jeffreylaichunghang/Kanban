import { useContext } from "react";
import { ThemeContext, MediaQueryContext } from "../../themes";

import Text from "../../components/Text";

export default function IntroSection() {
    const { theme } = useContext(ThemeContext)
    const { isMobile } = useContext(MediaQueryContext)
    return (
        <div
            style={{
                width: isMobile ? '100%' : '50%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                rowGap: 32,
                margin: 'auto',
                textAlign: isMobile ? 'center' : 'left'
            }}
        >
            <Text
                variant={'heading'}
                text={'Start organizing your work with Kanban'}
                color={theme.color.mainPurple}
                hoverColor={theme.color.mainPurple}
                style={{
                    fontSize: 40,
                    lineHeight: '110%',
                    width: isMobile ? '100%' : '90%'
                }}
            />
            <Text
                variant={'body'}
                size={'m'}
                text={'Visualize and optimize the flow of work among your team with a dedicated kanban board, a single source of truth for the team\'s work'}
                color={theme.color.primaryText}
                hoverColor={theme.color.primaryText}
                style={{
                    lineHeight: '200%'
                }}
            />
        </div>
    )
}
