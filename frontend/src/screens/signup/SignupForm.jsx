import { Fragment, useContext } from "react"
import { ThemeContext, MediaQueryContext } from '../../themes/index'
import { motion, AnimatePresence } from "framer-motion"

import Button from "../../components/Button"
import Text from "../../components/Text"
import LabeledInput from "../../components/LabeledInput"
import PricingCardGroup from "../../components/Signup/PricingCardGroup"
import ToggleSwitch from "../../components/ToggleSwitch"
import Addons from "../../components/Signup/Addons"
import CartSummary from "../../components/Signup/CartSummary"

const RenderComponent = {
    labeledInput: LabeledInput,
    pricingCardGroup: PricingCardGroup,
    toggleSwitch: ToggleSwitch,
    addons: Addons,
    cartSummary: CartSummary,
}

export default function SignupForm({
    renderItems,
    step,
    setStep,
}) {
    const { theme } = useContext(ThemeContext)
    const { layout, isMobile } = useContext(MediaQueryContext)
    const FORM_MARGIN = isMobile ? 15 : 100;

    return (
        <form
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: isMobile ? layout.signupContainerHeight - layout.signupSidebarHeight : layout.signupContainerHeight,
                width: '100%',
            }}
            onSubmit={(e) => e.preventDefault()}
        >
            <div
                style={{
                    height: isMobile ? layout.signupContainerHeight - layout.signupSidebarHeight - 150 : layout.signupContainerHeight - 80,
                    // border: '1px solid yellow',
                    width: `calc(100% - ${FORM_MARGIN * 2}px)`,
                    margin: 'auto',
                    translate: `0 ${isMobile ? '-15%' : 0}`,
                    borderRadius: 15,
                    backgroundColor: isMobile ? theme.color.white : theme.color.backgroundSecondary,
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                }}
            >
                <ul
                    style={{ width: '100%' }}
                >{renderItems.map((renderItem, index) => (
                    <Fragment key={`signup_step_${index}`}>
                        {index === step - 1 &&
                            <li
                                style={{
                                    // border: '1px solid white',
                                    height: '100%',
                                    width: '100%',
                                    listStyle: 'none',
                                    paddingTop: 40,
                                }}
                            >
                                <Text
                                    variant="heading"
                                    size="xl"
                                    text={renderItem.title}
                                    color={theme.color.primaryText}
                                    style={{ marginBottom: 10 }}
                                />
                                <Text
                                    variant="body"
                                    size="l"
                                    text={renderItem.subTitle}
                                    color={theme.color.secondaryText}
                                />
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        style={{
                                            marginTop: 25,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            rowGap: 15,
                                        }}
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -10, opacity: 0 }}
                                        transition={{ duration: 0.4 }}
                                        key={`signup_step_${index}`}
                                    >
                                        {renderItem.componentData.map(({ component, props }, itemIndex) => (
                                            <Fragment key={`${renderItem.title}_${itemIndex}`}>
                                                {
                                                    RenderComponent[component]({
                                                        ...props
                                                    })
                                                }
                                            </Fragment>
                                        ))}
                                    </motion.div>
                                </AnimatePresence>
                            </li>}
                    </Fragment>
                ))}</ul>
            </div>
            <div
                style={{
                    // border: '1px solid white',
                    height: 80,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    marginLeft: FORM_MARGIN,
                    marginRight: FORM_MARGIN,
                    marginBottom: 20,
                }}
            >
                <Button
                    text="Back"
                    variant="secondary"
                    onClick={() => {
                        setStep(prev => {
                            const nextStep = prev > 1 ? prev - 1 : prev
                            return nextStep
                        })
                    }}
                />
                <Button
                    text="Next"
                    variant="primary"
                    type={step === renderItems.length ? 'submit' : 'button'}
                    onClick={() => {
                        setStep(prev => {
                            const nextStep = prev < renderItems.length ? prev + 1 : prev
                            return nextStep
                        })
                    }}
                />
            </div>
        </form>
    )
}
