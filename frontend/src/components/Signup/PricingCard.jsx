import { useContext, useRef } from "react"
import { ThemeContext, MediaQueryContext } from "../../themes"
import useHover from "../../hooks/useHover"
import { mergeRefs } from "../../utils/mergeRefs"
import { motion } from "framer-motion"

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
    priceunit,
    onClick = () => true,
}) {
    const { theme } = useContext(ThemeContext)
    const { layout, isMobile } = useContext(MediaQueryContext)
    const cardRef = useRef()
    const hovered = useHover(cardRef)
    let bordercolor;
    if (selected === name) {
        bordercolor = hovered ? theme.color.primaryHover : theme.color.primary
    } else {
        bordercolor = hovered ? theme.color.primary : theme.color.borderLine
    }

    return (
        <motion.button
            ref={mergeRefs(cardRef)}
            type="button"
            style={{
                maxWidth: '100%',
                height: layout.pricecardHeight,
                width: '100%',
                padding: isMobile ? 12 : 20,
                borderRadius: 10,
                border: `1px solid ${bordercolor}`,
                display: 'flex',
                flexDirection: 'column',
                // rowGap: priceunit === 'Yearly' ? isMobile ? 15 : 30 : 50,
                justifyContent: 'space-between',
                backgroundColor: 'transparent',
                textAlign: 'left'
            }}
            onClick={() => {
                setSelected(name)
                onClick()
            }}
            whileTap={{ scale: 0.98 }}
        >
            {Icons[image]()}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'start',
                    rowGap: 5,
                }}
            >
                <Text
                    variant="heading"
                    size="m"
                    text={name}
                    color={theme.color.primaryText}
                />
                <Text
                    variant="body"
                    size="m"
                    text={`$${price} /${priceunit === 'Monthly' ? 'mo' : 'yr'}`}
                    color={theme.color.secondaryText}
                />
                {priceunit === 'Yearly' &&
                    <Text
                        variant="body"
                        size="m"
                        text="2 months free"
                        color={theme.color.primaryHover}
                    />}
            </div>
        </motion.button>
    )
}

export default PricingCard
