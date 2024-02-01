import { Fragment, useContext, useEffect, useState } from "react"
import { ThemeContext, MediaQueryContext } from '../../themes/index'
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom'
import useApiCall from "../../hooks/useApiCall"

import Button from "../../components/Button"
import Text from "../../components/Text"
import LabeledInput from "../../components/LabeledInput"
import PricingCardGroup from "../../components/Signup/PricingCardGroup"
import ToggleSwitch from "../../components/ToggleSwitch"
import Addons from "../../components/Signup/Addons"
import CartSummary from "../../components/Signup/CartSummary"

const authUrl = import.meta.env.VITE_AUTH_URL

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
    signupData,
}) {
    const [warningMessage, setWarningMessage] = useState(null)
    const { theme } = useContext(ThemeContext)
    const { layout, isMobile } = useContext(MediaQueryContext)
    const { value: signupSuccess, loading: signingup, error: signupFail, callApi: signup } = useApiCall('signup', 'POST', authUrl)
    const navigate = useNavigate()
    const FORM_MARGIN = isMobile ? 15 : 90;
    const FORM_WIDTH = isMobile ? layout.signupContainerWidth : layout.signupContainerWidth - layout.signupSidebarWidth

    useEffect(() => {
        if (signupSuccess) return navigate('/signin')
        if (signupFail) {
            console.log(signupFail.response)
            setStep(1)
            setWarningMessage(signupFail.response.data.message)
        }
    }, [signupSuccess, signupFail])

    const submitForm = (e) => {
        e.preventDefault()
        if (step < renderItems.length) return setStep(prev => {
            const nextStep = prev < renderItems.length ? prev + 1 : prev
            return nextStep
        })
        // const formData = new FormData(e.target);
        // const formJson = Object.fromEntries(formData.entries());
        console.log(signupData);
        signup({
            email: signupData.email,
            password: signupData.password
        })
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
                    height: isMobile ? layout.signupContainerHeight - layout.signupSidebarHeight - 100 : layout.signupContainerHeight - 80,
                    minWidth: '100%',
                    margin: 'auto',
                    translate: `0 ${isMobile ? '-15%' : 0}`,
                    borderRadius: 15,
                    backgroundColor: isMobile ? theme.color.white : theme.color.backgroundSecondary,
                }}
            >{renderItems.map((renderItem, index) => (
                <motion.li
                    style={{
                        // border: '1px solid white',
                        height: '100%',
                        width: FORM_WIDTH - FORM_MARGIN * 2,
                        listStyle: 'none',
                        paddingTop: isMobile ? 20 : 40,
                        paddingLeft: 15,
                        paddingRight: 15,
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
                        color={isMobile ? theme.color.mainPurple : theme.color.primaryText}
                        style={{ marginBottom: 10 }}
                    />
                    <Text
                        variant="body"
                        size="l"
                        text={renderItem.subTitle}
                        color={theme.color.secondaryText}
                    />
                    <motion.div
                        style={{
                            marginTop: isMobile ? 12 : 25,
                            display: 'flex',
                            flexDirection: 'column',
                            rowGap: isMobile ? 5 : 15,
                        }}
                    >
                        {renderItem.componentData.map(({ component, props }, itemIndex) => (
                            <Fragment key={`${renderItem.title}_${itemIndex}`}>
                                {
                                    RenderComponent[component]({
                                        ...props
                                    })
                                }
                                {
                                    step === 1 && itemIndex === 1 && warningMessage &&
                                    <Text
                                        variant="body"
                                        size="m"
                                        text={warningMessage}
                                        color={theme.color.destructive}
                                    />
                                }
                            </Fragment>
                        ))}
                    </motion.div>
                </motion.li>
            ))}</ul>
            <div
                style={{
                    height: 80,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Button
                    text={step > 1 ? "Back" : "Cancel"}
                    variant="secondary"
                    onClick={() => {
                        setStep(prev => {
                            const nextStep = prev > 1 ? prev - 1 : prev
                            return nextStep
                        })
                        if (step === 1) navigate('/signin')
                    }}
                />
                <Button
                    text={step === renderItems.length ? "Confirm" : "Next"}
                    variant="primary"
                    type="submit"
                    disabled={signingup}
                />
            </div>
        </form>
    )
}
