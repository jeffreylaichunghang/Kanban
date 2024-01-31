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
    const FORM_WIDTH = isMobile ? layout.signupContainerWidth : layout.signupContainerWidth - layout.signupSidebarWidth

    const submitForm = (e) => {
        e.preventDefault()
        const formdata = new FormData(e.target)
        console.log(formdata)
    }

    return (
        <form
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: isMobile ? layout.signupContainerHeight - layout.signupSidebarHeight : null,
                width: FORM_WIDTH,
                paddingLeft: FORM_MARGIN,
                paddingRight: FORM_MARGIN,
            }}
            onSubmit={submitForm}
        >
            <ul
                style={{
                    // border: '1px solid yellow',
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    overflowX: 'none',
                    overflowY: 'none',
                    height: isMobile ? layout.signupContainerHeight - layout.signupSidebarHeight - 150 : layout.signupContainerHeight - 80,
                    minWidth: '100%',
                    margin: 'auto',
                    translate: `0 ${isMobile ? '-15%' : 0}`,
                    borderRadius: 15,
                    backgroundColor: isMobile ? theme.color.white : theme.color.backgroundSecondary,
                }}
            >{renderItems.map((renderItem, index) => (
                <Fragment key={`signup_step_${index}`}>
                    {/* {index === step - 1 && */}
                    <motion.li
                        style={{
                            // border: '1px solid white',
                            height: '100%',
                            width: FORM_WIDTH - FORM_MARGIN * 2,
                            listStyle: 'none',
                            paddingTop: 40,
                            display: index === step - 1 ? 'block' : 'none'
                        }}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{
                            layout: { duration: 0.4 },
                            opacity: { ease: 'linear' }
                        }}
                        key={`signup_step_${index}`}
                        layout
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
                    </motion.li>
                    {/* } */}
                </Fragment>
            ))}</ul>
            <div
                style={{
                    height: 80,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'start',
                    alignItems: 'start',
                }}
            >
                {step > 1 && <Button
                    text="Back"
                    variant="secondary"
                    onClick={() => {
                        setStep(prev => {
                            const nextStep = prev > 1 ? prev - 1 : prev
                            return nextStep
                        })
                    }}
                />}
                <Button
                    text={step === renderItems.length ? "Confirm" : "Next"}
                    variant="primary"
                    type={step === renderItems.length ? 'submit' : 'button'}
                    onClick={() => {
                        setStep(prev => {
                            const nextStep = prev < renderItems.length ? prev + 1 : prev
                            return nextStep
                        })
                    }}
                    style={{ marginLeft: 'auto' }}
                />
            </div>
        </form>
    )
}
