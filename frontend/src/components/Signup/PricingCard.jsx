import { useContext, useRef } from "react"
import { ThemeContext } from "../../themes"
import useHover from "../../hooks/useHover"
import { mergeRefs } from "../../utils/mergeRefs"

import ArcadeIcon from '../../assets/ArcadeIcon'
import AdvancedIcon from '../../assets/AdvancedIcon'
import ProIcon from '../../assets/ProIcon'
import Text from "../Text"

const Icons = {
    'ArcadeIcon': ArcadeIcon,
    'AdvancedIcon': AdvancedIcon,
    'ProIcon': ProIcon
}

function PricingCard({
    image,
    name,
    price,
    selected,
    setSelected,
}) {
    const { theme } = useContext(ThemeContext)
    const cardRef = useRef()
    const hovered = useHover(cardRef)
    let bordercolor;
    if (selected === name) {
        bordercolor = hovered ? theme.color.primaryHover : theme.color.primary
    } else {
        bordercolor = hovered ? theme.color.primary : theme.color.borderLine
    }

    const onClick = () => {
        setSelected(name)
    }

    return (
        <div
            ref={mergeRefs(cardRef)}
            style={{
                width: '100%',
                padding: 20,
                borderRadius: 10,
                border: `1px solid ${bordercolor}`,
                display: 'flex',
                flexDirection: 'column',
                rowGap: 50,
            }}
            onClick={onClick}
        >
            {Icons[image]()}
            <div>
                <Text
                    variant="heading"
                    size="l"
                    text={name}
                    color={theme.color.primaryText}
                />
                <Text
                    variant="body"
                    size="m"
                    text={`$${price} /mo`}
                    color={theme.color.secondaryText}
                />
            </div>
        </div>
    )
}

export default PricingCard
